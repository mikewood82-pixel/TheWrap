import SEO from '../components/SEO'
import BLSTrendChart from '../components/BLSTrendChart'
import SectorBarChart from '../components/SectorBarChart'
import PayGrowthComparison from '../components/PayGrowthComparison'

// ─── BLS Key Metrics ──────────────────────────────────────────────────────────
const blsMetrics = [
  { label: 'Unemployment Rate', value: '4.3%',   change: '-0.1%',     trend: 'down', note: 'Edged down in March' },
  { label: 'Job Openings',      value: '6.9M',   change: 'unchanged', trend: 'flat', note: 'Rate steady at 4.1%' },
  { label: 'Avg. Hourly Wage',  value: '$37.38', change: '+0.2%',     trend: 'up',   note: '+3.5% year-over-year' },
  { label: 'Layoffs Rate',      value: '1.2%',   change: '+0.1%',     trend: 'up',   note: 'Edged up; +272K YoY' },
  { label: 'Quits Rate',        value: '2.0%',   change: '+0.1%',     trend: 'up',   note: 'Little changed; −285K YoY' },
  { label: 'Jobs Added (BLS)',  value: '178K',   change: '-15K',      trend: 'down', note: 'Above ADP, below consensus' },
]

const historical = [
  { month: 'Nov 2025', unemployment: '4.6%', openings: '7.6M', wages: '$36.41', quits: '2.1%' },
  { month: 'Dec 2025', unemployment: '4.4%', openings: '7.4M', wages: '$36.71', quits: '2.0%' },
  { month: 'Jan 2026', unemployment: '4.4%', openings: '7.2M', wages: '$37.01', quits: '2.0%' },
  { month: 'Feb 2026', unemployment: '4.4%', openings: '6.9M', wages: '$37.29', quits: '1.9%' },
  { month: 'Mar 2026', unemployment: '4.3%', openings: '6.9M', wages: '$37.38', quits: '2.0%', current: true },
]

// ─── ADP ──────────────────────────────────────────────────────────────────────
const adpMetrics = [
  { label: 'Private Jobs Added', value: '62K',   note: 'March 2026 · well below historical avg of ~180K' },
  { label: 'Job-Stayer Pay Growth', value: '4.5%', note: 'YoY · stable for 10 consecutive months' },
  { label: 'Job-Changer Pay Growth', value: '6.6%', note: 'YoY · premium for switching narrowest since 2020' },
  { label: 'Annual Pay (All)',    value: '4.5%',  note: 'YoY overall pay growth, March 2026' },
]

const adpSectors = [
  { sector: 'Education & Health', jobs: '+54K', direction: 'up' },
  { sector: 'Small Business (<20 employees)', jobs: '+112K', direction: 'up' },
  { sector: 'Trade, Transport & Utilities', jobs: '-58K', direction: 'down' },
  { sector: 'Mid-size Business (50–249)', jobs: '-26K', direction: 'down' },
]

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
const revelioMetrics = [
  { label: 'RPLS Jobs Gained (Mar)', value: '+19.4K', note: 'Derived from 100M+ U.S. LinkedIn-style profiles' },
  { label: 'New Posting Salaries',   value: '-2.6%',  note: 'MoM decline in advertised salaries, March 2026' },
  { label: 'Hiring Rate',            value: 'Low',    note: 'Low-hire, low-fire environment persists' },
  { label: 'Attrition Rate',         value: 'Low',    note: 'Both hiring and attrition ticked down in March' },
]

const revelioSectors = [
  { sector: 'Healthcare & Social Services', trend: 'Growing', direction: 'up' },
  { sector: 'Tech / Knowledge Work', trend: 'Stable', direction: 'flat' },
  { sector: 'Retail Trade', trend: 'Declining', direction: 'down' },
  { sector: 'Leisure & Hospitality', trend: 'Declining', direction: 'down' },
  { sector: 'Public Administration', trend: 'Declining', direction: 'down' },
]

