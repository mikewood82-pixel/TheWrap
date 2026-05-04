import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Menu, X } from 'lucide-react'
import { useWrapPlus } from '../context/WrapPlusContext'
import { FEATURES } from '../config/features'

const baseLinks = [
  { to: '/newsletter',    label: 'Archive'       },
  { to: '/jobs',          label: 'Jobs'          },
  { to: '/sponsorship',   label: 'Sponsorship'   },
  { to: '/labor-market',  label: 'Labor Market'  },
  { to: '/about',         label: 'About'         },
]

const plusLinks = [
  { to: '/vendors', label: 'Vendor Pulse' },
]

const voicesLink = { to: '/voices', label: 'Voices' }

// Compose the nav in the intended reading order. Vendor Pulse slots after
// Archive when enabled; Voices sits between Jobs and Sponsorship when enabled.
const links = (() => {
  const [archive, jobs, sponsorship, laborMarket, about] = baseLinks
  const out = [archive]
  if (FEATURES.PLUS_ENABLED) out.push(...plusLinks)
  out.push(jobs)
  if (FEATURES.VOICES_ENABLED) out.push(voicesLink)
  out.push(sponsorship, laborMarket, about)
  return out
})()

export default function Nav() {
  const { isPro } = useWrapPlus()
  const { isSignedIn } = useUser()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="font-serif text-xl font-bold text-brand-dark">The Wrap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive
                      ? 'text-brand-terracotta font-semibold'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {FEATURES.PLUS_ENABLED && !isSignedIn && (
              <SignInButton mode="modal">
                <button className="hidden sm:inline text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors">
                  Sign in
                </button>
              </SignInButton>
            )}
            {isPro ? (
              <span className="bg-brand-orange/10 text-brand-terracotta text-xs font-bold px-3 py-1.5 rounded-full border border-brand-orange/20">
                Wrap+
              </span>
            ) : (
              <Link
                to="/subscribe"
                className="bg-brand-terracotta text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-orange transition-colors"
              >
                Subscribe
              </Link>
            )}
            {FEATURES.PLUS_ENABLED && isSignedIn && <UserButton afterSignOutUrl="/" />}

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 text-brand-dark hover:text-brand-terracotta transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-brand-border bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'text-brand-terracotta font-semibold bg-brand-surface'
                      : 'text-brand-muted hover:text-brand-dark hover:bg-brand-surface'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
