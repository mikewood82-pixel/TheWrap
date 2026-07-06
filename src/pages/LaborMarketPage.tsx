import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import BLSTrendChart from '../components/BLSTrendChart'
import SectorBarChart from '../components/SectorBarChart'
import PayGrowthComparison from '../components/PayGrowthComparison'
import WUITrendChart from '../components/WUITrendChart'

// ─── BLS Key Metrics ──────────────────────────────────────────────────────────
const blsMetrics = [
  { label: 'Unemployment Rate', value: '4.2%',   change: '−0.1%',     trend: 'down', note: 'Fell as participation dropped to 61.5% (lowest since Mar 2021)' },
  { label: 'Job Openings',      value: '7.6M',   change: 'unchanged', trend: 'flat', note: 'May JOLTS · steady at ~2-year high' },
  { label: 'Avg. Hourly Wage',  value: '$37.64', change: '+0.3%',     trend: 'up',   note: '+3.5% YoY · 13¢ gain' },
  { label: 'Layoffs Rate',      value: '1.1%',   change: 'unchanged', trend: 'flat', note: 'May JOLTS · 1.7M, still historically low' },
  { label: 'Quits Rate',        value: '1.9%',   change: 'unchanged', trend: 'flat', note: 'May JOLTS · 3.1M · third month stuck at 1.9%' },
  { label: 'Jobs Added (BLS)',  value: '+57K',   change: 'below trend', trend: 'flat', note: 'Apr revised to +148K, May to +129K (−74K combined)' },
]

const historical = [
  { month: 'Feb 2026', unemployment: '4.4%', openings: '6.9M', wages: '$37.29', quits: '1.9%' },
  { month: 'Mar 2026', unemployment: '4.3%', openings: '6.9M', wages: '$37.38', quits: '2.0%' },
  { month: 'Apr 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.45', quits: '1.9%' },
  { month: 'May 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.51', quits: '1.9%' },
  { month: 'Jun 2026', unemployment: '4.2%', openings: '7.6M', wages: '$37.64', quits: '1.9%', current: true },
]

// ─── ADP ──────────────────────────────────────────────────────────────────────
const adpMetrics = [
  { label: 'Private Jobs Added', value: '98K', note: 'June 2026 · below +110K consensus, down from May +122K' },
  { label: 'Job-Stayer Pay Growth', value: '4.4%', note: 'YoY · unchanged for third straight month' },
  { label: 'Job-Changer Pay Growth', value: '6.6%', note: 'YoY · edged up from 6.5% but premium still narrow' },
  { label: 'Annual Pay (All)',    value: '4.4%',  note: 'YoY overall pay growth, June 2026' },
]

// Services carried the entire June print — 96K of 98K came from service-providing sectors,
// with Education/Health alone doing nearly half. Goods-producing was flat.
const adpSectors = [
  { sector: 'Education & Health', jobs: '+48K', direction: 'up' },
  { sector: 'Trade, Transport & Utilities', jobs: '+15K', direction: 'up' },
  { sector: 'Financial Activities', jobs: '+14K', direction: 'up' },
  { sector: 'Other Services', jobs: '+8K', direction: 'up' },
  { sector: 'Information', jobs: '+7K', direction: 'up' },
  { sector: 'Natural Resources & Mining', jobs: '−5K', direction: 'down' },
]

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
const revelioMetrics = [
  { label: 'RPLS Jobs Gained (June)', value: '+258.8K', note: 'Derived from 100M+ U.S. LinkedIn-style profiles' },
  { label: 'New Posting Salaries',    value: '+3.0%',   note: 'MoM rebound · led by Leisure/Hospitality + Prof Services' },
  { label: 'Hiring Rate',             value: '+0.4pp',  note: 'Ticked up modestly, continuing the 2026 stable trend' },
  { label: 'Attrition Rate',          value: '−0.8pp',  note: 'Sharp drop · biggest declines in Info + Manufacturing' },
]

const revelioSectors = [
  { sector: 'Public Administration', trend: 'Growing', direction: 'up' },
  { sector: 'Health Care & Social Assistance', trend: 'Growing', direction: 'up' },
  { sector: 'Professional & Business Services', trend: 'Growing (strongest YoY)', direction: 'up' },
  { sector: 'Manufacturing', trend: 'Growing YoY', direction: 'up' },
  { sector: 'Retail Trade', trend: 'Declining (double-digit YoY)', direction: 'down' },
  { sector: 'Transportation & Warehousing', trend: 'Declining (−24% YoY)', direction: 'down' },
]

