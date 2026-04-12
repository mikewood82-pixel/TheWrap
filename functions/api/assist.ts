interface Env {
  ANTHROPIC_API_KEY: string
}

const TAGS = [
  'AI & Future of Work', 'Leadership', 'Labor Market', 'Events',
  'HR Tech', 'DEI', 'Talent Acquisition', 'Frontline', 'Buying', 'Culture',
]

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as { draft: string }

    if (!body.draft?.trim()) {
      return Response.json({ error: 'Draft content is required' }, { status: 400 })
    }

    if (!context.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }

    const tagList = TAGS.join(', ')

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': context.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 500,
        system: `You are an editorial assistant for The Wrap, a weekly HR technology newsletter. Given a draft newsletter edition, generate metadata.

Respond ONLY with valid JSON in exactly this format — no other text:
{"excerpt":"1-2 sentence summary capturing the main argument or theme — written in third person, present tense, like a subtitle","tag":"one tag from this list: ${tagList}","slug":"url-friendly-slug-from-the-title, lowercase, hyphens, no numbers, max 6 words"}

The excerpt should hook a reader browsing the archive. Be specific to the content, not generic.`,
        messages: [
          { role: 'user', content: body.draft.trim().slice(0, 8000) },
        ],
      }),
    })

    if (!res.ok) {
      const errData = await res.json() as { error?: { message?: string } }
      const msg = errData?.error?.message ?? `API error ${res.status}`
      return Response.json({ error: msg }, { status: 502 })
    }

    const data = await res.json() as { content: { text: string }[] }
    let text = data.content?.[0]?.text ?? ''
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    const parsed = JSON.parse(text)

    return Response.json(parsed, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
