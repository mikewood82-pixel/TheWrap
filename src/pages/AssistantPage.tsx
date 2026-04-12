import { useState } from 'react'
import { Sparkles, Copy, Check, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'

const TAGS = [
  'AI & Future of Work', 'Leadership', 'Labor Market', 'Events',
  'HR Tech', 'DEI', 'Talent Acquisition', 'Frontline', 'Buying', 'Culture',
]

export default function AssistantPage() {
  const [draft, setDraft] = useState('')
  const [result, setResult] = useState<{ excerpt: string; tag: string; slug: string } | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  async function handleGenerate() {
    if (!draft.trim()) return
    setStatus('loading')
    setResult(null)
    setErrorMsg('')

    try {
      const res = await fetch('/api/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong')
        setStatus('error')
        return
      }
      setResult(data)
      setStatus('idle')
    } catch {
      setErrorMsg('Network error — check your connection')
      setStatus('error')
    }
  }

  function copyField(field: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Newsletter Assistant" url="/assistant" />

      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Internal Tool</div>
        <h1 className="font-serif text-3xl font-bold mb-2">Newsletter Assistant</h1>
        <p className="text-brand-dark/60">
          Paste a draft edition below. The AI generates an excerpt, tag, and slug — saving time on every publish.
        </p>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium block mb-2">
          Draft Content
        </label>
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Paste your newsletter draft here — HTML or plain text..."
          rows={12}
          className="w-full border border-brand-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30 focus:border-brand-terracotta transition-colors resize-y font-mono"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-brand-dark/30">
            {draft.length > 0 ? `${draft.split(/\s+/).filter(Boolean).length} words` : 'Paste your draft to get started'}
          </span>
          <button
            onClick={handleGenerate}
            disabled={!draft.trim() || status === 'loading'}
            className="inline-flex items-center gap-2 bg-brand-terracotta text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} />
            {status === 'loading' ? 'Generating...' : 'Generate Metadata'}
          </button>
        </div>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm mb-0.5">Generation failed</div>
            <p className="text-sm text-red-600">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Generated Metadata</div>

          {/* Excerpt */}
          <div className="bg-white border border-brand-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Excerpt</span>
              <button onClick={() => copyField('excerpt', result.excerpt)} className="text-xs text-brand-dark/40 hover:text-brand-terracotta inline-flex items-center gap-1">
                {copiedField === 'excerpt' ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <p className="text-sm text-brand-dark leading-relaxed">{result.excerpt}</p>
          </div>

          {/* Tag */}
          <div className="bg-white border border-brand-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Tag</span>
              <button onClick={() => copyField('tag', result.tag)} className="text-xs text-brand-dark/40 hover:text-brand-terracotta inline-flex items-center gap-1">
                {copiedField === 'tag' ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <span className="inline-block text-xs bg-brand-surface text-brand-muted px-3 py-1.5 rounded-full border border-brand-border font-medium">
              {result.tag}
            </span>
            {!TAGS.includes(result.tag) && (
              <p className="text-xs text-amber-600 mt-2">Note: this tag isn't in the standard list. Consider using one of: {TAGS.join(', ')}</p>
            )}
          </div>

          {/* Slug */}
          <div className="bg-white border border-brand-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Suggested Slug</span>
              <button onClick={() => copyField('slug', result.slug)} className="text-xs text-brand-dark/40 hover:text-brand-terracotta inline-flex items-center gap-1">
                {copiedField === 'slug' ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <code className="text-sm font-mono text-brand-dark bg-brand-surface px-3 py-1.5 rounded-lg inline-block">
              {result.slug}
            </code>
            <p className="text-xs text-brand-dark/40 mt-2">
              URL: ilovethewrap.com/newsletter/{result.slug}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
