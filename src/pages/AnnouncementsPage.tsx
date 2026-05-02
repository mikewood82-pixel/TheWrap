import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ExternalLink, Lock, ArrowRight } from 'lucide-react'
import { vendors } from '../data/vendors'
import { vendorDetails } from '../data/vendorDetails'
import { useWrapPlus } from '../context/WrapPlusContext'
import VendorLogo from '../components/VendorLogo'

// ─── Date parsing ────────────────────────────────────────────────────────────
// Vendor news is recorded as 'Mon YYYY' (e.g. 'Apr 2026'). Parse to a Date
// keyed to the 1st of the month so we can sort chronologically without
// tripping on locale/timezone.
const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

function parseNewsDate(s: string): Date | null {
  const m = s.trim().match(/^(\w{3})\s+(\d{4})$/)
  if (!m) return null
  const month = MONTHS[m[1]]
  if (month === undefined) return null
  const year = parseInt(m[2], 10)
  if (Number.isNaN(year)) return null
  return new Date(year, month, 1)
}

// ─── Aggregation ─────────────────────────────────────────────────────────────
type Announcement = {
  vendorSlug: string
  vendorName: string
  vendorWebsite: string
  vendorCategory: string
  headline: string
  date: string         // original string for display
  parsedDate: Date
  source: string
}

function aggregateAnnouncements(): Announcement[] {
  const items: Announcement[] = []
  for (const [slug, detail] of Object.entries(vendorDetails)) {
    if (!detail.news?.length) continue
    const vendor = vendors.find(v => v.slug === slug)
    if (!vendor) continue
    for (const item of detail.news) {
      const parsed = parseNewsDate(item.date)
      if (!parsed) continue
      items.push({
        vendorSlug: slug,
        vendorName: vendor.name,
        vendorWebsite: vendor.website,
        vendorCategory: vendor.category,
        headline: item.headline,
        date: item.date,
        parsedDate: parsed,
        source: item.source,
      })
    }
  }
  return items.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime())
}

// ─── Free-tier preview limit ─────────────────────────────────────────────────
// Free visitors see the most recent N items so they understand the value;
// Wrap+ unlocks the full archive plus filters.
const FREE_PREVIEW_LIMIT = 10

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AnnouncementsPage() {
  const { isPro } = useWrapPlus()
  const all = useMemo(() => aggregateAnnouncements(), [])

  // Filters (Wrap+ only — unused on free tier but harmless to render hidden)
  const [vendorFilter, setVendorFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Distinct vendors with at least one announcement, alphabetical
  const vendorOptions = useMemo(() => {
    const seen = new Set<string>()
    return all
      .filter(a => {
        if (seen.has(a.vendorSlug)) return false
        seen.add(a.vendorSlug)
        return true
      })
      .map(a => ({ slug: a.vendorSlug, name: a.vendorName }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [all])

  // Distinct categories with announcements
  const categoryOptions = useMemo(() => {
    return Array.from(new Set(all.map(a => a.vendorCategory))).sort()
  }, [all])

  // Apply filters (Wrap+ path) or take preview (free path)
  const filtered = useMemo(() => {
    if (!isPro) return all.slice(0, FREE_PREVIEW_LIMIT)
    return all.filter(a => {
      if (vendorFilter !== 'all' && a.vendorSlug !== vendorFilter) return false
      if (categoryFilter !== 'all' && a.vendorCategory !== categoryFilter) return false
      return true
    })
  }, [all, isPro, vendorFilter, categoryFilter])

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-cream text-brand-dark/60 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
            <Calendar size={12} /> HR Tech Timeline
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-3 leading-tight">
            Product announcements across the HR tech stack
          </h1>
          <p className="text-brand-dark/60 leading-relaxed">
            Every notable launch, acquisition, leadership change, and roadmap shift across the {vendorOptions.length} vendors The Wrap tracks — chronological, vendor-tagged, source-linked.
            {!isPro && (
              <> Free readers see the {FREE_PREVIEW_LIMIT} most recent. <Link to="/subscribe" className="text-brand-terracotta font-semibold hover:underline">Wrap+</Link> unlocks the full archive and filters.</>
            )}
          </p>
        </div>

        {/* Filters (Wrap+ only) */}
        {isPro && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8 pb-6 border-b border-brand-cream">
            <div className="flex-1">
              <label className="block text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-1.5">
                Vendor
              </label>
              <select
                value={vendorFilter}
                onChange={e => setVendorFilter(e.target.value)}
                className="w-full px-3 py-2 border border-brand-cream rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 focus:border-brand-terracotta"
              >
                <option value="all">All vendors ({vendorOptions.length})</option>
                {vendorOptions.map(v => (
                  <option key={v.slug} value={v.slug}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-1.5">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-brand-cream rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 focus:border-brand-terracotta"
              >
                <option value="all">All categories</option>
                {categoryOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-4">
          {isPro ? `Showing ${filtered.length} of ${all.length}` : `${FREE_PREVIEW_LIMIT} most recent`}
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-brand-dark/40 text-sm">
            No announcements match the current filters.
          </div>
        ) : (
          <ol className="space-y-5">
            {filtered.map((a, i) => (
              <li key={`${a.vendorSlug}-${i}`} className="flex gap-4 group">
                <div className="shrink-0 pt-1">
                  <VendorLogo name={a.vendorName} domain={a.vendorWebsite} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-brand-dark/40 mb-1">
                    <Link
                      to={`/vendors/${a.vendorSlug}`}
                      className="font-semibold text-brand-dark/70 hover:text-brand-terracotta transition-colors"
                    >
                      {a.vendorName}
                    </Link>
                    <span>·</span>
                    <span>{a.vendorCategory}</span>
                    <span>·</span>
                    <time dateTime={a.parsedDate.toISOString()}>{a.date}</time>
                  </div>
                  <h3 className="font-serif text-base md:text-lg text-brand-dark leading-snug mb-1">
                    {a.headline}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-brand-dark/40">
                    <ExternalLink size={11} />
                    <span>{a.source}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* Wrap+ upsell footer for free tier */}
        {!isPro && all.length > FREE_PREVIEW_LIMIT && (
          <div className="mt-12 bg-brand-dark text-brand-cream rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="w-12 h-12 bg-brand-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={22} className="text-brand-terracotta" />
            </div>
            <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-2">Wrap+</div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              {all.length - FREE_PREVIEW_LIMIT}+ more announcements in the archive
            </h3>
            <p className="text-brand-cream/60 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Filter by vendor and category, see every launch back to {all[all.length - 1]?.parsedDate.getFullYear() ?? 2025}, and get full vendor profiles with capability scores, customer feedback, and support quality data.
            </p>
            <Link
              to="/subscribe"
              className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
            >
              Upgrade to Wrap+ <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
