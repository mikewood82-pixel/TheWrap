// /api/vendor-alerts
//
// GET    → list the authenticated Wrap+ member's vendor watches +
//          the latest known verdict for each one (from vendor_health_history).
// POST   → add a watch. Body: { vendor_slug, email }
// DELETE → remove a watch. Body: { vendor_slug }
// PATCH  → pause/resume. Body: { active: boolean } (scope: all user's watches)
//
// All methods require an active Wrap+ subscription.

import { requirePlus, type RequirePlusEnv } from '../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

type WatchRow = {
  vendor_slug: string
  vendor_name: string | null
  active: number
  created_at: string
  webhook_url: string | null
  latest_verdict: string | null
  latest_verdict_date: string | null
  open_jobs: number | null
}

// -------- GET --------
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  // For each watch, also pull the latest known verdict (if any) + live open_jobs
  // count so the management page can render rich tiles without extra calls.
  const { results } = await env.JOBS_DB.prepare(
    `SELECT w.vendor_slug,
            va.vendor_name,
            w.active,
            w.created_at,
            w.webhook_url,
            (SELECT verdict
               FROM vendor_health_history h
              WHERE h.vendor_slug = w.vendor_slug
              ORDER BY h.verdict_date DESC
              LIMIT 1) AS latest_verdict,
            (SELECT verdict_date
               FROM vendor_health_history h
              WHERE h.vendor_slug = w.vendor_slug
              ORDER BY h.verdict_date DESC
              LIMIT 1) AS latest_verdict_date,
            (SELECT COUNT(*) FROM jobs j
              WHERE j.vendor_slug = w.vendor_slug AND j.status = 'open') AS open_jobs
       FROM vendor_watches w
       LEFT JOIN vendor_ats va ON va.vendor_slug = w.vendor_slug
      WHERE w.clerk_user_id = ?
      ORDER BY va.vendor_name COLLATE NOCASE ASC`
  ).bind(auth.userId).all<WatchRow>()

  const watches = (results ?? []).map(r => ({
    vendor_slug: r.vendor_slug,
    vendor_name: r.vendor_name ?? r.vendor_slug,
    active: r.active === 1,
    created_at: r.created_at,
    webhook_url: r.webhook_url,
    latest_verdict: r.latest_verdict,
    latest_verdict_date: r.latest_verdict_date,
    open_jobs: r.open_jobs ?? 0,
  }))

  return Response.json({ watches, total: watches.length }, {
    headers: { 'cache-control': 'private, no-store' },
  })
}

// -------- POST --------
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { vendor_slug?: unknown; email?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const slug = typeof body.vendor_slug === 'string' ? body.vendor_slug.trim() : ''
  if (!slug) return json({ error: 'missing_vendor_slug' }, 400)

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'invalid_email' }, 400)
  }

  // Confirm vendor exists in vendor_ats (FK would catch it but an explicit
  // check gives a cleaner error).
  const vendor = await env.JOBS_DB.prepare(
    `SELECT 1 FROM vendor_ats WHERE vendor_slug = ? LIMIT 1`
  ).bind(slug).first<{ ok: number }>()
  if (!vendor) return json({ error: 'vendor_not_found' }, 404)

  // Soft cap — 50 vendor watches is generous vs the ~30 vendors we track.
  const { count } = await env.JOBS_DB.prepare(
    `SELECT COUNT(*) AS count FROM vendor_watches WHERE clerk_user_id = ?`
  ).bind(auth.userId).first<{ count: number }>() ?? { count: 0 }
  if (count >= 50) return json({ error: 'watch_limit_reached', limit: 50 }, 409)

  await env.JOBS_DB.prepare(
    `INSERT INTO vendor_watches (clerk_user_id, vendor_slug, email, active, updated_at)
     VALUES (?, ?, ?, 1, datetime('now'))
     ON CONFLICT(clerk_user_id, vendor_slug) DO UPDATE SET
       email      = excluded.email,
       active     = 1,
       updated_at = datetime('now')`
  ).bind(auth.userId, slug, email).run()

  return json({ ok: true, vendor_slug: slug })
}

// -------- DELETE --------
export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { vendor_slug?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const slug = typeof body.vendor_slug === 'string' ? body.vendor_slug.trim() : ''
  if (!slug) return json({ error: 'missing_vendor_slug' }, 400)

  await env.JOBS_DB.prepare(
    `DELETE FROM vendor_watches WHERE clerk_user_id = ? AND vendor_slug = ?`
  ).bind(auth.userId, slug).run()

  return json({ ok: true, vendor_slug: slug })
}

// -------- PATCH --------
// Two shapes:
//   { active: boolean }                      → pause/resume all watches
//   { vendor_slug, webhook_url|null }         → set/clear webhook on one watch
export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { active?: unknown; vendor_slug?: unknown; webhook_url?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  // Per-watch webhook update
  if (typeof body.vendor_slug === 'string') {
    const slug = body.vendor_slug.trim()
    if (!slug) return json({ error: 'missing_vendor_slug' }, 400)

    let webhookUrl: string | null = null
    if (body.webhook_url === null || body.webhook_url === '') {
      webhookUrl = null
    } else if (typeof body.webhook_url === 'string') {
      const url = body.webhook_url.trim()
      if (!/^https:\/\//i.test(url)) return json({ error: 'invalid_webhook_url' }, 400)
      webhookUrl = url.slice(0, 500)
    } else {
      return json({ error: 'invalid_webhook_url' }, 400)
    }

    const res = await env.JOBS_DB.prepare(
      `UPDATE vendor_watches
          SET webhook_url = ?, updated_at = datetime('now')
        WHERE clerk_user_id = ? AND vendor_slug = ?`
    ).bind(webhookUrl, auth.userId, slug).run()
    if ((res.meta.changes ?? 0) === 0) return json({ error: 'not_found' }, 404)
    return json({ ok: true, vendor_slug: slug, webhook_url: webhookUrl })
  }

  // Bulk pause/resume
  if (typeof body.active !== 'boolean') return json({ error: 'missing_active' }, 400)

  const res = await env.JOBS_DB.prepare(
    `UPDATE vendor_watches
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
