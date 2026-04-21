import { Bell, BellOff } from 'lucide-react'
import { useWrapPlus } from '../../context/WrapPlusContext'
import { useVoicesFollow } from '../../context/VoicesFollowContext'

/**
 * Follow/unfollow toggle for a voice source. Hidden entirely for non-Plus
 * viewers — the upgrade path lives on the /voices header/paywall, not on
 * every card, to keep the list visually calm.
 *
 * `stopPropagation` is important on cards whose outer element is an <a> to
 * the source: clicking the bell must not navigate away.
 */
export default function FollowButton({
  sourceSlug,
  size = 'sm',
  stopPropagation = true,
}: {
  sourceSlug: string
  size?: 'sm' | 'lg'
  stopPropagation?: boolean
}) {
  const { isPro, isLoaded } = useWrapPlus()
  const { isFollowing, toggle } = useVoicesFollow()

  if (!isLoaded || !isPro) return null

  const following = isFollowing(sourceSlug)
  const iconSize = size === 'lg' ? 18 : 14
  const pad = size === 'lg' ? 'p-2' : 'p-1.5'

  return (
    <button
      type="button"
      aria-label={following ? 'Stop following this voice' : 'Follow this voice'}
      aria-pressed={following}
      title={following ? 'Following — click to unfollow' : 'Follow for Tuesday digest'}
      onClick={e => {
        if (stopPropagation) { e.preventDefault(); e.stopPropagation() }
        void toggle(sourceSlug)
      }}
      className={[
        'shrink-0 rounded-md transition-colors',
        pad,
        following
          ? 'text-brand-terracotta hover:bg-brand-terracotta/10'
          : 'text-brand-muted hover:text-brand-terracotta hover:bg-brand-terracotta/5',
      ].join(' ')}
    >
      {following
        ? <Bell size={iconSize} fill="currentColor" strokeWidth={1.8} />
        : <BellOff size={iconSize} strokeWidth={1.8} />}
    </button>
  )
}
