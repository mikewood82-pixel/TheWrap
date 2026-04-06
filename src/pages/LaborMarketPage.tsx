const metrics = [
  { label: 'Unemployment Rate', value: '4.1%', change: '-0.1%', trend: 'down',    note: 'Lowest in 8 months' },
  { label: 'Job Openings',      value: '8.1M', change: '-200K', trend: 'down',    note: 'Cooling but still elevated' },
  { label: 'Avg. Hourly Wage',  value: '$35.12', change: '+0.3%', trend: 'up',   note: 'Above inflation' },
  { label: 'Layoffs Rate',      value: '1.2%',  change: '+0.1%', trend: 'up',    note: 'Worth watching' },
  { label: 'Quits Rate',        value: '2.2%',  change: '-0.1%', trend: 'down',  note: 'Great Resignation is over' },
  { label: 'Jobs Added (ADP)',  value: '192K',  change: '-8K',   trend: 'down',   note: 'Below consensus' },
]

const implications = [
  {
    headline: 'Talent market is cooling, not crashing',
    body: 'Job openings declining steadily is a normalization story, not a crisis. Sourcing teams should expect more applicants per req through Q3.',
  },
  {
    headline: 'Wage growth still outpaces most comp bands',
    body: 'If you haven\'t refreshed your salary ranges in 18 months, you\'re likely losing offers. Market data is moving faster than annual comp cycles.',
  },
  {
    headline: 'Layoffs ticking up — monitor closely',
    body: 'Still low historically, but the month-over-month uptick in the layoffs rate is the one number in this dataset that tells a different story than the headline.',
  },
]

const historical = [
  { month: 'Jan 2025', unemployment: '4.2%', openings: '8.4M', wages: '$34.82', quits: '2.3%' },
  { month: 'Feb 2025', unemployment: '4.2%', openings: '8.3M', wages: '$34.91', quits: '2.3%' },
  { month: 'Mar 2025', unemployment: '4.1%', openings: '8.2M', wages: '$35.01', quits: '2.2%' },
  { month: 'Apr 2025', unemployment: '4.2%', openings: '8.3M', wages: '$35.05', quits: '2.2%' },
  { month: 'May 2025', unemployment: '4.1%', openings: '8.1M', wages: '$35.12', quits: '2.2%', current: true },
]

export default function LaborMarketPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Data</div>
        <h1 className="font-serif text-4xl font-bold mb-3">U.S. Labor Market</h1>
        <p className="text-brand-dark/60">BLS data, updated monthly. What the numbers mean for HR leaders.</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-brand-cream rounded-xl p-4">
            <div className="text-xs text-brand-dark/40 mb-1">{m.label}</div>
            <div className="font-serif text-3xl font-bold mb-1">{m.value}</div>
            <div className={`text-xs font-medium mb-1 ${m.trend === 'up' ? 'text-amber-600' : 'text-green-600'}`}>
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
      <h2 className="font-serif text-2xl font-bold mb-4">12-Month Trend</h2>
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
      <p className="text-xs text-brand-dark/30 mt-2">Source: U.S. Bureau of Labor Statistics. Updated monthly.</p>
    </div>
  )
}
