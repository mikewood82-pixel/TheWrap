// Recovery endpoint for a partially-delivered newsletter blast.
// Diffs D1's sent_newsletter_recipients table against the active subscriber
// list and sends ONLY to addresses that don't yet have a delivery row.
// Both /api/send-newsletter and this endpoint atomically record per-recipient
// rows in sent_newsletter_recipients, so the diff is authoritative without
// any external API walk — no Resend pagination, no worker-time risk.
//
// Usage:
//   POST /api/resume-send          — dry run (counts only, no send)
//   POST /api/resume-send?go=1     — actually send to the missed addresses
//   POST /api/resume-send?force=1  — bypass the legacy-unbackfilled guard

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
  const force = url.searchParams.get('force') === '1'

  // ── 1. Already-delivered recipients for this slug, from D1
  const { results: deliveredRows } = await env.DB.prepare(
    'SELECT email FROM sent_newsletter_recipients WHERE slug = ?'
  ).bind(slug).all<{ email: string }>()
  const delivered = new Set(deliveredRows.map(r => r.email.toLowerCase()))

  // ── 2. Slug record from sent_newsletters (used for the legacy guard below)
  const slugRecord = await env.DB.prepare(
    'SELECT recipient_count FROM sent_newsletters WHERE slug = ?'
  ).bind(slug).first<{ recipient_count: number }>()

  // ── 3. Active subscribers + diff
  const { results: activeRows } = await env.DB.prepare(
    'SELECT email FROM subscribers WHERE active = 1'
  ).all<{ email: string }>()
  const active = activeRows.map(r => r.email)
  const missed = active.filter(e => !delivered.has(e.toLowerCase()))

  // Defensive guard: if sent_newsletters claims this slug was sent but we
  // have zero per-recipient rows, the recipient table wasn't backfilled
  // (e.g. a slug sent before sent_newsletter_recipients existed). Sending
  // to `missed` would re-email everyone. Refuse unless ?force=1.
  const legacyUnbackfilled = !!slugRecord && slugRecord.recipient_count > 0 && delivered.size === 0
  if (legacyUnbackfilled && !force) {
    return Response.json({
      error: 'legacy slug — sent_newsletters has a row but sent_newsletter_recipients is empty',
      hint: 'Backfill sent_newsletter_recipients for this slug, or pass ?force=1 to send anyway (DANGER: will double-email everyone who already received it).',
      slug,
      sent_newsletters_recipient_count: slugRecord!.recipient_count,
    }, { status: 409 })
  }

  // ── 4. Dry-run short-circuit
  if (!go) {
    return Response.json({
      dry_run: true,
      total_active_subs: active.length,
      already_delivered: delivered.size,
      to_send_count: missed.length,
      to_send_sample: missed.slice(0, 5),
      legacy_unbackfilled: legacyUnbackfilled || undefined,
    })
  }

  // ── 5. Real send — batch via Resend, record each successful batch in D1
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
      break
    }

    sent += batch.length

    try {
      const recipientStmt = env.DB.prepare(
        'INSERT OR IGNORE INTO sent_newsletter_recipients (slug, email) VALUES (?, ?)'
      )
      await env.DB.batch(batch.map(email => recipientStmt.bind(slug, email)))
    } catch (recErr: any) {
      console.error(`sent_newsletter_recipients insert failed at offset ${i}:`, recErr?.message ?? recErr)
    }
  }

  // ── 6. Update sent_newsletters total
  const grandTotal = delivered.size + sent
  if (sent > 0 && errors.length === 0) {
    if (slugRecord) {
      await env.DB.prepare(
        'UPDATE sent_newsletters SET recipient_count = ? WHERE slug = ?'
      ).bind(grandTotal, slug).run()
    } else {
      await env.DB.prepare(
        'INSERT OR IGNORE INTO sent_newsletters (slug, recipient_count) VALUES (?, ?)'
      ).bind(slug, grandTotal).run()
    }
  }

  return Response.json({
    total_active_subs: active.length,
    already_delivered_before: delivered.size,
    just_sent: sent,
    grand_total_recipients: grandTotal,
    errors,
    recorded_in_d1: sent > 0 && errors.length === 0,
  })
}
