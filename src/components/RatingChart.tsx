type DataPoint = { month: string; value: number }

/** Deterministic pseudo-random [0,1) from a string seed + index */
function seededRng(slug: string, index: number): number {
  let h = index * 2654435761
  for (let i = 0; i < slug.length; i++) {
    h = Math.imul(h ^ slug.charCodeAt(i), 2246822519)
    h ^= h >>> 13
  }
  return Math.abs(h >>> 0) / 4294967296
}

/** Generate 6-month rating history that trends toward the current value */
export function generateHistory(currentRating: number, slug: string): DataPoint[] {
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
  const startOffset = (seededRng(slug, 99) - 0.5) * 0.4   // ±0.2 from current
  const startRating = Math.max(1.5, Math.min(5.0, currentRating + startOffset))

  return months.map((month, i) => {
    if (i === months.length - 1) return { month, value: currentRating }
    const t = i / (months.length - 1)
    const trend = startRating + (currentRating - startRating) * t
    const noise = (seededRng(slug, i) - 0.5) * 0.16   // ±0.08
    const value = Math.max(1.5, Math.min(5.0, Math.round((trend + noise) * 10) / 10))
    return { month, value }
  })
}

interface RatingChartProps {
  data: DataPoint[]
}

export default function RatingChart({ data }: RatingChartProps) {
  const W = 500, H = 120
  const pad = { top: 20, right: 16, bottom: 24, left: 16 }
  const cW = W - pad.left - pad.right
  const cH = H - pad.top - pad.bottom

  const values = data.map(d => d.value)
  const minV = Math.max(1.0, Math.min(...values) - 0.3)
  const maxV = Math.min(5.0, Math.max(...values) + 0.3)
  const range = maxV - minV || 0.5

  const x = (i: number) => pad.left + (i / (data.length - 1)) * cW
  const y = (v: number) => pad.top + cH - ((v - minV) / range) * cH

  const pts = data.map((d, i) => ({ x: x(i), y: y(d.value), v: d.value }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${(pad.top + cH).toFixed(1)} L${pts[0].x.toFixed(1)},${(pad.top + cH).toFixed(1)} Z`

  const trend = data[data.length - 1].value - data[0].value
  const color = trend >= 0 ? '#16a34a' : '#dc2626'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
      {/* Area fill */}
      <path d={areaPath} fill={color} fillOpacity={0.07} />
      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots + value labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="white" stroke={color} strokeWidth={2} />
          <text
            x={p.x}
            y={p.y - 9}
            textAnchor="middle"
            fontSize={10}
            fill={color}
            fontWeight="600"
          >
            {p.v}
          </text>
        </g>
      ))}
      {/* Month labels */}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={H - 4} textAnchor="middle" fontSize={10} fill="#9ca3af">
          {d.month}
        </text>
      ))}
    </svg>
  )
}
