import { useState } from 'react'
import { Check } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

// ─── Wrap+ is free for all subscribers (2026-05-22 pivot) ─────────────
// This page used to host the Stripe checkout flow ($10/mo, $99/yr) and
// pre-checkout email capture / Clerk modal handoff. After zero paid
// conversion in three weeks, Mike pivoted Wrap+ to free-for-everyone.
// The page is now a single subscribe-to-the-newsletter form. The full
// plan lives at C:\Users\mikew\.claude\plans\elegant-crafting-gizmo.md
//
// We still honor `?success=true` for anyone who has the old Stripe
// success URL bookmarked — show a friendly "everything's already
// included" message rather than 404.
// ──────────────────────────────────────────────────────────────────────

const includedFeatures = [
  'Weekly newsletter (The Wrap)',
  'Latest edition on the web',
  'The Wrap Show — all episodes',
  'Labor Market data',
  'Full vendor database',
  'Vendor comparison tool',
  'Detailed customer feedback',
  'Shortlist builder',
  'Saved jobs & search alerts',
  'Vendor watch alerts',
  'Daily digests',
]

export default function SubscribePage() {
  const [searchParams] = useSearchParams()
  const legacySuccess = searchParams.get('success') === 'true'

  const [email, setEmail] = useState('')
  const [subState, setSubState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {legacySuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-6 py-4 mb-8 text-center font-medium">
          Welcome back — everything in The Wrap is included free now. No checkout needed.
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
              HR tech news, vendor signals, and the labor market — every Friday. Joining 2,300+ HR pros.
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
          </div>
          <img
            src="/wrap-mascot.png"
            alt="The Wrap mascot giving a thumbs up"
            className="w-40 md:w-48 h-auto justify-self-center md:justify-self-end"
            loading="eager"
          />
        </div>
      </div>

      {/* What's included */}
      <div className="bg-white border border-brand-border rounded-2xl p-8">
        <h2 className="font-serif text-2xl font-bold mb-2 text-brand-dark">What you get</h2>
        <p className="text-sm text-brand-dark/60 mb-6">
          Everything's included with a free subscription — newsletter, vendor intel, the jobs board, saved searches, alerts, and the show.
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {includedFeatures.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-brand-dark/70">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div className="mt-14 max-w-xl mx-auto">
        <h2 className="font-serif text-2xl font-bold mb-6 text-center">Questions</h2>
        <div className="space-y-5">
          {[
            {
              q: 'Is the whole thing really free?',
              a: 'Yes. The newsletter, the vendor intel, the comparison tool, the jobs board, alerts, the show — everything. Just subscribe with your email.',
            },
            {
              q: 'How often do you send?',
              a: 'One newsletter every Friday. Plus optional daily digests and alerts you can opt into from inside the site.',
            },
            {
              q: 'How do I cancel?',
              a: "Every email has an unsubscribe link at the bottom. One click and you're out — no questions asked.",
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
