import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import BLSTrendChart from '../components/BLSTrendChart'
import SectorBarChart from '../components/SectorBarChart'
import PayGrowthComparison from '../components/PayGrowthComparison'
import WUITrendChart from '../components/WUITrendChart'
import {
  LAST_UPDATED,
  bls,
  adp,
  revelio,
  aspen,
  latestRelease,
  upcomingReleases,
  implications,
} from '../data/laborMarket'

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
          readers understand what the reading actually represents before they see it. */}
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
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Data · Updated {LAST_UPDATED}</div>
        <h1 className="font-serif text-4xl font-bold mb-3">U.S. Labor Market</h1>
        <p className="text-brand-dark/60 text-lg">BLS, ADP, Revelio Labs, and Aspen Tech Labs — what the numbers mean for HR leaders.</p>
      </div>

      {/* In-page nav — jump straight to a data source. Small, eyebrow-weight, doesn't compete with H1. */}
      <nav aria-label="Jump to section" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs uppercase tracking-widest font-medium text-brand-dark/50 mb-10">
        {[
          { href: '#bls',          label: 'BLS' },
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

      {/* HR takeaways — condensed to the top so readers get the verdict before scrolling.
          Bullets derive from implications[].tldr; full detail lives at #implications. */}
      <a href="#implications" className="block group mb-12">
        <div className="bg-brand-cream rounded-xl p-6 border-l-4 border-brand-terracotta transition-shadow group-hover:shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-brand-terracotta text-xs uppercase tracking-widest font-bold">
              What this means for HR
            </div>
            <span className="text-xs text-brand-dark/40 group-hover:text-brand-terracotta transition-colors whitespace-nowrap">
              Full breakdown ↓
            </span>
          </div>
          <ul className="space-y-2">
            {implications.map(imp => (
              <li key={imp.headline} className="flex gap-2.5 text-sm text-brand-dark/80 leading-snug">
                <span className="text-brand-terracotta font-bold shrink-0" aria-hidden="true">→</span>
                <span>{imp.tldr}</span>
              </li>
            ))}
          </ul>
        </div>
      </a>

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
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Official · {bls.period}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {bls.metrics.map((m) => (
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
      <BLSTrendChart data={bls.historical} />

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
            {bls.historical.map((row) => (
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
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Private Sector · {adp.period}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {adp.metrics.map(m => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-2xl font-bold mb-1">{m.value}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>

      {/* Pay Growth Comparison */}
      <PayGrowthComparison {...adp.payGrowth} />

      {/* ADP Sector Bar Chart */}
      <SectorBarChart title={`Sector Breakdown — ${adp.period}`} data={adp.sectors} />
      <div className="px-1 pt-2 pb-12">
        <a href={adp.reportUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full report at adpemploymentreport.com →</a>
      </div>

      {/* ── Revelio Labs ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="revelio">
        <h2 className="font-serif text-2xl font-bold">Revelio Labs — RPLS</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">100M+ Profiles · {revelio.period}</span>
      </div>
      <p className="text-sm text-brand-dark/50 mb-5 leading-relaxed">Revelio Public Labor Statistics (RPLS) is built from 100M+ U.S. workforce profiles — covering ~67% of employed Americans vs. ~27% for BLS establishment surveys. It captures workforce transitions that official surveys miss.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {revelio.metrics.map(m => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-2xl font-bold mb-1">{m.value}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-brand-cream rounded-xl overflow-hidden mb-12">
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">Sector Employment Trends — {revelio.period}</div>
        {revelio.sectors.map(s => (
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
          <a href={revelio.reportUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full RPLS data at reveliolabs.com →</a>
        </div>
      </div>

      {/* ── Aspen Tech Labs ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4 scroll-mt-6" id="aspen">
        <h2 className="font-serif text-2xl font-bold">Aspen Tech Labs — JobMarketPulse</h2>
        <span className="text-xs bg-brand-cream text-brand-dark/50 px-2.5 py-1 rounded-full">Job Postings · {aspen.period}</span>
        {aspen.note && <span className="text-xs text-brand-dark/40">{aspen.note}</span>}
      </div>
      <p className="text-sm text-brand-dark/50 mb-5 leading-relaxed">JobMarketPulse tracks the demand side of the market — unique job postings deduplicated daily from 300k+ employer career sites (225k+ in the U.S.), agency listings excluded. Where BLS, ADP, and Revelio measure jobs <em>filled</em>, this measures hiring <em>intent</em>: what employers are actively advertising.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        {aspen.metrics.map(m => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-2xl font-bold mb-1">{m.value}</div>
            <div className="text-xs text-brand-dark/40 leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>

      {/* Aspen category growth — YoY % change by category */}
      <div className="mb-5">
        <SectorBarChart title={`Vacancies by Category — YoY % Change, ${aspen.period}`} data={aspen.categoryGrowth} />
      </div>

      {/* Aspen top categories by volume */}
      <div className="bg-white border border-brand-cream rounded-xl overflow-hidden mb-3">
        <div className="px-5 py-3 bg-brand-cream/50 text-xs text-brand-dark/50 uppercase tracking-wide font-medium">Top Categories by Posting Volume — {aspen.period}</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-brand-dark/40 uppercase tracking-wide">
                <th className="text-left px-5 py-2.5 font-medium">Category</th>
                <th className="text-right px-5 py-2.5 font-medium">Postings</th>
                <th className="text-right px-5 py-2.5 font-medium">YoY</th>
              </tr>
            </thead>
            <tbody>
              {aspen.topCategories.map(c => (
                <tr key={c.category} className="border-t border-brand-cream">
                  <td className="px-5 py-2.5 text-brand-dark/70">{c.category}</td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-brand-dark/70">{c.postings}</td>
                  <td className={`px-5 py-2.5 text-right tabular-nums font-semibold ${
                    c.direction === 'up' ? 'text-green-600' :
                    c.direction === 'down' ? 'text-red-500' :
                    'text-brand-dark/40'
                  }`}>{c.yoy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-1 pt-1 pb-12">
        <a href={aspen.reportUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors">Full JobMarketPulse {aspen.period} report at aspentechlabs.com →</a>
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
      <p className="text-xs text-brand-dark/30 mt-4">Sources: U.S. Bureau of Labor Statistics · ADP National Employment Report · Revelio Public Labor Statistics (RPLS) · Aspen Tech Labs JobMarketPulse ({aspen.period}). Updated {LAST_UPDATED}.</p>
    </div>
  )
}
