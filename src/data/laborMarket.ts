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
//   4. revisions — fill in the two months this release revised, append the new
//      month as 'pending', recompute `summary`. Benchmark rows change once a
//      year (preliminary each September, final each February).
//   5. latestRelease + upcomingReleases
//   6. implications — rewrite the narrative to the new story
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

/**
 * One reference month's journey from first print to final estimate. Every
 * payroll month is published three times: the initial estimate, then two
 * revisions in the following two releases. `net` is third-minus-first.
 */
export type RevisionRow = {
  month: string
  first: string
  second: string
  /** '—' while the third estimate is still pending. */
  third: string
  net: string
  direction: 'up' | 'down' | 'pending'
}

export type BenchmarkRow = {
  benchmark: string
  preliminary: string
  final: string
  note: string
}

/** Stamped in the page header and the source footer. */
export const LAST_UPDATED = 'October 2, 2026'

// ─── Bureau of Labor Statistics ───────────────────────────────────────────────
// Employment Situation for September 2026, released Fri Oct 2. Openings/quits/
// layoffs are August JOLTS (released Tue Sep 29) — September JOLTS lands Nov 3.
export const bls = {
  period: 'September 2026',
  metrics: [
    { label: 'Unemployment Rate', value: '4.2%',   change: '+0.1pp',    trend: 'up',   note: 'Rose as workers re-entered · participation up to 61.8%' },
    { label: 'Job Openings',      value: '7.1M',   change: '−256K',     trend: 'down', note: 'August JOLTS · July revised up to 7.34M' },
    { label: 'Avg. Hourly Wage',  value: '$37.81', change: '+5¢',       trend: 'up',   note: '+3.0% YoY · another new post-2021 low' },
    { label: 'Layoffs Rate',      value: '1.0%',   change: '−0.1pp',    trend: 'down', note: 'August JOLTS · 1.64M · down 61K on the month' },
    { label: 'Quits Rate',        value: '1.9%',   change: 'unchanged', trend: 'flat', note: 'August JOLTS · 3.1M · workers still not moving' },
    { label: 'Jobs Added (BLS)',  value: '+29K',   change: 'weak',      trend: 'down', note: 'July revised to −10K, August to +133K (−60K combined)' },
  ] satisfies MetricCard[],
  historical: [
    { month: 'May 2026', unemployment: '4.3%', openings: '7.5M', wages: '$37.51', quits: '1.9%' },
    { month: 'Jun 2026', unemployment: '4.2%', openings: '7.4M', wages: '$37.60', quits: '2.0%' },
    { month: 'Jul 2026', unemployment: '4.1%', openings: '7.2M', wages: '$37.65', quits: '2.0%' },
    { month: 'Aug 2026', unemployment: '4.1%', openings: '7.3M', wages: '$37.75', quits: '1.9%' },
    { month: 'Sep 2026', unemployment: '4.2%', openings: '7.1M', wages: '$37.81', quits: '1.9%', current: true },
  ] satisfies HistoricalRow[],
  historicalNote:
    'Unemployment and wages are the Employment Situation reference month. Job openings and quits come from JOLTS, which trails by one month — the September row carries August JOLTS, the latest published. July JOLTS was revised up to 7.34M, so the August row still rounds to 7.3M. September JOLTS releases Nov 3.',
}

