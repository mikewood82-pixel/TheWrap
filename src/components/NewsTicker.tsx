const headlines = [
  { text: 'HiBob · Salesforce leads $166M round at a $3.2B valuation', url: 'https://hrtechfeed.com/salesforce-leads-166-million-investment-in-hr-platform-hibob/' },
  { text: 'Recruiter.com · acquires Feenyx for anti-fraud interview screening', url: 'https://hrtechfeed.com/recruiter-com-acquires-ai-interview-tool/' },
  { text: 'XShift AI · Autopilot enforces scheduling rules without a manager', url: 'https://techrseries.com/employee-engagement/xshift-ai-expands-ai-copilot-and-autopilot-for-ai-native-employee-shift-scheduling/' },
  { text: 'Eightfold AI · free AI practice interviews for job seekers', url: 'https://techrseries.com/artificial-intelligence/eightfold-ai-launches-ai-career-day-offering-free-practice-interviews-on-labor-day/' },
  { text: 'UKG · named a Leader in the 2026 Gartner Magic Quadrant for HCM', url: 'https://techrseries.com/hcm-and-hris/ukg-named-a-leader-in-the-2026-gartner-magic-quadrant-for-hcm/' },
  { text: 'Payrolls · August adds 162K vs 53K forecast; jobless rate holds 4.1%', url: 'https://www.cnbc.com/2026/09/04/jobs-report-august-2026.html' },
  { text: 'Job cuts · 52,881 in August, up 58% — but hiring plans jump 725%', url: 'https://hrexecutive.com/august-job-cuts-up-nearly-60-but-its-not-all-bad-news/' },
  { text: 'California SB 947 · Newsom has until Sept 30 to sign AI-firing limits', url: 'https://www.ebglaw.com/insights/publications/workplace-ai-regulation-in-2026-how-employers-can-navigate-the-changing-legal-landscape' },
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
