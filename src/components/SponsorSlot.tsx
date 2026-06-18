import { ArrowRight } from 'lucide-react'
import type { Sponsor } from '../data/newsletters'

interface Props {
  sponsor: Sponsor
  /** Eyebrow label above the logo. Defaults to "This week's sponsor". */
  label?: string
  /** 'strip' = full bordered card (homepage); 'inline' = compact logo + name. */
  variant?: 'strip' | 'inline'
}

// Renders a paid sponsor on the website chrome (homepage + sponsorship page).
// NOTE: this does NOT drive the in-edition / email callout — the Friday email is
// built from the edition `body` HTML only (see scripts/deploy.mjs), so the
// in-edition sponsor block lives as inline HTML at the top of that edition's body
// (reference: docs/sponsors/perfecthire-edition-callout.html). rel="sponsored"
// is the correct signal for a paid outbound link.
export default function SponsorSlot({ sponsor, label = "This week's sponsor", variant = 'strip' }: Props) {
  if (variant === 'inline') {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener sponsored"
        className="inline-flex items-center gap-3 group"
        aria-label={`${label}: ${sponsor.name}`}
      >
        <img src={sponsor.logo} alt={sponsor.name} className="h-8 w-auto" />
        <span className="text-sm font-medium text-brand-muted group-hover:text-brand-dark transition-colors">
          {sponsor.name}
        </span>
      </a>
    )
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener sponsored"
      className="group flex flex-col sm:flex-row items-center gap-5 sm:gap-7 border border-brand-border bg-brand-cream rounded-2xl p-6 sm:p-7 hover:border-brand-terracotta/40 transition-colors"
    >
      <div className="shrink-0 flex flex-col items-center sm:items-start gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
          {label}
        </span>
        <img src={sponsor.logo} alt={sponsor.name} className="h-10 md:h-12 w-auto" />
      </div>
      <p className="flex-1 text-sm sm:text-base text-brand-dark/80 leading-relaxed text-center sm:text-left">
        {sponsor.blurb}
      </p>
      <span className="shrink-0 inline-flex items-center gap-1.5 bg-brand-terracotta text-white text-sm font-semibold px-5 py-2.5 rounded-lg group-hover:bg-brand-orange transition-colors whitespace-nowrap">
        {sponsor.cta ?? 'Learn more'}
        <ArrowRight size={15} />
      </span>
    </a>
  )
}
