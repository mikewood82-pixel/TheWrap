// Anonymous identity middleware.
//
// Runs on every Pages route (SPA documents and /api/* alike). It ensures each
// browser carries a stable, unguessable `wrap_anon` cookie and exposes its
// value to downstream functions as `data.anonId`. Feature endpoints key their
// D1 rows on this id (see functions/api/_lib/requireAnon.ts) instead of a
// signed-in user — the site has no accounts anymore (Clerk was removed
// 2026-08-03; every Wrap+ feature is free and now anonymous).
//
// The id is a v4 UUID (122 bits of entropy). It is a bearer credential for
// low-sensitivity data (bookmarked public jobs, a self-typed alert email), so
// the cookie is HttpOnly + Secure + SameSite=Lax to close the realistic theft
// vectors. There is intentionally no cross-device sync: clearing cookies loses
// the on-site list, which is the understood cost of not signing in.

const COOKIE = 'wrap_anon'
// ~400 days — the Chrome cap on cookie lifetime. The middleware re-mints
// automatically if the cookie ever goes missing.
const MAX_AGE = 34_560_000
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface Data {
  anonId?: string
  // PagesFunction's Data generic must be assignable to Record<string, unknown>.
  [key: string]: unknown
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim()
  }
  return null
}

export const onRequest: PagesFunction<unknown, string, Data> = async (context) => {
  const existing = readCookie(context.request.headers.get('cookie'), COOKIE)

  if (existing && UUID_RE.test(existing)) {
    // Already identified — just hand the id downstream, no Set-Cookie churn.
    context.data.anonId = existing
    return context.next()
  }

  // No valid cookie yet — mint one and set it on the response.
  const id = crypto.randomUUID()
  context.data.anonId = id

  const response = await context.next()
  // Clone so we can attach a header even if next() returned an immutable
  // response (static assets served by Pages are read-only).
  const res = new Response(response.body, response)
  res.headers.append(
    'Set-Cookie',
    `${COOKIE}=${id}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure; HttpOnly`,
  )
  return res
}
