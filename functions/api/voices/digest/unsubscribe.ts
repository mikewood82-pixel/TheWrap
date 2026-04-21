// GET /api/voices/digest/unsubscribe?token=...
//
// One-click pause of the Voices digest, no sign-in required. Sets
// voices_digest_state.active = 0 for the user identified by the signed
// token. The email's List-Unsubscribe header points at this too, so
// Gmail/Outlook's native "unsubscribe" button also works.
//
// Gives back a styled confirmation page matching the site theme.

import { verifyUserToken } from '../../_lib/voicesSignature'

interface Env {
  JOBS_DB: D1Database
  VOICES_UNSUB_SECRET: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') ?? ''
  return handle(env, token)
}

// Gmail's one-click uses POST.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') ?? ''
  return handle(env, token)
}

async function handle(env: Env, token: string): Promise<Response> {
  if (!token) return html(errorPage('Missing token.'), 400)

  const userId = await verifyUserToken(token, env.VOICES_UNSUB_SECRET)
  if (!userId) return html(errorPage('Invalid or tampered token.'), 400)

  const res = await env.JOBS_DB.prepare(
    `UPDATE voices_digest_state
        SET active = 0, updated_at = datetime('now')
      WHERE clerk_user_id = ?`
  ).bind(userId).run()

  const changed = res.meta.changes ?? 0
  if (changed === 0) {
    // Either already paused, or the user has no digest state row.
    return html(successPage('Your Voices digest is already paused.'))
  }
  return html(successPage('Your Voices digest is paused.'))
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

function successPage(heading: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<title>Voices digest paused — The Wrap</title>
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
    <p>You won’t get the Tuesday Voices digest again until you resume it.</p>
    <a href="https://ilovethewrap.com/voices/following" class="cta">Resume or manage voices</a>
    <p class="muted">Your follows are preserved — nothing else changes.</p>
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
    <h1>We couldn’t process that link</h1>
    <p>${reason}</p>
    <a href="https://ilovethewrap.com/voices/following" class="cta">Manage voices on The Wrap →</a>
  </div>
</body></html>`
}
