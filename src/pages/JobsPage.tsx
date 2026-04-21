import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Rss, Bookmark, Bell } from 'lucide-react'
import SEO from '../components/SEO'
import JobCard, { type JobListItem } from '../components/jobs/JobCard'
import JobsFilters, { EMPTY_FILTERS, type JobsFilterState } from '../components/jobs/JobsFilters'
import FreshArrivalsSection from '../components/jobs/FreshArrivalsSection'
import SaveSearchButton from '../components/jobs/SaveSearchButton'
import { FEATURES } from '../config/features'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useWatchlist } from '../context/WatchlistContext'

type SearchResponse = { jobs: JobListItem[]; total: number; page: number; per_page: number }
type VendorOpt = { slug: string; name: string; open_jobs: number }

// URL <-> filter serialization keeps the page shareable and back-button friendly.
function filtersFromParams(p: URLSearchParams): JobsFilterState {
  return {
    q:           p.get('q') ?? '',
    vendors:     (p.get('vendor')    ?? '').split(',').filter(Boolean),
    remote:      (p.get('remote')    ?? '').split(',').filter(Boolean),
    seniority:   (p.get('seniority') ?? '').split(',').filter(Boolean),
    location:    p.get('location') ?? '',
    postedSince: parseInt(p.get('posted_since') ?? '0', 10) || 0,
  }
}
function filtersToParams(f: JobsFilterState, page: number): URLSearchParams {
  const p = new URLSearchParams()
  if (f.q)                p.set('q', f.q)
  if (f.vendors.length)   p.set('vendor', f.vendors.join(','))
  if (f.remote.length)    p.set('remote', f.remote.join(','))
  if (f.seniority.length) p.set('seniority', f.seniority.join(','))
  if (f.location)         p.set('location', f.location)
  if (f.postedSince)      p.set('posted_since', String(f.postedSince))
  if (page > 1)           p.set('page', String(page))
  return p
}

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<JobsFilterState>(() => filtersFromParams(searchParams))
  const [page, setPage] = useState<number>(() => parseInt(searchParams.get('page') ?? '1', 10) || 1)
  const [searchInput, setSearchInput] = useState(filters.q)
  const [vendorOptions, setVendorOptions] = useState<VendorOpt[]>([])
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const firstRender = useRef(true)

  // Keep URL in sync with state (shallow push so back button works).
  useEffect(() => {
    const next = filtersToParams(filters, page)
    if (next.toString() !== searchParams.toString()) setSearchParams(next, { replace: firstRender.current })
    firstRender.current = false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page])

  // Load vendor counts once.
  useEffect(() => {
    fetch('/api/jobs/vendors')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((d: { vendors: VendorOpt[] }) => setVendorOptions(d.vendors))
      .catch(() => { /* non-fatal */ })
  }, [])

  // Debounce q while the user types; everything else applies immediately.
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== filters.q) { setFilters(f => ({ ...f, q: searchInput })); setPage(1) }
    }, 250)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  // Fetch results when filters/page change.
  useEffect(() => {
    const ctrl = new AbortController()
    const p = filtersToParams(filters, page)
    setLoading(true); setError(null)
    fetch(`/api/jobs/search?${p.toString()}`, { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject(`${r.status}`))
      .then((d: SearchResponse) => { setData(d); setLoading(false) })
      .catch(e => {
        if ((e as Error).name === 'AbortError') return
        setError(String(e)); setLoading(false)
      })
    return () => ctrl.abort()
  }, [filters, page])

  const rssHref = useMemo(() => {
    const p = filtersToParams(filters, 1)
    p.delete('page')
    const s = p.toString()
    return `/api/jobs/rss${s ? `?${s}` : ''}`
  }, [filters])

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.per_page)) : 1

  return (
    <div className="bg-brand-light min-h-screen">
      <SEO
        title="HR Tech Jobs — The Wrap"
        description="Search open roles at the HR tech vendors The Wrap tracks — ATSes, HCMs, payroll, people analytics, and more. Updated daily."
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl text-brand-dark">HR Tech Jobs</h1>
            <p className="mt-2 text-brand-muted">
              Open roles from the HR tech vendors we track — aggregated daily, no recruiter spam.
            </p>
          </div>
          <SavedJobsLink />
        </header>

        {/* Search bar + RSS */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search titles, teams, locations..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-border rounded-lg focus:outline-none focus:border-brand-terracotta"
            />
          </div>
          <SaveSearchButton filters={filters} />
          <a
            href={rssHref}
            title="RSS feed for the current filters"
            className="flex items-center gap-1.5 px-3 py-2.5 border border-brand-border rounded-lg bg-white text-brand-muted hover:text-brand-terracotta hover:border-brand-terracotta transition-colors text-sm"
          >
            <Rss size={14} /> RSS
          </a>
        </div>

        {/* Wrap+ Early-bird feed. Self-gates on FEATURES.PLUS_ENABLED + useWrapPlus,
            so this render is a no-op until Plus launches and the viewer is a member
            (otherwise shows a paywall card with the live 24h role count). */}
        <FreshArrivalsSection />

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
          <JobsFilters
            filters={filters}
            vendorOptions={vendorOptions}
            onChange={f => { setFilters(f); setPage(1) }}
          />

          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-brand-muted">
                {loading ? 'Loading...' :
                 error ? <span className="text-red-600">{error}</span> :
                 `${data?.total.toLocaleString() ?? 0} open roles`}
              </p>
            </div>

            <div className="space-y-3">
              {(data?.jobs ?? []).map(j => <JobCard key={j.id} job={j} />)}
              {!loading && !data?.jobs.length && (
                <div className="bg-white border border-brand-border rounded-lg p-8 text-center">
                  <p className="text-brand-muted">No roles match these filters.</p>
                  <button
                    onClick={() => { setFilters(EMPTY_FILTERS); setSearchInput(''); setPage(1) }}
                    className="mt-3 text-sm text-brand-terracotta hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-2 mt-8 text-sm">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1.5 border border-brand-border rounded-md bg-white hover:border-brand-terracotta disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-brand-muted px-2">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 border border-brand-border rounded-md bg-white hover:border-brand-terracotta disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

/**
 * Plus-only quick links in the page header ("Saved (N)" + "Alerts"). Renders
 * nothing when Plus is disabled globally or the viewer isn't Plus, so the
 * free/public header stays unchanged.
 */
function SavedJobsLink() {
  const { isPro, isLoaded } = useWrapPlus()
  const { savedIds } = useWatchlist()

  if (!FEATURES.PLUS_ENABLED || !isLoaded || !isPro) return null

  return (
    <div className="shrink-0 mt-1 flex flex-wrap gap-2 justify-end">
      <Link
        to="/jobs/saved"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-brand-border rounded-lg bg-white text-brand-muted hover:text-brand-terracotta hover:border-brand-terracotta transition-colors"
      >
        <Bookmark size={14} />
        Saved{savedIds.size > 0 ? ` (${savedIds.size})` : ''}
      </Link>
      <Link
        to="/jobs/alerts"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-brand-border rounded-lg bg-white text-brand-muted hover:text-brand-terracotta hover:border-brand-terracotta transition-colors"
      >
        <Bell size={14} />
        Alerts
      </Link>
    </div>
  )
}
