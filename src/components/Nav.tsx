import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { FEATURES } from '../config/features'

// ─── No accounts (2026-08-03) ─────────────────────────────────────────
// Wrap+ went free for everyone on 2026-05-22, which left the Clerk "Sign in"
// button with nothing to gate. Sign-in was removed entirely; per-user
// features (saved jobs, alerts, follows) now hang off an anonymous cookie.
// So the nav has no auth affordance — just links + Subscribe.
// ──────────────────────────────────────────────────────────────────────

// /sponsorship is intentionally absent: the page and its route still exist and
// are reachable by direct URL (so it can be sent to a prospect), but it's
// unlisted from nav, footer, and sitemap while sponsorship is paused.
const baseLinks = [
  { to: '/newsletter',    label: 'Archive'       },
  { to: '/jobs',          label: 'Jobs'          },
  { to: '/events',        label: 'Events'        },
  { to: '/labor-market',  label: 'Labor Market'  },
  { to: '/about',         label: 'About'         },
]

const plusLinks = [
  { to: '/vendors', label: 'Vendor Pulse' },
]

const voicesLink = { to: '/voices', label: 'Voices' }

type NavLinkItem = { to: string; label: string; highlight?: boolean }

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Compose the nav in reading order. Voices sits immediately after Archive
  // when enabled; Vendor Pulse slots in next when PLUS_ENABLED.
  const links: NavLinkItem[] = (() => {
    const [archive, jobs, events, laborMarket, about] = baseLinks
    const out: NavLinkItem[] = [archive]
    if (FEATURES.VOICES_ENABLED) out.push(voicesLink)
    if (FEATURES.PLUS_ENABLED) out.push(...plusLinks)
    out.push(jobs, events, laborMarket, about)
    return out
  })()

  return (
    <header className="bg-white border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="font-serif text-xl font-bold text-brand-dark">The Wrap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ to, label, highlight }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive
                      ? 'text-brand-terracotta font-semibold'
                      : highlight
                        ? 'text-brand-terracotta font-semibold hover:text-brand-orange'
                        : 'text-brand-muted hover:text-brand-dark'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/subscribe"
              className="bg-brand-terracotta text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-orange transition-colors"
            >
              Subscribe
            </Link>

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
            {links.map(({ to, label, highlight }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'text-brand-terracotta font-semibold bg-brand-surface'
                      : highlight
                        ? 'text-brand-terracotta font-semibold hover:bg-brand-surface'
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
