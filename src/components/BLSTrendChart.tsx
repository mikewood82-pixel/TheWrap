type HistoricalRow = {
  month: string
  unemployment: string
  openings: string
  wages: string
  quits: string
  current?: boolean
}

type Props = {
  data: HistoricalRow[]
}

type Series = {
  key: keyof HistoricalRow
  label: string
  unit: string
  color: string
  parse: (s: string) => number
}

const series: Series[] = [
  {
    key: 'unemployment',
    label: 'Unemployment',
    unit: '%',
    color: '#dc2626',
    parse: s => parseFloat(s.replace('%', '')),
  },
  {
    key: 'openings',
    label: 'Job Openings',
    unit: 'M',
    color: '#d97706',
    parse: s => parseFloat(s.replace('M', '')),
  },
  {
    key: 'quits',
    label: 'Quits Rate',
    unit: '%',
    color: '#0891b2',
    parse: s => parseFloat(s.replace('%', '')),
  },
]

function MiniChart({ data, s }: { data: HistoricalRow[]; s: Series }) {
  const W = 280
  const H = 120
  const pad = { top: 22, right: 12, bottom: 22, left: 12 }
  const cW = W - pad.left - pad.right
  const cH = H - pad.top - pad.bottom

  const values = data.map(row => s.parse(row[s.key] as string))
  const minV = Math.min(...values) - 0.15
  const maxV = Math.max(...values) + 0.15
  const range = maxV - minV || 0.5

  const x = (i: number) => pad.left + (i / (data.length - 1)) * cW
  const y = (v: number) => pad.top + cH - ((v - minV) / range) * cH

  const pts = values.map((v, i) => ({ x: x(i), y: y(v), v }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${(pad.top + cH).toFixed(1)} L${pts[0].x.toFixed(1)},${(pad.top + cH).toFixed(1)} Z`

  const trend = values[values.length - 1] - values[0]
  const trendLabel = trend > 0 ? `+${trend.toFixed(1)}${s.unit}` : `${trend.toFixed(1)}${s.unit}`

  return (
    <div className="bg-white border border-brand-cream rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">{s.label}</span>
        <span className="text-xs text-brand-dark/40 tabular-nums">{trendLabel} / 5mo</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
        <title>{s.label} over 5 months</title>
        <path d={areaPath} fill={s.color} fillOpacity={0.09} />
        <path d={linePath} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3.5} fill="white" stroke={s.color} strokeWidth={2} />
            <text
              x={p.x}
              y={p.y - 9}
              textAnchor="middle"
              fontSize={10}
              fill={s.color}
              fontWeight="600"
            >
              {p.v}{s.unit}
            </text>
          </g>
        ))}
        {data.map((row, i) => (
          <text key={i} x={x(i)} y={H - 4} textAnchor="middle" fontSize={9} fill="#9ca3af">
            {row.month.split(' ')[0]}
          </text>
        ))}
      </svg>
    </div>
  )
}

export default function BLSTrendChart({ data }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {series.map(s => (
        <MiniChart key={s.key} data={data} s={s} />
      ))}
    </div>
  )
}
