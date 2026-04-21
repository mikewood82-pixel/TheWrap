// POST /api/vendor-alerts/deliver
//
// Daily verdict-change detector + digest dispatcher. Called by the same
// jobs-ingest GHA workflow that populates vendor_snapshots, so we always
// run right after fresh data lands.
//
// Pipeline:
//   1. For each active vendor, recompute today's hiring-health verdict from
//      the last 30 days of snapshots.
//   2. Compare to the most recent vendor_health_history row. If different,
//      persist a new row.
//   3. For each watcher of a vendor whose verdict just changed, queue an
//      alert (skipping any already-sent rows, dedup key = user + vendor +
//      verdict_date).
//   4. Group queued alerts by user and send one rollup email per user.
//      Freeze verdicts lead the email and get red styling; other changes
//      follow.
//   5. Record voice_alert_runs bookkeeping.
//
// Auth: Bearer ${VENDOR_ALERT_TOKEN}. Server-to-server.

import { computeHealth, verdictLabel, type SnapRow, type HealthVerdict } from '../_lib/vendorHealth'
import { signUserId } from '../_lib/voicesSignature'

interface Env {
  JOBS_DB: D1Database
  RESEND_API_KEY: string
  VENDOR_ALERT_TOKEN: string
  VENDOR_ALERT_UNSUB_SECRET: string
}

type VendorRow = { slug: string; name: string | null }
type HistoryRow = { vendor_slug: string; verdict: HealthVerdict }
type WatchRow = {
  clerk_user_id: string
  email: string
  vendor_slug: string
  vendor_name: string | null
}

type PendingAlert = {
  vendor_slug: string
  vendor_name: string
  verdict: HealthVerdict
  previous_verdict: HealthVerdict | null
}

