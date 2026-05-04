import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useSearchParams } from 'react-router-dom'

// SessionStorage keys for the post-sign-in auto-launch flow (#2 + #6).
// We stash the user's plan choice + email before opening the Clerk modal,
// then auto-fire Stripe checkout once isSignedIn flips to true.
const PENDING_KEY = 'thewrap_pending_plus_plan'
const PENDING_TTL_MS = 5 * 60 * 1000 // 5 min — avoids stale auto-launches on later visits

type PendingPlan = { plan: 'monthly' | 'annual'; at: number }

function setPendingPlan(plan: 'monthly' | 'annual') {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({ plan, at: Date.now() } satisfies PendingPlan))
  } catch {
    // sessionStorage unavailable — non-fatal, user just won't get auto-launch
  }
}

function consumePendingPlan(): 'monthly' | 'annual' | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)
    if (!raw) return null
    sessionStorage.removeItem(PENDING_KEY)
    const parsed = JSON.parse(raw) as PendingPlan
    if (Date.now() - parsed.at > PENDING_TTL_MS) return null
    return parsed.plan
  } catch {
    return null
  }
}

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
  const { isPro, isLoaded: wrapPlusLoaded, refetch: refetchWrapPlus } = useWrapPlus()
  const { isSignedIn, user } = useUser()
  const { openSignIn } = useClerk()
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success') === 'true'

  // Free-tier email signup — same pattern as HomePage's #subscribe form.
  // Idempotent on the API side: re-subscribing is a no-op for active subs.
  const [email, setEmail] = useState('')
  const [subState, setSubState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'error'>('idle')

  // Wrap+ pre-checkout email capture (#6) — single field bound to both cards.
  const [proEmail, setProEmail] = useState('')
  const [proEmailError, setProEmailError] = useState<string | null>(null)

  async function handleFreeSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setSubState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubState(res.ok ? 'success' : 'error')
    } catch {
      setSubState('error')
    }
  }

  async function handleCheckout(plan: 'monthly' | 'annual') {
    if (!isSignedIn || !user) return
    setCheckoutState('loading')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? '',
        }),
      })
      if (!res.ok) {
        setCheckoutState('error')
        return
      }
      const { url } = await res.json()
      if (url) {
        window.location.href = url
      } else {
        setCheckoutState('error')
      }
    } catch {
      setCheckoutState('error')
    }
  }

  // Signed-out path (#2 + #6): capture email → fire-and-forget free subscribe
  // → stash plan intent → open Clerk modal with email prefilled. Once Clerk
  // session lands, the auto-launch effect below picks up the pending plan and
  // calls handleCheckout. So even if the user bails on Clerk or Stripe, we've
  // already added them to the free Friday list.
  function handleSignedOutWrapPlus(plan: 'monthly' | 'annual') {
    const trimmed = proEmail.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setProEmailError('Please enter a valid email.')
      return
    }
    setProEmailError(null)
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmed }),
    }).catch(() => {
      // Non-fatal — checkout flow continues even if free subscribe POST fails.
    })
    setPendingPlan(plan)
    openSignIn({ initialValues: { emailAddress: trimmed } })
  }

  // #2 — when isSignedIn flips true (post-modal), auto-fire checkout for the
  // plan the user originally clicked. Guarded by ref so it only runs once per
  // session-storage entry, even if the effect re-runs.
  const autoLaunchedRef = useRef(false)
  useEffect(() => {
    if (autoLaunchedRef.current) return
    if (!isSignedIn || !user) return
    const plan = consumePendingPlan()
    if (!plan) return
    autoLaunchedRef.current = true
    handleCheckout(plan)
    // handleCheckout reads the latest user/isSignedIn at call time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user])

  // #4 — webhook-lag polling. After Stripe redirects to /subscribe?success=true,
  // the webhook may not have written to KV yet, so isPro can briefly be false.
  // Poll the subscription endpoint up to ~10s before falling back.
  type ActivationState = 'idle' | 'pending' | 'active' | 'timeout'
  const [activationState, setActivationState] = useState<ActivationState>('idle')
  useEffect(() => {
    if (!success) return
    if (!wrapPlusLoaded) return
    if (isPro) {
      setActivationState('active')
      return
    }
    setActivationState('pending')
    let attempts = 0
    const maxAttempts = 6 // ~12s at 2s spacing
    const interval = window.setInterval(async () => {
      attempts++
      const active = await refetchWrapPlus()
      if (active) {
        setActivationState('active')
        window.clearInterval(interval)
      } else if (attempts >= maxAttempts) {
        setActivationState('timeout')
        window.clearInterval(interval)
      }
    }, 2000)
    return () => window.clearInterval(interval)
  }, [success, wrapPlusLoaded, isPro, refetchWrapPlus])

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {success && activationState === 'pending' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-6 py-4 mb-8 text-center font-medium flex items-center justify-center gap-3">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" aria-hidden="true" />
          Activating your Wrap+ access — this takes a few seconds…
        </div>
      )}
      {success && activationState === 'active' && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-6 py-4 mb-8 text-center font-medium">
          You're on Wrap+! Full vendor intel is now unlocked.
        </div>
      )}
      {success && activationState === 'timeout' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-6 py-4 mb-8 text-center font-medium">
          We received your payment, but activation is taking longer than usual. Please refresh in a moment, or email <a href="mailto:mike@ilovethewrap.com" className="font-semibold underline">mike@ilovethewrap.com</a> if it doesn't unlock within a minute.
        </div>
      )}

      {/* Hero */}
      <div className="bg-brand-cream rounded-2xl px-6 md:px-10 py-8 md:py-10 mb-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 text-brand-dark/70 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Free every Friday
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-brand-dark mb-3">
              Get The Wrap in your inbox
            </h1>
            <p className="text-brand-dark/60 mb-5 md:mb-6 text-base md:text-lg">
              HR tech news, vendor signals, and the labor market — no fluff, no vendor spin. Free every Friday, joining 2,300+ HR pros.
            </p>
            {subState === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg px-5 py-3 text-sm max-w-md mx-auto md:mx-0">
                You're in — check your inbox for a welcome email.
              </div>
            ) : (
              <form onSubmit={handleFreeSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={subState === 'loading'}
                  className="flex-1 px-4 py-3 border border-brand-dark/20 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 focus:border-brand-terracotta disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={subState === 'loading'}
                  className="bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-dark/90 transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {subState === 'loading' ? 'Subscribing…' : 'Subscribe — free'}
                </button>
              </form>
            )}
            {subState === 'error' && (
              <div className="text-xs text-red-600 mt-2">
                Something went wrong. Please try again or email mike@ilovethewrap.com.
              </div>
            )}
            <p className="text-xs text-brand-dark/40 mt-4">
              Need vendor intelligence? <a href="#plans" className="font-semibold text-brand-terracotta hover:underline">Compare plans</a> — Wrap+ starts at $10/month.
            </p>
          </div>
          <img
            src="/wrap-mascot.png"
            alt="The Wrap mascot giving a thumbs up"
            className="w-40 md:w-48 h-auto justify-self-center md:justify-self-end"
            loading="eager"
          />
        </div>
      </div>

      <div id="plans" className="grid md:grid-cols-3 gap-6 scroll-mt-20">
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
          {subState === 'success' ? (
            <div className="w-full bg-green-50 border border-green-200 text-green-800 font-medium py-3 rounded-lg text-sm text-center">
              You're in — check your inbox for a welcome email.
            </div>
          ) : (
            <form onSubmit={handleFreeSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={subState === 'loading'}
                className="w-full px-4 py-3 border border-brand-dark/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 focus:border-brand-terracotta disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subState === 'loading'}
                className="w-full bg-brand-dark text-white font-medium py-3 rounded-lg text-sm hover:bg-brand-dark/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {subState === 'loading' ? 'Subscribing…' : "Subscribe — it's free"}
              </button>
              {subState === 'error' && (
                <div className="text-xs text-red-600 text-center">
                  Something went wrong. Please try again or email mike@ilovethewrap.com.
                </div>
              )}
            </form>
          )}
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
              disabled={checkoutState === 'loading'}
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-orange transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutState === 'loading' ? 'Loading checkout…' : 'Get Wrap+ — $10/mo'}
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="email"
                value={proEmail}
                onChange={e => setProEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-brand-dark/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 focus:border-brand-terracotta"
              />
              <button
                type="button"
                onClick={() => handleSignedOutWrapPlus('monthly')}
                className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-orange transition-colors"
              >
                Continue — $10/mo
              </button>
            </div>
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
              disabled={checkoutState === 'loading'}
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutState === 'loading' ? 'Loading checkout…' : 'Get Wrap+ — $99/yr'}
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="email"
                value={proEmail}
                onChange={e => setProEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder:text-white/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/60 focus:border-brand-gold"
              />
              <button
                type="button"
                onClick={() => handleSignedOutWrapPlus('annual')}
                className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
              >
                Continue — $99/yr
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pre-checkout email + sign-in helper */}
      {!isSignedIn && !isPro && (
        <div className="mt-4 max-w-xl mx-auto text-center text-xs text-brand-dark/50">
          We'll add you to the free Friday newsletter, then take you to sign in and pay.
        </div>
      )}
      {proEmailError && (
        <div className="mt-3 max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm text-center">
          {proEmailError}
        </div>
      )}

      {/* Promo code helper + checkout error */}
      <div className="mt-6 text-center text-sm text-brand-dark/60 max-w-xl mx-auto">
        Have a promo code? You'll enter it on the next page under <span className="font-semibold">"Add promotion code"</span> on the Stripe checkout screen.
      </div>
      {checkoutState === 'error' && (
        <div className="mt-4 max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm text-center">
          We couldn't start checkout. Please try again, or email <a href="mailto:mike@ilovethewrap.com" className="font-semibold underline">mike@ilovethewrap.com</a> and we'll get you sorted.
        </div>
      )}

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
