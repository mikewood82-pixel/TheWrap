import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Lock } from 'lucide-react'
import { useWrapPlus } from '../context/WrapPlusContext'

const categories = ['All', 'HCM', 'ATS', 'HRIS', 'Payroll', 'Perf Mgmt', 'L&D', 'Analytics']

const vendors = [
  { name: 'Acme Staffing', slug: 'acme-staffing',category: 'ATS',      g2: 4.5, capterra: 4.6, employees: '250+',    news: 6,  deepDive: true  },
  { name: 'Workday',       slug: 'workday',      category: 'HCM',      g2: 4.1, capterra: 4.2, employees: '18,000+', news: 12, deepDive: false },
  { name: 'Rippling',      slug: 'rippling',     category: 'HRIS',     g2: 4.6, capterra: 4.7, employees: '3,000+',  news: 24, deepDive: false },
  { name: 'Greenhouse',    slug: 'greenhouse',   category: 'ATS',      g2: 4.4, capterra: 4.4, employees: '800+',    news: 8,  deepDive: false },
  { name: 'Lattice',       slug: 'lattice',      category: 'Perf Mgmt',g2: 4.3, capterra: 4.4, employees: '600+',    news: 5,  deepDive: false },
  { name: 'UKG',           slug: 'ukg',          category: 'HCM',      g2: 4.0, capterra: 4.1, employees: '15,000+', news: 9,  deepDive: false },
  { name: 'ADP',           slug: 'adp',          category: 'Payroll',  g2: 3.9, capterra: 4.0, employees: '60,000+', news: 18, deepDive: false },
  { name: 'Lever',         slug: 'lever',        category: 'ATS',      g2: 4.3, capterra: 4.3, employees: '400+',    news: 3,  deepDive: false },
]

export default function VendorIntelPage() {
  const [active, setActive] = useState('All')
  const { isPro } = useWrapPlus()

  const filtered = active === 'All' ? vendors : vendors.filter(v => v.category === active)
  // Free users see first 4 vendors; deep dive vendors are always visible
  const visibleVendors = isPro ? filtered : filtered.filter((v, i) => i < 4 || v.deepDive)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Vendor Intelligence</div>
        <h1 className="font-serif text-4xl font-bold mb-3">HR Tech Vendor Database</h1>
        <p className="text-brand-dark/60 text-lg">
          Independent ratings across 29+ vendors — G2 scores, Capterra, news activity, and Mike's take.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-brand-terracotta text-white'
                : 'bg-brand-cream text-brand-dark hover:bg-brand-gold/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Free tier banner */}
      {!isPro && (
        <div className="bg-brand-dark text-brand-cream rounded-xl px-5 py-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock size={16} className="text-brand-gold shrink-0" />
            <p className="text-sm">
              <span className="font-medium">Showing 4 of 29 vendors.</span>
              <span className="text-brand-cream/60 ml-1">Upgrade to Wrap+ to access the full database, comparison tool, and implementation notes.</span>
            </p>
          </div>
          <Link to="/subscribe" className="bg-brand-terracotta text-white text-sm font-medium px-4 py-2 rounded hover:bg-brand-gold hover:text-brand-dark transition-colors whitespace-nowrap shrink-0">
            Upgrade →
          </Link>
        </div>
      )}

      {/* Vendor grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleVendors.map((v) => (
          <div key={v.slug} className="bg-white border border-brand-cream rounded-xl p-5 relative">
            {v.deepDive && (
              <div className="absolute top-3 right-3 bg-brand-gold text-brand-dark text-xs font-bold px-2 py-0.5 rounded">
                Deep Dive
              </div>
            )}
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide mb-1">{v.category}</div>
            <div className="font-serif text-xl font-semibold mb-3">{v.name}</div>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-brand-light rounded-lg p-2">
                <div className="font-bold text-lg">{v.g2}</div>
                <div className="text-xs text-brand-dark/40">G2</div>
              </div>
              <div className="bg-brand-light rounded-lg p-2">
                <div className="font-bold text-lg">{v.capterra}</div>
                <div className="text-xs text-brand-dark/40">Capterra</div>
              </div>
              <div className="bg-brand-light rounded-lg p-2">
                <div className="font-bold text-lg">{v.news}</div>
                <div className="text-xs text-brand-dark/40">News</div>
              </div>
            </div>
            <div className="text-xs text-brand-dark/40 mb-4">{v.employees} employees</div>
            {v.deepDive ? (
              <Link
                to={`/vendors/${v.slug}`}
                className="flex items-center gap-1 text-brand-terracotta text-sm font-medium hover:underline"
              >
                Read Deep Dive <ArrowRight size={14} />
              </Link>
            ) : (
              <a
                href={`https://hrtech-reviews.hardware-tracker.workers.dev/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand-dark/40 text-sm hover:text-brand-terracotta transition-colors"
              >
                Full profile <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Vendor Deep Dive CTA */}
      <div className="mt-12 border border-brand-gold/30 bg-brand-gold/5 rounded-xl p-8">
        <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-2">For Vendors</div>
        <h2 className="font-serif text-2xl font-bold mb-2">Get a Vendor Deep Dive</h2>
        <p className="text-brand-dark/60 max-w-xl mb-4">
          A dedicated editorial profile page — Mike's independent take, software preview, third-party review scores, and a direct demo request form for buyers. Sponsored and clearly labeled. Mike's words are his own.
        </p>
        <a
          href="mailto:mike@thewrap.com?subject=Vendor Deep Dive"
          className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream font-medium px-5 py-2.5 rounded hover:bg-brand-brown transition-colors"
        >
          Inquire about a Deep Dive
        </a>
      </div>
    </div>
  )
}
