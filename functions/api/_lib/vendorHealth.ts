// Shared hiring-health verdict computation.
//
// Used by:
//   - GET /api/jobs/vendors            — live verdict display
//   - POST /api/vendor-alerts/deliver  — detect day-over-day verdict changes
//
// Rules (also documented in the roadmap plan):
//   - Need at least 3 days of snapshots — below that, no verdict.
//   - Skip tiny vendors (avg open_jobs < 5) — noise, not signal.
//   - ratio = avg(open_jobs, last 7d) / avg(open_jobs, last 30d)
//       ratio >= 1.10  -> trending_up
//       0.90 - 1.10    -> stable
//       0.75 - 0.90    -> slowing
//       <  0.75        -> freeze
//   - Hard override: zero new roles added in the last 14 days forces 'freeze',
//     even if the open count is holding steady (nothing's closing = stagnant).

export type HealthVerdict = 'trending_up' | 'stable' | 'slowing' | 'freeze'

export type HealthPayload = {
  verdict: HealthVerdict
  ratio: number           // 7d-avg / 30d-avg, rounded to 2 decimals
  days_of_data: number
} | null

export type SnapRow = {
  vendor_slug: string
  snapshot_date: string
  open_jobs: number
  jobs_added: number
}

export function computeHealth(snaps: SnapRow[]): HealthPayload {
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

// Human-friendly label for email/UI use.
export function verdictLabel(v: HealthVerdict): string {
  switch (v) {
    case 'trending_up': return 'Trending up'
    case 'stable':      return 'Stable'
    case 'slowing':     return 'Slowing'
    case 'freeze':      return 'Freeze'
  }
}
