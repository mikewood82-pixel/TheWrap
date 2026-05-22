// Clerk + Wrap+ authorization helper for Pages Functions.
//
// Usage from a Plus-gated endpoint:
//
//   import { requirePlus } from '../_lib/requirePlus'
//
//   export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
//     const auth = await requirePlus(request, env)
//     if (auth instanceof Response) return auth       // 401 / 403 shortcut
//     // ...use auth.userId as the trusted Clerk user id
//   }
//
// The frontend must send a Clerk session JWT in the `Authorization: Bearer ...`
// header. Pair this helper with getAuthedFetch() in WrapPlusContext.
//
// Required environment vars in Cloudflare Pages:
//   CLERK_SECRET_KEY    — from Clerk dashboard (API keys → Secret key)
//   CLERK_JWT_KEY       — optional; PEM public key for offline verification.
//                         Preferred at the edge (no extra network hop).
//   SUBSCRIPTIONS       — KV binding already used by subscription.ts

import { verifyToken } from '@clerk/backend'

export interface RequirePlusEnv {
  CLERK_SECRET_KEY: string
  CLERK_JWT_KEY?: string
  SUBSCRIPTIONS: KVNamespace
}

export type PlusAuth = { userId: string }

export async function requirePlus(
  request: Request,
  env: RequirePlusEnv,
): Promise<PlusAuth | Response> {
  const header = request.headers.get('authorization') ?? ''
  const match = header.match(/^Bearer (.+)$/i)
  if (!match) {
    return unauthorized('missing bearer token')
  }
  const token = match[1].trim()

  let payload: { sub?: string } | undefined
  try {
    payload = await verifyToken(token, {
      secretKey: env.CLERK_SECRET_KEY,
      jwtKey: env.CLERK_JWT_KEY,
    })
  } catch {
    return unauthorized('invalid or expired token')
  }

  const userId = payload?.sub
  if (!userId) {
    return unauthorized('token missing subject')
  }

  // ─── Wrap+ is free for all subscribers (2026-05-22 pivot) ─────────────
  // The KV `active` check has been removed: any signed-in Clerk user now
  // counts as "Plus." See WrapPlusContext.tsx and the plan at
  // C:\Users\mikew\.claude\plans\elegant-crafting-gizmo.md for context.
  // The KV namespace + stripe-webhook.ts still run so existing paid subs
  // can wind down cleanly via cancel_at_period_end.
  // ──────────────────────────────────────────────────────────────────────

  return { userId }
}

// Same shape as requirePlus but only requires a signed-in Clerk user, not
// Plus status. Exported for future non-Plus authed endpoints (e.g. read-only
// profile endpoints). Not used in Phase 0/1 but kept here so the pattern is
// colocated.
export async function requireSignedIn(
  request: Request,
  env: RequirePlusEnv,
): Promise<PlusAuth | Response> {
  const header = request.headers.get('authorization') ?? ''
  const match = header.match(/^Bearer (.+)$/i)
  if (!match) return unauthorized('missing bearer token')

  try {
    const payload = await verifyToken(match[1].trim(), {
      secretKey: env.CLERK_SECRET_KEY,
      jwtKey: env.CLERK_JWT_KEY,
    })
    if (!payload?.sub) return unauthorized('token missing subject')
    return { userId: payload.sub }
  } catch {
    return unauthorized('invalid or expired token')
  }
}

function unauthorized(reason: string): Response {
  return new Response(JSON.stringify({ error: 'unauthorized', reason }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  })
}

function forbidden(reason: string): Response {
  return new Response(JSON.stringify({ error: 'forbidden', reason }), {
    status: 403,
    headers: { 'content-type': 'application/json' },
  })
}
