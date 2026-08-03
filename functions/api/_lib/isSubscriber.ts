// Shared newsletter-subscriber check.
//
// Since the site dropped accounts (2026-08-03), the email-driven features —
// job alerts, vendor alerts, and the Voices Tuesday digest — are a perk for
// newsletter subscribers rather than anyone with an account. Creating one
// requires an email that matches an active row in `subscribers` (the D1 `DB`
// binding, written by functions/api/subscribe.ts). Save-jobs needs no email
// and does NOT use this.

export async function isSubscriber(db: D1Database, email: string): Promise<boolean> {
  const row = await db
    .prepare('SELECT 1 AS ok FROM subscribers WHERE email = ? AND active = 1 LIMIT 1')
    .bind(email.toLowerCase().trim())
    .first<{ ok: number }>()
  return !!row
}
