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
  { label: 'Private Jobs Added', value: '109K', note: 'April 2026 · fastest pace since January 2025' },
  { label: 'Job-Stayer Pay Growth', value: '4.4%', note: 'YoY · down a tenth from March' },
  { label: 'Job-Changer Pay Growth', value: '6.6%', note: 'YoY · job-switcher premium narrowest since 2020' },
  { label: 'Annual Pay (All)',    value: '4.4%',  note: 'YoY overall pay growth, April 2026' },
]

const adpSectors = [
  { sector: 'Education & Health', jobs: '+61K', direction: 'up' },
  { sector: 'Small Business (<20 employees)', jobs: '+65K', direction: 'up' },
  { sector: 'Trade, Transport & Utilities', jobs: '+25K', direction: 'up' },
  { sector: 'Mid-size Business (50–249)', jobs: '+2K', direction: 'flat' },
]

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
const revelioMetrics = [
  { label: 'RPLS Jobs Gained (Apr)', value: '+66.4K', note: 'Derived from 100M+ U.S. LinkedIn-style profiles' },
  { label: 'New Posting Salaries',   value: '−0.1%',  note: 'MoM · second consecutive monthly decline' },
  { label: 'Hiring Rate',            value: 'Up',     note: 'Ticked up in April after months of compression' },
  { label: 'Attrition Rate',         value: 'Flat',   note: 'Hiring up + attrition flat = net positive month' },
]

