// POST /api/jobs/ingest
//
// Authed (Bearer {JOBS_INGEST_TOKEN}) endpoint called by the GitHub Actions
// daily cron. Two request shapes:
//
//   { action: "upsert_batch", run_id, jobs: [...], vendor_ats?: [...] }
//   { action: "finalize",     run_id, started_at, vendor_slugs: [...] }
//
// On upsert_batch we UPSERT vendor_ats rows (if provided) and jobs rows.
// On finalize we mark jobs we didn't see this run (last_seen_at < started_at)
// for the listed vendors as status='closed'.

type RemoteKind = 'remote' | 'hybrid' | 'onsite' | 'unknown'
type Seniority = 'entry' | 'mid' | 'senior' | 'lead' | 'exec' | 'unknown'

type NormalizedJob = {
  external_id: string
  vendor_slug: string
  ats_source: string
  title: string
  department: string | null
  location: string | null
  remote: RemoteKind
  employment_type: string | null
  seniority: Seniority
  url: string
  description_html: string | null
  posted_at: string | null
}

type VendorAtsUpsert = {
  vendor_slug: string
  vendor_name: string
  ats: string
  handle: string | null
  careers_url: string | null
}

type Body =
  | { action: 'upsert_batch'; run_id: string; jobs: NormalizedJob[]; vendor_ats?: VendorAtsUpsert[] }
  | { action: 'finalize'; run_id: string; started_at: string; vendor_slugs: string[] }

