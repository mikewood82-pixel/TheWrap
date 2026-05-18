import { useState } from 'react'

type Point = { date: string; wui: number }

type Props = {
  data: Point[]
}

const STROKE = '#B8561C'

const RANGES = [
  { label: '1Y',  months: 12 },
  { label: '3Y',  months: 36 },
  { label: '5Y',  months: 60 },
  { label: '10Y', months: 120 },
  { label: 'All', months: Infinity },
] as const

type RangeLabel = (typeof RANGES)[number]['label']

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function formatTick(date: string): string {
  const [y, m] = date.split('-')
  const idx = Math.max(0, Math.min(11, parseInt(m, 10) - 1))
  return `${MONTH_SHORT[idx]} ’${y.slice(2)}`
}

function formatTooltipDate(date: string): string {
  const [y, m] = date.split('-')
  const idx = Math.max(0, Math.min(11, parseInt(m, 10) - 1))
  return `${MONTH_LONG[idx]} ${y}`
}

export default function WUITrendChart({ data }: Props) {
  const [range, setRange] = useState<RangeLabel>('5Y')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const monthsToShow = RANGES.find(r => r.label === range)!.months
  const trimmed = monthsToShow === Infinity ? data : data.slice(-monthsToShow)

  const W = 720
  const H = 220
  const pad = { top: 18, right: 18, bottom: 28, left: 36 }
  const cW = W - pad.left - pad.right
  const cH = H - pad.top - pad.bottom

  const isDisabled = (months: number) => months !== Infinity && data.length < months

  if (trimmed.length < 2) {
    return (
      <div className="bg-white border border-brand-cream rounded-xl p-4 text-sm text-brand-dark/40">
        Not enough data to render the WUI trend yet.
      </div>
    )
  }

  const minV = 0
  const maxV = 100
  const vRange = maxV - minV

  const x = (i: number) => pad.left + (i / (trimmed.length - 1)) * cW
  const y = (v: number) => pad.top + cH - ((v - minV) / vRange) * cH

  const pts = trimmed.map((p, i) => ({ x: x(i), y: y(p.wui), v: p.wui, date: p.date }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${(pad.top + cH).toFixed(1)} L${pts[0].x.toFixed(1)},${(pad.top + cH).toFixed(1)} Z`

  const yTicks = [0, 25, 50, 75, 100]
  const labelEvery = Math.max(1, Math.floor(trimmed.length / 6))

  const last = pts[pts.length - 1]
  const hovered = hoveredIndex !== null ? pts[hoveredIndex] : null

  // Convert a clientX into the nearest data-point index. The SVG renders at
  // any width via viewBox, so we scale clientX-rect.left back into viewBox
  // coordinates before searching.
  const updateHover = (clientX: number, svg: SVGSVGElement) => {
    const rect = svg.getBoundingClientRect()
    if (rect.width === 0) return
    const xInVb = ((clientX - rect.left) / rect.width) * W
    if (xInVb < pad.left - 8 || xInVb > W - pad.right + 8) {
      setHoveredIndex(null)
      return
    }
    let nearest = 0
    let minDist = Math.abs(pts[0].x - xInVb)
    for (let i = 1; i < pts.length; i++) {
      const d = Math.abs(pts[i].x - xInVb)
      if (d < minDist) { minDist = d; nearest = i }
    }
    setHoveredIndex(nearest)
  }

  // Tooltip geometry — sized in viewBox units so it scales with the chart.
  const ttW = 110
  const ttH = 38
  const tooltipX = hovered
    ? Math.max(pad.left, Math.min(W - pad.right - ttW, hovered.x - ttW / 2))
    : 0
  const tooltipY = hovered
    ? (hovered.y - ttH - 12 < pad.top ? hovered.y + 14 : hovered.y - ttH - 12)
    : 0

  return (
    <div className="bg-white border border-brand-cream rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">
            WUI trend
          </span>
          <span className="text-xs text-brand-dark/40 tabular-nums">
            {formatTick(trimmed[0].date)} → {formatTick(trimmed[trimmed.length - 1].date)}
          </span>
        </div>
        <div className="flex gap-0.5" role="group" aria-label="Select chart range">
          {RANGES.map(r => {
            const active = r.label === range
            const disabled = isDisabled(r.months)
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => setRange(r.label)}
                disabled={disabled}
                aria-pressed={active}
                className={
                  'text-xs px-2 py-1 rounded font-medium tabular-nums transition-colors ' +
                  (active
                    ? 'bg-brand-terracotta text-white'
                    : disabled
                      ? 'text-brand-dark/20 cursor-not-allowed'
                      : 'text-brand-dark/50 hover:text-brand-terracotta hover:bg-brand-cream/50')
                }
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ overflow: 'visible', touchAction: 'pan-y' }}
        onMouseMove={e => updateHover(e.clientX, e.currentTarget)}
        onMouseLeave={() => setHoveredIndex(null)}
        onTouchStart={e => { if (e.touches[0]) updateHover(e.touches[0].clientX, e.currentTarget) }}
        onTouchMove={e => { if (e.touches[0]) updateHover(e.touches[0].clientX, e.currentTarget) }}
        onTouchEnd={() => setHoveredIndex(null)}
      >
        <title>The Wrap Underemployment Index over time. Hover or tap any point on the chart to read its value.</title>

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

        {/* Sparse x-axis labels */}
        {trimmed.map((p, i) => (
          i % labelEvery === 0 || i === trimmed.length - 1 ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#9ca3af">
              {formatTick(p.date)}
            </text>
          ) : null
        ))}

        {/* Static current-value marker (only when not hovering — hover takes over the spotlight) */}
        {!hovered && (
          <g pointerEvents="none">
            <circle cx={last.x} cy={last.y} r={4} fill="white" stroke={STROKE} strokeWidth={2} />
            <text x={last.x} y={last.y - 10} textAnchor="middle" fontSize={11} fill={STROKE} fontWeight={600}>
              {last.v.toFixed(1)}
            </text>
          </g>
        )}

        {/* Hover overlay — captures pointer events across the chart plot area */}
        <rect
          x={pad.left}
          y={pad.top}
          width={cW}
          height={cH}
          fill="transparent"
        />

        {/* Hover indicators (guide line + dot + tooltip) — rendered last so they sit above the line */}
        {hovered && (
          <g pointerEvents="none">
            <line
              x1={hovered.x}
              x2={hovered.x}
              y1={pad.top}
              y2={pad.top + cH}
              stroke={STROKE}
              strokeWidth={1}
              strokeDasharray="3,3"
              opacity={0.45}
            />
            <circle cx={hovered.x} cy={hovered.y} r={5} fill={STROKE} stroke="white" strokeWidth={2} />
            <rect
              x={tooltipX}
              y={tooltipY}
              width={ttW}
              height={ttH}
              rx={4}
              ry={4}
              fill="white"
              stroke={STROKE}
              strokeWidth={1}
            />
            <text
              x={tooltipX + ttW / 2}
              y={tooltipY + 15}
              textAnchor="middle"
              fontSize={10}
              fill="#9ca3af"
            >
              {formatTooltipDate(hovered.date)}
            </text>
            <text
              x={tooltipX + ttW / 2}
              y={tooltipY + 31}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill={STROKE}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {hovered.v.toFixed(1)}
            </text>
          </g>
        )}
      </svg>
      <div className="text-[10px] text-brand-dark/30 mt-2 text-center md:hidden">
        Tap and drag the chart to scrub through history
      </div>
    </div>
  )
}
