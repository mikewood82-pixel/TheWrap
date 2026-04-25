import './load-env.mjs'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const mode = process.argv[2] === '--go' ? 'go' : 'dry'

const DEPLOY_SECRET = process.env.DEPLOY_SECRET
const SITE_URL = process.env.SITE_URL ?? 'https://ilovethewrap.com'

const source = readFileSync(resolve(root, 'src/data/newsletters.ts'), 'utf-8')
const firstEntryMatch = source.match(/newsletters:\s*Newsletter\[\]\s*=\s*\[\s*\{([\s\S]*?)\n  \},/)
const entry = firstEntryMatch[1]
const slug  = entry.match(/slug:\s*['"`]([^'"`]+)['"`]/)?.[1]
const title = entry.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1]
const bodyMatch = source.match(/body:\s*`([\s\S]*?)`\s*,?\s*\n  \},/)
const body = bodyMatch?.[1]?.trim()

console.log(`${mode === 'go' ? '🚀 REAL SEND' : '🧪 DRY RUN'}: "${title}" (${slug})`)

const url = `${SITE_URL}/api/resume-send${mode === 'go' ? '?go=1' : ''}`
const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-deploy-secret': DEPLOY_SECRET },
  body: JSON.stringify({ slug, subject: title, html: body }),
})

console.log(res.status)
const text = await res.text()
try {
  console.log(JSON.stringify(JSON.parse(text), null, 2))
} catch {
  console.log(text)
}
if (!res.ok) process.exit(1)
