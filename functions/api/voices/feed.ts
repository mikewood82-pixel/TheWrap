// GET /api/voices/feed
//
// Query params (all optional):
//   kind     comma-separated: blog,newsletter,podcast,video,analyst
//   source   comma-separated source slugs
//   featured '1' to return only editor's picks
//   page     1-indexed, default 1
//   per_page default 24, max 100

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

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const qs = url.searchParams

  const kinds    = splitCsv(qs.get('kind'))
  const sources  = splitCsv(qs.get('source'))
  const featured = qs.get('featured') === '1'
  const page     = Math.max(1, parseInt(qs.get('page') ?? '1', 10) || 1)
  const perPage  = Math.min(100, Math.max(1, parseInt(qs.get('per_page') ?? '24', 10) || 24))
  const offset   = (page - 1) * perPage

  const where: string[] = [
    `voices_items.hidden = 0`,
    `voices_sources.active = 1`,
  ]
  const binds: unknown[] = []

  if (kinds.length) {
    where.push(`voices_sources.kind IN (${kinds.map(() => '?').join(',')})`)
    binds.push(...kinds)
  }
  if (sources.length) {
    where.push(`voices_sources.slug IN (${sources.map(() => '?').join(',')})`)
    binds.push(...sources)
  }
  if (featured) {
    where.push(`voices_items.featured = 1`)
  }

  const whereSql = `WHERE ${where.join(' AND ')}`

  const countSql = `
    SELECT COUNT(*) AS n
      FROM voices_items
      JOIN voices_sources ON voices_sources.id = voices_items.source_id
    ${whereSql}`

  const pageSql = `
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
           voices_items.featured
      FROM voices_items
      JOIN voices_sources ON voices_sources.id = voices_items.source_id
    ${whereSql}
    ORDER BY voices_items.published_at DESC
    LIMIT ? OFFSET ?`

  const [{ results: countRows }, { results: pageRows }] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(countSql).bind(...binds),
    env.JOBS_DB.prepare(pageSql).bind(...binds, perPage, offset),
  ]) as unknown as [{ results: { n: number }[] }, { results: Row[] }]

  const total = countRows[0]?.n ?? 0
  return Response.json(
    { items: pageRows, total, page, per_page: perPage },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}

function splitCsv(s: string | null): string[] {
  if (!s) return []
  return s.split(',').map(x => x.trim()).filter(Boolean)
}
