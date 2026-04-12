import { Link } from 'react-router-dom'
import { FEATURES } from '../config/features'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <img src="/logo.png" alt="The Wrap" className="h-10 w-auto mb-3 brightness-0 invert" />
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
              Your weekly source for HR Technology news, vendor intelligence, and labor market signals.
            </p>
            <a
              href="#subscribe"
              className="inline-block bg-brand-terracotta text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-orange transition-colors"
            >
              Get the Newsletter
            </a>
          </div>

          <div>
            <div className="text-white/30 text-xs uppercase tracking-widest font-medium mb-4">Content</div>
            <ul className="space-y-2.5 text-sm">
              {[
                ['/newsletter',  'Archive'],
                ...(FEATURES.PLUS_ENABLED ? [['/vendors', 'Vendor Intel']] : []),
                ['/labor-market', 'Labor Market'],
                ['/about',       'About'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/30 text-xs uppercase tracking-widest font-medium mb-4">Work With Us</div>
            <ul className="space-y-2.5 text-sm">
              {[
                ['/sponsorship', 'Sponsorship'],
                ...(FEATURES.PLUS_ENABLED ? [
                  ['mailto:mike@thewrap.com?subject=Vendor Deep Dive', 'Vendor Deep Dive'],
                  ['/subscribe', 'Wrap+ Membership'],
                ] : []),
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-white/50 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} The Wrap. All rights reserved.</span>
          <span>HR Tech · Weekly</span>
        </div>
      </div>
    </footer>
  )
}
