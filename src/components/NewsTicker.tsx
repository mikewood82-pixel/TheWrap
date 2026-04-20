const headlines = [
  { text: 'UKG cuts 950 jobs — 6% of workforce — amid AI restructuring', url: 'https://hrexecutive.com/ukg-cuts-950-jobs-in-latest-round-of-restructuring/' },
  { text: 'SAP SuccessFactors 1H 2026 release expands agentic AI suite-wide', url: 'https://news.sap.com/2026/04/sap-successfactors-1h-2026-release/' },
  { text: 'Workday Sana AI agents launch · agentic new front door to enterprise work', url: 'https://hrexecutive.com/what-workdays-biggest-agent-launch-means-for-hr-leaders/' },
  { text: 'Findem acquires Glider AI · end-to-end autonomous AI hiring platform', url: 'https://news.crunchbase.com/venture/ai-hr-software-startup-funding-ma/' },
  { text: 'EU AI Act bias audits for AI hiring tools · mandatory from August 2026', url: 'https://www.technewsworld.com/story/hrs-2026-playbook-signals-a-human-centric-tech-reset-180063.html' },
  { text: 'U.S. adds 178K jobs in March · unemployment holds at 4.3%', url: 'https://www.npr.org/2026/04/03/nx-s1-5772696/jobs-employment-economy-labor-market' },
  { text: 'Recruiting platforms lead 2026 HR tech budgets · top priority for CHROs', url: 'https://hrexecutive.com/recruiting-platforms-get-hr-tech-budget-priority-for-2026-plus-people-move-news/' },
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
