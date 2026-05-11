const headlines = [
  { text: 'April jobs report · +115K nonfarm payrolls, unemployment holds at 4.3% per BLS', url: 'https://www.bls.gov/news.release/empsit.nr0.htm' },
  { text: 'ADP April · private payrolls +109K, biggest monthly gain in 15 months', url: 'https://www.cnbc.com/2026/05/06/private-payrolls-rose-by-109000-in-april-topping-expectations-adp-says.html' },
  { text: 'ServiceNow debuts Otto at Knowledge 2026 · unified AI agent routes HR, IT, finance work across the platform', url: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Otto-creates-the-unified-AI-experience-for-the-enterprise/default.aspx' },
  { text: 'Microsoft Agent 365 hits GA · $15/user/mo, bundled into new E7 Frontier Suite for governed enterprise agents', url: 'https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/05/microsoft-365-copilot-human-agency-and-the-opportunity-for-every-organization/' },
  { text: 'SAP SuccessFactors 1H 2026 · suite-wide agentic AI lands in production May 15', url: 'https://news.sap.com/2026/04/sap-successfactors-1h-2026-release/' },
  { text: 'Carefam exits stealth with $14.5M · AI agents tackle healthcare hiring bottleneck, claims 900% YoY growth', url: 'https://techfundingnews.com/14-5m-for-carefam-ai-agents-to-fix-healthcare-hiring-bottleneck/' },
  { text: 'Phenom acquires Included AI · agentic people analytics folds into talent experience suite', url: 'https://technical.ly/entrepreneurship/phenom-acquires-included-philadelphia-power-moves/' },
  { text: 'Remote scoops up Atlas · global expense card and healthcare stack join EOR platform', url: 'https://remote.com/news/remote-acquires-atlas-to-simplify-how-global-teams-spend-and-scale' },
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
