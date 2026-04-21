// GET /api/voices/source/:slug
//
// Single source lookup for the /voices/:slug profile page. Returns the
// source row (sans sensitive fields) or 404.

interface Env { JOBS_DB: D1Database }

type Row = {
  slug: string
  name: string
  kind: string
  site_url: string
  feed_url: string
  avatar_url: string | null
  description: string | null
  last_fetched_at: string | null
  item_count: number
  latest_published_at: string | null
}

export const onRequestGet: PagesFunction<Env, 'slug'> = async ({ params, env }) => {
  const slug = String(params.slug ?? '').trim()
  if (!slug) return new Response('missing slug', { status: 400 })

  const row = await env.JOBS_DB.prepare(
    `SELECT s.slug, s.name, s.kind, s.site_url, s.feed_url, s.avatar_url, s.description,
            s.last_fetched_at,
            COUNT(i.id) AS item_count,
            MAX(i.published_at) AS latest_published_at
       FROM voices_sources s
       LEFT JOIN voices_items i
         ON i.source_id = s.id AND i.hidden = 0
      WHERE s.active = 1 AND s.slug = ?
      GROUP BY s.id`
  ).bind(slug).first<Row>()

  if (!row) return new Response('not found', { status: 404 })

  return Response.json(
    { source: row },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}
