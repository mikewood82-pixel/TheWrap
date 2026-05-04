const headlines = [
  { text: 'ADP Q3 FY2026 beats · revenue +7% to $5.9B, EPS $3.37 tops estimates, full-year guidance raised', url: 'https://investors.adp.com/news/news-details/2026/ADP-Reports-Third-Quarter-Fiscal-2026-Results/default.aspx' },
  { text: 'Greenhouse drops 2026 candidate AI report · 63% have faced an AI interview, 38% walked away mid-screen', url: 'https://www.prnewswire.com/news-releases/63-of-job-seekers-have-faced-an-ai-interview-most-havent-had-a-good-one-yet-302760120.html' },
  { text: 'BambooHR taps Turn for native screening · AI background checks land natively inside TurnOS workflow', url: 'https://www.globenewswire.com/news-release/2026/04/28/3283212/0/en/BambooHR-Partners-with-Turn-to-Deliver-Native-Background-Checks.html' },
  { text: 'Workday Government debuts PAR Agent · slashes federal HR processing cycles by up to 60%', url: 'https://hrtechfeed.com/workday-government-unveils-personnel-action-request-par-agent-to-modernize-federal-hr-and-strengthen-mission-readiness/' },
  { text: 'SAP SuccessFactors 1H 2026 · suite-wide agentic AI rolls in; production deploy May 15', url: 'https://news.sap.com/2026/04/sap-successfactors-1h-2026-release/' },
  { text: 'CHRO Confidence Index hits 59 · strongest read since 2023 as hiring intent climbs in H1', url: 'https://www.hrdive.com/news/chro-confidence-levels-strongest-tracked-the-conference-board/818654/' },
  { text: 'Salesforce sued over FMLA · suit alleges company built "negative record" of leave-taker', url: 'https://www.hrdive.com/news/salesforce-negative-record-employee-fmla-leave/818598/' },
  { text: 'March jobs report · +178K nonfarm payrolls, unemployment holds at 4.3% per BLS', url: 'https://www.bls.gov/news.release/empsit.nr0.htm' },
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
