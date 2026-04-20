#!/usr/bin/env node
/**
 * Send a one-recipient test of the latest newsletter — no build, no deploy,
 * hits the live site. Uses the same `/api/send-newsletter` endpoint the deploy
 * script uses, but with `?dry_run_to=EMAIL` which:
 *   - skips the sent_newsletters idempotency check,
 *   - sends ONE email to the address you pass,
 *   - prefixes the subject with [TEST],
 *   - does NOT record the send.
 *
 * Usage:
 *   node scripts/send-test.mjs --to mike@ilovethewrap.com
 *
 * Env:
 *   DEPLOY_SECRET   required. If unset, the script will try to read the secret
 *                   from scripts/deploy.mjs as a convenience. Remove that
 *                   fallback once the secret moves out of source.
 *   SITE_URL        optional, defaults to https://ilovethewrap.com.
 */

import './load-env.mjs'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// ---------- args ----------
const args = process.argv.slice(2)
const toIdx = args.indexOf('--to')
const to = toIdx >= 0 ? args[toIdx + 1] : null
if (!to) {
  console.error('Usage: node scripts/send-test.mjs --to <email>')
  process.exit(1)
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
  console.error(`Invalid email: ${to}`)
  process.exit(1)
}

// ---------- secret ----------
const DEPLOY_SECRET = process.env.DEPLOY_SECRET
if (!DEPLOY_SECRET) {
  console.error('❌  DEPLOY_SECRET is not set. Put it in .env (gitignored) or export it in your shell.')
  process.exit(1)
}

const SITE_URL = (process.env.SITE_URL ?? 'https://ilovethewrap.com').replace(/\/$/, '')

// ---------- read latest newsletter (same pattern as deploy.mjs) ----------
const source = readFileSync(resolve(root, 'src/data/newsletters.ts'), 'utf8')
const first = source.match(/newsletters:\s*Newsletter\[\]\s*=\s*\[\s*\{([\s\S]*?)\n  \},/)
if (!first) { console.error('Could not locate first newsletter entry in newsletters.ts'); process.exit(1) }
const entry = first[1]
const slug = entry.match(/slug:\s*['"`]([^'"`]+)['"`]/)?.[1]
const title = entry.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1]
const body = source.match(/body:\s*`([\s\S]*?)`\s*,?\s*\n  \},/)?.[1]?.trim()
if (!slug || !title || !body) {
  console.error('Could not parse slug/title/body from latest newsletter.')
  process.exit(1)
}

console.log(`📰  Latest newsletter: "${title}" (${slug})`)
console.log(`📬  Sending test to: ${to}`)
console.log(`🌐  Site: ${SITE_URL}\n`)

// ---------- fire ----------
const res = await fetch(`${SITE_URL}/api/send-newsletter?dry_run_to=${encodeURIComponent(to)}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-deploy-secret': DEPLOY_SECRET,
  },
  body: JSON.stringify({ slug, subject: title, html: body }),
})
const result = await res.json().catch(() => res.text())
if (!res.ok) {
  console.error(`❌  ${res.status}:`, result)
  process.exit(1)
}
console.log('✓ ', JSON.stringify(result, null, 2))
