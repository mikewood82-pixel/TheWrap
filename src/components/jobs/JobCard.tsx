import { Link } from 'react-router-dom'
import { MapPin, Briefcase } from 'lucide-react'
import BookmarkButton from './BookmarkButton'

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
  const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
  const href = `/jobs/${job.id}/${slug}`

  // Some ATSes (e.g. Greenhouse at Gusto) return multi-site locations joined
  // by semicolons. Show the first and a "+N more" hint so the card stays tight.
  const locationLabel = formatLocation(job.location)

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
            {locationLabel && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {locationLabel}
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
        <div className="flex items-center gap-1 shrink-0">
          <RoleAgeBadge firstSeenAt={job.first_seen_at} postedAt={job.posted_at} />
          <BookmarkButton jobId={job.id} size="sm" />
        </div>
      </div>
    </Link>
  )
}

// Visible signal for how long a role has been open. "Open" is measured from
// the earliest of posted_at and first_seen_at so stale ATS postings we've only
// just started tracking still surface as stale, not fresh.
//
//   < 7 days   → no badge (fresh; informational clutter)
//   7 - 30 d   → muted "Posted Nd ago"
//   31 - 60 d  → amber pill "Nd old"
//   > 60 d     → red pill "Open 60+ days"
export function RoleAgeBadge({
  firstSeenAt,
  postedAt,
}: {
  firstSeenAt: string
  postedAt: string | null
}) {
  const days = daysOpen(firstSeenAt, postedAt)
  if (days < 7) return null
  if (days <= 30) {
    return <span className="text-xs text-brand-muted shrink-0">Posted {days}d ago</span>
  }
  if (days <= 60) {
    return (
      <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5 shrink-0">
        {days}d old
      </span>
    )
  }
  return (
    <span className="text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 rounded-full px-2 py-0.5 shrink-0">
      Open 60+ days
    </span>
  )
}

export function daysOpen(firstSeenAt: string, postedAt: string | null): number {
  const fs = new Date(firstSeenAt).getTime()
  const pa = postedAt ? new Date(postedAt).getTime() : NaN
  const earliest = Number.isNaN(pa) ? fs : Math.min(fs, pa)
  return Math.max(0, Math.floor((Date.now() - earliest) / 86_400_000))
}

function formatLocation(raw: string | null): string | null {
  if (!raw) return null
  const parts = raw.split(';').map(s => s.trim()).filter(Boolean)
  if (parts.length <= 1) return parts[0] ?? null
  return `${parts[0]} +${parts.length - 1} more`
}

function RemotePill({ v }: { v: string }) {
  const label = v === 'remote' ? 'Remote' : v === 'hybrid' ? 'Hybrid' : v === 'onsite' ? 'On-site' : v
  const cls =
    v === 'remote' ? 'bg-green-50 text-green-800 border-green-200' :
    v === 'hybrid' ? 'bg-amber-50 text-amber-800 border-amber-200' :
    'bg-slate-50 text-slate-700 border-slate-200'
  return <span className={`px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${cls}`}>{label}</span>
}
