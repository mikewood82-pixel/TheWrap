interface Env {
  SUBSCRIPTIONS: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const clerkUserId = url.searchParams.get('userId')

  if (!clerkUserId) {
    return Response.json({ active: false })
  }

  const data = await env.SUBSCRIPTIONS.get(`user_${clerkUserId}`)
  if (!data) {
    return Response.json({ active: false })
  }

  const sub = JSON.parse(data)
  return Response.json({ active: sub.active === true, plan: sub.plan })
}
