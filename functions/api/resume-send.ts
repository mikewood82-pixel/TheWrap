// One-shot recovery endpoint for a partially-delivered newsletter blast.
// Reconciles Resend's delivered-today list against D1 active subscribers and
// sends ONLY to the diff, so nobody gets the same issue twice.
//
// Usage:
//   POST /api/resume-send          — dry run (counts only, no send)
//   POST /api/resume-send?go=1     — actually send to the missed addresses

interface Env {
  DB: D1Database
  RESEND_API_KEY: string
  DEPLOY_SECRET: string
}

const EMAIL_IMG_STYLE = 'display:block;width:100%;max-width:600px;height:auto;margin:16px auto 8px;border-radius:4px;'
function prepHtmlForEmail(html: string): string {
  return html
    .replace(/\bsrc="\/(?!\/)/g, 'src="https://ilovethewrap.com/')
    .replace(/\bhref="\/(?!\/)/g, 'href="https://ilovethewrap.com/')
    .replace(/<img\b(?![^>]*\bstyle=)([^>]*)>/gi, `<img$1 style="${EMAIL_IMG_STYLE}">`)
}

function bodyHtmlFor(recipient: string, slug: string, html: string): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
      <a href="https://ilovethewrap.com" style="text-decoration: none;">
        <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 60px; margin-bottom: 24px;" />
      </a>
      ${prepHtmlForEmail(html)}
      <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
        <p>You're receiving this because you subscribed at <a href="https://ilovethewrap.com" style="color: #c0623a;">ilovethewrap.com</a></p>
        <p>
          <a href="https://ilovethewrap.com/newsletter/${slug}" style="color: #c0623a;">View in browser</a>
          &nbsp;·&nbsp;
          <a href="https://ilovethewrap.com/api/unsubscribe?email=${encodeURIComponent(recipient)}" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const secret = request.headers.get('x-deploy-secret')
  if (secret !== env.DEPLOY_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { slug, subject, html } = await request.json() as {
    slug: string
    subject: string
    html: string
  }

  const url = new URL(request.url)
  const go = url.searchParams.get('go') === '1'
  const cutoff = url.searchParams.get('cutoff') ?? new Date().toISOString().split('T')[0] // default "today"

  // ── 1. Walk Resend's list of emails (newest-first) and collect addresses
  //       that already received this subject on or after `cutoff`. Stop as
  //       soon as we cross the cutoff date — Resend orders by created_at DESC
  //       so further pages are strictly older and contribute nothing.
  const delivered = new Set<string>()
  const unmatched: string[] = []
  let cursor: string | null = null
  let pages = 0
  let hitMax = false
  // 30 pages × 100 emails = 3,000 — covers a 2,500-recipient broadcast plus
  // a normal day's transactional volume. Larger caps tripped the 30s
  // worker wall-clock on busy days and returned a CF-generated 502.
  const MAX_PAGES = 30
  while (true) {
    if (pages >= MAX_PAGES) { hitMax = true; break }
    const listUrl = `https://api.resend.com/emails?limit=100${cursor ? `&after=${cursor}` : ''}`
    const r = await fetch(listUrl, {
      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}` },
    })
    if (!r.ok) {
      const detail = await r.text()
      return Response.json({ error: 'resend list failed', status: r.status, detail }, { status: 502 })
    }
    const data: any = await r.json()
    const items: any[] = data?.data ?? []
    if (items.length === 0) break

    let walkedPastCutoff = false
    for (const e of items) {
      const created = (e.created_at ?? '').slice(0, 10)
      if (created && created < cutoff) {
        walkedPastCutoff = true
        continue
      }
      if (e.subject === subject) {
        for (const addr of (e.to ?? [])) {
          if (typeof addr === 'string') delivered.add(addr.toLowerCase())
        }
      } else {
        unmatched.push(`${created} ${String(e.subject ?? '').slice(0, 60)}`)
      }
    }

    if (walkedPastCutoff) break
    if (items.length < 100) break
    cursor = items[items.length - 1]?.id ?? null
    if (!cursor) break
    pages++
  }

  // ── 2. Active subscribers from D1
  const { results } = await env.DB.prepare(
    'SELECT email FROM subscribers WHERE active = 1'
  ).all<{ email: string }>()

  const active = results.map(r => r.email)
  const missed = active.filter(e => !delivered.has(e.toLowerCase()))

  // ── 3. Dry-run short-circuit
  if (!go) {
    return Response.json({
      dry_run: true,
      cutoff,
      pages_walked: pages + 1,
      hit_max: hitMax,
      total_active_subs: active.length,
      already_delivered: delivered.size,
      to_send_count: missed.length,
      to_send_sample: missed.slice(0, 5),
      unmatched_subjects_sample: unmatched.slice(0, 5),
    })
  }

  // Refuse to send when we capped pagination — `missed` may include subs who
  // received the email on un-walked pages, and re-sending double-emails them.
  if (hitMax) {
    return Response.json({
      error: 'pagination cap hit — refusing to send',
      hint: 'Re-run dry mode with a tighter cutoff (?cutoff=YYYY-MM-DD) so the walk finishes.',
      pages_walked: pages + 1,
      already_delivered: delivered.size,
    }, { status: 409 })
  }

  // ── 4. Real send — batch 100 at a time, same pattern as send-newsletter.ts
  const batchSize = 100
  let sent = 0
  const errors: string[] = []

  for (let i = 0; i < missed.length; i += batchSize) {
    const batch = missed.slice(i, i + batchSize)
    const payload = batch.map(recipient => ({
      from: 'Mike Wood <mike@ilovethewrap.com>',
      to: [recipient],
      subject,
      html: bodyHtmlFor(recipient, slug, html),
    }))

    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.text()
      errors.push(`batch offset=${i}: ${err}`)
      // Stop on failure so we don't thrash the API — partial progress is fine,
      // caller can re-run this endpoint and pagination will skip already-sent.
      break
    }
    sent += batch.length
  }

  // ── 5. Record to sent_newsletters (INSERT OR IGNORE — another slug-write
  //       may already exist if this is the second recovery pass).
  const grandTotal = delivered.size + sent
  if (sent > 0 && errors.length === 0) {
    await env.DB.prepare(
      'INSERT OR IGNORE INTO sent_newsletters (slug, recipient_count) VALUES (?, ?)'
    ).bind(slug, grandTotal).run()
  }

  return Response.json({
    cutoff,
    total_active_subs: active.length,
    already_delivered_before: delivered.size,
    just_sent: sent,
    grand_total_recipients: grandTotal,
    errors,
    recorded_in_d1: sent > 0 && errors.length === 0,
  })
}
