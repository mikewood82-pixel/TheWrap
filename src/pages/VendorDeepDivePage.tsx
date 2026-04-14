import { useParams, Link } from 'react-router-dom'
import { ExternalLink, ArrowLeft, Star, Globe, TrendingUp, TrendingDown, Newspaper, Puzzle, Users, HeadphonesIcon, Building2, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { vendors } from '../data/vendors'
import { vendorHighlights } from '../data/vendorHighlights'
import { vendorDetails } from '../data/vendorDetails'
import RatingChart, { generateHistory } from '../components/RatingChart'
import VendorLogo from '../components/VendorLogo'

function CapabilityBar({ label, score, rationale }: { label: string; score: number; rationale?: string }) {
  const color = score >= 85 ? 'bg-brand-terracotta' : score >= 65 ? 'bg-brand-gold' : 'bg-brand-dark/30'
  const hasRationale = !!rationale
  return (
    <div className={`group relative flex items-center gap-3 ${hasRationale ? 'cursor-help' : ''}`}>
      <div className="w-32 text-xs text-brand-dark/60 text-right shrink-0">{label}</div>
      <div className="flex-1 bg-brand-cream rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      <div className="w-7 text-xs text-brand-dark/50 tabular-nums shrink-0">{score}</div>
      {hasRationale && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 w-72 -translate-x-1/2 rounded-lg bg-brand-dark p-3 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
        >
          <div className="text-brand-gold text-[10px] uppercase tracking-widest font-semibold mb-1">Why {score}?</div>
          <p className="text-xs leading-snug text-white">{rationale}</p>
          {/* Arrow */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-px h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-brand-dark" />
        </div>
      )}
    </div>
  )
}

// Sponsored editorial content (only for deepDive vendors)
const deepDiveContent: Record<string, { mikesTake: string[]; features: string[] }> = {
  'acme-staffing': {
    mikesTake: [
      "Acme Staffing has quietly built one of the cleaner workflow experiences in the mid-market ATS space. Where larger platforms like Greenhouse or Lever can feel like they were designed for enterprise procurement cycles, Acme is clearly built by people who have actually worked in staffing.",
      "The candidate pipeline view is genuinely good — drag-and-drop stages, inline notes, and a bulk messaging tool that doesn't feel bolted on. For teams placing 50–500 reqs a month, that's real time savings.",
      "Where I'd push back: the reporting module lags the competition, and if you need deep HRIS integration out of the box, verify your specific stack before you commit. Their Workday connector works; the others are a mixed bag.",
    ],
    features: [
      'Visual pipeline management with drag-and-drop stage progression',
      'Bulk candidate messaging and templated outreach',
      'Integrated job board posting (Indeed, LinkedIn, ZipRecruiter)',
      'Client portal for staffing agency workflows',
      'Compliance tracking and EEO reporting',
    ],
  },
}

function TrendBadge({ current, history }: { current: number; history: ReturnType<typeof generateHistory> }) {
  const start = history[0].value
  const delta = Math.round((current - start) * 10) / 10
  const up = delta >= 0
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {up ? '+' : ''}{delta} past 6 mo
    </span>
  )
}

