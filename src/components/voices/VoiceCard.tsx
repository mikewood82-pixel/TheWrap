import { ExternalLink, Star } from 'lucide-react'

export type VoiceListItem = {
  id: number
  source_slug: string
  source_name: string
  source_kind: string
  source_avatar: string | null
  title: string
  url: string
  excerpt: string | null
  image_url: string | null
  author: string | null
  published_at: string
  featured: number
}

// Every voice card links OUT to the source. target=_blank + rel external so the
// reader lands on the creator's site, which is the whole point of the feature.
export default function VoiceCard({ item }: { item: VoiceListItem }) {
  const date = relativeDate(item.published_at)
  const kindLabel = kindToLabel(item.source_kind)

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener external"
      className="group block bg-white border border-brand-border rounded-lg overflow-hidden hover:border-brand-terracotta/60 hover:shadow-sm transition-all"
    >
      {item.image_url && (
        <div className="aspect-[16/9] bg-brand-surface overflow-hidden">
          {/* Source-hosted image. If load fails, we fall back to the card without it. */}
          <img
            src={item.image_url}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }}
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-brand-terracotta truncate">
              {item.source_name}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-brand-muted bg-brand-surface border border-brand-border rounded-full px-2 py-0.5 shrink-0">
              {kindLabel}
            </span>
          </div>
          {item.featured === 1 && (
            <span title="Editor's pick" className="shrink-0 text-brand-gold">
              <Star size={14} fill="currentColor" />
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg text-brand-dark font-semibold leading-snug group-hover:text-brand-terracotta transition-colors">
          {item.title}
        </h3>

        {item.excerpt && (
          <p className="mt-2 text-sm text-brand-muted line-clamp-3">
            {item.excerpt}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-brand-muted">
          <span>{date}</span>
          <span className="flex items-center gap-1 text-brand-terracotta/80 group-hover:text-brand-terracotta">
            Read on {hostnameOf(item.url)}
            <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </a>
  )
}

function kindToLabel(kind: string): string {
  switch (kind) {
    case 'blog':       return 'Blog'
    case 'newsletter': return 'Newsletter'
    case 'podcast':    return 'Podcast'
    case 'video':      return 'Video'
    case 'analyst':    return 'Analyst'
    default:           return kind
  }
}

function hostnameOf(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return 'source' }
}

function relativeDate(iso: string): string {
  const t = new Date(iso).getTime()
  if (isNaN(t)) return ''
  const diffMs = Date.now() - t
  const hours = Math.floor(diffMs / 3_600_000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7)  return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
