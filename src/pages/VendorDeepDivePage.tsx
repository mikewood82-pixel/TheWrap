import { ExternalLink, Star } from 'lucide-react'
import { useState } from 'react'

export default function VendorDeepDivePage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Sponsored disclosure */}
      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg px-4 py-2.5 text-xs text-brand-dark/60 mb-8">
        <strong className="text-brand-dark">Sponsored feature.</strong> Acme Staffing paid for placement on this page. The editorial take below is Mike's own — vendors do not review or edit it.
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Vendor Deep Dive</div>
        <h1 className="font-serif text-4xl font-bold mb-1">Acme Staffing</h1>
        <div className="text-brand-dark/40 text-sm">ATS / Staffing Platform · 250+ employees</div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'G2 Score',      value: '4.5' },
          { label: 'Capterra',      value: '4.6' },
          { label: 'News Activity', value: '6'   },
        ].map((s) => (
          <div key={s.label} className="bg-brand-cream rounded-xl p-4 text-center">
            <div className="font-serif text-3xl font-bold text-brand-dark">{s.value}</div>
            <div className="text-xs text-brand-dark/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mike's Take */}
      <div className="bg-brand-dark text-brand-cream rounded-xl p-6 mb-8">
        <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-3 flex items-center gap-2">
          <Star size={12} fill="currentColor" /> Mike's Take
        </div>
        <p className="leading-relaxed mb-3">
          Acme Staffing has quietly built one of the cleaner workflow experiences in the mid-market ATS space. Where larger platforms like Greenhouse or Lever can feel like they were designed for enterprise procurement cycles, Acme is clearly built by people who have actually worked in staffing.
        </p>
        <p className="leading-relaxed mb-3">
          The candidate pipeline view is genuinely good — drag-and-drop stages, inline notes, and a bulk messaging tool that doesn't feel bolted on. For teams placing 50–500 reqs a month, that's real time savings.
        </p>
        <p className="leading-relaxed text-brand-cream/70 text-sm">
          Where I'd push back: the reporting module lags the competition, and if you need deep HRIS integration out of the box, verify your specific stack before you commit. Their Workday connector works; the others are a mixed bag.
        </p>
      </div>

      {/* Software Preview */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold mb-3">Software Preview</h2>
        <div className="bg-brand-cream rounded-xl aspect-video flex items-center justify-center border border-brand-cream text-brand-dark/30 text-sm">
          [ Product screenshot or demo video ]
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold mb-4">What It Does</h2>
        <ul className="space-y-2">
          {[
            'Visual pipeline management with drag-and-drop stage progression',
            'Bulk candidate messaging and templated outreach',
            'Integrated job board posting (Indeed, LinkedIn, ZipRecruiter)',
            'Client portal for staffing agency workflows',
            'Compliance tracking and EEO reporting',
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-brand-dark/70">
              <span className="text-brand-terracotta mt-0.5">→</span> {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Demo Request Form */}
      <div className="bg-brand-cream rounded-xl p-8 border border-brand-cream">
        <h2 className="font-serif text-2xl font-bold mb-1">Request a Demo</h2>
        <p className="text-brand-dark/60 text-sm mb-6">
          Submit your info and Acme's team will reach out directly to schedule a walkthrough.
        </p>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-brand-terracotta font-serif text-xl font-semibold mb-2">Request sent.</div>
            <p className="text-brand-dark/60 text-sm">Acme's team will be in touch shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-brand-dark/60 block mb-1">First Name</label>
                <input required className="w-full border border-brand-cream bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-brand-dark/60 block mb-1">Last Name</label>
                <input required className="w-full border border-brand-cream bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-brand-dark/60 block mb-1">Work Email</label>
              <input required type="email" className="w-full border border-brand-cream bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-brand-dark/60 block mb-1">Company</label>
              <input required className="w-full border border-brand-cream bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-brand-dark/60 block mb-1">Team Size</label>
              <select className="w-full border border-brand-cream bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30">
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>200+</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Request Demo
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://acmestaffing.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-brand-terracotta text-sm hover:underline"
        >
          Visit Acme Staffing <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
