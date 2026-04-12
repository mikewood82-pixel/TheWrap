import { Link } from 'react-router-dom'
import { ArrowRight, Play, BarChart2, TrendingUp } from 'lucide-react'
import { FEATURES } from '../config/features'
import { useState } from 'react'
import SEO from '../components/SEO'

// Swap this URL out when the latest episode is ready
const LATEST_EPISODE_URL = 'https://www.youtube.com/embed/YcTLLzrHP1s'

const latestEditions = [
  {
    date: 'April 11, 2026',
    title: 'Your Kids Will Compete With Your Shadow',
    excerpt: 'The digital twin narrative sounds reasonable — until you follow it to its logical conclusion.',
    slug: 'your-kids-will-compete-with-your-shadow',
    tag: 'AI & Future of Work',
    image: '/newsletters/april-11-2026/image1.jpg',
  },
  {
    date: 'April 3, 2026',
    title: 'When did we stop expecting more from the top?',
    excerpt: 'Leadership standards in HR tech are shifting — and not always in the right direction.',
    slug: 'stop-expecting-more',
    tag: 'Leadership',
  },
  {
    date: 'March 27, 2026',
    title: 'When every demo looks the same, what are you actually buying?',
    excerpt: 'The commoditization of HR tech demos is a real problem for buyers.',
    slug: 'every-demo-looks-same',
    tag: 'Buying',
  },
]

