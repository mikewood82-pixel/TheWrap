import { Link } from 'react-router-dom'
import { SignInButton, useAuth } from '@clerk/clerk-react'
import { ArrowLeft, Bookmark, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import JobCard, { type JobListItem } from '../components/jobs/JobCard'
import { FEATURES } from '../config/features'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useWatchlist } from '../context/WatchlistContext'

/**
 * /jobs/saved — Wrap+ members' personal watchlist.
 *
 * Three access states, handled inline rather than via route-level redirect so
 * a signed-out viewer who hits the URL directly gets a useful prompt rather
 * than a 404 or silent navigation away.
 */
export default function SavedJobsPage() {
  // Same global guard as the rest of Plus-tier surfaces — route is registered
  // but renders a "not available yet" shell when PLUS_ENABLED=false so that
  // existing URLs don't 404 when we eventually launch.
  if (!FEATURES.PLUS_ENABLED) return <ComingSoon />

  return <Gate />
}

function Gate() {
  const { isPro, isLoaded: plusLoaded } = useWrapPlus()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()

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
            Roles you've bookmarked. Only visible to you.
          </p>
        </header>

        {!plusLoaded || !authLoaded ? (
          <div className="text-brand-muted text-sm">Loading...</div>
        ) : !isSignedIn ? (
          <SignedOutPrompt />
        ) : !isPro ? (
          <UpgradePrompt />
        ) : (
          <WatchlistView />
        )}
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

function UpgradePrompt() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200 rounded-xl p-8 text-center">
      <Bookmark size={28} className="mx-auto text-brand-terracotta mb-3" />
      <h2 className="font-serif text-2xl text-brand-dark mb-2">Saved jobs is a Wrap+ feature</h2>
      <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
        Track roles you're interested in across the HR tech vendors we cover.
        Your watchlist stays private and persists across sessions.
      </p>
      <Link
        to="/subscribe"
        className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors"
      >
        Upgrade to Wrap+ <ArrowRight size={16} />
      </Link>
    </div>
  )
}

function SignedOutPrompt() {
  return (
    <div className="bg-white border border-brand-border rounded-xl p-8 text-center">
      <Bookmark size={28} className="mx-auto text-brand-border mb-3" />
      <h2 className="font-serif text-2xl text-brand-dark mb-2">Sign in to see your saved jobs</h2>
      <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
        Saved jobs is a Wrap+ feature — sign in with your account to continue.
      </p>
      <SignInButton mode="modal">
        <button className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors">
          Sign in <ArrowRight size={16} />
        </button>
      </SignInButton>
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
