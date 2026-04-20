import type { AtsConnector, NormalizedJob, VendorAtsRef } from './types.js'
import { classifyEmploymentType, classifyRemote, classifySeniority } from './seniority.js'

// Workable — public Jobs widget endpoint.
// Pattern: https://apply.workable.com/api/v1/widget/accounts/{handle}?limit=100&offset={n}
// Docs: https://workable.readme.io/reference (public widget is unauth)
type WkJob = {
  id: string
  shortcode: string
  title: string
  state?: string
  department?: string
  department_hierarchy?: string[]
  employment_type?: string
  location?: { city?: string; region?: string; country?: string; telecommuting?: boolean }
  workplace?: string
  published_on?: string
  created_at?: string
  url?: string
  application_url?: string
  description?: string
}

export const workable: AtsConnector = {
  source: 'workable',
  async fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
    const headers = { 'user-agent': 'ilovethewrap-jobs-bot/1.0', accept: 'application/json' }
    const all: WkJob[] = []
    let offset = 0
    const limit = 100
    for (let page = 0; page < 20; page++) {
      const url = `https://apply.workable.com/api/v1/widget/accounts/${encodeURIComponent(ref.handle)}?limit=${limit}&offset=${offset}`
      const res = await fetch(url, { headers })
      if (!res.ok) throw new Error(`workable ${ref.handle} → ${res.status}`)
      const data = (await res.json()) as { jobs?: WkJob[]; total?: number }
      const page_jobs = data.jobs ?? []
      all.push(...page_jobs)
      if (page_jobs.length < limit) break
      offset += limit
    }
    return all.filter(j => (j.state ?? 'published') === 'published').map((j): NormalizedJob => {
      const cityRegion = [j.location?.city, j.location?.region, j.location?.country].filter(Boolean).join(', ')
      const location = cityRegion || null
      const workplace = (j.workplace ?? '').toLowerCase()
      let remote = classifyRemote(location, j.title)
      if (j.location?.telecommuting || workplace === 'remote') remote = 'remote'
      else if (workplace === 'hybrid') remote = 'hybrid'
      else if (workplace === 'on_site' || workplace === 'onsite') remote = 'onsite'
      return {
        external_id: j.id,
        vendor_slug: ref.vendor_slug,
        ats_source: 'workable',
        title: j.title,
        department: j.department ?? j.department_hierarchy?.[0] ?? null,
        location,
        remote,
        employment_type: classifyEmploymentType(j.employment_type),
        seniority: classifySeniority(j.title),
        url: j.url ?? j.application_url ?? `https://apply.workable.com/${encodeURIComponent(ref.handle)}/j/${encodeURIComponent(j.shortcode)}/`,
        description_html: j.description ?? null,
        posted_at: j.published_on ?? j.created_at ?? null,
      }
    })
  },
}
