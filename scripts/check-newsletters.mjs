#!/usr/bin/env node
// Fails the build if the newest entry in src/data/newsletters.ts cannot be
// extracted cleanly. Runs as part of `npm run build` and in CI on any PR that
// touches newsletters.ts.
//
// The failure this guards against is silent: a field placed after `body` makes
// the send pipeline append the previous edition to the outgoing email, and
// every other check in the repo still passes. See scripts/lib/latest-newsletter.mjs.

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readLatestNewsletter } from './lib/latest-newsletter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

try {
  const n = readLatestNewsletter(resolve(root, 'src/data/newsletters.ts'))
  const imgs = (n.body.match(/<img\s/g) || []).length
  const folder = n.body.match(/\/newsletters\/([^/"'\s)]+)\//)?.[1] ?? '—'
  console.log(
    `✅ newsletters.ts: "${n.title}" (${n.slug}), ${n.date} — ` +
    `${n.body.length.toLocaleString()} chars, ${imgs} images, assets in ${folder}`
  )
} catch (err) {
  console.error('\n❌ newsletters.ts failed validation\n')
  console.error(err.message)
  console.error('')
  process.exit(1)
}
