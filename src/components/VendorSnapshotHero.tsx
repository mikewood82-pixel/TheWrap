import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Star, Users, Briefcase, HeadphonesIcon, Building2, Shield } from 'lucide-react'
import type { Vendor } from '../data/vendors'
import type { VendorDetail } from '../data/vendorDetails'

type HealthVerdict = 'trending_up' | 'stable' | 'slowing' | 'freeze'

type Tone = 'good' | 'neutral' | 'warn' | 'bad' | 'muted'

const toneClasses: Record<Tone, { bg: string; text: string; border: string; pill: string }> = {
  good:    { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  pill: 'bg-green-100 text-green-800' },
  neutral: { bg: 'bg-brand-cream/40', text: 'text-brand-dark', border: 'border-brand-cream', pill: 'bg-brand-cream text-brand-dark/70' },
  warn:    { bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-200',  pill: 'bg-amber-100 text-amber-800' },
  bad:     { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    pill: 'bg-red-100 text-red-800' },
  muted:   { bg: 'bg-brand-surface', text: 'text-brand-muted', border: 'border-brand-border', pill: 'bg-brand-border text-brand-muted' },
}

interface TileProps {
  icon: React.ReactNode
  label: string
  value: string
  pill?: string
  tone: Tone
  trend?: 'up' | 'down' | 'flat'
}

function Tile({ icon, label, value, pill, tone, trend }: TileProps) {
  const t = toneClasses[tone]
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : trend === 'flat' ? Minus : null
  return (
    <div className={`${t.bg} ${t.border} border rounded-xl p-4 flex flex-col gap-1.5 min-h-[110px]`}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-brand-dark/50">
        <span className={t.text}>{icon}</span>
        {label}
      </div>
      <div className="flex items-baseline gap-2 mt-auto">
        <span className={`font-serif text-2xl font-bold ${t.text} leading-none`}>{value}</span>
        {TrendIcon && <TrendIcon size={14} className={t.text} />}
      </div>
      {pill && (
        <span className={`${t.pill} text-[10px] font-semibold px-2 py-0.5 rounded-full self-start uppercase tracking-wide`}>
          {pill}
        </span>
      )}
    </div>
  )
}

function ratingTone(delta: number): { tone: Tone; trend: 'up' | 'down' | 'flat' } {
  if (delta >= 0.1)  return { tone: 'good', trend: 'up' }
  if (delta <= -0.2) return { tone: 'bad',  trend: 'down' }
  if (delta < 0)     return { tone: 'warn', trend: 'down' }
  return { tone: 'neutral', trend: 'flat' }
}

function hiringTone(verdict: HealthVerdict | null | undefined): { tone: Tone; pill: string; trend: 'up' | 'down' | 'flat' } {
  switch (verdict) {
    case 'trending_up': return { tone: 'good',    pill: 'Trending up',  trend: 'up' }
    case 'stable':      return { tone: 'neutral', pill: 'Stable',       trend: 'flat' }
    case 'slowing':     return { tone: 'warn',    pill: 'Slowing',      trend: 'down' }
    case 'freeze':      return { tone: 'bad',     pill: 'Freeze',       trend: 'down' }
    default:            return { tone: 'muted',   pill: 'Not enough data', trend: 'flat' }
  }
}

function supportTone(score: number | undefined): Tone {
  if (score === undefined) return 'muted'
  if (score >= 75) return 'good'
  if (score >= 60) return 'warn'
  return 'bad'
}

function riskTone(risk: string | undefined): Tone {
  switch (risk) {
    case 'Low':    return 'good'
    case 'Medium': return 'warn'
    case 'High':   return 'bad'
    default:       return 'muted'
  }
}

function fundingTone(stage: string | undefined): Tone {
  if (!stage) return 'muted'
  if (stage.toLowerCase().startsWith('public')) return 'good'
  return 'neutral'
}

interface VendorSnapshotHeroProps {
  vendor: Vendor
  details?: VendorDetail
  g2Delta: number
  glassdoorDelta: number
}

type VendorsApiResp = {
  vendors: Array<{
    slug: string
    open_jobs: number
    health: { verdict: HealthVerdict; ratio: number; days_of_data: number } | null
  }>
}

export default function VendorSnapshotHero({ vendor, details, g2Delta, glassdoorDelta }: VendorSnapshotHeroProps) {
  const [openJobs, setOpenJobs] = useState<number | null>(null)
  const [verdict, setVerdict] = useState<HealthVerdict | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetch('/api/jobs/vendors')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((data: VendorsApiResp) => {
        if (cancelled) return
        const match = data.vendors.find(v => v.slug === vendor.slug)
        setOpenJobs(match?.open_jobs ?? 0)
        setVerdict(match?.health?.verdict ?? null)
      })
      .catch(() => {
        if (!cancelled) {
          setOpenJobs(null)
          setVerdict(null)
        }
      })
    return () => { cancelled = true }
  }, [vendor.slug])

  const g2 = ratingTone(g2Delta)
  const gd = ratingTone(glassdoorDelta)
  const hiring = hiringTone(verdict)
  const support = supportTone(details?.supportQuality?.overallScore)
  const supportScore = details?.supportQuality?.overallScore
  const fundStage = details?.financialHealth?.fundingStage
  const acqRisk = details?.financialHealth?.acquisitionRisk

  // Truncate funding stage label so the tile doesn't blow up.
  const fundingLabel = fundStage
    ? fundStage.length > 18 ? fundStage.split(' ')[0] : fundStage
    : '—'

  return (
    <div id="snapshot" className="mb-8">
      <div className="text-[10px] uppercase tracking-widest font-semibold text-brand-terracotta mb-3">
        Vendor Snapshot
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Tile
          icon={<Star size={12} />}
          label="G2"
          value={vendor.g2.toFixed(1)}
          pill={`${g2Delta >= 0 ? '+' : ''}${g2Delta.toFixed(1)} 6mo`}
          tone={g2.tone}
          trend={g2.trend}
        />
        <Tile
          icon={<Users size={12} />}
          label="Glassdoor"
          value={vendor.glassdoor.toFixed(1)}
          pill={`${glassdoorDelta >= 0 ? '+' : ''}${glassdoorDelta.toFixed(1)} 6mo`}
          tone={gd.tone}
          trend={gd.trend}
        />
        <Tile
          icon={<Briefcase size={12} />}
          label="Hiring"
          value={openJobs === null ? '—' : openJobs.toString()}
          pill={hiring.pill}
          tone={hiring.tone}
          trend={hiring.trend}
        />
        <Tile
          icon={<HeadphonesIcon size={12} />}
          label="Support"
          value={supportScore !== undefined ? `${supportScore}` : '—'}
          pill={details?.supportQuality?.supportTrend ?? (supportScore !== undefined ? '/100' : 'No data')}
          tone={support}
        />
        <Tile
          icon={<Building2 size={12} />}
          label="Funding"
          value={fundingLabel}
          pill={fundStage && fundStage.length > 18 ? fundStage.replace(/^[^\s]+\s*/, '').replace(/[()]/g, '').slice(0, 18) : ' '}
          tone={fundingTone(fundStage)}
        />
        <Tile
          icon={<Shield size={12} />}
          label="Acq risk"
          value={acqRisk ?? '—'}
          pill={acqRisk ? `${acqRisk} risk` : 'No data'}
          tone={riskTone(acqRisk)}
        />
      </div>
    </div>
  )
}
