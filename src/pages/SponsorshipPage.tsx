import { useState } from 'react'
import SEO from '../components/SEO'

const packages = [
  {
    name: 'Newsletter Sponsorship',
    description: 'Your brand in front of 1,000+ HR tech practitioners every Friday. One sponsor per edition, clearly labeled.',
    details: [
      'Dedicated sponsor callout at the top of the edition',
      'Your logo, 1–2 sentence description, and link',
      'Audience: HR leaders, practitioners, and buyers',
      'Two slots available per month',
    ],
  },
  {
    name: 'Show Sponsorship',
    description: 'Sponsor a weekly episode of The Wrap Show — short-form video covering the week in HR tech. One sponsor per episode.',
    details: [
      'Verbal mention at the top of the episode',
      'Logo in the video and description',
      'Shared to all distribution channels',
      'One sponsor per episode, no pre-roll ads',
    ],
  },
]

export default function SponsorshipPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', type: 'Newsletter Sponsorship', message: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO
        title="Sponsorship"
        description="Reach 1,000+ HR tech professionals with The Wrap. Sponsorship opportunities for the newsletter and show."
        url="/sponsorship"
      />

      {/* Header */}
      <div className="mb-12">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Work With Us</div>
        <h1 className="font-serif text-4xl font-bold mb-4">Sponsorship</h1>
        <p className="text-brand-dark/60 text-lg leading-relaxed max-w-xl">
          Reach HR tech practitioners who actually make buying decisions. No fluff, no inflated numbers — just an engaged audience that reads every word.
        </p>
      </div>

      {/* Packages */}
      <div className="space-y-6 mb-14">
        {packages.map((pkg) => (
          <div key={pkg.name} className="border border-brand-border rounded-2xl p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{pkg.name}</h2>
                <p className="text-brand-dark/60 leading-relaxed">{pkg.description}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {pkg.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-brand-dark/70">
                  <span className="text-brand-terracotta mt-0.5 shrink-0">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Audience stats */}
      <div className="bg-brand-cream rounded-2xl p-8 mb-12">
        <h3 className="font-serif text-lg font-semibold mb-5">Who reads The Wrap</h3>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { value: '1,000+', label: 'Subscribers' },
            { value: '18mo',   label: 'Publishing' },
            { value: 'Weekly', label: 'Cadence' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-2xl font-bold text-brand-dark mb-0.5">{s.value}</div>
              <div className="text-xs text-brand-dark/50 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-brand-dark/60 leading-relaxed">
          Readers are HR practitioners, people ops leaders, and technology buyers — the people shortlisting and selecting HR tech vendors.
        </p>
      </div>

      {/* Contact form */}
      <div className="border border-brand-border rounded-2xl p-8">
        <h3 className="font-serif text-2xl font-bold mb-2">Get in touch</h3>
        <p className="text-brand-dark/50 text-sm mb-8">
          Fill out the form and I'll get back to you within 1–2 business days.
        </p>

        {state === 'success' ? (
          <div className="bg-brand-cream rounded-xl p-8 text-center">
            <div className="font-serif text-xl font-bold mb-2">Got it — thanks.</div>
            <p className="text-brand-dark/60 text-sm">I'll be in touch within 1–2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Name <span className="text-brand-terracotta">*</span></label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Email <span className="text-brand-terracotta">*</span></label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => update('company', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">I'm interested in</label>
                <select
                  value={form.type}
                  onChange={e => update('type', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30 bg-white"
                >
                  <option>Newsletter Sponsorship</option>
                  <option>Show Sponsorship</option>
                  <option>Both</option>
                  <option>Something else</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">Message <span className="text-brand-terracotta">*</span></label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={e => update('message', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30 resize-none"
                placeholder="Tell me about your company and what you're hoping to achieve..."
              />
            </div>

            {state === 'error' && (
              <p className="text-red-500 text-sm">Something went wrong — please try again or email mike@ilovethewrap.com directly.</p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="bg-brand-terracotta text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-orange transition-colors disabled:opacity-60"
            >
              {state === 'loading' ? 'Sending...' : 'Send inquiry'}
            </button>
          </form>
        )}
      </div>

    </div>
  )
}
