// GET /api/jobs/pulse
//
// Public weekly snapshot powering the homepage "HR Tech Pulse" strip.
// Aggregate counts only — names/details live behind Wrap+ (/vendors).
//
// Data flow mirrors /api/jobs/vendors: pull last-30d snapshots, group by
// vendor, run the shared computeHealth() helper, tally verdicts. A
// separate count of jobs.first_seen_at >= 7 days ago gives the "new
// roles this week" headline number.
//
// Cache: 15 min at the edge. This is a low-variance marketing surface —
// aggressive caching keeps it snappy without materially stale data.

import { computeHealth, type SnapRow } from '../_lib/vendorHealth'

interface Env { JOBS_DB: D1Database }

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const [snapRes, jobsRes, vendorRes] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(
      `SELECT vendor_slug, snapshot_date, open_jobs, jobs_added
         FROM vendor_snapshots
        WHERE snapshot_date >= date('now', '-30 days')
     ORDER BY vendor_slug ASC, snapshot_date ASC`
    ),
    env.JOBS_DB.prepare(
      // Rolling 24-hour window instead of a week-to-date figure so the number
      // reflects real daily flow rather than a launch-period artifact.
      `SELECT COUNT(*) AS n FROM jobs
        WHERE status = 'open'
          AND first_seen_at >= datetime('now', '-1 days')`
    ),
    env.JOBS_DB.prepare(
      `SELECT COUNT(*) AS n FROM vendor_ats WHERE active = 1`
    ),
  ]) as unknown as [
    { results: SnapRow[] },
    { results: { n: number }[] },
    { results: { n: number }[] },
  ]

  // Bucket snapshots per vendor.
  const byVendor = new Map<string, SnapRow[]>()
  for (const s of snapRes.results ?? []) {
    const arr = byVendor.get(s.vendor_slug) ?? []
    arr.push(s)
    byVendor.set(s.vendor_slug, arr)
  }

  // Tally verdicts. Vendors that don't produce a verdict (too new / too
  // small) don't contribute to any bucket — they show up in
  // `vendors_total` but not in the verdict counts.
  let trendingUp = 0, stable = 0, slowing = 0, freeze = 0, vendorsAnalyzed = 0
  for (const [, snaps] of byVendor) {
    const h = computeHealth(snaps)
    if (!h) continue
    vendorsAnalyzed++
    switch (h.verdict) {
      case 'trending_up': trendingUp++; break
      case 'stable':      stable++;     break
      case 'slowing':     slowing++;    break
      case 'freeze':      freeze++;     break
    }
  }

  const payload = {
    verdicts: {
      trending_up: trendingUp,
      stable,
      slowing,
      freeze,
    },
    jobs_added_24h: jobsRes.results[0]?.n ?? 0,
    vendors_analyzed: vendorsAnalyzed,
    vendors_total: vendorRes.results[0]?.n ?? 0,
    as_of: new Date().toISOString(),
  }

  return Response.json(payload, {
    headers: { 'cache-control': 'public, max-age=900, s-maxage=900' },
  })
}
