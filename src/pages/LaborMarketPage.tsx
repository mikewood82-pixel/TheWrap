const metrics = [
  { label: 'Unemployment Rate', value: '4.3%',   change: '-0.1%',  trend: 'down', note: 'Edged down in March' },
  { label: 'Job Openings',      value: '6.9M',   change: '-300K',  trend: 'down', note: 'Lowest since early 2021' },
  { label: 'Avg. Hourly Wage',  value: '$37.38', change: '+0.2%',  trend: 'up',   note: '+3.5% year-over-year' },
  { label: 'Layoffs Rate',      value: '1.1%',   change: '0.0%',   trend: 'flat', note: 'Stable but elevated' },
  { label: 'Quits Rate',        value: '1.9%',   change: '-0.1%',  trend: 'down', note: 'Lowest since 2015' },
  { label: 'Jobs Added (ADP)',  value: '62K',    change: '-4K',    trend: 'down', note: 'Well below historical avg' },
]

const implications = [
  {
    headline: 'ADP at 62K is a warning sign, not a blip',
    body: 'Private sector job creation has slowed dramatically — 62K in March is less than half the long-run average. Combined with February\'s BLS revision to -133K, the picture is of an employer base that has stopped hiring. Workforce planning assumptions built on 150K+ monthly additions need to be revisited.',
  },
  {
    headline: 'Quits at 1.9% — retention pressure has inverted',
    body: 'The quits rate is at its lowest level in over a decade. Employees are staying put because options have narrowed, not because engagement has improved. HR teams that have been deferring compensation reviews are getting a temporary reprieve — but suppressed quit rates historically precede a wave of exits when conditions shift.',
  },
  {
    headline: 'Wage growth holding at 3.5% YoY — but the mix is shifting',
    body: 'Headline wage growth looks healthy, but it\'s increasingly concentrated in healthcare and a handful of other sectors. ADP data shows job-changers getting 6.6% while job-stayers are at 4.5% — the premium for switching has returned. If your comp bands haven\'t been refreshed, you\'re already behind for any role with active external demand.',
  },
]

const historical = [
  { month: 'Nov 2025', unemployment: '4.6%', openings: '7.6M', wages: '$36.41', quits: '2.1%' },
  { month: 'Dec 2025', unemployment: '4.4%', openings: '7.4M', wages: '$36.71', quits: '2.0%' },
  { month: 'Jan 2026', unemployment: '4.4%', openings: '7.2M', wages: '$37.01', quits: '2.0%' },
  { month: 'Feb 2026', unemployment: '4.4%', openings: '6.9M', wages: '$37.29', quits: '1.9%' },
  { month: 'Mar 2026', unemployment: '4.3%', openings: '6.9M', wages: '$37.38', quits: '1.9%', current: true },
]

export default function LaborMarketPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Data · Updated April 2026</div>
        <h1 className="font-serif text-4xl font-bold mb-3">U.S. Labor Market</h1>
        <p className="text-brand-dark/60">BLS data, updated monthly. What the numbers mean for HR leaders.</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-3xl font-bold mb-1">{m.value}</div>
            <div className={`text-xs font-medium mb-1 ${
              m.trend === 'up' ? 'text-amber-600' :
              m.trend === 'down' ? 'text-green-600' :
              'text-brand-dark/40'
            }`}>
              {m.change} MoM
            </div>
            <div className="text-xs text-brand-dark/40">{m.note}</div>
          </div>
        ))}
      </div>

      {/* Implications */}
      <h2 className="font-serif text-2xl font-bold mb-4">What This Means for HR</h2>
      <div className="space-y-4 mb-12">
        {implications.map((imp) => (
          <div key={imp.headline} className="bg-brand-cream rounded-xl p-5 border-l-4 border-brand-terracotta">
            <div className="font-serif font-semibold mb-1">{imp.headline}</div>
            <p className="text-sm text-brand-dark/60 leading-relaxed">{imp.body}</p>
          </div>
        ))}
      </div>

      {/* Historical table */}
      <h2 className="font-serif text-2xl font-bold mb-4">6-Month Trend</h2>
      <div className="overflow-x-auto rounded-xl border border-brand-cream">
        <table className="w-full text-sm">
          <thead className="bg-brand-dark text-brand-cream">
            <tr>
              {['Month', 'Unemployment', 'Job Openings', 'Avg. Wage', 'Quits Rate'].map((h) => (
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
      <p className="text-xs text-brand-dark/30 mt-2">Source: U.S. Bureau of Labor Statistics, ADP National Employment Report. Updated April 2026. Oct 2025 excluded — BLS household survey not collected due to federal government shutdown.</p>
    </div>
  )
}
