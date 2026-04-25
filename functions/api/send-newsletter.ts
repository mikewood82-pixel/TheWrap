// Called by the deploy script after each deployment.
// Checks if the latest newsletter slug has already been sent — skips if so.

interface Env {
  DB: D1Database
  RESEND_API_KEY: string
  DEPLOY_SECRET: string
}

// Prep post HTML for email: absolute-ify root-relative URLs (email clients
// don't resolve `/newsletters/...`), and stamp a consistent inline width on
// every <img> so they render at a uniform size rather than each image's
// intrinsic pixel dimensions.
const EMAIL_IMG_STYLE = 'display:block;width:100%;max-width:600px;height:auto;margin:16px auto 8px;border-radius:4px;'
function prepHtmlForEmail(html: string): string {
  return html
    .replace(/\bsrc="\/(?!\/)/g, 'src="https://ilovethewrap.com/')
    .replace(/\bhref="\/(?!\/)/g, 'href="https://ilovethewrap.com/')
    .replace(/<img\b(?![^>]*\bstyle=)([^>]*)>/gi, `<img$1 style="${EMAIL_IMG_STYLE}">`)
}

// Per-recipient email HTML wrapper. `recipient` is inlined into the unsubscribe
// URL because Resend's {{email}} merge tag only works in Broadcasts, not /emails.
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

  try {
    const { slug, subject, html } = await request.json() as {
      slug: string
      subject: string
      html: string
    }

    // Dry-run: ?dry_run_to=email@example.com sends ONE test email and nothing
    // else — skips the sent_newsletters check and skips recording. Use to
    // validate formatting before Friday's real 2,362-recipient blast.
    const url = new URL(request.url)
    const dryRunTo = url.searchParams.get('dry_run_to')
    if (dryRunTo) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dryRunTo)) {
        return Response.json({ error: 'Invalid dry_run_to email' }, { status: 400 })
      }
      const testHtml = bodyHtmlFor(dryRunTo, slug, html)
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mike Wood <mike@ilovethewrap.com>',
          to: [dryRunTo],
          subject: `[TEST] ${subject}`,
          html: testHtml,
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return Response.json({ error: 'Resend failed', detail: err }, { status: 502 })
      }
      return Response.json({ dry_run: true, sent_to: dryRunTo, subject: `[TEST] ${subject}` })
    }

    // Check if already sent
    const already = await env.DB.prepare(
      'SELECT slug FROM sent_newsletters WHERE slug = ?'
    ).bind(slug).first()

    if (already) {
      return Response.json({ skipped: true, reason: `Already sent: ${slug}` })
    }

    // Fetch active subscribers
    const { results } = await env.DB.prepare(
      'SELECT email FROM subscribers WHERE active = 1'
    ).all<{ email: string }>()

    if (!results.length) {
      return Response.json({ sent: 0, message: 'No active subscribers' })
    }

    // Use Resend's /emails/batch endpoint to send one distinct email per
    // recipient. Critical: the previous version used /emails with to=[50 addrs]
    // which sent a single email CC'ing 50 subscribers to each other.
    //
    // /emails/batch: up to 100 email objects per call, each with its own `to`.
    // We also interpolate the per-recipient unsubscribe URL here on the server,
    // because `{{email}}` merge tags only work in Resend Broadcasts, not /emails.
    const batchSize = 100
    let sent = 0

    for (let i = 0; i < results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize)

      const payload = batch.map(r => ({
        from: 'Mike Wood <mike@ilovethewrap.com>',
        to: [r.email],
        subject,
        html: bodyHtmlFor(r.email, slug, html),
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
        console.error('Resend error:', err)
        throw new Error(`Resend batch failed: ${err}`)
      }

      sent += batch.length
    }

    // Record as sent
    await env.DB.prepare(
      'INSERT INTO sent_newsletters (slug, recipient_count) VALUES (?, ?)'
    ).bind(slug, sent).run()

    return Response.json({ sent, message: `"${subject}" sent to ${sent} subscribers` })
  } catch (err: any) {
    console.error('Send newsletter error:', err)
    return new Response(`Error: ${err.message}`, { status: 500 })
  }
}
