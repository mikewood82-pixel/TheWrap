// SQL fragment that excludes "remote, outside US/Canada" jobs from a
// /api/jobs/search-style query. There's no normalized country column, so
// this is a curated blocklist matched against the free-text location string.
//
// Semantics: a row is excluded iff
//   remote = 'remote' AND lower(location) matches any blocked token.
// Bare "Remote", "Remote - US", "Remote, NY", and any onsite/hybrid job
// (regardless of country) all stay in. Audience-targeted: NA-readers
// shouldn't be flooded with "Remote, EMEA" / "Remote, India" postings.

const BLOCK_NAMES = [
  // Europe
  'united kingdom', 'england', 'scotland', 'wales', 'northern ireland',
  'germany', 'france', 'spain', 'italy', 'netherlands', 'belgium',
  'sweden', 'norway', 'denmark', 'finland', 'iceland',
  'poland', 'czech', 'austria', 'switzerland', 'ireland', 'portugal',
  'greece', 'hungary', 'romania', 'bulgaria', 'serbia', 'croatia',
  'ukraine', 'russia', 'estonia', 'latvia', 'lithuania', 'slovakia', 'slovenia',
  // Asia / APAC
  'india', 'singapore', 'japan', 'china', 'hong kong', 'taiwan',
  'south korea', 'korea', 'thailand', 'vietnam', 'indonesia',
  'philippines', 'malaysia', 'pakistan', 'bangladesh', 'sri lanka', 'nepal',
  'australia', 'new zealand',
  // Middle East / Africa
  'israel', 'turkey', 'united arab emirates', 'uae', 'dubai', 'abu dhabi',
  'saudi arabia', 'qatar', 'kuwait', 'bahrain', 'oman', 'jordan', 'lebanon',
  'south africa', 'kenya', 'nigeria', 'egypt', 'morocco', 'ghana',
  // Latin America (non-NA)
  'mexico', 'brazil', 'argentina', 'colombia', 'chile', 'peru',
  'uruguay', 'venezuela', 'ecuador', 'bolivia', 'paraguay',
  'costa rica', 'guatemala', 'panama', 'dominican republic',
  // Region tags
  'emea', 'apac', 'latam', 'mena', 'asean', 'european union',
]

// Trailing 2-letter country codes from ATS payloads like "Berlin, Berlin, DE"
// or "Bangalore, Karnataka, IN". Many of these collide with US state codes
// (DE/Delaware, IN/Indiana, IL/Illinois, MA/Massachusetts, ...), so we only
// match when the location has at least *2 prior commas* — i.e., the 3-segment
// "city, region, country" form. The US "Indianapolis, IN" 2-segment form
// stays. Excludes US/CA codes by construction.
const BLOCK_CODES = [
  'gb', 'de', 'fr', 'es', 'it', 'nl', 'be', 'se', 'no', 'dk', 'fi',
  'pl', 'cz', 'at', 'ch', 'ie', 'pt', 'gr', 'hu', 'ro', 'ua', 'ru',
  'in', 'sg', 'jp', 'cn', 'hk', 'tw', 'kr', 'th', 'vn', 'id',
  'ph', 'my', 'pk', 'bd', 'au', 'nz',
  'il', 'tr', 'ae', 'sa', 'qa', 'kw',
  'za', 'ke', 'ng', 'eg', 'ma',
  'mx', 'br', 'ar', 'co', 'cl', 'pe',
]

// Builds a SQL clause + bind list that, when AND'd into a WHERE, excludes
// remote jobs whose location matches any blocked token. Pass the table
// alias used in the host query (defaults to "jobs").
export function buildExcludeRemoteOutsideNaClause(
  alias: string = 'jobs',
): { clause: string; binds: string[] } {
  const binds: string[] = []
  const likes: string[] = []
  const col = `LOWER(${alias}.location)`

  // Boundary-aware name match: country/region tokens must appear after a
  // comma or dash, otherwise "india" false-matches "Indianapolis", "mexico"
  // false-matches "New Mexico", etc.
  for (const name of BLOCK_NAMES) {
    const n = name.trim()
    likes.push(`${col} LIKE ?`); binds.push(`%, ${n}`)
    likes.push(`${col} LIKE ?`); binds.push(`%, ${n},%`)
    likes.push(`${col} LIKE ?`); binds.push(`%- ${n}`)
    likes.push(`${col} LIKE ?`); binds.push(`%- ${n},%`)
  }
  for (const code of BLOCK_CODES) {
    likes.push(`${col} LIKE ?`); binds.push(`%, %, ${code}`)
    likes.push(`${col} LIKE ?`); binds.push(`%, %, ${code},%`)
  }

  const matchAny = `(${likes.join(' OR ')})`
  const clause = `NOT (${alias}.remote = 'remote' AND ${matchAny})`
  return { clause, binds }
}