// ─── Payroll Revisions Tracker ────────────────────────────────────────────────
// Every payroll month is published three times — the first print, then two
// revisions — and the first print is the one that moves markets and headlines.
// This block tracks the gap. Figures are read straight off the archived
// Employment Situation releases at bls.gov/bls/news-release/empsit.htm; each
// release states its own headline print plus the revisions to the prior two
// months, so the chain reconstructs exactly.
//
// REFRESH: each cycle, fill in the two months the new release revised, add the
// new month at the bottom with direction 'pending', and recompute `summary`.
// Do NOT fold benchmark revisions into these rows — the benchmark is a separate
// level correction on a different schedule, tracked in `benchmarks` below.
export const revisions = {
  period: 'Jan – Sep 2026',
  rows: [
    { month: 'Jan 2026', first: '+130K', second: '+126K', third: '+160K', net: '+30K',  direction: 'up' },
    { month: 'Feb 2026', first: '−92K',  second: '−133K', third: '−156K', net: '−64K',  direction: 'down' },
    { month: 'Mar 2026', first: '+178K', second: '+185K', third: '+214K', net: '+36K',  direction: 'up' },
    { month: 'Apr 2026', first: '+115K', second: '+179K', third: '+148K', net: '+33K',  direction: 'up' },
    { month: 'May 2026', first: '+172K', second: '+129K', third: '+63K',  net: '−109K', direction: 'down' },
    { month: 'Jun 2026', first: '+57K',  second: '+20K',  third: '+31K',  net: '−26K',  direction: 'down' },
    { month: 'Jul 2026', first: '−23K',  second: '+21K',  third: '−10K',  net: '+13K',  direction: 'up' },
    { month: 'Aug 2026', first: '+162K', second: '+133K', third: '—',     net: '−29K',  direction: 'down' },
    { month: 'Sep 2026', first: '+29K',  second: '—',     third: '—',     net: '—',     direction: 'pending' },
  ] satisfies RevisionRow[],
  summary: {
    up: 4,
    down: 3,
    headline: 'Four up, three down — net −87K across seven settled months',
    detail:
      'Across the seven months that have all three estimates in, first prints averaged +77K while the settled figures average +64K — a drag of about 12K a month, and the tilt has deepened since last cycle. July is the cautionary tale: it printed at −23K, was revised up to +21K, and then landed at −10K, so the month that looked like a clean counterexample last month turned out not to be one. August is two-thirds of the way through the same process and already down 29K. The direction still genuinely varies month to month, but the central tendency is negative.',
  },
  // The annual benchmark recounts payrolls against actual unemployment-insurance
  // tax records. This — not the monthly revisions — is where the large downward
  // corrections of 2024 and 2025 actually lived.
  benchmarks: [
    { benchmark: 'March 2024', preliminary: '−818K', final: '−598K', note: 'Final came in less negative than the preliminary' },
    { benchmark: 'March 2025', preliminary: '−911K', final: '−898K', note: 'Largest since 2002 · cut 2025 growth from +584K to +181K' },
    { benchmark: 'March 2026', preliminary: '−79K',  final: 'Feb 2027', note: 'Smallest since 2021 · −0.1% vs a 10-yr absolute average of 0.2%' },
  ] satisfies BenchmarkRow[],
  takeaway:
    'Two mechanisms drive the drag, and both are conditional on the cycle rather than constant. First, collection: the initial print rests on about 55% of the survey sample, the second on 91%, the third on 93%, and late reporters skew smaller and more distressed. Second, the birth-death model, which imputes jobs at new firms net of closures and keeps adding them when business formation stalls. Both bite hardest at a turning point. That is why the big corrections of 2024 and 2025 came through the annual benchmark — −598K and −898K — while the March 2026 benchmark produced just −79K. The Cleveland Fed tested for a structural break in 2026 and found none: recent revisions ran above the historical mean but stayed inside the normal range. So this is not a thumb on the scale, and the revisions are published on a known schedule. It is a measurement lag that runs against you when hiring is decelerating. The practical response is to treat any single first print as an estimate with a wide error bar, and to wait for the third before moving headcount.',
  sourceUrl: 'https://www.bls.gov/bls/news-release/empsit.htm',
  note: 'Monthly figures from the archived Employment Situation releases. Net revision is third estimate minus first print; the summary averages cover only the months with all three estimates published. The March 2026 benchmark is preliminary and will be folded into the official series with the January 2027 report in February 2027, so early-2026 months will move once more.',
}

