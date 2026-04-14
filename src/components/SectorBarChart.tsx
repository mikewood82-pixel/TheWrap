type SectorDatum = {
  sector: string
  value: number  // net change in thousands (positive or negative)
  label: string  // display label like "+54K" or "-58K"
}

type Props = {
  data: SectorDatum[]
  title?: string
}

export default function SectorBarChart({ data, title }: Props) {
  const maxAbs = Math.max(...data.map(d => Math.abs(d.value)), 1)
  // Layout
  const rowHeight = 44
  const H = data.length * rowHeight + 24
  const W = 600
  const labelW = 200           // left column (sector names)
  const valueW = 52            // right column (value labels)
  const centerX = labelW + (W - labelW - valueW) / 2
  const maxBarW = (W - labelW - valueW) / 2 - 8

  const green = '#16a34a'
  const red = '#dc2626'

  return (
    <div className="bg-white border border-brand-cream rounded-xl overflow-hidden">
      {title && (
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">
          {title}
        </div>
      )}
      <div className="px-5 py-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
          <title>Sector job change bar chart</title>
          {/* Zero axis */}
          <line
            x1={centerX}
            y1={8}
            x2={centerX}
            y2={H - 8}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          {data.map((d, i) => {
            const y = 12 + i * rowHeight
            const barH = 18
            const isPositive = d.value >= 0
            const barW = (Math.abs(d.value) / maxAbs) * maxBarW
            const barX = isPositive ? centerX : centerX - barW
            const color = isPositive ? green : red
            return (
              <g key={d.sector}>
                {/* Sector label */}
                <text
                  x={labelW - 10}
                  y={y + barH / 2 + 4}
                  textAnchor="end"
                  fontSize={12}
                  fill="#4b5563"
                >
                  {d.sector}
                </text>
                {/* Bar */}
                <rect
                  x={barX}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={3}
                  fill={color}
                  fillOpacity={0.85}
                />
                {/* Value label */}
                <text
                  x={isPositive ? barX + barW + 6 : barX - 6}
                  y={y + barH / 2 + 4}
                  textAnchor={isPositive ? 'start' : 'end'}
                  fontSize={12}
                  fontWeight={600}
                  fill={color}
                >
                  {d.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
