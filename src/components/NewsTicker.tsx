const headlines = [
  { text: 'Intuit acquires GoCo · HR/benefits platform joins QuickBooks mid-market', url: 'https://investors.intuit.com/news-events/press-releases/detail/1247/intuit-to-acquire-hr-platform-goco' },
  { text: 'Docebo acquires 365Talents for $55M · AI skills intelligence enters LMS', url: 'https://betakit.com/docebo-deepens-ai-capabilities-with-55-million-usd-365talents-acquisition/' },
  { text: 'Remote acquires Atlas · global expense management for distributed teams', url: 'https://remote.com/blog/company-news/remote-acquires-atlas' },
  { text: 'SAP + SmartRecruiters integration live · AI-connected hiring in SuccessFactors', url: 'https://news.sap.com/2026/03/smartrecruiters-for-sap-successfactors-ai-driven-hiring-connected-hcm/' },
  { text: 'SmartRecruiters · autonomous AI hiring agents handle sourcing to screening', url: 'https://www.globenewswire.com/news-release/2026/04/07/3269187/0/en/SmartRecruiters-Introduces-the-Future-of-Hiring-From-AI-Agents-to-Autonomous-Talent-Acquisition.html' },
  { text: 'Darwinbox Super Agent · MCP-powered agentic AI for enterprise HR', url: 'https://darwinbox.com/en-us/blog/darwinbox-launches-super-agent' },
  { text: 'U.S. adds 178K jobs in March · unemployment holds at 4.3%', url: 'https://www.npr.org/2026/04/03/nx-s1-5772696/jobs-employment-economy-labor-market' },
  { text: 'EU AI Act · bias audits for AI hiring tools mandatory August 2026', url: 'https://www.technewsworld.com/story/hrs-2026-playbook-signals-a-human-centric-tech-reset-180063.html' },
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
