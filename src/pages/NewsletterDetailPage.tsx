import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getNewsletter } from '../data/newsletters'

export default function NewsletterDetailPage() {
  const { slug } = useParams()
  const edition = getNewsletter(slug ?? '')

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
        className="prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:text-brand-dark
          prose-p:text-brand-dark/80 prose-p:leading-relaxed
          prose-a:text-brand-terracotta prose-a:no-underline hover:prose-a:underline
          prose-strong:text-brand-dark
          prose-hr:border-brand-border"
        dangerouslySetInnerHTML={{ __html: edition.body }}
      />
    </div>
  )
}
