import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useUser } from '@clerk/clerk-react'

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
