#!/usr/bin/env node
// Daily ingest runner — intended to run from GitHub Actions.
//
// Reads src/data/vendorAts.ts, fetches jobs via each vendor's ATS connector,
// and POSTs batches to {SITE_URL}/api/jobs/ingest (authed by JOBS_INGEST_TOKEN).
//
// Env:
//   SITE_URL               e.g. https://ilovethewrap.com  (or http://127.0.0.1:8788 for local dev)
//   JOBS_INGEST_TOKEN      shared secret, must match Cloudflare env var
//
// Local test: `npx wrangler pages dev dist` in one terminal, then:
//   SITE_URL=http://127.0.0.1:8788 JOBS_INGEST_TOKEN=... node scripts/ingest-run.mjs

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Use tsx at runtime so we can import the .ts ATS connectors without a build step.
// The GHA workflow installs tsx; locally, run under `npx tsx scripts/ingest-run.mjs`.
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const SITE_URL          = process.env.SITE_URL?.replace(/\/$/, '')
const JOBS_INGEST_TOKEN = process.env.JOBS_INGEST_TOKEN
if (!SITE_URL)          { console.error('SITE_URL env required'); process.exit(1) }
if (!JOBS_INGEST_TOKEN) { console.error('JOBS_INGEST_TOKEN env required'); process.exit(1) }

// Smaller batches avoid Pages Function CPU / payload limits when Greenhouse
// descriptions are large and FTS triggers amplify writes on re-ingest.
const BATCH_SIZE = 25
const run_id = `run_${Date.now()}`
const started_at = new Date().toISOString()

// ---------- load vendor-ATS mapping from TS file (no bundler) ----------
function loadVendorAts() {
  const src = readFileSync(path.join(ROOT, 'src/data/vendorAts.ts'), 'utf8')
  // Anchor on `= [` to skip past the `VendorAtsMapping[]` type annotation.
  const eq = src.indexOf('= [')
  if (eq < 0) throw new Error('vendorAts.ts: could not find "= [" (assignment)')
  const start = src.indexOf('[', eq)
  let depth = 0, end = start
  for (let i = start; i < src.length; i++) {
    const ch = src[i]
    if (ch === '[') depth++
    else if (ch === ']') { depth--; if (depth === 0) { end = i; break } }
  }
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${src.slice(start, end + 1)});`)()
}

// ---------- dynamically import connectors (they're .ts; we rely on tsx) ----------
async function loadConnectors() {
  const mod = await import(path.join(ROOT, 'scripts/ats/index.ts').replace(/\\/g, '/'))
  return mod.connectors
}

async function post(body) {
  const payload = JSON.stringify(body)
  // Retry once on 5xx — Cloudflare Workers occasionally throw transient
  // exceptions under CPU pressure. A single backoff usually clears it.
  let lastErr
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 2000))
    const r = await fetch(`${SITE_URL}/api/jobs/ingest`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${JOBS_INGEST_TOKEN}`,
      },
      body: payload,
    })
    if (r.ok) return r.json()
    const text = await r.text().catch(() => '')
    lastErr = new Error(`ingest ${r.status}: ${text.slice(0, 500)}`)
    // Only retry server errors; 4xx means the payload is wrong and won't improve.
    if (r.status < 500) break
    console.log(`  ! ingest ${r.status}, retrying in 2s...`)
  }
  throw lastErr
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function main() {
  console.log(`[${new Date().toISOString()}] ingest run_id=${run_id}`)
  const mapping = loadVendorAts().filter(v => v.ats !== 'unknown' && v.handle)
  console.log(`loading ${mapping.length} vendor(s)`)
  const connectors = await loadConnectors()

  let totalJobs = 0
  let vendorOk = 0, vendorErr = 0
  const vendorsInRun = []
  const pendingJobs = []

  // First batch carries the vendor_ats upsert payload.
  const vendor_ats = mapping.map(v => ({
    vendor_slug: v.slug, vendor_name: v.name, ats: v.ats, handle: v.handle, careers_url: v.careers_url,
  }))

  // Fetch vendor by vendor — batches of 4 in parallel, then queue into the upsert pipe.
  const mapBatched = async (items, size, fn) => {
    for (let i = 0; i < items.length; i += size) {
      await Promise.all(items.slice(i, i + size).map(fn))
    }
  }

  await mapBatched(mapping, 4, async (v) => {
    const ref = { vendor_slug: v.slug, vendor_name: v.name, ats: v.ats, handle: v.handle }
    try {
      const jobs = await connectors[v.ats].fetchJobs(ref)
      pendingJobs.push(...jobs)
      vendorsInRun.push(v.slug)
      vendorOk++
      console.log(`  ✓ ${v.slug.padEnd(28)} ${jobs.length} jobs`)
    } catch (e) {
      vendorErr++
      console.log(`  ✗ ${v.slug.padEnd(28)} ${String(e).slice(0, 120)}`)
    }
  })

  console.log(`\nposting ${pendingJobs.length} jobs in chunks of ${BATCH_SIZE}`)
  const batches = chunk(pendingJobs, BATCH_SIZE)
  for (let i = 0; i < batches.length; i++) {
    const payload = {
      action: 'upsert_batch',
      run_id,
      jobs: batches[i],
    }
    // Include vendor_ats on the first batch only.
    if (i === 0) payload.vendor_ats = vendor_ats
    const r = await post(payload)
    totalJobs += r.upserted ?? 0
    console.log(`  batch ${i + 1}/${batches.length} upserted=${r.upserted}`)
  }

  // Finalize: close jobs we didn't see this run.
  if (vendorsInRun.length) {
    const f = await post({
      action: 'finalize',
      run_id,
      started_at,
      vendor_slugs: vendorsInRun,
    })
    console.log(`finalize: closed ${f.closed} stale jobs`)
  }

  console.log(`\ndone. vendors ok=${vendorOk} err=${vendorErr} jobs_upserted=${totalJobs}`)
}

main().catch(e => { console.error(e); process.exit(1) })
