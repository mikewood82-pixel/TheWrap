import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'
import type { JobListItem } from './JobCard'
import JobCard from './JobCard'

type SearchResponse = { jobs: JobListItem[]; total: number }

// Drops into any vendor page. Self-contained — fetches on mount, renders
// nothing (no skeleton shimmer, no empty-state box) if this vendor has zero
// tracked open jobs. That keeps the page quiet for vendors we don't ingest.
export default function VendorOpenRoles({ vendorSlug, vendorName }: { vendorSlug: string; vendorName?: string }) {
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(`/api/jobs/search?vendor=${encodeURIComponent(vendorSlug)}&per_page=5`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((d: SearchResponse) => { setData(d); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [vendorSlug])

  if (!loaded) return null
  if (!data || data.total === 0) return null

  return (
    <section className="border-t border-brand-border pt-8 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl text-brand-dark flex items-center gap-2">
          <Briefcase size={20} className="text-brand-terracotta" />
          Open roles{vendorName ? ` at ${vendorName}` : ''}
        </h2>
        <Link
          to={`/jobs?vendor=${encodeURIComponent(vendorSlug)}`}
          className="text-sm text-brand-terracotta hover:underline"
        >
          See all {data.total} →
        </Link>
      </div>
      <div className="space-y-3">
        {data.jobs.map(j => <JobCard key={j.id} job={j} />)}
      </div>
    </section>
  )
}
