// GET /api/voices/sources
//
// Returns the active source directory + latest-item count, for the
// /voices filter chips and the source directory section.

interface Env { JOBS_DB: D1Database }

type Row = {
  slug: string
  name: string
  kind: string
  site_url: string
  avatar_url: string | null
  description: string | null
  item_count: number
  latest_published_at: string | null
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.JOBS_DB.prepare(
    `SELECT s.slug, s.name, s.kind, s.site_url, s.avatar_url, s.description,
            COUNT(i.id) AS item_count,
            MAX(i.published_at) AS latest_published_at
       FROM voices_sources s
       LEFT JOIN voices_items i
         ON i.source_id = s.id AND i.hidden = 0
      WHERE s.active = 1
      GROUP BY s.id
      ORDER BY s.name COLLATE NOCASE ASC`
  ).all<Row>()

  return Response.json(
    { sources: results ?? [] },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}
