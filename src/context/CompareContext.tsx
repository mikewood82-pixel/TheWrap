import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

const MAX_COMPARE = 4

interface CompareContextType {
  slugs: string[]
  toggle: (slug: string) => void
  isSelected: (slug: string) => boolean
  clear: () => void
  isFull: boolean
}

const CompareContext = createContext<CompareContextType>({
  slugs: [],
  toggle: () => {},
  isSelected: () => false,
  clear: () => {},
  isFull: false,
})

export function CompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([])

  function toggle(slug: string) {
    setSlugs(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : prev.length < MAX_COMPARE ? [...prev, slug] : prev
    )
  }

  return (
    <CompareContext.Provider value={{
      slugs,
      toggle,
      isSelected: (slug) => slugs.includes(slug),
      clear: () => setSlugs([]),
      isFull: slugs.length >= MAX_COMPARE,
    }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
