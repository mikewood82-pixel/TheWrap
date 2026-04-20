#!/usr/bin/env node
// One-time (and occasional re-run) script: for each vendor in src/data/vendors.ts,
// probe their careers page + likely ATS endpoints to identify which ATS they use
// and what "handle" to query. Writes src/data/vendorAts.ts.
//
// Run: node scripts/discover-ats.mjs
// Run a single vendor: node scripts/discover-ats.mjs --only workday
//
// The script is deliberately conservative: it only records an ATS when a known
// public API endpoint actually returns a non-empty job list. Vendors that cannot
// be auto-resolved are written with ats="unknown" for manual review.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

// ---------- load vendors.ts without a bundler ----------
function loadVendors() {
  const src = readFileSync(path.join(ROOT, 'src/data/vendors.ts'), 'utf8')
  // Extract the rawVendors array literal by brace-matching.
  const start = src.indexOf('const rawVendors')
  const arrayStart = src.indexOf('[', start)
  let depth = 0
  let end = arrayStart
  for (let i = arrayStart; i < src.length; i++) {
    const ch = src[i]
    if (ch === '[') depth++
    else if (ch === ']') { depth--; if (depth === 0) { end = i; break } }
  }
  const literal = src.slice(arrayStart, end + 1)
  // Very small JS-literal eval: this file is authored by us, safe to Function().
  // Strip TS-only type annotations (there are none in rawVendors), keep as-is.
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)()
}

// ---------- probes ----------
const UA = { 'user-agent': 'ilovethewrap-ats-discovery/1.0' }

async function probeGreenhouse(handle) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${handle}/jobs`
  try {
    const r = await fetch(url, { headers: UA })
    if (!r.ok) return null
    const j = await r.json()
    return Array.isArray(j.jobs) ? { ats: 'greenhouse', handle, count: j.jobs.length } : null
  } catch { return null }
}
async function probeLever(handle) {
  const url = `https://api.lever.co/v0/postings/${handle}?mode=json`
  try {
    const r = await fetch(url, { headers: UA })
    if (!r.ok) return null
    const j = await r.json()
    return Array.isArray(j) ? { ats: 'lever', handle, count: j.length } : null
  } catch { return null }
}
async function probeAshby(handle) {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${handle}`
  try {
    const r = await fetch(url, { headers: UA })
    if (!r.ok) return null
    const j = await r.json()
    return Array.isArray(j?.jobs) ? { ats: 'ashby', handle, count: j.jobs.length } : null
  } catch { return null }
}
async function probeSmartRecruiters(handle) {
  const url = `https://api.smartrecruiters.com/v1/companies/${handle}/postings?limit=1`
  try {
    const r = await fetch(url, { headers: UA })
    if (!r.ok) return null
    const j = await r.json()
    return Array.isArray(j?.content) ? { ats: 'smartrecruiters', handle, count: j.content.length } : null
  } catch { return null }
}
async function probeWorkable(handle) {
  const url = `https://apply.workable.com/api/v1/widget/accounts/${handle}?limit=1`
  try {
    const r = await fetch(url, { headers: UA })
    if (!r.ok) return null
    const j = await r.json()
    return Array.isArray(j?.jobs) ? { ats: 'workable', handle, count: j.jobs.length } : null
  } catch { return null }
}
async function probeRecruitee(handle) {
  const url = `https://${handle}.recruitee.com/api/offers/`
  try {
    const r = await fetch(url, { headers: UA })
    if (!r.ok) return null
    const j = await r.json()
    return Array.isArray(j?.offers) ? { ats: 'recruitee', handle, count: j.offers.length } : null
  } catch { return null }
}

const PROBES = [probeGreenhouse, probeLever, probeAshby, probeSmartRecruiters, probeWorkable, probeRecruitee]

// Candidate "handles" to try for a given vendor. The API handles don't always
// match the domain exactly (e.g. "ceridian" vs "dayforce"), so we try a few.
function handleCandidates(vendor) {
  const base = new Set()
  base.add(vendor.slug)
  base.add(vendor.slug.replace(/-/g, ''))
  const domain = (vendor.website || '').split('/')[0].replace(/^www\./, '').split('.')[0]
  if (domain) {
    base.add(domain)
    base.add(domain.toLowerCase())
  }
  base.add(vendor.name.toLowerCase().replace(/[^a-z0-9]/g, ''))
  base.add(vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '-'))
  return [...base].filter(Boolean)
}

