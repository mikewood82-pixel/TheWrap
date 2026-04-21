// POST /api/voices/refresh
//
// Bearer-authed endpoint called by the GHA cron. Runs the full refresh
// pipeline from Cloudflare's network (so Substack/etc. don't IP-block us
// the way they block GitHub Actions egress):
//
//   1. Upsert seeded sources from src/data/voicesSources (active=1 for the
//      current set, active=0 for anything previously seeded but now dropped)
//   2. In parallel, fetch + parse each active source's feed
//   3. Upsert items, capture etag/last_modified bookkeeping
//   4. Record a row in voices_ingest_runs
//
// Intentionally synchronous within the request lifecycle \u2014 with ~10 sources
// and 1-2s per fetch, comfortably under the Pages Functions wall budget.

import { voicesSources, type VoiceSourceSeed } from '../../../src/data/voicesSources'
import { parseFeed, type ParsedItem } from './_parser'

interface Env {
  JOBS_DB: D1Database
  VOICES_INGEST_TOKEN: string
}

// Cap per-source item age so newly-added sources don't backfill their archives.
const MAX_AGE_DAYS = 45
// Concurrent feed fetches. Modest to stay polite to upstream hosts.
const FETCH_CONCURRENCY = 6
const FETCH_TIMEOUT_MS = 15_000

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.VOICES_INGEST_TOKEN || auth !== `Bearer ${env.VOICES_INGEST_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  const startedAt = new Date().toISOString()

  // 1) Seed sources (upsert active + deactivate dropped).
  await upsertSources(env.JOBS_DB, voicesSources)

  // 2) Load the current active set (post-seed) with their per-source bookkeeping.
  const { results: srcRows } = await env.JOBS_DB.prepare(
    `SELECT id, slug, feed_url, feed_kind, etag, last_modified
       FROM voices_sources
      WHERE active = 1
      ORDER BY id ASC`
  ).all<{ id: number; slug: string; feed_url: string; feed_kind: string; etag: string | null; last_modified: string | null }>()

  const cutoffMs = Date.now() - MAX_AGE_DAYS * 24 * 3600 * 1000

  // 3) Fetch + parse + upsert per source with bounded concurrency.
  const perSource: {
    slug: string; ok: boolean; count: number; parsed: number; error?: string
  }[] = []
  let itemsAdded = 0

  const tasks = (srcRows ?? []).map(row => async () => {
    try {
      const fetched = await fetchFeed(row.feed_url, row.etag, row.last_modified)

      // 304 path: just bump bookkeeping, no items to process.
      if (fetched.notModified) {
        await env.JOBS_DB.prepare(
          `UPDATE voices_sources
              SET last_fetched_at = datetime('now'),
                  last_fetch_status = 'ok:304',
                  updated_at = datetime('now')
            WHERE id = ?`
        ).bind(row.id).run()
        perSource.push({ slug: row.slug, ok: true, count: 0, parsed: 0 })
        return
      }

      const parsed = parseFeed(row.feed_kind as 'rss' | 'atom' | 'youtube', fetched.text)
      const fresh = parsed
        .filter(it => it.url && it.title && it.guid && it.published_at)
        .filter(it => new Date(it.published_at).getTime() >= cutoffMs)

      await upsertItems(env.JOBS_DB, row.id, fresh, fetched.etag, fetched.lastModified)

      perSource.push({ slug: row.slug, ok: true, count: fresh.length, parsed: parsed.length })
      itemsAdded += fresh.length
    } catch (err) {
      const msg = String((err as Error)?.message ?? err).slice(0, 200)
      await env.JOBS_DB.prepare(
        `UPDATE voices_sources
            SET last_fetched_at = datetime('now'),
                last_fetch_status = ?,
                updated_at = datetime('now')
          WHERE id = ?`
      ).bind(`error:${msg}`, row.id).run()
      perSource.push({ slug: row.slug, ok: false, count: 0, parsed: 0, error: msg })
    }
  })

  await runWithConcurrency(tasks, FETCH_CONCURRENCY)

  const sourcesOk = perSource.filter(p => p.ok).length
  const sourcesErr = perSource.length - sourcesOk

  // 4) Bookkeep the run itself.
  await env.JOBS_DB.prepare(
    `INSERT INTO voices_ingest_runs
        (started_at, finished_at, sources_ok, sources_err, items_added)
      VALUES (?, datetime('now'), ?, ?, ?)`
  ).bind(startedAt, sourcesOk, sourcesErr, itemsAdded).run()

  return Response.json({
    ok: true,
    sources_ok: sourcesOk,
    sources_err: sourcesErr,
    items_added: itemsAdded,
    per_source: perSource,
  })
}

// ---------- DB ops ----------

async function upsertSources(db: D1Database, seed: VoiceSourceSeed[]): Promise<void> {
  if (!seed.length) return
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

  const stmts: D1PreparedStatement[] = seed.map(s => db.prepare(upsertSql).bind(
    s.slug, s.name, s.kind, s.site_url, s.feed_url, s.feed_kind ?? 'rss',
    s.avatar_url ?? null, s.description ?? null,
  ))

  const slugs = seed.map(s => s.slug)
  const placeholders = slugs.map(() => '?').join(',')
  stmts.push(db.prepare(
    `UPDATE voices_sources SET active = 0, updated_at = datetime('now')
      WHERE active = 1 AND slug NOT IN (${placeholders})`
  ).bind(...slugs))

  await db.batch(stmts)
}

async function upsertItems(
  db: D1Database,
  sourceId: number,
  items: ParsedItem[],
  etag: string | null,
  lastModified: string | null,
): Promise<void> {
  // Always bump source bookkeeping, even if items is empty (so operators can
  // see "we fetched this source" distinct from "this source errored").
  const stmts: D1PreparedStatement[] = []
  stmts.push(db.prepare(
    `UPDATE voices_sources
        SET last_fetched_at = datetime('now'),
            last_fetch_status = 'ok',
            etag = ?,
            last_modified = ?,
            updated_at = datetime('now')
      WHERE id = ?`
  ).bind(etag, lastModified, sourceId))

  if (items.length) {
    const itemSql = `INSERT INTO voices_items
        (source_id, guid, url, title, excerpt, image_url, author, published_at, fetched_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(source_id, guid) DO UPDATE SET
        url          = excluded.url,
        title        = excluded.title,
        excerpt      = excluded.excerpt,
        image_url    = excluded.image_url,
        author       = excluded.author,
        published_at = excluded.published_at`
    for (const it of items) {
      stmts.push(db.prepare(itemSql).bind(
        sourceId, it.guid, it.url, it.title, it.excerpt, it.image_url, it.author, it.published_at,
      ))
    }
  }

  await db.batch(stmts)
}

// ---------- fetch ----------

async function fetchFeed(
  url: string,
  etag: string | null,
  lastModified: string | null,
): Promise<{ text: string; etag: string | null; lastModified: string | null; notModified: boolean }> {
  const ctrl = new AbortController()
  const to = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
  try {
    const headers: Record<string, string> = {
      // Substack rejects non-browser UAs. "compatible; ..." is the standard
      // way to pass the filter while still self-identifying.
      'user-agent': 'Mozilla/5.0 (compatible; TheWrapVoicesBot/1.0; +https://ilovethewrap.com/voices)',
      accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8',
    }
    if (etag)          headers['if-none-match']     = etag
    if (lastModified)  headers['if-modified-since'] = lastModified

    const r = await fetch(url, { headers, redirect: 'follow', signal: ctrl.signal })
    if (r.status === 304) {
      return { text: '', etag, lastModified, notModified: true }
    }
    if (!r.ok) throw new Error(`http ${r.status}`)
    const text = await r.text()
    return {
      text,
      etag: r.headers.get('etag'),
      lastModified: r.headers.get('last-modified'),
      notModified: false,
    }
  } finally {
    clearTimeout(to)
  }
}

async function runWithConcurrency(tasks: Array<() => Promise<void>>, limit: number): Promise<void> {
  const queue = tasks.slice()
  const workers: Promise<void>[] = []
  for (let i = 0; i < Math.min(limit, queue.length); i++) {
    workers.push((async () => {
      while (queue.length) {
        const t = queue.shift()
        if (!t) return
        await t()
      }
    })())
  }
  await Promise.all(workers)
}
