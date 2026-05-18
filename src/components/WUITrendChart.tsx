type Point = { date: string; wui: number }

type Props = {
  data: Point[]
  monthsShown?: number
}

// Wrap brand terracotta — matches the rest of /labor-market.
const STROKE = '#B8561C'

function formatTick(date: string): string {
  // YYYY-MM-01 → "Jan ’24"
  const [y, m] = date.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const idx = Math.max(0, Math.min(11, parseInt(m, 10) - 1))
  return `${months[idx]} ’${y.slice(2)}`
}

export default function WUITrendChart({ data, monthsShown = 60 }: Props) {
  const trimmed = data.slice(-monthsShown)
  const W = 720
  const H = 220
  const pad = { top: 18, right: 18, bottom: 28, left: 36 }
  const cW = W - pad.left - pad.right
  const cH = H - pad.top - pad.bottom

  if (trimmed.length < 2) {
    return (
      <div className="bg-white border border-brand-cream rounded-xl p-4 text-sm text-brand-dark/40">
        Not enough data to render the WUI trend yet.
      </div>
    )
  }

  // Fixed 0–100 scale — WUI is by construction in that range.
  const minV = 0
  const maxV = 100
  const range = maxV - minV

  const x = (i: number) => pad.left + (i / (trimmed.length - 1)) * cW
  const y = (v: number) => pad.top + cH - ((v - minV) / range) * cH

  const pts = trimmed.map((p, i) => ({ x: x(i), y: y(p.wui), v: p.wui, date: p.date }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${(pad.top + cH).toFixed(1)} L${pts[0].x.toFixed(1)},${(pad.top + cH).toFixed(1)} Z`

  const yTicks = [0, 25, 50, 75, 100]

  // Sparse x-axis labels — pick ~6 evenly spaced points.
  const labelEvery = Math.max(1, Math.floor(trimmed.length / 6))

  const last = pts[pts.length - 1]

  return (
    <div className="bg-white border border-brand-cream rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">
          WUI · last {trimmed.length} months
        </span>
        <span className="text-xs text-brand-dark/40 tabular-nums">
          {formatTick(trimmed[0].date)} → {formatTick(trimmed[trimmed.length - 1].date)}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
        <title>The Wrap Underemployment Index over time</title>

        {/* Y gridlines + labels */}
        {yTicks.map(t => {
          const yy = y(t)
          return (
            <g key={t}>
              <line x1={pad.left} x2={W - pad.right} y1={yy} y2={yy} stroke="#f1e9dd" strokeWidth={1} />
              <text x={pad.left - 6} y={yy + 3} textAnchor="end" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          )
        })}

        {/* Area + line */}
        <path d={areaPath} fill={STROKE} fillOpacity={0.1} />
        <path d={linePath} fill="none" stroke={STROKE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* Current value dot + label */}
        <circle cx={last.x} cy={last.y} r={4} fill="white" stroke={STROKE} strokeWidth={2} />
        <text x={last.x} y={last.y - 10} textAnchor="middle" fontSize={11} fill={STROKE} fontWeight={600}>
          {last.v.toFixed(1)}
        </text>

        {/* Sparse x-axis labels */}
        {trimmed.map((p, i) => (
          i % labelEvery === 0 || i === trimmed.length - 1 ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#9ca3af">
              {formatTick(p.date)}
            </text>
          ) : null
        ))}
      </svg>
    </div>
  )
}
