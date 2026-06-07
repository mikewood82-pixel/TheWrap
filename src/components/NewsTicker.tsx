const headlines = [
  { text: 'Jobs report · US adds 172K in May, beats estimates, jobless rate holds at 4.3%', url: 'https://www.cnbc.com/2026/06/05/jobs-report-may-2026.html' },
  { text: 'Phenom acquires Plum · third 2026 deal adds behavioral science to AI hiring', url: 'https://www.businesswire.com/news/home/20260428121064/en/Phenom-Acquires-Plum-to-Verify-What-AI-Cant-Fake-Human-Behavior-at-Work' },
  { text: 'Factorial · $150M Series D at $2.5B valuation, expanding across Europe', url: 'https://tech.eu/2026/06/03/factorial-raises-150m-series-d-at-25b-valuation-to-expand-across-europe/' },
  { text: 'Workday DevCon · Agent Passport + MCP tools to verify and govern HR AI agents', url: 'https://www.prnewswire.com/news-releases/workday-launches-new-tools-for-developers-to-build-connect-and-verify-ai-agents-for-hr-finance-and-it-302787997.html' },
  { text: 'Workday × Google Cloud · HR & finance AI agents arrive in Gemini Enterprise', url: 'https://www.ciodive.com/news/Google-Cloud-Workday-agentic-HR-finance/821405/' },
  { text: 'Alex · AI recruiter lands $20M Series A backed by Fortune 500 CHROs', url: 'https://hrtechfeed.com/ai-powered-recruiting-startup-lands-20-million/' },
  { text: 'SAP Sapphire · 50+ Joule HR Assistants land June, Claude powers the agents', url: 'https://news.sap.com/2026/05/sap-successfactors-innovations-new-era-autonomous-hcm/' },
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
