import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useWrapPlus } from '../../context/WrapPlusContext'
import { useWatchlist } from '../../context/WatchlistContext'

/**
 * Save/unsave toggle rendered on each JobCard + on the JobDetailPage.
 * Hidden entirely for non-Plus viewers — the upgrade path lives on /jobs's
 * FreshArrivalsSection paywall rather than on every card to keep the list
 * visually calm.
 *
 * Size variants match the surrounding typography so this can sit cleanly
 * next to the role-age badge on a card ("sm") or next to the Apply button
 * on the detail page ("lg").
 */
export default function BookmarkButton({
  jobId,
  size = 'sm',
  stopPropagation = true,
}: {
  jobId: number
  size?: 'sm' | 'lg'
  /** Cards wrap the button in a <Link>. Set true to keep a click from navigating. */
  stopPropagation?: boolean
}) {
  const { isPro, isLoaded } = useWrapPlus()
  const { isSaved, toggle } = useWatchlist()

  if (!isLoaded || !isPro) return null

  const saved = isSaved(jobId)
  const iconSize = size === 'lg' ? 18 : 14
  const pad = size === 'lg' ? 'p-2' : 'p-1.5'

  return (
    <button
      type="button"
      aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
      aria-pressed={saved}
      title={saved ? 'Saved — click to remove' : 'Save this role'}
      onClick={e => {
        if (stopPropagation) { e.preventDefault(); e.stopPropagation() }
        void toggle(jobId)
      }}
      className={[
        'shrink-0 rounded-md transition-colors',
        pad,
        saved
          ? 'text-brand-terracotta hover:bg-brand-terracotta/10'
          : 'text-brand-muted hover:text-brand-terracotta hover:bg-brand-terracotta/5',
      ].join(' ')}
    >
      {saved
        ? <BookmarkCheck size={iconSize} fill="currentColor" strokeWidth={1.8} />
        : <Bookmark size={iconSize} strokeWidth={1.8} />}
    </button>
  )
}
