// Generates public/sitemap.xml from src/data/newsletters.ts + src/data/archive.ts
// so the sitemap can never drift out of sync with published content.
//
// Run: node scripts/generate-sitemap.mjs
// Wired into `npm run build` (see package.json).

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE = 'https://ilovethewrap.com'

const STATIC_ROUTES = [
  { path: '/',             changefreq: 'weekly',  priority: 1.0 },
  { path: '/newsletter',   changefreq: 'weekly',  priority: 0.9 },
  { path: '/jobs',         changefreq: 'daily',   priority: 0.8 },
  { path: '/labor-market', changefreq: 'weekly',  priority: 0.7 },
  { path: '/show',         changefreq: 'monthly', priority: 0.7 },
  { path: '/events',       changefreq: 'monthly', priority: 0.6 },
  { path: '/sponsorship',  changefreq: 'monthly', priority: 0.6 },
  { path: '/about',        changefreq: 'monthly', priority: 0.6 },
  { path: '/referral',     changefreq: 'monthly', priority: 0.4 },
]

// Parse `slug: '…'` + `date: '…'` pairs from a TS data file.
// The data files are flat object literals with fixed key order
// (slug first, date second per the Newsletter interface), so we can
// pair them up positionally rather than building a real TS parser.
function parseEditions(filePath) {
  const src = readFileSync(filePath, 'utf-8')
  const slugs = [...src.matchAll(/^\s*slug:\s*['"]([^'"]+)['"]/gm)].map(m => m[1])
  const dates = [...src.matchAll(/^\s*date:\s*['"]([^'"]+)['"]/gm)].map(m => m[1])
  if (slugs.length !== dates.length) {
    throw new Error(
      `Slug/date count mismatch in ${filePath}: ${slugs.length} slugs vs ${dates.length} dates`,
    )
  }
  return slugs.map((slug, i) => ({ slug, date: dates[i] }))
}

// "May 8, 2026" → "2026-05-08"
function toISO(humanDate) {
  const d = new Date(humanDate)
  if (Number.isNaN(d.getTime())) {
    console.warn(`⚠ unparseable date: "${humanDate}" — omitting lastmod`)
    return null
  }
  return d.toISOString().slice(0, 10)
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [`  <url>`, `    <loc>${xmlEscape(loc)}</loc>`]
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`)
  if (priority != null) parts.push(`    <priority>${priority.toFixed(1)}</priority>`)
  parts.push(`  </url>`)
  return parts.join('\n')
}

const buildDate = new Date().toISOString().slice(0, 10)

const newsletters = parseEditions(join(ROOT, 'src/data/newsletters.ts'))
const archive     = parseEditions(join(ROOT, 'src/data/archive.ts'))

// Dedupe by slug in case the same slug appears in both files.
const editionMap = new Map()
for (const e of [...newsletters, ...archive]) {
  if (!editionMap.has(e.slug)) editionMap.set(e.slug, e)
}

const staticEntries = STATIC_ROUTES.map(r => ({
  loc: SITE + r.path,
  lastmod: buildDate,
  changefreq: r.changefreq,
  priority: r.priority,
}))

const editionEntries = [...editionMap.values()].map(e => ({
  loc: `${SITE}/newsletter/${e.slug}`,
  lastmod: toISO(e.date),
  changefreq: 'monthly',
  priority: 0.8,
}))

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [...staticEntries, ...editionEntries].map(urlEntry).join('\n') +
  `\n</urlset>\n`

const outPath = join(ROOT, 'public/sitemap.xml')
writeFileSync(outPath, xml)

console.log(
  `✅ sitemap.xml written: ${staticEntries.length} static + ${editionEntries.length} editions ` +
  `(${newsletters.length} from newsletters.ts, ${archive.length} from archive.ts)`,
)
