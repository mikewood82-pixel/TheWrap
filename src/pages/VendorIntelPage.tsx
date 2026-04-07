import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, ArrowRight, Sparkles, X } from 'lucide-react'
import { useWrapPlus } from '../context/WrapPlusContext'
import { vendors, activityFeed } from '../data/vendors'

const categories = ['All', 'HCM', 'ATS', 'HRIS', 'Payroll', 'Perf Mgmt', 'L&D', 'Analytics']

interface AiResult {
  summary: string
  results: { slug: string; reason: string }[]
}

function VendorFinderWidget() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState<AiResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    setAiResult(null)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Request failed')
      setAiResult(data as AiResult)
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      if (msg === 'API key not configured') {
        setError('AI Vendor Finder is not configured yet — check back soon.')
      } else {
        setError('Unable to get recommendations right now. Try again shortly.')
      }
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setAiResult(null)
    setQuery('')
    setError(null)
  }

  const matchedVendors = aiResult
    ? aiResult.results
        .map(r => ({ vendor: vendors.find(v => v.slug === r.slug), reason: r.reason }))
        .filter(r => r.vendor != null)
    : []

  return (
    <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={14} className="text-brand-terracotta" />
        <span className="text-brand-terracotta text-xs uppercase tracking-widest font-medium">AI Vendor Finder</span>
      </div>
      <h2 className="font-serif text-xl font-bold mb-1 text-brand-dark">Find the right vendor for your situation</h2>
      <p className="text-brand-dark/60 text-sm mb-5">
        Describe your business and what you're looking for — company size, industry, pain points, or tools you're replacing — and we'll find the right solutions.
      </p>

      {!aiResult ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. We're a 200-person SaaS company looking to replace Greenhouse. We need better reporting and want something that integrates with Workday..."
            rows={3}
            className="w-full bg-white border border-brand-cream rounded-lg px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30 resize-none"
          />
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="self-start flex items-center gap-2 bg-brand-terracotta text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Finding matches…
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Find vendors
              </>
            )}
          </button>
        </form>
      ) : (
        <div>
          <p className="text-brand-dark/70 text-sm mb-5 leading-relaxed">{aiResult.summary}</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {matchedVendors.map(({ vendor, reason }) => (
              <Link
                key={vendor!.slug}
                to={`/vendors/${vendor!.slug}`}
                className="bg-white hover:border-brand-terracotta/40 border border-brand-cream rounded-lg p-4 transition-colors group hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-serif font-semibold text-brand-dark leading-tight">{vendor!.name}</span>
                  <span className="text-xs text-brand-dark/40 shrink-0">{vendor!.category}</span>
                </div>
                <p className="text-xs text-brand-dark/60 leading-relaxed mb-2">{reason}</p>
                <div className="flex items-center gap-3 text-xs text-brand-dark/40">
                  <span>G2 {vendor!.g2}</span>
                  <span>·</span>
                  <span>{vendor!.reviews >= 1000 ? `${(vendor!.reviews / 1000).toFixed(1)}k` : vendor!.reviews} reviews</span>
                  <span className="ml-auto text-brand-terracotta opacity-0 group-hover:opacity-100 transition-opacity">View profile →</span>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs text-brand-dark/40 hover:text-brand-dark transition-colors"
          >
            <X size={12} /> Start over
          </button>
        </div>
      )}
    </div>
  )
}

export default function VendorIntelPage() {
  const [active, setActive] = useState('All')
  const { isPro } = useWrapPlus()

  const filtered = active === 'All' ? vendors : vendors.filter(v => v.category === active)
  const visibleVendors = isPro ? filtered : filtered.slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Vendor Intelligence</div>
        <h1 className="font-serif text-4xl font-bold mb-3">HR Tech Vendor Database</h1>
        <p className="text-brand-dark/60 text-lg">
          Independent ratings across {vendors.length}+ vendors — G2 scores, Capterra, news activity, and Mike's take.
        </p>
      </div>

      <VendorFinderWidget />

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
              <span className="font-medium">Showing 4 of {vendors.length} vendors.</span>
              <span className="text-brand-cream/60 ml-1">Upgrade to Wrap+ to access the full database, comparison tool, and implementation notes.</span>
            </p>
          </div>
          <Link to="/subscribe" className="bg-brand-terracotta text-white text-sm font-medium px-4 py-2 rounded hover:bg-brand-gold hover:text-brand-dark transition-colors whitespace-nowrap shrink-0">
            Upgrade →
          </Link>
        </div>
      )}

      {/* Vendor grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {visibleVendors.map((v) => (
          <Link
            key={v.slug}
            to={`/vendors/${v.slug}`}
            className="bg-white border border-brand-cream rounded-xl p-5 relative hover:border-brand-terracotta/40 hover:shadow-sm transition-all group"
          >
            {v.deepDive && (
              <div className="absolute top-3 right-3 bg-brand-gold text-brand-dark text-xs font-bold px-2 py-0.5 rounded">
                Deep Dive
              </div>
            )}
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide mb-1">{v.category}</div>
            <div className="font-serif text-xl font-semibold mb-1">{v.name}</div>
            <div className="text-xs text-brand-dark/50 mb-3 line-clamp-2">{v.description}</div>
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
            <div className="flex items-center justify-between">
              <div className="text-xs text-brand-dark/40">{v.employees} employees</div>
              <span className="flex items-center gap-1 text-brand-terracotta text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View profile <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl font-bold">Recent Activity</h2>
          <span className="text-xs text-brand-dark/40 uppercase tracking-wide">Vendor News</span>
        </div>
        <div className="divide-y divide-brand-cream border border-brand-cream rounded-xl overflow-hidden">
          {activityFeed.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white hover:bg-brand-light transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brand-dark leading-snug">{item.headline}</p>
                <p className="text-xs text-brand-dark/40 mt-0.5">{item.source} · {item.date}</p>
              </div>
              <Link
                to={`/vendors/${vendors.find(v => v.name === item.vendor)?.slug ?? ''}`}
                className="shrink-0 text-xs bg-brand-cream text-brand-dark/60 px-2.5 py-1 rounded-full hover:bg-brand-terracotta hover:text-white transition-colors"
                onClick={e => e.stopPropagation()}
              >
                {item.vendor}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Deep Dive CTA */}
      <div className="border border-brand-gold/30 bg-brand-gold/5 rounded-xl p-8">
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
