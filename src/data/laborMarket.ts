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
//
// NOTE ON JOLTS LAG: JOLTS trails the Employment Situation by one reference
// month, so during any given cycle the openings/quits/layoffs figures describe
// the month *before* the headline payroll month. Label them explicitly
// ("June JOLTS") rather than letting them read as current.

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
export const LAST_UPDATED = 'August 17, 2026'

// ─── Bureau of Labor Statistics ───────────────────────────────────────────────
// Employment Situation for July 2026, released Fri Aug 7. Openings/quits/layoffs
// are June JOLTS (released Tue Aug 4) — July JOLTS lands Sep 1.
export const bls = {
  period: 'July 2026',
  metrics: [
    { label: 'Unemployment Rate', value: '4.1%',   change: '−0.1%',     trend: 'flat', note: 'Fell again on a shrinking labor force · participation 61.4%' },
    { label: 'Job Openings',      value: '7.4M',   change: '−178K',     trend: 'down', note: 'June JOLTS · second straight monthly decline' },
    { label: 'Avg. Hourly Wage',  value: '$37.62', change: '+2¢',       trend: 'up',   note: '+3.2% YoY · slowest wage growth since May 2021' },
    { label: 'Layoffs Rate',      value: '1.1%',   change: 'unchanged', trend: 'flat', note: 'June JOLTS · 1.8M · still historically low' },
    { label: 'Quits Rate',        value: '2.0%',   change: 'unchanged', trend: 'flat', note: 'June JOLTS · 3.2M · workers still not moving' },
    { label: 'Jobs Added (BLS)',  value: '−23K',   change: 'negative',  trend: 'flat', note: 'May revised to +63K, June to +20K (−103K combined)' },
  ] satisfies MetricCard[],
  historical: [
    { month: 'Mar 2026', unemployment: '4.3%', openings: '6.9M', wages: '$37.38', quits: '2.0%' },
    { month: 'Apr 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.45', quits: '1.9%' },
    { month: 'May 2026', unemployment: '4.3%', openings: '7.5M', wages: '$37.51', quits: '1.9%' },
    { month: 'Jun 2026', unemployment: '4.2%', openings: '7.4M', wages: '$37.60', quits: '2.0%' },
    { month: 'Jul 2026', unemployment: '4.1%', openings: '7.4M', wages: '$37.62', quits: '2.0%', current: true },
  ] satisfies HistoricalRow[],
  historicalNote:
    'Unemployment and wages are the Employment Situation reference month. Job openings and quits come from JOLTS, which trails by one month — the July row carries June JOLTS, the latest published. July JOLTS releases Sep 1.',
}

// ─── ADP ──────────────────────────────────────────────────────────────────────
// National Employment Report for July 2026, released Wed Aug 5.
export const adp = {
  period: 'July 2026',
  reportUrl: 'https://adpemploymentreport.com',
  metrics: [
    { label: 'Private Jobs Added',     value: '44K',  note: 'July 2026 · weakest in six months, below +70K consensus' },
    { label: 'Job-Stayer Pay Growth',  value: '4.4%', note: 'YoY · flat for a fourth straight month' },
    { label: 'Job-Changer Pay Growth', value: '7.0%', note: 'YoY · fastest since Aug 2025 — premium widening' },
    { label: 'Annual Pay (All)',       value: '4.4%', note: 'YoY overall pay growth, July 2026' },
  ] satisfies MetricCard[],
  // Single source of truth for the pay-growth chart — keep in lockstep with the
  // two pay-growth cards above.
  payGrowth: {
    stayer: 4.4,
    changer: 7.0,
    caption: 'Switching premium widens to 2.6pp — the strongest case for moving since 2025.',
  },
  // Goods-producing went negative (−3K) and even services only managed +47K.
  // Education/Health is doing almost all the work again; Leisure/Hospitality and
  // Trade/Transport both shed jobs.
  sectors: [
    { sector: 'Education & Health',           value: 36,  label: '+36K' },
    { sector: 'Financial Activities',         value: 10,  label: '+10K' },
    { sector: 'Professional & Business Svcs', value: 9,   label: '+9K' },
    { sector: 'Other Services',               value: 6,   label: '+6K' },
    { sector: 'Information',                  value: 5,   label: '+5K' },
    { sector: 'Natural Resources & Mining',   value: -6,  label: '−6K' },
    { sector: 'Trade, Transport & Utilities', value: -8,  label: '−8K' },
    { sector: 'Leisure & Hospitality',        value: -11, label: '−11K' },
  ] satisfies BarDatum[],
}

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
// RPLS for July 2026.
export const revelio = {
  period: 'July 2026',
  reportUrl: 'https://www.reveliolabs.com/public-labor-statistics/',
  metrics: [
    { label: 'RPLS Jobs Gained (July)', value: '+79.2K', note: 'Down hard from +258.8K in June' },
    { label: 'New Posting Salaries',    value: '+2.0%',  note: 'MoM · led by Prof Services, Public Admin, Leisure/Hospitality' },
    { label: 'Hiring Rate',             value: '20.6%',  note: 'Down from 21.0% in June — hiring still cooling' },
    { label: 'Attrition Rate',          value: '20.0%',  note: 'Flat MoM · workers staying put' },
  ] satisfies MetricCard[],
  sectors: [
    { sector: 'Health Care & Social Assistance',  trend: 'Growing (largest gain)',   direction: 'up' },
    { sector: 'Manufacturing',                    trend: 'Growing',                  direction: 'up' },
    { sector: 'Professional & Business Services', trend: 'Postings up most',         direction: 'up' },
    { sector: 'Leisure & Hospitality',            trend: 'Declining (biggest drop)', direction: 'down' },
    { sector: 'Retail Trade',                     trend: 'Declining',                direction: 'down' },
  ] satisfies SectorTrend[],
}

