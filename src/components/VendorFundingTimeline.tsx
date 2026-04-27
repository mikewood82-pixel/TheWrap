import { DollarSign } from 'lucide-react'
import type { FundingRound } from '../data/vendorDetails'

interface Props {
  history: FundingRound[]
  totalRaised?: string
  lastValuation?: string
}

const dotColor: Record<string, string> = {
  'Seed':      'bg-brand-cream border-brand-gold',
  'Series A':  'bg-brand-gold/30 border-brand-gold',
  'Series B':  'bg-brand-gold/60 border-brand-gold',
  'Series C':  'bg-brand-terracotta/60 border-brand-terracotta',
  'Series D':  'bg-brand-terracotta/80 border-brand-terracotta',
  'Series E':  'bg-brand-terracotta border-brand-terracotta',
  'Series F':  'bg-brand-dark border-brand-terracotta',
  'IPO':       'bg-green-500 border-green-700',
  'Acquired':  'bg-purple-500 border-purple-700',
}

export default function VendorFundingTimeline({ history, totalRaised, lastValuation }: Props) {
  if (history.length === 0) return null

  return (
    <div className="mt-5 pt-5 border-t border-brand-cream">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Funding history</div>
        {totalRaised && (
          <span className="text-xs bg-brand-cream text-brand-dark/70 px-2.5 py-1 rounded-full font-medium">
            <DollarSign size={10} className="inline -mt-0.5 mr-0.5" />
            Total raised: {totalRaised}
          </span>
        )}
        {lastValuation && (
          <span className="text-xs bg-brand-gold/15 text-brand-dark/80 px-2.5 py-1 rounded-full font-medium">
            Last valuation: {lastValuation}
          </span>
        )}
      </div>

      <ol className="relative pl-5 border-l-2 border-brand-cream space-y-4">
        {history.map((r, i) => {
          const dotCls = dotColor[r.round] ?? 'bg-brand-cream border-brand-dark/30'
          return (
            <li key={i} className="relative">
              <span className={`absolute -left-[1.55rem] top-1 w-3.5 h-3.5 rounded-full border-2 ${dotCls}`} />
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-serif font-semibold text-brand-dark text-sm">{r.round}</span>
                <span className="text-brand-dark/40 text-xs">·</span>
                <span className="text-brand-dark/60 text-xs">{r.date}</span>
                <span className="ml-auto font-serif font-bold text-brand-dark tabular-nums">{r.amount}</span>
              </div>
              {(r.leadInvestor || r.valuation) && (
                <div className="text-xs text-brand-dark/50 mt-0.5">
                  {r.leadInvestor && <span>Led by <span className="text-brand-dark/70">{r.leadInvestor}</span></span>}
                  {r.leadInvestor && r.valuation && <span className="mx-1.5 text-brand-dark/30">·</span>}
                  {r.valuation && <span>Valuation: <span className="text-brand-dark/70">{r.valuation}</span></span>}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
