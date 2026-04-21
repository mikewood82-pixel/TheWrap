export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">About</div>
        <h1 className="font-serif text-4xl font-bold mb-4">About the Wrap</h1>
        <p className="text-brand-dark/60 text-lg leading-relaxed">
          HR Tech news and shenanigans, tightly wrapped.
        </p>
      </div>

      {/* How It Started */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">How It Started</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>I spent over a decade on the vendor side of HR tech and every week I was stitching together industry news from RSS feeds, Google Alerts, and whatever landed in my inbox. It worked, but barely.</p>
          <p>In July of 2024, I started The Wrap as a newsletter on LinkedIn to write about everything I'm seeing in the space.</p>
        </div>
      </div>

      {/* What It Is Now */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">What It Is Now</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>I'm building The Wrap to be your one-stop for the latest tech news affecting HR teams. The newsletter is over 2,000 subscribers, I run a weekly highlights show, and I'm building out the site to include information HR teams, and vendors need to make informed decisions. Oh and we'll have some fun too.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '2,300+', label: 'Subscribers' },
            { value: '70+',    label: 'Editions Published' },
            { value: '1,000+', label: 'Open Roles' },
            { value: '29',     label: 'HR Tech Vendors' },
          ].map(stat => (
            <div key={stat.label} className="bg-brand-cream rounded-xl p-5 text-center">
              <div className="font-serif text-3xl font-bold text-brand-dark mb-1">{stat.value}</div>
              <div className="text-xs text-brand-dark/50 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HR Tech Jobs */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">HR Tech Jobs</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>
            In April 2026 I added a jobs board, because if you work in HR tech neither LinkedIn nor Indeed segments the space in a way that's actually useful. You end up wading through hundreds of agency reposts to find a handful of real roles at real vendors.
          </p>
          <p>
            The Wrap's jobs board is different. We pull directly from each company's applicant tracking system — Greenhouse, Lever, Ashby, SmartRecruiters, Workable, Recruitee — and refresh daily. No recruiters, no reposts, no "urgent opening" that was filled six months ago. You can filter by remote / hybrid / onsite, seniority, department, or keyword, and every filter combo has its own RSS feed. Click Apply and you land on the company's own careers page. Same experience, just consolidated.
          </p>
          <p>
            It's the list I wished existed when I was job hunting in HR tech.
          </p>
        </div>
        <div className="mt-6">
          <a
            href="/jobs"
            className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            Browse open roles →
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-brand-cream mb-12" />

      {/* About Mike */}
      <div className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">The Editor</div>
        <h2 className="font-serif text-2xl font-bold mb-6">About Mike</h2>

        <div className="flex items-start gap-6 mb-6">
          <img
            src="/mike-wood.jpg"
            alt="Mike Wood"
            className="w-24 h-24 rounded-xl object-cover shrink-0"
          />
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
          <p>HR Tech veteran, writer, host, creator.</p>
        </div>
      </div>

      {/* Editorial Standards */}
      <div className="bg-brand-cream rounded-xl p-6 mb-12">
        <h3 className="font-serif text-lg font-semibold mb-3">Editorial Standards</h3>
        <div className="space-y-2 text-sm text-brand-dark/60 leading-relaxed">
          <p>All information on The Wrap is designed to help you make decisions on what technology is right for you. Any opinion I drop is my own and any sponsorships will be clearly labeled. If you have any feedback or a correction, just reach out to me!</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="font-serif text-xl font-semibold mb-2">Read The Wrap every Friday</h3>
        <p className="text-brand-dark/50 text-sm mb-5">HR tech news, vendor intelligence, and labor market signals — in your inbox weekly.</p>
        <a
          href="/#subscribe"
          className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
        >
          Subscribe free →
        </a>
      </div>

    </div>
  )
}