// ─── CHRO Confidence Index ────────────────────────────────────────────────────
// Conference Board, Q1 2026 release (Apr 23, 2026). 114 CHROs surveyed.
// Leading indicator — measures HR-leader sentiment vs. BLS/ADP backward-
// looking actuals. Highest reading since the index began in Q1 2023.
const chroIndex = [
  { label: 'Overall Index',      value: '59', change: 'High since Q1 2023', trend: 'up',   note: 'New series record' },
  { label: 'Hiring component',   value: '63', change: '+3 vs. Q4 2025',     trend: 'up',   note: 'Strongest of the three' },
  { label: 'Engagement',         value: '60', change: '+4 vs. Q4 2025',     trend: 'up',   note: 'Solid improvement' },
  { label: 'Retention',          value: '55', change: '+2 vs. Q4 2025',     trend: 'up',   note: 'Modest — the laggard' },
]

const chroHiringPlans = [
  { label: '% planning to increase hiring (H1 2026)', value: '59%', note: 'Up from 54% in Q4 2025' },
  { label: '% expecting retention improvement',        value: '34%', note: 'Half expect no change' },
  { label: 'Top workforce investment',                  value: 'Leadership dev (50%)', note: 'AI/automation second at 36%' },
]

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
const upcomingReleases = [
  { date: 'Tue May 6',  source: 'ADP NER',         what: 'April 2026 private payrolls + pay growth' },
  { date: 'Fri May 8',  source: 'BLS Employment',  what: 'April 2026 nonfarm payrolls + unemployment' },
  { date: 'Tue Jun 2',  source: 'BLS JOLTS',       what: 'April 2026 job openings, hires, quits' },
]

