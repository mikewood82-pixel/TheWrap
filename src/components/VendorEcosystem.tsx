import { Network, ExternalLink, Check, Lock, X, HelpCircle, Boxes } from 'lucide-react'
import type { EcosystemProfile, EcosystemField, EcosystemAvailability } from '../data/vendorProfiles'

interface Props {
  profile: EcosystemProfile
}

function AvailabilityBadge({ status }: { status: EcosystemAvailability }) {
  const cfg = {
    'Public':         { cls: 'bg-green-50 text-green-700 border-green-100',     Icon: Check,      label: 'Public' },
    'Partner-gated':  { cls: 'bg-amber-50 text-amber-800 border-amber-100',     Icon: Lock,       label: 'Partner-gated' },
    'Customer-only':  { cls: 'bg-amber-50 text-amber-800 border-amber-100',     Icon: Lock,       label: 'Customer-only' },
    'Not offered':    { cls: 'bg-red-50 text-red-700 border-red-100',           Icon: X,          label: 'Not offered' },
    'Unknown':        { cls: 'bg-brand-cream text-brand-dark/50 border-brand-cream', Icon: HelpCircle, label: 'Not stated' },
  }[status]
  const { Icon } = cfg
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-semibold border px-2 py-0.5 rounded-full shrink-0 ${cfg.cls}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  )
}

function SurfaceRow({ label, hint, field }: { label: string; hint?: string; field: EcosystemField }) {
  return (
    <div className="border border-brand-border bg-brand-surface rounded-lg p-3">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <div className="font-semibold text-sm text-brand-dark leading-tight">{label}</div>
          {hint && <div className="text-[11px] text-brand-dark/40 leading-snug mt-0.5">{hint}</div>}
        </div>
        <AvailabilityBadge status={field.status} />
      </div>
      {field.note && <p className="text-xs text-brand-dark/60 leading-relaxed mt-2">{field.note}</p>}
      {field.url && (
        <a
          href={field.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brand-terracotta hover:underline mt-2"
        >
          View <ExternalLink size={10} />
        </a>
      )}
    </div>
  )
}

export default function VendorEcosystem({ profile }: Props) {
  const m = profile.ownMarketplace
  const surfaces: { key: string; label: string; hint: string; field?: EcosystemField }[] = [
    { key: 'publicAPI',  label: 'Public API',          hint: 'Can outside developers call vendor APIs without a customer relationship?', field: profile.publicAPI },
    { key: 'apiDocs',    label: 'API documentation',   hint: 'Is API reference documentation publicly readable?', field: profile.apiDocs },
    { key: 'openAPISpec', label: 'OpenAPI / Swagger spec', hint: 'Machine-readable spec for code generation', field: profile.openAPISpec },
    { key: 'sandbox',    label: 'Developer sandbox',   hint: 'Test environment for partners and integrators', field: profile.sandbox },
  ]

  return (
    <div id="ecosystem" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
      <div className="flex items-center gap-2 mb-1">
        <Network size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Ecosystem Depth</span>
      </div>
      <p className="text-xs text-brand-dark/50 mb-5 leading-relaxed">
        Marketplace gravity, developer surface, and integration paths. A vendor with no public API and no marketplace forces you into a unified-API bridge (with a recurring per-employee cost) or a custom build.
      </p>

      {m && (
        <div className="bg-gradient-to-br from-brand-cream/60 to-brand-cream/20 border border-brand-cream rounded-lg p-4 mb-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-brand-dark/40 font-semibold mb-1 flex items-center gap-1.5">
                <Boxes size={11} /> Vendor's own marketplace
              </div>
              <div className="font-serif text-lg font-semibold text-brand-dark leading-tight">{m.name}</div>
              {m.partnerProgramName && (
                <div className="text-xs text-brand-dark/60 mt-1">{m.partnerProgramName}</div>
              )}
            </div>
            {m.appCount != null && (
              <div className="text-right shrink-0">
                <div className="font-serif text-3xl font-bold text-brand-dark leading-none tabular-nums">{m.appCount}</div>
                <div className="text-[10px] text-brand-dark/40 uppercase tracking-wide">apps listed</div>
              </div>
            )}
          </div>

          {m.highlightedCategories && m.highlightedCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {m.highlightedCategories.map(c => (
                <span key={c} className="text-xs bg-white/60 border border-brand-cream text-brand-dark/70 px-2.5 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          )}

          {m.note && <p className="text-xs text-brand-dark/60 leading-relaxed mt-3">{m.note}</p>}
          {m.appCountSource && (
            <p className="text-[11px] text-brand-dark/40 italic mt-1">Count source: {m.appCountSource}</p>
          )}
          {m.url && (
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-brand-terracotta hover:underline mt-2"
            >
              Visit marketplace <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}

      {!m && (
        <div className="bg-red-50/60 border border-red-100 rounded-lg p-4 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-red-700 uppercase tracking-wide font-semibold mb-1">
            <X size={12} /> No public marketplace
          </div>
          <p className="text-xs text-brand-dark/70 leading-relaxed">
            This vendor does not operate a public partner marketplace. Integrations must come through direct partnership, a unified-API bridge, or custom development.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {surfaces.filter(s => s.field).map(s => (
          <SurfaceRow key={s.key} label={s.label} hint={s.hint} field={s.field!} />
        ))}
      </div>

      {profile.unifiedAPIBridges && profile.unifiedAPIBridges.length > 0 && (
        <div className="mt-5 pt-4 border-t border-brand-cream">
          <div className="text-[11px] uppercase tracking-wider text-brand-dark/40 font-semibold mb-2">
            Unified-API bridges {!m && <span className="text-brand-dark/30 normal-case">(common path when there's no public API)</span>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.unifiedAPIBridges.map(b => (
              <span key={b} className="text-xs bg-brand-gold/10 border border-brand-gold/20 text-brand-dark/70 px-2.5 py-1 rounded-lg font-medium">{b}</span>
            ))}
          </div>
        </div>
      )}

      {profile.notes && profile.notes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-brand-cream">
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
        Sources: vendor's own marketplace and partner pages, vendor developer documentation, and (for app counts) third-party marketplace aggregators where the vendor doesn't publish a canonical number. Verified {profile.verifiedDate}.
      </p>
    </div>
  )
}