// ─── ADP ──────────────────────────────────────────────────────────────────────
// National Employment Report for September 2026, released Wed Sep 30. Since the
// August overhaul ADP publishes base pay alongside gross pay. The cards below
// track GROSS pay, the series the page has always shown — base pay runs roughly
// 1.4pp lower across the board.
export const adp = {
  period: 'September 2026',
  reportUrl: 'https://adpemploymentreport.com',
  metrics: [
    { label: 'Private Jobs Added',     value: '90K',  note: 'September 2026 · first acceleration since May, beat +68K consensus' },
    { label: 'Job-Stayer Pay Growth',  value: '4.4%', note: 'YoY gross · flat for a sixth straight month (base pay 3.0%)' },
    { label: 'Job-Changer Pay Growth', value: '7.3%', note: 'YoY gross · premium holding at its widest (base pay 4.8%)' },
    { label: 'Annual Pay (All)',       value: '4.7%', note: 'YoY gross pay growth, September 2026 (base pay 3.2%)' },
  ] satisfies MetricCard[],
  // Single source of truth for the pay-growth chart — keep in lockstep with the
  // two pay-growth cards above.
  payGrowth: {
    stayer: 4.4,
    changer: 7.3,
    caption: 'Switching premium holds at 2.9pp — still the widest gap in the job-changer series.',
  },
  // Goods-producing swung back to +31K on manufacturing (+17K) and construction
  // (+15K). Education/Health (+55K) is again bigger than the whole services
  // total (+59K); Financial Activities (−16K) and Prof/Business (−11K) are the
  // drags, which is the knowledge-economy weakness showing up again.
  sectors: [
    { sector: 'Education & Health',           value: 55,  label: '+55K' },
    { sector: 'Leisure & Hospitality',        value: 22,  label: '+22K' },
    { sector: 'Manufacturing',                value: 17,  label: '+17K' },
    { sector: 'Construction',                 value: 15,  label: '+15K' },
    { sector: 'Other Services',               value: 6,   label: '+6K' },
    { sector: 'Information',                  value: 3,   label: '+3K' },
    { sector: 'Trade, Transport & Utilities', value: 0,   label: '0' },
    { sector: 'Natural Resources & Mining',   value: -1,  label: '−1K' },
    { sector: 'Professional & Business Svcs', value: -11, label: '−11K' },
    { sector: 'Financial Activities',         value: -16, label: '−16K' },
  ] satisfies BarDatum[],
}

// ─── Revelio Labs ─────────────────────────────────────────────────────────────
// RPLS for September 2026. NOTE: Revelio reported hiring and attrition as sector
// BREADTH this cycle (13 of 17 / 15 of 17) rather than publishing national rates,
// so the rate cards carried in prior months have no September value. Breadth is
// what is sourced; do not carry August's 19.7% / 19.4% forward as if current.
export const revelio = {
  period: 'September 2026',
  reportUrl: 'https://www.reveliolabs.com/public-labor-statistics/',
  metrics: [
    { label: 'RPLS Jobs Gained (September)', value: '+56.9K', note: 'Up from +36.5K in August · Public Admin and Health Care led' },
    { label: 'Active Job Postings',          value: '18.12M', note: '−1.8% MoM · −1.3% YoY · Leisure/Hospitality −14.6%' },
    { label: 'Low-Hire, Low-Fire Breadth',   value: '13 / 15', note: 'Of 17 sectors: hiring slowed in 13, attrition eased in 15' },
    { label: 'New AI Adoption Pace',         value: '−48%',   note: 'Off its April peak · ~7% of eligible firms now adopters' },
  ] satisfies MetricCard[],
  sectors: [
    { sector: 'Public Administration',           trend: 'Growing (largest gain)',  direction: 'up' },
    { sector: 'Health Care & Social Assistance', trend: 'Growing',                 direction: 'up' },
    { sector: 'Information',                     trend: 'Declining',               direction: 'down' },
    { sector: 'Transportation',                  trend: 'Declining',               direction: 'down' },
    { sector: 'Leisure & Hospitality',           trend: 'Postings down most (−14.6%)', direction: 'down' },
  ] satisfies SectorTrend[],
}

