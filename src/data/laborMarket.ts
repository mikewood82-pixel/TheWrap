// ─── Labor Market page data ───────────────────────────────────────────────────
// Every hand-curated number on /labor-market lives here. The page itself is
// presentation only — it reads `period` off each source block rather than
// repeating month strings in badges and chart titles, so a refresh is a single
// edit in this file.
//
// REFRESH CHECKLIST (monthly, after the BLS Employment Situation drops):
//   1. LAST_UPDATED
//   2. bls / adp / revelio / aspen — bump `period` + the metrics beneath it
//   3. bls.historical — roll the window forward, correct any revised months
//   4. latestRelease + upcomingReleases
//   5. implications — rewrite the narrative to the new story
//
// The Wrap Underemployment Index is NOT here: it renders live from
// /api/bls/wui. Never hardcode a WUI reading in prose below — it will
// contradict the live number rendered further up the same page.

export type MetricCard = {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'flat'
  note: string
}

export type HistoricalRow = {
  month: string
  unemployment: string
  openings: string
  wages: string
  quits: string
  current?: boolean
}

export type SectorTrend = {
  sector: string
  trend: string
  direction: 'up' | 'down' | 'flat'
}

export type BarDatum = {
  sector: string
  value: number
  label: string
}

export type Implication = {
  tldr: string
  headline: string
  body: string
}

/** Stamped in the page header and the source footer. */
export const LAST_UPDATED = 'July 6, 2026'

// ─── Bureau of Labor Statistics ───────────────────────────────────────────────
export const bls = {
  period: 'June 2026',
  metrics: [
    { label: 'Unemployment Rate', value: '4.2%',   change: '−0.1%',      trend: 'down', note: 'Fell as participation dropped to 61.5% (lowest since Mar 2021)' },
    { label: 'Job Openings',      value: '7.6M',   change: 'unchanged',  trend: 'flat', note: 'May JOLTS · steady at ~2-year high' },
    { label: 'Avg. Hourly Wage',  value: '$37.64', change: '+0.3%',      trend: 'up',   note: '+3.5% YoY · 13¢ gain' },
    { label: 'Layoffs Rate',      value: '1.1%',   change: 'unchanged',  trend: 'flat', note: 'May JOLTS · 1.7M, still historically low' },
    { label: 'Quits Rate',        value: '1.9%',   change: 'unchanged',  trend: 'flat', note: 'May JOLTS · 3.1M · third month stuck at 1.9%' },
    { label: 'Jobs Added (BLS)',  value: '+57K',   change: 'below trend', trend: 'flat', note: 'Apr revised to +148K, May to +129K (−74K combined)' },
  ] satisfies MetricCard[],
  historical: [
    { month: 'Feb 2026', unemployment: '4.4%', openings: '6.9M', wages: '$37.29', quits: '1.9%' },
    { month: 'Mar 2026', unemployment: '4.3%', openings: '6.9M', wages: '$37.38', quits: '2.0%' },
    { month: 'Apr 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.45', quits: '1.9%' },
    { month: 'May 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.51', quits: '1.9%' },
    { month: 'Jun 2026', unemployment: '4.2%', openings: '7.6M', wages: '$37.64', quits: '1.9%', current: true },
  ] satisfies HistoricalRow[],
}

