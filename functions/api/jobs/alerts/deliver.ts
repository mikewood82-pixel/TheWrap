// POST /api/jobs/alerts/deliver
//
// Daily alert-dispatch endpoint. Called by the GitHub Actions ingest workflow
// right after the daily ingest completes, so matching jobs include whatever
// landed that morning.
//
// Auth: `Authorization: Bearer ${ALERT_DELIVERY_TOKEN}`. Same pattern as the
// ingest endpoint — not Clerk/Plus, this is server-to-server.
//
// For each active alert:
//   1. Find up to 10 jobs that match the saved query AND were first seen
//      after the alert's created_at AND haven't been sent to this alert yet.
//   2. Skip if zero matches (empty digests are noise).
//   3. Render a branded HTML digest, send one email via Resend /emails, record
//      every matched job id into alert_sent to prevent re-sends tomorrow.
//
// Returns a JSON summary: {delivered, skipped_empty, errors, alerts_scanned}.

import { signAlertId } from '../../_lib/alertSignature'

interface Env {
  JOBS_DB: D1Database
  RESEND_API_KEY: string
  ALERT_DELIVERY_TOKEN: string
  ALERT_UNSUB_SECRET: string
}

type SavedQuery = {
  q: string
  vendors: string[]
  remote: string[]
  seniority: string[]
  location: string
  posted_since: number
  fresh_hours: number
}

type AlertRow = {
  id: number
  email: string
  name: string | null
  query_json: string
  created_at: string
}

type JobMatch = {
  id: number
  vendor_slug: string
  vendor_name: string | null
  title: string
  location: string | null
  remote: string
  seniority: string
  url: string
  first_seen_at: string
  posted_at: string | null
}

const PER_ALERT_LIMIT = 10
const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'The Wrap Jobs <mike@ilovethewrap.com>'
const INTER_SEND_DELAY_MS = 250   // keep us under Resend's 2/sec free-tier cap

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.ALERT_DELIVERY_TOKEN || auth !== `Bearer ${env.ALERT_DELIVERY_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  const { results: alerts } = await env.JOBS_DB.prepare(
    `SELECT id, email, name, query_json, created_at
       FROM alerts
      WHERE active = 1
      ORDER BY id ASC`,
  ).all<AlertRow>()

  let delivered = 0
  let skippedEmpty = 0
  let errors = 0

  for (const alert of alerts ?? []) {
    try {
      let query: SavedQuery
      try { query = JSON.parse(alert.query_json) as SavedQuery }
      catch { errors++; continue }

      const matches = await findMatches(env.JOBS_DB, alert, query, PER_ALERT_LIMIT)
      if (matches.length === 0) { skippedEmpty++; continue }

      const unsubToken = await signAlertId(alert.id, env.ALERT_UNSUB_SECRET)
      const unsubUrl   = `https://ilovethewrap.com/api/jobs/alerts/unsubscribe?token=${unsubToken}`
      const manageUrl  = `https://ilovethewrap.com/jobs/alerts`
      const html = renderDigestHtml(alert, matches, unsubUrl, manageUrl)
      const subject = renderSubject(alert, matches)

      const ok = await sendViaResend(env, {
        to: alert.email,
        subject,
        html,
        unsubUrl,
      })
      if (!ok) { errors++; continue }

      // Record sent. Batch-atomic so we never half-record.
      const rec = matches.map(m => env.JOBS_DB.prepare(
        `INSERT INTO alert_sent (alert_id, job_id) VALUES (?, ?)
         ON CONFLICT(alert_id, job_id) DO NOTHING`,
      ).bind(alert.id, m.id))
      await env.JOBS_DB.batch(rec)

      delivered++
      if (INTER_SEND_DELAY_MS > 0) await sleep(INTER_SEND_DELAY_MS)
    } catch (e) {
      console.error(`alert ${alert.id} delivery failed:`, e)
      errors++
    }
  }

  return Response.json({
    alerts_scanned: alerts?.length ?? 0,
    delivered,
    skipped_empty: skippedEmpty,
    errors,
  })
}

