const headlines = [
  { text: 'Deel · buys deepfake-detection startup Clarity in ~$50M, its 15th deal', url: 'https://techfundingnews.com/deel-buys-deepfake-detection-startup-clarity-in-15th-acquisition-as-it-hits-1-5b-in-arr/' },
  { text: 'Syndio · first-ever acquisition snaps up agentic AI shop Embrace.ai', url: 'https://www.geekwire.com/2026/syndio-bets-on-agentic-ai-with-first-acquisition-in-seattle-pay-equity-startups-history/' },
  { text: 'Humanly · $25M Series B to deliver pre-vetted candidates on demand', url: 'https://www.geekwire.com/2026/humanly-raises-25m-to-put-ai-to-work-for-job-seekers-not-just-the-companies-hiring-them/' },
  { text: 'Darwinbox · launches Cortex, an HCM rebuilt from the ground up for AI', url: 'https://techrseries.com/hcm-and-hris/darwinbox-launches-cortex-its-new-ai-native-hcm-platform/' },
  { text: 'Rippling · AI Spend Console tracks token costs per employee and team', url: 'https://www.rippling.com/blog/introducing-ai-spend-console' },
  { text: 'Workday · Agent Passport ships to test & govern every enterprise AI agent', url: 'https://newsroom.workday.com/2026-06-02-Workday-Launches-Agent-Passport-to-Test,-Verify,-and-Continuously-Monitor-Every-AI-Agent-in-the-Enterprise' },
  { text: 'Jobs report · US shed 23K jobs in July, unemployment eases to 4.1%', url: 'https://www.cnbc.com/2026/08/07/jobs-report-july-2026.html' },
  { text: 'EU AI Act · high-risk hiring rules slip to Dec 2027, transparency lands now', url: 'https://www.joneswalker.com/en/insights/blogs/ai-law-blog/yes-august-2-still-matters-the-eu-approved-a-high-risk-ai-delay-but-most-trans.html' },
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
