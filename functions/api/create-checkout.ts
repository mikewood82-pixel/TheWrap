// ─── Wrap+ is free for all subscribers (2026-05-22 pivot) ─────────────
// Stripe checkout is permanently disabled. Wrap+ launched 2026-05-01 at
// $10/mo, hit ~zero conversion, and pivoted to free-for-everyone on
// 2026-05-22. This route stays alive so any stale "Upgrade to Wrap+"
// button still in the wild returns a meaningful response instead of
// a 500. The full plan lives at
// C:\Users\mikew\.claude\plans\elegant-crafting-gizmo.md
//
// stripe-webhook.ts is intentionally left running so existing paid
// subscriptions (a handful of friends) can wind down cleanly via
// cancel_at_period_end. Once those expire (~30 days) the whole Stripe
// integration can be deleted.
// ──────────────────────────────────────────────────────────────────────

const GONE_BODY = {
  error: 'gone',
  message: 'Wrap+ is now free for all subscribers. No checkout needed — just subscribe to the newsletter at https://ilovethewrap.com.',
}

const onGone: PagesFunction = async () =>
  new Response(JSON.stringify(GONE_BODY), {
    status: 410,
    headers: { 'content-type': 'application/json' },
  })

export const onRequestPost = onGone
export const onRequestGet = onGone
