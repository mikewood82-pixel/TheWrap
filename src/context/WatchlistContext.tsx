import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ReactNode,
} from 'react'
import { useAuthedFetch, useWrapPlus } from './WrapPlusContext'
import type { JobListItem } from '../components/jobs/JobCard'

/**
 * A saved job as returned by GET /api/jobs/watchlist — the JobListItem shape
 * plus the fields we joined in from the jobs table (`status`) and the
 * watchlist row itself (`saved_at`, `note`).
 */
export type SavedJob = JobListItem & {
  status: string
  saved_at: string
  note: string | null
}

interface WatchlistContextType {
  /** Constant-time membership check. Empty Set when user isn't Plus. */
  savedIds: ReadonlySet<number>
  isSaved: (jobId: number) => boolean
  /** Optimistic save/unsave toggle. No-ops for non-Plus users. */
  toggle: (jobId: number) => Promise<void>
  /** Manual refetch from the server. */
  refresh: () => Promise<void>
  /** True once the initial fetch settles (either resolves or user is free). */
  hydrated: boolean
  /** Full rows, for /jobs/saved. `null` before first hydrate. */
  savedJobs: SavedJob[] | null
}

const noop = async () => {}

const WatchlistContext = createContext<WatchlistContextType>({
  savedIds: new Set(),
  isSaved: () => false,
  toggle: noop,
  refresh: noop,
  hydrated: false,
  savedJobs: null,
})

/**
 * Holds the viewer's Wrap+ watchlist as client-side state so that saving a
 * job on one JobCard instantly updates every other card on the page without
 * a refetch. The authoritative store is D1 — this context is a cache that
 * revalidates on mount (when the viewer is Plus) and after each successful
 * save (to pick up the full job row so /jobs/saved can render immediately).
 */
export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { isPro, isLoaded } = useWrapPlus()
  const authedFetch = useAuthedFetch()

  // Stash the latest authedFetch in a ref so refresh/toggle stay stable
  // across renders (useAuthedFetch currently returns a new function each
  // render; callers would otherwise re-run effects on every render).
  const authedFetchRef = useRef(authedFetch)
  authedFetchRef.current = authedFetch

  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())
  const [savedJobs, setSavedJobs] = useState<SavedJob[] | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const refreshing = useRef(false)

  const refresh = useCallback(async () => {
    if (refreshing.current) return
    refreshing.current = true
    try {
      const r = await authedFetchRef.current('/api/jobs/watchlist')
      if (!r.ok) throw new Error(String(r.status))
      const d = (await r.json()) as { jobs: SavedJob[]; total: number }
      setSavedJobs(d.jobs)
      setSavedIds(new Set(d.jobs.map(j => j.id)))
      setHydrated(true)
    } catch {
      // Swallow — stay in whatever previous state we had rather than
      // flashing the UI to "empty" on a transient failure.
    } finally {
      refreshing.current = false
    }
  }, [])

  // Auto-hydrate whenever Plus status is known.
  useEffect(() => {
    if (!isLoaded) return
    if (!isPro) {
      setSavedIds(new Set())
      setSavedJobs(null)
      setHydrated(true)
      return
    }
    void refresh()
  }, [isPro, isLoaded, refresh])

  const isSaved = useCallback(
    (jobId: number) => savedIds.has(jobId),
    [savedIds],
  )

  const toggle = useCallback(
    async (jobId: number) => {
      if (!isPro) return
      const wasSaved = savedIds.has(jobId)

      // Optimistic update so the star flips instantly.
      setSavedIds(prev => {
        const next = new Set(prev)
        if (wasSaved) next.delete(jobId)
        else next.add(jobId)
        return next
      })
      setSavedJobs(prev => {
        if (!prev) return prev
        if (wasSaved) return prev.filter(j => j.id !== jobId)
        return prev
      })

      try {
        if (wasSaved) {
          const r = await authedFetchRef.current(`/api/jobs/watchlist/${jobId}`, {
            method: 'DELETE',
          })
          if (!r.ok && r.status !== 404) throw new Error(String(r.status))
        } else {
          const r = await authedFetchRef.current('/api/jobs/watchlist', {
            method: 'POST',
            body: JSON.stringify({ job_id: jobId }),
          })
          if (!r.ok) throw new Error(String(r.status))
          // Pull the freshly-saved job's full row so /jobs/saved can render it.
          void refresh()
        }
      } catch {
        // Revert optimistic flip on failure.
        setSavedIds(prev => {
          const next = new Set(prev)
          if (wasSaved) next.add(jobId)
          else next.delete(jobId)
          return next
        })
      }
    },
    [isPro, savedIds, refresh],
  )

  return (
    <WatchlistContext.Provider
      value={{ savedIds, isSaved, toggle, refresh, hydrated, savedJobs }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)
