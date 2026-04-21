import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export type HistoryPoint = { date: string; open_jobs: number }

/**
 * Tiny SVG sparkline showing a vendor's open-job count over the past N days.
 * Rendered inline in the /jobs filter sidebar and (eventually) on vendor
 * deep-dive pages. Hand-rolled to match the site's other chart components
 * (BLSTrendChart, RatingChart) — no external chart dep.
 *
 * Low-data posture: with fewer than 3 points there's nothing meaningful to
 * plot, so the component renders `null` rather than a confused dot. When
 * snapshot history has accumulated for a week or so, every tile will grow
 * its own line organically.
 */
export default function VelocitySparkline({
  history,
  width = 56,
  height = 14,
  showTrend = true,
}: {
  history: HistoryPoint[]
  width?: number
  height?: number
  showTrend?: boolean
}) {
  if (!history || history.length < 3) return null

  const values = history.map(h => h.open_jobs)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(1, max - min)     // avoid /0 on a flat line
  const stepX = history.length > 1 ? width / (history.length - 1) : 0

  // 1px stroke needs a half-pixel inset so it doesn't clip at the top/bottom
  // edge of the viewBox. Small visual touch, matters when height=14.
  const pad = 1
  const plotH = height - pad * 2

  const points = history
    .map((h, i) => {
      const x = i * stepX
      const y = pad + plotH - ((h.open_jobs - min) / span) * plotH
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const delta = values[values.length - 1] - values[0]
  const trend: 'up' | 'down' | 'flat' =
    delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'

  const strokeColor =
    trend === 'up'   ? '#047857' : // green-700
    trend === 'down' ? '#b91c1c' : // red-700
                       '#64748b'   // slate-500

  return (
    <span
      className="inline-flex items-center gap-1 shrink-0"
      title={sparklineTitle(history, delta)}
      aria-label={sparklineTitle(history, delta)}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        aria-hidden="true"
      >
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.25}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
      </svg>
      {showTrend && <TrendIcon trend={trend} />}
    </span>
  )
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  const common = { size: 10 }
  if (trend === 'up')
    return <TrendingUp {...common} className="text-green-700" aria-hidden="true" />
  if (trend === 'down')
    return <TrendingDown {...common} className="text-red-700" aria-hidden="true" />
  return <Minus {...common} className="text-slate-500" aria-hidden="true" />
}

function sparklineTitle(history: HistoryPoint[], delta: number): string {
  const days = history.length
  const direction = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : 'flat'
  return `Open-role count over the last ${days} day${days === 1 ? '' : 's'} (${direction})`
}
