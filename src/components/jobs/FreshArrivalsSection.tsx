import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { FEATURES } from '../../config/features'
import JobCard, { type JobListItem } from './JobCard'

const FRESH_HOURS = 24
const PREVIEW_LIMIT = 6

/**
 * "Early-bird" feed surfaced above the main /jobs listing — the 6 most recent
 * roles from the past 24h. Free for everyone (the old Wrap+ paywall variant
 * was retired with sign-in on 2026-08-03).
 *
 * Renders nothing when there are zero fresh roles — an empty "Fresh arrivals"
 * section would read as broken rather than as a quiet day. Data comes from the
 * public /api/jobs/search?fresh_hours=24 endpoint.
 */
export default function FreshArrivalsSection() {
  if (!FEATURES.PLUS_ENABLED) return null
  return <Inner />
}

function Inner() {
  const [jobs, setJobs] = useState<JobListItem[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(
      `/api/jobs/search?fresh_hours=${FRESH_HOURS}&per_page=${PREVIEW_LIMIT}`,
      { signal: ctrl.signal },
    )
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { jobs: JobListItem[]; total: number }) => {
        setJobs(d.jobs)
        setTotal(d.total)
        setLoading(false)
      })
      .catch(e => {
        if ((e as Error).name === 'AbortError') return
        setLoading(false)
      })
    return () => ctrl.abort()
  }, [])

  // No fresh roles → hide entirely.
  if (!loading && (total === null || total === 0)) return null

  return <ProView jobs={jobs} total={total ?? 0} loading={loading} />
}

function ProView({
  jobs,
  total,
  loading,
}: {
  jobs: JobListItem[]
  total: number
  loading: boolean
}) {
  return (
    <section className="mb-8 bg-gradient-to-br from-amber-50/70 to-brand-surface border border-amber-200 rounded-xl p-5 md:p-6">
      <header className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand-terracotta" />
          <h2 className="font-serif text-xl font-bold text-brand-dark">Fresh arrivals</h2>
          <span className="text-[10px] font-bold bg-brand-gold text-brand-dark rounded-full px-2 py-0.5 tracking-wide">
            WRAP+
          </span>
        </div>
        <p className="text-xs text-brand-muted">
          {total.toLocaleString()} role{total === 1 ? '' : 's'} added in the past {FRESH_HOURS}h
        </p>
      </header>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: PREVIEW_LIMIT }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-brand-border rounded-lg h-[92px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobs.map(j => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </section>
  )
}
