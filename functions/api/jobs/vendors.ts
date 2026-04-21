// GET /api/jobs/vendors — vendors with open-job counts + last-30d hiring
// velocity snapshots, for the filter sidebar and sparklines.

interface Env { JOBS_DB: D1Database }

type VendorRow = { slug: string; name: string; open_jobs: number }
type SnapRow = { vendor_slug: string; snapshot_date: string; open_jobs: number }
type HistoryPoint = { date: string; open_jobs: number }
type VendorPayload = VendorRow & { history: HistoryPoint[] }

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  // Two parallel queries — batch so we pay one D1 round-trip. The first
  // query drives the list (HAVING filters out empty vendors so we don't
  // show zero-job tiles), the second pulls every snapshot for every active
  // vendor in the last 30 days and we fold it in client-side.
  const [vendorRes, snapRes] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(
      `SELECT v.vendor_slug AS slug, v.vendor_name AS name,
              COUNT(jobs.id) AS open_jobs
         FROM vendor_ats v
    LEFT JOIN jobs ON jobs.vendor_slug = v.vendor_slug AND jobs.status = 'open'
        WHERE v.active = 1
     GROUP BY v.vendor_slug, v.vendor_name
       HAVING open_jobs > 0
     ORDER BY open_jobs DESC, v.vendor_name ASC`,
    ),
    env.JOBS_DB.prepare(
      `SELECT vendor_slug, snapshot_date, open_jobs
         FROM vendor_snapshots
        WHERE snapshot_date >= date('now', '-30 days')
     ORDER BY vendor_slug ASC, snapshot_date ASC`,
    ),
  ]) as unknown as [
    { results: VendorRow[] },
    { results: SnapRow[] },
  ]

  const byVendor = new Map<string, HistoryPoint[]>()
  for (const s of snapRes.results ?? []) {
    const list = byVendor.get(s.vendor_slug) ?? []
    list.push({ date: s.snapshot_date, open_jobs: s.open_jobs })
    byVendor.set(s.vendor_slug, list)
  }

  const vendors: VendorPayload[] = (vendorRes.results ?? []).map(v => ({
    ...v,
    history: byVendor.get(v.slug) ?? [],
  }))

  return Response.json(
    { vendors },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}
