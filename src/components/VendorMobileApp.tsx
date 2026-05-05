import { Smartphone, ExternalLink, Star, AlertTriangle } from 'lucide-react'
import type { MobileAppProfile, MobileApp, MobileAppListing } from '../data/vendorProfiles'

interface Props {
  profile: MobileAppProfile
}

// Returns 'Fresh' (<90d), 'Recent' (90-180d), 'Stale' (180-365d), 'Cold' (>365d), or null if undated.
function freshness(lastUpdated?: string): { label: string; cls: string } | null {
  if (!lastUpdated) return null
  const parsed = Date.parse(lastUpdated)
  if (Number.isNaN(parsed)) return null
  const ageMs = Date.now() - parsed
  const ageDays = ageMs / (1000 * 60 * 60 * 24)
  if (ageDays < 90)  return { label: 'Fresh',  cls: 'bg-green-50 text-green-700 border-green-100' }
  if (ageDays < 180) return { label: 'Recent', cls: 'bg-amber-50 text-amber-800 border-amber-100' }
  if (ageDays < 365) return { label: 'Stale',  cls: 'bg-amber-50 text-amber-800 border-amber-200' }
  return { label: 'Cold', cls: 'bg-red-50 text-red-700 border-red-100' }
}

function formatReviewCount(n?: number): string | null {
  if (n == null) return null
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

function PlatformColumn({ listing, label }: { listing?: MobileAppListing; label: string }) {
  if (!listing) {
    return (
      <div className="bg-brand-cream/40 border border-brand-cream rounded-lg p-3">
        <div className="text-[10px] uppercase tracking-wider text-brand-dark/40 font-semibold mb-1">{label}</div>
        <div className="text-xs text-brand-dark/40 italic">Not published</div>
      </div>
    )
  }

  const fresh = freshness(listing.lastUpdated)
  const reviewCountFmt = formatReviewCount(listing.reviewCount)

  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-[10px] uppercase tracking-wider text-brand-dark/40 font-semibold">{label}</div>
        {fresh && (
          <span className={`inline-flex items-center text-[10px] uppercase tracking-wide font-semibold border px-2 py-0.5 rounded-full ${fresh.cls}`}>
            {fresh.label}
          </span>
        )}
      </div>

      {listing.unverified ? (
        <div className="flex items-start gap-1.5 text-xs text-brand-dark/50 leading-snug mb-2">
          <AlertTriangle size={11} className="text-brand-gold shrink-0 mt-0.5" />
          <span>Listing exists; metrics not pulled this pass.</span>
        </div>
      ) : (
        <>
          {listing.rating != null && (
            <div className="flex items-baseline gap-1.5 mb-1">
              <Star size={13} className="text-brand-gold fill-brand-gold" />
              <span className="font-serif text-xl font-bold text-brand-dark leading-none">{listing.rating.toFixed(1)}</span>
              {reviewCountFmt && <span className="text-xs text-brand-dark/40">/ 5 · {reviewCountFmt} ratings</span>}
            </div>
          )}
          {listing.lastUpdated && (
            <div className="text-xs text-brand-dark/60 mt-1.5">
              <span className="text-brand-dark/40">Updated:</span> {listing.lastUpdated}
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-brand-dark/60 mt-1.5">
            {listing.version    && <div><span className="text-brand-dark/40">v</span>{listing.version}</div>}
            {listing.size       && <div className="text-right">{listing.size}</div>}
            {listing.minOSVersion && <div className="col-span-2"><span className="text-brand-dark/40">Requires:</span> {listing.minOSVersion}</div>}
            {listing.languages != null && <div className="col-span-2"><span className="text-brand-dark/40">Languages:</span> {listing.languages}</div>}
          </div>
        </>
      )}

      <a
        href={listing.storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-brand-terracotta hover:underline mt-2"
      >
        View on store <ExternalLink size={10} />
      </a>
    </div>
  )
}

function AppCard({ app }: { app: MobileApp }) {
  return (
    <div className="border border-brand-border bg-white rounded-lg p-4">
      <div className="flex items-baseline gap-2 mb-3">
        <div className="font-serif font-semibold text-brand-dark">{app.name}</div>
        {app.audience && (
          <span className="text-[10px] uppercase tracking-wider text-brand-dark/40 font-semibold">· {app.audience}</span>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <PlatformColumn listing={app.ios}     label="iOS — Apple App Store" />
        <PlatformColumn listing={app.android} label="Android — Google Play" />
      </div>
      {app.note && (
        <p className="text-xs text-brand-dark/60 leading-relaxed mt-3 italic">{app.note}</p>
      )}
    </div>
  )
}

export default function VendorMobileApp({ profile }: Props) {
  if (profile.apps.length === 0) return null

  // Header summary: pick the best-rated iOS listing as the snapshot value
  // since iOS data is most reliably scraped right now.
  const iosListings = profile.apps.map(a => a.ios).filter((l): l is MobileAppListing => !!l && !l.unverified && l.rating != null)
  const headlineRating = iosListings.length > 0
    ? Math.max(...iosListings.map(l => l.rating!))
    : null

  return (
    <div id="mobile" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
      <div className="flex items-center gap-2 mb-1">
        <Smartphone size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Mobile App Footprint</span>
        {headlineRating != null && (
          <span className="ml-auto text-xs text-brand-dark/50 tabular-nums">
            iOS headline: <span className="font-semibold text-brand-dark">{headlineRating.toFixed(1)}</span> / 5
          </span>
        )}
      </div>
      <p className="text-xs text-brand-dark/50 mb-5 leading-relaxed">
        App stores are dated to the day and authoritative. A flagship app last updated 14 months ago tells a story analyst reports never will.
      </p>

      <div className="space-y-4">
        {profile.apps.map((app, i) => <AppCard key={i} app={app} />)}
      </div>

      {profile.notes && profile.notes.length > 0 && (
        <div className="mt-5 pt-4 border-t border-brand-cream">
          <ul className="space-y-1.5">
            {profile.notes.map((n, i) => (
              <li key={i} className="text-xs text-brand-dark/60 leading-relaxed flex gap-2">
                <span className="text-brand-terracotta shrink-0">→</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-brand-dark/30 mt-5 pt-4 border-t border-brand-cream">
        Sources: Apple App Store (apps.apple.com) and Google Play (play.google.com) public listings. Verified {profile.verifiedDate}. Freshness pills are computed from "last updated" against today's date.
      </p>
    </div>
  )
}
