import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import BLSTrendChart from '../components/BLSTrendChart'
import SectorBarChart from '../components/SectorBarChart'
import PayGrowthComparison from '../components/PayGrowthComparison'
import WUITrendChart from '../components/WUITrendChart'

// ─── BLS Key Metrics ──────────────────────────────────────────────────────────
const blsMetrics = [
  { label: 'Unemployment Rate', value: '4.3%',   change: 'unchanged', trend: 'flat', note: 'Steady for third consecutive month' },
  { label: 'Job Openings',      value: '7.6M',   change: '+731K',     trend: 'up',   note: 'April JOLTS · highest since May 2024' },
  { label: 'Avg. Hourly Wage',  value: '$37.53', change: '+0.3%',     trend: 'up',   note: '+3.4% YoY · 12¢ gain' },
  { label: 'Layoffs Rate',      value: '1.1%',   change: '−0.1%',     trend: 'down', note: 'April JOLTS · 1.7M, little changed' },
  { label: 'Quits Rate',        value: '1.9%',   change: '−0.1%',     trend: 'down', note: 'April JOLTS · −183K, biggest drop in a year' },
  { label: 'Jobs Added (BLS)',  value: '172K',   change: 'similar',   trend: 'flat', note: 'Apr revised up to +179K · +93K w/ Mar' },
]

const historical = [
  { month: 'Jan 2026', unemployment: '4.4%', openings: '7.2M', wages: '$37.01', quits: '2.0%' },
  { month: 'Feb 2026', unemployment: '4.4%', openings: '6.9M', wages: '$37.29', quits: '1.9%' },
  { month: 'Mar 2026', unemployment: '4.3%', openings: '6.9M', wages: '$37.38', quits: '2.0%' },
  { month: 'Apr 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.45', quits: '1.9%' },
  { month: 'May 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.53', quits: '1.9%', current: true },
]

// ─── ADP ──────────────────────────────────────────────────────────────────────
const adpMetrics = [
  { label: 'Private Jobs Added', value: '122K', note: 'May 2026 · strongest pace since January 2025' },
  { label: 'Job-Stayer Pay Growth', value: '4.4%', note: 'YoY · unchanged from April' },
  { label: 'Job-Changer Pay Growth', value: '6.5%', note: 'YoY · job-switcher premium narrowest since 2020' },
  { label: 'Annual Pay (All)',    value: '4.4%',  note: 'YoY overall pay growth, May 2026' },
]

// Broad-based May: 8 of ADP's 10 tracked sectors added jobs.
const adpSectors = [
  { sector: 'Education & Health', jobs: '+57K', direction: 'up' },
  { sector: 'Trade, Transport & Utilities', jobs: '+36K', direction: 'up' },
  { sector: 'Professional & Business Services', jobs: '+11K', direction: 'up' },
  { sector: 'Construction', jobs: '+8K', direction: 'up' },
  { sector: 'Leisure & Hospitality', jobs: '+8K', direction: 'up' },
]

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
const revelioMetrics = [
  { label: 'RPLS Jobs Gained (May)', value: '+123.7K', note: 'Derived from 100M+ U.S. LinkedIn-style profiles' },
  { label: 'New Posting Salaries',   value: '−0.4%',   note: 'MoM · continued downward trend' },
  { label: 'Hiring Rate',            value: 'Steady',  note: 'Held steady through May' },
  { label: 'Attrition Rate',         value: 'Down',    note: 'Attrition declined = net positive month' },
]

