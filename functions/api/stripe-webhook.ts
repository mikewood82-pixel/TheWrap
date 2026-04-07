import Stripe from 'stripe'

interface Env {
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  SUBSCRIPTIONS: KVNamespace
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const sig = request.headers.get('stripe-signature') ?? ''
  const body = await request.text()

  let event: Stripe.Event
  try {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    event = await stripe.webhooks.constructEventAsync(body, sig, env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const clerkUserId = session.metadata?.clerkUserId
    const plan = session.metadata?.plan
    const customerId = session.customer as string

    if (clerkUserId) {
      await env.SUBSCRIPTIONS.put(`user_${clerkUserId}`, JSON.stringify({
        plan,
        active: true,
        stripeCustomerId: customerId,
        stripeSubscriptionId: session.subscription,
        activatedAt: new Date().toISOString(),
      }))
      // Store reverse mapping so cancellation can find the user
      await env.SUBSCRIPTIONS.put(`customer_${customerId}`, clerkUserId)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const customerId = subscription.customer as string
    // Look up the clerkUserId via reverse mapping
    const clerkUserId = await env.SUBSCRIPTIONS.get(`customer_${customerId}`)
    if (clerkUserId) {
      const existing = await env.SUBSCRIPTIONS.get(`user_${clerkUserId}`)
      const sub = existing ? JSON.parse(existing) : {}
      await env.SUBSCRIPTIONS.put(`user_${clerkUserId}`, JSON.stringify({ ...sub, active: false }))
    }
  }

  return new Response('ok')
}
