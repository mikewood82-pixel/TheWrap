// Anonymous identity helper for Pages Functions.
//
// Replaces the old Clerk-based requirePlus(). The anonymous id is minted and
// validated by functions/_middleware.ts, which places it on `context.data`.
// This helper just surfaces it with the same `{ userId }` shape requirePlus
// returned, so feature endpoints change by a single line:
//
//   export const onRequestPost: PagesFunction<Env> = async ({ request, env, data }) => {
//     const auth = requireAnon(data)
//     if (auth instanceof Response) return auth
//     // ...use auth.userId as the opaque row-owner id
//   }
//
// `userId` here is a random UUID (the wrap_anon cookie), stored in the existing
// `clerk_user_id` TEXT columns. No account, no token, no Clerk.

export type AnonAuth = { userId: string }

// Accepts the loosely-typed `data` bag Pages hands each function (its default
// type is Record<string, unknown>), so call sites don't need to thread a Data
// generic through every PagesFunction signature.
export function requireAnon(data: { anonId?: unknown }): AnonAuth | Response {
  const id = data?.anonId
  if (typeof id !== 'string' || !id) {
    // Should never happen in production — the middleware always sets it. This
    // guards local/test calls that bypass the middleware.
    return new Response(JSON.stringify({ error: 'no_identity' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  return { userId: id }
}
