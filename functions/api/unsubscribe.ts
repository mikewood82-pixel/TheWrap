interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')

  if (!email) {
    return new Response('Missing email', { status: 400 })
  }

  await env.DB.prepare(
    'UPDATE subscribers SET active = 0 WHERE email = ?'
  ).bind(email.toLowerCase().trim()).run()

  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Unsubscribed — The Wrap</title>
        <style>
          body { font-family: Georgia, serif; max-width: 480px; margin: 80px auto; padding: 0 20px; color: #1a1a1a; text-align: center; }
          h1 { font-size: 28px; margin-bottom: 16px; }
          p { color: #666; line-height: 1.7; }
          a { color: #c0623a; }
        </style>
      </head>
      <body>
        <h1>You've been unsubscribed.</h1>
        <p>You won't receive any more emails from The Wrap.</p>
        <p>Changed your mind? <a href="https://ilovethewrap.com">Subscribe again</a>.</p>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
  })
}
