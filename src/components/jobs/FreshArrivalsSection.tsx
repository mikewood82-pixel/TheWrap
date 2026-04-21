import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SignInButton, useAuth } from '@clerk/clerk-react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { FEATURES } from '../../config/features'
import { useWrapPlus } from '../../context/WrapPlusContext'
import JobCard, { type JobListItem } from './JobCard'

const FRESH_HOURS = 24
const PREVIEW_LIMIT = 6

/**
 * Wrap+ "Early-bird" feed surfaced above the main /jobs listing.
 *
 * Renders nothing when Plus is globally disabled, when the viewer's Plus/auth
 * status hasn't hydrated yet, or when there are zero fresh roles. Otherwise:
 *   - Plus member → live grid of the 6 most recent roles from the past 24h
 *   - Signed-in free user → paywall card with the real count + subscribe CTA
 *   - Signed-out → paywall card with sign-in-to-subscribe CTA
 *
 * The underlying data comes from the public /api/jobs/search?fresh_hours=24
 * endpoint; gating is purely presentational. Moving gating to the API layer
 * buys nothing here (the filter is a trivial SQL predicate anyone could
 * construct) and would complicate caching.
 */
export default function FreshArrivalsSection() {
  if (!FEATURES.PLUS_ENABLED) return null
  return <Inner />
}

function Inner() {
  const { isPro, isLoaded: plusLoaded } = useWrapPlus()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()

  const [jobs, setJobs] = useState<JobListItem[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(
      `/api/jobs/search?fresh_hours=${FRESH_HOURS}&per_page=${PREVIEW_LIMIT}`,
      { signal: ctrl.signal },
    )
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { jobs: JobListItem[]; total: number }) => {
        setJobs(d.jobs)
        setTotal(d.total)
        setLoading(false)
      })
      .catch(e => {
        if ((e as Error).name === 'AbortError') return
        setLoading(false)
      })
    return () => ctrl.abort()
  }, [])

  // Wait for Plus + auth hydration so we don't flash the wrong variant.
  if (!plusLoaded || !authLoaded) return null
  // No fresh roles → hide entirely. An empty "Fresh arrivals" section would
  // read as broken rather than as a quiet day.
  if (!loading && (total === null || total === 0)) return null

  if (isPro) {
    return <ProView jobs={jobs} total={total ?? 0} loading={loading} />
  }
  return <PaywallView total={total ?? 0} isSignedIn={!!isSignedIn} />
}

function ProView({
  jobs,
  total,
  loading,
}: {
  jobs: JobListItem[]
  total: number
  loading: boolean
}) {
  return (
    <section className="mb-8 bg-gradient-to-br from-amber-50/70 to-brand-surface border border-amber-200 rounded-xl p-5 md:p-6">
      <header className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand-terracotta" />
          <h2 className="font-serif text-xl font-bold text-brand-dark">Fresh arrivals</h2>
          <span className="text-[10px] font-bold bg-brand-gold text-brand-dark rounded-full px-2 py-0.5 tracking-wide">
            WRAP+
          </span>
        </div>
        <p className="text-xs text-brand-muted">
          {total.toLocaleString()} role{total === 1 ? '' : 's'} added in the past {FRESH_HOURS}h
        </p>
      </header>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: PREVIEW_LIMIT }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-brand-border rounded-lg h-[92px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobs.map(j => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </section>
  )
}

function PaywallView({ total, isSignedIn }: { total: number; isSignedIn: boolean }) {
  return (
    <section className="mb-8 bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200 rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-brand-terracotta" />
            <span className="text-[10px] font-bold bg-brand-gold text-brand-dark rounded-full px-2 py-0.5 tracking-wide">
              WRAP+
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark leading-tight mb-2">
            {total.toLocaleString()} fresh role{total === 1 ? '' : 's'} in the past 24 hours
          </h2>
          <p className="text-sm text-brand-muted max-w-prose leading-relaxed">
            Wrap+ members see the Early-bird feed — roles that just hit the board,
            separated from the full list so you don't have to scan through a thousand
            listings to find what's new.
          </p>
        </div>
        <div className="shrink-0">
          {isSignedIn ? (
            <Link
              to="/subscribe"
              className="inline-flex items-center justify-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap"
            >
              Upgrade to Wrap+
              <ArrowRight size={16} />
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="inline-flex items-center justify-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap">
                Sign in to upgrade
                <ArrowRight size={16} />
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </section>
  )
}