const revelioSectors = [
  { sector: 'Healthcare & Social Services', trend: 'Growing', direction: 'up' },
  { sector: 'Finance', trend: 'Growing', direction: 'up' },
  { sector: 'Construction', trend: 'Growing (+12.3K)', direction: 'up' },
  { sector: 'Retail Trade', trend: 'Declining (−17.9K)', direction: 'down' },
  { sector: 'Leisure & Hospitality', trend: 'Declining (−26.8K)', direction: 'down' },
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

// ─── Latest Release ───────────────────────────────────────────────────────────
// Hero callout for the most recent data drop — surfaces fresh numbers above
// the fold. Refresh every release cycle.
const latestRelease = {
  source: 'ADP NER',
  period: 'April 2026',
  releasedOn: 'Tue May 6, 2026',
  headline: 'Private payrolls jumped to 109K — fastest pace since January 2025',
  stats: [
    { label: 'Private Jobs',    value: '109K', detail: 'April · vs revised 61K in March' },
    { label: 'Job-Stayer Pay',  value: '4.4%', detail: 'YoY · down a tenth from March' },
    { label: 'Job-Changer Pay', value: '6.6%', detail: 'YoY · premium narrow but steady' },
    { label: 'Mid-Size Firms',  value: '+2K',  detail: 'softness in the middle' },
  ],
  takeaway: 'Hiring snapped back — but it\'s lopsided. Small businesses (+65K) and large employers (+42K) drove the entire gain while mid-size firms (50–249) added just 2K. Education & health added 61K alone. Strong headline, narrow base.',
}

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
const upcomingReleases = [
  { date: 'Fri May 8',  source: 'BLS Employment',  what: 'April 2026 nonfarm payrolls + unemployment' },
  { date: 'Tue Jun 2',  source: 'BLS JOLTS',       what: 'April 2026 job openings, hires, quits' },
  { date: 'Thu Jun 4',  source: 'ADP NER',         what: 'May 2026 private payrolls + pay growth' },
]

// ─── Aspen Tech Labs ──────────────────────────────────────────────────────────
const aspenInsights = [
  {
    headline: 'AI Specialist roles up 76.9% YoY — divergence from the broader market',
    body: 'JobMarketPulse data from 275,000+ career sites shows AI Specialist postings grew 76.9% year-over-year while overall U.S. postings fell 2.0%. Engineering roles broadly grew +8.0% YoY. Demand in AI continues to defy the cooling trend across the rest of the labor market.',
  },
  {
    headline: 'Remote work rebounds — 12.3% YoY, 22.6% QoQ',
    body: 'Remote postings now make up 2.43% of all U.S. vacancies, up from 2.12% a year ago. Remote roles rebounded 22.6% quarter-over-quarter, growing faster than the overall market. IT leads remote postings, followed by Marketing and Legal.',
  },
  {
    headline: 'Two-speed wage market — Electricians +8.7%, Nursing roles −5.6%',
    body: 'Median full-time advertised salaries hit $64,147 in March (+4.3% YoY), but the average masks sharp role-by-role swings. Skilled trades like Electricians saw +8.7% wage growth while Nursing postings fell 5.6% and Marketing roles dropped 6.4% YoY.',
  },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
const implications = [
  {
    headline: 'Leading and lagging signals are converging — upward',
    body: 'For the first time in months, ADP (109K), Revelio (+66.4K), and the CHRO Confidence Index (series-record 59) are all pointing the same direction. Job-changer pay premium is still the narrowest since 2020 and salaries on new postings are still falling — so the case for switching remains weak — but the supply-demand dynamic is shifting. Workforce plans built on assumptions of continued cooling need stress-testing against a possible Q2 reacceleration.',
  },
  {
    headline: 'ADP\'s 109K bounce is real but narrow',
    body: 'Private payrolls jumped to 109K in April — the fastest pace since January 2025 and a clean break from March\'s revised 61K. But the gain was lopsided: small businesses (+65K) and large employers (+42K) carried it while mid-size firms (50–249) added just 2K. Combined with Revelio\'s +66.4K and rising hiring rate, the labor market may have found a floor. The mid-market squeeze is the new story to watch.',
  },
  {
    headline: 'Quits at 2.0% — retention pressure still inverted',
    body: 'JOLTS quits ticked up a tenth to 2.0% in March but remain 285K below a year ago. ADP data shows the job-changer pay premium is the smallest since 2020 and Revelio reports salaries on new postings fell again in April. The case for switching is weaker — but with hiring now turning up, suppressed quit rates historically precede a surge once conditions improve.',
  },
  {
    headline: 'Two-speed market: AI and trades vs. everyone else',
    body: 'Aspen Tech Labs JobMarketPulse data sharpens the divergence. AI Specialist postings are up 76.9% YoY and Electrician wages grew 8.7%, while Nursing (−5.6%), Marketing (−6.4%), and Admin Support (−5.7%) postings shed share. HR leaders in those growth pockets face a supply squeeze; everyone else is in a buyer\'s market for talent.',
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

      {/* Latest release hero — most recent data drop, called out at the top */}
      <div className="bg-white border-2 border-brand-terracotta rounded-xl px-6 py-5 mb-5 shadow-sm">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-terracotta">Just released</span>
          <span className="text-xs text-brand-dark/40">{latestRelease.releasedOn}</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-3 mb-3">
          <h2 className="font-serif text-2xl font-bold text-brand-dark">{latestRelease.source} — {latestRelease.period}</h2>
        </div>
        <p className="text-base text-brand-dark/80 mb-4 leading-relaxed">{latestRelease.headline}.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {latestRelease.stats.map(s => (
            <div key={s.label} className="bg-brand-cream/40 rounded-lg px-3 py-2.5">
              <div className="text-[11px] uppercase tracking-wide text-brand-dark/40 font-medium mb-0.5">{s.label}</div>
              <div className="font-serif text-2xl font-bold text-brand-dark leading-tight">{s.value}</div>
              <div className="text-xs text-brand-dark/50 mt-0.5">{s.detail}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-brand-dark/60 leading-relaxed italic">{latestRelease.takeaway}</p>
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
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Private Sector · April 2026</span>
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
      <PayGrowthComparison stayer={4.4} changer={6.6} />

      {/* ADP Sector Bar Chart */}
      <SectorBarChart
        title="Sector Breakdown — April 2026"
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
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">100M+ Profiles · April 2026</span>
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
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">Sector Employment Trends — April 2026</div>
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
