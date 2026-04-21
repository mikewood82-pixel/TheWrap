// /api/jobs/watchlist
//
// GET  → list the authenticated Wrap+ member's saved jobs, newest first.
// POST → save a job for the authenticated member. Idempotent (re-saving a
//        job updates its saved_at and replaces the note rather than erroring).
//
// Both methods require a valid Clerk session JWT (Bearer) for a Plus-active
// user — see functions/api/_lib/requirePlus.ts.
//
// Job rows include status so the client can badge closed-but-saved roles
// differently instead of silently hiding them.

import { requirePlus, type RequirePlusEnv } from '../../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

type WatchlistJobRow = {
  id: number
  vendor_slug: string
  vendor_name: string | null
  title: string
  department: string | null
  location: string | null
  remote: string
  seniority: string
  employment_type: string | null
  url: string
  posted_at: string | null
  first_seen_at: string
  status: string
  saved_at: string
  note: string | null
}

// -------- GET: list saved jobs --------
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  const { results } = await env.JOBS_DB.prepare(
    `SELECT jobs.id, jobs.vendor_slug, v.vendor_name,
            jobs.title, jobs.department, jobs.location, jobs.remote,
            jobs.seniority, jobs.employment_type, jobs.url,
            jobs.posted_at, jobs.first_seen_at, jobs.status,
            w.saved_at, w.note
       FROM watchlist w
       JOIN jobs ON jobs.id = w.job_id
       LEFT JOIN vendor_ats v ON v.vendor_slug = jobs.vendor_slug
      WHERE w.clerk_user_id = ?
      ORDER BY w.saved_at DESC`,
  ).bind(auth.userId).all<WatchlistJobRow>()

  const jobs = results ?? []
  return Response.json(
    { jobs, total: jobs.length },
    { headers: { 'cache-control': 'private, no-store' } },
  )
}

// -------- POST: save a job --------
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { job_id?: unknown; note?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const jobId = Number(body.job_id)
  if (!Number.isInteger(jobId) || jobId <= 0) {
    return json({ error: 'invalid_job_id' }, 400)
  }
  const note = typeof body.note === 'string' && body.note.trim() ? body.note.trim().slice(0, 2000) : null

  // Verify the job exists before inserting — the FK catches it but returns an
  // opaque error message; an explicit check yields a cleaner 404.
  const jobExists = await env.JOBS_DB.prepare(
    `SELECT 1 AS ok FROM jobs WHERE id = ? LIMIT 1`,
  ).bind(jobId).first<{ ok: number }>()
  if (!jobExists) return json({ error: 'job_not_found' }, 404)

  await env.JOBS_DB.prepare(
    `INSERT INTO watchlist (clerk_user_id, job_id, saved_at, note)
     VALUES (?, ?, datetime('now'), ?)
     ON CONFLICT(clerk_user_id, job_id) DO UPDATE SET
       saved_at = excluded.saved_at,
       note     = excluded.note`,
  ).bind(auth.userId, jobId, note).run()

  return json({ ok: true, job_id: jobId })
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
