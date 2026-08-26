const headlines = [
  { text: 'Alliant · acquires Nava Benefits to go AI-native on employee benefits', url: 'https://techrseries.com/hrtechnology/alliant-insurance-services-to-acquire-nava-creating-an-ai-native-model-for-the-future-of-employee-benefits/' },
  { text: 'Jem HR · $8.4M Series A for WhatsApp HR serving 250K frontline workers', url: 'https://disruptafrica.com/2026/08/19/sa-hr-startup-jem-raises-8-4m-series-a-funding-round-to-support-product-expansion/' },
  { text: 'Workday · stands up an AI research team for trustworthy enterprise agents', url: 'https://techrseries.com/artificial-intelligence/workday-introduces-ai-research-team-dedicated-to-advancing-reliable-trustworthy-and-efficient-enterprise-ai/' },
  { text: 'Xero · adds embedded payroll and payments in a US growth push', url: 'https://techrseries.com/payroll-and-compensation-management/xero-accelerates-us-growth-adds-new-payments-capabilities-and-embedded-payroll-offering/' },
  { text: 'Culture Amp · pipes manager team insights into Claude and ChatGPT', url: 'https://hrtechfeed.com/culture-amp-adds-missing-context-to-ai/' },
  { text: 'Otter.ai ruling · AI notetakers now on the hook for recording consent', url: 'https://hrexecutive.com/otter-ai-ruling-puts-ai-meeting-assistants-on-the-hook-for-consent/' },
  { text: 'AI hiring law · state rules pile up as federal preemption stalls', url: 'https://hrexecutive.com/state-vs-federal-ai-law-the-map-and-takeaways-every-hr-executive-needs-to-study-today/' },
  { text: 'Jobless claims · dip to 206K despite the July payroll contraction', url: 'https://www.bloomberg.com/news/articles/2026-08-20/us-weekly-jobless-claims-edged-lower-to-206-000-in-latest-week' },
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