export default function VendorDeepDivePage() {
  const { slug } = useParams<{ slug: string }>()
  const [submitted, setSubmitted] = useState(false)

  const vendor = vendors.find(v => v.slug === slug)

  if (!vendor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="font-serif text-2xl font-bold mb-3">Vendor not found</div>
        <p className="text-brand-dark/60 mb-6">We don't have a profile for that vendor yet.</p>
        <Link to="/vendors" className="inline-flex items-center gap-2 text-brand-terracotta hover:underline text-sm font-medium">
          <ArrowLeft size={14} /> Back to Vendor Database
        </Link>
      </div>
    )
  }

  const editorial = deepDiveContent[vendor.slug]
  const isSponsored = vendor.deepDive && !!editorial
  const highlights = vendorHighlights[vendor.slug]
  const details = vendorDetails[vendor.slug]

  // Root domain for Clearbit logo
  const domain = vendor.website.split('/')[0]

  // Generate 6-month chart data
  const g2History = generateHistory(vendor.g2, vendor.slug + '-g2')
  const glassdoorHistory = generateHistory(vendor.glassdoor, vendor.slug + '-gd')

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Back link */}
      <Link to="/vendors" className="inline-flex items-center gap-1.5 text-sm text-brand-dark/50 hover:text-brand-terracotta transition-colors mb-8">
        <ArrowLeft size={14} /> Vendor Database
      </Link>

      {/* Sponsored disclosure */}
      {isSponsored && (
        <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg px-4 py-2.5 text-xs text-brand-dark/60 mb-8">
          <strong className="text-brand-dark">Sponsored feature.</strong> {vendor.name} paid for placement on this page. The editorial take below is Mike's own — vendors do not review or edit it.
        </div>
      )}

      {/* Header: Logo + Name + Links */}
      <div className="flex items-start gap-4 mb-6">
        <VendorLogo name={vendor.name} domain={domain} />
        <div className="flex-1 min-w-0">
          <div className="text-brand-terracotta text-xs uppercase tracking-widest font-medium mb-1">
            {isSponsored ? 'Vendor Deep Dive' : 'Vendor Profile'}
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight mb-1">{vendor.name}</h1>
          <div className="text-brand-dark/40 text-sm mb-3">{vendor.category} · {vendor.employees} employees</div>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={`https://${vendor.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-brand-dark/60 hover:text-brand-terracotta transition-colors border border-brand-cream rounded-full px-3 py-1"
            >
              <Globe size={11} /> {vendor.website.split('/')[0]}
            </a>
            <a
              href={`https://www.linkedin.com/company/${vendor.linkedin}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-brand-dark/60 hover:text-[#0a66c2] transition-colors border border-brand-cream rounded-full px-3 py-1"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <p className="text-brand-dark/70 text-base leading-relaxed mb-8">{vendor.description}</p>

      {/* Gain Points + Pain Points — moved up for visibility */}
      {(highlights?.gainPoints?.length || highlights?.painPoints?.length) ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {highlights?.gainPoints?.length ? (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <div className="text-green-700 text-xs uppercase tracking-wide font-medium mb-4">✓ What Customers Love</div>
              <div className="space-y-4">
                {highlights.gainPoints.map((h, i) => (
                  <div key={i} className="pl-3 border-l-2 border-green-200">
                    <p className="text-sm text-brand-dark/80 leading-relaxed mb-1">"{h.text}"</p>
                    <p className="text-xs text-brand-dark/40">— {h.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {highlights?.painPoints?.length ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <div className="text-red-500 text-xs uppercase tracking-wide font-medium mb-4">⚠ Watch Out For</div>
              <div className="space-y-4">
                {highlights.painPoints.map((h, i) => (
                  <div key={i} className="pl-3 border-l-2 border-red-200">
                    <p className="text-sm text-brand-dark/80 leading-relaxed mb-1">"{h.text}"</p>
                    <p className="text-xs text-brand-dark/40">— {h.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {details && (
        <>
          {/* Capabilities */}
          <div className="bg-white border border-brand-cream rounded-xl p-6 mb-6">
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-4">Capability Overview</div>
            <div className="space-y-3">
              {details.capabilities.map(c => (
                <CapabilityBar key={c.label} label={c.label} score={c.score} rationale={c.rationale} />
              ))}
            </div>
            <p className="text-xs text-brand-dark/30 mt-4">Scores reflect editorial assessment based on product depth, user reviews, and market positioning. Not vendor-provided.</p>
          </div>

          {/* Ideal Customer + Integrations side by side */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-brand-cream rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={13} className="text-brand-dark/40" />
                <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Ideal Customer</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-brand-dark/40 mb-1">Company Size</div>
                  <div className="text-sm font-medium text-brand-dark">{details.idealCustomer.size}</div>
                </div>
                <div>
                  <div className="text-xs text-brand-dark/40 mb-1.5">Top Industries</div>
                  <div className="flex flex-wrap gap-1.5">
                    {details.idealCustomer.industries.map(ind => (
                      <span key={ind} className="text-xs bg-brand-cream text-brand-dark/70 px-2.5 py-1 rounded-full">{ind}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-brand-dark/40 mb-1">Best For</div>
                  <p className="text-sm text-brand-dark/70 leading-relaxed">{details.idealCustomer.useCase}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-brand-cream rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Puzzle size={13} className="text-brand-dark/40" />
                <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Popular Integrations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {details.integrations.map(int => (
                  <span key={int} className="inline-flex items-center text-xs bg-brand-gold/10 border border-brand-gold/20 text-brand-dark/70 px-3 py-1.5 rounded-lg font-medium">{int}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Newsroom */}
          <div className="bg-white border border-brand-cream rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper size={13} className="text-brand-dark/40" />
              <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">From the Newsroom</span>
            </div>
            <div className="space-y-3">
              {details.news.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-brand-cream last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-brand-dark/80 leading-snug mb-1">{item.headline}</p>
                    <p className="text-xs text-brand-dark/40">{item.source} · {item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Health */}
          {details.financialHealth && (
            <div className="bg-white border border-brand-cream rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={13} className="text-brand-dark/40" />
                <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Financial Health</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-5">
                <div className="bg-brand-cream/50 rounded-lg p-3">
                  <div className="text-xs text-brand-dark/40 mb-1">Funding Stage</div>
                  <div className="text-sm font-medium text-brand-dark">{details.financialHealth.fundingStage}</div>
                </div>
                <div className="bg-brand-cream/50 rounded-lg p-3">
                  <div className="text-xs text-brand-dark/40 mb-1">Headcount Trend</div>
                  <div className={`text-sm font-medium ${details.financialHealth.headcountTrend.startsWith('+') ? 'text-green-700' : details.financialHealth.headcountTrend.startsWith('-') ? 'text-red-600' : 'text-brand-dark'}`}>
                    {details.financialHealth.headcountTrend.startsWith('+') ? <TrendingUp size={12} className="inline mr-1" /> : details.financialHealth.headcountTrend.startsWith('-') ? <TrendingDown size={12} className="inline mr-1" /> : null}
                    {details.financialHealth.headcountTrend}
                  </div>
                </div>
                <div className="bg-brand-cream/50 rounded-lg p-3">
                  <div className="text-xs text-brand-dark/40 mb-1">Acquisition Risk</div>
                  <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                    details.financialHealth.acquisitionRisk === 'Low' ? 'bg-green-50 text-green-700' :
                    details.financialHealth.acquisitionRisk === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {details.financialHealth.acquisitionRisk === 'High' && <AlertTriangle size={10} className="mr-1" />}
                    {details.financialHealth.acquisitionRisk}
                  </span>
                </div>
              </div>

              {details.financialHealth.lastRaise && (
                <div className="text-sm text-brand-dark/70 mb-3">
                  <span className="text-xs text-brand-dark/40">Last raise:</span> {details.financialHealth.lastRaise}
                </div>
              )}

              {details.financialHealth.recentLayoffs && (
                <div className="text-sm text-red-600/80 bg-red-50 rounded-lg px-3 py-2 mb-3">
                  <AlertTriangle size={11} className="inline mr-1.5" />
                  {details.financialHealth.recentLayoffs}
                </div>
              )}

              <div className="space-y-2 mt-4">
                <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Key Signals</div>
                {details.financialHealth.keySignals.map((signal, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-brand-dark/70">
                    <span className="text-brand-terracotta mt-0.5 shrink-0">→</span> {signal}
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-dark/30 mt-5 pt-4 border-t border-brand-cream">
                Sources: SEC filings, Crunchbase, LinkedIn headcount data, and vendor press releases. Financial data is updated quarterly. Acquisition risk reflects aggregated signals — not financial advice.
              </p>
            </div>
          )}

          {/* Support Quality */}
          {details.supportQuality && (
            <div className="bg-white border border-brand-cream rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <HeadphonesIcon size={13} className="text-brand-dark/40" />
                <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Support Quality</span>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="font-serif text-4xl font-bold text-brand-dark">{details.supportQuality.overallScore}</div>
                <div className="flex-1">
                  <div className="bg-brand-cream rounded-full h-3 overflow-hidden mb-1">
                    <div
                      className={`h-3 rounded-full transition-all ${details.supportQuality.overallScore >= 75 ? 'bg-green-500' : details.supportQuality.overallScore >= 60 ? 'bg-brand-gold' : 'bg-red-400'}`}
                      style={{ width: `${details.supportQuality.overallScore}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-dark/40">/ 100</span>
                    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                      details.supportQuality.supportTrend === 'Improving' ? 'bg-green-50 text-green-700' :
                      details.supportQuality.supportTrend === 'Declining' ? 'bg-red-50 text-red-700' :
                      'bg-brand-cream text-brand-dark/50'
                    }`}>
                      {details.supportQuality.supportTrend === 'Improving' ? <TrendingUp size={10} className="mr-1" /> : details.supportQuality.supportTrend === 'Declining' ? <TrendingDown size={10} className="mr-1" /> : null}
                      {details.supportQuality.supportTrend}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-5">
                <div>
                  <div className="text-xs text-brand-dark/40 mb-1">Response Time</div>
                  <div className="text-sm text-brand-dark/70">{details.supportQuality.responseTime}</div>
                </div>
                <div>
                  <div className="text-xs text-brand-dark/40 mb-1.5">Channels</div>
                  <div className="flex flex-wrap gap-1.5">
                    {details.supportQuality.channels.map(ch => (
                      <span key={ch} className="text-xs bg-brand-cream text-brand-dark/70 px-2 py-0.5 rounded-full">{ch}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-brand-dark/40 mb-1">Dedicated CSM</div>
                  <div className="text-sm text-brand-dark/70">{details.supportQuality.dedicatedCsm}</div>
                </div>
              </div>

              {details.supportQuality.highlights.length > 0 && (
                <div className="mt-5 pt-5 border-t border-brand-cream space-y-4">
                  <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">What customers say about support</div>
                  {details.supportQuality.highlights.map((h, i) => (
                    <div key={i} className="pl-3 border-l-2 border-brand-gold/40">
                      <p className="text-sm text-brand-dark/80 leading-relaxed mb-1">"{h.text}"</p>
                      <p className="text-xs text-brand-dark/40">— {h.role}</p>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-brand-dark/30 mt-5 pt-4 border-t border-brand-cream">
                Sources: G2, Capterra, and Glassdoor reviews, plus vendor-published support documentation. Support scores are composite ratings based on response time, channel availability, and customer sentiment. Updated quarterly.
              </p>
            </div>
          )}
        </>
      )}

      {/* G2 Section */}
      <div className="bg-white border border-brand-cream rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">G2 Rating</span>
          </div>
          <TrendBadge current={vendor.g2} history={g2History} />
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-serif text-4xl font-bold">{vendor.g2}</span>
          <span className="text-brand-dark/40 text-sm">/ 5.0 · {vendor.reviews >= 1000 ? `${(vendor.reviews / 1000).toFixed(1)}k` : vendor.reviews} reviews</span>
        </div>
        <RatingChart data={g2History} />
        {highlights?.g2?.length ? (
          <div className="mt-5 pt-5 border-t border-brand-cream space-y-4">
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Highlights from reviews</div>
            {highlights.g2.map((h, i) => (
              <div key={i} className="pl-3 border-l-2 border-brand-gold/40">
                <p className="text-sm text-brand-dark/80 leading-relaxed mb-1">"{h.text}"</p>
                <p className="text-xs text-brand-dark/40">— {h.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-brand-dark/30 italic">Review highlights coming soon.</p>
        )}
        <div className="mt-4 pt-4 border-t border-brand-cream">
          <a
            href={`https://www.g2.com/products/${vendor.slug}/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors"
          >
            Read more on G2 <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Glassdoor Section */}
      <div className="bg-white border border-brand-cream rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Glassdoor Rating</span>
          <TrendBadge current={vendor.glassdoor} history={glassdoorHistory} />
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-serif text-4xl font-bold">{vendor.glassdoor}</span>
          <span className="text-brand-dark/40 text-sm">/ 5.0 · employee reviews</span>
        </div>
        <RatingChart data={glassdoorHistory} />
        {highlights?.glassdoor?.length ? (
          <div className="mt-5 pt-5 border-t border-brand-cream space-y-4">
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">What employees say</div>
            {highlights.glassdoor.map((h, i) => (
              <div key={i} className="pl-3 border-l-2 border-brand-gold/40">
                <p className="text-sm text-brand-dark/80 leading-relaxed mb-1">"{h.text}"</p>
                <p className="text-xs text-brand-dark/40">— {h.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-brand-dark/30 italic">Employee review highlights coming soon.</p>
        )}
        <div className="mt-4 pt-4 border-t border-brand-cream">
          <a
            href={`https://www.glassdoor.com/Search/results.htm?keyword=${encodeURIComponent(vendor.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors"
          >
            Read more on Glassdoor <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Capterra + News scores */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Capterra',      value: vendor.capterra.toString() },
          { label: 'Total Reviews', value: vendor.reviews >= 1000 ? `${(vendor.reviews / 1000).toFixed(1)}k` : vendor.reviews.toString() },
          { label: 'News Activity', value: vendor.news.toString() },
        ].map(s => (
          <div key={s.label} className="bg-brand-cream rounded-xl p-4 text-center">
            <div className="font-serif text-3xl font-bold text-brand-dark">{s.value}</div>
            <div className="text-xs text-brand-dark/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mike's Take (sponsored only) */}
      {isSponsored && editorial && (
        <div className="bg-brand-dark text-brand-cream rounded-xl p-6 mb-8">
          <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-3 flex items-center gap-2">
            <Star size={12} fill="currentColor" /> Mike's Take
          </div>
          {editorial.mikesTake.map((para, i) => (
            <p key={i} className={`leading-relaxed ${i < editorial.mikesTake.length - 1 ? 'mb-3' : 'text-brand-cream/70 text-sm'}`}>
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Software Preview (sponsored only) */}
      {isSponsored && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-3">Software Preview</h2>
          <div className="bg-brand-cream rounded-xl aspect-video flex items-center justify-center border border-brand-cream text-brand-dark/30 text-sm">
            [ Product screenshot or demo video ]
          </div>
        </div>
      )}

      {/* Key Features (sponsored only) */}
      {isSponsored && editorial && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">What It Does</h2>
          <ul className="space-y-2">
            {editorial.features.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-brand-dark/70">
                <span className="text-brand-terracotta mt-0.5">→</span> {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Demo Request Form (sponsored only) */}
      {isSponsored && (
        <div className="bg-brand-cream rounded-xl p-8 border border-brand-cream mb-6">
          <h2 className="font-serif text-2xl font-bold mb-1">Request a Demo</h2>
          <p className="text-brand-dark/60 text-sm mb-6">
            Submit your info and {vendor.name}'s team will reach out to schedule a walkthrough.
          </p>
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-brand-terracotta font-serif text-xl font-semibold mb-2">Request sent.</div>
              <p className="text-brand-dark/60 text-sm">{vendor.name}'s team will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
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
                  <option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-brand-terracotta text-white font-medium py-3 rounded-lg hover:bg-brand-dark transition-colors">
                Request Demo
              </button>
            </form>
          )}
        </div>
      )}

      {/* Footer links */}
      <div className="flex items-center justify-between pt-2">
        <a
          href={`https://${vendor.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-brand-terracotta text-sm font-medium hover:underline"
        >
          Visit {vendor.name} <ExternalLink size={14} />
        </a>
        {!isSponsored && (
          <a
            href="mailto:mike@thewrap.com?subject=Vendor Deep Dive"
            className="text-xs text-brand-dark/40 hover:text-brand-terracotta transition-colors"
          >
            {vendor.name} vendor? Get a Deep Dive →
          </a>
        )}
      </div>
    </div>
  )
}
