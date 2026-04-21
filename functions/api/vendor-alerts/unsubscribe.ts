// GET/POST /api/vendor-alerts/unsubscribe?token=...
//
// One-click pause for a user's vendor-alert subscriptions. Sets every row
// in vendor_watches (for that user) to active=0; preserves the list so a
// resume from /jobs/vendor-alerts is one click away.

import { verifyUserToken } from '../_lib/voicesSignature'

interface Env {
  JOBS_DB: D1Database
  VENDOR_ALERT_UNSUB_SECRET: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  return handle(env, url.searchParams.get('token') ?? '')
}
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  return handle(env, url.searchParams.get('token') ?? '')
}

async function handle(env: Env, token: string): Promise<Response> {
  if (!token) return html(errorPage('Missing token.'), 400)
  const userId = await verifyUserToken(token, env.VENDOR_ALERT_UNSUB_SECRET)
  if (!userId) return html(errorPage('Invalid or tampered token.'), 400)

  const res = await env.JOBS_DB.prepare(
    `UPDATE vendor_watches SET active = 0, updated_at = datetime('now')
      WHERE clerk_user_id = ? AND active = 1`
  ).bind(userId).run()

  const changed = res.meta.changes ?? 0
  return html(successPage(
    changed === 0
      ? 'Your vendor alerts are already paused.'
      : 'Your vendor alerts are paused.'
  ))
}

function html(body: string, status = 200): Response {
  return new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } })
}

function successPage(heading: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<title>Vendor alerts paused — The Wrap</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { font-family: Georgia, serif; background: #fbf8f3; color: #1a1a1a; margin: 0; }
  .card { max-width: 520px; margin: 80px auto; padding: 40px 32px; background: white; border: 1px solid #eee; border-radius: 12px; text-align: center; }
  h1 { font-size: 24px; margin: 0 0 12px; }
  p { color: #555; line-height: 1.55; }
  .cta { display: inline-block; margin-top: 20px; background: #c0623a; color: white; text-decoration: none; font-weight: 600; padding: 10px 20px; border-radius: 6px; }
  .muted { color: #888; font-size: 13px; margin-top: 24px; }
</style>
</head><body>
  <div class="card">
    <h1>${heading}</h1>
    <p>You won\u2019t get vendor hiring-health alerts again until you resume them.</p>
    <a href="https://ilovethewrap.com/jobs/vendor-alerts" class="cta">Resume or manage vendor alerts</a>
    <p class="muted">Your watch list is preserved — nothing else changes.</p>
  </div>
</body></html>`
}

function errorPage(reason: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<title>Unsubscribe error — The Wrap</title>
<style>
  body { font-family: Georgia, serif; background: #fbf8f3; color: #1a1a1a; margin: 0; }
  .card { max-width: 520px; margin: 80px auto; padding: 40px 32px; background: white; border: 1px solid #eee; border-radius: 12px; text-align: center; }
  h1 { font-size: 22px; margin: 0 0 12px; color: #b33; }
  p { color: #555; line-height: 1.55; }
  .cta { display: inline-block; margin-top: 20px; color: #c0623a; text-decoration: none; font-weight: 600; }
</style>
</head><body>
  <div class="card">
    <h1>We couldn\u2019t process that link</h1>
    <p>${reason}</p>
    <a href="https://ilovethewrap.com/jobs/vendor-alerts" class="cta">Manage vendor alerts on The Wrap →</a>
  </div>
</body></html>`
}
