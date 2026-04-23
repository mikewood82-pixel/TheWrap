import { ExternalLink, Sparkles } from 'lucide-react'
import FollowButton from './FollowButton'
import type { VoiceListItem } from './VoiceCard'

type Props = {
  item: VoiceListItem
  note?: string
}

export default function StaffPickHero({ item, note }: Props) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener external"
      className="group relative block mb-8 rounded-xl overflow-hidden border border-brand-gold/60 bg-gradient-to-br from-brand-light via-white to-brand-cream/40 shadow-sm hover:shadow-md hover:border-brand-gold transition-all"
    >
      {/* Decorative gold corner wash. Pure aesthetic — pointer-events-none so
          the whole card stays a single click target. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-gold/10 to-transparent"
      />

      <div className="relative md:flex md:items-stretch">
        {item.image_url && (
          <div className="md:w-[45%] md:shrink-0 aspect-[16/9] md:aspect-auto bg-brand-surface overflow-hidden">
            <img
              src={item.image_url}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }}
            />
          </div>
        )}

        <div className="flex-1 p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-brown border border-brand-gold/60 text-[11px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
              <Sparkles size={12} className="text-brand-gold" fill="currentColor" />
              Staff Pick
            </span>
            <FollowButton sourceSlug={item.source_slug} />
          </div>

          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className="font-semibold text-brand-terracotta">{item.source_name}</span>
            {item.author && (
              <>
                <span className="text-brand-muted">·</span>
                <span className="text-brand-muted">{item.author}</span>
              </>
            )}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark leading-tight group-hover:text-brand-terracotta transition-colors">
            {item.title}
          </h2>

          {note ? (
            <p className="mt-3 text-sm md:text-base text-brand-brown italic border-l-2 border-brand-gold/60 pl-3">
              {note}
            </p>
          ) : item.excerpt ? (
            <p className="mt-3 text-sm md:text-base text-brand-muted line-clamp-3">
              {item.excerpt}
            </p>
          ) : null}

          <div className="mt-auto pt-5 flex items-center justify-between text-sm">
            <span className="text-brand-muted text-xs">{formatDate(item.published_at)}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand-terracotta group-hover:gap-2 transition-all">
              Read on {hostnameOf(item.url)}
              <ExternalLink size={14} />
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

function hostnameOf(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return 'source' }
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}