const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'The Wrap · Vendor Alerts <mike@ilovethewrap.com>'
const INTER_SEND_DELAY_MS = 250

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.VENDOR_ALERT_TOKEN || auth !== `Bearer ${env.VENDOR_ALERT_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  const startedAt = new Date().toISOString()
  const todayIso = startedAt.slice(0, 10) // YYYY-MM-DD for verdict_date keys

  // -------- 1) Load vendors + their last-30d snapshots --------
  const [vendorRes, snapRes, lastVerdictRes] = await env.JOBS_DB.batch<unknown>([
    env.JOBS_DB.prepare(
      `SELECT vendor_slug AS slug, vendor_name AS name
         FROM vendor_ats
        WHERE active = 1`
    ),
    env.JOBS_DB.prepare(
      `SELECT vendor_slug, snapshot_date, open_jobs, jobs_added
         FROM vendor_snapshots
        WHERE snapshot_date >= date('now', '-35 days')
     ORDER BY vendor_slug ASC, snapshot_date ASC`
    ),
    env.JOBS_DB.prepare(
      // Latest recorded verdict per vendor (max verdict_date).
      `SELECT h.vendor_slug, h.verdict
         FROM vendor_health_history h
         JOIN (SELECT vendor_slug, MAX(verdict_date) AS md FROM vendor_health_history GROUP BY vendor_slug) m
           ON m.vendor_slug = h.vendor_slug AND m.md = h.verdict_date`
    ),
  ]) as unknown as [
    { results: VendorRow[] },
    { results: SnapRow[] },
    { results: HistoryRow[] },
  ]

  const snapsByVendor = new Map<string, SnapRow[]>()
  for (const s of snapRes.results ?? []) {
    const arr = snapsByVendor.get(s.vendor_slug) ?? []
    arr.push(s)
    snapsByVendor.set(s.vendor_slug, arr)
  }
  const lastVerdictByVendor = new Map<string, HealthVerdict>()
  for (const r of lastVerdictRes.results ?? []) {
    lastVerdictByVendor.set(r.vendor_slug, r.verdict)
  }

  // -------- 2) Compute today's verdict + detect changes --------
  type Change = { slug: string; name: string; verdict: HealthVerdict; previous: HealthVerdict | null }
  const changes: Change[] = []
  const historyInserts: D1PreparedStatement[] = []

  for (const v of vendorRes.results ?? []) {
    const snaps = snapsByVendor.get(v.slug) ?? []
    const health = computeHealth(snaps)
    if (!health) continue // not enough data to produce a verdict

    const prev = lastVerdictByVendor.get(v.slug) ?? null
    // Always upsert today's row so history is dense — makes later diagnostics easy.
    historyInserts.push(env.JOBS_DB.prepare(
      `INSERT INTO vendor_health_history (vendor_slug, verdict_date, verdict, ratio, days_of_data)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(vendor_slug, verdict_date) DO UPDATE SET
         verdict      = excluded.verdict,
         ratio        = excluded.ratio,
         days_of_data = excluded.days_of_data`
    ).bind(v.slug, todayIso, health.verdict, health.ratio, health.days_of_data))

    if (prev !== health.verdict) {
      changes.push({
        slug: v.slug, name: v.name ?? v.slug,
        verdict: health.verdict, previous: prev,
      })
    }
  }

  if (historyInserts.length) {
    try { await env.JOBS_DB.batch(historyInserts) }
    catch (e) { console.error('history batch failed:', e) }
  }

  // -------- 3) For each change, find watchers + filter already-sent --------
  type UserBucket = { email: string; alerts: PendingAlert[] }
  const buckets = new Map<string, UserBucket>()

  if (changes.length > 0) {
    const changedSlugs = changes.map(c => c.slug)
    const placeholders = changedSlugs.map(() => '?').join(',')
    const { results: watchers } = await env.JOBS_DB.prepare(
      `SELECT w.clerk_user_id, w.email, w.vendor_slug, va.vendor_name
         FROM vendor_watches w
         LEFT JOIN vendor_ats va ON va.vendor_slug = w.vendor_slug
        WHERE w.active = 1
          AND w.vendor_slug IN (${placeholders})`
    ).bind(...changedSlugs).all<WatchRow>()

    // Pull already-sent rows for today so we can skip dedupes without a per-row query.
    const { results: sentToday } = await env.JOBS_DB.prepare(
      `SELECT clerk_user_id, vendor_slug
         FROM vendor_health_alerts_sent
        WHERE verdict_date = ?`
    ).bind(todayIso).all<{ clerk_user_id: string; vendor_slug: string }>()
    const sentKey = (u: string, s: string) => `${u}|${s}`
    const sentSet = new Set((sentToday ?? []).map(r => sentKey(r.clerk_user_id, r.vendor_slug)))

    const changeByVendor = new Map(changes.map(c => [c.slug, c]))

    for (const w of watchers ?? []) {
      if (sentSet.has(sentKey(w.clerk_user_id, w.vendor_slug))) continue
      const c = changeByVendor.get(w.vendor_slug)
      if (!c) continue

      const b = buckets.get(w.clerk_user_id) ?? { email: w.email, alerts: [] }
      b.alerts.push({
        vendor_slug: w.vendor_slug,
        vendor_name: w.vendor_name ?? c.name,
        verdict: c.verdict,
        previous_verdict: c.previous,
      })
      buckets.set(w.clerk_user_id, b)
    }
  }

  // -------- 4) Send rollup emails --------
  let digestsSent = 0
  let errors = 0
  for (const [userId, bucket] of buckets) {
    try {
      // Sort: freezes first (they lead the email), then the rest by vendor name.
      bucket.alerts.sort((a, b) => {
        if (a.verdict === 'freeze' && b.verdict !== 'freeze') return -1
        if (b.verdict === 'freeze' && a.verdict !== 'freeze') return 1
        return a.vendor_name.localeCompare(b.vendor_name)
      })

      const unsubToken = await signUserId(userId, env.VENDOR_ALERT_UNSUB_SECRET)
      const unsubUrl = `https://ilovethewrap.com/api/vendor-alerts/unsubscribe?token=${unsubToken}`
      const manageUrl = `https://ilovethewrap.com/jobs/vendor-alerts`
      const html = renderDigestHtml(bucket.alerts, unsubUrl, manageUrl)
      const subject = renderSubject(bucket.alerts)

      const ok = await sendViaResend(env, { to: bucket.email, subject, html, unsubUrl })
      if (!ok) { errors++; continue }

      const stmts = bucket.alerts.map(a => env.JOBS_DB.prepare(
        `INSERT INTO vendor_health_alerts_sent
           (clerk_user_id, vendor_slug, verdict_date, verdict, previous_verdict)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(clerk_user_id, vendor_slug, verdict_date) DO NOTHING`
      ).bind(userId, a.vendor_slug, todayIso, a.verdict, a.previous_verdict))
      await env.JOBS_DB.batch(stmts)

      digestsSent++
      if (INTER_SEND_DELAY_MS > 0) await sleep(INTER_SEND_DELAY_MS)
    } catch (e) {
      console.error(`vendor-alert digest for ${userId} failed:`, e)
      errors++
    }
  }

  await env.JOBS_DB.prepare(
    `INSERT INTO vendor_alert_runs
        (started_at, finished_at, vendors_scanned, changes_detected, digests_sent, errors)
      VALUES (?, datetime('now'), ?, ?, ?, ?)`
  ).bind(
    startedAt,
    vendorRes.results?.length ?? 0,
    changes.length,
    digestsSent,
    errors,
  ).run()

  return Response.json({
    vendors_scanned: vendorRes.results?.length ?? 0,
    changes_detected: changes.length,
    digests_sent: digestsSent,
    errors,
  })
}

