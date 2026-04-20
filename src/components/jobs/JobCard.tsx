import { Link } from 'react-router-dom'
import { MapPin, Briefcase } from 'lucide-react'

export type JobListItem = {
  id: number
  vendor_slug: string
  vendor_name: string | null
  title: string
  department: string | null
  location: string | null
  remote: string
  seniority: string
  employment_type: string | null
  url: string
  posted_at: string | null
  first_seen_at: string
}

export default function JobCard({ job }: { job: JobListItem }) {
  const posted = job.posted_at ?? job.first_seen_at
  const daysAgo = Math.max(0, Math.floor((Date.now() - new Date(posted).getTime()) / 86_400_000))
  const timeLabel =
    daysAgo === 0 ? 'today' :
    daysAgo === 1 ? '1 day ago' :
    daysAgo < 30 ? `${daysAgo} days ago` :
    `${Math.floor(daysAgo / 30)} mo ago`

  const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
  const href = `/jobs/${job.id}/${slug}`

  return (
    <Link
      to={href}
      className="block bg-white border border-brand-border rounded-lg p-5 hover:border-brand-terracotta/60 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg text-brand-dark font-semibold leading-snug">
            {job.title}
          </h3>
          {job.vendor_name && (
            <p className="text-sm text-brand-terracotta font-medium mt-0.5">
              {job.vendor_name}
            </p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-brand-muted">
            {job.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {job.location}
              </span>
            )}
            {job.department && (
              <span className="flex items-center gap-1">
                <Briefcase size={12} />
                {job.department}
              </span>
            )}
            {job.remote && job.remote !== 'unknown' && <RemotePill v={job.remote} />}
            {job.seniority && job.seniority !== 'unknown' && <span className="capitalize">{job.seniority}</span>}
          </div>
        </div>
        <span className="text-xs text-brand-muted shrink-0">{timeLabel}</span>
      </div>
    </Link>
  )
}

function RemotePill({ v }: { v: string }) {
  const label = v === 'remote' ? 'Remote' : v === 'hybrid' ? 'Hybrid' : v === 'onsite' ? 'On-site' : v
  const cls =
    v === 'remote' ? 'bg-green-50 text-green-800 border-green-200' :
    v === 'hybrid' ? 'bg-amber-50 text-amber-800 border-amber-200' :
    'bg-slate-50 text-slate-700 border-slate-200'
  return <span className={`px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${cls}`}>{label}</span>
}