const featuredVendors = [
  { name: 'Workday',    category: 'HCM',      score: 4.1, change: '+2.3%', up: true  },
  { name: 'Rippling',   category: 'HRIS',     score: 4.6, change: '+8.1%', up: true  },
  { name: 'Greenhouse', category: 'ATS',      score: 4.4, change: '+1.2%', up: true  },
  { name: 'Lattice',    category: 'Perf Mgmt',score: 4.3, change: '-0.8%', up: false },
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [subState, setSubState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setSubState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubState(res.ok ? 'success' : 'error')
    } catch {
      setSubState('error')
    }
  }

  return (
    <div className="bg-white">
      <SEO />

      {/* Hero — latest episode + logo */}
      <section className="border-b border-brand-border bg-[#fef9f6]">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Logo */}
            <div className="shrink-0 flex flex-col items-center md:items-start gap-3">
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  backgroundImage: 'url(/logo.png)',
                  backgroundSize: '380px auto',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-brand-dark leading-none tracking-tight">
                  The Wrap
                </div>
                <div className="text-brand-terracotta text-xs font-semibold tracking-[0.2em] uppercase mt-1">
                  HR Tech News
                </div>
              </div>
            </div>

            {/* Video embed */}
            <div className="w-full flex-1">
              <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-3">
                Latest Episode
              </div>
              {LATEST_EPISODE_URL ? (
                <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={LATEST_EPISODE_URL}
                    title="Latest episode of The Wrap Show"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative w-full rounded-xl overflow-hidden bg-brand-dark flex items-center justify-center" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-brand-terracotta/20 flex items-center justify-center">
                      <Play size={24} className="text-brand-terracotta ml-1" />
                    </div>
                    <div className="text-white/50 text-sm">New episode dropping this week</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Latest newsletter */}
      <section className="border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Main story */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 bg-brand-terracotta/10 text-brand-terracotta text-xs font-semibold px-3 py-1 rounded-full mb-5">
                Latest Edition · {latestEditions[0].date}
              </div>
              {latestEditions[0].image && (
                <Link to={`/newsletter/${latestEditions[0].slug}`}>
                  <img
                    src={latestEditions[0].image}
                    alt={latestEditions[0].title}
                    className="w-full rounded-xl mb-6 object-cover max-h-64"
                  />
                </Link>
              )}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
                {latestEditions[0].title}
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed mb-7">
                {latestEditions[0].excerpt}
              </p>
              <Link
                to={`/newsletter/${latestEditions[0].slug}`}
                className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors"
              >
                Read this week's Wrap <ArrowRight size={16} />
              </Link>
            </div>

            {/* Previous editions */}
            <div className="md:col-span-2 divide-y divide-brand-border border border-brand-border rounded-xl overflow-hidden">
              <div className="bg-brand-surface px-4 py-3">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Previous Editions</span>
              </div>
              {latestEditions.slice(1).map((ed) => (
                <Link
                  key={ed.slug}
                  to={`/newsletter/${ed.slug}`}
                  className="flex items-start gap-3 px-4 py-4 bg-white hover:bg-brand-surface transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-brand-muted">{ed.date}</span>
                      <span className="text-xs bg-brand-surface text-brand-muted px-2 py-0.5 rounded-full">{ed.tag}</span>
                    </div>
                    <p className="font-serif font-semibold text-brand-dark text-sm leading-snug group-hover:text-brand-terracotta transition-colors">
                      {ed.title}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-brand-border group-hover:text-brand-terracotta mt-1 shrink-0 transition-colors" />
                </Link>
              ))}
              <div className="px-4 py-3 bg-white">
                <Link to="/newsletter" className="text-xs font-semibold text-brand-terracotta hover:underline flex items-center gap-1">
                  View all editions <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Intel card — only shown when Plus is enabled */}
      {FEATURES.PLUS_ENABLED && (
        <section className="border-b border-brand-border bg-brand-surface">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <Link to="/vendors" className="group bg-white rounded-xl border border-brand-border p-6 hover:border-brand-terracotta/40 hover:shadow-sm transition-all relative overflow-hidden max-w-sm">
              <div className="absolute top-3 right-3 bg-brand-gold text-brand-dark text-xs font-bold px-2.5 py-1 rounded-full">Wrap+</div>
              <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 size={18} className="text-brand-orange" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-1 text-brand-dark">Vendor Intel</h3>
              <p className="text-sm text-brand-muted leading-relaxed mb-3">
                Curated information and ratings for HR Tech vendors including capabilities, news, G2 and Glassdoor ratings.
              </p>
              <span className="text-xs font-semibold text-brand-terracotta group-hover:underline flex items-center gap-1">
                Explore <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Vendor Intel preview */}
      {FEATURES.PLUS_ENABLED && (
        <section className="border-b border-brand-border">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-dark">Vendor Intel</h2>
                <p className="text-sm text-brand-muted mt-0.5">Live G2 scores across the HR tech stack</p>
              </div>
              <Link to="/vendors" className="text-sm font-semibold text-brand-terracotta hover:underline flex items-center gap-1">
                View all 29 <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {featuredVendors.map((v) => (
                <div key={v.name} className="bg-white border border-brand-border rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="text-xs text-brand-muted uppercase tracking-wide mb-1">{v.category}</div>
                  <div className="font-serif font-bold text-lg text-brand-dark mb-2">{v.name}</div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-brand-dark">{v.score}</span>
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${v.up ? 'text-green-600' : 'text-red-500'}`}>
                      <TrendingUp size={12} className={v.up ? '' : 'rotate-180'} />
                      {v.change}
                    </span>
                  </div>
                  <div className="text-xs text-brand-muted mt-1">G2 Score</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe CTA */}
      <section id="subscribe" className="bg-brand-dark">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
            Free every Friday
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            Get The Wrap in your inbox
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            HR tech news, vendor signals, and the labor market — no fluff, no vendor spin.
          </p>
          {subState === 'success' ? (
            <div className="bg-white/10 text-white rounded-lg px-6 py-4 max-w-md mx-auto">
              You're in — check your inbox for a welcome email.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white text-brand-dark text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              />
              <button
                type="submit"
                disabled={subState === 'loading'}
                className="bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {subState === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
          )}
          {subState === 'error' && (
            <p className="text-red-400 text-sm mt-3">Something went wrong — try again.</p>
          )}
          <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}
