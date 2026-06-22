const headlines = [
  { text: 'Orbio · $21M Series A from Dawn Capital puts AI agents in KFC & Taco Bell hiring', url: 'https://techcrunch.com/2026/06/14/orbio-raises-21-million-to-automate-hiring-and-onboarding-for-frontline-workers/' },
  { text: 'Medallia · $150M and a Blackstone-led group take over from Thoma Bravo', url: 'https://www.cmswire.com/customer-experience/medallia-lands-150m-new-owners-and-a-fresh-ai-roadmap-after-thoma-bravos-historic-loss/' },
  { text: 'Factorial · $150M Series D at $2.5B valuation, expanding across Europe', url: 'https://tech.eu/2026/06/03/factorial-raises-150m-series-d-at-25b-valuation-to-expand-across-europe/' },
  { text: 'Fed · holds rates at 3.50–3.75%, signals a possible hike at Warsh\'s first meeting', url: 'https://www.cnbc.com/2026/06/17/fed-interest-rate-decision-june-2026.html' },
  { text: 'Workday DevCon · Agent Passport + MCP tools to verify and govern HR AI agents', url: 'https://www.prnewswire.com/news-releases/workday-launches-new-tools-for-developers-to-build-connect-and-verify-ai-agents-for-hr-finance-and-it-302787997.html' },
  { text: 'Josh Bersin · HR 2030 blueprint maps the shift to agentic HR and "superagents"', url: 'https://www.prnewswire.com/news-releases/the-josh-bersin-company-launches-bold-blueprint-for-agentic-ai-hr-2030-302793868.html' },
  { text: 'Jobless claims · US weekly claims edge down to 226K as layoffs stay low', url: 'https://money.usnews.com/investing/news/articles/2026-06-18/us-weekly-jobless-claims-fall-amid-low-layoffs' },
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
