import { Play, Mail } from 'lucide-react'

const episodes = [
  {
    number: 12,
    date: 'June 6, 2025',
    title: 'Rippling\'s Big Round + This Week\'s Candidate Spotlight',
    description: 'This week: Rippling raises $200M, ServiceNow makes its HR move, and ADP jobs data lands softer than expected. Plus: meet Sarah Chen, VP HR looking for her next chapter.',
    duration: '14:22',
    youtubeId: '',
  },
  {
    number: 11,
    date: 'May 30, 2025',
    title: 'ATS Consolidation Wave + Candidate Spotlight',
    description: 'Three ATS acquisitions in six weeks. We break down who\'s buying, who\'s getting bought, and what HR leaders should be doing right now.',
    duration: '12:47',
    youtubeId: '',
  },
]

export default function ShowPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">The Show</div>
        <h1 className="font-serif text-4xl font-bold mb-3">The Wrap Show</h1>
        <p className="text-brand-dark/60 text-lg max-w-xl">
          Weekly video show covering the week's biggest HR tech stories, plus a featured job seeker in every episode.
        </p>
      </div>

      {/* Format */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className="bg-brand-cream rounded-xl p-5 border border-brand-cream">
          <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-2">Segment 1</div>
          <div className="font-serif text-xl font-semibold mb-1">The Week in HR Tech</div>
          <p className="text-sm text-brand-dark/60">News anchor format. Mike's take on the deals, funding rounds, and signals that matter — and what they mean for you.</p>
        </div>
        <div className="bg-brand-cream rounded-xl p-5 border border-brand-cream">
          <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-2">Segment 2</div>
          <div className="font-serif text-xl font-semibold mb-1">Candidate Spotlight</div>
          <p className="text-sm text-brand-dark/60">One featured HR professional per episode. Who they are, what they've built, and what they're looking for next.</p>
        </div>
      </div>

      {/* Episodes */}
      <h2 className="font-serif text-2xl font-bold mb-6">Episodes</h2>
      <div className="space-y-6">
        {episodes.map((ep) => (
          <div key={ep.number} className="bg-white border border-brand-cream rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-brand-dark/40">Ep. {ep.number}</span>
                  <span className="text-xs text-brand-dark/40">{ep.date}</span>
                  <span className="text-xs text-brand-dark/40">{ep.duration}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{ep.title}</h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed">{ep.description}</p>
              </div>
              <button className="bg-brand-terracotta text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <Play size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sponsorship CTA */}
      <div className="mt-12 bg-brand-dark text-brand-cream rounded-xl p-8 text-center">
        <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-3">Sponsorship</div>
        <h2 className="font-serif text-2xl font-bold mb-2">Sponsor The Wrap Show</h2>
        <p className="text-brand-cream/70 mb-6 max-w-md mx-auto">
          $500 per episode. Your brand in front of HR tech decision-makers every week. Limited to one sponsor per episode.
        </p>
        <a
          href="mailto:mike@thewrap.com?subject=Show Sponsorship"
          className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-medium px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-dark transition-colors"
        >
          <Mail size={16} /> Get in touch
        </a>
      </div>
    </div>
  )
}
