#!/usr/bin/env node
// Monthly FRED ingest runner for The Wrap Underemployment Index (WUI).
//
// Pulls three FRED series (U-6, U-3, JOLTS quits rate) and POSTs the
// observations to {SITE_URL}/api/bls/ingest, which upserts into the
// bls_observations D1 table.
//
// Env:
//   SITE_URL           e.g. https://ilovethewrap.com  (or http://127.0.0.1:8788 for local)
//   BLS_INGEST_TOKEN   shared secret, must match Cloudflare env var
//   FRED_API_KEY       free key from https://fred.stlouisfed.org/docs/api/api_key.html
//
// Local: SITE_URL=http://127.0.0.1:8788 BLS_INGEST_TOKEN=... FRED_API_KEY=... node scripts/ingest-bls.mjs

const SITE_URL         = process.env.SITE_URL?.replace(/\/$/, '')
const BLS_INGEST_TOKEN = process.env.BLS_INGEST_TOKEN
const FRED_API_KEY     = process.env.FRED_API_KEY
if (!SITE_URL)         { console.error('SITE_URL env required'); process.exit(1) }
if (!BLS_INGEST_TOKEN) { console.error('BLS_INGEST_TOKEN env required'); process.exit(1) }
if (!FRED_API_KEY)     { console.error('FRED_API_KEY env required'); process.exit(1) }

// FRED series we track. U6RATE and UNRATE are monthly seasonally-adjusted
// rates; JTSQUR is the JOLTS total nonfarm quits rate (monthly).
const SERIES_IDS = ['U6RATE', 'UNRATE', 'JTSQUR']

// Pull a generous window so the API has enough history for the trailing
// 120-month percentile calc plus the 60-month chart window.
const observationStart = (() => {
  const d = new Date()
  d.setUTCFullYear(d.getUTCFullYear() - 22)
  return d.toISOString().slice(0, 10)
})()

async function fetchSeries(id) {
  const url =
    `https://api.stlouisfed.org/fred/series/observations` +
    `?series_id=${encodeURIComponent(id)}` +
    `&api_key=${encodeURIComponent(FRED_API_KEY)}` +
    `&file_type=json` +
    `&observation_start=${observationStart}`
  const r = await fetch(url)
  if (!r.ok) throw new Error(`FRED ${id} ${r.status}: ${(await r.text()).slice(0, 300)}`)
  const data = await r.json()
  const out = []
  for (const o of data.observations ?? []) {
    if (o.value === '.' || o.value == null) continue // FRED uses "." for missing
    const v = Number(o.value)
    if (!Number.isFinite(v)) continue
    out.push({ series_id: id, observation_date: o.date, value: v })
  }
  return out
}

async function post(observations) {
  const payload = JSON.stringify({ observations })
  let lastErr
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 2000))
    const r = await fetch(`${SITE_URL}/api/bls/ingest`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${BLS_INGEST_TOKEN}`,
      },
      body: payload,
    })
    if (r.ok) return r.json()
    const text = await r.text().catch(() => '')
    lastErr = new Error(`ingest ${r.status}: ${text.slice(0, 500)}`)
    if (r.status < 500) break
    console.log(`  ! ingest ${r.status}, retrying in 2s...`)
  }
  throw lastErr
}

async function main() {
  console.log(`[${new Date().toISOString()}] WUI ingest start (observation_start=${observationStart})`)

  const all = []
  for (const id of SERIES_IDS) {
    const obs = await fetchSeries(id)
    console.log(`  ✓ ${id.padEnd(8)} ${obs.length} observations (${obs[0]?.observation_date ?? '—'} … ${obs.at(-1)?.observation_date ?? '—'})`)
    all.push(...obs)
  }

  if (!all.length) { console.error('no observations returned'); process.exit(1) }

  console.log(`\nposting ${all.length} total observations`)
  const r = await post(all)
  console.log(`  upserted=${r.upserted} rejected=${r.rejected ?? 0}`)
  console.log('done.')
}

main().catch(e => { console.error(e); process.exit(1) })
