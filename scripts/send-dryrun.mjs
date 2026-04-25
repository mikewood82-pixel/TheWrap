import './load-env.mjs'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const to = process.argv[2]
if (!to) {
  console.error('Usage: node scripts/send-dryrun.mjs <email>')
  process.exit(1)
}

const DEPLOY_SECRET = process.env.DEPLOY_SECRET
if (!DEPLOY_SECRET) {
  console.error('DEPLOY_SECRET not set')
  process.exit(1)
}
const SITE_URL = process.env.SITE_URL ?? 'https://ilovethewrap.com'

const source = readFileSync(resolve(root, 'src/data/newsletters.ts'), 'utf-8')
const firstEntryMatch = source.match(/newsletters:\s*Newsletter\[\]\s*=\s*\[\s*\{([\s\S]*?)\n  \},/)
const entry = firstEntryMatch[1]
const slug  = entry.match(/slug:\s*['"`]([^'"`]+)['"`]/)?.[1]
const title = entry.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1]
const bodyMatch = source.match(/body:\s*`([\s\S]*?)`\s*,?\s*\n  \},/)
const body = bodyMatch?.[1]?.trim()

console.log(`Dry-run: "${title}" (${slug}) → ${to}`)

const res = await fetch(`${SITE_URL}/api/send-newsletter?dry_run_to=${encodeURIComponent(to)}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-deploy-secret': DEPLOY_SECRET },
  body: JSON.stringify({ slug, subject: title, html: body }),
})

const text = await res.text()
console.log(res.status, text)
if (!res.ok) process.exit(1)
