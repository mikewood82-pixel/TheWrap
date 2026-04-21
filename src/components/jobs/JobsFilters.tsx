import { useEffect, useState } from 'react'
import VelocitySparkline, { type HistoryPoint } from './VelocitySparkline'
import HiringHealthBadge, { type Health } from './HiringHealthBadge'
import { FEATURES } from '../../config/features'
import { useWrapPlus } from '../../context/WrapPlusContext'

export type JobsFilterState = {
  q: string
  vendors: string[]
  remote: string[]
  seniority: string[]
  location: string
  postedSince: number // days; 0 = any
}

export const EMPTY_FILTERS: JobsFilterState = {
  q: '', vendors: [], remote: [], seniority: [], location: '', postedSince: 0,
}

const REMOTE_OPTS = [
  { v: 'remote', label: 'Remote' },
  { v: 'hybrid', label: 'Hybrid' },
  { v: 'onsite', label: 'On-site' },
]
const SENIORITY_OPTS = [
  { v: 'entry',  label: 'Entry' },
  { v: 'mid',    label: 'Mid' },
  { v: 'senior', label: 'Senior' },
  { v: 'lead',   label: 'Lead / Manager' },
  { v: 'exec',   label: 'Executive' },
]
const POSTED_OPTS = [
  { v: 0,  label: 'Any time' },
  { v: 1,  label: 'Past 24h' },
  { v: 7,  label: 'Past week' },
  { v: 30, label: 'Past month' },
]

type VendorOpt = {
  slug: string
  name: string
  open_jobs: number
  /** Optional last-30d snapshot history for the sparkline column. */
  history?: HistoryPoint[]
  /** Optional hiring-health verdict. Plus-gated on render. */
  health?: Health
}

export default function JobsFilters({
  filters, onChange, vendorOptions,
}: {
  filters: JobsFilterState
  onChange: (next: JobsFilterState) => void
  vendorOptions: VendorOpt[]
}) {
  const [vendorSearch, setVendorSearch] = useState('')
  const visibleVendors = vendorOptions.filter(v =>
    !vendorSearch || v.name.toLowerCase().includes(vendorSearch.toLowerCase()))

  const toggle = (key: 'vendors' | 'remote' | 'seniority', value: string) => {
    const cur = filters[key]
    const next = cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value]
    onChange({ ...filters, [key]: next })
  }

  return (
    <aside className="space-y-6 text-sm">
      <Section title="Posted">
        <div className="space-y-1.5">
          {POSTED_OPTS.map(o => (
            <label key={o.v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="posted"
                className="accent-brand-terracotta"
                checked={filters.postedSince === o.v}
                onChange={() => onChange({ ...filters, postedSince: o.v })}
              />
              <span className="text-brand-muted">{o.label}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Work style">
        {REMOTE_OPTS.map(o => (
          <Checkbox key={o.v} label={o.label}
            checked={filters.remote.includes(o.v)}
            onChange={() => toggle('remote', o.v)} />
        ))}
      </Section>

      <Section title="Seniority">
        {SENIORITY_OPTS.map(o => (
          <Checkbox key={o.v} label={o.label}
            checked={filters.seniority.includes(o.v)}
            onChange={() => toggle('seniority', o.v)} />
        ))}
      </Section>

      <Section title="Location (city / region)">
        <input
          type="text"
          placeholder="e.g. New York, London"
          value={filters.location}
          onChange={e => onChange({ ...filters, location: e.target.value })}
          className="w-full px-3 py-2 border border-brand-border rounded-md bg-white focus:outline-none focus:border-brand-terracotta"
        />
      </Section>

      <Section title={`Vendor (${vendorOptions.length})`}>
        <input
          type="text"
          placeholder="Filter vendors..."
          value={vendorSearch}
          onChange={e => setVendorSearch(e.target.value)}
          className="w-full mb-2 px-3 py-2 border border-brand-border rounded-md bg-white focus:outline-none focus:border-brand-terracotta"
        />
        <div className="max-h-64 overflow-y-auto pr-1 space-y-1">
          {visibleVendors.map(v => (
            <VendorRow
              key={v.slug}
              vendor={v}
              checked={filters.vendors.includes(v.slug)}
              onToggle={() => toggle('vendors', v.slug)}
            />
          ))}
          {!visibleVendors.length && (
            <p className="text-xs text-brand-muted italic">No matches.</p>
          )}
        </div>
      </Section>

      <button
        onClick={() => onChange(EMPTY_FILTERS)}
        className="text-xs text-brand-terracotta hover:underline"
      >
        Reset all filters
      </button>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-brand-dark font-semibold mb-2">{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="accent-brand-terracotta" checked={checked} onChange={onChange} />
      <span className="text-brand-muted">{label}</span>
    </label>
  )
}

function VendorRow({
  vendor, checked, onToggle,
}: {
  vendor: VendorOpt
  checked: boolean
  onToggle: () => void
}) {
  // Health pill is the Plus value-add; free viewers see the sparkline
  // "teaser" only. Wrapped in the feature-flag + membership check so the
  // free-tier layout is unchanged when Plus hasn't launched.
  const { isPro, isLoaded } = useWrapPlus()
  const showHealth =
    FEATURES.PLUS_ENABLED && isLoaded && isPro && !!vendor.health

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="accent-brand-terracotta shrink-0"
        checked={checked}
        onChange={onToggle}
      />
      <span className="text-brand-muted flex-1 min-w-0 truncate">
        {vendor.name} ({vendor.open_jobs})
      </span>
      {showHealth && <HiringHealthBadge health={vendor.health!} />}
      {vendor.history && vendor.history.length >= 3 && (
        <VelocitySparkline history={vendor.history} />
      )}
    </label>
  )
}

// Controlled debounce helper for text inputs — not currently used because the
// filter panel only debounces in the page itself, but exported for future use.
export function useDebounced<T>(value: T, ms = 250): T {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}
