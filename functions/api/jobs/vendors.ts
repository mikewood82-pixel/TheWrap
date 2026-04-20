// GET /api/jobs/vendors — vendors with open-job counts, for filter sidebar

interface Env { JOBS_DB: D1Database }

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.JOBS_DB.prepare(
    `SELECT v.vendor_slug AS slug, v.vendor_name AS name,
            COUNT(jobs.id) AS open_jobs
     FROM vendor_ats v
     LEFT JOIN jobs ON jobs.vendor_slug = v.vendor_slug AND jobs.status = 'open'
     WHERE v.active = 1
     GROUP BY v.vendor_slug, v.vendor_name
     HAVING open_jobs > 0
     ORDER BY open_jobs DESC, v.vendor_name ASC`,
  ).all<{ slug: string; name: string; open_jobs: number }>()

  return Response.json(
    { vendors: results ?? [] },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}
