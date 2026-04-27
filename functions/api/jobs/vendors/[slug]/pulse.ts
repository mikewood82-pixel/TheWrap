// GET /api/jobs/vendors/{slug}/pulse — per-vendor hiring pulse for the
// Vendor Deep Dive "Hiring Pulse" section. Returns:
//   - 90-day open_jobs sparkline from vendor_snapshots
//   - 30d / 90d delta in open jobs
//   - Function classification from job titles (Eng / Product / Sales / CS / Marketing / Design / Other)
//   - Remote / hybrid / onsite mix
//   - Seniority breakdown
//   - Hiring health verdict (re-uses computeHealth)
//
// Cached 5 min — moves slowly enough that aggressive caching is safe and
// keeps deep-dive page loads snappy.

import { computeHealth, type SnapRow, type HealthPayload } from '../../../_lib/vendorHealth'

interface Env { JOBS_DB: D1Database }

type JobRow = { title: string; remote: string | null; seniority: string | null }

type FunctionKey = 'Engineering' | 'Product' | 'Sales' | 'CS' | 'Marketing' | 'Design' | 'Ops' | 'Other'

// Classify a title into a coarse function bucket. Keyword regex — quick
// and ~80% accurate. First match wins; order is deliberate (engineering
// keywords are common as substrings of other roles, so we test more
// specific roles first).
function classifyFunction(rawTitle: string): FunctionKey {
  const t = rawTitle.toLowerCase()
  if (/\b(account executive|ae|sdr|bdr|sales|account manager|business development)\b/.test(t)) return 'Sales'
  if (/\b(customer success|csm|support engineer|technical support|implementation)\b/.test(t)) return 'CS'
  if (/\b(product manager|product designer|product owner|\bpm\b)\b/.test(t)) return 'Product'
  if (/\b(designer|ux|ui|user experience|user interface|brand)\b/.test(t)) return 'Design'
  if (/\b(marketing|content|growth|demand gen|seo|social|comms)\b/.test(t)) return 'Marketing'
  if (/\b(engineer|developer|swe|sre|devops|architect|software|data scientist|ml |machine learning|technical lead)\b/.test(t)) return 'Engineering'
  if (/\b(recruiter|talent|finance|accounting|legal|people|hr |operations|ops |chief|president)\b/.test(t)) return 'Ops'
  return 'Other'
}

function bucket<T extends string>(rows: { v: T | null }[], fallback: T): Record<T, number> {
  const out = {} as Record<T, number>
  for (const r of rows) {
    const k = (r.v ?? fallback) as T
    out[k] = (out[k] ?? 0) + 1
  }
  return out
}

export const onRequestGet: PagesFunction<Env, 'slug'> = async ({ params, env }) => {
  const slug = String(params.slug)
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return new Response('bad slug', { status: 400 })

  const [snapRes, jobRes] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(
      `SELECT vendor_slug, snapshot_date, open_jobs, jobs_added
         FROM vendor_snapshots
        WHERE vendor_slug = ?
          AND snapshot_date >= date('now', '-90 days')
     ORDER BY snapshot_date ASC`,
    ).bind(slug),
    env.JOBS_DB.prepare(
      `SELECT title, remote, seniority
         FROM jobs
        WHERE vendor_slug = ? AND status = 'open'`,
    ).bind(slug),
  ]) as unknown as [
    { results: SnapRow[] },
    { results: JobRow[] },
  ]

  const snaps = snapRes.results ?? []
  const jobs = jobRes.results ?? []

  // Sparkline: last 30 daily points (or whatever we have)
  const sparkline = snaps.slice(-30).map(s => ({ date: s.snapshot_date, open_jobs: s.open_jobs }))

  // Delta vs N days ago (open_jobs current - open_jobs N days ago)
  const currentOpen = jobs.length
  const snapAt = (n: number) => {
    if (snaps.length === 0) return null
    const target = snaps.length - 1 - n
    return target >= 0 ? snaps[target].open_jobs : snaps[0].open_jobs
  }
  const open30dAgo = snapAt(30)
  const open90dAgo = snapAt(90)
  const delta30 = open30dAgo === null ? null : currentOpen - open30dAgo
  const delta90 = open90dAgo === null ? null : currentOpen - open90dAgo

  // Function bucket
  const functionCounts = {} as Record<FunctionKey, number>
  for (const j of jobs) {
    const fn = classifyFunction(j.title)
    functionCounts[fn] = (functionCounts[fn] ?? 0) + 1
  }

  // Remote / seniority distribution
  const remoteCounts = bucket(jobs.map(j => ({ v: j.remote })), 'unknown')
  const seniorityCounts = bucket(jobs.map(j => ({ v: j.seniority })), 'unknown')

  // Health verdict (shared logic with the listing endpoint)
  const health: HealthPayload = computeHealth(snaps)

  return Response.json(
    {
      slug,
      open_jobs: currentOpen,
      delta_30d: delta30,
      delta_90d: delta90,
      sparkline,
      functions: functionCounts,
      remote: remoteCounts,
      seniority: seniorityCounts,
      health,
    },
    { headers: { 'cache-control': 'public, max-age=300, s-maxage=300' } },
  )
}
