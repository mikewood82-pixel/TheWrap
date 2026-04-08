import { X, ExternalLink } from 'lucide-react'
import { useCompare } from '../context/CompareContext'
import { vendors } from '../data/vendors'
import { vendorDetails } from '../data/vendorDetails'
import { Link } from 'react-router-dom'

export default function CompareModal({ onClose }: { onClose: () => void }) {
  const { slugs, toggle } = useCompare()
  const selected = slugs.map(s => vendors.find(v => v.slug === s)).filter(Boolean) as typeof vendors

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-brand-cream z-10 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold">Compare Vendors</h2>
          <p className="text-xs text-brand-dark/40 mt-0.5">Side-by-side comparison of {selected.length} vendors</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-[640px] text-sm">
          {/* Vendor headers */}
          <thead>
            <tr className="border-b border-brand-cream">
              <th className="text-left px-5 py-4 w-40 text-xs text-brand-dark/40 uppercase tracking-wide font-medium bg-brand-light">Criteria</th>
              {selected.map(v => (
                <th key={v.slug} className="px-5 py-4 text-left border-l border-brand-cream">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-serif font-bold text-base text-brand-dark leading-tight">{v.name}</div>
                      <div className="text-xs text-brand-dark/40 mt-0.5">{v.category}</div>
                    </div>
                    <button
                      onClick={() => toggle(v.slug)}
                      className="text-brand-dark/20 hover:text-brand-dark/60 shrink-0 mt-0.5"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* G2 Rating */}
            <Row label="G2 Rating">
              {selected.map(v => (
                <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream">
                  <span className="font-serif text-2xl font-bold">{v.g2}</span>
                  <span className="text-xs text-brand-dark/40 ml-1">/ 5.0</span>
                </td>
              ))}
            </Row>

            {/* Glassdoor */}
            <Row label="Glassdoor" shaded>
              {selected.map(v => (
                <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream bg-brand-light">
                  <span className="font-serif text-2xl font-bold">{v.glassdoor}</span>
                  <span className="text-xs text-brand-dark/40 ml-1">/ 5.0</span>
                </td>
              ))}
            </Row>

            {/* Reviews */}
            <Row label="Total Reviews">
              {selected.map(v => (
                <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream">
                  <span className="font-medium">{v.reviews >= 1000 ? `${(v.reviews / 1000).toFixed(1)}k` : v.reviews}</span>
                </td>
              ))}
            </Row>

            {/* Company size */}
            <Row label="Ideal Size" shaded>
              {selected.map(v => {
                const detail = vendorDetails[v.slug]
                return (
                  <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream bg-brand-light">
                    <span className="text-sm">{detail?.idealCustomer.size ?? '—'}</span>
                  </td>
                )
              })}
            </Row>

            {/* Industries */}
            <Row label="Top Industries">
              {selected.map(v => {
                const detail = vendorDetails[v.slug]
                return (
                  <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream">
                    <div className="flex flex-wrap gap-1">
                      {detail?.idealCustomer.industries.slice(0, 3).map(ind => (
                        <span key={ind} className="text-xs bg-brand-cream text-brand-dark/60 px-2 py-0.5 rounded-full">{ind}</span>
                      )) ?? '—'}
                    </div>
                  </td>
                )
              })}
            </Row>

            {/* Capabilities */}
            <Row label="Capabilities" shaded>
              {selected.map(v => {
                const detail = vendorDetails[v.slug]
                return (
                  <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream bg-brand-light align-top">
                    <div className="space-y-1.5">
                      {detail?.capabilities.map(c => (
                        <div key={c.label} className="flex items-center gap-2">
                          <div className="w-20 text-xs text-brand-dark/50 shrink-0">{c.label}</div>
                          <div className="flex-1 bg-brand-cream rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${c.score >= 85 ? 'bg-brand-terracotta' : c.score >= 65 ? 'bg-brand-gold' : 'bg-brand-dark/20'}`}
                              style={{ width: `${c.score}%` }}
                            />
                          </div>
                          <span className="text-xs text-brand-dark/40 w-5 tabular-nums">{c.score}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                )
              })}
            </Row>

            {/* Integrations */}
            <Row label="Integrations">
              {selected.map(v => {
                const detail = vendorDetails[v.slug]
                return (
                  <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream align-top">
                    <div className="flex flex-wrap gap-1">
                      {detail?.integrations.map(int => (
                        <span key={int} className="text-xs bg-brand-gold/10 border border-brand-gold/20 text-brand-dark/60 px-2 py-0.5 rounded">{int}</span>
                      )) ?? '—'}
                    </div>
                  </td>
                )
              })}
            </Row>

            {/* Employees */}
            <Row label="Company Size" shaded>
              {selected.map(v => (
                <td key={v.slug} className="px-5 py-3.5 border-l border-brand-cream bg-brand-light">
                  <span className="text-sm">{v.employees} employees</span>
                </td>
              ))}
            </Row>

            {/* Links */}
            <Row label="">
              {selected.map(v => (
                <td key={v.slug} className="px-5 py-4 border-l border-brand-cream">
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      to={`/vendors/${v.slug}`}
                      onClick={onClose}
                      className="text-xs font-medium text-brand-terracotta hover:underline"
                    >
                      View profile →
                    </Link>
                    <a
                      href={`https://${v.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-dark/40 hover:text-brand-dark transition-colors"
                    >
                      Website <ExternalLink size={10} />
                    </a>
                  </div>
                </td>
              ))}
            </Row>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row({ label, children, shaded }: { label: string; children: React.ReactNode; shaded?: boolean }) {
  return (
    <tr className={`border-b border-brand-cream ${shaded ? '' : ''}`}>
      <td className={`px-5 py-3.5 text-xs font-medium text-brand-dark/50 uppercase tracking-wide align-top bg-brand-light`}>
        {label}
      </td>
      {children}
    </tr>
  )
}
