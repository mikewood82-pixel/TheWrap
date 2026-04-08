export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">About</div>
        <h1 className="font-serif text-4xl font-bold mb-4">About The Wrap</h1>
        <p className="text-brand-dark/60 text-lg leading-relaxed">
          [One-sentence summary of what The Wrap is — e.g. "The Wrap is the independent voice for HR technology practitioners who want signal, not noise."]
        </p>
      </div>

      {/* How It Started */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">How It Started</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>[Write about the origin story here — what prompted you to start The Wrap, what gap you saw in the market, when it launched, and what those early days looked like.]</p>
          <p>[Continue the origin story — early reader response, pivotal moments, what surprised you about the audience or the space.]</p>
        </div>
      </div>

      {/* What It Is Now */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold mb-4">What It Is Now</h2>
        <div className="space-y-4 text-brand-dark/70 leading-relaxed">
          <p>[Describe what The Wrap has grown into — the newsletter, the show, the vendor intel tool, the labor market data. How many subscribers, how often you publish, what makes it different from other HR tech media.]</p>
          <p>[Talk about the editorial approach — independence, no pay-to-play coverage, what "sponsored" means on this platform vs. editorial content.]</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { value: '[X,XXX+]', label: 'Subscribers' },
            { value: '[X+]',     label: 'Years Running' },
            { value: '[XX+]',    label: 'Editions Published' },
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
                href="https://www.linkedin.com/in/[your-linkedin-slug]"
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
          <p>[Write about Mike's background — career history in HR tech, practitioner experience, what gives you credibility to cover this space.]</p>
          <p>[Talk about your perspective and editorial voice — what you believe about HR technology, what you're skeptical of, what you're excited about. Why you write The Wrap the way you do.]</p>
          <p>[Personal touch — something that humanizes you as the editor. Could be where you're based, how you spend time outside of The Wrap, or what you want readers to take away from every edition.]</p>
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
