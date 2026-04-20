import type { AtsConnector, NormalizedJob, VendorAtsRef } from './types.js'
import { classifyEmploymentType, classifyRemote, classifySeniority } from './seniority.js'

// Lever Postings API — public, no auth.
// https://help.lever.co/hc/en-us/articles/360042605974-Lever-s-Postings-API
//   GET https://api.lever.co/v0/postings/{site}?mode=json
type LvJob = {
  id: string
  text: string
  hostedUrl: string
  applyUrl?: string
  createdAt?: number // ms since epoch
  categories?: { team?: string; department?: string; location?: string; commitment?: string }
  descriptionPlain?: string
  description?: string // HTML
  workplaceType?: string // 'remote' | 'hybrid' | 'on-site'
}

export const lever: AtsConnector = {
  source: 'lever',
  async fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
    const url = `https://api.lever.co/v0/postings/${encodeURIComponent(ref.handle)}?mode=json`
    const res = await fetch(url, { headers: { 'user-agent': 'ilovethewrap-jobs-bot/1.0' } })
    if (!res.ok) throw new Error(`lever ${ref.handle} → ${res.status}`)
    const data = (await res.json()) as LvJob[]
    return (data ?? []).map((j): NormalizedJob => {
      const location = j.categories?.location ?? null
      const department = j.categories?.department ?? j.categories?.team ?? null
      const workplace = (j.workplaceType ?? '').toLowerCase()
      let remote = classifyRemote(location, j.text)
      if (workplace.includes('remote')) remote = 'remote'
      else if (workplace.includes('hybrid')) remote = 'hybrid'
      else if (workplace.includes('on-site') || workplace.includes('onsite')) remote = 'onsite'
      return {
        external_id: j.id,
        vendor_slug: ref.vendor_slug,
        ats_source: 'lever',
        title: j.text,
        department,
        location,
        remote,
        employment_type: classifyEmploymentType(j.categories?.commitment),
        seniority: classifySeniority(j.text),
        url: j.hostedUrl,
        description_html: j.description ?? null,
        posted_at: j.createdAt ? new Date(j.createdAt).toISOString() : null,
      }
    })
  },
}
