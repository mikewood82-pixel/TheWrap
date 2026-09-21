const headlines = [
  { text: 'Harver · acquires Symphony Talent, forming a 1,500-client hiring platform', url: 'https://hrtechfeed.com/harver-acquires-symphony-talent/' },
  { text: "Gartner · first WFM Magic Quadrant names Dayforce, Workday, UKG and Infor Leaders", url: 'https://www.globenewswire.com/news-release/2026/09/17/3364269/0/en/dayforce-recognized-as-a-leader-in-the-inaugural-gartner-magic-quadrant-for-workforce-management-technology.html' },
  { text: 'Workday · Silver Lake in talks to take the $51B HCM giant private', url: 'https://www.cnbc.com/2026/08/13/workday-skyrockets-25percent-before-trading-halted-on-report-of-silver-lake-takeover.html' },
  { text: "Culture Amp · 85% of workers are told to use AI; 42% don't know why", url: 'https://www.prnewswire.com/news-releases/culture-amps-2026-ai-at-work-benchmark-85-are-encouraged-to-use-ai-42-dont-know-why-302881491.html' },
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
