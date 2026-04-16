const headlines = [
  { text: 'Microsoft overhauls HR across 220K employees for AI-first structure', url: 'https://asanify.com/blog/news/ai-first-hr-restructuring-april-13-2026/' },
  { text: 'Intuit to acquire GoCo.io · expanding HR & benefits for SMBs', url: 'https://news.crunchbase.com/venture/ai-hr-software-startup-funding-ma/' },
  { text: 'Vensure acquires AI recruiting platform Distro · adds 1.9M-candidate network', url: 'https://www.unleash.ai/hr-technology/the-five-2026-hr-tech-acquisitions-that-put-hr-buyers-in-a-strong-position/' },
  { text: 'U.S. unemployment falls to 4.3% · 178K jobs added in March', url: 'https://www.bls.gov/news.release/empsit.nr0.htm' },
  { text: 'Wage growth slows to 3.5% YoY · lowest annual increase since May 2021', url: 'https://www.shrm.org/topics-tools/april-2026-labor-market-review-hiring-springs-forward0' },
  { text: 'EU AI Act mandatory bias audits for AI hiring tools begin Aug 2026', url: 'https://www.technewsworld.com/story/hrs-2026-playbook-signals-a-human-centric-tech-reset-180063.html' },
  { text: 'Phenom acquires Be Applied + Included AI · expands DEI hiring capabilities', url: 'https://www.unleash.ai/hr-technology/the-five-2026-hr-tech-acquisitions-that-put-hr-buyers-in-a-strong-position/' },
  { text: 'Docebo acquires 365Talents · AI-driven talent marketplace play', url: 'https://www.unleash.ai/hr-technology/the-five-2026-hr-tech-acquisitions-that-put-hr-buyers-in-a-strong-position/' },
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
