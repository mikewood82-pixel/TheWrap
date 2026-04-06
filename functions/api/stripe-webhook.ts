import Stripe from 'stripe'

interface Env {
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  SUBSCRIPTIONS: KVNamespace
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY)
  const sig = request.headers.get('stripe-signature')!
  const body = await request.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const clerkUserId = session.metadata?.clerkUserId
    const plan = session.metadata?.plan

    if (clerkUserId) {
      await env.SUBSCRIPTIONS.put(`user_${clerkUserId}`, JSON.stringify({
        plan,
        active: true,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        activatedAt: new Date().toISOString(),
      }))
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    // Find user by Stripe customer ID and deactivate
    const customerId = subscription.customer as string
    // Store deactivation by customer ID for lookup
    await env.SUBSCRIPTIONS.put(`customer_${customerId}`, JSON.stringify({ active: false }))
  }

  return new Response('ok')
}
