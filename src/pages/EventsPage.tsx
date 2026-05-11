import { useMemo, useState } from 'react'
import { ExternalLink, Search, X } from 'lucide-react'
import SEO from '../components/SEO'
import {
  events,
  CATEGORY_LABELS,
  REGION_LABELS,
  type EventCategory,
  type EventRegion,
  type IndustryEvent,
} from '../data/events'

type StatusFilter = 'upcoming' | 'all' | 'past'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FULL_MONTH = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const TODAY = (() => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
})()

function parseDate(str: string): Date {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function getEventStatus(event: IndustryEvent): 'upcoming' | 'imminent' | 'past' {
  const start = parseDate(event.start)
  const end = parseDate(event.end)
  if (TODAY >= start && TODAY <= end) return 'imminent'
  if (TODAY > end) return 'past'
  return 'upcoming'
}

function formatDateRange(event: IndustryEvent): { day: string; month: string; year: number; duration: string } {
  const start = parseDate(event.start)
  const end = parseDate(event.end)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const sameDay = event.start === event.end
  const day1 = start.getDate()
  const day2 = end.getDate()
  const month = MONTH_NAMES[start.getMonth()]
  const endMonth = MONTH_NAMES[end.getMonth()]
  const year = start.getFullYear()
  if (sameDay) return { day: String(day1), month, year, duration: '1 day' }
  if (sameMonth) {
    const days = day2 - day1 + 1
    return { day: `${day1}–${day2}`, month, year, duration: `${days} days` }
  }
  const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return { day: `${day1}`, month: `${month}–${endMonth}`, year, duration: `${days} days` }
}

const STATUS_CHIPS: { value: StatusFilter; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'all',      label: 'All'      },
  { value: 'past',     label: 'Past'     },
]

const REGION_CHIPS: { value: 'all' | EventRegion; label: string }[] = [
  { value: 'all',           label: 'All'           },
  { value: 'north-america', label: 'North America' },
  { value: 'europe',        label: 'Europe'        },
  { value: 'other',         label: 'MEA / APAC'    },
]

const CATEGORY_CHIPS: { value: 'all' | EventCategory; label: string }[] = [
  { value: 'all',     label: 'All'                    },
  { value: 'hr',      label: 'HR'                     },
  { value: 'ta',      label: 'TA / Recruiting'        },
  { value: 'hrtech',  label: 'HR Tech'                },
  { value: 'vendor',  label: 'Vendor User Conference' },
  { value: 'analyst', label: 'Analyst'                },
]

const CATEGORY_TAG_CLASS: Record<EventCategory, string> = {
  hr:      'bg-amber-50 text-amber-800 border-amber-200',
  ta:      'bg-emerald-50 text-emerald-800 border-emerald-200',
  hrtech:  'bg-sky-50 text-sky-800 border-sky-200',
  vendor:  'bg-rose-50 text-rose-800 border-rose-200',
  analyst: 'bg-violet-50 text-violet-800 border-violet-200',
}

function chipClasses(isActive: boolean, isDefault: boolean): string {
  if (isActive && isDefault) {
    return 'bg-brand-terracotta text-white border-brand-terracotta'
  }
  if (isActive) {
    return 'bg-brand-dark text-white border-brand-dark'
  }
  return 'bg-white text-brand-dark border-brand-border hover:bg-brand-surface'
}

