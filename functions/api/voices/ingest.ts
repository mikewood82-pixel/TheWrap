// POST /api/voices/ingest
//
// Authed (Bearer {VOICES_INGEST_TOKEN}) endpoint called by the GitHub Actions
// voices cron. Two request shapes:
//
//   { action: "upsert_sources", run_id, sources: [...] }
//   { action: "upsert_items",   run_id, source_slug, items: [...],
//       fetch_status: "ok" | "error:<reason>", etag?, last_modified? }
//   { action: "finalize",       run_id, started_at, sources_ok, sources_err }
//
// upsert_sources runs once at the start of a run to sync voices_sources from
// the TS seed file. upsert_items runs once per source after its feed parse.
// finalize closes the bookkeeping row in voices_ingest_runs.

type VoiceKind = 'blog' | 'newsletter' | 'podcast' | 'video' | 'analyst'
type FeedKind  = 'rss' | 'atom' | 'youtube'

type SourceUpsert = {
  slug: string
  name: string
  kind: VoiceKind
  site_url: string
  feed_url: string
  feed_kind: FeedKind
  avatar_url: string | null
  description: string | null
}

type ItemUpsert = {
  guid: string
  url: string
  title: string
  excerpt: string | null
  image_url: string | null
  author: string | null
  published_at: string   // ISO
}

type Body =
  | { action: 'upsert_sources'; run_id: string; sources: SourceUpsert[] }
  | {
      action: 'upsert_items'
      run_id: string
      source_slug: string
      items: ItemUpsert[]
      fetch_status: string
      etag?: string | null
      last_modified?: string | null
    }
  | {
      action: 'finalize'
      run_id: string
      started_at: string
      sources_ok: number
      sources_err: number
      items_added: number
    }

interface Env {
  JOBS_DB: D1Database
  VOICES_INGEST_TOKEN: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.VOICES_INGEST_TOKEN || auth !== `Bearer ${env.VOICES_INGEST_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  let body: Body
  try { body = (await request.json()) as Body }
  catch { return new Response('invalid json', { status: 400 }) }

  if (body.action === 'upsert_sources') return handleUpsertSources(env.JOBS_DB, body)
  if (body.action === 'upsert_items')   return handleUpsertItems(env.JOBS_DB, body)
  if (body.action === 'finalize')       return handleFinalize(env.JOBS_DB, body)
  return new Response('unknown action', { status: 400 })
}

async function handleUpsertSources(
  db: D1Database,
  body: Extract<Body, { action: 'upsert_sources' }>,
): Promise<Response> {
  if (!body.sources.length) return Response.json({ ok: true, upserted: 0 })

  const upsertSql = `INSERT INTO voices_sources
      (slug, name, kind, site_url, feed_url, feed_kind, avatar_url, description, active, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))
    ON CONFLICT(slug) DO UPDATE SET
      name        = excluded.name,
      kind        = excluded.kind,
      site_url    = excluded.site_url,
      feed_url    = excluded.feed_url,
      feed_kind   = excluded.feed_kind,
      avatar_url  = excluded.avatar_url,
      description = excluded.description,
      active      = 1,
      updated_at  = datetime('now')`

  const stmts: D1PreparedStatement[] = body.sources.map(s => db.prepare(upsertSql).bind(
    s.slug, s.name, s.kind, s.site_url, s.feed_url, s.feed_kind, s.avatar_url, s.description,
  ))

  // Deactivate sources no longer in the seed. Soft-delete preserves their
  // items (in case the slug gets re-added later) while hiding them from the
  // public feed/directory immediately.
  const slugs = body.sources.map(s => s.slug)
  const placeholders = slugs.map(() => '?').join(',')
  stmts.push(db.prepare(
    `UPDATE voices_sources SET active = 0, updated_at = datetime('now')
      WHERE active = 1 AND slug NOT IN (${placeholders})`
  ).bind(...slugs))

  try { await db.batch(stmts) }
  catch (e) { return new Response(`sources batch failed: ${String(e)}`, { status: 500 }) }

  return Response.json({ ok: true, upserted: body.sources.length })
}

async function handleUpsertItems(
  db: D1Database,
  body: Extract<Body, { action: 'upsert_items' }>,
): Promise<Response> {
  // Resolve source_id + record fetch bookkeeping in the same call, even when
  // the feed returned zero items (304s, transient errors).
  const srcRow = await db.prepare(
    `SELECT id FROM voices_sources WHERE slug = ?`
  ).bind(body.source_slug).first<{ id: number }>()
  if (!srcRow) return new Response(`unknown source: ${body.source_slug}`, { status: 404 })
  const sourceId = srcRow.id

  // Always update the source bookkeeping, even if items is empty.
  await db.prepare(
    `UPDATE voices_sources SET
        last_fetched_at   = datetime('now'),
        last_fetch_status = ?,
        etag              = ?,
        last_modified     = ?,
        updated_at        = datetime('now')
      WHERE id = ?`
  ).bind(
    body.fetch_status,
    body.etag ?? null,
    body.last_modified ?? null,
    sourceId,
  ).run()

  if (!body.items.length) return Response.json({ ok: true, upserted: 0 })

  const sql = `INSERT INTO voices_items
      (source_id, guid, url, title, excerpt, image_url, author, published_at, fetched_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(source_id, guid) DO UPDATE SET
      url          = excluded.url,
      title        = excluded.title,
      excerpt      = excluded.excerpt,
      image_url    = excluded.image_url,
      author       = excluded.author,
      published_at = excluded.published_at`

  const stmts = body.items.map(it => db.prepare(sql).bind(
    sourceId, it.guid, it.url, it.title, it.excerpt, it.image_url, it.author, it.published_at,
  ))

  try { await db.batch(stmts) }
  catch (e) { return new Response(`items batch failed: ${String(e)}`, { status: 500 }) }

  return Response.json({ ok: true, upserted: body.items.length })
}

async function handleFinalize(
  db: D1Database,
  body: Extract<Body, { action: 'finalize' }>,
): Promise<Response> {
  await db.prepare(
    `INSERT INTO voices_ingest_runs
        (started_at, finished_at, sources_ok, sources_err, items_added)
      VALUES (?, datetime('now'), ?, ?, ?)`
  ).bind(body.started_at, body.sources_ok, body.sources_err, body.items_added).run()
  return Response.json({ ok: true })
}
