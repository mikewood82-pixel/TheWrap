import { Bell, BellRing } from 'lucide-react'
import { useWrapPlus } from '../../context/WrapPlusContext'
import { useVendorAlerts } from '../../context/VendorAlertContext'

/**
 * Subscribe to hiring-health verdict-change alerts for a specific vendor.
 * Hidden for non-Plus viewers. Lives on vendor tiles on /jobs so the bell
 * sits right next to the verdict badge being watched.
 */
export default function VendorAlertButton({
  vendorSlug,
  size = 'sm',
  stopPropagation = true,
}: {
  vendorSlug: string
  size?: 'sm' | 'lg'
  stopPropagation?: boolean
}) {
  const { isPro, isLoaded } = useWrapPlus()
  const { isWatching, toggle } = useVendorAlerts()

  if (!isLoaded || !isPro) return null

  const watching = isWatching(vendorSlug)
  const iconSize = size === 'lg' ? 18 : 14
  const pad = size === 'lg' ? 'p-2' : 'p-1.5'

  return (
    <button
      type="button"
      aria-label={watching ? 'Stop alerts for this vendor' : 'Alert me on hiring health changes'}
      aria-pressed={watching}
      title={
        watching
          ? 'Alerting on health changes — click to stop'
          : 'Get emailed when this vendor\u2019s hiring-health verdict changes'
      }
      onClick={e => {
        if (stopPropagation) { e.preventDefault(); e.stopPropagation() }
        void toggle(vendorSlug)
      }}
      className={[
        'shrink-0 rounded-md transition-colors',
        pad,
        watching
          ? 'text-brand-terracotta hover:bg-brand-terracotta/10'
          : 'text-brand-muted hover:text-brand-terracotta hover:bg-brand-terracotta/5',
      ].join(' ')}
    >
      {watching
        ? <BellRing size={iconSize} fill="currentColor" strokeWidth={1.8} />
        : <Bell size={iconSize} strokeWidth={1.8} />}
    </button>
  )
}
