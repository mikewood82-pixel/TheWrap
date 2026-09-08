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
// ("July JOLTS") rather than letting them read as current.

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
export const LAST_UPDATED = 'September 8, 2026'

// ─── Bureau of Labor Statistics ───────────────────────────────────────────────
// Employment Situation for August 2026, released Fri Sep 4. Openings/quits/layoffs
// are July JOLTS (released Tue Sep 1) — August JOLTS lands Sep 29.
export const bls = {
  period: 'August 2026',
  metrics: [
    { label: 'Unemployment Rate', value: '4.1%',   change: 'unchanged', trend: 'flat', note: 'Held at 4.1% · participation up 0.2pp to 61.6%' },
    { label: 'Job Openings',      value: '7.3M',   change: '+71K',      trend: 'flat', note: 'July JOLTS · June revised down to 7.2M' },
    { label: 'Avg. Hourly Wage',  value: '$37.75', change: '+10¢',      trend: 'up',   note: '+3.1% YoY · a new five-year low for wage growth' },
    { label: 'Layoffs Rate',      value: '1.0%',   change: '−0.1pp',    trend: 'down', note: 'July JOLTS · 1.67M · lowest level since January' },
    { label: 'Quits Rate',        value: '1.9%',   change: '−0.1pp',    trend: 'down', note: 'July JOLTS · 3.1M · workers still not moving' },
    { label: 'Jobs Added (BLS)',  value: '+162K',  change: 'rebound',   trend: 'up',   note: 'June revised to +31K, July to +21K (+55K combined)' },
  ] satisfies MetricCard[],
  historical: [
    { month: 'Apr 2026', unemployment: '4.3%', openings: '7.6M', wages: '$37.45', quits: '1.9%' },
    { month: 'May 2026', unemployment: '4.3%', openings: '7.5M', wages: '$37.51', quits: '1.9%' },
    { month: 'Jun 2026', unemployment: '4.2%', openings: '7.4M', wages: '$37.60', quits: '2.0%' },
    { month: 'Jul 2026', unemployment: '4.1%', openings: '7.2M', wages: '$37.65', quits: '2.0%' },
    { month: 'Aug 2026', unemployment: '4.1%', openings: '7.3M', wages: '$37.75', quits: '1.9%', current: true },
  ] satisfies HistoricalRow[],
  historicalNote:
    'Unemployment and wages are the Employment Situation reference month. Job openings and quits come from JOLTS, which trails by one month — the August row carries July JOLTS, the latest published. The July row was marked down to 7.2M when June JOLTS was revised. August JOLTS releases Sep 29.',
}

// ─── ADP ──────────────────────────────────────────────────────────────────────
// National Employment Report for August 2026, released Wed Sep 2. ADP overhauled
// the report with this release: it now publishes base pay alongside gross pay,
// plus 56 metro areas. The cards below track GROSS pay, which is the series the
// page has always shown — base pay runs roughly 1.4pp lower across the board.
export const adp = {
  period: 'August 2026',
  reportUrl: 'https://adpemploymentreport.com',
  metrics: [
    { label: 'Private Jobs Added',     value: '38K',  note: 'August 2026 · slowest pace since January, below +47K consensus' },
    { label: 'Job-Stayer Pay Growth',  value: '4.4%', note: 'YoY gross · flat for a fifth straight month (base pay 3.0%)' },
    { label: 'Job-Changer Pay Growth', value: '7.3%', note: 'YoY gross · premium keeps widening (base pay 4.7%)' },
    { label: 'Annual Pay (All)',       value: '4.7%', note: 'YoY gross pay growth, August 2026 (base pay 3.2%)' },
  ] satisfies MetricCard[],
  // Single source of truth for the pay-growth chart — keep in lockstep with the
  // two pay-growth cards above.
  payGrowth: {
    stayer: 4.4,
    changer: 7.3,
    caption: 'Switching premium widens again to 2.9pp — the widest gap yet in the job-changer series.',
  },
  // Goods-producing went to −10K on a 17K manufacturing drop, and services only
  // managed +48K. Education/Health (+45K) is doing essentially all the work;
  // Professional & Business Services swung to −16K.
  sectors: [
    { sector: 'Education & Health',           value: 45,  label: '+45K' },
    { sector: 'Leisure & Hospitality',        value: 16,  label: '+16K' },
    { sector: 'Construction',                 value: 12,  label: '+12K' },
    { sector: 'Financial Activities',         value: 6,   label: '+6K' },
    { sector: 'Other Services',               value: 6,   label: '+6K' },
    { sector: 'Information',                  value: -4,  label: '−4K' },
    { sector: 'Natural Resources & Mining',   value: -5,  label: '−5K' },
    { sector: 'Trade, Transport & Utilities', value: -5,  label: '−5K' },
    { sector: 'Professional & Business Svcs', value: -16, label: '−16K' },
    { sector: 'Manufacturing',                value: -17, label: '−17K' },
  ] satisfies BarDatum[],
}

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
// RPLS for August 2026.
export const revelio = {
  period: 'August 2026',
  reportUrl: 'https://www.reveliolabs.com/public-labor-statistics/',
  metrics: [
    { label: 'RPLS Jobs Gained (August)', value: '+36.5K', note: 'Down from +79.2K in July — a second straight slowdown' },
    { label: 'New Posting Salaries',      value: '−3.4%',  note: 'MoM · wage competition easing as employers lose urgency' },
    { label: 'Hiring Rate',               value: '19.7%',  note: 'Down 0.4pp from 20.1% — hiring keeps cooling' },
    { label: 'Attrition Rate',            value: '19.4%',  note: 'Down 0.3pp from 19.7% · workers staying put' },
  ] satisfies MetricCard[],
  sectors: [
    { sector: 'Public Administration',            trend: 'Growing (largest gain)',     direction: 'up' },
    { sector: 'Health Care & Social Assistance',  trend: 'Growing',                    direction: 'up' },
    { sector: 'Professional & Business Services', trend: 'Growing · postings up most', direction: 'up' },
    { sector: 'Leisure & Hospitality',            trend: 'Declining',                  direction: 'down' },
    { sector: 'Retail Trade',                     trend: 'Declining',                  direction: 'down' },
  ] satisfies SectorTrend[],
}