// Fetch the careers page and look for ATS fingerprints. A positive signal
// tells us which probe to try first.
async function sniffCareersPage(website) {
  if (!website) return []
  const candidates = [
    `https://${website}/careers`,
    `https://${website}/jobs`,
    `https://${website}/company/careers`,
    `https://careers.${website}`,
    `https://jobs.${website}`,
  ]
  const signals = []
  for (const url of candidates) {
    try {
      const r = await fetch(url, { headers: UA, redirect: 'follow' })
      if (!r.ok) continue
      const html = await r.text()
      if (/boards\.greenhouse\.io\/(embed\/job_board|[a-z0-9-]+)/i.test(html)) signals.push('greenhouse')
      if (/jobs\.lever\.co\//i.test(html))                                     signals.push('lever')
      if (/jobs\.ashbyhq\.com\//i.test(html))                                  signals.push('ashby')
      if (/jobs\.smartrecruiters\.com\//i.test(html))                          signals.push('smartrecruiters')
      if (/apply\.workable\.com\//i.test(html))                                signals.push('workable')
      if (/\.recruitee\.com\//i.test(html))                                    signals.push('recruitee')
      // Extract handle hints from embedded URLs
      const gh = html.match(/boards\.greenhouse\.io\/([a-z0-9-]+)/i)
      if (gh) signals.push(`greenhouse:${gh[1]}`)
      const lv = html.match(/jobs\.lever\.co\/([a-z0-9-]+)/i)
      if (lv) signals.push(`lever:${lv[1]}`)
      const ab = html.match(/jobs\.ashbyhq\.com\/([a-z0-9.-]+)/i)
      if (ab) signals.push(`ashby:${ab[1]}`)
      const sr = html.match(/jobs\.smartrecruiters\.com\/([a-z0-9-]+)/i)
      if (sr) signals.push(`smartrecruiters:${sr[1]}`)
      const wk = html.match(/apply\.workable\.com\/([a-z0-9-]+)/i)
      if (wk) signals.push(`workable:${wk[1]}`)
      const rt = html.match(/([a-z0-9-]+)\.recruitee\.com/i)
      if (rt) signals.push(`recruitee:${rt[1]}`)
      if (signals.length) break
    } catch { /* ignore */ }
  }
  return signals
}

async function resolveVendor(vendor) {
  // 1) Sniff the careers page for fingerprint + hinted handle.
  //    Sniff is authoritative: if we saw `jobs.lever.co/acme` embedded on
  //    acme.com/careers, we trust ats=lever handle=acme even if they currently
  //    have zero open postings. Probe only confirms the endpoint shape.
  const signals = await sniffCareersPage(vendor.website)
  const hinted = signals.find(s => s.includes(':'))
  if (hinted) {
    const [ats, handle] = hinted.split(':')
    const probeFn = { greenhouse: probeGreenhouse, lever: probeLever, ashby: probeAshby,
                      smartrecruiters: probeSmartRecruiters, workable: probeWorkable, recruitee: probeRecruitee }[ats]
    const hit = await probeFn?.(handle)
    if (hit) return { ...hit, source: 'sniff' }
  }

  // 2) Brute: try each probe with each handle candidate. Only accept hits
  //    with count > 0 — an empty response doesn't prove the handle exists,
  //    several ATS endpoints (notably SmartRecruiters) return 200/empty for
  //    any alphanumeric handle.
  const handles = handleCandidates(vendor)
  for (const probe of PROBES) {
    for (const h of handles) {
      const hit = await probe(h)
      if (hit && hit.count > 0) return { ...hit, source: 'probe' }
    }
  }
  return { ats: 'unknown', handle: null, count: 0, source: 'none' }
}

// ---------- main ----------
async function main() {
  const args = process.argv.slice(2)
  const onlyIdx = args.indexOf('--only')
  const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null

  const vendors = loadVendors()
  const targets = only ? vendors.filter(v => v.slug === only) : vendors
  if (!targets.length) { console.error(`no vendor matched`); process.exit(1) }

  console.log(`resolving ${targets.length} vendor(s)...`)
  const out = []
  let ok = 0, fail = 0
  for (const v of targets) {
    process.stdout.write(`  ${v.slug.padEnd(32)} `)
    const r = await resolveVendor(v)
    if (r.ats === 'unknown') { fail++; console.log(`—  unknown`) }
    else { ok++; console.log(`→  ${r.ats} (${r.handle}) ${r.count} jobs [${r.source}]`) }
    out.push({
      slug: v.slug,
      name: v.name,
      ats: r.ats,
      handle: r.handle ?? null,
      careers_url: v.website ? `https://${v.website}/careers` : null,
      discovery_source: r.source,       // 'sniff' | 'probe' | 'none'
      discovery_job_count: r.count ?? 0 // job count at discovery time (sanity check)
    })
  }

  const body =
`// AUTO-GENERATED by scripts/discover-ats.mjs — re-run to refresh.
// Hand-edit entries where ats === "unknown" to set the correct handle.
export type VendorAtsMapping = {
  slug: string
  name: string
  ats: 'greenhouse' | 'lever' | 'ashby' | 'smartrecruiters' | 'workable' | 'recruitee' | 'unknown'
  handle: string | null
  careers_url: string | null
  discovery_source: 'sniff' | 'probe' | 'none'
  discovery_job_count: number
}

export const vendorAts: VendorAtsMapping[] = ${JSON.stringify(out, null, 2)}
`
  writeFileSync(path.join(ROOT, 'src/data/vendorAts.ts'), body)
  console.log(`\nwrote src/data/vendorAts.ts — ${ok} resolved, ${fail} unknown`)
}

main().catch(e => { console.error(e); process.exit(1) })