// ─── Aspen Tech Labs — JobMarketPulse ─────────────────────────────────────────
// Demand-side lens: job-posting counts scraped daily from 300k+ employer career
// sites (225k+ U.S.). Quarterly, so it refreshes on its own cadence — `note`
// flags when the next report is due so a lagging quarter doesn't read as stale.
// Q3 was still unpublished as of the Oct 2 refresh — the quarter only just
// closed; Q2 numbers stand. Check again on the November pass.
export const aspen = {
  period: 'Q2 2026',
  note: 'Latest available — Q3 report expected later in October',
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
  period: 'September 2026',
  releasedOn: 'Fri Oct 2, 2026',
  headline: 'Payrolls slow to +29K and July flips back to negative at −10K as August is cut to +133K — but unemployment’s rise to 4.2% came from workers returning, and ADP saw its first acceleration since May',
  stats: [
    { label: 'Nonfarm Payrolls', value: '+29K',   detail: 'private +46K · government −17K' },
    { label: 'Prior Revisions',  value: '−60K',   detail: 'July cut to −10K · August to +133K' },
    { label: 'Unemployment',     value: '4.2%',   detail: '+0.1pp · participation up to 61.8%' },
    { label: 'Avg. Hourly Wage', value: '$37.81', detail: '+5¢ MoM · +3.0% YoY' },
  ],
  takeaway: 'September was soft at +29K, and the revisions went the other way again: July has been cut from +21K to −10K and August from +162K to +133K, 60K between them. Last month July looked like the clean counterexample to the revision story — a bad headline revised up. It has now landed negative after all. The underlying trend is the four-month run of +31K, −10K, +133K, +29K: positive on average, barely. Two things make this better than it reads. Unemployment rose to 4.2%, but it rose for the healthy reason — participation climbed 0.2pp to 61.8%, meaning people re-entered the labor force rather than employment collapsing. And ADP posted +90K, its first acceleration since May and a beat on consensus, led by education/health (+55K) and leisure/hospitality (+22K). That is the opposite of last month, when BLS ran hot and ADP ran cold; the two series have simply swapped sides, which is a reason to average them rather than trust either. The weak spots are consistent across sources: financial activities −16K and professional/business services −11K at ADP, information −10K and government −17K at BLS. Wage growth slipped again to 3.0% YoY. August JOLTS showed openings down 256K to 7.08M with the vacancy yield falling to 0.71 from 0.75 — postings exist, hiring is not following.',
}

// ─── Upcoming Releases ────────────────────────────────────────────────────────
// Surfaces the next-on-the-calendar BLS/ADP/JOLTS releases so readers know
// when fresher data lands. Curated manually — refresh dates each cycle.
export const upcomingReleases = [
  { date: 'Tue Nov 3', source: 'BLS JOLTS',      what: 'September 2026 job openings, hires, quits' },
  { date: 'Wed Nov 4', source: 'ADP NER',        what: 'October 2026 private payrolls + pay growth' },
  { date: 'Fri Nov 6', source: 'BLS Employment', what: 'October 2026 nonfarm payrolls + unemployment' },
]

