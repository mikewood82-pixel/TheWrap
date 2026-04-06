import { useState } from 'react'
import { Mail } from 'lucide-react'

const featured = {
  name: 'Sarah Chen',
  title: 'VP of HR',
  location: 'Austin, TX (open to remote)',
  years: '14',
  summary: 'Sarah has spent 14 years building people functions at high-growth SaaS companies — from Series A through IPO. She\'s done three HRIS migrations, built two talent acquisition teams from scratch, and led a company through a workforce reduction while maintaining a 4.3 Glassdoor score. She\'s looking for her next VP HR or CHRO role at a Series B–D company.',
  strengths: [
    'HRIS implementation and vendor selection',
    'Talent acquisition program design',
    'Compensation benchmarking and pay equity',
    'Workforce reduction and change management',
  ],
  openTo: 'VP HR, Head of People, CHRO',
  email: 'sarah.chen.hr@email.com',
  linkedin: 'linkedin.com/in/sarahchenhr',
}

const past = [
  { name: 'Marcus Williams', title: 'Senior HRBP', week: 'May 30' },
  { name: 'Priya Nair',      title: 'Talent Acquisition Lead', week: 'May 23' },
  { name: 'James Okafor',    title: 'Director of Total Rewards', week: 'May 16' },
]

export default function CandidateSpotlightPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-2">Candidate Spotlight</div>
        <h1 className="font-serif text-4xl font-bold mb-3">This Week's Featured Candidate</h1>
        <p className="text-brand-dark/60">
          One HR professional featured every week — in the newsletter, on the show, and right here.
        </p>
      </div>

      {/* Featured card */}
      <div className="bg-white border border-brand-cream rounded-xl p-8 mb-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-brand-terracotta/10 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-brand-terracotta shrink-0">
            {featured.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold">{featured.name}</h2>
            <div className="text-brand-dark/60 text-sm">{featured.title}</div>
            <div className="text-brand-dark/40 text-xs mt-0.5">{featured.location} · {featured.years} years experience</div>
          </div>
        </div>

        <p className="text-brand-dark/70 leading-relaxed mb-6">{featured.summary}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-gold font-medium mb-2">Strengths</div>
            <ul className="space-y-1">
              {featured.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-brand-dark/70">
                  <span className="text-brand-terracotta mt-0.5">→</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-gold font-medium mb-2">Open To</div>
            <p className="text-sm text-brand-dark/70">{featured.openTo}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-brand-cream">
          <a
            href={`mailto:${featured.email}`}
            className="inline-flex items-center gap-2 bg-brand-terracotta text-white text-sm font-medium px-4 py-2 rounded hover:bg-brand-dark transition-colors"
          >
            <Mail size={14} /> Connect via Email
          </a>
          <a
            href={`https://${featured.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-dark/20 text-brand-dark text-sm font-medium px-4 py-2 rounded hover:bg-brand-cream transition-colors"
          >
            View LinkedIn
          </a>
        </div>
      </div>

      {/* Past spotlights */}
      <div className="mb-12">
        <h2 className="font-serif text-xl font-semibold mb-4">Previous Spotlights</h2>
        <div className="space-y-3">
          {past.map((p) => (
            <div key={p.name} className="flex items-center justify-between py-3 border-b border-brand-cream">
              <div>
                <span className="font-medium">{p.name}</span>
                <span className="text-brand-dark/40 text-sm ml-2">{p.title}</span>
              </div>
              <span className="text-xs text-brand-dark/30">{p.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit form */}
      <div className="bg-brand-dark text-brand-cream rounded-xl p-8">
        <h2 className="font-serif text-2xl font-bold mb-2">Want to be featured?</h2>
        <p className="text-brand-cream/60 text-sm mb-6">
          Submit your profile. Mike reviews every submission and selects one candidate per week. Free to apply.
        </p>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-brand-gold font-serif text-xl font-semibold mb-1">Submitted.</div>
            <p className="text-brand-cream/60 text-sm">Mike will be in touch if you're selected for an upcoming week.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-brand-cream/50 block mb-1">Full Name</label>
                <input required className="w-full bg-brand-brown border border-brand-brown rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50" />
              </div>
              <div>
                <label className="text-xs text-brand-cream/50 block mb-1">Current / Most Recent Title</label>
                <input required className="w-full bg-brand-brown border border-brand-brown rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50" />
              </div>
            </div>
            <div>
              <label className="text-xs text-brand-cream/50 block mb-1">Email</label>
              <input required type="email" className="w-full bg-brand-brown border border-brand-brown rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50" />
            </div>
            <div>
              <label className="text-xs text-brand-cream/50 block mb-1">LinkedIn URL</label>
              <input className="w-full bg-brand-brown border border-brand-brown rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50" placeholder="linkedin.com/in/yourprofile" />
            </div>
            <div>
              <label className="text-xs text-brand-cream/50 block mb-1">What are you looking for? (2–3 sentences)</label>
              <textarea required rows={3} className="w-full bg-brand-brown border border-brand-brown rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 resize-none" />
            </div>
            <button type="submit" className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors">
              Submit My Profile
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
