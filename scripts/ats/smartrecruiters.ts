import type { AtsConnector, NormalizedJob, VendorAtsRef } from './types.js'
import { classifyEmploymentType, classifyRemote, classifySeniority } from './seniority.js'

// SmartRecruiters — public Posting API.
// https://developers.smartrecruiters.com/docs/posting-api
//   GET https://api.smartrecruiters.com/v1/companies/{company}/postings?limit=100&offset={n}
type SrListItem = {
  id: string
  name: string
  ref?: string
  releasedDate?: string
  location?: { city?: string; region?: string; country?: string; remote?: boolean }
  department?: { label?: string }
  industry?: { label?: string }
  function?: { label?: string }
  typeOfEmployment?: { label?: string }
}

type SrDetail = SrListItem & {
  jobAd?: { sections?: { jobDescription?: { text?: string } } }
}

export const smartrecruiters: AtsConnector = {
  source: 'smartrecruiters',
  async fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
    const headers = { 'user-agent': 'ilovethewrap-jobs-bot/1.0' }
    const listUrl = `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(ref.handle)}/postings?limit=100`
    const res = await fetch(listUrl, { headers })
    if (!res.ok) throw new Error(`smartrecruiters ${ref.handle} → ${res.status}`)
    const data = (await res.json()) as { content?: SrListItem[] }
    const items = data.content ?? []
    // Optional: fetch detail for each to pull description_html. Do it in small parallel batches.
    const detailed = await mapBatched(items, 5, async (item) => {
      try {
        const d = await fetch(
          `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(ref.handle)}/postings/${encodeURIComponent(item.id)}`,
          { headers },
        )
        if (!d.ok) return item as SrDetail
        return (await d.json()) as SrDetail
      } catch {
        return item as SrDetail
      }
    })
    return detailed.map((j): NormalizedJob => {
      const cityRegion = [j.location?.city, j.location?.region, j.location?.country].filter(Boolean).join(', ')
      const location = cityRegion || null
      const remote = j.location?.remote ? 'remote' : classifyRemote(location, j.name)
      const description_html = j.jobAd?.sections?.jobDescription?.text ?? null
      return {
        external_id: j.id,
        vendor_slug: ref.vendor_slug,
        ats_source: 'smartrecruiters',
        title: j.name,
        department: j.department?.label ?? j.function?.label ?? null,
        location,
        remote,
        employment_type: classifyEmploymentType(j.typeOfEmployment?.label),
        seniority: classifySeniority(j.name),
        url: `https://jobs.smartrecruiters.com/${encodeURIComponent(ref.handle)}/${encodeURIComponent(j.id)}`,
        description_html,
        posted_at: j.releasedDate ?? null,
      }
    })
  },
}

async function mapBatched<I, O>(items: I[], size: number, fn: (i: I) => Promise<O>): Promise<O[]> {
  const out: O[] = []
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size)
    out.push(...await Promise.all(batch.map(fn)))
  }
  return out
}
