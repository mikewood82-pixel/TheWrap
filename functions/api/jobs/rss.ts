// GET /api/jobs/rss — RSS 2.0 feed of the 50 most recent open jobs.
// Supports the same filters as /api/jobs/search so readers can subscribe to,
// e.g. "Remote Senior PM" by saving the filtered URL.

interface Env { JOBS_DB: D1Database }

const SITE = 'https://ilovethewrap.com'

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const qs = url.searchParams
  const vendors   = (qs.get('vendor')    ?? '').split(',').filter(Boolean)
  const remote    = (qs.get('remote')    ?? '').split(',').filter(Boolean)
  const seniority = (qs.get('seniority') ?? '').split(',').filter(Boolean)
  const where: string[] = [`jobs.status = 'open'`]
  const binds: unknown[] = []
  if (vendors.length)   { where.push(`jobs.vendor_slug IN (${vendors.map(()=>'?').join(',')})`);   binds.push(...vendors) }
  if (remote.length)    { where.push(`jobs.remote IN (${remote.map(()=>'?').join(',')})`);         binds.push(...remote) }
  if (seniority.length) { where.push(`jobs.seniority IN (${seniority.map(()=>'?').join(',')})`);   binds.push(...seniority) }

  const { results } = await env.JOBS_DB.prepare(
    `SELECT jobs.id, jobs.title, jobs.location, jobs.remote, jobs.posted_at,
            jobs.first_seen_at, v.vendor_name, jobs.vendor_slug
       FROM jobs
       LEFT JOIN vendor_ats v ON v.vendor_slug = jobs.vendor_slug
       WHERE ${where.join(' AND ')}
       ORDER BY COALESCE(jobs.posted_at, jobs.first_seen_at) DESC
       LIMIT 50`
  ).bind(...binds).all<{
    id: number; title: string; location: string | null; remote: string;
    posted_at: string | null; first_seen_at: string; vendor_name: string | null; vendor_slug: string
  }>()

  const rows = results ?? []
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>The Wrap — HR Tech Jobs</title>
  <link>${SITE}/jobs</link>
  <atom:link href="${SITE}/api/jobs/rss${url.search}" rel="self" type="application/rss+xml"/>
  <description>Open roles from ilovethewrap.com's tracked HR tech vendors.</description>
  <language>en-us</language>
${rows.map(r => {
  const pub = new Date(r.posted_at ?? r.first_seen_at).toUTCString()
  const loc = [r.location, r.remote === 'remote' ? 'Remote' : null].filter(Boolean).join(' · ')
  const at = r.vendor_name ? ` at ${r.vendor_name}` : ''
  const link = `${SITE}/jobs/${r.id}/${slug(r.title)}`
  return `  <item>
    <title>${esc(r.title)}${esc(at)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${pub}</pubDate>
    <description>${esc(loc || 'Location unlisted')}</description>
  </item>`
}).join('\n')}
</channel>
</rss>`

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
  })
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}
