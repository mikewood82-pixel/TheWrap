import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SignInButton, useAuth } from '@clerk/clerk-react'
import { ArrowLeft, ArrowRight, Bell, Trash2, Zap, ZapOff } from 'lucide-react'
import SEO from '../components/SEO'
import { FEATURES } from '../config/features'
import { useAuthedFetch, useWrapPlus } from '../context/WrapPlusContext'

type SavedQuery = {
  q: string
  vendors: string[]
  remote: string[]
  seniority: string[]
  location: string
  posted_since: number
  fresh_hours: number
}

type AlertItem = {
  id: number
  email: string
  name: string | null
  active: number
  created_at: string
  frequency: string
  webhook_url: string | null
  query: SavedQuery
}

/**
 * /jobs/alerts — manage saved searches.
 *
 * Same three-state gate as SavedJobsPage: signed-out → prompt, free →
 * upgrade, Plus → live list. Keeps the route registered for all users so
 * email deep-links don't 404 when someone isn't signed in.
 */
export default function AlertsPage() {
  if (!FEATURES.PLUS_ENABLED) return <ComingSoon />
  return <Gate />
}

function Gate() {
  const { isPro, isLoaded: plusLoaded } = useWrapPlus()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()

  return (
    <div className="bg-brand-light min-h-screen">
      <SEO title="Alerts — The Wrap" description="Your saved job-search alerts on The Wrap." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-terracotta mb-6">
          <ArrowLeft size={14} /> All jobs
        </Link>
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-brand-dark">Alerts</h1>
          <p className="mt-2 text-brand-muted">
            Daily email digests of new roles matching your saved searches.
          </p>
        </header>

        {!plusLoaded || !authLoaded ? (
          <div className="text-brand-muted text-sm">Loading...</div>
        ) : !isSignedIn ? (
          <SignedOutPrompt />
        ) : !isPro ? (
          <UpgradePrompt />
        ) : (
          <AlertsList />
        )}
      </div>
    </div>
  )
}

function AlertsList() {
  const authedFetch = useAuthedFetch()
  const [alerts, setAlerts] = useState<AlertItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const r = await authedFetch('/api/jobs/alerts')
      if (!r.ok) throw new Error(String(r.status))
      const d = (await r.json()) as { alerts: AlertItem[] }
      setAlerts(d.alerts)
    } catch (e) {
      setError(String(e))
    }
  }, [authedFetch])

  useEffect(() => { void refresh() }, [refresh])

  async function toggleActive(a: AlertItem) {
    // Optimistic flip.
    setAlerts(prev => prev?.map(x => x.id === a.id ? { ...x, active: x.active ? 0 : 1 } : x) ?? null)
    try {
      const r = await authedFetch(`/api/jobs/alerts/${a.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ active: !a.active }),
      })
      if (!r.ok) throw new Error()
    } catch {
      // Revert.
      setAlerts(prev => prev?.map(x => x.id === a.id ? { ...x, active: a.active } : x) ?? null)
    }
  }

  async function remove(a: AlertItem) {
    if (!confirm(`Delete "${a.name ?? 'this alert'}"? This also clears its history.`)) return
    setAlerts(prev => prev?.filter(x => x.id !== a.id) ?? null)
    try {
      const r = await authedFetch(`/api/jobs/alerts/${a.id}`, { method: 'DELETE' })
      if (!r.ok && r.status !== 404) throw new Error()
    } catch {
      void refresh()  // re-fetch on failure
    }
  }

  async function setFrequency(a: AlertItem, frequency: 'daily' | 'weekly') {
    setAlerts(prev => prev?.map(x => x.id === a.id ? { ...x, frequency } : x) ?? null)
    try {
      const r = await authedFetch(`/api/jobs/alerts/${a.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ frequency }),
      })
      if (!r.ok) throw new Error()
    } catch {
      setAlerts(prev => prev?.map(x => x.id === a.id ? { ...x, frequency: a.frequency } : x) ?? null)
    }
  }

  async function setWebhook(a: AlertItem, webhook_url: string | null) {
    const prevVal = a.webhook_url
    setAlerts(prev => prev?.map(x => x.id === a.id ? { ...x, webhook_url } : x) ?? null)
    try {
      const r = await authedFetch(`/api/jobs/alerts/${a.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ webhook_url: webhook_url ?? null }),
      })
      if (!r.ok) throw new Error()
    } catch {
      setAlerts(prev => prev?.map(x => x.id === a.id ? { ...x, webhook_url: prevVal } : x) ?? null)
    }
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">Couldn't load alerts ({error}).</div>
  }
  if (alerts === null) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white border border-brand-border rounded-lg h-[96px] animate-pulse" />
        ))}
      </div>
    )
  }
  if (alerts.length === 0) {
    return (
      <div className="bg-white border border-brand-border rounded-lg p-10 text-center">
        <Bell size={28} className="mx-auto text-brand-border mb-3" />
        <p className="font-serif text-xl text-brand-dark mb-1">No alerts yet</p>
        <p className="text-sm text-brand-muted mb-5 max-w-md mx-auto">
          Open the jobs board, apply any filter you care about (e.g. Remote + Senior + "product manager"),
          then click "Save as alert" above the results.
        </p>
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-terracotta hover:underline">
          Browse open roles <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {alerts.map(a => (
        <li
          key={a.id}
          className={`bg-white border border-brand-border rounded-lg p-4 ${a.active ? '' : 'opacity-70'}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif font-bold text-brand-dark">{a.name ?? 'Untitled alert'}</h3>
                {!a.active && (
                  <span className="text-[10px] font-semibold bg-brand-surface border border-brand-border rounded-full px-2 py-0.5 text-brand-muted uppercase tracking-wide">
                    Paused
                  </span>
                )}
              </div>
              <p className="text-xs text-brand-muted mb-2">To {a.email} · created {a.created_at.slice(0, 10)}</p>
              <QuerySummary query={a.query} />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!a.active}
                  onChange={() => toggleActive(a)}
                  className="sr-only peer"
                />
                <span className="relative inline-block h-5 w-9 rounded-full bg-brand-border peer-checked:bg-brand-terracotta transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
              </label>
              <button
                onClick={() => remove(a)}
                aria-label="Delete alert"
                title="Delete alert"
                className="p-2 text-brand-muted hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Delivery settings strip */}
          <div className="mt-3 pt-3 border-t border-brand-border/60 flex flex-wrap items-center gap-3 text-xs">
            <label className="flex items-center gap-2 text-brand-muted">
              Frequency:
              <select
                value={a.frequency}
                onChange={e => setFrequency(a, e.target.value as 'daily' | 'weekly')}
                className="bg-white border border-brand-border rounded px-2 py-1 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-terracotta"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly (Mondays)</option>
              </select>
            </label>
            <WebhookControl
              value={a.webhook_url}
              onSave={url => setWebhook(a, url)}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

function WebhookControl({
  value, onSave,
}: {
  value: string | null
  onSave: (url: string | null) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value ?? '')
  const [testing, setTesting] = useState<'idle' | 'ok' | 'fail'>('idle')

  if (!editing) {
    return (
      <button
        onClick={() => { setDraft(value ?? ''); setEditing(true) }}
        className="flex items-center gap-1 text-brand-muted hover:text-brand-terracotta"
      >
        {value ? <Zap size={12} className="text-brand-terracotta" /> : <ZapOff size={12} />}
        {value ? 'Webhook on · edit' : 'Add Slack / webhook'}
      </button>
    )
  }

  async function test() {
    if (!draft.trim()) return
    setTesting('idle')
    try {
      const r = await fetch(draft.trim(), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: ':white_check_mark: Test from The Wrap — webhook is reachable.' }),
      })
      setTesting(r.ok ? 'ok' : 'fail')
    } catch {
      setTesting('fail')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
      <input
        type="url"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder="https://hooks.slack.com/services/…"
        className="flex-1 min-w-[220px] bg-white border border-brand-border rounded px-2 py-1 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-terracotta"
      />
      <button
        onClick={test}
        disabled={!draft.trim()}
        className="px-2 py-1 rounded text-xs font-semibold border border-brand-border text-brand-muted hover:border-brand-terracotta/60 disabled:opacity-40"
      >
        Test
      </button>
      <button
        onClick={() => { onSave(draft.trim() || null); setEditing(false); setTesting('idle') }}
        className="px-2 py-1 rounded text-xs font-semibold bg-brand-terracotta text-white hover:opacity-90"
      >
        Save
      </button>
      <button
        onClick={() => { setEditing(false); setTesting('idle') }}
        className="px-2 py-1 rounded text-xs text-brand-muted hover:text-brand-dark"
      >
        Cancel
      </button>
      {testing === 'ok'   && <span className="text-green-700">✓ reachable</span>}
      {testing === 'fail' && <span className="text-red-600">✗ failed</span>}
    </div>
  )
}

