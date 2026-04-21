// GET /api/jobs/alerts/unsubscribe?token={signed}
//
// One-click pause endpoint linked from each alert digest email. No Clerk
// session required — authorized purely by a signed HMAC token baked into the
// URL at send time. See functions/api/_lib/alertSignature.ts for the shape.
//
// Success → set alerts.active = 0 (pause, don't delete — preserves history
// and lets the user un-pause later at /jobs/alerts).

import { verifyAlertToken } from '../../_lib/alertSignature'

interface Env {
  JOBS_DB: D1Database
  ALERT_UNSUB_SECRET: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') ?? ''
  if (!token) return html(htmlError('Missing token.'), 400)

  const alertId = await verifyAlertToken(token, env.ALERT_UNSUB_SECRET)
  if (alertId === null) return html(htmlError('Invalid or tampered unsubscribe link.'), 400)

  const row = await env.JOBS_DB.prepare(
    `SELECT id, name, active FROM alerts WHERE id = ?`,
  ).bind(alertId).first<{ id: number; name: string | null; active: number }>()

  if (!row) return html(htmlSuccess('That alert no longer exists — you won\'t receive any more emails for it.'))

  if (row.active === 1) {
    await env.JOBS_DB.prepare(
      `UPDATE alerts SET active = 0 WHERE id = ?`,
    ).bind(alertId).run()
  }

  return html(htmlSuccess(
    `You've paused "${escapeHtml(row.name ?? 'this alert')}". You won't receive any more emails for it until you resume it at <a href="https://ilovethewrap.com/jobs/alerts" style="color:#c0623a;">manage alerts</a>.`,
  ))
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

function htmlSuccess(message: string): string {
  return shell('Alert paused — The Wrap', `
    <h1>Alert paused.</h1>
    <p>${message}</p>
    <p><a href="https://ilovethewrap.com/jobs">Back to The Wrap jobs</a></p>
  `)
}

function htmlError(message: string): string {
  return shell('Unsubscribe — The Wrap', `
    <h1>We couldn't process that.</h1>
    <p>${escapeHtml(message)}</p>
    <p><a href="https://ilovethewrap.com/jobs/alerts">Manage your alerts</a></p>
  `)
}

function shell(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8" /><title>${escapeHtml(title)}</title>
<style>
  body { font-family: Georgia, serif; max-width: 520px; margin: 80px auto; padding: 0 20px; color: #1a1a1a; text-align: center; }
  h1 { font-size: 26px; margin-bottom: 12px; }
  p { color: #666; line-height: 1.7; }
  a { color: #c0623a; }
</style></head><body>${inner}</body></html>`
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
