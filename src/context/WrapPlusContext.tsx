import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'

interface WrapPlusContextType {
  isPro: boolean
  isLoaded: boolean
}

const WrapPlusContext = createContext<WrapPlusContextType>({ isPro: false, isLoaded: false })

export function WrapPlusProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded: clerkLoaded } = useUser()
  const [isPro, setIsPro] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!clerkLoaded) return

    if (!user) {
      setIsPro(false)
      setIsLoaded(true)
      return
    }

    fetch(`/api/subscription?userId=${user.id}`)
      .then(r => r.json())
      .then((data: { active: boolean }) => {
        setIsPro(data.active === true)
        setIsLoaded(true)
      })
      .catch(() => setIsLoaded(true))
  }, [user, clerkLoaded])

  return (
    <WrapPlusContext.Provider value={{ isPro, isLoaded }}>
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
