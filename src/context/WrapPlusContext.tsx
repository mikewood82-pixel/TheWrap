import { createContext, useContext, type ReactNode } from 'react'

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
 * Hook for calling the per-user API endpoints from the frontend.
 *
 * There are no accounts anymore: identity is the `wrap_anon` first-party
 * cookie that functions/_middleware.ts mints and the browser sends
 * automatically on same-origin requests. This fetcher therefore attaches no
 * token — it just ensures a JSON content-type and opts into sending cookies.
 * Pairs with `requireAnon()` on the server (functions/api/_lib/requireAnon.ts).
 *
 * The name is unchanged so existing call sites don't need to touch anything.
 *
 * Usage:
 *   const authedFetch = useAuthedFetch()
 *   const res = await authedFetch('/api/jobs/watchlist', { method: 'GET' })
 */
export function useAuthedFetch() {
  return async (input: string, init: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(init.headers)
    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    return fetch(input, { ...init, headers, credentials: 'same-origin' })
  }
}