function QuerySummary({ query }: { query: SavedQuery }) {
  const chips: string[] = []
  if (query.q) chips.push(`"${query.q}"`)
  if (query.vendors.length) chips.push(`${query.vendors.length} vendor${query.vendors.length === 1 ? '' : 's'}`)
  query.remote.forEach(r => chips.push(r))
  query.seniority.forEach(s => chips.push(s))
  if (query.location) chips.push(query.location)
  if (query.posted_since) chips.push(`past ${query.posted_since}d`)
  if (query.fresh_hours) chips.push(`past ${query.fresh_hours}h`)
  if (chips.length === 0) return <p className="text-xs text-brand-muted italic">No filters (matches everything)</p>
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map(c => (
        <span key={c} className="text-[11px] bg-brand-surface border border-brand-border rounded-full px-2 py-0.5 text-brand-muted">
          {c}
        </span>
      ))}
    </div>
  )
}

function UpgradePrompt() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200 rounded-xl p-8 text-center">
      <Bell size={28} className="mx-auto text-brand-terracotta mb-3" />
      <h2 className="font-serif text-2xl text-brand-dark mb-2">Alerts are a Wrap+ feature</h2>
      <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
        Save any filter combo — "Remote Senior PM", "Gusto + Lattice + Engineering", whatever — and
        get a daily digest of new roles without re-scanning the board.
      </p>
      <Link to="/subscribe" className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors">
        Upgrade to Wrap+ <ArrowRight size={16} />
      </Link>
    </div>
  )
}

function SignedOutPrompt() {
  return (
    <div className="bg-white border border-brand-border rounded-xl p-8 text-center">
      <Bell size={28} className="mx-auto text-brand-border mb-3" />
      <h2 className="font-serif text-2xl text-brand-dark mb-2">Sign in to manage your alerts</h2>
      <SignInButton mode="modal">
        <button className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors">
          Sign in <ArrowRight size={16} />
        </button>
      </SignInButton>
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl text-brand-dark mb-3">Alerts</h1>
        <p className="text-brand-muted">
          Coming soon with Wrap+. <Link to="/jobs" className="text-brand-terracotta hover:underline">Back to jobs</Link>
        </p>
      </div>
    </div>
  )
}