interface Env {
  JOBS_DB: D1Database
  JOBS_INGEST_TOKEN: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.JOBS_INGEST_TOKEN || auth !== `Bearer ${env.JOBS_INGEST_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  let body: Body
  try { body = (await request.json()) as Body }
  catch { return new Response('invalid json', { status: 400 }) }

  if (body.action === 'upsert_batch') return handleUpsert(env.JOBS_DB, body)
  if (body.action === 'finalize')     return handleFinalize(env.JOBS_DB, body)
  return new Response('unknown action', { status: 400 })
}

async function handleUpsert(
  db: D1Database,
  body: Extract<Body, { action: 'upsert_batch' }>,
): Promise<Response> {
  const stmts: D1PreparedStatement[] = []

  if (body.vendor_ats?.length) {
    const sql = `INSERT INTO vendor_ats (vendor_slug, vendor_name, ats, handle, careers_url, updated_at)
                 VALUES (?, ?, ?, ?, ?, datetime('now'))
                 ON CONFLICT(vendor_slug) DO UPDATE SET
                   vendor_name = excluded.vendor_name,
                   ats         = excluded.ats,
                   handle      = excluded.handle,
                   careers_url = excluded.careers_url,
                   updated_at  = datetime('now')`
    for (const v of body.vendor_ats) {
      stmts.push(db.prepare(sql).bind(v.vendor_slug, v.vendor_name, v.ats, v.handle, v.careers_url))
    }
  }

  const jobSql = `INSERT INTO jobs (
      external_id, vendor_slug, ats_source, title, department, location, remote,
      employment_type, seniority, url, description_html, posted_at,
      first_seen_at, last_seen_at, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), 'open')
    ON CONFLICT(vendor_slug, ats_source, external_id) DO UPDATE SET
      title            = excluded.title,
      department       = excluded.department,
      location         = excluded.location,
      remote           = excluded.remote,
      employment_type  = excluded.employment_type,
      seniority        = excluded.seniority,
      url              = excluded.url,
      description_html = excluded.description_html,
      posted_at        = excluded.posted_at,
      last_seen_at     = datetime('now'),
      status           = 'open'`

  for (const j of body.jobs) {
    stmts.push(db.prepare(jobSql).bind(
      j.external_id, j.vendor_slug, j.ats_source, j.title, j.department, j.location,
      j.remote, j.employment_type, j.seniority, j.url, j.description_html, j.posted_at,
    ))
  }

  if (!stmts.length) return Response.json({ ok: true, upserted: 0 })

  // D1 batch() is atomic and much faster than N serial awaits.
  try { await db.batch(stmts) }
  catch (e) { return new Response(`batch failed: ${String(e)}`, { status: 500 }) }

  return Response.json({ ok: true, upserted: body.jobs.length, vendor_ats_upserted: body.vendor_ats?.length ?? 0 })
}

async function handleFinalize(
  db: D1Database,
  body: Extract<Body, { action: 'finalize' }>,
): Promise<Response> {
  // Close jobs in the scoped vendors that weren't touched this run.
  // Both sides wrapped in datetime() so ISO ("2026-04-20T17:43:53.459Z") from
  // Node and SQLite's "2026-04-20 17:43:53" shape compare correctly.
  if (!body.vendor_slugs.length) return Response.json({ ok: true, closed: 0 })
  const placeholders = body.vendor_slugs.map(() => '?').join(',')

  // Pin every date window in this run to the day of started_at so a run that
  // straddles midnight UTC still bookkeeps into a single consistent snapshot
  // date. started_at shape: "2026-04-20T17:43:53.459Z" → snapshotDate="2026-04-20".
  const snapshotDate = body.started_at.slice(0, 10)

  // Count jobs about to be closed per vendor BEFORE the UPDATE — after the
  // UPDATE there's no way to tell "closed today" from "closed on a prior run".
  const { results: willCloseRows } = await db.prepare(
    `SELECT vendor_slug, COUNT(*) AS n
       FROM jobs
      WHERE status = 'open'
        AND vendor_slug IN (${placeholders})
        AND datetime(last_seen_at) < datetime(?)
      GROUP BY vendor_slug`
  ).bind(...body.vendor_slugs, body.started_at).all<{ vendor_slug: string; n: number }>()
  const closedByVendor = new Map<string, number>(
    (willCloseRows ?? []).map(r => [r.vendor_slug, r.n]),
  )

  // Now close the stale rows.
  const updateRes = await db.prepare(
    `UPDATE jobs SET status = 'closed'
     WHERE status = 'open'
       AND vendor_slug IN (${placeholders})
       AND datetime(last_seen_at) < datetime(?)`
  ).bind(...body.vendor_slugs, body.started_at).run()

  // Post-close, roll up open_jobs and jobs_added (first seen today) per vendor.
  const { results: snapRows } = await db.prepare(
    `SELECT vendor_slug,
            SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open_jobs,
            SUM(CASE WHEN date(first_seen_at) = ? THEN 1 ELSE 0 END) AS jobs_added
       FROM jobs
      WHERE vendor_slug IN (${placeholders})
      GROUP BY vendor_slug`
  ).bind(snapshotDate, ...body.vendor_slugs).all<{
    vendor_slug: string; open_jobs: number; jobs_added: number
  }>()

  // UPSERT one snapshot row per vendor for today. Idempotent under retries.
  const snapSql = `INSERT INTO vendor_snapshots
      (vendor_slug, snapshot_date, open_jobs, jobs_added, jobs_closed)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(vendor_slug, snapshot_date) DO UPDATE SET
      open_jobs  = excluded.open_jobs,
      jobs_added = excluded.jobs_added,
      jobs_closed = excluded.jobs_closed`
  const snapStmts = (snapRows ?? []).map(row => db.prepare(snapSql).bind(
    row.vendor_slug,
    snapshotDate,
    row.open_jobs ?? 0,
    row.jobs_added ?? 0,
    closedByVendor.get(row.vendor_slug) ?? 0,
  ))
  if (snapStmts.length) {
    try { await db.batch(snapStmts) }
    catch (e) {
      // Don't let a snapshot failure mask the finalize result — log and continue.
      console.error(`vendor_snapshots batch failed: ${String(e)}`)
    }
  }

  await db.prepare(
    `INSERT INTO ingest_runs (started_at, finished_at, vendors_ok, jobs_closed)
     VALUES (?, datetime('now'), ?, ?)`
  ).bind(body.started_at, body.vendor_slugs.length, updateRes.meta.changes ?? 0).run()

  return Response.json({ ok: true, closed: updateRes.meta.changes ?? 0 })
}