// ─── Latest Release ───────────────────────────────────────────────────────────
// Hero callout for the most recent data drop — surfaces fresh numbers above
// the fold. Refresh every release cycle.
const latestRelease = {
  source: 'BLS Employment Situation',
  period: 'June 2026',
  releasedOn: 'Thu Jul 2, 2026',
  headline: 'Payrolls slow to +57K and April/May revised down a combined 74K; unemployment falls to 4.2% as participation drops to a 5-year low',
  stats: [
    { label: 'Nonfarm Payrolls', value: '+57K',   detail: 'well below +115K consensus' },
    { label: 'Unemployment',     value: '4.2%',   detail: '−0.1pp · for the wrong reason' },
    { label: 'Avg. Hourly Wage', value: '$37.64', detail: '+0.3% MoM · +3.5% YoY' },
    { label: 'Participation',    value: '61.5%',  detail: '−0.3pp · lowest since Mar 2021' },
  ],
  takeaway: 'The May story reversed. April was revised down from +179K to +148K and May from +172K to +129K — 74K weaker than first reported — and June added only +57K, less than half the +115K consensus. The drop in unemployment to 4.2% wasn’t strength: participation cratered 0.3pp to 61.5%, the lowest since March 2021, meaning workers left the labor force rather than found jobs. May JOLTS confirmed the freeze — openings, hires, quits, and layoffs all unchanged, quits stuck at 1.9% for a third month. The “low-hire, low-fire” market is still in place; the difference now is that the payroll ceiling is being written down.',
}

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
const upcomingReleases = [
  { date: 'Tue Jul 29', source: 'BLS JOLTS',       what: 'June 2026 job openings, hires, quits' },
  { date: 'Wed Aug 5',  source: 'ADP NER',         what: 'July 2026 private payrolls + pay growth' },
  { date: 'Fri Aug 7',  source: 'BLS Employment',  what: 'July 2026 nonfarm payrolls + unemployment' },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
const implications = [
  {
    headline: 'The strength was the mirage — 74K of prior jobs have quietly evaporated',
    body: 'Last cycle’s revision surprise pushed April up +64K to +179K and made the market look firm. This cycle: April was revised back down to +148K and May from +172K to +129K — a combined 74K weaker than first reported — and June added only +57K, less than half the +115K consensus. ADP corroborated the softness (+98K, down from +122K in May), and June was the third straight month of shrinking payroll totals. The “April cooling” that got waved off in June is now the trend. HR leaders who unfroze headcount plans on the summer revisions have three weaker months of hard data to explain.',
  },
  {
    headline: 'Unemployment fell for the wrong reason — participation cratered to a 5-year low',
    body: 'The U-3 dropped to 4.2% from 4.3%, but not because workers found jobs. Participation fell 0.3pp to 61.5% — the lowest since March 2021 — as roughly half a million people effectively left the labor force. When people stop looking, the numerator falls and the denominator falls faster. The U-6 also eased (8.2% → 8.1% → 7.9% over three months), which nudged The Wrap Underemployment Index down from 71.4 to 68.9 for May, but the underlying signal is discouragement, not tightening. The market didn’t get better; some of its workers gave up.',
  },
  {
    headline: 'The low-hire, low-fire freeze locked in for a third straight month',
    body: 'May JOLTS delivered no motion in any direction — openings, hires, quits, and layoffs all unchanged. Openings held at 7.6M (still near a two-year high), quits stuck at 1.9% for a third consecutive month (5th percentile of the last decade), layoffs steady at 1.1%. Employers are advertising jobs they aren’t filling, workers who want to leave are staying, and companies aren’t cutting. That is the entire market in one sentence — and it’s now the durable regime, not a one-month artifact. Retention costs stay flat; the backlog of would-be switchers keeps building.',
  },
  {
    headline: 'Two-speed sector split hardens — services carrying, goods-producing stalling',
    body: 'ADP counted 96K of its 98K gain in service-providing sectors, with Education/Health (+48K) doing nearly half the work. Goods-producing added a rounding-error 2K on ADP and BLS reported Leisure/Hospitality shed 61K jobs in June — the biggest sector loss on the report. Revelio’s picture is broadly consistent: Public Admin, Healthcare, and Professional Services growing; Transportation/Warehousing (−24% YoY) and Retail declining. If your headcount plan is in an ADP-strong sector you can still hire; if it’s in leisure, retail, or goods-producing, you are now competing with a shrinking wage floor.',
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
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Data · Updated July 6, 2026</div>
        <h1 className="font-serif text-4xl font-bold mb-3">U.S. Labor Market</h1>
        <p className="text-brand-dark/60 text-lg">BLS, ADP, and Revelio Labs — what the numbers mean for HR leaders.</p>
      </div>

      {/* In-page nav — jump straight to a data source. Small, eyebrow-weight, doesn't compete with H1. */}
      <nav aria-label="Jump to section" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs uppercase tracking-widest font-medium text-brand-dark/50 mb-10">
        {[
          { href: '#bls',          label: 'BLS' },
          { href: '#adp',          label: 'ADP' },
          { href: '#revelio',      label: 'Revelio' },
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
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Official · June 2026</span>
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

      {/* ── ADP ─────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="adp">
        <h2 className="font-serif text-2xl font-bold">ADP Research</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Private Sector · June 2026</span>
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
        title="Sector Breakdown — June 2026"
        data={adpSectors.map(s => ({
          sector: s.sector,
          value: parseInt(s.jobs.replace(/[+K]/g, '').replace(/−/g, '-'), 10),
          label: s.jobs,
        }))}
      />
      <div className="px-1 pt-2 pb-12">
        <a href="https://adpemploymentreport.com" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full report at adpemploymentreport.com →</a>
      </div>

      {/* ── Revelio Labs ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="revelio">
        <h2 className="font-serif text-2xl font-bold">Revelio Labs — RPLS</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">100M+ Profiles · June 2026</span>
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
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">Sector Employment Trends — June 2026</div>
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
      <p className="text-xs text-brand-dark/30 mt-4">Sources: U.S. Bureau of Labor Statistics · ADP National Employment Report · Revelio Public Labor Statistics (RPLS). Updated July 6, 2026.</p>
    </div>
  )
}
