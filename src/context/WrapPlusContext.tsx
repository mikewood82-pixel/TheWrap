import { createContext, useContext, useState, ReactNode } from 'react'

interface WrapPlusContextType {
  isPro: boolean
  setPro: (val: boolean) => void
}

const WrapPlusContext = createContext<WrapPlusContextType>({
  isPro: false,
  setPro: () => {},
})

export function WrapPlusProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('wrap_plus') === 'true'
  })

  const setPro = (val: boolean) => {
    localStorage.setItem('wrap_plus', String(val))
    setIsPro(val)
  }

  return (
    <WrapPlusContext.Provider value={{ isPro, setPro }}>
      {children}
    </WrapPlusContext.Provider>
  )
}

export const useWrapPlus = () => useContext(WrapPlusContext)
