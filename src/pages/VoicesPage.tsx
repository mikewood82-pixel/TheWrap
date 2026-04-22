import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Rss } from 'lucide-react'
import SEO from '../components/SEO'
import VoiceCard, { type VoiceListItem } from '../components/voices/VoiceCard'

type FeedResponse  = { items: VoiceListItem[]; total: number; page: number; per_page: number }
type Source = {
  slug: string; name: string; kind: string; site_url: string
  avatar_url: string | null; description: string | null
  item_count: number; latest_published_at: string | null
}

const KINDS: { value: string; label: string }[] = [
  { value: '',           label: 'All' },
  { value: 'blog',       label: 'Blogs' },
  { value: 'newsletter', label: 'Newsletters' },
  { value: 'podcast',    label: 'Podcasts' },
  { value: 'video',      label: 'Videos' },
  { value: 'analyst',    label: 'Analysts' },
]

export default function VoicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [kind, setKind] = useState<string>(searchParams.get('kind') ?? '')
  const [source, setSource] = useState<string>(searchParams.get('source') ?? '')
  const [page, setPage] = useState<number>(parseInt(searchParams.get('page') ?? '1', 10) || 1)
  const [data, setData] = useState<FeedResponse | null>(null)
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Keep URL in sync (shareable links).
  useEffect(() => {
    const p = new URLSearchParams()
    if (kind)   p.set('kind', kind)
    if (source) p.set('source', source)
    if (page > 1) p.set('page', String(page))
    if (p.toString() !== searchParams.toString()) setSearchParams(p, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, source, page])

  // Source directory — loaded once.
  useEffect(() => {
    fetch('/api/voices/sources')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((d: { sources: Source[] }) => setSources(d.sources))
      .catch(() => { /* non-fatal */ })
  }, [])

  // Main feed.
  useEffect(() => {
    setLoading(true)
    setError(null)
    const qs = new URLSearchParams()
    if (kind)   qs.set('kind', kind)
    if (source) qs.set('source', source)
    if (page > 1) qs.set('page', String(page))
    fetch(`/api/voices/feed?${qs}`)
      .then(r => r.ok ? r.json() : Promise.reject(`feed ${r.status}`))
      .then((d: FeedResponse) => { setData(d); setLoading(false) })
      .catch(err => { setError(String(err)); setLoading(false) })
  }, [kind, source, page])

  const totalPages = useMemo(
    () => data ? Math.max(1, Math.ceil(data.total / data.per_page)) : 1,
    [data],
  )

  const selectedSource = source ? sources.find(s => s.slug === source) : null

  return (
    <>
      <SEO
        title="Voices"
        description="The HR tech conversation, beyond The Wrap. A curated hub of blogs, newsletters, podcasts, and analysts we read every week."
        url="/voices"
      />

      {/* Hero */}
      <section className="bg-brand-surface border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-brand-terracotta text-sm font-semibold uppercase tracking-wider mb-2">
            <Rss size={14} /> Voices
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-3">
            The HR tech conversation, beyond The Wrap
          </h1>
          <p className="text-brand-muted max-w-2xl">
            A curated hub of the writers, analysts, and podcasters we read every week.
            Every link goes straight to the source — support their work the same way you support ours.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-brand-border bg-white sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
          {KINDS.map(k => (
            <button
              key={k.value}
              onClick={() => { setKind(k.value); setPage(1) }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                kind === k.value
                  ? 'bg-brand-terracotta text-white border-brand-terracotta'
                  : 'bg-white text-brand-muted border-brand-border hover:border-brand-terracotta/50 hover:text-brand-dark'
              }`}
            >
              {k.label}
            </button>
          ))}
          {source && selectedSource && (
            <button
              onClick={() => { setSource(''); setPage(1) }}
              className="ml-auto text-xs text-brand-muted hover:text-brand-dark underline"
            >
              Clear source: {selectedSource.name} ×
            </button>
          )}
        </div>
      </section>

      {/* Feed + sidebar */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="lg:flex lg:gap-8 lg:items-start">
          {/* Sidebar — the curated source list. Desktop: sticky alongside the
              feed. Mobile/tablet: hidden here; the bottom "Source directory"
              section handles discovery below lg. */}
          <SourceSidebar
            sources={sources}
            activeSource={source}
            activeKind={kind}
            onSelectSource={slug => { setSource(slug); setPage(1) }}
          />

          <div className="flex-1 min-w-0">
            {loading && (
              <div className="text-center py-16 text-brand-muted">Loading the latest voices…</div>
            )}
            {error && !loading && (
              <div className="text-center py-16 text-red-700 bg-red-50 border border-red-200 rounded-lg">
                Couldn’t load voices right now. Please try again shortly.
              </div>
            )}
            {!loading && !error && data && data.items.length === 0 && (
              <div className="text-center py-16 text-brand-muted">
                No items match these filters yet. Check back later or{' '}
                <button onClick={() => { setKind(''); setSource(''); setPage(1) }} className="underline">
                  clear filters
                </button>.
              </div>
            )}
            {!loading && !error && data && data.items.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {data.items.map(it => <VoiceCard key={it.id} item={it} />)}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="px-3 py-1.5 border border-brand-border rounded-lg text-sm disabled:opacity-40 hover:border-brand-terracotta/50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-brand-muted px-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="px-3 py-1.5 border border-brand-border rounded-lg text-sm disabled:opacity-40 hover:border-brand-terracotta/50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mobile/tablet-only source directory. Hidden on desktop where the
          sticky sidebar covers this role. */}
      {sources.length > 0 && (
        <section className="lg:hidden bg-brand-surface border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Source directory</h2>
            <p className="text-brand-muted mb-6 max-w-2xl">
              The voices we follow. Tap any to see just their posts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sources.map(s => (
                <Link
                  key={s.slug}
                  to={`/voices/${s.slug}`}
                  className="block bg-white border border-brand-border rounded-lg p-4 hover:border-brand-terracotta/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-brand-dark truncate">{s.name}</div>
                      <div className="text-xs text-brand-muted capitalize">{s.kind}</div>
                    </div>
                    <span className="text-xs text-brand-muted shrink-0">{s.item_count} posts</span>
                  </div>
                  {s.description && (
                    <p className="mt-2 text-sm text-brand-muted line-clamp-2">{s.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

// -------- Sidebar --------

function SourceSidebar({
  sources, activeSource, activeKind, onSelectSource,
}: {
  sources: Source[]
  activeSource: string
  activeKind: string
  onSelectSource: (slug: string) => void
}) {
  if (sources.length === 0) return null

  // If a kind filter is on, dim sources that don't match so the sidebar
  // reflects what the main feed is actually showing.
  const matchesKind = (s: Source) => !activeKind || s.kind === activeKind

  return (
    <aside className="hidden lg:block w-56 xl:w-60 shrink-0 sticky top-32 self-start">
      <div className="bg-white border border-brand-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-brand-border bg-brand-surface">
          <div className="text-[10px] uppercase tracking-widest font-semibold text-brand-muted">
            The Wrap follows
          </div>
          <div className="text-xs text-brand-muted mt-0.5">
            {sources.length} voice{sources.length === 1 ? '' : 's'} curated
          </div>
        </div>

        <button
          onClick={() => onSelectSource('')}
          className={[
            'w-full text-left px-4 py-2.5 text-sm border-b border-brand-border transition-colors',
            activeSource === ''
              ? 'bg-brand-terracotta/10 text-brand-terracotta font-semibold'
              : 'text-brand-dark hover:bg-brand-surface',
          ].join(' ')}
        >
          All voices
        </button>

        <ul className="max-h-[calc(100vh-13rem)] overflow-y-auto">
          {sources.map(s => {
            const active = s.slug === activeSource
            const dim = !active && !matchesKind(s)
            return (
              <li key={s.slug}>
                <button
                  onClick={() => onSelectSource(active ? '' : s.slug)}
                  className={[
                    'w-full text-left px-4 py-2.5 flex items-center gap-3 border-b border-brand-border/60 transition-colors',
                    active
                      ? 'bg-brand-terracotta/10'
                      : 'hover:bg-brand-surface',
                    dim ? 'opacity-50' : '',
                  ].join(' ')}
                  title={s.description ?? s.name}
                >
                  <SourceAvatar source={s} />
                  <div className="min-w-0 flex-1">
                    <div className={[
                      'text-sm truncate',
                      active ? 'text-brand-terracotta font-semibold' : 'text-brand-dark font-medium',
                    ].join(' ')}>
                      {s.name}
                    </div>
                    <div className="text-[11px] text-brand-muted capitalize truncate">
                      {s.kind} · {s.item_count} post{s.item_count === 1 ? '' : 's'}
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

function SourceAvatar({ source }: { source: Source }) {
  if (source.avatar_url) {
    return (
      <img
        src={source.avatar_url}
        alt=""
        loading="lazy"
        className="w-8 h-8 rounded-full object-cover shrink-0 bg-brand-surface"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
    )
  }
  const initial = source.name.trim().charAt(0).toUpperCase() || '·'
  return (
    <div className="w-8 h-8 rounded-full bg-brand-terracotta/10 text-brand-terracotta text-xs font-semibold flex items-center justify-center shrink-0">
      {initial}
    </div>
  )
}
