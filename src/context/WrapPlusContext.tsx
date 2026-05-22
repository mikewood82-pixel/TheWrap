import { createContext, useContext, type ReactNode } from 'react'
import { useAuth } from '@clerk/clerk-react'

interface WrapPlusContextType {
  isPro: boolean
  isLoaded: boolean
  refetch: () => Promise<boolean>
}

// ─── Wrap+ is free for all subscribers (2026-05-22 pivot) ──────────────────
// Wrap+ launched as a $10/mo paid tier on 2026-05-01. Three weeks of zero
// conversion → Mike pivoted to making every Wrap+ feature free for everyone.
// This provider now unconditionally returns `isPro: true`. The `/api/subscription`
// fetch is gone; the KV `SUBSCRIPTIONS` namespace is no longer consulted
// (it stays populated for ~30 days as a safety net before final cleanup).
//
// To reverse the pivot: revert this file and the server-side requirePlus.ts
// flip. The full plan lives at C:\Users\mikew\.claude\plans\elegant-crafting-gizmo.md
// ───────────────────────────────────────────────────────────────────────────

const WrapPlusContext = createContext<WrapPlusContextType>({
  isPro: true,
  isLoaded: true,
  refetch: async () => true,
})

export function WrapPlusProvider({ children }: { children: ReactNode }) {
  return (
    <WrapPlusContext.Provider value={{ isPro: true, isLoaded: true, refetch: async () => true }}>
      {children}
    </WrapPlusContext.Provider>
  )
}

export const useWrapPlus = () => useContext(WrapPlusContext)

/**
 * Hook for calling Wrap+ gated API endpoints from the frontend.
 *
 * Returns a fetch-like function that injects the current Clerk session JWT as
 * `Authorization: Bearer ...`, which pairs with `requirePlus()` on the server
 * (see functions/api/_lib/requirePlus.ts). If the user isn't signed in or
 * Clerk hasn't hydrated yet, the returned fetcher throws a named error so the
 * caller can distinguish "not signed in" from ordinary network failures.
 *
 * Usage:
 *   const authedFetch = useAuthedFetch()
 *   const res = await authedFetch('/api/jobs/watchlist', { method: 'GET' })
 */
export function useAuthedFetch() {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  return async (input: string, init: RequestInit = {}): Promise<Response> => {
    if (!isLoaded) throw new AuthedFetchError('clerk-not-loaded')
    if (!isSignedIn) throw new AuthedFetchError('not-signed-in')

    const token = await getToken()
    if (!token) throw new AuthedFetchError('no-token')

    const headers = new Headers(init.headers)
    headers.set('Authorization', `Bearer ${token}`)
    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    return fetch(input, { ...init, headers })
  }
}

export class AuthedFetchError extends Error {
  code: 'clerk-not-loaded' | 'not-signed-in' | 'no-token'
  constructor(code: 'clerk-not-loaded' | 'not-signed-in' | 'no-token') {
    super(code)
    this.name = 'AuthedFetchError'
    this.code = code
  }
}