// ─── HR Implications ──────────────────────────────────────────────────────────
export const implications: Implication[] = [
  {
    tldr: 'July flipped back to negative — and the revision drag has deepened, not eased',
    headline: 'The month that looked like a counterexample landed negative after all',
    body: 'Last cycle July printed at −23K, got revised up to +21K, and we flagged it as the clean counterexample to the idea that first prints are too optimistic. It has now landed at −10K. August came down too, from +162K to +133K, for 60K between them. Zoom out and the record for 2026 is this: across the seven months with all three estimates published, first prints averaged +77K while the settled figures average +64K — a drag of roughly 12K a month, wider than the 8K we measured last cycle. The direction still genuinely varies, four months up and three down, so this is not a thumb on the scale. It is a measurement lag that runs against you specifically when hiring is decelerating, because the initial print rests on about 55% of the survey sample and late reporters skew smaller and more distressed. The operating rule stands and has now been tested twice: do not move headcount on a first print. Wait for the third.',
  },
  {
    tldr: 'BLS says +29K, ADP says +90K — the two series have swapped sides',
    headline: 'The payroll counts disagree again, in the opposite direction from last month',
    body: 'In August, BLS ran hot at +162K while ADP came in at +38K and we told you to anchor on the private-sector reads. This month it is exactly reversed: BLS has +29K while ADP posted +90K, its first acceleration since May and a beat on a +68K consensus. Revelio sits in between at +56.9K. Anyone who picked a favorite series last month and planned around it has now been wrong twice. The useful discipline is to treat the three as a range — call it +30K to +90K, centering somewhere near +55K — and to notice that the disagreement itself is information: when methodologies this different diverge this much, nobody has a clean read, and that is a reason to weight your own funnel data more heavily than any national print. Your req-to-offer conversion and time-to-fill are measured without a birth-death model.',
  },
  {
    tldr: 'Unemployment rose to 4.2%, but for the healthy reason this time',
    headline: 'A rising unemployment rate that is good news, which is rarer than it sounds',
    body: 'The unemployment rate went up 0.1pp to 4.2%. Read in isolation that is deterioration. It is not, and the distinction matters because it is the opposite of what we saw earlier this year. Participation climbed 0.2pp to 61.8% — people came back into the labor force and were counted as looking for work. Compare that with the spring, when the rate fell to 4.1% while participation dropped, meaning the improvement was people giving up rather than finding jobs. Same headline direction, opposite meaning. For recruiting, a rising participation rate is the single most useful thing in this report: your applicant pool is getting deeper, including people who had stopped looking. If you have roles that have been hard to fill all year, this is the month to re-open the search rather than the month to panic about a softening market.',
  },
  {
    tldr: 'Wage growth hit 3.0% — a new low — while switchers still get 7.3%',
    headline: 'The gap between what you pay to keep someone and what they get for leaving has not budged',
    body: 'Average hourly earnings rose 3.0% year over year, down from 3.1% and another post-2021 low. Meanwhile ADP has job-changer gross pay growth at 7.3% against job-stayers at 4.4% — flat for a sixth consecutive month, with the switching premium holding at 2.9pp, the widest in the series. On the base-pay series ADP introduced in August, the same comparison is 4.8% versus 3.0%. The pattern has now persisted long enough that it should change how you plan rather than just how you worry. Cooling headline wage growth gives you cover to hold merit budgets down, and most organizations will take it. But the premium for leaving has not compressed at all, which means the saving is being funded by your flight risks. If you are going to run a 3% merit cycle, pair it with off-cycle adjustments for the people whose market rate is set by that 7.3% number, because the headline is not describing them.',
  },
  {
    tldr: 'Education and health is the whole market; knowledge work is where the losses are',
    headline: 'One sector is carrying the economy, and it is not the one hiring HR tech',
    body: 'ADP has education and health services at +55K out of +59K for all service industries combined — the sector is, arithmetically, the entire services gain. BLS agrees in direction with health care +17K, alongside leisure and hospitality +10K, construction +11K, and manufacturing +9K. The losses cluster in white-collar work: ADP has financial activities at −16K and professional and business services at −11K, BLS has information at −10K and professional and business services at −9K, and Revelio independently records employment declines in Information and Transportation. Government shed 17K at BLS, reversing part of August’s local-education bounce. If you recruit in finance, consulting, tech, or media, the market has loosened for the third month running and your offer-acceptance rates should reflect that. If you recruit clinicians or teachers, you are competing in the only genuinely tight lane left and should expect none of the leverage the national headlines imply you have.',
  },
  {
    tldr: 'Openings fell 256K and postings keep thinning, while AI adoption cools but pays off',
    headline: 'Demand is draining slowly, and the AI story got more interesting than "it takes jobs"',
    body: 'August JOLTS had openings down 256K to 7.08M, with the vacancy yield — hires per opening — slipping to 0.71 from the 0.75 that held through 2025 and most of 2026. Layoffs fell to a 1.0% rate and quits held at 1.9%, so the freeze is intact on both sides while the pool of advertised work shrinks. Revelio has active postings down 1.8% on the month to 18.12M and down 1.3% year over year, with leisure and hospitality off 14.6%. Aspen’s Q2 JobMarketPulse still reads +3.7% YoY on 6.45M postings, but that is now two quarters stale and Q3 should land later this month. The genuinely new finding is Revelio’s AI data, and it complicates the usual narrative in both directions. The pace of new firm adoption is down 48% from its April peak and fell 17% from July to August, so the land-grab phase is over; cumulative adoption sits at roughly 7% of eligible US hiring firms. Yet adopters have expanded headcount 27% more than non-adopters since the pre-ChatGPT baseline, and 90% of the measured change in work activity is happening inside existing occupations rather than through jobs disappearing. Taken together: AI is reshaping what roles do far more than it is deleting them, the firms adopting it are growing faster, and the risk for HR is not mass displacement but job descriptions and skills frameworks that quietly stop matching the actual work.',
  },
]
