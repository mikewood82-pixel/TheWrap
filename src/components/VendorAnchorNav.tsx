import { useEffect, useState } from 'react'

export interface AnchorItem {
  id: string
  label: string
}

interface VendorAnchorNavProps {
  items: AnchorItem[]
}

/**
 * Sticky in-page nav for the vendor deep dive. Highlights the section
 * currently in view via IntersectionObserver. Smooth-scrolls to the target
 * section on click, with a small offset so the section heading clears the
 * site nav + sticky bar above.
 */
export default function VendorAnchorNav({ items }: VendorAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  function jumpTo(id: string, e: React.MouseEvent) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
  }

  return (
    <nav
      aria-label="Vendor sections"
      className="sticky top-0 z-30 -mx-4 px-4 py-2 bg-brand-light/90 backdrop-blur border-b border-brand-cream mb-6"
    >
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {items.map(item => {
          const active = item.id === activeId
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={e => jumpTo(item.id, e)}
              className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                active
                  ? 'bg-brand-terracotta text-white'
                  : 'text-brand-dark/60 hover:bg-brand-cream hover:text-brand-dark'
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
