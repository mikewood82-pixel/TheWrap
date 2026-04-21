export type HealthVerdict = 'trending_up' | 'stable' | 'slowing' | 'freeze'
export type Health = {
  verdict: HealthVerdict
  ratio: number
  days_of_data: number
} | null

/**
 * Categorical hiring-health pill rendered next to a vendor's name.
 *
 * Derived server-side from vendor_snapshots (see functions/api/jobs/vendors.ts
 * computeHealth for the thresholds). Four verdicts: trending_up / stable /
 * slowing / freeze. When the health payload is null (not enough data yet,
 * or vendor too small to signal) the badge renders nothing — callers don't
 * need to null-check.
 *
 * Plus-gated by caller — on free /jobs listings the sparkline alone is the
 * "teaser", the verdict pill is the Wrap+ value-add.
 */
export default function HiringHealthBadge({
  health,
  size = 'sm',
}: {
  health: Health
  size?: 'sm' | 'md'
}) {
  if (!health) return null

  const style = STYLES[health.verdict]
  const low = health.days_of_data < 14
  const title = low
    ? `${style.label} — based on ${health.days_of_data} days of data (still gathering)`
    : `${style.label} — 7d / 30d open-role ratio: ${health.ratio.toFixed(2)}`

  const cls = size === 'md'
    ? 'text-xs font-semibold px-2 py-0.5'
    : 'text-[10px] font-semibold px-1.5 py-0.5'

  return (
    <span
      className={`shrink-0 rounded-full border whitespace-nowrap ${cls} ${style.cls} ${low ? 'opacity-70' : ''}`}
      title={title}
    >
      {style.icon}
      <span className="ml-0.5">{style.label}</span>
    </span>
  )
}

const STYLES: Record<HealthVerdict, { label: string; icon: string; cls: string }> = {
  trending_up: {
    label: 'Trending up',
    icon:  '↗',
    cls:   'bg-green-50 text-green-800 border-green-200',
  },
  stable: {
    label: 'Stable',
    icon:  '→',
    cls:   'bg-slate-50 text-slate-700 border-slate-200',
  },
  slowing: {
    label: 'Slowing',
    icon:  '↘',
    cls:   'bg-amber-50 text-amber-800 border-amber-200',
  },
  freeze: {
    label: 'Freeze',
    icon:  '✕',
    cls:   'bg-red-50 text-red-700 border-red-200',
  },
}
