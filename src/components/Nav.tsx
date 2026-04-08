import { Link, NavLink } from 'react-router-dom'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { useWrapPlus } from '../context/WrapPlusContext'

const links = [
  { to: '/newsletter',   label: 'Newsletter Archive'   },
  { to: '/show',         label: 'The Show'     },
  { to: '/vendors',      label: 'Vendor Intel' },
  { to: '/labor-market', label: 'Labor Market' },
]

export default function Nav() {
  const { isPro } = useWrapPlus()
  const { isSignedIn } = useUser()

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
            {isSignedIn ? (
              <>
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
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-brand-terracotta text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-orange transition-colors">
                  Subscribe
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
