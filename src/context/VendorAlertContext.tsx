import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ReactNode,
} from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAuthedFetch, useWrapPlus } from './WrapPlusContext'

export type VendorWatch = {
  vendor_slug: string
  vendor_name: string
  active: boolean
  created_at: string
  latest_verdict: string | null
  latest_verdict_date: string | null
  open_jobs: number
}

interface VendorAlertContextType {
  watchedSlugs: ReadonlySet<string>
  isWatching: (vendorSlug: string) => boolean
  toggle: (vendorSlug: string) => Promise<void>
  refresh: () => Promise<void>
  hydrated: boolean
  watches: VendorWatch[] | null
  /** Pause/resume all watches for this user. */
  setAllActive: (active: boolean) => Promise<void>
  /** Whether at least one watch is active — tells the UI whether to show "Paused" */
  anyActive: boolean
}

const noop = async () => {}

const VendorAlertContext = createContext<VendorAlertContextType>({
  watchedSlugs: new Set(),
  isWatching: () => false,
  toggle: noop,
  refresh: noop,
  hydrated: false,
  watches: null,
  setAllActive: noop,
  anyActive: false,
})

/**
 * Cache of the viewer's vendor-health-change watches so the bell icon on
 * each vendor tile flips instantly across the page without a refetch.
 * Same pattern as WatchlistContext + VoicesFollowContext.
 */
export function VendorAlertProvider({ children }: { children: ReactNode }) {
  const { isPro, isLoaded } = useWrapPlus()
  const { user } = useUser()
  const authedFetch = useAuthedFetch()
  const authedFetchRef = useRef(authedFetch)
  authedFetchRef.current = authedFetch

  const [watchedSlugs, setWatchedSlugs] = useState<Set<string>>(new Set())
  const [watches, setWatches] = useState<VendorWatch[] | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const refreshing = useRef(false)

  const refresh = useCallback(async () => {
    if (refreshing.current) return
    refreshing.current = true
    try {
      const r = await authedFetchRef.current('/api/vendor-alerts')
      if (!r.ok) throw new Error(String(r.status))
      const d = (await r.json()) as { watches: VendorWatch[]; total: number }
      setWatches(d.watches)
      // Only "active" watches participate in the toggle state — paused
      // watches stay in the list but aren't treated as "watching" visually.
      setWatchedSlugs(new Set(d.watches.filter(w => w.active).map(w => w.vendor_slug)))
      setHydrated(true)
    } catch {
      // Transient failure — keep previous state.
    } finally {
      refreshing.current = false
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    if (!isPro) {
      setWatchedSlugs(new Set())
      setWatches(null)
      setHydrated(true)
      return
    }
    void refresh()
  }, [isPro, isLoaded, refresh])

  const isWatching = useCallback(
    (slug: string) => watchedSlugs.has(slug),
    [watchedSlugs],
  )

  const toggle = useCallback(
    async (slug: string) => {
      if (!isPro) return
      const email = user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress
      if (!email) return

      const wasWatching = watchedSlugs.has(slug)

      setWatchedSlugs(prev => {
        const next = new Set(prev)
        if (wasWatching) next.delete(slug)
        else next.add(slug)
        return next
      })

      try {
        if (wasWatching) {
          const r = await authedFetchRef.current('/api/vendor-alerts', {
            method: 'DELETE',
            body: JSON.stringify({ vendor_slug: slug }),
          })
          if (!r.ok && r.status !== 404) throw new Error(String(r.status))
          setWatches(prev => prev ? prev.filter(w => w.vendor_slug !== slug) : prev)
        } else {
          const r = await authedFetchRef.current('/api/vendor-alerts', {
            method: 'POST',
            body: JSON.stringify({ vendor_slug: slug, email }),
          })
          if (!r.ok) throw new Error(String(r.status))
          void refresh()
        }
      } catch {
        setWatchedSlugs(prev => {
          const next = new Set(prev)
          if (wasWatching) next.add(slug)
          else next.delete(slug)
          return next
        })
      }
    },
    [isPro, user, watchedSlugs, refresh],
  )

  const setAllActive = useCallback(async (active: boolean) => {
    if (!isPro) return
    const prev = watches
    // Optimistic update
    setWatches(p => p ? p.map(w => ({ ...w, active })) : p)
    setWatchedSlugs(active && watches ? new Set(watches.map(w => w.vendor_slug)) : new Set())
    try {
      const r = await authedFetchRef.current('/api/vendor-alerts', {
        method: 'PATCH',
        body: JSON.stringify({ active }),
      })
      if (!r.ok) throw new Error(String(r.status))
    } catch {
      setWatches(prev)
      setWatchedSlugs(
        prev ? new Set(prev.filter(w => w.active).map(w => w.vendor_slug)) : new Set()
      )
    }
  }, [isPro, watches])

  const anyActive = !!watches && watches.some(w => w.active)

  return (
    <VendorAlertContext.Provider
      value={{
        watchedSlugs, isWatching, toggle, refresh, hydrated,
        watches, setAllActive, anyActive,
      }}
    >
      {children}
    </VendorAlertContext.Provider>
  )
}

export const useVendorAlerts = () => useContext(VendorAlertContext)
