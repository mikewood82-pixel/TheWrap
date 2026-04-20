import type { AtsConnector, NormalizedJob, VendorAtsRef } from './types.js'
import { classifyEmploymentType, classifyRemote, classifySeniority } from './seniority.js'

// Greenhouse Job Board API — public, no auth.
// https://developers.greenhouse.io/job-board.html
//   GET https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs?content=true
type GhJob = {
  id: number
  title: string
  updated_at?: string
  absolute_url: string
  location?: { name?: string }
  departments?: { name?: string }[]
  offices?: { name?: string; location?: string }[]
  content?: string // HTML-encoded
  metadata?: { name: string; value: string | null }[]
}

export const greenhouse: AtsConnector = {
  source: 'greenhouse',
  async fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
    const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(ref.handle)}/jobs?content=true`
    const res = await fetch(url, { headers: { 'user-agent': 'ilovethewrap-jobs-bot/1.0' } })
    if (!res.ok) throw new Error(`greenhouse ${ref.handle} → ${res.status}`)
    const data = (await res.json()) as { jobs: GhJob[] }
    return (data.jobs ?? []).map((j): NormalizedJob => {
      const location = j.location?.name ?? j.offices?.[0]?.name ?? null
      const department = j.departments?.[0]?.name ?? null
      // Content is HTML-entity-encoded per GH spec. Decode the outer layer.
      const description_html = j.content ? decodeHtml(j.content) : null
      const empMeta = j.metadata?.find(m => /employment\s*type/i.test(m.name))?.value ?? null
      return {
        external_id: String(j.id),
        vendor_slug: ref.vendor_slug,
        ats_source: 'greenhouse',
        title: j.title,
        department,
        location,
        remote: classifyRemote(location, j.title),
        employment_type: classifyEmploymentType(empMeta),
        seniority: classifySeniority(j.title),
        url: j.absolute_url,
        description_html,
        posted_at: j.updated_at ?? null,
      }
    })
  },
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
}
