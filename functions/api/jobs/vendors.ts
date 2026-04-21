// GET /api/jobs/vendors — vendors with open-job counts, last-30d hiring
// velocity snapshots, and a computed hiring-health verdict.

interface Env { JOBS_DB: D1Database }

type VendorRow = { slug: string; name: string; open_jobs: number }
type SnapRow = {
  vendor_slug: string
  snapshot_date: string
  open_jobs: number
  jobs_added: number
}
type HistoryPoint = { date: string; open_jobs: number }

export type HealthVerdict = 'trending_up' | 'stable' | 'slowing' | 'freeze'
export type HealthPayload = {
  verdict: HealthVerdict
  ratio: number           // 7d-avg / 30d-avg, rounded to 2 decimals
  days_of_data: number    // how many snapshots fed the calculation
} | null

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

// --- Hiring health index -----------------------------------------------------
//
// Rules (also documented in the roadmap plan):
//   - Need at least 3 days of snapshots — below that, no verdict.
//   - Skip tiny vendors (avg open_jobs < 5) — noise, not signal.
//   - ratio = avg(open_jobs, last 7d) / avg(open_jobs, last 30d)
//       ratio ≥ 1.10  → trending_up
//       0.90–1.10     → stable
//       0.75–0.90     → slowing
//       < 0.75        → freeze
//   - Hard override: if the vendor added zero new roles in the last 14 days,
//     force 'freeze' regardless of the ratio. Catches the case where a
//     vendor's open count is holding steady only because nothing's closing.
//
// Note: the 7-day window is computed against whatever days of data we have,
// so on day 5 we're comparing avg(last 5) to avg(last 5). That's fine —
// verdict just means "current vs baseline over the data we've seen". The
// days_of_data field tells the client how confident to be.
function computeHealth(snaps: SnapRow[]): HealthPayload {
  if (snaps.length < 3) return null

  const last7  = snaps.slice(-7)
  const last14 = snaps.slice(-14)
  const last30 = snaps.slice(-30)

  const avg = (xs: SnapRow[]) =>
    xs.length ? xs.reduce((a, s) => a + s.open_jobs, 0) / xs.length : 0

  const avg30 = avg(last30)
  if (avg30 < 5) return null            // too small to signal reliably

  const avg7 = avg(last7)
  const ratio = avg7 / avg30

  const addedLast14 = last14.reduce((a, s) => a + s.jobs_added, 0)

  let verdict: HealthVerdict
  if (addedLast14 === 0)  verdict = 'freeze'
  else if (ratio >= 1.10) verdict = 'trending_up'
  else if (ratio >= 0.90) verdict = 'stable'
  else if (ratio >= 0.75) verdict = 'slowing'
  else                    verdict = 'freeze'

  return {
    verdict,
    ratio: Math.round(ratio * 100) / 100,
    days_of_data: snaps.length,
  }
}
