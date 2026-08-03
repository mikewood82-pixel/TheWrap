import { Link } from 'react-router-dom'
import { ArrowLeft, Bookmark, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import JobCard, { type JobListItem } from '../components/jobs/JobCard'
import { FEATURES } from '../config/features'
import { useWatchlist } from '../context/WatchlistContext'

/**
 * /jobs/saved — this browser's personal watchlist.
 *
 * No sign-in: saved jobs are keyed on the anonymous wrap_anon cookie and open
 * to everyone. WatchlistView handles its own loading/empty states.
 */
export default function SavedJobsPage() {
  // Route is registered but renders a "not available yet" shell when
  // PLUS_ENABLED=false so existing URLs don't 404.
  if (!FEATURES.PLUS_ENABLED) return <ComingSoon />

  return (
    <div className="bg-brand-light min-h-screen">
      <SEO
        title="Saved jobs — The Wrap"
        description="Your saved HR tech roles on The Wrap."
      />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-terracotta mb-6"
        >
          <ArrowLeft size={14} /> All jobs
        </Link>

        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-brand-dark">Saved jobs</h1>
          <p className="mt-2 text-brand-muted">
            Roles you've bookmarked on this device. Only visible to you.
          </p>
        </header>

        <WatchlistView />
      </div>
    </div>
  )
}

function WatchlistView() {
  const { savedJobs, hydrated } = useWatchlist()

  if (!hydrated || savedJobs === null) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-brand-border rounded-lg h-[108px] animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (savedJobs.length === 0) {
    return (
      <div className="bg-white border border-brand-border rounded-lg p-10 text-center">
        <Bookmark size={28} className="mx-auto text-brand-border mb-3" />
        <p className="font-serif text-xl text-brand-dark mb-1">No saved jobs yet</p>
        <p className="text-sm text-brand-muted mb-5 max-w-md mx-auto">
          Click the bookmark icon on any role to save it here. Your watchlist
          stays private and persists across sessions.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-terracotta hover:underline"
        >
          Browse open roles <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {savedJobs.map(j => {
        const isClosed = j.status !== 'open'
        // JobCard doesn't know about `status`; wrap closed entries in an
        // opacity dimmer + a small closed tag above so the signal is obvious
        // without changing the shared card component.
        return (
          <div key={j.id} className={isClosed ? 'opacity-60' : ''}>
            {isClosed && (
              <div className="text-[10px] font-semibold tracking-wide uppercase text-red-700 bg-red-50 border border-red-200 rounded-t-lg border-b-0 px-3 py-1">
                Role closed
              </div>
            )}
            <JobCard job={j as JobListItem} />
          </div>
        )
      })}
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl text-brand-dark mb-3">Saved jobs</h1>
        <p className="text-brand-muted">
          Coming soon with Wrap+. <Link to="/jobs" className="text-brand-terracotta hover:underline">Back to jobs</Link>
        </p>
      </div>
    </div>
  )
}
