import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, Snowflake, Briefcase, ArrowRight } from 'lucide-react'
import { FEATURES } from '../config/features'

type Pulse = {
  verdicts: { trending_up: number; stable: number; slowing: number; freeze: number }
  jobs_added_24h: number
  vendors_analyzed: number
  vendors_total: number
  as_of: string
}

/**
 * Homepage "This week in HR tech" strip. Aggregate-only — counts, no names —
 * so every visitor sees the Pulse signal, and the detailed named view sits
 * behind Wrap+ on /vendors.
 *
 * Pre-Plus-launch the CTA teases the May 1 launch instead of linking out.
 * After launch it routes to /vendors. The component quietly hides if the
 * endpoint errors or returns zero data (avoids loud "— —" tiles on fresh
 * databases).
 */
export default function HiringPulseStrip() {
  const [data, setData] = useState<Pulse | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/jobs/pulse')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((d: Pulse) => setData(d))
      .catch(() => setError(true))
  }, [])

  if (error || !data) return null

  const { verdicts, jobs_added_24h, vendors_analyzed, vendors_total } = data
  // Hide the whole strip if there's literally nothing interesting yet
  // (vendor_snapshots too thin AND no fresh jobs). Prevents an empty-
  // looking homepage module during the first few days after launch.
  if (vendors_analyzed === 0 && jobs_added_24h === 0) return null

  // Fallback headline for the ramp-up period: computeHealth needs ~3 days
  // of snapshots per vendor, so `vendors_analyzed` is 0 for the first few
  // days after a fresh launch. Show the universe we're tracking instead of
  // "What 0 vendors are doing..." in that window.
  const headline = vendors_analyzed > 0
    ? `What ${vendors_analyzed} HR tech vendors are doing with headcount`
    : `Tracking hiring at ${vendors_total} HR tech vendors`

  return (
    <section className="bg-brand-surface border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest font-semibold text-brand-terracotta mb-1">
              This week · HR Tech Pulse
            </div>
            <div className="font-serif text-lg md:text-xl text-brand-dark font-semibold leading-tight">
              {headline}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {verdicts.trending_up > 0 && (
              <Stat icon={<TrendingUp size={16} />} iconCls="text-green-700"
                    value={verdicts.trending_up} label="trending up" />
            )}
            {verdicts.slowing > 0 && (
              <Stat icon={<TrendingDown size={16} />} iconCls="text-amber-700"
                    value={verdicts.slowing} label="slowing" />
            )}
            {verdicts.freeze > 0 && (
              <Stat icon={<Snowflake size={16} />} iconCls="text-red-600"
                    value={verdicts.freeze} label="in freeze" />
            )}
            <Stat icon={<Briefcase size={16} />} iconCls="text-brand-terracotta"
                  value={jobs_added_24h} label="new roles today" />
          </div>
        </div>

        {/* CTA: teases Wrap+ before launch, deep-links after. */}
        <div className="mt-3 text-xs text-brand-muted">
          {FEATURES.PLUS_ENABLED ? (
            <Link
              to="/vendors"
              className="inline-flex items-center gap-1 text-brand-terracotta font-semibold hover:underline"
            >
              See which vendors in Vendor Pulse
              <ArrowRight size={12} />
            </Link>
          ) : (
            <span>
              Named vendor breakdowns, verdict alerts, and live sparklines arrive
              with <span className="font-semibold text-brand-dark">Wrap+ on May 1</span>.
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

function Stat({
  icon, iconCls, value, label,
}: {
  icon: React.ReactNode
  iconCls: string
  value: number
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={iconCls}>{icon}</span>
      <span className="text-xl font-serif font-bold text-brand-dark tabular-nums">{value}</span>
      <span className="text-brand-muted">{label}</span>
    </div>
  )
}
