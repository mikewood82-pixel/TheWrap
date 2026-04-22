import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Lock, ArrowRight, Sparkles, X, GitCompare, Plus, Check, Search } from 'lucide-react'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useCompare } from '../context/CompareContext'
import { vendors, activityFeed } from '../data/vendors'
import { vendorDetails } from '../data/vendorDetails'
import CompareModal from '../components/CompareModal'
import VendorLogo from '../components/VendorLogo'

const categories = ['All', 'HCM', 'ATS', 'HRIS', 'Payroll', 'Perf Mgmt', 'L&D', 'Analytics']

// All known integration tools across all vendors (deduplicated)
const ALL_INTEGRATIONS = Array.from(
  new Set(Object.values(vendorDetails).flatMap(d => d.integrations))
).sort()

interface AiResult {
  summary: string
  results: { slug: string; reason: string }[]
}

// ─── AI Vendor Finder ─────────────────────────────────────────────────────────
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
        setError(msg || 'Unable to get recommendations right now. Try again shortly.')
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
    <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-6 mb-6">
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
              <><Sparkles size={13} /> Find vendors</>
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
          <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-brand-dark/40 hover:text-brand-dark transition-colors">
            <X size={12} /> Start over
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Tech Stack Filter ────────────────────────────────────────────────────────
function TechStackFilter({ selected, onChange }: { selected: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const suggestions = input.length > 0
    ? ALL_INTEGRATIONS.filter(t => t.toLowerCase().includes(input.toLowerCase()) && !selected.includes(t)).slice(0, 8)
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function add(tag: string) {
    onChange([...selected, tag])
    setInput('')
    setOpen(false)
  }

  function remove(tag: string) {
    onChange(selected.filter(t => t !== tag))
  }

  return (
    <div className="bg-white border border-brand-cream rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Search size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Filter by your tech stack</span>
        {selected.length > 0 && (
          <button onClick={() => onChange([])} className="ml-auto text-xs text-brand-dark/30 hover:text-brand-terracotta transition-colors">
            Clear all
          </button>
        )}
      </div>
      <div ref={ref} className="relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1.5 bg-brand-terracotta/10 text-brand-terracotta text-xs font-medium px-3 py-1.5 rounded-full">
              {tag}
              <button onClick={() => remove(tag)} className="hover:opacity-70"><X size={11} /></button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder={selected.length === 0 ? 'Type a tool you use (e.g. Slack, Salesforce, Workday)…' : 'Add another tool…'}
          className="w-full text-sm border border-brand-cream rounded-lg px-3 py-2 text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20"
        />
        {open && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-cream rounded-lg shadow-lg z-20 overflow-hidden">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => add(s)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-brand-cream transition-colors text-brand-dark/70"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-brand-dark/40 mt-2">
          Showing vendors that integrate with: {selected.join(', ')}
        </p>
      )}
    </div>
  )
}

