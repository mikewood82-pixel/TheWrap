type Props = {
  stayer: number
  changer: number
}

export default function PayGrowthComparison({ stayer, changer }: Props) {
  const W = 420
  const H = 200
  const pad = { top: 30, right: 20, bottom: 40, left: 20 }
  const cW = W - pad.left - pad.right
  const cH = H - pad.top - pad.bottom

  const max = Math.max(stayer, changer) * 1.15
  const barW = 90
  const gap = 80
  const centerX = pad.left + cW / 2
  const stayerX = centerX - gap / 2 - barW
  const changerX = centerX + gap / 2

  const stayerH = (stayer / max) * cH
  const changerH = (changer / max) * cH
  const stayerY = pad.top + cH - stayerH
  const changerY = pad.top + cH - changerH

  const premium = +(changer - stayer).toFixed(1)

  const stayerColor = '#0891b2'
  const changerColor = '#16a34a'

  return (
    <div className="bg-white border border-brand-cream rounded-xl p-5 mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Annual Pay Growth (YoY)</div>
        <span className="text-xs bg-brand-gold/20 text-brand-dark/70 px-2.5 py-1 rounded-full font-medium">
          +{premium}% switching premium
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
        <title>Job-Stayer vs Job-Changer annual pay growth</title>

        {/* Baseline */}
        <line
          x1={pad.left}
          y1={pad.top + cH}
          x2={W - pad.right}
          y2={pad.top + cH}
          stroke="#e5e7eb"
          strokeWidth={1}
        />

        {/* Stayer bar */}
        <rect x={stayerX} y={stayerY} width={barW} height={stayerH} rx={4} fill={stayerColor} fillOpacity={0.85} />
        <text x={stayerX + barW / 2} y={stayerY - 8} textAnchor="middle" fontSize={18} fontWeight={700} fill={stayerColor}>
          {stayer}%
        </text>
        <text x={stayerX + barW / 2} y={pad.top + cH + 16} textAnchor="middle" fontSize={11} fill="#6b7280">
          Job-Stayers
        </text>
        <text x={stayerX + barW / 2} y={pad.top + cH + 30} textAnchor="middle" fontSize={9} fill="#9ca3af">
          Stayed in role
        </text>

        {/* Changer bar */}
        <rect x={changerX} y={changerY} width={barW} height={changerH} rx={4} fill={changerColor} fillOpacity={0.85} />
        <text x={changerX + barW / 2} y={changerY - 8} textAnchor="middle" fontSize={18} fontWeight={700} fill={changerColor}>
          {changer}%
        </text>
        <text x={changerX + barW / 2} y={pad.top + cH + 16} textAnchor="middle" fontSize={11} fill="#6b7280">
          Job-Changers
        </text>
        <text x={changerX + barW / 2} y={pad.top + cH + 30} textAnchor="middle" fontSize={9} fill="#9ca3af">
          Switched roles
        </text>

        {/* Connector line between bar tops showing the gap */}
        <line
          x1={stayerX + barW}
          y1={stayerY}
          x2={changerX}
          y2={stayerY}
          stroke="#d1d5db"
          strokeWidth={1}
          strokeDasharray="3,3"
        />
        <line
          x1={changerX}
          y1={stayerY}
          x2={changerX}
          y2={changerY}
          stroke="#d1d5db"
          strokeWidth={1}
          strokeDasharray="3,3"
        />
      </svg>
      <p className="text-xs text-brand-dark/40 mt-1 text-center">Narrowest premium since 2020 — weaker case for switching jobs.</p>
    </div>
  )
}
