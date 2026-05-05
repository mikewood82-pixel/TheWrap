import { ShieldCheck, ExternalLink, Check, Clock, Minus, HelpCircle } from 'lucide-react'
import type { ComplianceProfile, ComplianceCertification, ComplianceCategory, ComplianceStatus } from '../data/vendorProfiles'

interface Props {
  profile: ComplianceProfile
}

const CATEGORY_ORDER: ComplianceCategory[] = ['Security', 'Privacy', 'AI', 'Government', 'Industry']

const CATEGORY_LABEL: Record<ComplianceCategory, string> = {
  Security:   'Security',
  Privacy:    'Privacy & Data Protection',
  AI:         'AI Governance',
  Government: 'Government & Public Sector',
  Industry:   'Industry-Specific',
}

function StatusPill({ status }: { status: ComplianceStatus }) {
  const cfg = {
    'Certified':     { cls: 'bg-green-50 text-green-700 border-green-100',     Icon: Check },
    'In progress':   { cls: 'bg-amber-50 text-amber-800 border-amber-100',     Icon: Clock },
    'Self-attested': { cls: 'bg-blue-50 text-blue-700 border-blue-100',        Icon: Check },
    'Not pursued':   { cls: 'bg-brand-cream text-brand-dark/50 border-brand-cream', Icon: Minus },
    'Unknown':       { cls: 'bg-brand-cream text-brand-dark/50 border-brand-cream', Icon: HelpCircle },
  }[status]
  const { Icon } = cfg
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-semibold border px-2 py-0.5 rounded-full ${cfg.cls}`}>
      <Icon size={10} /> {status}
    </span>
  )
}

function CertCard({ cert }: { cert: ComplianceCertification }) {
  return (
    <div className="border border-brand-border bg-brand-surface rounded-lg p-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="font-semibold text-sm text-brand-dark leading-tight">{cert.name}</div>
        <StatusPill status={cert.status} />
      </div>
      {cert.scope && (
        <div className="text-xs text-brand-dark/50 mt-1 leading-snug">
          <span className="text-brand-dark/40">Scope:</span> {cert.scope}
        </div>
      )}
      {cert.attestedDate && (
        <div className="text-xs text-brand-dark/50 mt-1">
          <span className="text-brand-dark/40">Attested:</span> {cert.attestedDate}
        </div>
      )}
      {cert.note && (
        <div className="text-xs text-brand-dark/50 mt-1.5 italic leading-snug">{cert.note}</div>
      )}
    </div>
  )
}

export default function VendorCompliance({ profile }: Props) {
  const grouped = CATEGORY_ORDER
    .map(cat => ({
      category: cat,
      label: CATEGORY_LABEL[cat],
      certs: profile.certifications.filter(c => c.category === cat),
    }))
    .filter(g => g.certs.length > 0)

  const certifiedCount = profile.certifications.filter(c => c.status === 'Certified').length
  const totalCount = profile.certifications.length

  return (
    <div id="compliance" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Compliance & Trust Center</span>
        <span className="ml-auto text-xs text-brand-dark/50 tabular-nums">
          <span className="font-semibold text-brand-dark">{certifiedCount}</span> of {totalCount} certified
        </span>
      </div>

      {(profile.trustCenterUrl || profile.subprocessorsUrl) && (
        <div className="flex flex-wrap gap-2 mb-5">
          {profile.trustCenterUrl && (
            <a
              href={profile.trustCenterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-brand-dark/70 bg-brand-cream/60 hover:bg-brand-cream border border-brand-cream rounded-full px-3 py-1 transition-colors"
            >
              Trust Center <ExternalLink size={11} />
            </a>
          )}
          {profile.subprocessorsUrl && (
            <a
              href={profile.subprocessorsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-brand-dark/70 bg-brand-cream/60 hover:bg-brand-cream border border-brand-cream rounded-full px-3 py-1 transition-colors"
            >
              Sub-processors <ExternalLink size={11} />
            </a>
          )}
        </div>
      )}

      <div className="space-y-5">
        {grouped.map(group => (
          <div key={group.category}>
            <div className="text-[11px] uppercase tracking-wider text-brand-dark/40 font-semibold mb-2">
              {group.label} <span className="text-brand-dark/30">· {group.certs.length}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.certs.map((c, i) => <CertCard key={i} cert={c} />)}
            </div>
          </div>
        ))}
      </div>

      {profile.notes && profile.notes.length > 0 && (
        <div className="mt-5 pt-4 border-t border-brand-cream">
          <ul className="space-y-1.5">
            {profile.notes.map((n, i) => (
              <li key={i} className="text-xs text-brand-dark/60 leading-relaxed flex gap-2">
                <span className="text-brand-terracotta shrink-0">→</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-brand-dark/30 mt-5 pt-4 border-t border-brand-cream">
        Sources: vendor-published Trust Center pages and public attestation registries (AICPA SOC, ISO, FedRAMP Marketplace, CSA STAR). Verified {profile.verifiedDate}. SOC reports themselves are gated; the attestation is public.
      </p>
    </div>
  )
}