const revelioSectors = [
  { sector: 'Public Administration', trend: 'Growing', direction: 'up' },
  { sector: 'Health Care & Social Assistance', trend: 'Growing', direction: 'up' },
  { sector: 'Professional & Business Services', trend: 'Growing (+18.6K)', direction: 'up' },
  { sector: 'Construction', trend: 'Growing (+15.3K)', direction: 'up' },
  { sector: 'Retail Trade', trend: 'Declining (−22.9K)', direction: 'down' },
  { sector: 'Leisure & Hospitality', trend: 'Declining (−30.7K)', direction: 'down' },
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
  source: 'BLS Employment Situation',
  period: 'May 2026',
  releasedOn: 'Fri Jun 5, 2026',
  headline: 'Nonfarm payrolls +172K and March/April revised up a combined 93K; unemployment holds at 4.3%',
  stats: [
    { label: 'Nonfarm Payrolls', value: '+172K',  detail: 'similar to April’s +179K' },
    { label: 'Unemployment',     value: '4.3%',   detail: 'unchanged · third month' },
    { label: 'Avg. Hourly Wage', value: '$37.53', detail: '+0.3% MoM · +3.4% YoY' },
    { label: 'Participation',    value: '61.8%',  detail: 'held · U-6 eased to 8.1%' },
  ],
  takeaway: 'The “April cooling” was a mirage: April was revised up from +115K to +179K and March to +214K — 93K stronger than first reported — and May added another +172K. Unemployment held at 4.3% for a third month, U-6 eased to 8.1%, and participation steadied at 61.8%. The catch is mobility: April JOLTS openings spiked to a near-two-year-high 7.6M while quits fell to 1.9%. Employers are posting, but workers aren’t moving — a low-hire, low-fire freeze.',
}

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
const upcomingReleases = [
  { date: 'Tue Jun 30', source: 'BLS JOLTS',       what: 'May 2026 job openings, hires, quits' },
  { date: 'Wed Jul 1',  source: 'ADP NER',         what: 'June 2026 private payrolls + pay growth' },
  { date: 'Thu Jul 2',  source: 'BLS Employment',  what: 'June 2026 nonfarm payrolls + unemployment' },
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
    headline: 'The “April cooling” was a revision artifact — the floor is firmer',
    body: 'The weak +115K April print that landed a month ago has been revised up to +179K, and March to +214K — a combined 93K stronger than first reported. May added another +172K. ADP (+122K, its best since January 2025) and Revelio (+123.7K) corroborate the strength, and both show gains broadening beyond healthcare — ADP counted gains in 8 of its 10 sectors. Workforce plans written off the original cooling headline were reacting to noise, not signal.',
  },
  {
    headline: 'Low-hire, low-fire — openings spike but quits collapse',
    body: 'April JOLTS openings jumped 731K to 7.6M, the highest since May 2024, yet quits fell to 1.9% (−183K, the largest monthly drop in a year) and layoffs held at a low 1.1%. Employers are advertising but few workers are moving, and few are being cut. That paradox is why The Wrap Underemployment Index climbed to 71.4 for April: with quits in the 5th percentile of the past decade, the market is frozen, not loose. A freeze flatters retention costs today but stores up turnover risk for whenever mobility thaws.',
  },
  {
    headline: 'The switching premium keeps narrowing — retention pressure is inverted',
    body: 'ADP’s job-changer pay growth edged down again to 6.5% while job-stayers held at 4.4%, and Revelio reports new-posting salaries fell another 0.4% in May. The reward for switching jobs is the weakest in years, and with quits already at 1.9% the incentive to move barely exists. The risk for HR isn’t poaching today — it’s the backlog of would-be switchers that releases once elevated openings finally translate into hires.',
  },
  {
    headline: 'Two-speed market persists — gains concentrated, losses pointed',
    body: 'Even in a broad-based month the splits are sharp. Revelio shows Public Administration, Health Care, Professional & Business Services (+18.6K) and Construction (+15.3K) adding workers while Retail Trade (−22.9K) and Leisure & Hospitality (−30.7K) shed them. (BLS and ADP, working from payroll rather than profile data, actually show leisure & hospitality gaining in May — a methodology gap worth watching.) HR leaders in the growth pockets face a supply squeeze; consumer-facing sectors remain a buyer’s market for talent.',
  },
]

function TrendIndicator({ direction }: { direction: string }) {
  if (direction === 'up') return <span className="text-green-600 font-bold">↑</span>
  if (direction === 'down') return <span className="text-red-500 font-bold">↓</span>
  return <span className="text-brand-dark/40 font-bold">→</span>
}

// ─── The Wrap Underemployment Index (WUI) ─────────────────────────────────────
// Proprietary 0–100 composite of three FRED series. Fetched client-side from
// /api/bls/wui. Section hides silently on fetch failure so the rest of the
// page still renders.

type WuiSnapshot = {
  date: string
  wui: number
  u6: number
  u3: number
  spread: number
  quits: number
  pctU6: number
  pctSpread: number
  pctQuits: number
}

type WuiResponse = {
  latest: WuiSnapshot
  prior_month: WuiSnapshot | null
  year_ago: WuiSnapshot | null
  series: { date: string; wui: number }[]
}

function ordinal(n: number): string {
  const v = n % 100
  if (v >= 11 && v <= 13) return `${n}th`
  switch (n % 10) {
    case 1: return `${n}st`
    case 2: return `${n}nd`
    case 3: return `${n}rd`
    default: return `${n}th`
  }
}

function formatMonth(date: string): string {
  const [y, m] = date.split('-')
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December']
  const idx = Math.max(0, Math.min(11, parseInt(m, 10) - 1))
  return `${months[idx]} ${y}`
}

function DeltaPill({ from, to, suffix }: { from: number | undefined; to: number; suffix?: string }) {
  if (from == null) return null
  const delta = to - from
  const sign = delta > 0 ? '+' : ''
  const cls =
    delta > 0 ? 'text-amber-600'
    : delta < 0 ? 'text-green-600'
    : 'text-brand-dark/40'
  return (
    <span className={`text-xs font-medium ${cls}`}>
      {sign}{delta.toFixed(1)}{suffix ?? ''}
    </span>
  )
}

