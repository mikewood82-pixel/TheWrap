import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const editions = [
  { date: 'April 3, 2026',   title: 'When did we stop expecting more from the top?',                          slug: 'stop-expecting-more'   },
  { date: 'March 27, 2026',  title: 'When every demo looks the same, what are you actually buying?',          slug: 'every-demo-looks-same' },
  { date: 'March 20, 2026',  title: 'Puppies and podcasts at Unleash',                                        slug: 'puppies-podcasts-unleash' },
  { date: 'March 13, 2026',  title: 'From SaaS to WorkOps — Notes from IAMPHENOM in Philadelphia',           slug: 'saas-to-workops-phenom' },
  { date: 'March 6, 2026',   title: 'We Are Living in a Sci-Fi Thriller',                                    slug: 'sci-fi-thriller'       },
]

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Newsletter Archive</div>
        <h1 className="font-serif text-4xl font-bold mb-3">Newsletter Archive</h1>
        <p className="text-brand-dark/60 text-lg">
          Every edition, every Friday. Mike's take on what's moving in HR technology.
        </p>
      </div>

      <div className="space-y-px border-t border-brand-cream">
        {editions.map((ed) => (
          <Link
            key={ed.slug}
            to={`/newsletter/${ed.slug}`}
            className="flex items-start justify-between gap-4 py-5 border-b border-brand-cream hover:bg-brand-cream/40 px-2 -mx-2 transition-colors group"
          >
            <div>
              <div className="text-xs text-brand-dark/40 mb-1">{ed.date}</div>
              <div className="font-serif text-lg font-semibold group-hover:text-brand-terracotta transition-colors">
                {ed.title}
              </div>
            </div>
            <ArrowRight size={18} className="text-brand-dark/20 group-hover:text-brand-terracotta mt-1 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
