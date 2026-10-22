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

import './load-env.mjs'
import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readLatestNewsletter } from './lib/latest-newsletter.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const skipSend = process.argv.includes('--no-send')

const DEPLOY_SECRET = process.env.DEPLOY_SECRET
if (!DEPLOY_SECRET) {
  console.error('❌  DEPLOY_SECRET is not set. Put it in .env (gitignored) or export it in your shell.')
  process.exit(1)
}
const SITE_URL = process.env.SITE_URL ?? 'https://ilovethewrap.com'

// ─── 1. Extract latest newsletter from source ─────────────────────────────────

console.log('\n📰  Reading latest newsletter...')

// Parsing and validation live in scripts/lib/latest-newsletter.mjs — shared with
// send-test.mjs and send-latest.mjs so the three cannot drift apart.
let slug, title, body
try {
  ;({ slug, title, body } = readLatestNewsletter(resolve(root, 'src/data/newsletters.ts')))
} catch (err) {
  console.error('❌ ', err.message)
  process.exit(1)
}

console.log(`    ✓ "${title}" (${slug}) — ${body.length.toLocaleString()} chars`)

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

const text = await res.text()
let result; try { result = JSON.parse(text) } catch { result = text }

if (!res.ok) {
  console.error('❌  Send failed:', res.status, result)
  process.exit(1)
}

if (result.skipped) {
  console.log(`    ⏭  Already sent — skipping. (${result.reason})`)
} else {
  console.log(`    ✓ Sent to ${result.sent} subscribers.`)
}

console.log('\n✅  Done.\n')
