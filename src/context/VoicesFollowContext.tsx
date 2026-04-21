import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ReactNode,
} from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAuthedFetch, useWrapPlus } from './WrapPlusContext'

/**
 * A followed voice source as returned by GET /api/voices/following. Mirrors
 * a subset of voices_sources plus the follow row's created_at.
 */
export type FollowedSource = {
  slug: string
  name: string
  kind: string
  site_url: string
  avatar_url: string | null
  description: string | null
  followed_at: string
}

export type DigestState = {
  active: boolean
  email: string | null
  last_sent_at: string | null
}

interface VoicesFollowContextType {
  /** Constant-time membership check. Empty Set when user isn't Plus. */
  followedSlugs: ReadonlySet<string>
  isFollowing: (sourceSlug: string) => boolean
  /** Optimistic toggle. No-ops for non-Plus. */
  toggle: (sourceSlug: string) => Promise<void>
  /** Manual refetch (e.g. after the /voices/following page mounts). */
  refresh: () => Promise<void>
  /** True once the initial fetch settles. */
  hydrated: boolean
  /** Full rows, for /voices/following. null before first hydrate. */
  followedSources: FollowedSource[] | null
  /** Digest-level state (paused/active, last digest sent). */
  digestState: DigestState
  /** Pause / unpause the Tuesday digest. */
  setDigestActive: (active: boolean) => Promise<void>
}

const noop = async () => {}

const defaultState: DigestState = { active: false, email: null, last_sent_at: null }

const VoicesFollowContext = createContext<VoicesFollowContextType>({
  followedSlugs: new Set(),
  isFollowing: () => false,
  toggle: noop,
  refresh: noop,
  hydrated: false,
  followedSources: null,
  digestState: defaultState,
  setDigestActive: noop,
})

/**
 * Tracks which voice sources the viewer follows so the star icon on every
 * VoiceCard flips instantly across the page without a refetch. Same cache
 * pattern as WatchlistContext — D1 is the source of truth.
 */
export function VoicesFollowProvider({ children }: { children: ReactNode }) {
  const { isPro, isLoaded } = useWrapPlus()
  const { user } = useUser()
  const authedFetch = useAuthedFetch()

  const authedFetchRef = useRef(authedFetch)
  authedFetchRef.current = authedFetch

  const [followedSlugs, setFollowedSlugs] = useState<Set<string>>(new Set())
  const [followedSources, setFollowedSources] = useState<FollowedSource[] | null>(null)
  const [digestState, setDigestState] = useState<DigestState>(defaultState)
  const [hydrated, setHydrated] = useState(false)
  const refreshing = useRef(false)

  const refresh = useCallback(async () => {
    if (refreshing.current) return
    refreshing.current = true
    try {
      const r = await authedFetchRef.current('/api/voices/following')
      if (!r.ok) throw new Error(String(r.status))
      const d = (await r.json()) as { sources: FollowedSource[]; state: DigestState }
      setFollowedSources(d.sources)
      setFollowedSlugs(new Set(d.sources.map(s => s.slug)))
      setDigestState(d.state)
      setHydrated(true)
    } catch {
      // Transient failure — keep current state rather than flash to empty.
    } finally {
      refreshing.current = false
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    if (!isPro) {
      setFollowedSlugs(new Set())
      setFollowedSources(null)
      setDigestState(defaultState)
      setHydrated(true)
      return
    }
    void refresh()
  }, [isPro, isLoaded, refresh])

  const isFollowing = useCallback(
    (slug: string) => followedSlugs.has(slug),
    [followedSlugs],
  )

  const toggle = useCallback(
    async (slug: string) => {
      if (!isPro) return
      const email = user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress
      if (!email) return

      const wasFollowing = followedSlugs.has(slug)

      setFollowedSlugs(prev => {
        const next = new Set(prev)
        if (wasFollowing) next.delete(slug)
        else next.add(slug)
        return next
      })
      setFollowedSources(prev => {
        if (!prev) return prev
        if (wasFollowing) return prev.filter(s => s.slug !== slug)
        return prev
      })

      try {
        if (wasFollowing) {
          const r = await authedFetchRef.current('/api/voices/follow', {
            method: 'DELETE',
            body: JSON.stringify({ source_slug: slug }),
          })
          if (!r.ok && r.status !== 404) throw new Error(String(r.status))
        } else {
          const r = await authedFetchRef.current('/api/voices/follow', {
            method: 'POST',
            body: JSON.stringify({ source_slug: slug, email }),
          })
          if (!r.ok) throw new Error(String(r.status))
          // Pull the freshly-followed source row so /voices/following can render it.
          void refresh()
        }
      } catch {
        // Revert on failure.
        setFollowedSlugs(prev => {
          const next = new Set(prev)
          if (wasFollowing) next.add(slug)
          else next.delete(slug)
          return next
        })
      }
    },
    [isPro, user, followedSlugs, refresh],
  )

  const setDigestActive = useCallback(async (active: boolean) => {
    if (!isPro) return
    const prev = digestState.active
    setDigestState(s => ({ ...s, active }))
    try {
      const r = await authedFetchRef.current('/api/voices/following', {
        method: 'PATCH',
        body: JSON.stringify({ active }),
      })
      if (!r.ok) throw new Error(String(r.status))
    } catch {
      setDigestState(s => ({ ...s, active: prev }))
    }
  }, [isPro, digestState.active])

  return (
    <VoicesFollowContext.Provider
      value={{
        followedSlugs, isFollowing, toggle, refresh, hydrated,
        followedSources, digestState, setDigestActive,
      }}
    >
      {children}
    </VoicesFollowContext.Provider>
  )
}

export const useVoicesFollow = () => useContext(VoicesFollowContext)
