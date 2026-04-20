import type { AtsConnector, NormalizedJob, VendorAtsRef } from './types.js'
import { classifyEmploymentType, classifyRemote, classifySeniority } from './seniority.js'

// Ashby Job Board API — public, no auth.
// https://developers.ashbyhq.com/reference/publicjobpostingslist
//   GET https://api.ashbyhq.com/posting-api/job-board/{boardName}?includeCompensation=true
type AshbyJob = {
  id: string
  title: string
  locationName?: string
  secondaryLocations?: { locationName?: string }[]
  employmentType?: string
  isRemote?: boolean
  isListed?: boolean
  publishedDate?: string
  updatedAt?: string
  jobUrl?: string
  applyUrl?: string
  departmentName?: string
  teamName?: string
  descriptionHtml?: string
}

export const ashby: AtsConnector = {
  source: 'ashby',
  async fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
    const url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(ref.handle)}?includeCompensation=true`
    const res = await fetch(url, { headers: { 'user-agent': 'ilovethewrap-jobs-bot/1.0' } })
    if (!res.ok) throw new Error(`ashby ${ref.handle} → ${res.status}`)
    const data = (await res.json()) as { jobs?: AshbyJob[] }
    return (data.jobs ?? []).filter(j => j.isListed !== false).map((j): NormalizedJob => {
      const location = j.locationName ?? j.secondaryLocations?.[0]?.locationName ?? null
      const department = j.departmentName ?? j.teamName ?? null
      const remote = j.isRemote ? 'remote' : classifyRemote(location, j.title)
      return {
        external_id: j.id,
        vendor_slug: ref.vendor_slug,
        ats_source: 'ashby',
        title: j.title,
        department,
        location,
        remote,
        employment_type: classifyEmploymentType(j.employmentType),
        seniority: classifySeniority(j.title),
        url: j.jobUrl ?? j.applyUrl ?? '',
        description_html: j.descriptionHtml ?? null,
        posted_at: j.publishedDate ?? j.updatedAt ?? null,
      }
    })
  },
}
