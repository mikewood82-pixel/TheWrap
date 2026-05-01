import { Check } from 'lucide-react'
import { useUser, SignInButton } from '@clerk/clerk-react'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useSearchParams } from 'react-router-dom'

const freeTier = [
  'Weekly newsletter (The Wrap)',
  'Latest edition on the web',
  'The Wrap Show — all episodes',
  'Labor Market data',
]

const proTier = [
  'Everything in Free',
  'Full vendor database',
  'Vendor comparison tool',
  'Detailed customer feedback',
  'Shortlist builder',
  'Access to upgrades as I build this out',
]

export default function SubscribePage() {
  const { isPro } = useWrapPlus()
  const { isSignedIn, user } = useUser()
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success') === 'true'

  async function handleCheckout(plan: 'monthly' | 'annual') {
    if (!isSignedIn || !user) return
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan,
        clerkUserId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? '',
      }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-6 py-4 mb-8 text-center font-medium">
          You're on Wrap+! Full vendor intel is now unlocked.
        </div>
      )}

      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-14">
        <div className="order-2 md:order-1">
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-brand-dark">
            A month of insights for the price of an actual wrap!
          </h1>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <img
            src="/wrap-mascot.png"
            alt="The Wrap mascot giving a thumbs up"
            className="w-full max-w-sm md:max-w-md h-auto"
            loading="eager"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Free */}
        <div className="bg-white border border-brand-border rounded-2xl p-8">
          <div className="text-brand-dark/40 text-sm font-medium uppercase tracking-wide mb-2">Free</div>
          <div className="font-serif text-4xl font-bold mb-1">$0</div>
          <div className="text-brand-dark/40 text-sm mb-6">Always free</div>
          <ul className="space-y-3 mb-8">
            {freeTier.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-dark/70">
                <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="w-full border border-brand-dark/20 text-brand-dark/40 font-medium py-3 rounded-lg text-sm text-center">
            {isPro ? 'Free plan' : 'Current plan'}
          </div>
        </div>

        {/* Wrap+ Monthly */}
        <div className="bg-white border border-brand-border rounded-2xl p-8">
          <div className="text-brand-terracotta text-sm font-medium uppercase tracking-wide mb-2">Wrap+</div>
          <div className="font-serif text-4xl font-bold mb-1">$10</div>
          <div className="text-brand-dark/40 text-sm mb-6">per month · cancel anytime</div>
          <ul className="space-y-3 mb-8">
            {proTier.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-dark/70">
                <Check size={16} className="text-brand-terracotta mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          {isPro ? (
            <div className="w-full bg-brand-terracotta/10 border border-brand-terracotta/30 text-brand-terracotta font-medium py-3 rounded-lg text-sm text-center">
              Active — you're on Wrap+
            </div>
          ) : isSignedIn ? (
            <button
              onClick={() => handleCheckout('monthly')}
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-orange transition-colors"
            >
              Get Wrap+ — $10/mo
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-orange transition-colors">
                Get Wrap+ — $10/mo
              </button>
            </SignInButton>
          )}
        </div>

        {/* Wrap+ Annual */}
        <div className="bg-brand-dark text-white rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
            Best value
          </div>
          <div className="text-brand-gold text-sm font-medium uppercase tracking-wide mb-2">Wrap+</div>
          <div className="font-serif text-4xl font-bold mb-1">$99</div>
          <div className="text-white/40 text-sm mb-1">per year · billed annually</div>
          <div className="text-brand-gold text-xs font-semibold mb-6">Save $21 vs monthly</div>
          <ul className="space-y-3 mb-8">
            {proTier.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                <Check size={16} className="text-brand-gold mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          {isPro ? (
            <div className="w-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-medium py-3 rounded-lg text-sm text-center">
              Active — you're on Wrap+
            </div>
          ) : isSignedIn ? (
            <button
              onClick={() => handleCheckout('annual')}
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
            >
              Get Wrap+ — $99/yr
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors">
                Get Wrap+ — $99/yr
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-14 max-w-xl mx-auto">
        <h2 className="font-serif text-2xl font-bold mb-6 text-center">Questions</h2>
        <div className="space-y-5">
          {[
            {
              q: 'What makes the vendor intel worth paying for?',
              a: "The comparison tool lets you build shortlists, filter by your stack, and see implementation notes from real deployments — not vendor marketing copy. It's the research layer that saves hours when you're evaluating.",
            },
            {
              q: 'Is the newsletter still free?',
              a: 'Always. The weekly Wrap newsletter and the show are free and will stay free. Wrap+ is about the vendor intelligence layer, not paywalling the editorial.',
            },
            {
              q: 'Can I cancel the monthly plan?',
              a: 'Yes, anytime. No questions asked. The annual plan is billed upfront for the year.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-brand-border pb-5">
              <div className="font-serif font-semibold mb-1">{q}</div>
              <p className="text-sm text-brand-dark/60 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
