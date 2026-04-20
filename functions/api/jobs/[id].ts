// GET /api/jobs/{id} — single job detail

interface Env { JOBS_DB: D1Database }

type Row = {
  id: number
  external_id: string
  vendor_slug: string
  vendor_name: string | null
  ats_source: string
  title: string
  department: string | null
  location: string | null
  remote: string
  employment_type: string | null
  seniority: string
  url: string
  description_html: string | null
  posted_at: string | null
  first_seen_at: string
  status: string
}

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ params, env }) => {
  const idNum = parseInt(String(params.id), 10)
  if (!Number.isFinite(idNum)) return new Response('bad id', { status: 400 })

  const row = await env.JOBS_DB.prepare(
    `SELECT jobs.*, v.vendor_name
     FROM jobs
     LEFT JOIN vendor_ats v ON v.vendor_slug = jobs.vendor_slug
     WHERE jobs.id = ?`,
  ).bind(idNum).first<Row>()

  if (!row) return new Response('not found', { status: 404 })
  return Response.json(row, {
    headers: { 'cache-control': 'public, max-age=300, s-maxage=300' },
  })
}
