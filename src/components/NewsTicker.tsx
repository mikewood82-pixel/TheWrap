const headlines = [
  { text: 'Windmill raises $12M · AI performance review startup nabs combined pre-seed and seed', url: 'https://www.axios.com/pro/enterprise-software-deals/2026/04/28/hr-tech-windmill-performance-ai' },
  { text: 'Juicebox raises $36M · Sequoia-led Series A scales AI recruiting agents to 2,500 customers', url: 'https://juicebox.ai/blog/series-a' },
  { text: 'Shapes lands $24M · ex-monday.com execs build AI-native PeopleOS for HR, IT and Finance', url: 'https://techfundingnews.com/shapes-raises-24m-ai-native-peopleos-hr-platform/' },
  { text: 'SAP SuccessFactors 1H 2026 · suite-wide agentic AI rolls in; production deploy May 15', url: 'https://news.sap.com/2026/04/sap-successfactors-1h-2026-release/' },
  { text: 'Phenom wins HCM Signal Award · H3 HR Advisors names it tops in 2026 AI maturity', url: 'https://www.phenom.com/press-release/phenom-award-for-ai-maturity' },
  { text: 'Oracle Fusion Agentic Apps for HR · 1,000+ AI agents now embedded across HCM at no extra cost', url: 'https://www.uctoday.com/talent-hcm-platforms/oracle-fusion-agentic-applications-for-hr-what-it-means-for-hcm-leaders/' },
  { text: 'UKG cuts 950 jobs · 6% of workforce gone citing AI transformation and market shifts', url: 'https://hrexecutive.com/ukg-cuts-950-jobs-in-latest-round-of-restructuring/' },
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