// -------- Rendering --------

function renderSubject(alerts: PendingAlert[]): string {
  const freezes = alerts.filter(a => a.verdict === 'freeze')
  if (freezes.length === 1) return `Freeze at ${freezes[0].vendor_name}`
  if (freezes.length > 1) return `${freezes.length} vendor freezes today`
  if (alerts.length === 1) return `${alerts[0].vendor_name}: hiring verdict changed`
  return `${alerts.length} vendor verdicts changed today`
}

function renderDigestHtml(
  alerts: PendingAlert[],
  unsubUrl: string,
  manageUrl: string,
): string {
  const freezes = alerts.filter(a => a.verdict === 'freeze')
  const others = alerts.filter(a => a.verdict !== 'freeze')

  const freezeSection = freezes.length ? `
<div style="margin-bottom: 32px;">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #b33; margin-bottom: 10px;">Freeze alerts</div>
  ${freezes.map(renderAlertRow).join('\n')}
</div>` : ''

  const othersSection = others.length ? `
<div style="margin-bottom: 32px;">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 10px;">Other changes</div>
  ${others.map(renderAlertRow).join('\n')}
</div>` : ''

  return `
<div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
  <a href="https://ilovethewrap.com" style="text-decoration: none;">
    <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 60px; margin-bottom: 24px;" />
  </a>
  <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #c0623a; margin: 0 0 6px;">Wrap+ · Vendor Alerts</p>
  <h1 style="font-size: 24px; margin: 0 0 6px; line-height: 1.25;">Hiring-health changes</h1>
  <p style="color: #666; margin: 0 0 28px; font-size: 14px;">
    ${alerts.length} verdict change${alerts.length === 1 ? '' : 's'} across vendors you watch.
  </p>
  ${freezeSection}
  ${othersSection}
  <div style="margin-top: 8px;">
    <a href="https://ilovethewrap.com/jobs" style="display: inline-block; background: #c0623a; color: #fff; text-decoration: none; font-weight: 600; padding: 10px 20px; border-radius: 6px;">Open /jobs on The Wrap</a>
  </div>
  <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
    <p>You're receiving this because you asked us to watch these vendors. Freezes send instantly; other changes roll up daily.</p>
    <p>
      <a href="${manageUrl}" style="color: #c0623a;">Manage vendor alerts</a>
      &nbsp;·&nbsp;
      <a href="${unsubUrl}" style="color: #999;">Pause all vendor alerts</a>
    </p>
  </div>
</div>`
}

function renderAlertRow(a: PendingAlert): string {
  const name = escapeHtml(a.vendor_name)
  const to = verdictLabel(a.verdict)
  const from = a.previous_verdict ? verdictLabel(a.previous_verdict) : 'No prior reading'
  const accent = a.verdict === 'freeze'      ? '#b33'
               : a.verdict === 'slowing'     ? '#b57900'
               : a.verdict === 'trending_up' ? '#227045'
               : '#666'
  const deepLink = `https://ilovethewrap.com/jobs?vendor=${encodeURIComponent(a.vendor_slug)}`
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #eee; border-radius: 8px; margin-bottom: 10px;">
  <tr>
    <td style="padding: 16px 18px;">
      <a href="${deepLink}" style="color: #1a1a1a; text-decoration: none;">
        <div style="font-size: 16px; font-weight: 600; line-height: 1.35; margin-bottom: 4px;">${name}</div>
        <div style="font-size: 13px; color: #555;">
          <span style="color: #999;">${escapeHtml(from)}</span>
          <span style="color: #bbb; padding: 0 6px;">→</span>
          <span style="color: ${accent}; font-weight: 600;">${escapeHtml(to)}</span>
        </div>
      </a>
    </td>
  </tr>
</table>`
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// -------- Resend --------
async function sendViaResend(
  env: Env,
  { to, subject, html, unsubUrl }: { to: string; subject: string; html: string; unsubUrl: string },
): Promise<boolean> {
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