export default function EventsPage() {
  const [status, setStatus] = useState<StatusFilter>('upcoming')
  const [region, setRegion] = useState<'all' | EventRegion>('all')
  const [category, setCategory] = useState<'all' | EventCategory>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return events
      .filter(e => {
        const st = getEventStatus(e)
        if (status === 'upcoming' && st === 'past') return false
        if (status === 'past' && st !== 'past') return false
        if (region !== 'all' && e.region !== region) return false
        if (category !== 'all' && e.category !== category) return false
        if (q) {
          const haystack = [
            e.name, e.location, e.venue ?? '', e.blurb,
            CATEGORY_LABELS[e.category], REGION_LABELS[e.region],
          ].join(' ').toLowerCase()
          if (!haystack.includes(q)) return false
        }
        return true
      })
      .sort((a, b) => a.start.localeCompare(b.start))
  }, [status, region, category, search])

  const grouped = useMemo(() => {
    const groups: { key: string; label: string; events: IndustryEvent[] }[] = []
    const byKey = new Map<string, { label: string; events: IndustryEvent[] }>()
    for (const e of filtered) {
      const d = parseDate(e.start)
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`
      let bucket = byKey.get(key)
      if (!bucket) {
        bucket = { label: `${FULL_MONTH[d.getMonth()]} ${d.getFullYear()}`, events: [] }
        byKey.set(key, bucket)
        groups.push({ key, label: bucket.label, events: bucket.events })
      }
      bucket.events.push(e)
    }
    return groups
  }, [filtered])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SEO
        title="Events"
        description="A curated calendar of HR, TA, and HR tech conferences worth your travel budget — updated as dates drop."
        url="/events"
      />

      {/* Header */}
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">
          Curated · Updated May 2026
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">HR Tech Events Calendar</h1>
        <p className="text-brand-dark/60 text-lg max-w-3xl">
          An opinionated, running calendar of HR, TA, and HR tech conferences worth your travel
          budget — plus the ones that probably aren't, but you'll be asked about anyway.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-brand-cream rounded-xl p-4 md:p-5 mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events, cities, vendors…"
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:border-brand-terracotta focus:bg-white transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-brand-muted font-semibold w-16 shrink-0">Show</span>
          {STATUS_CHIPS.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => setStatus(c.value)}
              className={`text-xs font-medium uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${chipClasses(status === c.value, c.value === 'upcoming')}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Region row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-brand-muted font-semibold w-16 shrink-0">Region</span>
          {REGION_CHIPS.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => setRegion(c.value)}
              className={`text-xs font-medium uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${chipClasses(region === c.value, c.value === 'all')}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Category row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-brand-muted font-semibold w-16 shrink-0">Category</span>
          {CATEGORY_CHIPS.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`text-xs font-medium uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${chipClasses(category === c.value, c.value === 'all')}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result meta */}
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-brand-muted mb-4">
        <div><strong className="text-brand-dark font-semibold">{filtered.length}</strong> {filtered.length === 1 ? 'event' : 'events'} shown</div>
      </div>

      {/* Groups */}
      {grouped.length === 0 ? (
        <div className="bg-brand-surface border border-brand-cream rounded-xl px-6 py-16 text-center">
          <h3 className="font-serif text-2xl font-bold mb-2">No events match.</h3>
          <p className="text-brand-dark/60">Try widening the filters, or check back — new events get added regularly.</p>
        </div>
      ) : (
        grouped.map(group => (
          <section key={group.key} className="mb-10">
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-brand-cream">
              <h2 className="font-serif italic text-lg text-brand-dark/70 tracking-wide">{group.label}</h2>
              <span className="text-xs text-brand-muted">{group.events.length} {group.events.length === 1 ? 'event' : 'events'}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {group.events.map(event => {
                const st = getEventStatus(event)
                const date = formatDateRange(event)
                const isImminent = st === 'imminent'
                const isPast = st === 'past'
                const cardClasses = [
                  'relative flex flex-col bg-white rounded-xl p-5 transition-shadow',
                  isImminent ? 'border-2 border-brand-terracotta shadow-sm' : 'border border-brand-cream',
                  isPast ? 'opacity-60 border-dashed' : 'hover:shadow-md',
                  event.mikeAttending && !isPast ? '!pr-24' : '',
                ].join(' ')
                return (
                  <article key={`${event.name}-${event.start}`} className={cardClasses}>
                    {isImminent && (
                      <span className="absolute -top-2.5 right-4 bg-brand-terracotta text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
                        Happening now
                      </span>
                    )}
                    {event.tba && !isImminent && !event.mikeAttending && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase text-brand-muted border border-dashed border-brand-muted px-1.5 py-0.5 rounded">
                        TBA
                      </span>
                    )}

                    {event.mikeAttending && !isPast && (
                      <div
                        className="absolute top-3 right-3 flex flex-col items-center gap-1 select-none pointer-events-none"
                        aria-label="Mike will be attending"
                      >
                        <img
                          src="/mike-wood.jpg"
                          alt=""
                          className="w-14 h-14 rounded-full object-cover ring-4 ring-white border-2 border-brand-terracotta shadow-[0_4px_10px_rgba(14,13,11,0.18)] -rotate-6"
                          loading="lazy"
                        />
                        <span className="bg-brand-terracotta text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm -rotate-3">
                          I'll be there
                        </span>
                      </div>
                    )}

                    {/* Date block */}
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-serif text-4xl font-bold leading-none text-brand-dark">{date.day}</span>
                      <span className="flex flex-col text-xs uppercase tracking-widest">
                        <span className="font-bold text-brand-terracotta">{date.month}</span>
                        <span className="text-brand-muted">{date.year}</span>
                      </span>
                      <span className="ml-auto text-[10px] uppercase tracking-widest text-brand-muted">{date.duration}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-serif text-xl font-bold leading-tight text-brand-dark mb-1 ${isPast ? 'line-through decoration-1' : ''}`}>
                      {event.name}
                    </h3>

                    {/* Location */}
                    <div className="text-sm italic text-brand-dark/60 mb-3">
                      <span className="text-brand-terracotta mr-1">◉</span>
                      {event.venue ? `${event.venue}, ${event.location}` : event.location}
                    </div>

                    {/* Blurb */}
                    <p className="font-serif text-[0.95rem] leading-relaxed text-brand-dark/75 mb-4 flex-grow">
                      {event.blurb}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-cream mb-3">
                      <span className={`text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded border ${CATEGORY_TAG_CLASS[event.category]}`}>
                        {CATEGORY_LABELS[event.category]}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded border bg-brand-surface text-brand-muted border-brand-border">
                        {REGION_LABELS[event.region]}
                      </span>
                    </div>

                    {/* Link */}
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start text-xs uppercase tracking-widest font-bold text-brand-dark border-b-2 border-brand-terracotta pb-0.5 hover:text-brand-terracotta transition-colors"
                    >
                      Visit site <ExternalLink size={12} />
                    </a>
                  </article>
                )
              })}
            </div>
          </section>
        ))
      )}

      {/* Footer callout */}
      <div className="mt-12 bg-brand-dark text-white rounded-xl px-6 md:px-10 py-8 grid grid-cols-[auto_1fr] gap-6 items-center">
        <div className="font-serif italic font-black text-5xl md:text-6xl leading-none text-brand-terracotta">¶</div>
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-1">Missing something? Got a correction?</h3>
          <p className="font-serif italic text-white/70 text-sm md:text-base leading-relaxed">
            This calendar is a living document. If your event isn't here, your date changed, or you spot
            something off,{' '}
            <a href="mailto:mike@ilovethewrap.com" className="underline decoration-brand-terracotta underline-offset-4 hover:text-white">
              drop me a line
            </a>{' '}
            and I'll get it sorted in the next edition.
          </p>
        </div>
      </div>
    </div>
  )
}
