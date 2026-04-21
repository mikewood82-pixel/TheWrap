import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import VoiceCard, { type VoiceListItem } from '../components/voices/VoiceCard'
import FollowButton from '../components/voices/FollowButton'

type Source = {
  slug: string
  name: string
  kind: string
  site_url: string
  feed_url: string
  avatar_url: string | null
  description: string | null
  last_fetched_at: string | null
  item_count: number
  latest_published_at: string | null
}

type FeedResponse = { items: VoiceListItem[]; total: number; page: number; per_page: number }

export default function VoiceSourcePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [source, setSource] = useState<Source | null>(null)
  const [items, setItems] = useState<VoiceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true); setNotFound(false)
    Promise.all([
      fetch(`/api/voices/source/${encodeURIComponent(slug)}`)
        .then(r => r.status === 404 ? null : r.ok ? r.json() : Promise.reject(r.statusText)),
      fetch(`/api/voices/feed?source=${encodeURIComponent(slug)}&per_page=30`)
        .then(r => r.ok ? r.json() : Promise.reject(r.statusText)),
    ])
      .then(([src, feed]) => {
        if (!src) { setNotFound(true); setLoading(false); return }
        setSource((src as { source: Source }).source)
        setItems((feed as FeedResponse).items)
        setLoading(false)
      })
      .catch(() => { setLoading(false); setNotFound(true) })
  }, [slug])

  if (notFound) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <SEO title="Voice not found" url={`/voices/${slug}`} />
        <h1 className="font-serif text-2xl font-bold text-brand-dark mb-3">Voice not found</h1>
        <p className="text-brand-muted mb-6">We don’t track that source (yet).</p>
        <Link to="/voices" className="text-brand-terracotta underline">← Back to Voices</Link>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={source ? source.name : 'Voice'}
        description={source?.description ?? `Latest posts from ${source?.name ?? 'this voice'} on The Wrap’s curated HR tech hub.`}
        url={`/voices/${slug}`}
      />

      <section className="bg-brand-surface border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/voices" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-4">
            <ArrowLeft size={14} /> All voices
          </Link>
          {source ? (
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-brand-muted mb-1">
                  {source.kind}
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">{source.name}</h1>
                {source.description && (
                  <p className="mt-2 text-brand-muted max-w-2xl">{source.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <FollowButton sourceSlug={source.slug} size="lg" stopPropagation={false} />
                <a
                  href={source.site_url}
                  target="_blank"
                  rel="noopener external"
                  className="inline-flex items-center gap-1.5 bg-brand-terracotta text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Visit their site <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ) : (
            <div className="h-24 animate-pulse bg-brand-border/40 rounded" />
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16 text-brand-muted">Loading posts…</div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-brand-muted">
            No posts yet from this source. New items appear after the next ingest run.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(it => <VoiceCard key={it.id} item={it} />)}
          </div>
        )}
      </section>
    </>
  )
}
