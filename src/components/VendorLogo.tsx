import { useState } from 'react'

type Props = {
  name: string
  domain: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Vendor logo with chained fallback:
 * 1. DuckDuckGo icon service (primary — pulls real brand favicons)
 * 2. Google favicon service (backup)
 * 3. Two-letter initials (final fallback)
 */
export default function VendorLogo({ name, domain, size = 'md' }: Props) {
  const [sourceIdx, setSourceIdx] = useState(0)
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  const sources = [
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-lg text-xs',
    md: 'w-14 h-14 rounded-xl text-base',
    lg: 'w-20 h-20 rounded-2xl text-lg',
  }

  return (
    <div className={`${sizeClasses[size]} overflow-hidden bg-brand-cream border border-brand-cream flex items-center justify-center flex-shrink-0`}>
      {sourceIdx < sources.length ? (
        <img
          key={sourceIdx}
          src={sources[sourceIdx]}
          alt={`${name} logo`}
          className="w-full h-full object-contain p-1.5"
          onError={() => setSourceIdx(sourceIdx + 1)}
        />
      ) : (
        <span className="font-bold text-brand-dark/50">{initials}</span>
      )}
    </div>
  )
}
