// Called by the deploy script after each deployment.
// Checks if the latest newsletter slug has already been sent — skips if so.

interface Env {
  DB: D1Database
  RESEND_API_KEY: string
  DEPLOY_SECRET: string
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

    // Send in batches of 50 (Resend limit per call)
    const batchSize = 50
    let sent = 0

    for (let i = 0; i < results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize).map(r => r.email)

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mike Wood <mike@ilovethewrap.com>',
          to: batch,
          subject,
          html: `
            <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
              <a href="https://ilovethewrap.com" style="text-decoration: none;">
                <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 60px; margin-bottom: 24px;" />
              </a>
              ${html}
              <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
                <p>You're receiving this because you subscribed at <a href="https://ilovethewrap.com" style="color: #c0623a;">ilovethewrap.com</a></p>
                <p>
                  <a href="https://ilovethewrap.com/newsletter/${slug}" style="color: #c0623a;">View in browser</a>
                  &nbsp;·&nbsp;
                  <a href="https://ilovethewrap.com/api/unsubscribe?email=%7B%7Bemail%7D%7D" style="color: #999;">Unsubscribe</a>
                </p>
              </div>
            </div>
          `,
        }),
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
