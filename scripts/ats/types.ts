// Shared types for ATS connectors. These run under Node (GHA + local scripts).

export type AtsSource =
  | 'greenhouse'
  | 'lever'
  | 'ashby'
  | 'smartrecruiters'
  | 'workable'
  | 'recruitee'

export type RemoteKind = 'remote' | 'hybrid' | 'onsite' | 'unknown'
export type Seniority = 'entry' | 'mid' | 'senior' | 'lead' | 'exec' | 'unknown'

export type NormalizedJob = {
  external_id: string
  vendor_slug: string
  ats_source: AtsSource
  title: string
  department: string | null
  location: string | null
  remote: RemoteKind
  employment_type: string | null
  seniority: Seniority
  url: string
  description_html: string | null
  posted_at: string | null // ISO string
}

export type VendorAtsRef = {
  vendor_slug: string
  vendor_name: string
  ats: AtsSource
  handle: string
}

export interface AtsConnector {
  source: AtsSource
  fetchJobs(ref: VendorAtsRef): Promise<NormalizedJob[]>
}
