const headlines = [
  { text: 'Thoma Bravo hands Medallia to creditors · $5.1B of $6.4B equity wiped in debt-for-equity swap', url: 'https://www.saastr.com/medallia-is-just-the-opening-act-heres-the-list-of-pe-saas-deals-most-at-risk/' },
  { text: 'Personio hits profitability · acquires Munich AI startup aurio to accelerate recruiting roadmap', url: 'https://www.personio.com/about-personio/press/personio-profitability-acquisition-aurio/' },
  { text: 'Visier Outsmart 2026 · Workforce AI next-gen with Glean MCP integration for in-flow analytics', url: 'https://www.prnewswire.com/news-releases/the-next-generation-of-visier-workforce-ai-arrives-the-intelligence-behind-enterprise-workforce-transformation-302438901.html' },
  { text: 'Gusto hits 500K customers · Spring Showcase ships nearly 75 new SMB features', url: 'https://gusto.com/resources/company-news/spring-showcase-2026' },
  { text: 'Docebo Inspire 2026 · Companion, MCP Server, AI Tutor, AgentHub debut in biggest release ever', url: 'https://www.docebo.com/learning-network/blog/inspire-2026-announcements/' },
  { text: 'Oracle Fusion Agentic Apps for HR · 1,000+ AI agents now embedded across HCM at no extra cost', url: 'https://www.uctoday.com/talent-hcm-platforms/oracle-fusion-agentic-applications-for-hr-what-it-means-for-hcm-leaders/' },
  { text: 'UKG cuts 950 jobs · 6% of workforce gone citing AI transformation and market shifts', url: 'https://hrexecutive.com/ukg-cuts-950-jobs-in-latest-round-of-restructuring/' },
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
