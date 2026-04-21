// GET /api/jobs/vendors — vendors with open-job counts, last-30d hiring
// velocity snapshots, and a computed hiring-health verdict.

import { computeHealth, type HealthPayload, type SnapRow } from '../_lib/vendorHealth'
export type { HealthVerdict, HealthPayload } from '../_lib/vendorHealth'

interface Env { JOBS_DB: D1Database }

type VendorRow = { slug: string; name: string; open_jobs: number }
type HistoryPoint = { date: string; open_jobs: number }

type VendorPayload = VendorRow & {
  history: HistoryPoint[]
  health: HealthPayload
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  // Two parallel queries — batch so we pay one D1 round-trip. The first
  // drives the list (HAVING filters out empty vendors). The second pulls
  // every snapshot for every active vendor in the last 30 days and we
  // fold it in below.
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
      `SELECT vendor_slug, snapshot_date, open_jobs, jobs_added
         FROM vendor_snapshots
        WHERE snapshot_date >= date('now', '-30 days')
     ORDER BY vendor_slug ASC, snapshot_date ASC`,
    ),
  ]) as unknown as [
    { results: VendorRow[] },
    { results: SnapRow[] },
  ]

  const byVendor = new Map<string, SnapRow[]>()
  for (const s of snapRes.results ?? []) {
    const list = byVendor.get(s.vendor_slug) ?? []
    list.push(s)
    byVendor.set(s.vendor_slug, list)
  }

  const vendors: VendorPayload[] = (vendorRes.results ?? []).map(v => {
    const snaps = byVendor.get(v.slug) ?? []
    return {
      ...v,
      history: snaps.map(s => ({ date: s.snapshot_date, open_jobs: s.open_jobs })),
      health: computeHealth(snaps),
    }
  })

  return Response.json(
    { vendors },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}

