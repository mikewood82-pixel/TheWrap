import { useState, useMemo, type ReactNode } from 'react'
import { ArrowRight, ExternalLink, Search, X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { archive } from '../data/archive'
import { newsletters } from '../data/newsletters'
import { useWrapPlus } from '../context/WrapPlusContext'
import { FEATURES } from '../config/features'

// Build a set of slugs that have full local content
const archivedSlugs = new Set(archive.map(a => a.slug))

// Build a tag lookup from archive data


// Derive the clean local slug from a LinkedIn slug
function toLocalSlug(linkedinSlug: string): string {
  return linkedinSlug
    .replace(/-mike-wood-[a-z0-9]+$/, '')
    .replace(/-mike-wood$/, '')
}

// slug = hosted on this site, linkedinSlug = links to LinkedIn
type Edition = {
  date: string
  title: string
  tag?: string
  slug?: string
  linkedinSlug?: string
}

// Site-hosted editions are derived from src/data/newsletters.ts so the
// archive can never drift out of sync with the published posts. LinkedIn-only
// editions (Feb 28, 2026 and earlier) stay hand-curated below.
const localEditions: Edition[] = newsletters.map(n => ({
  date: n.date,
  title: n.title,
  tag: n.tag,
  slug: n.slug,
}))

const editions: Edition[] = [
  ...localEditions,
  // ── LinkedIn archive (pre-site, kept manual) ────────────────────────────────
  { date: 'February 28, 2026', title: 'Nobody picks beige',                                    tag: 'Leadership',          linkedinSlug: 'nobody-picks-beige-mike-wood-voiee' },
  { date: 'February 21, 2026', title: 'Authenticity is the new luxury',                        tag: 'Leadership',          linkedinSlug: 'authenticity-new-luxury-mike-wood-yv9ke' },
  { date: 'February 14, 2026', title: 'The Truth is Beyond the BLS',                           tag: 'Labor Market',        linkedinSlug: 'truth-beyond-bls-mike-wood-5hj8e' },
  { date: 'February 7, 2026',  title: "70 — The Future of work is here and it's worse than I imagined", tag: 'AI & Future of Work', linkedinSlug: '70-future-work-here-its-worse-than-i-imagined-mike-wood-xo2tc' },
  { date: 'January 31, 2026',  title: "69 — What's going on with Amazon?",                    tag: 'Labor Market',         linkedinSlug: '69-whats-going-amazon-mike-wood-4twze' },
  { date: 'January 24, 2026',  title: 'What America do we want to be?',                       tag: 'DEI',                  linkedinSlug: 'what-america-do-we-want-mike-wood-lnune' },
  { date: 'January 17, 2026',  title: '68 — The dam just burst for AI transparency',          tag: 'AI & Future of Work',  linkedinSlug: '68-dam-just-burst-ai-transparency-mike-wood-hlate' },
  { date: 'January 10, 2026',  title: "67 — Don't give your medical records to OpenAI",       tag: 'AI & Future of Work',  linkedinSlug: '67-dont-give-your-medical-records-openai-mike-wood-syfxe' },
  { date: 'January 3, 2026',   title: 'Is Deel the MrBeast of HR Tech?',                      tag: 'HR Tech',              linkedinSlug: 'deel-mrbeast-hr-tech-mike-wood-rjy6e' },
  // ── 2025 ────────────────────────────────────────────────────────────────────
  { date: 'December 27, 2025', title: "66 — Are HR Tech vendors focusing on frontline work because that's all that is left?", tag: 'Frontline',           linkedinSlug: '66-hr-tech-vendors-focusing-frontline-work-because-thats-mike-wood-8rhre' },
  { date: 'December 20, 2025', title: "65 — What's going on in the labor market? Depends who you ask",                    tag: 'Labor Market',            linkedinSlug: '65-whats-going-labor-market-depends-who-you-ask-mike-wood-8g1ve' },
  { date: 'December 13, 2025', title: "64 — Let's spread some holiday cheer!",                                            tag: 'Culture',                 linkedinSlug: '64-lets-spread-some-holiday-cheer-mike-wood-ciuke' },
  { date: 'December 6, 2025',  title: '63 — Employee loyalty is about to bottom out',                                     tag: 'Labor Market',            linkedinSlug: '63-employee-loyalty-bottom-out-mike-wood-3ruee' },
  { date: 'November 29, 2025', title: '62 — November thoughts on the future of work',                                     tag: 'AI & Future of Work',     linkedinSlug: '62-november-thoughts-future-work-mike-wood-c6ple' },
  { date: 'November 22, 2025', title: 'Where Talent Acquisition Is Heading in 2026: Five Trends I Cannot Ignore',         tag: 'Talent Acquisition',      linkedinSlug: 'where-talent-acquisition-heading-2026-five-trends-i-cant-mike-wood-u' },
  { date: 'November 15, 2025', title: '61 — Pay no attention to the AI behind the curtain',                               tag: 'AI & Future of Work',     linkedinSlug: '61-pay-attention-ai-behind-curtain-mike-wood-9lpae' },
  { date: 'November 8, 2025',  title: '60 — Is America pricing Americans out of work?',                                   tag: 'Labor Market',            linkedinSlug: '60-america-pricing-americans-out-work-mike-wood-6zace' },
  { date: 'November 1, 2025',  title: '59 — Shantytown by the Server Farm',                                               tag: 'AI & Future of Work',     linkedinSlug: '59-shantytown-server-farm-mike-wood-oiyue' },
  { date: 'October 25, 2025',  title: 'All aboard the AI hype train to Hooverville',                                      tag: 'AI & Future of Work',     linkedinSlug: 'all-aboard-ai-hype-train-hooverville-mike-wood-khgqe' },
  { date: 'October 18, 2025',  title: '58 — Around the world in 14 days',                                                 tag: 'Events',                  linkedinSlug: '58-around-world-14-days-mike-wood-xx6pe' },
  { date: 'October 11, 2025',  title: 'Amazon replacing 600K workers with robots is the latest red flag for American workers', tag: 'AI & Future of Work',  linkedinSlug: 'amazon-replacing-600k-workers-robots-latest-red-flag-american-wood-xazne' },
  { date: 'October 4, 2025',   title: '57 — A bold, new look',                                                            tag: 'Culture',                 linkedinSlug: '57-bold-new-look-mike-wood-srioe' },
  { date: 'September 27, 2025',title: "56 — What's going on in sculpting?",                                               tag: 'Culture',                 linkedinSlug: '56-whats-going-sculpting-mike-wood-hfyee' },
  { date: 'September 20, 2025',title: '55 — What is the future of work?',                                                 tag: 'AI & Future of Work',     linkedinSlug: '55-what-future-work-mike-wood-jyrnc' },
  { date: 'September 13, 2025',title: 'Principle Over Politics: Torin Ellis on Why DEI in Hiring Still Matters',          tag: 'DEI',                     linkedinSlug: 'principle-over-politics-torin-ellis-why-dei-hiring-still-mike-wood-qtsye' },
  { date: 'September 6, 2025', title: '54 — What to look for at HR Tech',                                                 tag: 'Events',                  linkedinSlug: '54-what-look-hr-tech-mike-wood' },
  { date: 'August 30, 2025',   title: "53 — All's Quiet Before HR Tech",                                                  tag: 'Events',                  linkedinSlug: '53-alls-quiet-before-hr-tech-mike-wood-21l8e' },
  { date: 'August 23, 2025',   title: '52 — Using AI in content',                                                         tag: 'AI & Future of Work',     linkedinSlug: '52-using-ai-content-mike-wood-uezge' },
  { date: 'August 16, 2025',   title: '51 — The Truth is Out There',                                                      tag: 'HR Tech',                 linkedinSlug: '51-truth-out-mike-wood-lcnle' },
  { date: 'August 9, 2025',    title: '50 — Shake and Bake, Baby!',                                                       tag: 'HR Tech',                 linkedinSlug: '50-shake-bake-baby-mike-wood-tcise' },
  { date: 'August 2, 2025',    title: '49 — An ode to public television',                                                 tag: 'Culture',                 linkedinSlug: '49-ode-public-television-mike-wood-hv1se' },
  { date: 'July 26, 2025',     title: '48 — Hulkamania is Dead, Brother',                                                 tag: 'Culture',                 linkedinSlug: '48-hulkamania-dead-brother-mike-wood-b767e' },
  { date: 'July 19, 2025',     title: 'The Trust Paradox in High-Volume Hiring',                                          tag: 'Talent Acquisition',      linkedinSlug: 'trust-paradox-high-volume-hiring-mike-wood-qtoce' },
  { date: 'July 12, 2025',     title: '47 — The Middle Migration',                                                        tag: 'Labor Market',            linkedinSlug: '47-middle-migration-mike-wood-yvhye' },
  { date: 'July 5, 2025',      title: '46 — The US has entered the Attitude Era',                                         tag: 'Culture',                 linkedinSlug: '46-us-has-reentered-attitude-era-mike-wood-ltnuc' },
  { date: 'June 28, 2025',     title: '45 — The Hills are Alive!',                                                        tag: 'Culture',                 linkedinSlug: '45-hills-alive-mike-wood-6jrae' },
  { date: 'June 21, 2025',     title: '44 — Automation or Alienation?',                                                   tag: 'AI & Future of Work',     linkedinSlug: '44-automation-alienation-mike-wood-soqqc' },
  { date: 'June 14, 2025',     title: "43 — If you ain't AI first, you're AI last",                                       tag: 'AI & Future of Work',     linkedinSlug: '43-you-aint-ai-first-youre-last-mike-wood-hzmxe' },
  { date: 'June 7, 2025',      title: '42 — I\'m tired boss',                                                             tag: 'Leadership',              linkedinSlug: '42-im-tired-boss-mike-wood-qsg8c' },
  { date: 'May 31, 2025',      title: "41 — Anything is possible when you're lying",                                      tag: 'Leadership',              linkedinSlug: '41-anything-possible-when-youre-lying-mike-wood-xbcbe' },
  { date: 'May 24, 2025',      title: "40 — Why don't you just tell me the name of the movie you've selected?",           tag: 'Culture',                 linkedinSlug: '40-why-dont-you-just-tell-me-name-movie-youve-selected-mike-wood-sw1gf' },
  { date: 'May 17, 2025',      title: '39 — A growing disconnect',                                                        tag: 'Labor Market',            linkedinSlug: '39-growing-disconnect-mike-wood-jjixe' },
  { date: 'May 10, 2025',      title: '38 — A look into the future',                                                      tag: 'AI & Future of Work',     linkedinSlug: '38-look-future-mike-wood-unefe' },
  { date: 'May 3, 2025',       title: '37 — Embracing more fun',                                                          tag: 'Culture',                 linkedinSlug: '37-embracing-more-fun-mike-wood-tzjcc' },
  { date: 'April 26, 2025',    title: '36 — Freelancing to Survive',                                                      tag: 'Labor Market',            linkedinSlug: '36-freelancing-survive-mike-wood-lggee' },
  { date: 'April 19, 2025',    title: '35 — Hanging with the People Heroes',                                              tag: 'Events',                  linkedinSlug: '35-hanging-people-heroes-mike-wood-8iupe' },
  { date: 'April 12, 2025',    title: '#34 — My action figure is...interesting',                                          tag: 'Culture',                 linkedinSlug: '34-my-action-figure-isinteresting-mike-wood-dqtoe' },
  { date: 'April 5, 2025',     title: '33 — Ziggy, find me the perfect candidate',                                        tag: 'AI & Future of Work',     linkedinSlug: '33-ziggy-find-me-perfect-candidate-mike-wood-uy2pe' },
  { date: 'March 29, 2025',    title: "32 — Is 'Mar-A-Lago Face' coming to HR Tech?",                                     tag: 'HR Tech',                 linkedinSlug: '32-mar-a-lago-face-coming-hr-tech-mike-wood-ka2me' },
  { date: 'March 22, 2025',    title: '31 — Greetings from Chilly Vegas',                                                 tag: 'Events',                  linkedinSlug: '31-greetings-from-chilly-vegas-mike-wood-dxa8e' },
  { date: 'March 15, 2025',    title: '30 — On the Road Again',                                                           tag: 'Events',                  linkedinSlug: '30-road-again-mike-wood-f8tie' },
  { date: 'March 8, 2025',     title: '29 — State of Disunion',                                                           tag: 'Labor Market',            linkedinSlug: '29-state-disunion-mike-wood-sfmze' },
  { date: 'March 1, 2025',     title: "#28 — Let's connect",                                                              tag: 'Culture',                 linkedinSlug: '28-lets-connect-mike-wood-wj4ce' },
  { date: 'February 22, 2025', title: '#27 — Mike "Scoops" Wood now reporting for HR.com',                                tag: 'Culture',                 linkedinSlug: '27-mike-scoops-wood-now-reporting-hrcom-mike-wood-vdoae' },
  { date: 'February 15, 2025', title: '26 — Can you work for bad people?',                                                tag: 'Leadership',              linkedinSlug: '26-can-you-work-bad-people-mike-wood-odl7e' },
  { date: 'February 8, 2025',  title: '25 — The Trust Factor',                                                            tag: 'Leadership',              linkedinSlug: '25-trust-factor-mike-wood-ewaie' },
  { date: 'February 1, 2025',  title: '#24 — Heading to TA Week',                                                         tag: 'Events',                  linkedinSlug: '24-heading-ta-week-mike-wood-cmrac' },
  { date: 'January 25, 2025',  title: '#23 — A conversation with Monster founder Jeff Taylor',                             tag: 'Talent Acquisition',      linkedinSlug: '23-conversation-monster-founder-jeff-taylor-mike-wood-29hye' },
  { date: 'January 18, 2025',  title: '#22 — Podcast Alert!',                                                             tag: 'Culture',                 linkedinSlug: '22-podcast-alert-mike-wood-qdtwe' },
  { date: 'January 11, 2025',  title: '#21 — The New Industrial Revolution?',                                             tag: 'AI & Future of Work',     linkedinSlug: '21-new-industrial-revolution-mike-wood-bwlye' },
  { date: 'January 4, 2025',   title: '#20 — What teaching elementary school taught me about business and myself',         tag: 'Leadership',              linkedinSlug: '20-what-teaching-elementary-school-taught-me-business-mike-wood-qz1re' },
  // ── 2024 ────────────────────────────────────────────────────────────────────
  { date: 'December 28, 2024', title: '#19 — Rock on',                                                                    tag: 'Culture',                 linkedinSlug: '19-rock-mike-wood-nu8qe' },
  { date: 'December 21, 2024', title: '#18 — Return to Originality?',                                                     tag: 'Culture',                 linkedinSlug: '18-return-originality-mike-wood-xr6ke' },
  { date: 'December 14, 2024', title: '#17 — Embracing multiple interests',                                               tag: 'Culture',                 linkedinSlug: '17-embracing-multiple-interests-mike-wood-vo71e' },
  { date: 'December 7, 2024',  title: '#16 — Riding steerage on LinkedIn',                                                tag: 'Culture',                 linkedinSlug: '16-riding-steerage-linkedin-mike-wood-7poye' },
  { date: 'November 30, 2024', title: '#15 — Turning Unicorns into Horses',                                               tag: 'HR Tech',                 linkedinSlug: '15-turning-unicorns-horses-mike-wood-l0xse' },
  { date: 'November 23, 2024', title: '#14 — Beware the Reality TV Stars of Work',                                        tag: 'Leadership',              linkedinSlug: '14-beware-reality-tv-stars-work-mike-wood-hbn3e' },
  { date: 'November 16, 2024', title: '#13 — Standing out at HR Tech',                                                    tag: 'Events',                  linkedinSlug: '13-standing-out-hr-tech-mike-wood-b6lue' },
  { date: 'November 9, 2024',  title: '#12 — Diluting our value in the gig economy',                                      tag: 'Labor Market',            linkedinSlug: '12-diluting-our-value-gig-economy-mike-wood-220de' },
  { date: 'November 2, 2024',  title: '#11 — At RecFest with Joveo',                                                      tag: 'Events',                  linkedinSlug: '11-recfest-joveo-mike-wood-n1fhe' },
  { date: 'October 26, 2024',  title: '#10 — From promise to pompous',                                                    tag: 'HR Tech',                 linkedinSlug: '10-from-promise-pompous-mike-wood-lwu0e' },
  { date: 'October 19, 2024',  title: '#9 — A warning from the HR Tech Lorax',                                            tag: 'HR Tech',                 linkedinSlug: '9-warning-from-hr-tech-lorax-mike-wood-he1bc' },
  { date: 'October 12, 2024',  title: "#8 — We're all stuck at a rest stop on the NJ Turnpike",                           tag: 'Culture',                 linkedinSlug: '8-were-all-stuck-rest-stop-nj-turnpike-mike-wood-91yte' },
  { date: 'October 5, 2024',   title: "#7 — Don't Let AI Ruin your Customer Service",                                     tag: 'AI & Future of Work',     linkedinSlug: '7-dont-let-ai-ruin-your-customer-service-mike-wood-r7eee' },
  { date: 'September 28, 2024',title: '#6 — Recovering candidate',                                                        tag: 'Talent Acquisition',      linkedinSlug: '6-recovering-candidate-mike-wood-ucmde' },
  { date: 'September 21, 2024',title: '#5 — One door closes, another opens',                                              tag: 'Culture',                 linkedinSlug: '5-one-door-closes-another-opens-mike-wood-eyfte' },
  { date: 'September 14, 2024',title: '#4 — Putting the AI back in Humanity',                                             tag: 'AI & Future of Work',     linkedinSlug: '4-putting-ai-back-humanity-mike-wood-xqvwe' },
  { date: 'September 7, 2024', title: "The Wrap #3 — You're a People Leader Gaston!",                                     tag: 'Leadership',              linkedinSlug: 'wrap-3-youre-people-leader-gaston-mike-wood-l3rpe' },
  { date: 'August 31, 2024',   title: 'SHRM Drops Equity, Lattice Creates Digital Workers, HR Tech Spending is Rising, and More', tag: 'HR Tech',            linkedinSlug: 'shrm-drops-equity-lattice-creates-digital-workers-hr-tech-mike-wood-mx9te' },
  { date: 'July 3, 2024',      title: 'Introducing The Wrap!',                                                            tag: 'Culture',                 linkedinSlug: 'introducing-wrap-mike-wood-uobre' },
]

// Collect unique tags in display order
const allTags = Array.from(new Set(editions.map(e => e.tag).filter(Boolean) as string[]))

// Full-text body index for Plus-only search. Newsletter bodies are shipped in
// the client bundle (src/data/newsletters.ts), so no API call or D1 FTS is
// needed — we strip HTML once at module load and search against plain text.
const bodyBySlug: Record<string, string> = {}
for (const n of newsletters) {
  bodyBySlug[n.slug] = stripHtml(n.body).toLowerCase()
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

// Build a ~80-char window around the first body match so the result row shows
// the matched context, not just the title.
function bodySnippet(body: string, q: string): string | null {
  const idx = body.indexOf(q)
  if (idx < 0) return null
  const start = Math.max(0, idx - 40)
  const end   = Math.min(body.length, idx + q.length + 60)
  const left  = start > 0 ? '…' : ''
  const right = end < body.length ? '…' : ''
  return left + body.slice(start, end).trim() + right
}

type Match = { edition: Edition; snippet: string | null }

export default function NewsletterPage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const { isPro, isLoaded } = useWrapPlus()
  // Gate full-text body search on Plus. Free users keep the existing
  // title + date match so the search input still works for them.
  const canFullText = FEATURES.PLUS_ENABLED && isLoaded && isPro

  const filtered = useMemo<Match[]>(() => {
    const q = query.toLowerCase().trim()
    return editions
      .map<Match | null>(ed => {
        if (activeTag && ed.tag !== activeTag) return null
        if (!q) return { edition: ed, snippet: null }

        const titleHit = ed.title.toLowerCase().includes(q) || ed.date.toLowerCase().includes(q)
        if (titleHit) return { edition: ed, snippet: null }

        if (canFullText) {
          const slug = ed.slug ?? (ed.linkedinSlug ? toLocalSlug(ed.linkedinSlug) : undefined)
          const body = slug ? bodyBySlug[slug] : undefined
          if (body && body.includes(q)) {
            return { edition: ed, snippet: bodySnippet(body, q) }
          }
        }
        return null
      })
      .filter((x): x is Match => x !== null)
  }, [query, activeTag, canFullText])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO
        title="Newsletter Archive"
        description="Every edition of The Wrap — HR tech news, vendor signals, and the labor market. Published every Friday since July 2024."
        url="/newsletter"
      />
      <div className="mb-10">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Newsletter Archive</div>
        <h1 className="font-serif text-4xl font-bold mb-3">All Editions</h1>
        <p className="text-brand-dark/60 text-lg">
          {editions.length} editions since July 2024.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search editions..."
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30 focus:border-brand-terracotta transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !activeTag
              ? 'bg-brand-terracotta text-white border-brand-terracotta'
              : 'bg-white text-brand-muted border-brand-border hover:border-brand-terracotta hover:text-brand-dark'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeTag === tag
                ? 'bg-brand-terracotta text-white border-brand-terracotta'
                : 'bg-white text-brand-muted border-brand-border hover:border-brand-terracotta hover:text-brand-dark'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count when filtering */}
      {(query || activeTag) && (
        <p className="text-sm text-brand-muted mb-4">
          {filtered.length} {filtered.length === 1 ? 'edition' : 'editions'} found
          {activeTag && <> in <span className="font-medium text-brand-dark">{activeTag}</span></>}
          {query && <> matching "<span className="font-medium text-brand-dark">{query}</span>"</>}
        </p>
      )}

      {/* Plus tease: free users search titles only. Plus members search the
          whole body. Shown only while a query is active so it doesn't clutter
          the empty state. */}
      {query && FEATURES.PLUS_ENABLED && isLoaded && !isPro && (
        <div className="mb-4 flex items-center gap-2 text-xs text-brand-muted bg-brand-surface border border-brand-border rounded-lg px-3 py-2">
          <Sparkles size={12} className="text-brand-terracotta shrink-0" />
          <span>
            Searching titles only.{' '}
            <Link to="/subscribe" className="text-brand-terracotta font-semibold hover:underline">
              Wrap+ searches the full archive text
            </Link>
            .
          </span>
        </div>
      )}

      <div className="border-t border-brand-cream">
        {filtered.map(({ edition: ed, snippet }) => {
          // Determine if we have local full-text content
          const localSlug = ed.slug ?? (ed.linkedinSlug ? toLocalSlug(ed.linkedinSlug) : undefined)
          const hasLocal = !!ed.slug || (!!localSlug && archivedSlugs.has(localSlug))
          const href = hasLocal
            ? `/newsletter/${localSlug}`
            : `https://www.linkedin.com/pulse/${ed.linkedinSlug}`

          const inner = (
            <div className="flex items-start justify-between gap-4 py-4 border-b border-brand-cream hover:bg-brand-cream/40 px-2 -mx-2 transition-colors group cursor-pointer">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-brand-dark/40">{ed.date}</span>
                  {ed.tag && (
                    <span className="text-xs bg-brand-surface text-brand-muted px-2 py-0.5 rounded-full border border-brand-border">
                      {ed.tag}
                    </span>
                  )}
                  {!hasLocal && (
                    <span className="text-xs text-brand-muted/60 flex items-center gap-0.5">
                      <ExternalLink size={10} /> LinkedIn
                    </span>
                  )}
                  {snippet && (
                    <span className="text-[10px] uppercase tracking-wide font-semibold text-brand-terracotta">
                      Match in body
                    </span>
                  )}
                </div>
                <div className="font-serif text-base font-semibold group-hover:text-brand-terracotta transition-colors text-brand-dark leading-snug">
                  {ed.title}
                </div>
                {snippet && (
                  <p className="mt-1 text-sm text-brand-muted line-clamp-2">
                    <HighlightedSnippet text={snippet} query={query.trim()} />
                  </p>
                )}
              </div>
              <ArrowRight size={16} className="text-brand-dark/20 group-hover:text-brand-terracotta mt-1 shrink-0 transition-colors" />
            </div>
          )

          const key = ed.slug ?? ed.linkedinSlug ?? ed.title
          return hasLocal ? (
            <Link key={key} to={href}>{inner}</Link>
          ) : (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
          )
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-brand-muted">
            <p className="text-lg mb-2">No editions found</p>
            <button
              onClick={() => { setQuery(''); setActiveTag(null) }}
              className="text-sm text-brand-terracotta hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Wraps each occurrence of `query` in the snippet with a highlight span.
// Case-insensitive match; query is treated as a literal string (search input
// comes from the user and can contain regex metacharacters).
function HighlightedSnippet({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const q = query.toLowerCase()
  const out: ReactNode[] = []
  let i = 0
  let n = 0
  const lower = text.toLowerCase()
  while (i < text.length) {
    const next = lower.indexOf(q, i)
    if (next < 0) { out.push(text.slice(i)); break }
    if (next > i) out.push(text.slice(i, next))
    out.push(
      <mark key={n++} className="bg-brand-terracotta/15 text-brand-dark rounded px-0.5">
        {text.slice(next, next + query.length)}
      </mark>
    )
    i = next + query.length
  }
  return <>{out}</>
}
