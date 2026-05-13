// GET /api/voices/feed
//
// Query params (all optional):
//   kind       comma-separated: blog,newsletter,podcast,video,analyst
//   source     comma-separated source slugs
//   featured   '1' to return only editor's picks
//   page       1-indexed, default 1
//   per_page   default 24, max 100
//   per_source max items per source, default 1, max 50. The hub defaults to
//              one latest item per voice so loud sources don't crowd out the
//              rest. Pass a higher value (e.g. when filtering to one source)
//              to see more history.
//
// Brian Fink (slug: brian-fink) is hard-capped at 2 items per response
// regardless of per_source, matching the weekly newsletter Voices rule.

interface Env { JOBS_DB: D1Database }

type Row = {
  id: number
  source_slug: string
  source_name: string
  source_kind: string
  source_avatar: string | null
  title: string
  url: string
  excerpt: string | null
  image_url: string | null
  author: string | null
  published_at: string
  featured: number
}

const FINK_SLUG = 'brian-fink'
const FINK_MAX  = 2

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const qs = url.searchParams

  const kinds     = splitCsv(qs.get('kind'))
  const sources   = splitCsv(qs.get('source'))
  const featured  = qs.get('featured') === '1'
  const page      = Math.max(1, parseInt(qs.get('page') ?? '1', 10) || 1)
  const perPage   = Math.min(100, Math.max(1, parseInt(qs.get('per_page') ?? '24', 10) || 24))
  const perSource = Math.min(50,  Math.max(1, parseInt(qs.get('per_source') ?? '1', 10) || 1))
  const finkCap   = Math.min(perSource, FINK_MAX)
  const offset    = (page - 1) * perPage

  const where: string[] = [
    `voices_items.hidden = 0`,
    `voices_sources.active = 1`,
  ]
  const filterBinds: unknown[] = []

  if (kinds.length) {
    where.push(`voices_sources.kind IN (${kinds.map(() => '?').join(',')})`)
    filterBinds.push(...kinds)
  }
  if (sources.length) {
    where.push(`voices_sources.slug IN (${sources.map(() => '?').join(',')})`)
    filterBinds.push(...sources)
  }
  if (featured) {
    where.push(`voices_items.featured = 1`)
  }

  const whereSql = `WHERE ${where.join(' AND ')}`

  // Window the items per source so the hub returns one (or N) latest from
  // each voice rather than a flat newest-first stream dominated by whoever
  // publishes most often.
  const rankedCte = `
    WITH ranked AS (
      SELECT voices_items.id,
             voices_sources.slug       AS source_slug,
             voices_sources.name       AS source_name,
             voices_sources.kind       AS source_kind,
             voices_sources.avatar_url AS source_avatar,
             voices_items.title,
             voices_items.url,
             voices_items.excerpt,
             voices_items.image_url,
             voices_items.author,
             voices_items.published_at,
             voices_items.featured,
             ROW_NUMBER() OVER (
               PARTITION BY voices_items.source_id
               ORDER BY voices_items.published_at DESC
             ) AS rn
        FROM voices_items
        JOIN voices_sources ON voices_sources.id = voices_items.source_id
      ${whereSql}
    )`

  const capPredicate = `rn <= CASE WHEN source_slug = '${FINK_SLUG}' THEN ? ELSE ? END`

  const countSql = `${rankedCte}
    SELECT COUNT(*) AS n FROM ranked WHERE ${capPredicate}`

  const pageSql = `${rankedCte}
    SELECT id, source_slug, source_name, source_kind, source_avatar,
           title, url, excerpt, image_url, author, published_at, featured
      FROM ranked
     WHERE ${capPredicate}
     ORDER BY published_at DESC
     LIMIT ? OFFSET ?`

  const [{ results: countRows }, { results: pageRows }] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(countSql).bind(...filterBinds, finkCap, perSource),
    env.JOBS_DB.prepare(pageSql).bind(...filterBinds, finkCap, perSource, perPage, offset),
  ]) as unknown as [{ results: { n: number }[] }, { results: Row[] }]

  const total = countRows[0]?.n ?? 0
  return Response.json(
    { items: pageRows, total, page, per_page: perPage, per_source: perSource },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}

function splitCsv(s: string | null): string[] {
  if (!s) return []
  return s.split(',').map(x => x.trim()).filter(Boolean)
}
