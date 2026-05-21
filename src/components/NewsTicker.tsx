const headlines = [
  { text: 'SAP Sapphire · 50+ Joule HR Assistants land June, Claude powers the agents', url: 'https://news.sap.com/2026/05/sap-successfactors-innovations-new-era-autonomous-hcm/' },
  { text: 'Greenhouse launches MCP · governed connector for AI tools to the ATS, June rollout', url: 'https://www.prnewswire.com/news-releases/greenhouse-launches-mcp-giving-hiring-teams-a-governed-way-to-connect-ai-tools-to-greenhouse-302765361.html' },
  { text: 'Deel debuts Akai · agentic platform automates gov filings, payouts, compliance reports', url: 'https://www.cpapracticeadvisor.com/2026/05/12/deel-launches-agentic-workflow-platform-akai/183249/' },
  { text: 'BLS April · payrolls +115K, unemployment steady at 4.3%, federal jobs keep slipping', url: 'https://www.bls.gov/news.release/empsit.nr0.htm' },
  { text: 'Rippling lands #11 on CNBC Disruptor 50 · AI hits unified HR-IT-finance data', url: 'https://www.cnbc.com/2026/05/19/rippling-cnbc-disruptor-50-ranking.html' },
  { text: '2026 tech layoffs top 142K · ~48% attributed to AI displacement, per Crunchbase', url: 'https://news.crunchbase.com/startups/tech-layoffs/' },
  { text: 'Gusto crosses $1B revenue · 500K SMB customers, IPO chatter rebuilds', url: 'https://techcrunch.com/2026/05/07/gusto-hits-1b-revenue-a-figure-that-brings-it-closer-to-public-markets/' },
  { text: 'Docebo acquires 365Talents · skills intelligence folds into Docebo’s AI LMS', url: 'https://www.unleash.ai/hr-technology/the-five-2026-hr-tech-acquisitions-that-put-hr-buyers-in-a-strong-position/' },
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