// ─── ADP ──────────────────────────────────────────────────────────────────────
export const adp = {
  period: 'June 2026',
  reportUrl: 'https://adpemploymentreport.com',
  metrics: [
    { label: 'Private Jobs Added',      value: '98K',  note: 'June 2026 · below +110K consensus, down from May +122K' },
    { label: 'Job-Stayer Pay Growth',   value: '4.4%', note: 'YoY · unchanged for third straight month' },
    { label: 'Job-Changer Pay Growth',  value: '6.6%', note: 'YoY · edged up from 6.5% but premium still narrow' },
    { label: 'Annual Pay (All)',        value: '4.4%', note: 'YoY overall pay growth, June 2026' },
  ] satisfies MetricCard[],
  // Single source of truth for the pay-growth chart — keep in lockstep with the
  // two pay-growth cards above.
  payGrowth: {
    stayer: 4.4,
    changer: 6.6,
    caption: 'Narrowest premium since 2020 — weaker case for switching jobs.',
  },
  // Services carried the entire June print — 96K of 98K came from service-providing
  // sectors, with Education/Health alone doing nearly half. Goods-producing was flat.
  sectors: [
    { sector: 'Education & Health',            value: 48,  label: '+48K' },
    { sector: 'Trade, Transport & Utilities',  value: 15,  label: '+15K' },
    { sector: 'Financial Activities',          value: 14,  label: '+14K' },
    { sector: 'Other Services',                value: 8,   label: '+8K' },
    { sector: 'Information',                   value: 7,   label: '+7K' },
    { sector: 'Natural Resources & Mining',    value: -5,  label: '−5K' },
  ] satisfies BarDatum[],
}

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
export const revelio = {
  period: 'June 2026',
  reportUrl: 'https://www.reveliolabs.com/public-labor-statistics/',
  metrics: [
    { label: 'RPLS Jobs Gained (June)', value: '+258.8K', note: 'Derived from 100M+ U.S. LinkedIn-style profiles' },
    { label: 'New Posting Salaries',    value: '+3.0%',   note: 'MoM rebound · led by Leisure/Hospitality + Prof Services' },
    { label: 'Hiring Rate',             value: '+0.4pp',  note: 'Ticked up modestly, continuing the 2026 stable trend' },
    { label: 'Attrition Rate',          value: '−0.8pp',  note: 'Sharp drop · biggest declines in Info + Manufacturing' },
  ] satisfies MetricCard[],
  sectors: [
    { sector: 'Public Administration',             trend: 'Growing',                 direction: 'up' },
    { sector: 'Health Care & Social Assistance',   trend: 'Growing',                 direction: 'up' },
    { sector: 'Professional & Business Services',  trend: 'Growing (strongest YoY)', direction: 'up' },
    { sector: 'Manufacturing',                     trend: 'Growing YoY',             direction: 'up' },
    { sector: 'Retail Trade',                      trend: 'Declining (double-digit YoY)', direction: 'down' },
    { sector: 'Transportation & Warehousing',      trend: 'Declining (−24% YoY)',    direction: 'down' },
  ] satisfies SectorTrend[],
}

// ─── Aspen Tech Labs — JobMarketPulse ─────────────────────────────────────────
// Demand-side lens: job-posting counts scraped daily from 300k+ employer career
// sites (225k+ U.S.). Quarterly, so it refreshes on its own cadence — `note`
// flags when the next report is due so a lagging quarter doesn't read as stale.
export const aspen = {
  period: 'Q2 2026',
  note: '',
  reportUrl: 'https://aspentechlabs.com/jobmarketpulse-reports/2026/jobmarketpulse-report-q2-2026',
  metrics: [
    { label: 'U.S. Job Postings',       value: '6.45M',   note: '+3.7% YoY · every month of Q2 held above 6.4M' },
    { label: 'Median Full-Time Salary', value: '$62,234', note: '+6.1% YoY · +$3,578' },
    { label: 'Salary Transparency',     value: '53.6%',   note: '+5.0pp YoY · disclosure still climbing' },
    { label: 'White-Collar Demand',     value: '+6.3%',   note: 'YoY · led by IT, Business Svcs, Engineering' },
    { label: 'Blue-Collar Demand',      value: '+2.7%',   note: 'YoY · Warehouse, Transport, Production' },
    { label: 'Healthcare Demand',       value: '+2.8%',   note: 'YoY · broader healthcare outpacing clinical nursing' },
  ] satisfies MetricCard[],
  // Category growth — YoY % change. `value` drives the bar, `label` is displayed.
  categoryGrowth: [
    { sector: 'Engineering',            value: 20.7, label: '+20.7%' },
    { sector: 'Information Technology', value: 15.1, label: '+15.1%' },
    { sector: 'Warehouse',              value: 13.6, label: '+13.6%' },
    { sector: 'Production',             value: 11.4, label: '+11.4%' },
    { sector: 'Business Services',      value: 10.4, label: '+10.4%' },
    { sector: 'Transportation',         value: 8.9,  label: '+8.9%' },
    { sector: 'Restaurants',            value: -2.3, label: '−2.3%' },
    { sector: 'Education',              value: -3.0, label: '−3.0%' },
  ] satisfies BarDatum[],
  topCategories: [
    { category: 'Restaurants',            postings: '782,468', yoy: '−2.3%',  direction: 'down' },
    { category: 'Retail',                 postings: '724,553', yoy: '+1.2%',  direction: 'up' },
    { category: 'Healthcare',             postings: '586,779', yoy: '+3.1%',  direction: 'up' },
    { category: 'Nursing',                postings: '517,722', yoy: '+1.1%',  direction: 'up' },
    { category: 'Education',              postings: '356,632', yoy: '−3.0%',  direction: 'down' },
    { category: 'Business Services',      postings: '283,306', yoy: '+10.4%', direction: 'up' },
    { category: 'Sales',                  postings: '248,585', yoy: '−2.7%',  direction: 'down' },
    { category: 'Maintenance',            postings: '223,931', yoy: '+5.5%',  direction: 'up' },
    { category: 'Transportation',         postings: '212,259', yoy: '+8.9%',  direction: 'up' },
    { category: 'Information Technology', postings: '188,711', yoy: '+15.1%', direction: 'up' },
  ] as { category: string; postings: string; yoy: string; direction: 'up' | 'down' | 'flat' }[],
}

