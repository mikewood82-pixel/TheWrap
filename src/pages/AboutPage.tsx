import { FEATURES } from '../config/features'
import SEO from '../components/SEO'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO
        title="About"
        description="The Wrap was built because nobody was writing the HR tech update Mike Wood actually wanted to read. Here's the story."
        url="/about"
      />

      {/* Header */}
      <div className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">About</div>
        <h1 className="font-serif text-4xl font-bold mb-4">About The Wrap</h1>
        <p className="text-brand-dark/60 text-lg leading-relaxed">
          Built because nobody was writing the HR tech update I actually wanted to read.
        </p>
      </div>

      {/* How It Started */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">How It Started</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>I spent over a decade on the vendor side of HR tech — and every week I was stitching together industry news from RSS feeds, Google Alerts, and whatever landed in my inbox. It worked, but barely.</p>
          <p>In July 2024, I decided to just build the thing I'd always wanted.</p>
        </div>
      </div>

      {/* What It Is Now */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">What It Is Now</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>The Wrap started as a simple weekly newsletter. Eighteen months and a thousand-plus subscribers later, it's grown into something a lot more useful — and a lot more opinionated.</p>

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-sm font-semibold text-brand-dark mb-3 uppercase tracking-wide">What's included, free</div>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-brand-dark">Weekly newsletter</div>
                  <div className="text-sm">The backbone. HR tech news, labor market data, and takes you won't find in a press release.</div>
                </div>
                <div>
                  <div className="font-medium text-brand-dark">The show</div>
                  <div className="text-sm">A short-form video companion to the newsletter. Same stories, different format.</div>
                </div>
              </div>
            </div>

            {FEATURES.PLUS_ENABLED && (
              <>
                <div className="bg-brand-cream rounded-xl p-5">
                  <div className="flex items-baseline gap-3 mb-4">
                    <div className="text-sm font-semibold text-brand-dark uppercase tracking-wide">The Wrap Plus</div>
                    <div className="text-sm text-brand-dark/60">$10 / month</div>
                  </div>
                  <ul className="space-y-2 text-sm text-brand-dark/70">
                    <li className="flex gap-2"><span className="text-brand-terracotta shrink-0">✓</span><span>Vendor Intel tool — capabilities, ratings, and side-by-side profiles for HR tech software, updated weekly.</span></li>
                    <li className="flex gap-2"><span className="text-brand-terracotta shrink-0">✓</span><span>G2 reviews, surfaced — what real customers like, dislike, and how sentiment is trending over time.</span></li>
                    <li className="flex gap-2"><span className="text-brand-terracotta shrink-0">✓</span><span>Glassdoor signals — internal company health, pain points, and whether the vendor's own people are happy.</span></li>
                    <li className="flex gap-2"><span className="text-brand-terracotta shrink-0">✓</span><span>Company news + Reddit mentions — the stuff that doesn't make the press release.</span></li>
                    <li className="flex gap-2"><span className="text-brand-terracotta shrink-0">✓</span><span>Natural language search — describe your situation, get vendor suggestions. No RFP required.</span></li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium text-brand-dark mb-1">For vendors: deep dive profiles</div>
                  <div className="text-sm">AI-generated profiles are the floor, not the ceiling. Vendors can purchase an expanded Deep Dive profile that adds a video take on the platform, actual product screenshots, and a direct lead form for buyers who are ready to talk to sales.</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { value: '1,000+',  label: 'Subscribers' },
            { value: '1.5+',    label: 'Years Running' },
            { value: '[XX+]',   label: 'Editions Published' },
          ].map(stat => (
            <div key={stat.label} className="bg-brand-cream rounded-xl p-5 text-center">
              <div className="font-serif text-3xl font-bold text-brand-dark mb-1">{stat.value}</div>
              <div className="text-xs text-brand-dark/50 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-brand-cream mb-12" />

      {/* About Mike */}
      <div className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">The Editor</div>
        <h2 className="font-serif text-2xl font-bold mb-6">About Mike</h2>

        <div className="flex items-start gap-6 mb-6">
          {/* Photo placeholder */}
          <div className="w-24 h-24 rounded-xl bg-brand-cream border border-brand-cream flex items-center justify-center shrink-0 text-brand-dark/30 text-xs text-center leading-snug px-2">
            [Photo]
          </div>
          <div>
            <div className="font-serif text-xl font-semibold mb-1">Mike Wood</div>
            <div className="text-sm text-brand-dark/50 mb-3">Founder & Editor, The Wrap</div>
            <div className="flex gap-2 flex-wrap">
              <a
                href="https://www.linkedin.com/in/mikewood82/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brand-dark/60 hover:text-[#0a66c2] transition-colors border border-brand-cream rounded-full px-3 py-1"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a
                href="mailto:mike@thewrap.com"
                className="inline-flex items-center gap-1.5 text-xs text-brand-dark/60 hover:text-brand-terracotta transition-colors border border-brand-cream rounded-full px-3 py-1"
              >
                mike@thewrap.com
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>HR tech veteran, newsletter guy, reluctant developer.</p>
        </div>
      </div>

      {/* Editorial Standards */}
      <div className="bg-brand-cream rounded-xl p-6 mb-12">
        <h3 className="font-serif text-lg font-semibold mb-3">Editorial Standards</h3>
        <div className="space-y-2 text-sm text-brand-dark/60 leading-relaxed">
          <p>[Describe your editorial independence policy — e.g. vendors cannot pay for favorable coverage, sponsorships are clearly labeled, etc.]</p>
          <p>[Explain the difference between editorial content and sponsored content on The Wrap.]</p>
          <p>[Note on corrections policy, feedback, or how to get in touch about editorial matters.]</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="font-serif text-xl font-semibold mb-2">Read The Wrap every Friday</h3>
        <p className="text-brand-dark/50 text-sm mb-5">HR tech news, vendor intelligence, and labor market signals — in your inbox weekly.</p>
        <a
          href="/subscribe"
          className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
        >
          Subscribe free →
        </a>
      </div>

    </div>
  )
}
