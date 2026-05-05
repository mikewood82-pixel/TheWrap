import { Sparkles, ExternalLink, Check, X, AlertTriangle, HelpCircle, MinusCircle, ShieldOff, ShieldCheck } from 'lucide-react'
import type { AIGovernanceProfile, AIGovernanceField, AIGovernanceStatus, AIDataTrainingPosture } from '../data/vendorProfiles'

interface Props {
  profile: AIGovernanceProfile
}

function StatusBadge({ status }: { status: AIGovernanceStatus }) {
  const cfg = {
    'Yes':     { cls: 'bg-green-50 text-green-700 border-green-100',     Icon: Check,       label: 'Yes' },
    'No':      { cls: 'bg-red-50 text-red-700 border-red-100',           Icon: X,           label: 'No' },
    'Partial': { cls: 'bg-amber-50 text-amber-800 border-amber-100',     Icon: AlertTriangle, label: 'Partial' },
    'N/A':     { cls: 'bg-brand-cream text-brand-dark/50 border-brand-cream', Icon: MinusCircle,  label: 'N/A' },
    'Unknown': { cls: 'bg-brand-cream text-brand-dark/50 border-brand-cream', Icon: HelpCircle,   label: 'Not stated' },
  }[status]
  const { Icon } = cfg
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-semibold border px-2 py-0.5 rounded-full shrink-0 ${cfg.cls}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  )
}

function PostureBadge({ posture }: { posture: AIDataTrainingPosture }) {
  const cfg = {
    'Never':           { cls: 'bg-green-50 text-green-700 border-green-100',     Icon: ShieldCheck },
    'Opt-in':          { cls: 'bg-green-50 text-green-700 border-green-100',     Icon: Check },
    'Opt-out':         { cls: 'bg-amber-50 text-amber-800 border-amber-100',     Icon: AlertTriangle },
    'Yes by default':  { cls: 'bg-red-50 text-red-700 border-red-100',           Icon: ShieldOff },
    'Unclear':         { cls: 'bg-brand-cream text-brand-dark/50 border-brand-cream', Icon: HelpCircle },
  }[posture]
  const { Icon } = cfg
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-semibold border px-2 py-0.5 rounded-full shrink-0 ${cfg.cls}`}>
      <Icon size={10} /> {posture}
    </span>
  )
}

function GovernanceRow({ label, field, hint }: { label: string; field: AIGovernanceField; hint?: string }) {
  return (
    <div className="border border-brand-border bg-brand-surface rounded-lg p-4">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <div className="font-semibold text-sm text-brand-dark leading-tight">{label}</div>
          {hint && <div className="text-[11px] text-brand-dark/40 leading-snug mt-0.5">{hint}</div>}
        </div>
        <StatusBadge status={field.status} />
      </div>
      {field.note && (
        <p className="text-xs text-brand-dark/60 leading-relaxed mt-2">{field.note}</p>
      )}
      {field.url && (
        <a
          href={field.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brand-terracotta hover:underline mt-2"
        >
          Source <ExternalLink size={10} />
        </a>
      )}
    </div>
  )
}

export default function VendorAIGovernance({ profile }: Props) {
  // Buyer signal score: simple count of "Yes" answers across the seven main
  // posture questions. Surfaced as a quick-glance number, not a grade.
  const fields: AIGovernanceField[] = [
    profile.acceptableUsePolicy,
    profile.modelCards,
    profile.nistAIRMF,
    profile.iso42001,
    profile.euAIAct,
    profile.nycLL144,
    profile.subprocessors,
  ]
  const yesCount = fields.filter(f => f.status === 'Yes').length
  const partialCount = fields.filter(f => f.status === 'Partial').length

  return (
    <div id="ai-governance" className="bg-white border border-brand-cream rounded-xl p-6 mb-6 scroll-mt-24">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={13} className="text-brand-dark/40" />
        <span className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">AI Governance Posture</span>
        <span className="ml-auto text-xs text-brand-dark/50 tabular-nums">
          <span className="font-semibold text-brand-dark">{yesCount}</span> of {fields.length} stated
          {partialCount > 0 && <span className="text-amber-700"> · {partialCount} partial</span>}
        </span>
      </div>
      <p className="text-xs text-brand-dark/50 mb-5 leading-relaxed">
        Public, vendor-stated answers to the seven AI questions HR Legal and InfoSec are asking in 2026 RFPs. "Not stated" is its own signal — it means the vendor has not taken a public position.
      </p>

      {/* Customer data training posture is the headline question. Pulled out
          on its own because it shows up in every contract redline. */}
      <div className="bg-gradient-to-br from-brand-cream/60 to-brand-cream/20 border border-brand-cream rounded-lg p-4 mb-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-brand-dark/40 font-semibold mb-1">Customer data used for AI training</div>
            <div className="font-serif text-lg font-semibold text-brand-dark leading-tight">
              {profile.customerDataTraining.posture}
            </div>
          </div>
          <PostureBadge posture={profile.customerDataTraining.posture} />
        </div>
        {profile.customerDataTraining.note && (
          <p className="text-xs text-brand-dark/60 leading-relaxed mt-2">{profile.customerDataTraining.note}</p>
        )}
        {profile.customerDataTraining.url && (
          <a
            href={profile.customerDataTraining.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-terracotta hover:underline mt-2"
          >
            Source <ExternalLink size={10} />
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <GovernanceRow
          label="Responsible AI policy"
          hint="Vendor publishes a public AI use policy or principles"
          field={profile.acceptableUsePolicy}
        />
        <GovernanceRow
          label="Model fact sheets / cards"
          hint="Per-model documentation of intended use, training data, limits"
          field={profile.modelCards}
        />
        <GovernanceRow
          label="NIST AI RMF alignment"
          hint="Voluntary US framework for AI risk management"
          field={profile.nistAIRMF}
        />
        <GovernanceRow
          label="ISO 42001 (AI Management)"
          hint="International AI Management System standard"
          field={profile.iso42001}
        />
        <GovernanceRow
          label="EU AI Act readiness"
          hint="Public statement on Act compliance posture"
          field={profile.euAIAct}
        />
        <GovernanceRow
          label="NYC LL 144 bias audit"
          hint="Required for AEDTs used in NYC hiring decisions"
          field={profile.nycLL144}
        />
        <GovernanceRow
          label="Sub-processors list"
          hint="Public, dated list of downstream processors"
          field={profile.subprocessors}
        />
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
        Sources: vendor-published Responsible AI pages, trust centers, and policy commentary. Verified {profile.verifiedDate}. "Not stated" reflects an editorial finding that the position was not located on the vendor's public site at verification time.
      </p>
    </div>
  )
}