// ─── Aspen Tech Labs — JobMarketPulse ─────────────────────────────────────────
// Demand-side lens: job-posting counts scraped daily from 300k+ employer career
// sites (225k+ U.S.). Quarterly, so it refreshes on its own cadence — `note`
// flags when the next report is due so a lagging quarter doesn't read as stale.
// Q3 was still unpublished as of the September refresh; Q2 numbers stand.
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
  period: 'August 2026',
  releasedOn: 'Fri Sep 4, 2026',
  headline: 'Payrolls rebound to +162K and July’s negative print is revised away — but wage growth slips to 3.1%, a fresh five-year low, and ADP sees almost none of the same strength',
  stats: [
    { label: 'Nonfarm Payrolls', value: '+162K',  detail: 'strongest since March' },
    { label: 'Prior Revisions',  value: '+55K',   detail: 'June up to +31K · July up to +21K' },
    { label: 'Unemployment',     value: '4.1%',   detail: 'unchanged · participation 61.6%' },
    { label: 'Avg. Hourly Wage', value: '$37.75', detail: '+10¢ MoM · +3.1% YoY' },
  ],
  takeaway: 'A month after payrolls went negative, the negative went away. August came in at +162K — the strongest since March — and both prior months were revised up: June from +20K to +31K, July from −23K to +21K. The revision that erased 103K of jobs last cycle has now been partly handed back, 55K of it. Read the last three months as +31K, +21K, +162K. The catch is that almost nothing else corroborates the strength. ADP had private payrolls at just +38K, its slowest since January, and Revelio counted +36.5K. BLS itself puts private payrolls at +127K, with government adding 35K on a +42K bounce in local-government education that mostly reverses July’s cut. Wage growth cooled again to 3.1% YoY, a new five-year low. And July JOLTS, out three days earlier, showed the freeze deepening on both sides: hires down to a 3.2% rate, the weakest since February, and layoffs down to 1.0%, the lowest level since January. Openings were essentially flat at 7.3M.',
}

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
export const upcomingReleases = [
  { date: 'Tue Sep 29', source: 'BLS JOLTS',      what: 'August 2026 job openings, hires, quits' },
  { date: 'Wed Sep 30', source: 'ADP NER',        what: 'September 2026 private payrolls + pay growth' },
  { date: 'Fri Oct 2',  source: 'BLS Employment', what: 'September 2026 nonfarm payrolls + unemployment' },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
export const implications: Implication[] = [
  {
    tldr: 'July’s negative payroll print was revised away — revisions cut both ways',
    headline: 'The negative month got revised out of existence',
    body: 'Last cycle the story was that payrolls turned negative at −23K and that 103K prior jobs had been revised away. August rewrote both halves. July is now +21K, June is +31K, and the two revisions added 55K back. The three-month run reads +31K, +21K, +162K — a slow market, not a contracting one. Last month we told you to build a revision haircut into any headcount model keyed off monthly payroll prints. That advice holds, but the direction was wrong: revisions are noisy, not reliably pessimistic. The durable lesson is narrower and more useful — the first print is an estimate with a wide error bar in both directions, so do not let a single month, good or bad, trigger a hiring freeze or a hiring spree. Wait for the third estimate before you move headcount.',
  },
  {
    tldr: 'BLS says +162K, ADP says +38K — the gap between them is the real story',
    headline: 'Three payroll counts disagree by a factor of four',
    body: 'BLS put August at +162K. ADP put private-sector job creation at +38K, its slowest since January and below a +47K consensus. Revelio counted +36.5K. Even inside BLS, private payrolls were +127K against +35K from government. That is an unusually wide spread, and it means the honest answer for planning purposes is a range, not a number. The two independent private-sector reads both land in the high-30Ks, which is the number that should anchor your expectations if you hire in the private sector; the BLS headline is flattered by a +42K bounce in local-government education that mostly just reverses the cut it took in July. ADP and BLS also disagree outright on manufacturing — BLS has it +16K, ADP has it −17K. When the sources conflict this sharply, your own req-to-hire data is a better signal than any of them.',
  },
  {
    tldr: 'Wage growth hit 3.1% while the switching premium widened to 2.9pp',
    headline: 'The raise you give is shrinking; the raise a switcher gets is still growing',
    body: 'Average hourly earnings rose 3.1% YoY, down from 3.2% and the slowest since May 2021. Revelio has salaries on new postings down 3.4% month over month — employers are advertising less money because they feel less urgency. And yet ADP has job-changer gross pay growth at 7.3% against job-stayers flat at 4.4% for a fifth straight month. The switching premium widened to 2.9pp, the widest gap in the series. Note that ADP overhauled this report in August and now publishes base pay alongside gross pay; on the base-pay series the same gap is 4.7% versus 3.0%. Either way the shape is identical. Both things are true at once: the incumbent workforce is getting smaller raises, and the person who leaves is still paid materially more. If your comp planning is anchored to a 3.1% headline, you are budgeting for the people who stay and underpricing the ones most likely to go.',
  },
  {
    tldr: 'Hires fell to 3.2% and layoffs to 1.0% — the freeze deepened on both sides',
    headline: 'Low-hire, low-fire is no longer a phase — it is the operating environment',
    body: 'July JOLTS showed openings essentially flat at 7.3M, but the flow data moved. The hires rate fell 0.2pp to 3.2%, the weakest since February. Layoffs dropped 100K to 1.67M, a 1.0% rate and the lowest level since January. Quits ticked down to 1.9%. Revelio’s independent read matches: hiring down 0.4pp to 19.7% and attrition down 0.3pp to 19.4%. Every one of those numbers moved toward less movement. The layoffs figure is the genuinely reassuring one — employers are holding onto people harder than at any point this year, so your retention risk from the market is low right now. The cost is that your internal mobility and backfill pipelines are equally frozen, and the pool of workers who want to move but cannot keeps growing. That backlog releases the moment conditions turn, and it will not release gradually.',
  },
  {
    tldr: 'Restaurants and local school districts carried August; information shed 23K',
    headline: 'The August gain was narrow, and it was not white-collar',
    body: 'Food services and drinking places added 59,000 — nearly five times its 12-month average of 12,000 — and local government education added 42,000. Those two lines are most of the month. Construction added 22K and manufacturing 16K. Meanwhile information shed 23,000 on losses across computing, publishing, and broadcasting, and health care managed only +13K against a 12-month average of +32K, which is a notable cooling in the sector that has carried this market all year. ADP’s cut is harsher on the knowledge economy: Professional & Business Services at −16K and Information at −4K. For anyone recruiting in tech, media, or professional services, the candidate market just got looser and your offers should be closing faster. If they are not, the constraint is your process, not supply. And if health care has been your one reliably tight lane, watch it — one soft month is not a trend, but it is the first crack.',
  },
  {
    tldr: 'Postings are retreating, and AI-exposed roles are hitting workers under 25 hardest',
    headline: 'Demand is pulling back, and the pullback is not evenly distributed by age',
    body: 'The demand side finally turned. Revelio has active U.S. postings down 3.0% month over month to 18.3M and down 2.2% year over year, with Transportation & Warehousing off 13.2% and Wholesale Trade off 11.3%. That is a change from the pattern we have flagged for months, where postings held up while payrolls sagged; the board is now thinning too. Aspen’s Q2 JobMarketPulse still shows 6.45M U.S. postings at +3.7% YoY with salary transparency at 53.6%, but that is a quarter old and the Q3 report in October is the one to watch. The finding HR leaders should actually sit with is Revelio’s AI analysis: employment in highly AI-exposed occupations is down roughly 6% relative to less-exposed roles since November 2022, and for workers aged 22 to 25 that gap is 19%. Firms adopting AI are still growing headcount overall — the displacement is concentrated at the entry level, in the roles that used to be how people got in. If you have quietly stopped backfilling junior analyst, coordinator, and associate roles because a tool covers the work, you have also quietly stopped building your own pipeline. That bill comes due in about three years.',
  },
]
