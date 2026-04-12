import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { newsletters } from '../data/newsletters'
import { archive } from '../data/archive'
import SEO from '../components/SEO'

function ShareButtons({ title }: { title: string }) {
  const url = window.location.href
  const text = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="mt-10 pt-6 border-t border-brand-border flex items-center gap-3">
      <span className="text-sm text-brand-muted font-medium">Share this edition:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#0A66C2] bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-brand-dark bg-brand-surface hover:bg-brand-border transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X
      </a>
    </div>
  )
}

export default function NewsletterDetailPage() {
  const { slug } = useParams()
  const edition = [...newsletters, ...archive].find(n => n.slug === (slug ?? ''))

  if (!edition) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-3">Edition not found</h1>
        <Link to="/newsletter" className="text-brand-terracotta hover:underline">← Back to archive</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <SEO
        title={edition.title}
        description={edition.excerpt ?? `${edition.title} — The Wrap, ${edition.date}`}
        url={`/newsletter/${edition.slug}`}
        type="article"
        publishedDate={edition.date}
      />
      <Link
        to="/newsletter"
        className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Back to archive
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs bg-brand-surface text-brand-muted px-3 py-1 rounded-full border border-brand-border">
            {edition.tag}
          </span>
          <span className="text-sm text-brand-muted">{edition.date}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-brand-dark leading-tight mb-4">
          {edition.title}
        </h1>
        {edition.excerpt && (
          <p className="text-lg text-brand-muted leading-relaxed border-l-2 border-brand-terracotta pl-4">
            {edition.excerpt}
          </p>
        )}
      </div>

      <div
        className="article-body prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:text-brand-dark
          prose-p:text-brand-dark/80 prose-p:leading-relaxed
          prose-a:text-brand-terracotta prose-a:no-underline hover:prose-a:underline
          prose-strong:text-brand-dark
          prose-hr:border-brand-border
          prose-img:rounded-xl prose-img:w-full
          prose-blockquote:border-brand-terracotta prose-blockquote:text-brand-dark/70"
        dangerouslySetInnerHTML={{ __html: edition.body }}
      />

      <ShareButtons title={edition.title} />
    </div>
  )
}
