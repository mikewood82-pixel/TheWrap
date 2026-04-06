import { Check } from 'lucide-react'
import { useWrapPlus } from '../context/WrapPlusContext'

const freeTier = [
  'Weekly newsletter (The Wrap)',
  'Latest edition on the web',
  'The Wrap Show — all episodes',
  'Candidate Spotlight',
  'Labor Market data',
  'Vendor list (name, category, G2 score)',
]

const proTier = [
  'Everything in Free',
  'Full vendor database — 29+ vendors',
  'Vendor comparison tool',
  'Detailed implementation notes',
  'Shortlist builder',
  'Vendor Deep Dive reports',
  'Premium newsletter content',
  'Early access to new features',
]

export default function SubscribePage() {
  const { isPro, setPro } = useWrapPlus()

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-3">Pricing</div>
        <h1 className="font-serif text-4xl font-bold mb-3">Simple, honest pricing</h1>
        <p className="text-brand-dark/60 text-lg max-w-xl mx-auto">
          The newsletter and show are free. Wrap+ unlocks the full vendor intelligence layer — the part that's actually worth paying for.
        </p>
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
          {isPro ? (
            <button
              onClick={() => setPro(false)}
              className="w-full border border-brand-dark/20 text-brand-dark/60 font-medium py-3 rounded-lg text-sm hover:bg-brand-surface transition-colors"
            >
              Downgrade to Free
            </button>
          ) : (
            <div className="w-full border border-brand-dark/20 text-brand-dark/40 font-medium py-3 rounded-lg text-sm text-center">
              Current plan
            </div>
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
          ) : (
            <button
              onClick={() => setPro(true)}
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-orange transition-colors"
            >
              Get Wrap+ — $10/mo
            </button>
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
          ) : (
            <button
              onClick={() => setPro(true)}
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
            >
              Get Wrap+ — $99/yr
            </button>
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
              a: 'The comparison tool lets you build shortlists, filter by your stack, and see implementation notes from real deployments — not vendor marketing copy. It\'s the research layer that saves hours when you\'re evaluating.'
            },
            {
              q: 'Is the newsletter still free?',
              a: 'Always. The weekly Wrap newsletter, the show, and the Candidate Spotlight are free and will stay free. Wrap+ is about the vendor intelligence layer, not paywalling the editorial.'
            },
            {
              q: 'Can I cancel?',
              a: 'Yes, anytime. No questions asked.'
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
