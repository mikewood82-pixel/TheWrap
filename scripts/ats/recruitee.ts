import type { AtsConnector, NormalizedJob, VendorAtsRef } from './types.js'
import { classifyEmploymentType, classifyRemote, classifySeniority } from './seniority.js'

// Recruitee — public careers site JSON feed.
// Pattern: https://{handle}.recruitee.com/api/offers/
type RtJob = {
  id: number
  slug: string
  title: string
  description?: string
  requirements?: string
  department?: string
  employment_type_code?: string
  remote?: boolean
  hybrid?: boolean
  on_site?: boolean
  location?: string
  city?: string
  country?: string
  country_code?: string
  careers_url?: string
  careers_apply_url?: string
  published_at?: string
  created_at?: string
  status?: string
}

export const recruitee: AtsConnector = {
  source: 'recruitee',
  async fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
    const url = `https://${encodeURIComponent(ref.handle)}.recruitee.com/api/offers/`
    const res = await fetch(url, { headers: { 'user-agent': 'ilovethewrap-jobs-bot/1.0' } })
    if (!res.ok) throw new Error(`recruitee ${ref.handle} → ${res.status}`)
    const data = (await res.json()) as { offers?: RtJob[] }
    return (data.offers ?? []).filter(o => (o.status ?? 'published') === 'published').map((j): NormalizedJob => {
      const cityCountry = [j.city, j.country].filter(Boolean).join(', ')
      const location = cityCountry || j.location || null
      let remote = classifyRemote(location, j.title)
      if (j.remote) remote = 'remote'
      else if (j.hybrid) remote = 'hybrid'
      else if (j.on_site) remote = 'onsite'
      const description_html = [j.description, j.requirements].filter(Boolean).join('\n') || null
      return {
        external_id: String(j.id),
        vendor_slug: ref.vendor_slug,
        ats_source: 'recruitee',
        title: j.title,
        department: j.department ?? null,
        location,
        remote,
        employment_type: classifyEmploymentType(j.employment_type_code),
        seniority: classifySeniority(j.title),
        url: j.careers_url ?? j.careers_apply_url ?? `https://${ref.handle}.recruitee.com/o/${j.slug}`,
        description_html,
        posted_at: j.published_at ?? j.created_at ?? null,
      }
    })
  },
}
