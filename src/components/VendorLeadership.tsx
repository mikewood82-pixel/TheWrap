import { Users, AlertTriangle } from 'lucide-react'
import type { LeadershipMember } from '../data/vendorDetails'

interface Props {
  team: LeadershipMember[]
}

export default function VendorLeadership({ team }: Props) {
  if (team.length === 0) return null

  // Sort: active first, departed last; within each group, executive ranks
  // (CEO before CTO before everyone else) using a coarse priority map.
  const rankOrder: Record<string, number> = {
    CEO: 0, 'Co-CEO': 0, President: 1, COO: 2,
    CTO: 3, CPO: 4, 'Head of Product': 4,
    CHRO: 5, 'Chief People Officer': 5,
    CRO: 6, CFO: 7, CMO: 8,
  }
  const rankOf = (m: LeadershipMember) => rankOrder[m.role] ?? 99

  const sorted = [...team].sort((a, b) => {
    if (!!a.departed !== !!b.departed) return a.departed ? 1 : -1
    return rankOf(a) - rankOf(b)
  })

  const recentDepartures = team.filter(m => m.departed).length
  const newInRole = team.filter(m => m.tenureYears < 1 && !m.departed).length

  return (
    <div id="leadership" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
      <div className="flex items-center gap-2 mb-4">
        <Users size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Leadership</span>
        {recentDepartures > 0 && (
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full">
            <AlertTriangle size={10} /> {recentDepartures} recent departure{recentDepartures > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sorted.map((m, i) => {
          const isNew = m.tenureYears < 1 && !m.departed
          const cardCls = m.departed
            ? 'bg-brand-cream/40 border-brand-cream'
            : isNew
            ? 'bg-amber-50/40 border-amber-100'
            : 'bg-brand-surface border-brand-border'

          return (
            <div key={i} className={`border rounded-lg p-3 ${cardCls}`}>
              <div className="text-[10px] uppercase tracking-wider text-brand-dark/40 font-semibold mb-0.5">{m.role}</div>
              <div className={`font-serif font-semibold text-brand-dark leading-tight ${m.departed ? 'line-through text-brand-dark/40' : ''}`}>
                {m.name}
              </div>
              <div className="text-xs text-brand-dark/50 mt-1">
                {m.departed ? (
                  <span className="text-amber-800 font-medium">{m.departed}</span>
                ) : (
                  <>
                    {m.tenureYears < 1
                      ? <span className="text-amber-800 font-medium">New in role</span>
                      : <span>{m.tenureYears.toFixed(m.tenureYears < 2 ? 1 : 0)} yrs in role</span>}
                  </>
                )}
              </div>
              {m.prior && !m.departed && (
                <div className="text-xs text-brand-dark/40 mt-1.5">Prior: <span className="text-brand-dark/60">{m.prior}</span></div>
              )}
            </div>
          )
        })}
      </div>

      {newInRole > 0 && recentDepartures === 0 && (
        <p className="text-xs text-brand-dark/40 mt-4 italic">{newInRole} new exec{newInRole > 1 ? 's' : ''} in the past year — leadership stability watch.</p>
      )}
      <p className="text-xs text-brand-dark/30 mt-4 pt-4 border-t border-brand-cream">
        Sources: LinkedIn profile data, vendor press releases, and SEC filings (where applicable). Tenure is based on time in current role, not total time at company.
      </p>
    </div>
  )
}