function WUISection() {
  const [data, setData] = useState<WuiResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    fetch('/api/bls/wui')
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((j: WuiResponse) => { if (!cancelled) { setData(j); setStatus('ready') } })
      .catch(() => { if (!cancelled) setStatus('error') })
    return () => { cancelled = true }
  }, [])

  if (status === 'error') return null // Hide gracefully — page still works.

  if (status === 'loading') {
    return (
      <div className="bg-white border border-brand-cream rounded-xl px-6 py-5 mb-10 animate-pulse">
        <div className="h-4 w-32 bg-brand-cream rounded mb-3" />
        <div className="h-10 w-48 bg-brand-cream rounded mb-3" />
        <div className="h-40 bg-brand-cream/60 rounded" />
      </div>
    )
  }

  const { latest, prior_month, year_ago, series } = data!

  return (
    <section className="mb-12">
      <div className="mb-4">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">
          Wrap proprietary index · Updated monthly
        </div>
        <h2 className="font-serif text-3xl font-bold mb-2">The Wrap Underemployment Index (WUI)</h2>
        <p className="text-brand-dark/60 text-base leading-relaxed">
          A 0–100 monthly composite that captures real labor-market slack. Blends broad
          underemployment (U-6), the gap between official and broad unemployment, and the JOLTS
          quits rate — each normalized against the trailing decade. Higher = more slack.
        </p>
      </div>

      {/* "What is slack?" primer — sits between the intro and the headline number so first-time
          readers understand what the 62.5 actually represents before they see it. */}
      <div className="bg-brand-cream/40 border border-brand-cream rounded-xl px-5 py-3 mb-5">
        <div className="text-xs uppercase tracking-wide font-medium text-brand-dark/60 mb-1.5">
          What is slack?
        </div>
        <p className="text-sm text-brand-dark/75 leading-relaxed">
          Unused worker capacity in the economy — the gap between the workforce we have and
          how much of it is fully employed at the hours people want. <strong>High slack</strong>{' '}
          means employers have the upper hand: easier hiring, slower wage growth, fewer quits.{' '}
          <strong>Low slack</strong> means workers do: harder hiring, wage pressure, more
          turnover.
        </p>
      </div>

      {/* Hero card — current reading + deltas */}
      <div className="bg-white border-2 border-brand-terracotta rounded-xl px-6 py-5 mb-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-brand-terracotta mb-1">
              Current reading
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-bold text-brand-dark tabular-nums">
                {latest.wui.toFixed(1)}
              </span>
              <span className="text-brand-dark/40 text-base">/ 100</span>
            </div>
            <div className="text-xs text-brand-dark/50 mt-1">as of {formatMonth(latest.date)}</div>
          </div>
          <div className="flex gap-5 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-dark/40 font-medium mb-0.5">vs. prior month</div>
              <DeltaPill from={prior_month?.wui} to={latest.wui} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-dark/40 font-medium mb-0.5">vs. year ago</div>
              <DeltaPill from={year_ago?.wui} to={latest.wui} />
            </div>
          </div>
        </div>

        <WUITrendChart data={series} />
      </div>

      {/* Component breakdown — three cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-white border border-brand-cream rounded-xl p-4">
          <div className="text-xs text-brand-dark/40 mb-1">U-6 underemployment</div>
          <div className="font-serif text-3xl font-bold mb-1 tabular-nums">{latest.u6.toFixed(1)}%</div>
          <div className="text-xs text-brand-dark/40">{ordinal(latest.pctU6)} pct vs. last 10y · weight 50%</div>
        </div>
        <div className="bg-white border border-brand-cream rounded-xl p-4">
          <div className="text-xs text-brand-dark/40 mb-1">U-6 minus U-3 spread</div>
          <div className="font-serif text-3xl font-bold mb-1 tabular-nums">{latest.spread.toFixed(1)} pp</div>
          <div className="text-xs text-brand-dark/40">{ordinal(latest.pctSpread)} pct · weight 30%</div>
        </div>
        <div className="bg-white border border-brand-cream rounded-xl p-4">
          <div className="text-xs text-brand-dark/40 mb-1">Quits rate (JOLTS)</div>
          <div className="font-serif text-3xl font-bold mb-1 tabular-nums">{latest.quits.toFixed(1)}%</div>
          <div className="text-xs text-brand-dark/40">{ordinal(latest.pctQuits)} pct · inverted · weight 20%</div>
        </div>
      </div>

      {/* Methodology */}
      <details className="bg-brand-cream/40 border border-brand-cream rounded-xl px-5 py-3 mb-3">
        <summary className="text-sm font-medium text-brand-dark cursor-pointer select-none">
          Methodology
        </summary>
        <div className="text-sm text-brand-dark/70 leading-relaxed mt-3 space-y-2">
          <p>
            Each of the three components is converted to a percentile against its own trailing
            120 months. The WUI is then a weighted blend:
          </p>
          <p className="font-mono text-xs bg-white border border-brand-cream rounded px-3 py-2">
            WUI = 0.50 × pct(U-6) + 0.30 × pct(U-6 − U-3) + 0.20 × (100 − pct(quits))
          </p>
          <p>
            The quits rate is inverted because <em>low</em> quits indicate workers are stuck —
            a proxy for unmeasured underemployment. By construction the WUI sits in 0–100,
            where ~50 is in line with the last decade, &gt;75 signals elevated slack, and
            &lt;25 signals an unusually tight market.
          </p>
          <p>
            Source series, all from FRED: <code>U6RATE</code>, <code>UNRATE</code>,
            <code> JTSQUR</code>. Updated on the 7th of each month once the prior month's
            JOLTS release is in. Historical FRED revisions are pulled in on each run.
          </p>
        </div>
      </details>

      <p className="text-xs text-brand-dark/40">
        Sourced from{' '}
        <a href="https://fred.stlouisfed.org/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-terracotta transition-colors">
          FRED (Federal Reserve Bank of St. Louis)
        </a>.
        Index methodology by The Wrap.
      </p>
    </section>
  )
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
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Data · Updated June 5, 2026</div>
        <h1 className="font-serif text-4xl font-bold mb-3">U.S. Labor Market</h1>
        <p className="text-brand-dark/60 text-lg">BLS, ADP, Conference Board CHRO Index, Revelio Labs, and Aspen Tech Labs — what the numbers mean for HR leaders.</p>
      </div>

      {/* In-page nav — jump straight to a data source. Small, eyebrow-weight, doesn't compete with H1. */}
      <nav aria-label="Jump to section" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs uppercase tracking-widest font-medium text-brand-dark/50 mb-10">
        {[
          { href: '#bls',          label: 'BLS' },
          { href: '#chro',         label: 'CHRO' },
          { href: '#adp',          label: 'ADP' },
          { href: '#revelio',      label: 'Revelio' },
          { href: '#aspen',        label: 'Aspen' },
          { href: '#implications', label: 'Implications' },
        ].map((item, i, arr) => (
          <span key={item.href} className="flex items-center gap-1">
            <a href={item.href} className="hover:text-brand-terracotta transition-colors">{item.label}</a>
            {i < arr.length - 1 && <span className="text-brand-dark/25" aria-hidden="true">·</span>}
          </span>
        ))}
      </nav>

      {/* ── Release calendar ─────────────────────────────────────────────────
          Top-of-page cluster: what just dropped + what's coming. Lifted above
          WUI so readers see the most time-sensitive thing first. */}
      <section className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-3">
          Release calendar · BLS · ADP · JOLTS
        </div>

        {/* Latest release hero — most recent data drop */}
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
        <div className="bg-brand-cream/60 border border-brand-cream rounded-xl px-5 py-4">
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
      </section>

      {/* The Wrap Underemployment Index — proprietary composite, fetched live from /api/bls/wui */}
      <WUISection />

      {/* ── BLS ─────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="bls">
        <h2 className="font-serif text-2xl font-bold">Bureau of Labor Statistics</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Official · May 2026</span>
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
      <div className="flex items-center gap-3 mb-2 scroll-mt-6" id="chro">
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
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="adp">
        <h2 className="font-serif text-2xl font-bold">ADP Research</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Private Sector · May 2026</span>
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
        title="Sector Breakdown — May 2026"
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
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="revelio">
        <h2 className="font-serif text-2xl font-bold">Revelio Labs — RPLS</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">100M+ Profiles · May 2026</span>
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
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">Sector Employment Trends — May 2026</div>
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
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="aspen">
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
      <h2 id="implications" className="font-serif text-2xl font-bold mb-4 scroll-mt-6">What This Means for HR</h2>
      <div className="space-y-4 mb-4">
        {implications.map(imp => (
          <div key={imp.headline} className="bg-brand-cream rounded-xl p-5 border-l-4 border-brand-terracotta">
            <div className="font-serif font-semibold mb-1">{imp.headline}</div>
            <p className="text-sm text-brand-dark/60 leading-relaxed">{imp.body}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-brand-dark/30 mt-4">Sources: U.S. Bureau of Labor Statistics · ADP National Employment Report · Revelio Public Labor Statistics (RPLS) · Aspen Tech Labs JobMarketPulse. Updated June 5, 2026.</p>
    </div>
  )
}
