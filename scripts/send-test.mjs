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
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readLatestNewsletter } from './lib/latest-newsletter.mjs'

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

// ---------- read latest newsletter (shared with deploy.mjs and send-latest.mjs) ----------
let slug, title, body
try {
  ;({ slug, title, body } = readLatestNewsletter(resolve(root, 'src/data/newsletters.ts')))
} catch (err) {
  console.error(`❌  ${err.message}`)
  process.exit(1)
}

console.log(`📰  Latest newsletter: "${title}" (${slug}) — ${body.length.toLocaleString()} chars`)
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
// Read body as text first, then try to parse JSON — you can't read a response
// body twice, so the old `res.json().catch(res.text)` pattern was broken.
const text = await res.text()
let result; try { result = JSON.parse(text) } catch { result = text }
if (!res.ok) {
  console.error(`❌  ${res.status} ${res.statusText}:`, result)
  process.exit(1)
}
console.log('✓ ', typeof result === 'string' ? result : JSON.stringify(result, null, 2))