// ─── Compare Bar ──────────────────────────────────────────────────────────────
function CompareBar({ onCompare }: { onCompare: () => void }) {
  const { slugs, toggle, clear } = useCompare()
  const selected = slugs.map(s => vendors.find(v => v.slug === s)).filter(Boolean) as typeof vendors

  if (selected.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-dark text-white shadow-2xl border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <GitCompare size={15} className="text-brand-gold" />
          <span className="text-sm font-medium">{selected.length} selected</span>
        </div>
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {selected.map(v => (
            <span key={v.slug} className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-full">
              {v.name}
              <button onClick={() => toggle(v.slug)} className="hover:opacity-70"><X size={11} /></button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clear} className="text-xs text-white/40 hover:text-white transition-colors">Clear</button>
          <button
            onClick={onCompare}
            disabled={selected.length < 2}
            className="flex items-center gap-2 bg-brand-terracotta text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <GitCompare size={14} /> Compare {selected.length < 2 ? '(select 2+)' : 'now'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VendorPulsePage() {
  const [active, setActive] = useState('All')
  const [techStack, setTechStack] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const { isPro } = useWrapPlus()
  const { toggle, isSelected, isFull } = useCompare()

  // Filter by category
  let filtered = active === 'All' ? vendors : vendors.filter(v => v.category === active)

  // Filter by tech stack
  if (techStack.length > 0) {
    filtered = filtered.filter(v => {
      const integrations = vendorDetails[v.slug]?.integrations ?? []
      return techStack.some(tool => integrations.some(int => int.toLowerCase() === tool.toLowerCase()))
    })
  }

  const visibleVendors = isPro ? filtered : filtered.slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-24">
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Vendor Pulse</div>
        <h1 className="font-serif text-4xl font-bold mb-3">HR Tech Vendor Database</h1>
        <p className="text-brand-dark/60 text-lg">
          Independent ratings across {vendors.length}+ vendors — G2 scores, Capterra, news activity, and Mike's take.
        </p>
      </div>

      <VendorFinderWidget />

      <TechStackFilter selected={techStack} onChange={setTechStack} />

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
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

      {/* Compare hint */}
      <div className="flex items-center gap-2 mb-4 text-xs text-brand-dark/40">
        <GitCompare size={12} />
        <span>Click the <strong className="text-brand-dark/60">+</strong> on any vendor card to add it to your comparison shortlist</span>
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

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-brand-dark/40">
          <p className="text-lg font-medium mb-1">No vendors match your tech stack filter</p>
          <p className="text-sm">Try removing a tool or broadening your search</p>
        </div>
      )}

      {/* Vendor grid
          Only the Workday tile links through to its deep-dive right now — a
          single working example of what Wrap+ unlocks. Other tiles render the
          same data but are static; a "Wrap+" badge signals that the full
          profile sits behind the upgrade. When we're ready to open more
          profiles, flip the `isExample` predicate below. */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {visibleVendors.map((v) => {
          const selected = isSelected(v.slug)
          const isExample = v.slug === 'workday'
          const tileClass = `block bg-white border rounded-xl p-5 transition-all group ${
            isExample ? 'hover:shadow-sm' : ''
          } ${
            selected
              ? 'border-brand-terracotta/50 ring-2 ring-brand-terracotta/20'
              : `border-brand-cream ${isExample ? 'hover:border-brand-terracotta/40' : ''}`
          }`

          const tileBody = (
            <>
              {isExample && (
                <div className="absolute top-3 right-10 bg-brand-gold text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  Sample profile
                </div>
              )}
              {!isExample && (
                <div className="absolute top-3 right-10 bg-brand-dark/5 text-brand-dark/50 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  Wrap+
                </div>
              )}
              <div className="flex items-start gap-3 mb-3">
                <VendorLogo name={v.name} domain={v.website.split('/')[0]} size="sm" />
                <div className="flex-1 min-w-0 pr-6">
                  <div className="text-xs text-brand-dark/40 uppercase tracking-wide mb-1">{v.category}</div>
                  <div className="font-serif text-xl font-semibold mb-1 leading-tight">{v.name}</div>
                  <div className="text-xs text-brand-dark/50 line-clamp-2">{v.description}</div>
                </div>
              </div>
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
                {isExample ? (
                  <span className="flex items-center gap-1 text-brand-terracotta text-xs font-semibold">
                    See full profile <ArrowRight size={12} />
                  </span>
                ) : (
                  <span className="text-xs text-brand-dark/30">Full profile with Wrap+</span>
                )}
              </div>
            </>
          )

          return (
            <div key={v.slug} className="relative">
              {isExample ? (
                <Link to={`/vendors/${v.slug}`} className={tileClass}>
                  {tileBody}
                </Link>
              ) : (
                <div className={tileClass}>{tileBody}</div>
              )}

              {/* Compare button */}
              <button
                onClick={() => toggle(v.slug)}
                disabled={isFull && !selected}
                title={selected ? 'Remove from compare' : isFull ? 'Max 4 vendors' : 'Add to compare'}
                className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all border text-xs font-bold
                  ${selected
                    ? 'bg-brand-terracotta border-brand-terracotta text-white'
                    : 'bg-white border-brand-cream text-brand-dark/40 hover:border-brand-terracotta hover:text-brand-terracotta'
                  } ${isFull && !selected ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {selected ? <Check size={12} /> : <Plus size={12} />}
              </button>
            </div>
          )
        })}
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

      {/* Compare bar + modal */}
      <CompareBar onCompare={() => setShowCompare(true)} />
      {showCompare && <CompareModal onClose={() => setShowCompare(false)} />}
    </div>
  )
}
