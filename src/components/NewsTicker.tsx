const headlines = [
  { text: 'Phenom acquires Plum · psychometric assessments join talent CRM, third deal of 2026', url: 'https://betakit.com/plum-acquired-by-us-based-phenom-to-reduce-bad-hires-in-the-age-of-ai/' },
  { text: 'HeroHire launches autonomous AI recruiter · voice sourcing across 800M profiles', url: 'https://www.globenewswire.com/news-release/2026/05/17/3296256/0/en/HeroHire-Launches-Autonomous-AI-Recruiter-to-Fix-Hiring-for-the-99.html' },
  { text: 'Dex · $5.3M seed for AI recruiting agent, Notion Capital leads', url: 'https://fortune.com/2026/04/28/exclusive-dex-ai-powered-recruiting-startup-raises-seed-round-notion-capital/' },
  { text: 'SAP Sapphire · 50+ Joule HR Assistants land June, Claude powers the agents', url: 'https://news.sap.com/2026/05/sap-successfactors-innovations-new-era-autonomous-hcm/' },
  { text: 'Greenhouse launches MCP · governed connector for AI tools to the ATS, June rollout', url: 'https://www.prnewswire.com/news-releases/greenhouse-launches-mcp-giving-hiring-teams-a-governed-way-to-connect-ai-tools-to-greenhouse-302765361.html' },
  { text: 'BLS April · payrolls +115K, unemployment steady at 4.3%, federal jobs keep slipping', url: 'https://www.bls.gov/news.release/empsit.nr0.htm' },
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
