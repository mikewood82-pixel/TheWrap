// GET /api/bls/wui
//
// Computes The Wrap Underemployment Index (WUI) — a 0-100 monthly composite
// of three FRED series, each normalized against its trailing-120-month
// percentile, then weight-averaged:
//
//   WUI = 0.50 * pct(U6) + 0.30 * pct(U6 - U3 spread) + 0.20 * (100 - pct(quits))
//
// Higher WUI = more labor-market slack. Returns the latest complete reading
// (most recent month where all three series are present), the prior month,
// the year-ago month, and the full computed series for charting.

interface Env {
  JOBS_DB: D1Database
}

type Row = { series_id: string; observation_date: string; value: number }

const SERIES = {
  U6: 'U6RATE',
  U3: 'UNRATE',
  QUITS: 'JTSQUR',
} as const

const WEIGHTS = { u6: 0.5, spread: 0.3, quitsInv: 0.2 }
const WINDOW_MONTHS = 120 // trailing-10y percentile window
const READ_MONTHS = 240 // enough history to compute 60-month chart + 120-month window

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.JOBS_DB.prepare(
    `SELECT series_id, observation_date, value
       FROM bls_observations
      WHERE series_id IN (?, ?, ?)
      ORDER BY observation_date ASC`
  ).bind(SERIES.U6, SERIES.U3, SERIES.QUITS).all<Row>()

  if (!results?.length) {
    return Response.json({ error: 'no data' }, { status: 404 })
  }

  // Bucket by date with three components.
  const byDate = new Map<string, { u6?: number; u3?: number; quits?: number }>()
  for (const r of results) {
    const bucket = byDate.get(r.observation_date) ?? {}
    if (r.series_id === SERIES.U6) bucket.u6 = r.value
    else if (r.series_id === SERIES.U3) bucket.u3 = r.value
    else if (r.series_id === SERIES.QUITS) bucket.quits = r.value
    byDate.set(r.observation_date, bucket)
  }

  // Keep only months where all three series are present. Ascending order.
  const dates = [...byDate.keys()].sort()
  const complete: Array<{ date: string; u6: number; u3: number; quits: number; spread: number }> = []
  for (const date of dates) {
    const b = byDate.get(date)!
    if (b.u6 == null || b.u3 == null || b.quits == null) continue
    complete.push({ date, u6: b.u6, u3: b.u3, quits: b.quits, spread: b.u6 - b.u3 })
  }

  if (!complete.length) {
    return Response.json({ error: 'no complete month' }, { status: 404 })
  }

  // For each month, compute the percentile of each component relative to
  // the trailing WINDOW_MONTHS values (inclusive). Use linear-interp percentile.
  function pct(window: number[], v: number): number {
    if (!window.length) return 50
    const sorted = [...window].sort((a, b) => a - b)
    // Count strictly less + half of equal: classic mid-rank percentile.
    let less = 0, equal = 0
    for (const x of sorted) {
      if (x < v) less++
      else if (x === v) equal++
      else break
    }
    return ((less + equal / 2) / sorted.length) * 100
  }

  const series: Array<{ date: string; wui: number; u6: number; u3: number; spread: number; quits: number; pctU6: number; pctSpread: number; pctQuits: number }> = []
  for (let i = 0; i < complete.length; i++) {
    const start = Math.max(0, i - WINDOW_MONTHS + 1)
    const window = complete.slice(start, i + 1)
    const winU6 = window.map(w => w.u6)
    const winSpread = window.map(w => w.spread)
    const winQuits = window.map(w => w.quits)

    const cur = complete[i]
    const pctU6 = pct(winU6, cur.u6)
    const pctSpread = pct(winSpread, cur.spread)
    const pctQuits = pct(winQuits, cur.quits)
    const wui =
      WEIGHTS.u6 * pctU6 +
      WEIGHTS.spread * pctSpread +
      WEIGHTS.quitsInv * (100 - pctQuits)

    series.push({
      date: cur.date,
      wui: Math.round(wui * 10) / 10,
      u6: cur.u6,
      u3: cur.u3,
      spread: Math.round(cur.spread * 100) / 100,
      quits: cur.quits,
      pctU6: Math.round(pctU6),
      pctSpread: Math.round(pctSpread),
      pctQuits: Math.round(pctQuits),
    })
  }

  // Trim to the last READ_MONTHS for transport size; the percentile math
  // already used full history above.
  const trimmed = series.slice(-READ_MONTHS)
  const latest = trimmed[trimmed.length - 1]
  const priorMonth = trimmed.length >= 2 ? trimmed[trimmed.length - 2] : null
  const yearAgo = trimmed.length >= 13 ? trimmed[trimmed.length - 13] : null

  const payload = {
    latest,
    prior_month: priorMonth,
    year_ago: yearAgo,
    series: trimmed.map(s => ({ date: s.date, wui: s.wui })),
    methodology: {
      weights: WEIGHTS,
      window_months: WINDOW_MONTHS,
      components: {
        u6: { series: SERIES.U6, label: 'U-6 broad underemployment rate' },
        u3: { series: SERIES.U3, label: 'U-3 official unemployment rate' },
        quits: { series: SERIES.QUITS, label: 'Quits rate, total nonfarm (JOLTS)' },
      },
    },
  }

  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=300, s-maxage=3600',
    },
  })
}
