import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Rss, Pause, Play, Inbox } from 'lucide-react'
import SEO from '../components/SEO'
import VoiceCard, { type VoiceListItem } from '../components/voices/VoiceCard'
import { useWrapPlus } from '../context/WrapPlusContext'
import { useVoicesFollow } from '../context/VoicesFollowContext'

type FeedResponse = { items: VoiceListItem[]; total: number; page: number; per_page: number }

/**
 * /voices/following — Wrap+ only. Shows items from the voices the user
 * follows, plus a management strip for pausing the Tuesday digest and
 * unfollowing individual sources.
 */
export default function VoicesFollowingPage() {
  const { isPro, isLoaded } = useWrapPlus()
  const {
    followedSlugs, followedSources, digestState, setDigestActive,
    toggle, hydrated,
  } = useVoicesFollow()
  const [items, setItems] = useState<VoiceListItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  // Non-Plus viewers are bounced to /voices — the hub page has its own upgrade
  // surface and this one is member-only by design.
  // Wait for isLoaded so we don't redirect during Clerk hydration.
  const shouldBounce = isLoaded && !isPro

  const sourceFilter = useMemo(
    () => Array.from(followedSlugs).join(','),
    [followedSlugs],
  )

  useEffect(() => {
    if (!isPro) { setLoading(false); return }
    if (!hydrated) return

    // No follows yet → skip the feed fetch, show the empty-state instead.
    if (followedSlugs.size === 0) {
      setItems([])
      setLoading(false)
      return
    }

    setLoading(true)
    fetch(`/api/voices/feed?source=${encodeURIComponent(sourceFilter)}&per_page=30`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((d: FeedResponse) => { setItems(d.items); setLoading(false) })
      .catch(() => { setItems([]); setLoading(false) })
  }, [isPro, hydrated, sourceFilter, followedSlugs.size])

  if (shouldBounce) return <Navigate to="/voices" replace />

  const lastSent = digestState.last_sent_at
    ? new Date(digestState.last_sent_at).toLocaleDateString(undefined, {
        weekday: 'long', month: 'short', day: 'numeric',
      })
    : 'Not yet'

  return (
    <>
      <SEO
        title="Following"
        description="Your followed voices on The Wrap — with a Tuesday digest of their new posts."
        url="/voices/following"
      />

      <section className="bg-brand-surface border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-brand-terracotta text-xs font-semibold uppercase tracking-wider mb-2">
            <Rss size={14} /> Voices · Following
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">Your voices</h1>
          <p className="mt-2 text-brand-muted max-w-2xl">
            The writers and analysts you follow, in one place.
            New posts arrive in a Tuesday morning digest.
          </p>
        </div>
      </section>

      {/* Digest controls strip */}
      <section className="border-b border-brand-border bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5 text-brand-muted">
            <Inbox size={14} />
            Tuesday digest · last sent <span className="text-brand-dark font-medium">{lastSent}</span>
          </span>
          <button
            onClick={() => void setDigestActive(!digestState.active)}
            className={[
              'ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors',
              digestState.active
                ? 'bg-white text-brand-dark border-brand-border hover:border-brand-terracotta/50'
                : 'bg-brand-terracotta text-white border-brand-terracotta hover:opacity-90',
            ].join(' ')}
          >
            {digestState.active ? <Pause size={12} /> : <Play size={12} />}
            {digestState.active ? 'Pause digest' : 'Resume digest'}
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        {(!hydrated || loading) && (
          <div className="text-center py-16 text-brand-muted">Loading…</div>
        )}

        {hydrated && !loading && followedSlugs.size === 0 && (
          <div className="max-w-xl mx-auto text-center py-16">
            <h2 className="font-serif text-xl font-semibold text-brand-dark mb-3">
              You’re not following anyone yet
            </h2>
            <p className="text-brand-muted mb-6">
              Head to the <Link to="/voices" className="text-brand-terracotta underline">Voices hub</Link>,
              tap the bell on any voice card, and start your Tuesday digest.
            </p>
          </div>
        )}

        {hydrated && !loading && followedSlugs.size > 0 && items && items.length > 0 && (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-dark mb-4">Latest from your voices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map(it => <VoiceCard key={it.id} item={it} />)}
            </div>
          </>
        )}

        {hydrated && !loading && followedSlugs.size > 0 && items && items.length === 0 && (
          <div className="text-center py-12 text-brand-muted">
            No recent posts yet — your Tuesday digest will fill up as they publish.
          </div>
        )}

        {/* Following-list management */}
        {hydrated && followedSources && followedSources.length > 0 && (
          <div className="mt-14 pt-8 border-t border-brand-border">
            <h2 className="font-serif text-xl font-bold text-brand-dark mb-4">
              Following {followedSources.length}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {followedSources.map(s => (
                <div
                  key={s.slug}
                  className="flex items-start justify-between gap-3 bg-white border border-brand-border rounded-lg p-4"
                >
                  <Link to={`/voices/${s.slug}`} className="min-w-0 flex-1">
                    <div className="font-semibold text-brand-dark truncate hover:text-brand-terracotta">
                      {s.name}
                    </div>
                    <div className="text-xs text-brand-muted capitalize mt-0.5">{s.kind}</div>
                  </Link>
                  <button
                    onClick={() => void toggle(s.slug)}
                    className="text-xs text-brand-muted hover:text-red-600 transition-colors shrink-0"
                  >
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
