const headlines = [
  'Workday Q2 earnings beat estimates · stock up 4.2%',
  'ServiceNow acquires HR analytics startup for $340M',
  'U.S. unemployment holds at 4.1% · job openings dip to 8.1M',
  'Rippling raises $200M Series F at $13.5B valuation',
  'ADP reports 192K jobs added in May',
  'Greenhouse launches AI-assisted interview scoring',
  'UKG named leader in Gartner Magic Quadrant for HCM',
]

export default function NewsTicker() {
  const text = headlines.join('   ·   ')

  return (
    <div className="bg-brand-dark text-white text-xs py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[ticker_40s_linear_infinite]">
        <span className="px-8 text-white/70">{text}</span>
        <span className="px-8 text-white/70" aria-hidden>{text}</span>
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
