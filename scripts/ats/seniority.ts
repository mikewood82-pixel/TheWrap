import type { RemoteKind, Seniority } from './types.js'

// Regex patterns tuned for HR tech listings. Order matters — check exec first,
// then lead, senior, entry, otherwise mid.
const RX = {
  exec:   /\b(chief|c[eo]o|cfo|cpo|cmo|cto|cro|president|vp\b|vice\s+president|svp|evp|head\s+of)\b/i,
  lead:   /\b(director|principal|staff|lead|manager|mgr)\b/i,
  senior: /\b(senior|sr\.?|snr)\b/i,
  entry:  /\b(intern|internship|new\s+grad|graduate|entry[-\s]?level|junior|jr\.?|associate|apprentice)\b/i,
}

export function classifySeniority(title: string): Seniority {
  if (!title) return 'unknown'
  if (RX.exec.test(title))   return 'exec'
  if (RX.lead.test(title))   return 'lead'
  if (RX.senior.test(title)) return 'senior'
  if (RX.entry.test(title))  return 'entry'
  return 'mid'
}

const REMOTE_RX = /\b(remote|work\s+from\s+anywhere|distributed|wfh)\b/i
const HYBRID_RX = /\b(hybrid|flex\s+office|flexible\s+location)\b/i

export function classifyRemote(location: string | null, extra?: string | null): RemoteKind {
  const s = `${location ?? ''} ${extra ?? ''}`
  if (HYBRID_RX.test(s)) return 'hybrid'
  if (REMOTE_RX.test(s)) return 'remote'
  if (location && location.trim().length > 0) return 'onsite'
  return 'unknown'
}

export function classifyEmploymentType(raw: string | null | undefined): string | null {
  if (!raw) return null
  const s = raw.toLowerCase()
  if (/(full[-\s]?time|ft\b|permanent)/.test(s)) return 'full_time'
  if (/(part[-\s]?time|pt\b)/.test(s))            return 'part_time'
  if (/(contract|contractor|freelance|temporary|temp)/.test(s)) return 'contract'
  if (/(intern|internship)/.test(s))              return 'intern'
  return s
}
