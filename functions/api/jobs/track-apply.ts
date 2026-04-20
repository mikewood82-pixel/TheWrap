// POST /api/jobs/track-apply — lightweight apply-click telemetry.
// Body: { job_id: number }

interface Env { JOBS_DB: D1Database }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { job_id?: number }
  try { body = (await request.json()) as { job_id?: number } }
  catch { return new Response('bad json', { status: 400 }) }

  const jobId = Number(body.job_id)
  if (!Number.isFinite(jobId)) return new Response('bad job_id', { status: 400 })

  const country = (request as unknown as { cf?: { country?: string } }).cf?.country ?? null

  // Fire-and-log. We don't block on verifying the job exists — foreign key handles it.
  try {
    await env.JOBS_DB.prepare(
      `INSERT INTO apply_clicks (job_id, country) VALUES (?, ?)`
    ).bind(jobId, country).run()
  } catch { /* swallow FK violations for bogus ids */ }

  return new Response(null, { status: 204 })
}
