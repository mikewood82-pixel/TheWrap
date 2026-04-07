const headlines = [
  { text: 'Workday Q2 earnings beat estimates · stock up 4.2%', url: 'https://investor.workday.com' },
  { text: 'ServiceNow acquires HR analytics startup for $340M', url: 'https://www.servicenow.com/company/media/press-room.html' },
  { text: 'U.S. unemployment holds at 4.3% · job openings dip to 6.9M', url: 'https://www.bls.gov/news.release/empsit.nr0.htm' },
  { text: 'Rippling raises $200M Series F at $13.5B valuation', url: 'https://www.rippling.com/blog' },
  { text: 'ADP reports 62K private sector jobs added in March', url: 'https://adpemploymentreport.com' },
  { text: 'Greenhouse launches AI-assisted interview scoring', url: 'https://www.greenhouse.com/press' },
  { text: 'UKG named leader in Gartner Magic Quadrant for HCM', url: 'https://www.ukg.com/about-us/newsroom' },
]

export default function NewsTicker() {
  const items = [...headlines, ...headlines] // duplicate for seamless loop

  return (
    <div className="bg-brand-dark text-white text-xs py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[ticker_40s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              {item.text}
            </a>
            <span className="text-white/30">·</span>
          </span>
        ))}
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
