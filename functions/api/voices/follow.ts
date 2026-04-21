// /api/voices/follow
//
// POST   → follow a voice source. Body: { source_slug, email }
// DELETE → unfollow a voice source. Body: { source_slug }
//
// Both require an active Wrap+ subscription (see requirePlus()).
// On first follow, a voices_digest_state row is created so the Tuesday
// digest cron knows where to email. Subsequent follows just upsert the
// email (Clerk may have updated it in the meantime).

import { requirePlus, type RequirePlusEnv } from '../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

// -------- POST: follow --------
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { source_slug?: unknown; email?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const slug = typeof body.source_slug === 'string' ? body.source_slug.trim() : ''
  if (!slug) return json({ error: 'missing_source_slug' }, 400)

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'invalid_email' }, 400)
  }

  const src = await env.JOBS_DB.prepare(
    `SELECT id FROM voices_sources WHERE slug = ? AND active = 1 LIMIT 1`
  ).bind(slug).first<{ id: number }>()
  if (!src) return json({ error: 'source_not_found' }, 404)

  // Soft cap — prevents a runaway loop. 50 follows is generous vs the current
  // 8-source seed and leaves headroom as /voices grows.
  const { count } = await env.JOBS_DB.prepare(
    `SELECT COUNT(*) AS count FROM voices_follows WHERE clerk_user_id = ?`
  ).bind(auth.userId).first<{ count: number }>() ?? { count: 0 }
  if (count >= 50) return json({ error: 'follow_limit_reached', limit: 50 }, 409)

  await env.JOBS_DB.batch([
    env.JOBS_DB.prepare(
      `INSERT INTO voices_follows (clerk_user_id, source_id)
       VALUES (?, ?)
       ON CONFLICT(clerk_user_id, source_id) DO NOTHING`
    ).bind(auth.userId, src.id),
    env.JOBS_DB.prepare(
      `INSERT INTO voices_digest_state (clerk_user_id, email, active, updated_at)
       VALUES (?, ?, 1, datetime('now'))
       ON CONFLICT(clerk_user_id) DO UPDATE SET
         email      = excluded.email,
         updated_at = datetime('now')`
    ).bind(auth.userId, email),
  ])

  return json({ ok: true, source_slug: slug })
}

// -------- DELETE: unfollow --------
export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { source_slug?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const slug = typeof body.source_slug === 'string' ? body.source_slug.trim() : ''
  if (!slug) return json({ error: 'missing_source_slug' }, 400)

  await env.JOBS_DB.prepare(
    `DELETE FROM voices_follows
       WHERE clerk_user_id = ?
         AND source_id = (SELECT id FROM voices_sources WHERE slug = ? LIMIT 1)`
  ).bind(auth.userId, slug).run()

  return json({ ok: true, source_slug: slug })
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
