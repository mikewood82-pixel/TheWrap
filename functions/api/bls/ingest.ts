// POST /api/bls/ingest
//
// Authed (Bearer {BLS_INGEST_TOKEN}) endpoint called by the monthly GHA cron.
// Upserts FRED observations into the bls_observations table. FRED revises
// historical values, so we always overwrite on conflict.
//
// Body shape:
//   { observations: [{ series_id, observation_date, value }, ...] }

type Observation = {
  series_id: string
  observation_date: string // YYYY-MM-01
  value: number
}

type Body = { observations: Observation[] }

interface Env {
  JOBS_DB: D1Database
  BLS_INGEST_TOKEN: string
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.BLS_INGEST_TOKEN || auth !== `Bearer ${env.BLS_INGEST_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  let body: Body
  try { body = (await request.json()) as Body }
  catch { return new Response('invalid json', { status: 400 }) }

  if (!Array.isArray(body?.observations) || body.observations.length === 0) {
    return new Response('observations[] required', { status: 400 })
  }

  // Validate shape up front — one bad row should not poison the batch.
  const clean: Observation[] = []
  for (const o of body.observations) {
    if (typeof o?.series_id !== 'string' || !o.series_id) continue
    if (typeof o?.observation_date !== 'string' || !DATE_RE.test(o.observation_date)) continue
    if (typeof o?.value !== 'number' || !Number.isFinite(o.value)) continue
    clean.push(o)
  }
  if (!clean.length) return new Response('no valid observations', { status: 400 })

  const sql = `INSERT INTO bls_observations (series_id, observation_date, value, fetched_at)
               VALUES (?, ?, ?, datetime('now'))
               ON CONFLICT(series_id, observation_date) DO UPDATE SET
                 value      = excluded.value,
                 fetched_at = datetime('now')`

  const stmts = clean.map(o =>
    env.JOBS_DB.prepare(sql).bind(o.series_id, o.observation_date, o.value),
  )

  try { await env.JOBS_DB.batch(stmts) }
  catch (e) { return new Response(`batch failed: ${String(e)}`, { status: 500 }) }

  return Response.json({ ok: true, upserted: clean.length, rejected: body.observations.length - clean.length })
}
