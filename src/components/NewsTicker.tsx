const headlines = [
  { text: 'Skello · €200M raise to scale AI tools for frontline workforce teams', url: 'https://www.eu-startups.com/2026/07/frances-skello-secures-e200-million-to-grow-its-ai-tools-for-frontline-workforce-management/' },
  { text: 'Orbio · $21M Series A from Dawn Capital puts AI agents in KFC & Taco Bell hiring', url: 'https://techcrunch.com/2026/06/14/orbio-raises-21-million-to-automate-hiring-and-onboarding-for-frontline-workers/' },
  { text: 'Factorial · $150M Series D at $2.5B valuation, led by General Catalyst', url: 'https://www.peoplematters.in/news/funding-and-investment/hr-tech-unicorn-factorial-raises-dollar150-million-at-dollar25-billion-valuation-50127' },
  { text: 'Rippling · launches AI-powered Data Cloud, taking on the BI stack', url: 'https://techcrunch.com/2026/06/25/parker-conrad-knows-which-employees-are-worth-their-ai-spend-and-says-rippling-can-help-you-too/' },
  { text: 'Lattice · AI Agent now joins 1:1s with auto summaries + coaching insights', url: 'https://lattice.com/blog/june-2026-product-updates' },
  { text: 'Workday · Agent Passport ships to test & govern every enterprise AI agent', url: 'https://newsroom.workday.com/2026-06-02-Workday-Launches-Agent-Passport-to-Test,-Verify,-and-Continuously-Monitor-Every-AI-Agent-in-the-Enterprise' },
  { text: 'Jobs report · US adds just 57K jobs in June, unemployment dips to 4.2%', url: 'https://www.cnbc.com/2026/07/02/jobs-report-june-2026-.html' },
  { text: 'Non-competes · Tennessee\'s $70K pay floor lands July 1, Virginia bans widen', url: 'https://www.vaquill.ai/blog/non-compete-q3-state-updates' },
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
