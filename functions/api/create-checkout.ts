import Stripe from 'stripe'

interface Env {
  STRIPE_SECRET_KEY: string
  STRIPE_MONTHLY_PRICE_ID: string
  STRIPE_ANNUAL_PRICE_ID: string
  SITE_URL: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { plan, clerkUserId, email } = await request.json() as {
      plan: 'monthly' | 'annual'
      clerkUserId: string
      email: string
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    const priceId = plan === 'monthly' ? env.STRIPE_MONTHLY_PRICE_ID : env.STRIPE_ANNUAL_PRICE_ID

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: { clerkUserId, plan },
      allow_promotion_codes: true,
      subscription_data: { metadata: { clerkUserId, plan } },
      success_url: `${env.SITE_URL}/subscribe?success=true`,
      cancel_url: `${env.SITE_URL}/subscribe`,
    })

    return Response.json({ url: session.url })
  } catch (err) {
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
