// /api/jobs/alerts/{id}
//
// PATCH  → toggle active / rename. Body: {active?: boolean, name?: string}.
// DELETE → remove the alert (and its alert_sent rows via CASCADE).
//
// Both require the authed caller to own the alert row.

import { requirePlus, type RequirePlusEnv } from '../../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

// ---- DELETE ------------------------------------------------------------------
export const onRequestDelete: PagesFunction<Env, 'id'> = async ({
  request, env, params,
}) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  const alertId = Number(params.id)
  if (!Number.isInteger(alertId) || alertId <= 0) {
    return json({ error: 'invalid_id' }, 400)
  }

  // Ownership-scoped delete: if the row exists but belongs to another user,
  // DELETE matches zero rows and we return 404 rather than leaking existence.
  const res = await env.JOBS_DB.prepare(
    `DELETE FROM alerts WHERE id = ? AND clerk_user_id = ?`,
  ).bind(alertId, auth.userId).run()

  if ((res.meta.changes ?? 0) === 0) return json({ error: 'not_found' }, 404)
  return new Response(null, { status: 204 })
}

// ---- PATCH -------------------------------------------------------------------
export const onRequestPatch: PagesFunction<Env, 'id'> = async ({
  request, env, params,
}) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  const alertId = Number(params.id)
  if (!Number.isInteger(alertId) || alertId <= 0) {
    return json({ error: 'invalid_id' }, 400)
  }

  let body: { active?: unknown; name?: unknown; frequency?: unknown; webhook_url?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const sets: string[] = []
  const binds: unknown[] = []
  if (typeof body.active === 'boolean') {
    sets.push('active = ?'); binds.push(body.active ? 1 : 0)
  }
  if (typeof body.name === 'string') {
    const name = body.name.trim().slice(0, 120)
    if (!name) return json({ error: 'invalid_name' }, 400)
    sets.push('name = ?'); binds.push(name)
  }
  if (typeof body.frequency === 'string') {
    const f = body.frequency.trim().toLowerCase()
    if (f !== 'daily' && f !== 'weekly') return json({ error: 'invalid_frequency' }, 400)
    sets.push('frequency = ?'); binds.push(f)
  }
  if ('webhook_url' in body) {
    // Allow null/empty to clear. Validate any non-empty value as https://...
    if (body.webhook_url === null || body.webhook_url === '') {
      sets.push('webhook_url = NULL')
    } else if (typeof body.webhook_url === 'string') {
      const url = body.webhook_url.trim()
      if (!/^https:\/\//i.test(url)) return json({ error: 'invalid_webhook_url' }, 400)
      sets.push('webhook_url = ?'); binds.push(url.slice(0, 500))
    } else {
      return json({ error: 'invalid_webhook_url' }, 400)
    }
  }
  if (!sets.length) return json({ error: 'no_fields' }, 400)

  const res = await env.JOBS_DB.prepare(
    `UPDATE alerts SET ${sets.join(', ')} WHERE id = ? AND clerk_user_id = ?`,
  ).bind(...binds, alertId, auth.userId).run()

  if ((res.meta.changes ?? 0) === 0) return json({ error: 'not_found' }, 404)
  return json({ ok: true })
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
