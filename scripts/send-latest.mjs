#!/usr/bin/env node
/**
 * Send the latest newsletter to the full list. This is what
 * .github/workflows/send-newsletter.yml runs on a push to main that touches
 * src/data/newsletters.ts.
 *
 * It used to be a heredoc of inline node inside the workflow YAML, with its own
 * copy of the extraction regex — which is how edition #87 nearly went out with
 * edition #86 appended. Parsing now lives in lib/latest-newsletter.mjs, shared
 * with deploy.mjs and send-test.mjs, and validates before anything is sent.
 *
 * Env:
 *   DEPLOY_SECRET  required
 *   SITE_URL       optional, defaults to https://ilovethewrap.com
 *
 * Dependency-free on purpose: CI runs it straight from a checkout with no
 * `npm ci` step.
 */

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readLatestNewsletter } from './lib/latest-newsletter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const DEPLOY_SECRET = process.env.DEPLOY_SECRET
if (!DEPLOY_SECRET) {
  console.error('DEPLOY_SECRET is not set.')
  process.exit(1)
}
const SITE_URL = (process.env.SITE_URL ?? 'https://ilovethewrap.com').replace(/\/$/, '')

let slug, title, body
try {
  ;({ slug, title, body } = readLatestNewsletter(resolve(root, 'src/data/newsletters.ts')))
} catch (err) {
  console.error('Refusing to send — could not parse newsletters.ts cleanly.\n')
  console.error(err.message)
  process.exit(1)
}

const images = (body.match(/<img\s/g) || []).length
console.log(`Sending: ${title} (${slug})`)
console.log(`Body: ${body.length.toLocaleString()} chars, ${images} images`)

let res
try {
  res = await fetch(`${SITE_URL}/api/send-newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-deploy-secret': DEPLOY_SECRET,
    },
    body: JSON.stringify({ slug, subject: title, html: body }),
  })
} catch (err) {
  console.error('Send failed:', err)
  process.exit(1)
}

const text = await res.text()
let result
try { result = JSON.parse(text) } catch { result = text }

console.log('Result:', typeof result === 'string' ? result : JSON.stringify(result))

if (!res.ok) {
  console.error(`Send failed: ${res.status} ${res.statusText}`)
  process.exit(1)
}
if (result?.skipped) {
  console.log('Already sent — skipping.')
} else if (result?.sent !== undefined) {
  console.log(`Sent to ${result.sent} subscribers.`)
}