// -------- Match query translation ------------------------------------------
async function findMatches(
  db: D1Database,
  alert: AlertRow,
  query: SavedQuery,
  limit: number,
): Promise<JobMatch[]> {
  const where: string[] = [
    `jobs.status = 'open'`,
    `jobs.first_seen_at >= ?`,                                        // after alert creation
    `jobs.id NOT IN (SELECT job_id FROM alert_sent WHERE alert_id = ?)`,
  ]
  const binds: unknown[] = [alert.created_at, alert.id]

  if (query.q && query.q.trim()) {
    where.push(`jobs.id IN (SELECT rowid FROM jobs_fts WHERE jobs_fts MATCH ?)`)
    binds.push(buildFtsQuery(query.q))
  }
  if (query.vendors.length) {
    where.push(`jobs.vendor_slug IN (${query.vendors.map(() => '?').join(',')})`)
    binds.push(...query.vendors)
  }
  if (query.remote.length) {
    where.push(`jobs.remote IN (${query.remote.map(() => '?').join(',')})`)
    binds.push(...query.remote)
  }
  if (query.seniority.length) {
    where.push(`jobs.seniority IN (${query.seniority.map(() => '?').join(',')})`)
    binds.push(...query.seniority)
  }
  if (query.location) {
    where.push(`LOWER(jobs.location) LIKE ?`)
    binds.push(`%${query.location.toLowerCase()}%`)
  }
  // posted_since/fresh_hours intentionally not re-applied here — the alert
  // window is already bounded by "first_seen_at >= alert.created_at", and
  // re-applying those can hide roles the user would want (e.g. posted_since=7
  // on a week-old alert starts dropping matches after 7 days of activity).

  const sql = `
    SELECT jobs.id, jobs.vendor_slug, v.vendor_name, jobs.title,
           jobs.location, jobs.remote, jobs.seniority, jobs.url,
           jobs.first_seen_at, jobs.posted_at
      FROM jobs
 LEFT JOIN vendor_ats v ON v.vendor_slug = jobs.vendor_slug
     WHERE ${where.join(' AND ')}
     ORDER BY COALESCE(jobs.posted_at, jobs.first_seen_at) DESC
     LIMIT ?`
  const { results } = await db.prepare(sql).bind(...binds, limit).all<JobMatch>()
  return results ?? []
}

function buildFtsQuery(raw: string): string {
  const tokens = raw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
  if (!tokens.length) return '""'
  return tokens.map(t => `${t}*`).join(' AND ')
}

// -------- Email rendering ---------------------------------------------------
function renderSubject(alert: AlertRow, matches: JobMatch[]): string {
  const name = alert.name ?? 'Your alert'
  const n = matches.length
  if (n === 1) return `${name}: 1 new role on The Wrap`
  return `${name}: ${n} new roles on The Wrap`
}

function renderDigestHtml(
  alert: AlertRow,
  matches: JobMatch[],
  unsubUrl: string,
  manageUrl: string,
): string {
  const name = escapeHtml(alert.name ?? 'Your alert')
  const rows = matches.map(j => renderJobRow(j)).join('\n')
  return `
<div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
  <a href="https://ilovethewrap.com" style="text-decoration: none;">
    <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 60px; margin-bottom: 24px;" />
  </a>
  <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #c0623a; margin: 0 0 6px;">Wrap+ Alert</p>
  <h1 style="font-size: 24px; margin: 0 0 6px; line-height: 1.25;">${name}</h1>
  <p style="color: #666; margin: 0 0 28px; font-size: 14px;">
    ${matches.length} new role${matches.length === 1 ? '' : 's'} matched your saved search in the past day.
  </p>
  ${rows}
  <div style="margin-top: 32px;">
    <a href="https://ilovethewrap.com/jobs" style="display: inline-block; background: #c0623a; color: #fff; text-decoration: none; font-weight: 600; padding: 10px 20px; border-radius: 6px;">See all roles on The Wrap</a>
  </div>
  <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
    <p>You're receiving this because you created a Wrap+ alert on <a href="https://ilovethewrap.com" style="color: #c0623a;">ilovethewrap.com</a>.</p>
    <p>
      <a href="${manageUrl}" style="color: #c0623a;">Manage alerts</a>
      &nbsp;·&nbsp;
      <a href="${unsubUrl}" style="color: #999;">Pause this alert</a>
    </p>
  </div>
</div>`
}

function renderJobRow(j: JobMatch): string {
  const title = escapeHtml(j.title)
  const vendor = escapeHtml(j.vendor_name ?? j.vendor_slug)
  const loc = j.location ? escapeHtml(j.location.split(';')[0].trim()) : ''
  const remote = j.remote && j.remote !== 'unknown'
    ? `<span style="text-transform: capitalize;">${escapeHtml(j.remote)}</span>`
    : ''
  const meta = [loc, remote].filter(Boolean).join(' · ')
  const detailUrl = `https://ilovethewrap.com/jobs/${j.id}/${slugify(j.title)}`
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #eee; border-radius: 8px; margin-bottom: 12px;">
  <tr>
    <td style="padding: 16px 18px;">
      <a href="${detailUrl}" style="color: #1a1a1a; text-decoration: none;">
        <div style="font-size: 16px; font-weight: 600; line-height: 1.35; margin-bottom: 4px;">${title}</div>
        <div style="color: #c0623a; font-size: 13px; margin-bottom: 6px;">${vendor}</div>
        ${meta ? `<div style="color: #888; font-size: 12px;">${meta}</div>` : ''}
      </a>
    </td>
  </tr>
</table>`
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// -------- Resend wire ---------------------------------------------------------
async function sendViaResend(
  env: Env,
  { to, subject, html, unsubUrl }: { to: string; subject: string; html: string; unsubUrl: string },
): Promise<boolean> {
  // The List-Unsubscribe header lets Gmail/Outlook render a native "unsubscribe"
  // button; the List-Unsubscribe-Post=One-Click header makes it a single POST.
  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      html,
      headers: {
        'List-Unsubscribe': `<${unsubUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    }),
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    console.error('Resend error:', res.status, err.slice(0, 500))
    return false
  }
  return true
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}