// ─── Latest Release ───────────────────────────────────────────────────────────
// Hero callout for the most recent data drop — surfaces fresh numbers above
// the fold. Refresh every release cycle.
export const latestRelease = {
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
export const upcomingReleases = [
  { date: 'Tue Jul 29', source: 'BLS JOLTS',      what: 'June 2026 job openings, hires, quits' },
  { date: 'Wed Aug 5',  source: 'ADP NER',        what: 'July 2026 private payrolls + pay growth' },
  { date: 'Fri Aug 7',  source: 'BLS Employment', what: 'July 2026 nonfarm payrolls + unemployment' },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
export const implications: Implication[] = [
  {
    tldr: '74K of prior job gains quietly revised away',
    headline: 'The strength was the mirage — 74K of prior jobs have quietly evaporated',
    body: 'Last cycle’s revision surprise pushed April up +64K to +179K and made the market look firm. This cycle: April was revised back down to +148K and May from +172K to +129K — a combined 74K weaker than first reported — and June added only +57K, less than half the +115K consensus. ADP corroborated the softness (+98K, down from +122K in May), and June was the third straight month of shrinking payroll totals. The “April cooling” that got waved off in June is now the trend. HR leaders who unfroze headcount plans on the summer revisions have three weaker months of hard data to explain.',
  },
  {
    tldr: 'Jobless rate fell only because workers quit looking',
    headline: 'Unemployment fell for the wrong reason — participation cratered to a 5-year low',
    body: 'The U-3 dropped to 4.2% from 4.3%, but not because workers found jobs. Participation fell 0.3pp to 61.5% — the lowest since March 2021 — as roughly half a million people effectively left the labor force. When people stop looking, the numerator falls and the denominator falls faster. The U-6 also eased (8.2% → 8.1% → 7.9% over three months), which nudged The Wrap Underemployment Index down from 71.4 to 68.9 for May, but the underlying signal is discouragement, not tightening. The market didn’t get better; some of its workers gave up.',
  },
  {
    tldr: 'Low-hire, low-fire freeze locks in for a third month',
    headline: 'The low-hire, low-fire freeze locked in for a third straight month',
    body: 'May JOLTS delivered no motion in any direction — openings, hires, quits, and layoffs all unchanged. Openings held at 7.6M (still near a two-year high), quits stuck at 1.9% for a third consecutive month (5th percentile of the last decade), layoffs steady at 1.1%. Employers are advertising jobs they aren’t filling, workers who want to leave are staying, and companies aren’t cutting. That is the entire market in one sentence — and it’s now the durable regime, not a one-month artifact. Retention costs stay flat; the backlog of would-be switchers keeps building.',
  },
  {
    tldr: 'Services still hiring; goods-producing and leisure stalling',
    headline: 'Two-speed sector split hardens — services carrying, goods-producing stalling',
    body: 'ADP counted 96K of its 98K gain in service-providing sectors, with Education/Health (+48K) doing nearly half the work. Goods-producing added a rounding-error 2K on ADP and BLS reported Leisure/Hospitality shed 61K jobs in June — the biggest sector loss on the report. Revelio’s picture is broadly consistent: Public Admin, Healthcare, and Professional Services growing; Transportation/Warehousing (−24% YoY) and Retail declining. If your headcount plan is in an ADP-strong sector you can still hire; if it’s in leisure, retail, or goods-producing, you are now competing with a shrinking wage floor.',
  },
  {
    tldr: 'Job postings up 3.7% even as hiring slows',
    headline: 'Hiring intent is recovering even as payrolls stall — postings up 3.7% while jobs added shrank to +57K',
    body: 'The payroll and posting sides of the market are pulling apart. Aspen’s JobMarketPulse — demand-side counts scraped from 300k+ employer career sites — has U.S. postings at 6.45M for Q2, up 3.7% YoY, with every month of the quarter above 6.4M and ahead of its 2025 counterpart. Yet BLS payrolls added just +57K in June and ADP +98K. Employers are advertising more, especially in tech: Engineering postings jumped +20.7% YoY and IT +15.1%, with white-collar demand up +6.3% overall. This is the low-hire, low-fire freeze seen from the intent side — the reqs are real and rising, but the constraint is conversion (time-to-fill, candidate competition, budget sign-off), not a shortage of openings. For HR leaders, don’t read the payroll slowdown as demand drying up; the demand is on the board, it just isn’t closing. Salary transparency also crossed 53.6% of postings (+5.0pp YoY), so that widening req volume is increasingly public.',
  },
]
