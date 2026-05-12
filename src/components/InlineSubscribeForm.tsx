import { useState } from 'react'

type Variant = 'compact' | 'full'

interface Props {
  variant?: Variant
  headline?: string
  subhead?: string
}

export default function InlineSubscribeForm({
  variant = 'compact',
  headline = 'Get The Wrap in your inbox',
  subhead = 'HR tech news, reviews, and analysis. Free, every Friday.',
}: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  const isCompact = variant === 'compact'

  return (
    <div
      className={
        isCompact
          ? 'mt-10 rounded-xl border border-brand-border bg-brand-surface px-5 py-6 md:px-7 md:py-7'
          : 'mt-10 rounded-xl bg-brand-dark px-6 py-8 md:px-10 md:py-10 text-center'
      }
    >
      <h3
        className={
          isCompact
            ? 'font-serif text-xl md:text-2xl font-bold text-brand-dark mb-1'
            : 'font-serif text-2xl md:text-3xl font-bold text-white mb-2'
        }
      >
        {headline}
      </h3>
      <p className={isCompact ? 'text-sm text-brand-muted mb-4' : 'text-white/70 mb-5'}>
        {subhead}
      </p>

      {state === 'success' ? (
        <div
          className={
            isCompact
              ? 'rounded-lg bg-white border border-brand-border px-4 py-3 text-sm text-brand-dark'
              : 'rounded-lg bg-white/10 px-4 py-3 text-white'
          }
        >
          You&rsquo;re in — check your inbox for a welcome email.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={
            isCompact
              ? 'flex flex-col sm:flex-row gap-2'
              : 'flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
          }
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address"
            className={
              isCompact
                ? 'flex-1 px-4 py-2.5 rounded-lg bg-white border border-brand-border text-brand-dark text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50'
                : 'flex-1 px-4 py-3 rounded-lg bg-white text-brand-dark text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50'
            }
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className={
              isCompact
                ? 'bg-brand-terracotta text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap disabled:opacity-60'
                : 'bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap disabled:opacity-60'
            }
          >
            {state === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
          </button>
        </form>
      )}

      {state === 'error' && (
        <p className={isCompact ? 'text-red-600 text-xs mt-2' : 'text-red-400 text-sm mt-3'}>
          Something went wrong — try again.
        </p>
      )}

      <p
        className={
          isCompact
            ? 'text-brand-muted text-xs mt-3'
            : 'text-white/40 text-xs mt-4'
        }
      >
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
