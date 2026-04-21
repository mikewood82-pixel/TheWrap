// DELETE /api/jobs/watchlist/{job_id}
//
// Removes a saved job for the authenticated Wrap+ member. Returns 204 whether
// or not the row existed — idempotent un-save from the client's perspective.

import { requirePlus, type RequirePlusEnv } from '../../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

export const onRequestDelete: PagesFunction<Env, 'job_id'> = async ({
  request, env, params,
}) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  const jobId = Number(params.job_id)
  if (!Number.isInteger(jobId) || jobId <= 0) {
    return new Response(JSON.stringify({ error: 'invalid_job_id' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  await env.JOBS_DB.prepare(
    `DELETE FROM watchlist WHERE clerk_user_id = ? AND job_id = ?`,
  ).bind(auth.userId, jobId).run()

  return new Response(null, { status: 204 })
}
