import { Link } from 'react-router-dom'
import { Mail, Play } from 'lucide-react'
import { episodes } from '../data/episodes'

export default function ShowPage() {
  const [hero, ...rest] = episodes

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">The Show</div>
        <h1 className="font-serif text-4xl font-bold mb-3">The Wrap Show</h1>
        <p className="text-brand-dark/60 text-lg max-w-xl">
          Weekly video covering the week's biggest HR tech stories. New episodes every Friday on YouTube.
        </p>
      </div>

      {/* Latest episode — full embed */}
      {hero && (
        <div className="mb-10">
          <div className="text-brand-dark/40 text-xs uppercase tracking-widest font-medium mb-2">
            Latest Episode · {hero.date}
          </div>
          <h2 className="font-serif text-2xl font-bold mb-4">
            Episode {hero.number} — {hero.title}
          </h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-brand-dark mb-3">
            <iframe
              src={`https://www.youtube.com/embed/${hero.youtubeId}`}
              title={`The Wrap Show — Episode ${hero.number}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          {hero.description && (
            <p className="text-brand-dark/70 leading-relaxed">{hero.description}</p>
          )}
          {hero.newsletterSlug && (
            <p className="mt-3">
              <Link
                to={`/newsletter/${hero.newsletterSlug}`}
                className="text-brand-terracotta text-sm font-medium hover:underline"
              >
                Read the written edition →
              </Link>
            </p>
          )}
        </div>
      )}

      {/* Past episodes */}
      {rest.length > 0 && (
        <div className="mb-12">
          <h2 className="font-serif text-xl font-bold mb-4">Past Episodes</h2>
          <ul className="space-y-3">
            {rest.map((ep) => (
              <li
                key={ep.number}
                className="bg-brand-surface border border-brand-border rounded-lg p-4 hover:border-brand-terracotta/40 transition-colors"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 w-10 h-10 bg-brand-terracotta/10 text-brand-terracotta rounded-full flex items-center justify-center">
                    <Play size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-brand-dark/40 text-xs uppercase tracking-widest font-medium mb-1">
                      Episode {ep.number} · {ep.date}
                    </div>
                    <div className="font-serif font-bold mb-1">{ep.title}</div>
                    {ep.description && (
                      <div className="text-brand-dark/60 text-sm">{ep.description}</div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

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
