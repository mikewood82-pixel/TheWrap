import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Bell, Check, X } from 'lucide-react'
import { FEATURES } from '../../config/features'
import { useAuthedFetch, useWrapPlus } from '../../context/WrapPlusContext'
import type { JobsFilterState } from './JobsFilters'

/**
 * "Save as alert" entry point on /jobs. Hidden entirely for non-Plus viewers
 * (Plus gating is UX-only — the underlying API already enforces requirePlus).
 *
 * Clicking opens a small modal prompt for a name. On submit the current
 * filters + the user's primary Clerk email are POSTed to /api/jobs/alerts
 * and the GHA cron will start including matching roles in tomorrow morning's
 * digest.
 */
export default function SaveSearchButton({ filters }: { filters: JobsFilterState }) {
  const { isPro, isLoaded } = useWrapPlus()
  const [open, setOpen] = useState(false)

  if (!FEATURES.PLUS_ENABLED || !isLoaded || !isPro) return null

  const hasAny =
    filters.q.length > 0 ||
    filters.vendors.length > 0 ||
    filters.remote.length > 0 ||
    filters.seniority.length > 0 ||
    filters.location.length > 0 ||
    filters.postedSince > 0

  return (
    <>
      <button
        type="button"
        disabled={!hasAny}
        onClick={() => setOpen(true)}
        title={hasAny ? 'Save this search as an alert' : 'Apply at least one filter to save as an alert'}
        className="inline-flex items-center gap-1.5 px-3 py-2.5 border border-brand-border rounded-lg bg-white text-brand-muted hover:text-brand-terracotta hover:border-brand-terracotta transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-brand-muted disabled:hover:border-brand-border"
      >
        <Bell size={14} />
        Save as alert
      </button>
      {open && <SaveAlertModal filters={filters} onClose={() => setOpen(false)} />}
    </>
  )
}

function SaveAlertModal({
  filters,
  onClose,
}: {
  filters: JobsFilterState
  onClose: () => void
}) {
  const { user } = useUser()
  const authedFetch = useAuthedFetch()
  const [name, setName] = useState(() => suggestName(filters))
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const email = user?.primaryEmailAddress?.emailAddress ?? ''

  async function submit() {
    if (!email) { setErrorMsg('Your Clerk account has no email on file.'); setState('error'); return }
    if (!name.trim()) return
    setState('saving'); setErrorMsg('')
    try {
      const res = await authedFetch('/api/jobs/alerts', {
        method: 'POST',
        body: JSON.stringify({
          email,
          name: name.trim(),
          query: {
            q: filters.q,
            vendors: filters.vendors,
            remote: filters.remote,
            seniority: filters.seniority,
            location: filters.location,
            posted_since: filters.postedSince,
            fresh_hours: 0,
          },
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({} as { error?: string; limit?: number }))
        const msg = body.error === 'alert_limit_reached'
          ? `You've reached the ${body.limit ?? 20}-alert limit.`
          : body.error === 'query_too_broad'
            ? 'Add at least one real filter before saving.'
            : `Couldn't save (${res.status}).`
        setErrorMsg(msg); setState('error'); return
      }
      setState('saved')
      setTimeout(onClose, 1600)
    } catch {
      setErrorMsg('Network error. Try again.')
      setState('error')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-alert-title"
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id="save-alert-title" className="font-serif text-xl font-bold text-brand-dark leading-tight">
              Save this search as an alert
            </h2>
            <p className="text-xs text-brand-muted mt-1">
              We'll email you matching roles once a day. Sent to <strong>{email || '(no email on file)'}</strong>.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-brand-muted hover:text-brand-dark shrink-0">
            <X size={18} />
          </button>
        </div>

        <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1.5">
          Name this alert
        </label>
        <input
          type="text"
          value={name}
          maxLength={120}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && state !== 'saving') submit() }}
          autoFocus
          placeholder="e.g. Remote Senior PM"
          className="w-full px-3 py-2 bg-white border border-brand-border rounded-lg focus:outline-none focus:border-brand-terracotta text-sm"
        />

        <FilterSummary filters={filters} />

        {state === 'error' && (
          <p className="text-red-600 text-sm mt-3">{errorMsg || 'Something went wrong.'}</p>
        )}
        {state === 'saved' && (
          <p className="text-green-700 text-sm mt-3 flex items-center gap-1.5">
            <Check size={14} /> Saved. You'll start getting daily digests tomorrow morning.
          </p>
        )}

        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={state === 'saving'}
            className="px-4 py-2 text-sm font-semibold text-brand-muted hover:text-brand-dark transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={state === 'saving' || state === 'saved' || !name.trim()}
            className="px-5 py-2 text-sm font-semibold bg-brand-terracotta text-white rounded-lg hover:bg-brand-orange transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === 'saving' ? 'Saving...' : state === 'saved' ? 'Saved' : 'Save alert'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FilterSummary({ filters }: { filters: JobsFilterState }) {
  const chips: string[] = []
  if (filters.q) chips.push(`"${filters.q}"`)
  if (filters.vendors.length) chips.push(`${filters.vendors.length} vendor${filters.vendors.length === 1 ? '' : 's'}`)
  filters.remote.forEach(r => chips.push(r))
  filters.seniority.forEach(s => chips.push(s))
  if (filters.location) chips.push(filters.location)
  if (filters.postedSince) chips.push(`past ${filters.postedSince}d`)
  if (chips.length === 0) return null
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {chips.map(c => (
        <span key={c} className="text-[11px] bg-brand-surface border border-brand-border rounded-full px-2 py-0.5 text-brand-muted">
          {c}
        </span>
      ))}
    </div>
  )
}

function suggestName(filters: JobsFilterState): string {
  const parts: string[] = []
  if (filters.remote.includes('remote')) parts.push('Remote')
  if (filters.seniority.length === 1) parts.push(cap(filters.seniority[0]))
  if (filters.q) parts.push(filters.q)
  else if (filters.vendors.length === 1) parts.push(filters.vendors[0])
  else parts.push('roles')
  return parts.join(' ').trim().slice(0, 80) || 'Saved search'
}

function cap(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1) : s
}
