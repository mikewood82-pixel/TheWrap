import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Bell, Pause, Play, TrendingUp, Minus, TrendingDown, Snowflake } from 'lucide-react'
import SEO from '../components/SEO'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useVendorAlerts, type VendorWatch } from '../context/VendorAlertContext'

/**
 * /jobs/vendor-alerts — Wrap+ only. Manage which vendors' hiring-health
 * verdict changes trigger an email. One row per watched vendor with its
 * current verdict + unfollow; a top toolbar pauses/resumes the whole set.
 */
export default function VendorAlertsPage() {
  const { isPro, isLoaded } = useWrapPlus()
  const { watches, hydrated, toggle, setAllActive, anyActive } = useVendorAlerts()

  const shouldBounce = isLoaded && !isPro

  const grouped = useMemo(() => {
    if (!watches) return null
    const active = watches.filter(w => w.active)
    const paused = watches.filter(w => !w.active)
    return { active, paused }
  }, [watches])

  if (shouldBounce) return <Navigate to="/jobs" replace />

  return (
    <>
      <SEO
        title="Vendor health alerts"
        description="Watch vendors and get emailed when their hiring-health verdict changes."
        url="/jobs/vendor-alerts"
      />

      <section className="bg-brand-surface border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-brand-terracotta text-xs font-semibold uppercase tracking-wider mb-2">
            <Bell size={14} /> Wrap+ · Vendor alerts
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">
            Vendor health alerts
          </h1>
          <p className="mt-2 text-brand-muted max-w-2xl">
            We email you when a vendor’s hiring-health verdict changes —
            trending up, slowing, or hitting a freeze.
            Freezes land prominently; the rest batch into a daily rollup
            so your inbox stays tight.
          </p>
        </div>
      </section>

      {/* Control strip */}
      <section className="border-b border-brand-border bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-brand-muted">
            {watches
              ? `${watches.length} vendor${watches.length === 1 ? '' : 's'} watched`
              : 'Loading…'}
          </span>
          {watches && watches.length > 0 && (
            <button
              onClick={() => void setAllActive(!anyActive)}
              className={[
                'ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors',
                anyActive
                  ? 'bg-white text-brand-dark border-brand-border hover:border-brand-terracotta/50'
                  : 'bg-brand-terracotta text-white border-brand-terracotta hover:opacity-90',
              ].join(' ')}
            >
              {anyActive ? <Pause size={12} /> : <Play size={12} />}
              {anyActive ? 'Pause all alerts' : 'Resume all alerts'}
            </button>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        {!hydrated && (
          <div className="text-center py-16 text-brand-muted">Loading…</div>
        )}

        {hydrated && watches && watches.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-16">
            <h2 className="font-serif text-xl font-semibold text-brand-dark mb-3">
              No vendors watched yet
            </h2>
            <p className="text-brand-muted mb-6">
              Head to <Link to="/jobs" className="text-brand-terracotta underline">/jobs</Link>,
              tap the bell beside any vendor in the filters sidebar, and we’ll email
              you when that vendor’s hiring-health verdict changes.
            </p>
          </div>
        )}

        {hydrated && grouped && grouped.active.length > 0 && (
          <WatchGroup
            title="Active"
            watches={grouped.active}
            onUnwatch={slug => void toggle(slug)}
          />
        )}

        {hydrated && grouped && grouped.paused.length > 0 && (
          <div className="mt-10">
            <WatchGroup
              title="Paused"
              muted
              watches={grouped.paused}
              onUnwatch={slug => void toggle(slug)}
            />
          </div>
        )}
      </section>
    </>
  )
}

function WatchGroup({
  title, watches, onUnwatch, muted,
}: {
  title: string
  watches: VendorWatch[]
  onUnwatch: (slug: string) => void
  muted?: boolean
}) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-brand-dark mb-4">
        {title} <span className="text-brand-muted font-normal text-base">({watches.length})</span>
      </h2>
      <div className={[
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3',
        muted ? 'opacity-60' : '',
      ].join(' ')}>
        {watches.map(w => (
          <div
            key={w.vendor_slug}
            className="flex items-start justify-between gap-3 bg-white border border-brand-border rounded-lg p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-brand-dark truncate">{w.vendor_name}</div>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <VerdictPill verdict={w.latest_verdict} />
                <span className="text-xs text-brand-muted">
                  {w.open_jobs} open job{w.open_jobs === 1 ? '' : 's'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUnwatch(w.vendor_slug)}
              className="text-xs text-brand-muted hover:text-red-600 transition-colors shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function VerdictPill({ verdict }: { verdict: string | null }) {
  if (!verdict) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-brand-muted bg-brand-surface border border-brand-border rounded-full px-2 py-0.5">
        No verdict yet
      </span>
    )
  }
  const { Icon, label, cls } = verdictStyles(verdict)
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5 border ${cls}`}>
      <Icon size={11} /> {label}
    </span>
  )
}

function verdictStyles(verdict: string) {
  switch (verdict) {
    case 'trending_up':
      return { Icon: TrendingUp, label: 'Trending up', cls: 'bg-green-50 text-green-800 border-green-200' }
    case 'stable':
      return { Icon: Minus, label: 'Stable', cls: 'bg-slate-50 text-slate-700 border-slate-200' }
    case 'slowing':
      return { Icon: TrendingDown, label: 'Slowing', cls: 'bg-amber-50 text-amber-800 border-amber-200' }
    case 'freeze':
      return { Icon: Snowflake, label: 'Freeze', cls: 'bg-red-50 text-red-700 border-red-200' }
    default:
      return { Icon: Minus, label: verdict, cls: 'bg-slate-50 text-slate-700 border-slate-200' }
  }
}
