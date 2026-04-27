import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Briefcase, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type FunctionKey = 'Engineering' | 'Product' | 'Sales' | 'CS' | 'Marketing' | 'Design' | 'Ops' | 'Other'

interface PulseData {
  slug: string
  open_jobs: number
  delta_30d: number | null
  delta_90d: number | null
  sparkline: { date: string; open_jobs: number }[]
  functions: Partial<Record<FunctionKey, number>>
  remote: Record<string, number>
  seniority: Record<string, number>
  health: { verdict: string; ratio: number; days_of_data: number } | null
}

interface Props {
  slug: string
  vendorName: string
}

// Display order for the function bar — most-common roles first.
const FUNCTION_ORDER: FunctionKey[] = ['Engineering', 'Sales', 'Product', 'Design', 'Marketing', 'CS', 'Ops', 'Other']

const FUNCTION_COLORS: Record<FunctionKey, string> = {
  Engineering: 'bg-brand-terracotta',
  Sales:       'bg-brand-gold',
  Product:     'bg-blue-500',
  Design:      'bg-purple-500',
  Marketing:   'bg-pink-500',
  CS:          'bg-emerald-500',
  Ops:         'bg-slate-500',
  Other:       'bg-brand-dark/30',
}

function Sparkline({ points }: { points: { date: string; open_jobs: number }[] }) {
  if (points.length < 2) {
    return <div className="text-xs text-brand-dark/30 italic h-16 flex items-center">Not enough snapshots yet to draw a trend.</div>
  }
  const W = 600, H = 64
  const pad = 4
  const cW = W - pad * 2, cH = H - pad * 2
  const values = points.map(p => p.open_jobs)
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  const range = (maxV - minV) || 1

  const x = (i: number) => pad + (i / (points.length - 1)) * cW
  const y = (v: number) => pad + cH - ((v - minV) / range) * cH

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.open_jobs).toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${x(points.length - 1).toFixed(1)},${(pad + cH).toFixed(1)} L${x(0).toFixed(1)},${(pad + cH).toFixed(1)} Z`
  const trend = values[values.length - 1] - values[0]
  const color = trend >= 0 ? '#16a34a' : '#dc2626'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      <path d={areaPath} fill={color} fillOpacity={0.08} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function FunctionBar({ functions, total }: { functions: PulseData['functions']; total: number }) {
  if (total === 0) return null
  const segments = FUNCTION_ORDER
    .map(k => ({ key: k, count: functions[k] ?? 0 }))
    .filter(s => s.count > 0)

  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden bg-brand-cream mb-3">
        {segments.map(s => (
          <div
            key={s.key}
            className={FUNCTION_COLORS[s.key]}
            style={{ width: `${(s.count / total) * 100}%` }}
            title={`${s.key}: ${s.count} (${Math.round((s.count / total) * 100)}%)`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {segments.map(s => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${FUNCTION_COLORS[s.key]}`} />
            <span className="text-brand-dark/70">{s.key}</span>
            <span className="text-brand-dark/40 tabular-nums">{Math.round((s.count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeltaPill({ label, delta }: { label: string; delta: number | null }) {
  if (delta === null) {
    return (
      <div className="flex flex-col">
        <div className="text-[10px] uppercase tracking-wider text-brand-dark/40">{label}</div>
        <div className="text-sm text-brand-dark/30 italic">No data</div>
      </div>
    )
  }
  const sign = delta > 0 ? '+' : ''
  const cls = delta > 0 ? 'text-green-700' : delta < 0 ? 'text-red-600' : 'text-brand-dark/60'
  const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : null
  return (
    <div className="flex flex-col">
      <div className="text-[10px] uppercase tracking-wider text-brand-dark/40">{label}</div>
      <div className={`text-sm font-semibold flex items-center gap-1 ${cls}`}>
        {Icon && <Icon size={13} />}
        <span className="tabular-nums">{sign}{delta}</span>
        <span className="text-brand-dark/40 font-normal">roles</span>
      </div>
    </div>
  )
}

export default function VendorHiringPulse({ slug, vendorName }: Props) {
  const [data, setData] = useState<PulseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true); setError(false)
    fetch(`/api/jobs/vendors/${slug}/pulse`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((d: PulseData) => { if (!cancelled) setData(d) })
      .catch(() => { if (!cancelled) setError(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <div id="hiring" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
        <div className="h-4 w-32 bg-brand-cream rounded mb-4 animate-pulse" />
        <div className="h-16 bg-brand-cream/40 rounded mb-3 animate-pulse" />
        <div className="h-3 w-full bg-brand-cream rounded animate-pulse" />
      </div>
    )
  }

  // If the vendor isn't tracked in the jobs DB at all (404 or zero rows + no
  // snapshots), suppress the section rather than render an empty shell.
  if (error || !data || (data.open_jobs === 0 && data.sparkline.length === 0)) {
    return null
  }

  const remoteTotal = Object.values(data.remote).reduce((a, b) => a + b, 0)
  const remoteCount = data.remote['remote'] ?? 0
  const remotePct = remoteTotal > 0 ? Math.round((remoteCount / remoteTotal) * 100) : null

  const functionTotal = Object.values(data.functions).reduce<number>((a, b) => a + (b ?? 0), 0)

  return (
    <div id="hiring" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Hiring Pulse</span>
        <span className="text-[10px] text-brand-dark/30 ml-auto">Live · updated daily</span>
      </div>

      {/* Top row: open jobs total + 30d/90d delta + remote % */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-5">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-4xl font-bold text-brand-dark tabular-nums">{data.open_jobs}</span>
          <span className="text-sm text-brand-dark/50">open roles</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <DeltaPill label="vs 30d ago" delta={data.delta_30d} />
          <DeltaPill label="vs 90d ago" delta={data.delta_90d} />
          {remotePct !== null && (
            <div className="flex flex-col">
              <div className="text-[10px] uppercase tracking-wider text-brand-dark/40">Remote-eligible</div>
              <div className="text-sm font-semibold flex items-center gap-1 text-brand-dark">
                <MapPin size={13} className="text-brand-dark/40" />
                <span className="tabular-nums">{remotePct}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-5">
        <Sparkline points={data.sparkline} />
        <div className="flex justify-between text-[10px] text-brand-dark/30 mt-1 font-medium">
          <span>{data.sparkline[0]?.date ?? ''}</span>
          <span>Open roles · last 30 days</span>
          <span>{data.sparkline[data.sparkline.length - 1]?.date ?? ''}</span>
        </div>
      </div>

      {/* Function mix */}
      {functionTotal > 0 && (
        <div className="pt-5 border-t border-brand-cream">
          <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-3">Hiring mix by function</div>
          <FunctionBar functions={data.functions} total={functionTotal} />
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-brand-cream flex items-center justify-between">
        <p className="text-xs text-brand-dark/30">
          Sources: live feeds from {vendorName}'s ATS, ingested daily. Function classification is heuristic — title-based.
        </p>
        <Link
          to={`/jobs?vendor=${slug}`}
          className="text-xs font-semibold text-brand-terracotta hover:underline flex items-center gap-1 shrink-0 ml-4"
        >
          See open roles <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  )
}
