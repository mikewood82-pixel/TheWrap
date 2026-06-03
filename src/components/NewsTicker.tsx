const headlines = [
  { text: 'Factorial · $150M Series D at $2.5B valuation, expanding across Europe', url: 'https://tech.eu/2026/06/03/factorial-raises-150m-series-d-at-25b-valuation-to-expand-across-europe/' },
  { text: 'HeroHire launches autonomous AI recruiter · voice sourcing across 800M profiles', url: 'https://www.globenewswire.com/news-release/2026/05/17/3296256/0/en/HeroHire-Launches-Autonomous-AI-Recruiter-to-Fix-Hiring-for-the-99.html' },
  { text: 'Workday · raises FY27 margin outlook on AI agent demand, Q1 revenue $2.54B', url: 'https://www.cnbc.com/2026/05/21/workday-wday-q1-earnings-report-2027.html' },
  { text: 'SAP Sapphire · 50+ Joule HR Assistants land June, Claude powers the agents', url: 'https://news.sap.com/2026/05/sap-successfactors-innovations-new-era-autonomous-hcm/' },
  { text: 'Greenhouse launches MCP · governed connector for AI tools to the ATS, June rollout', url: 'https://www.prnewswire.com/news-releases/greenhouse-launches-mcp-giving-hiring-teams-a-governed-way-to-connect-ai-tools-to-greenhouse-302765361.html' },
  { text: 'Remote · passes $300M ARR and turns cash-flow positive without adding headcount', url: 'https://techcrunch.com/2026/05/27/payroll-startup-remote-says-it-grew-revenue-50-per-employee-without-adding-headcount/' },
  { text: 'Rippling lands #11 on CNBC Disruptor 50 · AI hits unified HR-IT-finance data', url: 'https://www.cnbc.com/2026/05/19/rippling-cnbc-disruptor-50-ranking.html' },
  { text: 'Pay transparency · Virginia + Maine join 17-state club, MA & NJ start enforcing', url: 'https://www.jdsupra.com/legalnews/state-pay-transparency-laws-in-2026-mai-64088/' },
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