// ─── Aspen Tech Labs ──────────────────────────────────────────────────────────
const aspenInsights = [
  {
    headline: 'Healthcare postings defy broader cooling trend',
    body: 'JobMarketPulse data from 275,000+ career sites shows healthcare vacancy levels remained elevated in March despite overall posting volume declining. Direct employer postings up ~1.2% YoY while agency-driven postings slid ~5.7%.',
  },
  {
    headline: 'AI roles bucked the 2025 pullback — up 92% in vacancies',
    body: 'While total job posting activity cooled across most of the economy in 2025, Aspen\'s AI 50 index tracked a 92%+ increase in AI-related vacancies. Demand in this segment continues to diverge sharply from broader market trends.',
  },
  {
    headline: 'Google for Jobs continues to favor direct employer career sites',
    body: 'Aspen Tech Labs data shows Google for Jobs increasingly surfaces direct employer career site postings over aggregators, reinforcing the value of career site optimization for talent acquisition teams.',
  },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
const implications = [
  {
    headline: 'Leading and lagging signals are diverging',
    body: 'BLS and ADP describe a private sector that has broadly stopped hiring — yet the Conference Board\'s CHRO Confidence Index hit a series-record 59 in Q1, with 59% of HR leaders planning to increase hiring in H1 2026 (up from 54% in Q4 2025). Intent and actuals haven\'t been this far apart since 2023. Either intent is the leading indicator and we see Q2 hiring accelerate — or budget reality forces another reset and the gap closes the other way.',
  },
  {
    headline: 'ADP at 62K is a warning sign, not a blip',
    body: 'Private sector job creation has slowed dramatically. Combined with Revelio\'s RPLS showing only +19.4K net jobs and declining advertised salaries, the picture is of an employer base that has broadly stopped hiring. Workforce planning assumptions built on 150K+ monthly additions need to be revisited.',
  },
  {
    headline: 'Quits at 2.0% — retention pressure still inverted',
    body: 'JOLTS quits ticked up a tenth to 2.0% in March but remain 285K below a year ago — Revelio\'s low-hire, low-fire signal still aligns with BLS, and ADP data shows the job-changer pay premium is the smallest since 2020. The case for switching is weaker — but when conditions shift, suppressed quit rates historically precede a surge.',
  },
  {
    headline: 'Two-speed market: healthcare and AI vs. everyone else',
    body: 'Aspen Tech Labs JobMarketPulse data makes the divergence clear. Healthcare and AI roles are holding or growing while retail, hospitality, and public sector shed jobs. HR leaders in those growth sectors face a supply squeeze; everyone else is in a buyer\'s market for talent.',
  },
]

function TrendIndicator({ direction }: { direction: string }) {
  if (direction === 'up') return <span className="text-green-600 font-bold">↑</span>
  if (direction === 'down') return <span className="text-red-500 font-bold">↓</span>
  return <span className="text-brand-dark/40 font-bold">→</span>
}

export default function LaborMarketPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO
        title="Labor Market"
        description="Weekly labor market data and HR tech hiring trends — unemployment, job openings, wage growth, and Mike's take."
        url="/labor-market"
      />

      {/* Header */}
      <div className="mb-6">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Data · Updated May 2026</div>
        <h1 className="font-serif text-4xl font-bold mb-3">U.S. Labor Market</h1>
        <p className="text-brand-dark/60 text-lg">BLS, ADP, Conference Board CHRO Index, Revelio Labs, and Aspen Tech Labs — what the numbers mean for HR leaders.</p>
      </div>

      {/* Upcoming releases callout — next data drops on the calendar */}
      <div className="bg-brand-cream/60 border border-brand-cream rounded-xl px-5 py-4 mb-10">
        <div className="text-xs text-brand-dark/50 uppercase tracking-wide font-semibold mb-2">Upcoming releases</div>
        <ul className="space-y-1.5">
          {upcomingReleases.map(r => (
            <li key={r.date} className="text-sm flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="font-semibold text-brand-dark whitespace-nowrap">{r.date}</span>
              <span className="text-brand-dark/70">
                <span className="font-medium">{r.source}</span>
                <span className="text-brand-dark/40"> · </span>
                {r.what}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── BLS ─────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-serif text-2xl font-bold">Bureau of Labor Statistics</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Official · March 2026</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {blsMetrics.map((m) => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-3xl font-bold mb-1">{m.value}</div>
            <div className={`text-xs font-medium mb-1 ${
              m.trend === 'up' ? 'text-amber-600' :
              m.trend === 'down' ? 'text-green-600' :
              'text-brand-dark/40'
            }`}>{m.change} MoM</div>
            <div className="text-xs text-brand-dark/40">{m.note}</div>
          </div>
        ))}
      </div>

      {/* BLS Trend Charts */}
      <BLSTrendChart data={historical} />

      {/* BLS Historical table */}
      <div className="overflow-x-auto rounded-xl border border-brand-cream mb-12">
        <table className="w-full text-sm">
          <thead className="bg-brand-dark text-brand-cream">
            <tr>
              {['Month', 'Unemployment', 'Job Openings', 'Avg. Wage', 'Quits Rate'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historical.map((row) => (
              <tr key={row.month} className={row.current ? 'bg-brand-gold/10 font-medium' : 'bg-white even:bg-brand-light'}>
                <td className="px-4 py-3">{row.month}{row.current && <span className="ml-2 text-xs text-brand-terracotta font-bold">Latest</span>}</td>
                <td className="px-4 py-3">{row.unemployment}</td>
                <td className="px-4 py-3">{row.openings}</td>
                <td className="px-4 py-3">{row.wages}</td>
                <td className="px-4 py-3">{row.quits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CHRO Confidence Index ───────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-2">
        <h2 className="font-serif text-2xl font-bold">CHRO Confidence Index</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Conference Board · Q1 2026</span>
      </div>
      <p className="text-sm text-brand-dark/60 mb-4">Leading indicator — measures HR-leader sentiment vs. backward-looking BLS/ADP actuals. 114 CHROs surveyed; released April 23, 2026.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {chroIndex.map(m => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-3xl font-bold mb-1">{m.value}</div>
            <div className="text-xs font-medium text-green-600 mb-1">{m.change}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {chroHiringPlans.map(p => (
          <div key={p.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1.5">{p.label}</div>
            <div className="font-serif text-xl font-bold text-brand-dark mb-1">{p.value}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{p.note}</div>
          </div>
        ))}
      </div>
      <div className="bg-brand-cream/40 border-l-4 border-brand-terracotta rounded-r-lg px-5 py-3 mb-12">
        <p className="text-sm text-brand-dark/80 italic">
          "Hiring momentum is back, but retention is where the real work begins."
        </p>
        <p className="text-xs text-brand-dark/40 mt-1">— Diana Scott, US Human Capital Center Leader, The Conference Board</p>
      </div>

      {/* ── ADP ─────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-serif text-2xl font-bold">ADP Research</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Private Sector · March 2026</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {adpMetrics.map(m => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-2xl font-bold mb-1">{m.value}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>

      {/* Pay Growth Comparison */}
      <PayGrowthComparison stayer={4.5} changer={6.6} />

      {/* ADP Sector Bar Chart */}
      <SectorBarChart
        title="Sector Breakdown — March 2026"
        data={adpSectors.map(s => ({
          sector: s.sector,
          value: parseInt(s.jobs.replace(/[+K]/g, ''), 10),
          label: s.jobs,
        }))}
      />
      <div className="px-1 pt-2 pb-12">
        <a href="https://adpemploymentreport.com" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full report at adpemploymentreport.com →</a>
      </div>

      {/* ── Revelio Labs ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-serif text-2xl font-bold">Revelio Labs — RPLS</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">100M+ Profiles · March 2026</span>
      </div>
      <p className="text-sm text-brand-dark/50 mb-5 leading-relaxed">Revelio Public Labor Statistics (RPLS) is built from 100M+ U.S. workforce profiles — covering ~67% of employed Americans vs. ~27% for BLS establishment surveys. It captures workforce transitions that official surveys miss.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {revelioMetrics.map(m => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-2xl font-bold mb-1">{m.value}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-brand-cream rounded-xl overflow-hidden mb-12">
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">Sector Employment Trends — March 2026</div>
        {revelioSectors.map(s => (
          <div key={s.sector} className="flex items-center justify-between px-5 py-3 border-t border-brand-cream">
            <span className="text-sm text-brand-dark/70">{s.sector}</span>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${
              s.direction === 'up' ? 'text-green-600' :
              s.direction === 'down' ? 'text-red-500' :
              'text-brand-dark/40'
            }`}>
              <TrendIndicator direction={s.direction} /> {s.trend}
            </span>
          </div>
        ))}
        <div className="px-5 py-2.5 border-t border-brand-cream">
          <a href="https://www.reveliolabs.com/public-labor-statistics/" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full RPLS data at reveliolabs.com →</a>
        </div>
      </div>

      {/* ── Aspen Tech Labs ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-serif text-2xl font-bold">Aspen Tech Labs — JobMarketPulse</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">275K+ Career Sites · Q1 2026</span>
      </div>
      <p className="text-sm text-brand-dark/50 mb-5 leading-relaxed">JobMarketPulse tracks live job postings directly from 275,000+ employer career sites globally — capturing hiring intent at the source before aggregators pick it up.</p>
      <div className="space-y-4 mb-12">
        {aspenInsights.map(item => (
          <div key={item.headline} className="bg-white border border-brand-cream rounded-xl p-5 border-l-4 border-l-brand-gold">
            <div className="font-serif font-semibold mb-1">{item.headline}</div>
            <p className="text-sm text-brand-dark/60 leading-relaxed">{item.body}</p>
          </div>
        ))}
        <div className="px-1 pt-1">
          <a href="https://aspentechlabs.com" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full JobMarketPulse data at aspentechlabs.com →</a>
        </div>
      </div>

      {/* ── HR Implications ───────────────────────────────────────────────────── */}
      <h2 className="font-serif text-2xl font-bold mb-4">What This Means for HR</h2>
      <div className="space-y-4 mb-4">
        {implications.map(imp => (
          <div key={imp.headline} className="bg-brand-cream rounded-xl p-5 border-l-4 border-brand-terracotta">
            <div className="font-serif font-semibold mb-1">{imp.headline}</div>
            <p className="text-sm text-brand-dark/60 leading-relaxed">{imp.body}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-brand-dark/30 mt-4">Sources: U.S. Bureau of Labor Statistics · ADP National Employment Report · Revelio Public Labor Statistics (RPLS) · Aspen Tech Labs JobMarketPulse. Updated May 2026.</p>
    </div>
  )
}
