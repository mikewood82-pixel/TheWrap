// GET /api/voices/following
//
// Returns the authenticated Wrap+ member's follow set + digest state.
// Used by FollowContext on page load and by the /voices/following page.

import { requirePlus, type RequirePlusEnv } from '../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

type SourceRow = {
  slug: string
  name: string
  kind: string
  site_url: string
  avatar_url: string | null
  description: string | null
  followed_at: string
}

type StateRow = {
  email: string | null
  active: number | null
  last_sent_at: string | null
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  const [{ results: sourceRows }, stateRow] = await Promise.all([
    env.JOBS_DB.prepare(
      `SELECT s.slug, s.name, s.kind, s.site_url, s.avatar_url, s.description,
              f.created_at AS followed_at
         FROM voices_follows f
         JOIN voices_sources s ON s.id = f.source_id
        WHERE f.clerk_user_id = ?
          AND s.active = 1
        ORDER BY s.name COLLATE NOCASE ASC`
    ).bind(auth.userId).all<SourceRow>(),
    env.JOBS_DB.prepare(
      `SELECT email, active, last_sent_at
         FROM voices_digest_state
        WHERE clerk_user_id = ?`
    ).bind(auth.userId).first<StateRow>(),
  ])

  return Response.json({
    sources: sourceRows ?? [],
    state: stateRow
      ? { active: stateRow.active === 1, email: stateRow.email, last_sent_at: stateRow.last_sent_at }
      : { active: false, email: null, last_sent_at: null },
  }, {
    headers: { 'cache-control': 'private, no-store' },
  })
}

// PATCH /api/voices/following
// Toggle digest delivery on/off. Body: { active: boolean }. No-op if the
// user has never followed anything (no digest_state row to update).
export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { active?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  if (typeof body.active !== 'boolean') {
    return json({ error: 'missing_active' }, 400)
  }

  const res = await env.JOBS_DB.prepare(
    `UPDATE voices_digest_state
        SET active = ?, updated_at = datetime('now')
      WHERE clerk_user_id = ?`
  ).bind(body.active ? 1 : 0, auth.userId).run()

  return json({ ok: true, active: body.active, updated: res.meta.changes ?? 0 })
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
