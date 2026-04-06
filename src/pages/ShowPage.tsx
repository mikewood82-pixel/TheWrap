import { Mail } from 'lucide-react'

export default function ShowPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">The Show</div>
        <h1 className="font-serif text-4xl font-bold mb-3">The Wrap Show</h1>
        <p className="text-brand-dark/60 text-lg max-w-xl">
          Weekly video show covering the week's biggest HR tech stories. New episodes coming soon.
        </p>
      </div>

      {/* Coming soon */}
      <div className="bg-brand-surface border border-brand-border rounded-xl p-12 text-center mb-12">
        <div className="text-brand-dark/30 text-sm uppercase tracking-widest font-medium mb-3">Coming Soon</div>
        <h2 className="font-serif text-2xl font-bold mb-3">Episodes launching shortly</h2>
        <p className="text-brand-dark/50 max-w-md mx-auto">
          The Wrap Show is in production. Check back soon for weekly HR tech coverage.
        </p>
      </div>

      {/* Sponsorship CTA */}
      <div className="bg-brand-dark text-white rounded-xl p-8 text-center">
        <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-3">Sponsorship</div>
        <h2 className="font-serif text-2xl font-bold mb-2">Sponsor The Wrap Show</h2>
        <p className="text-white/60 mb-6 max-w-md mx-auto">
          $500 per episode. Your brand in front of HR tech decision-makers every week. Limited to one sponsor per episode.
        </p>
        <a
          href="mailto:mike@thewrap.com?subject=Show Sponsorship"
          className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors"
        >
          <Mail size={16} /> Get in touch
        </a>
      </div>
    </div>
  )
}
