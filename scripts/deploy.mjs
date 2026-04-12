#!/usr/bin/env node
/**
 * The Wrap — deploy script
 *
 * Usage:
 *   npm run deploy          — build, deploy, and send the latest newsletter
 *   npm run deploy --no-send — build and deploy only, skip the email send
 *
 * The latest newsletter is always the first entry in src/data/newsletters.ts.
 * If it's already been sent (tracked in D1), the send step is skipped automatically.
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const skipSend = process.argv.includes('--no-send')

const DEPLOY_SECRET = '886ca2390c247983019eb931005595d59861c3603c63a6a45bfc2a7372014cbe'
const SITE_URL = 'https://ilovethewrap.com'

// ─── 1. Extract latest newsletter from source ─────────────────────────────────

console.log('\n📰  Reading latest newsletter...')

const source = readFileSync(resolve(root, 'src/data/newsletters.ts'), 'utf-8')

// Pull the first newsletter object out of the array
const firstEntryMatch = source.match(/newsletters:\s*Newsletter\[\]\s*=\s*\[\s*\{([\s\S]*?)\n  \},/)
if (!firstEntryMatch) {
  console.error('❌  Could not locate first newsletter entry in newsletters.ts')
  process.exit(1)
}

const entry = firstEntryMatch[1]

const slug  = entry.match(/slug:\s*['"`]([^'"`]+)['"`]/)?.[1]
const title = entry.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1]

// Body is a template literal — grab everything between the first ` after "body:" and the closing `
const bodyMatch = source.match(/body:\s*`([\s\S]*?)`\s*,?\s*\n  \},/)
const body = bodyMatch?.[1]?.trim()

if (!slug || !title || !body) {
  console.error('❌  Could not parse slug, title, or body from latest newsletter.')
  console.error('    slug:', slug, '| title:', title, '| body length:', body?.length)
  process.exit(1)
}

console.log(`    ✓ "${title}" (${slug})`)

// ─── 2. Build ─────────────────────────────────────────────────────────────────

console.log('\n🔨  Building...')
execSync('npm run build', { cwd: root, stdio: 'inherit' })

// ─── 3. Deploy ────────────────────────────────────────────────────────────────

console.log('\n🚀  Deploying to Cloudflare Pages...')
execSync('npx wrangler pages deploy dist --project-name thewrap --commit-dirty=true', {
  cwd: root,
  stdio: 'inherit',
})

// ─── 4. Send newsletter ───────────────────────────────────────────────────────

if (skipSend) {
  console.log('\n⏭   Skipping newsletter send (--no-send flag)')
  console.log('\n✅  Done.\n')
  process.exit(0)
}

console.log('\n📬  Triggering newsletter send...')

// Brief pause to let the deployment propagate
await new Promise(r => setTimeout(r, 5000))

const res = await fetch(`${SITE_URL}/api/send-newsletter`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-deploy-secret': DEPLOY_SECRET,
  },
  body: JSON.stringify({ slug, subject: title, html: body }),
})

const result = await res.json().catch(() => res.text())

if (!res.ok) {
  console.error('❌  Send failed:', result)
  process.exit(1)
}

if (result.skipped) {
  console.log(`    ⏭  Already sent — skipping. (${result.reason})`)
} else {
  console.log(`    ✓ Sent to ${result.sent} subscribers.`)
}

console.log('\n✅  Done.\n')
