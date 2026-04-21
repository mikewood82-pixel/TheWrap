// GET /api/jobs/search
//
// Query params (all optional):
//   q               FTS search over title + department + location + description_html
//   vendor          comma-separated vendor slugs
//   remote          comma-separated: remote,hybrid,onsite
//   seniority       comma-separated: entry,mid,senior,lead,exec
//   location        substring match on location (case-insensitive)
//   posted_since    integer days — e.g. 7 for "past week"
//   fresh_hours     integer hours — e.g. 24 for "added in the last 24h on OUR board".
//                   Filters on first_seen_at rather than posted_at so truly new
//                   arrivals don't get hidden by upstream-ATS publish dates.
//                   Backs the Wrap+ Early-bird feed on /jobs.
//   page            1-indexed, default 1
//   per_page        default 20, max 100
//   sort            posted_desc (default) | posted_asc

interface Env { JOBS_DB: D1Database }

type Row = {
  id: number
  vendor_slug: string
  vendor_name: string | null
  title: string
  department: string | null
  location: string | null
  remote: string
  seniority: string
  employment_type: string | null
  url: string
  posted_at: string | null
  first_seen_at: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const qs = url.searchParams

  const q = qs.get('q')?.trim() ?? ''
  const vendors    = splitCsv(qs.get('vendor'))
  const remote     = splitCsv(qs.get('remote'))
  const seniority  = splitCsv(qs.get('seniority'))
  const location   = qs.get('location')?.trim() ?? ''
  const postedSince = parseInt(qs.get('posted_since') ?? '', 10) || 0
  const freshHours = Math.max(0, parseInt(qs.get('fresh_hours') ?? '', 10) || 0)
  const sort = qs.get('sort') === 'posted_asc' ? 'ASC' : 'DESC'
  const page = Math.max(1, parseInt(qs.get('page') ?? '1', 10) || 1)
  const perPage = Math.min(100, Math.max(1, parseInt(qs.get('per_page') ?? '20', 10) || 20))
  const offset = (page - 1) * perPage

  const where: string[] = [`jobs.status = 'open'`]
  const binds: unknown[] = []

  if (q) {
    where.push(`jobs.id IN (SELECT rowid FROM jobs_fts WHERE jobs_fts MATCH ?)`)
    binds.push(buildFtsQuery(q))
  }
  if (vendors.length) {
    where.push(`jobs.vendor_slug IN (${vendors.map(() => '?').join(',')})`)
    binds.push(...vendors)
  }
  if (remote.length) {
    where.push(`jobs.remote IN (${remote.map(() => '?').join(',')})`)
    binds.push(...remote)
  }
  if (seniority.length) {
    where.push(`jobs.seniority IN (${seniority.map(() => '?').join(',')})`)
    binds.push(...seniority)
  }
  if (location) {
    where.push(`LOWER(jobs.location) LIKE ?`)
    binds.push(`%${location.toLowerCase()}%`)
  }
  if (postedSince > 0) {
    // Fall back to first_seen_at when the ATS doesn't provide posted_at —
    // matches the ORDER BY below so "past N days" doesn't silently drop
    // fresh ingests that happen to have no source-provided posted date.
    where.push(`COALESCE(jobs.posted_at, jobs.first_seen_at) >= datetime('now', ?)`)
    binds.push(`-${postedSince} days`)
  }
  if (freshHours > 0) {
    // first_seen_at is always set (DEFAULT datetime('now') on insert), so no
    // COALESCE needed here. Intentionally separate from posted_since: this is
    // "new on our board", not "recently posted by the ATS".
    where.push(`jobs.first_seen_at >= datetime('now', ?)`)
    binds.push(`-${freshHours} hours`)
  }

  const whereSql = `WHERE ${where.join(' AND ')}`
  const orderCol = 'COALESCE(jobs.posted_at, jobs.first_seen_at)'

  const countSql = `SELECT COUNT(*) AS n FROM jobs ${whereSql}`
  const pageSql = `
    SELECT jobs.id, jobs.vendor_slug, v.vendor_name, jobs.title, jobs.department,
           jobs.location, jobs.remote, jobs.seniority, jobs.employment_type,
           jobs.url, jobs.posted_at, jobs.first_seen_at
    FROM jobs
    LEFT JOIN vendor_ats v ON v.vendor_slug = jobs.vendor_slug
    ${whereSql}
    ORDER BY ${orderCol} ${sort}
    LIMIT ? OFFSET ?`

  const [{ results: countRows }, { results: pageRows }] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(countSql).bind(...binds),
    env.JOBS_DB.prepare(pageSql).bind(...binds, perPage, offset),
  ]) as unknown as [{ results: { n: number }[] }, { results: Row[] }]

  const total = countRows[0]?.n ?? 0
  return Response.json(
    { jobs: pageRows, total, page, per_page: perPage },
    { headers: { 'cache-control': 'public, max-age=60, s-maxage=60' } },
  )
}

function splitCsv(s: string | null): string[] {
  if (!s) return []
  return s.split(',').map(x => x.trim()).filter(Boolean)
}

// FTS5 is sensitive to punctuation. Strip to alphanumerics + spaces, then AND the
// tokens together as prefix matches. e.g. "senior product manager" → "senior* AND product* AND manager*"
function buildFtsQuery(raw: string): string {
  const tokens = raw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
  if (!tokens.length) return '""'
  return tokens.map(t => `${t}*`).join(' AND ')
}
