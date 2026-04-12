interface Env {
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
    const { name, email, company, message, type } = await request.json() as {
      name: string
      email: string
      company?: string
      message: string
      type: string
    }

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email, and message are required' }, { status: 400, headers: corsHeaders })
    }

    // Notify Mike
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Wrap <mike@ilovethewrap.com>',
        to: 'mike@ilovethewrap.com',
        reply_to: email,
        subject: `Sponsorship Inquiry: ${type} — ${name}${company ? ` (${company})` : ''}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
            <h2 style="font-size: 22px; margin-bottom: 24px;">New Sponsorship Inquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 8px 0; color: #888; width: 120px;">Type</td><td style="padding: 8px 0; font-weight: bold;">${type}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
            </table>
            <div style="background: #f9f6f2; border-left: 3px solid #c0623a; padding: 16px 20px; border-radius: 4px;">
              <p style="margin: 0; line-height: 1.7;">${message.replace(/\n/g, '<br/>')}</p>
            </div>
            <p style="margin-top: 24px; font-size: 13px; color: #999;">Hit reply to respond directly to ${email}</p>
          </div>
        `,
      }),
    })

    // Send confirmation to inquirer
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mike Wood <mike@ilovethewrap.com>',
        to: email,
        subject: `Got your message — The Wrap`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
            <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 80px; margin-bottom: 24px;" />
            <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Got it, ${name.split(' ')[0]}.</h1>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">
              Thanks for reaching out about sponsoring The Wrap. I'll get back to you within 1–2 business days.
            </p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">— Mike</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="font-size: 12px; color: #999;">The Wrap · ilovethewrap.com</p>
          </div>
        `,
      }),
    })

    return Response.json({ success: true }, { headers: corsHeaders })
  } catch (err: any) {
    console.error('Contact error:', err)
    return Response.json({ error: 'Something went wrong' }, { status: 500, headers: corsHeaders })
  }
}
