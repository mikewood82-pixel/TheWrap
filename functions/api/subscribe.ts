interface Env {
  DB: D1Database
  RESEND_API_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, name } = await request.json() as { email: string; name?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Valid email required' }, { status: 400, headers: corsHeaders })
    }

    // Save to D1
    await env.DB.prepare(
      'INSERT INTO subscribers (email, name) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET active = 1'
    ).bind(email.toLowerCase().trim(), name ?? null).run()

    // Send welcome email via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mike Wood <mike@ilovethewrap.com>',
        to: email,
        subject: 'Welcome to The Wrap',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
            <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 80px; margin-bottom: 24px;" />
            <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 16px;">You're in.</h1>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">
              Thanks for subscribing to The Wrap — HR tech news, labor market data, and takes you won't find in a press release. Every Friday in your inbox.
            </p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">
              — Mike
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="font-size: 12px; color: #999;">
              You're receiving this because you subscribed at ilovethewrap.com.
              <a href="https://ilovethewrap.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #c0623a;">Unsubscribe</a>
            </p>
          </div>
        `,
      }),
    })

    if (!resendRes.ok) {
      const resendError = await resendRes.text()
      console.error('Resend error:', resendRes.status, resendError)
    } else {
      console.log('Welcome email sent to', email)
    }

    return Response.json({ success: true }, { headers: corsHeaders })
  } catch (err: any) {
    console.error('Subscribe error:', err)
    return Response.json({ error: 'Something went wrong' }, { status: 500, headers: corsHeaders })
  }
}
