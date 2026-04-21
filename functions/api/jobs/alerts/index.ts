// /api/jobs/alerts
//
// GET  → list the authenticated Wrap+ member's saved searches, newest first.
// POST → create a new saved search from a filter payload + display name.
//
// Both methods require an active Wrap+ subscription. See requirePlus().

import { requirePlus, type RequirePlusEnv } from '../../_lib/requirePlus'

interface Env extends RequirePlusEnv {
  JOBS_DB: D1Database
}

// ---- The canonical saved-search shape ---------------------------------------
// Mirrors JobsFilterState on the frontend. Kept separately so the server can
// validate incoming payloads without importing frontend code.
type SavedQuery = {
  q: string
  vendors: string[]
  remote: string[]
  seniority: string[]
  location: string
  posted_since: number   // days
  fresh_hours: number    // hours (0 = off)
}

const EMPTY_QUERY: SavedQuery = {
  q: '', vendors: [], remote: [], seniority: [], location: '', posted_since: 0, fresh_hours: 0,
}

type AlertRow = {
  id: number
  clerk_user_id: string
  email: string
  name: string | null
  query_json: string
  active: number
  created_at: string
}

type AlertPayload = Omit<AlertRow, 'clerk_user_id' | 'query_json'> & {
  query: SavedQuery
}

// ---- GET ---------------------------------------------------------------------
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  const { results } = await env.JOBS_DB.prepare(
    `SELECT id, clerk_user_id, email, name, query_json, active, created_at
       FROM alerts
      WHERE clerk_user_id = ?
      ORDER BY created_at DESC`,
  ).bind(auth.userId).all<AlertRow>()

  const alerts: AlertPayload[] = (results ?? []).map(rowToPayload)
  return Response.json({ alerts, total: alerts.length }, {
    headers: { 'cache-control': 'private, no-store' },
  })
}

// ---- POST --------------------------------------------------------------------
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requirePlus(request, env)
  if (auth instanceof Response) return auth

  let body: { email?: unknown; name?: unknown; query?: unknown }
  try { body = (await request.json()) as typeof body }
  catch { return json({ error: 'bad_json' }, 400) }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'invalid_email' }, 400)
  }
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : ''
  if (!name) return json({ error: 'missing_name' }, 400)

  const query = sanitizeQuery(body.query)
  if (!query) return json({ error: 'invalid_query' }, 400)
  // Reject alerts that match literally everything — would email thousands of
  // roles on day one. Require at least one real filter dimension.
  if (!hasAnyFilter(query)) return json({ error: 'query_too_broad' }, 400)

  // Soft cap per user — keeps a runaway loop from creating 10,000 alerts.
  const { count } = await env.JOBS_DB.prepare(
    `SELECT COUNT(*) AS count FROM alerts WHERE clerk_user_id = ?`,
  ).bind(auth.userId).first<{ count: number }>() ?? { count: 0 }
  if (count >= 20) return json({ error: 'alert_limit_reached', limit: 20 }, 409)

  const insert = await env.JOBS_DB.prepare(
    `INSERT INTO alerts (clerk_user_id, email, name, query_json, active)
     VALUES (?, ?, ?, ?, 1)
     RETURNING id, clerk_user_id, email, name, query_json, active, created_at`,
  ).bind(auth.userId, email, name, JSON.stringify(query)).first<AlertRow>()

  if (!insert) return json({ error: 'insert_failed' }, 500)
  return json({ alert: rowToPayload(insert) }, 201)
}

// ---- Shared helpers ---------------------------------------------------------
function sanitizeQuery(raw: unknown): SavedQuery | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const arrOfStr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter(x => typeof x === 'string').map(s => (s as string).trim()).filter(Boolean).slice(0, 50) : []
  const str = (v: unknown): string => (typeof v === 'string' ? v.trim().slice(0, 200) : '')
  const intIn = (v: unknown, min: number, max: number): number => {
    const n = Number(v)
    if (!Number.isFinite(n)) return 0
    return Math.max(min, Math.min(max, Math.floor(n)))
  }
  return {
    q:            str(r.q),
    vendors:      arrOfStr(r.vendors),
    remote:       arrOfStr(r.remote),
    seniority:    arrOfStr(r.seniority),
    location:     str(r.location),
    posted_since: intIn(r.posted_since, 0, 365),
    fresh_hours:  intIn(r.fresh_hours, 0, 168), // cap at 1 week
  }
}

function hasAnyFilter(q: SavedQuery): boolean {
  return q.q.length > 0
    || q.vendors.length > 0
    || q.remote.length > 0
    || q.seniority.length > 0
    || q.location.length > 0
    || q.posted_since > 0
    || q.fresh_hours > 0
}

function rowToPayload(row: AlertRow): AlertPayload {
  let query: SavedQuery = EMPTY_QUERY
  try { query = { ...EMPTY_QUERY, ...(JSON.parse(row.query_json) as Partial<SavedQuery>) } }
  catch { /* corrupt row — return empty query shape */ }
  return {
    id:            row.id,
    email:         row.email,
    name:          row.name,
    active:        row.active,
    created_at:    row.created_at,
    query,
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
