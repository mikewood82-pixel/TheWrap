const headlines = [
  { text: 'Harver · acquires Symphony Talent, forming a 1,500-client hiring platform', url: 'https://hrtechfeed.com/harver-acquires-symphony-talent/' },
  { text: 'Jack & Jill · $40M Series A to swap job applications for AI agents', url: 'https://hrtechfeed.com/jack-jill-secures-40m-series-a-to-replace-job-applications-with-ai-agents/' },
  { text: 'Workday · Silver Lake in talks to take the $51B HCM giant private', url: 'https://www.cnbc.com/2026/08/13/workday-skyrockets-25percent-before-trading-halted-on-report-of-silver-lake-takeover.html' },
  { text: 'Crosschq · rebrands as Brilliant AI, folding in ApplicantX and Traitify', url: 'https://hrtechfeed.com/crosschq-rebrands-as-brilliant-ai-combining-three-hr-tech-platforms-to-create-hiring-intelligence-category/' },
  { text: 'HR Tech · 14 Top HR Products of the Year named ahead of Vegas', url: 'https://www.globenewswire.com/news-release/2026/09/15/3361894/0/en/hr-executive-and-hr-tech-reveal-2026-top-hr-products-of-the-year.html' },
  { text: 'iCIMS · Intelligent Hiring Platform brings hiring agents into Teams', url: 'https://hrtechfeed.com/new-hr-tech-from-icims-vervoe/' },
  { text: 'Fed · first hike since 2023 lifts the benchmark to 3.75%-4%', url: 'https://www.cnbc.com/2026/09/16/fed-rate-decision-september-2026.html' },
  { text: 'California SB 947 · Newsom has until Sept 30 to sign AI-firing limits', url: 'https://www.cdflaborlaw.com/blog/robots-can-recommend-but-real-people-must-pull-the-trigger-inside-sb-947' },
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
