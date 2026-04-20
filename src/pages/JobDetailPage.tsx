import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ExternalLink, MapPin, Briefcase } from 'lucide-react'
import SEO from '../components/SEO'

type Job = {
  id: number
  external_id: string
  vendor_slug: string
  vendor_name: string | null
  ats_source: string
  title: string
  department: string | null
  location: string | null
  remote: string
  employment_type: string | null
  seniority: string
  url: string
  description_html: string | null
  posted_at: string | null
  first_seen_at: string
  status: string
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string; slug: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    if (!id) return
    fetch(`/api/jobs/${encodeURIComponent(id)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((d: Job) => { setJob(d); setState('ready') })
      .catch(() => setState('missing'))
  }, [id])

  const onApply = () => {
    if (!job) return
    // Fire-and-forget; don't block the redirect.
    fetch('/api/jobs/track-apply', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ job_id: job.id }),
      keepalive: true,
    }).catch(() => {})
  }

  if (state === 'loading') return <Shell><p className="text-brand-muted">Loading...</p></Shell>
  if (state === 'missing' || !job) return (
    <Shell>
      <p className="text-brand-muted">This role is no longer available.</p>
      <Link to="/jobs" className="inline-block mt-4 text-brand-terracotta hover:underline">← Back to all jobs</Link>
    </Shell>
  )

  const posted = job.posted_at ?? job.first_seen_at
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description_html ?? job.title,
    datePosted: posted,
    employmentType: job.employment_type ?? undefined,
    hiringOrganization: job.vendor_name ? {
      '@type': 'Organization',
      name: job.vendor_name,
    } : undefined,
    jobLocation: job.location ? {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: job.location },
    } : undefined,
    jobLocationType: job.remote === 'remote' ? 'TELECOMMUTE' : undefined,
    directApply: false,
    url: job.url,
  }

  return (
    <Shell>
      <SEO
        title={`${job.title}${job.vendor_name ? ` at ${job.vendor_name}` : ''} — The Wrap Jobs`}
        description={(job.description_html ?? '').replace(/<[^>]+>/g, '').slice(0, 160)}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-terracotta mb-6">
        <ArrowLeft size={14} /> All jobs
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl text-brand-dark leading-tight">{job.title}</h1>
      {job.vendor_name && (
        <Link
          to={`/vendors/${job.vendor_slug}`}
          className="inline-block mt-2 text-lg text-brand-terracotta font-medium hover:underline"
        >
          {job.vendor_name}
        </Link>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-brand-muted">
        {job.location && <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>}
        {job.department && <span className="flex items-center gap-1"><Briefcase size={14} />{job.department}</span>}
        {job.remote !== 'unknown' && <span className="capitalize">· {job.remote}</span>}
        {job.seniority !== 'unknown' && <span className="capitalize">· {job.seniority}</span>}
        {job.employment_type && <span>· {job.employment_type.replace(/_/g, ' ')}</span>}
      </div>

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onApply}
        className="inline-flex items-center gap-2 mt-6 bg-brand-terracotta text-white font-semibold px-5 py-3 rounded-lg hover:bg-brand-orange transition-colors"
      >
        Apply on {job.vendor_name ?? 'company site'}
        <ExternalLink size={16} />
      </a>

      {job.description_html && (
        <article
          className="prose prose-brand max-w-none mt-10 prose-a:text-brand-terracotta"
          // Description comes from a trusted ATS API — rendered as-is; our own
          // page renders it inside an isolated article element.
          dangerouslySetInnerHTML={{ __html: job.description_html }}
        />
      )}
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">{children}</div>
    </div>
  )
}