// ─── Aspen Tech Labs — JobMarketPulse ─────────────────────────────────────────
// Demand-side lens: job-posting counts scraped daily from 300k+ employer career
// sites (225k+ U.S.). Quarterly, so it refreshes on its own cadence — `note`
// flags when the next report is due so a lagging quarter doesn't read as stale.
export const aspen = {
  period: 'Q2 2026',
  note: 'Latest available — Q3 report publishes in October',
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
  period: 'July 2026',
  releasedOn: 'Fri Aug 7, 2026',
  headline: 'Payrolls turn negative at −23K as May and June are revised down a combined 103K; unemployment slips to 4.1% and wage growth cools to a five-year low',
  stats: [
    { label: 'Nonfarm Payrolls', value: '−23K',   detail: 'vs. +80K consensus' },
    { label: 'Prior Revisions',  value: '−103K',  detail: 'May cut to +63K · June to +20K' },
    { label: 'Unemployment',     value: '4.1%',   detail: '−0.1pp · participation 61.4%' },
    { label: 'Avg. Hourly Wage', value: '$37.62', detail: '+2¢ MoM · +3.2% YoY' },
  ],
  takeaway: 'Payrolls went negative for the first time this cycle — but the headline −23K is the smaller story. The revisions are the bigger one: May was cut from +129K to +63K and June from +57K to just +20K, erasing 103K of jobs the market thought it had. Read together, the last three months delivered +63K, +20K, and −23K. The split matters too: private employers still added 30K while government shed 53K, so this is not yet a broad private-sector contraction. Unemployment ticking down to 4.1% again reflects a shrinking labor force rather than hiring — participation is down 0.7pp since January. And wage growth cooled to 3.2% YoY, the slowest since May 2021. June JOLTS, out three days earlier, showed openings down 178K to 7.4M with quits and layoffs both unchanged: the low-hire, low-fire freeze is intact, but the ceiling on it keeps coming down.',
}

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
export const upcomingReleases = [
  { date: 'Tue Sep 1', source: 'BLS JOLTS',      what: 'July 2026 job openings, hires, quits' },
  { date: 'Wed Sep 2', source: 'ADP NER',        what: 'August 2026 private payrolls + pay growth' },
  { date: 'Fri Sep 4', source: 'BLS Employment', what: 'August 2026 nonfarm payrolls + unemployment' },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
export const implications: Implication[] = [
  {
    tldr: 'Payrolls went negative — and 103K more jobs were revised away',
    headline: 'Payrolls turned negative, and another 103K prior jobs were revised away',
    body: 'July shed 23K jobs against a consensus of roughly +80K. But the revisions did more damage than the headline: May was cut from +129K to +63K and June from +57K to +20K — 103K of jobs that were on the books last month are gone. The three-month run now reads +63K, +20K, −23K. This is the second consecutive cycle where large downward revisions rewrote a story HR leaders had already planned around; last month it was 74K, this month 103K. The practical lesson is to stop treating the first print as the number. If your headcount model keys off monthly payroll prints, build in a revision haircut — the initial estimate has been consistently too optimistic all year.',
  },
  {
    tldr: 'Government cut 53K while private employers still added 30K',
    headline: 'The negative print is a public-sector story — private payrolls still grew',
    body: 'The −23K headline nets two very different things: private employers added 30K while government shed 53K, concentrated in local government education. That distinction matters for how you read your own market. This is not yet a broad private-sector contraction — it is a public-payroll cut large enough to flip the national number negative. ADP tells the same story from the private side: +44K, weak but positive. If you are hiring in private-sector services you are in a slow market, not a shrinking one. If you are in or adjacent to public education, state and local budgets, or government contracting, the contraction is real and it is where the losses actually landed.',
  },
  {
    tldr: 'Wage growth hit a five-year low — but switchers are getting paid more',
    headline: 'Wage growth cooled to a five-year low while the switching premium widened',
    body: 'Average hourly earnings rose just 3.2% YoY, the slowest since May 2021, and June was revised down to 3.4%. On its own that reads like broad wage deflation. It isn’t. ADP has job-changer pay growth accelerating to 7.0% — the fastest since August 2025 — against job-stayers flat at 4.4%. The switching premium widened to 2.6pp, reversing the narrowing trend we flagged last cycle, when the gap was the tightest since 2020. Both things are true: the average worker’s raise is shrinking, and the worker who moves is getting paid more than at any point in a year. That is a retention risk hiding inside a soft wage print. If your comp planning is anchored to the 3.2% headline, you are budgeting for the people who stay and underpricing the ones most likely to leave.',
  },
  {
    tldr: 'Openings fell 178K — the freeze is intact but the ceiling is dropping',
    headline: 'Low-hire, low-fire holds, but the openings ceiling keeps coming down',
    body: 'June JOLTS showed openings down 178K to 7.4M — a second straight monthly decline — while hires (5.3M), quits (3.2M, 2.0%), and layoffs (1.8M, 1.1%) were all unchanged. That is the freeze in its purest form: nothing is moving in either direction, and the pool of advertised work is quietly draining. Revelio’s independent read agrees, with the hiring rate slipping from 21.0% to 20.6% and attrition flat at 20.0%. Layoffs staying at 1.1% is the genuinely reassuring number here — employers are still holding onto people rather than cutting. But the combination of falling openings and flat quits means the backlog of workers who want to move and can’t keeps building, and it releases the moment conditions turn.',
  },
  {
    tldr: 'Health care is carrying the market; leisure and retail are shedding',
    headline: 'The two-speed split narrows to one lane — health care is carrying the market',
    body: 'The sector story got more concentrated. BLS had health care up 22K and manufacturing up 5K, against retail down 19.4K, financial activities down 14K, and government down 53K. ADP matched it: Education/Health +36K out of a total +47K in services, with Leisure/Hospitality (−11K) and Trade/Transport/Utilities (−8K) both negative and goods-producing at −3K overall. Revelio independently puts Health Care and Manufacturing as the only meaningful gainers, with Leisure/Hospitality and Retail Trade shedding. Three datasets built on three different methodologies are pointing at the same place. If you are recruiting in health care you are competing in the one genuinely tight lane left; everywhere else, candidate supply has loosened and your time-to-fill should be improving — if it isn’t, the problem is your process, not the market.',
  },
  {
    tldr: 'Postings held up while payrolls fell — demand isn’t converting',
    headline: 'Postings and payrolls keep pulling apart — the demand is on the board, it just isn’t closing',
    body: 'Aspen’s JobMarketPulse — demand-side counts scraped from 300k+ employer career sites — had U.S. postings at 6.45M in Q2, up 3.7% YoY, with every month of the quarter above 6.4M. Payrolls over that same stretch went +63K, +20K, and then negative. Revelio adds a July data point on the same side of the ledger: active postings edged up 0.3% MoM even as its jobs count fell to +79.2K. Employers are still advertising — Engineering postings are up 20.7% YoY and IT 15.1% — but the reqs are not converting into hires. That gap is the whole market right now. Do not read the negative payroll print as demand drying up; read it as a conversion problem, which is the one part of this you actually control. Time-to-fill, interview loop length, and approval friction are worth more attention this quarter than pipeline volume. Salary transparency is also at 53.6% of postings (+5.0pp YoY), so whatever you are offering is increasingly visible to the candidates you are trying to close.',
  },
]
