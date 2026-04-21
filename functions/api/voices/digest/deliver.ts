// POST /api/voices/digest/deliver
//
// Weekly Tuesday digest dispatcher. Called by the GitHub Actions
// `voices-digest` workflow at 13:23 UTC (≈ 9:23am ET) on Tuesdays.
//
// Auth: `Authorization: Bearer ${VOICES_DIGEST_TOKEN}`. Server-to-server,
// not Clerk — the GHA holds the token as a repo secret.
//
// For each active voices_digest_state recipient:
//   1. Pull up to DIGEST_ITEM_LIMIT new items from sources they follow that
//      haven't already been sent to them (voices_digest_sent).
//   2. If zero items, skip (no empty digests).
//   3. Render branded HTML, send via Resend, record each item into
//      voices_digest_sent, bump last_sent_at.
//
// Also records a voices_digest_runs bookkeeping row so operators can see
// run health at a glance.

import { signUserId } from '../../_lib/voicesSignature'

interface Env {
  JOBS_DB: D1Database
  RESEND_API_KEY: string
  VOICES_DIGEST_TOKEN: string
  VOICES_UNSUB_SECRET: string
}

type Recipient = {
  clerk_user_id: string
  email: string
  last_sent_at: string | null
}

type DigestItem = {
  id: number
  source_slug: string
  source_name: string
  source_kind: string
  title: string
  url: string
  excerpt: string | null
  published_at: string
}

const DIGEST_ITEM_LIMIT = 20                 // cap per email
const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'The Wrap Voices <mike@ilovethewrap.com>'
const INTER_SEND_DELAY_MS = 250              // stay under Resend 2/sec free cap

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = request.headers.get('authorization') ?? ''
  if (!env.VOICES_DIGEST_TOKEN || auth !== `Bearer ${env.VOICES_DIGEST_TOKEN}`) {
    return new Response('unauthorized', { status: 401 })
  }

  const startedAt = new Date().toISOString()

  const { results: recipients } = await env.JOBS_DB.prepare(
    `SELECT clerk_user_id, email, last_sent_at
       FROM voices_digest_state
      WHERE active = 1
      ORDER BY clerk_user_id ASC`
  ).all<Recipient>()

  let delivered = 0
  let skippedEmpty = 0
  let errors = 0
  let itemsSent = 0

  for (const r of recipients ?? []) {
    try {
      const items = await findNewItems(env.JOBS_DB, r, DIGEST_ITEM_LIMIT)
      if (items.length === 0) { skippedEmpty++; continue }

      const unsubToken = await signUserId(r.clerk_user_id, env.VOICES_UNSUB_SECRET)
      const unsubUrl = `https://ilovethewrap.com/api/voices/digest/unsubscribe?token=${unsubToken}`
      const manageUrl = `https://ilovethewrap.com/voices/following`
      const html = renderDigestHtml(items, unsubUrl, manageUrl)
      const subject = renderSubject(items)

      const ok = await sendViaResend(env, {
        to: r.email, subject, html, unsubUrl,
      })
      if (!ok) { errors++; continue }

      // Record sends + bump last_sent_at atomically.
      const now = new Date().toISOString()
      const stmts = items.map(it => env.JOBS_DB.prepare(
        `INSERT INTO voices_digest_sent (clerk_user_id, item_id)
         VALUES (?, ?)
         ON CONFLICT(clerk_user_id, item_id) DO NOTHING`
      ).bind(r.clerk_user_id, it.id))
      stmts.push(env.JOBS_DB.prepare(
        `UPDATE voices_digest_state SET last_sent_at = ?, updated_at = datetime('now')
          WHERE clerk_user_id = ?`
      ).bind(now, r.clerk_user_id))
      await env.JOBS_DB.batch(stmts)

      delivered++
      itemsSent += items.length
      if (INTER_SEND_DELAY_MS > 0) await sleep(INTER_SEND_DELAY_MS)
    } catch (e) {
      console.error(`voices digest for ${r.clerk_user_id} failed:`, e)
      errors++
    }
  }

  await env.JOBS_DB.prepare(
    `INSERT INTO voices_digest_runs
        (started_at, finished_at, digests_sent, items_sent, skipped_empty, errors)
      VALUES (?, datetime('now'), ?, ?, ?, ?)`
  ).bind(startedAt, delivered, itemsSent, skippedEmpty, errors).run()

  return Response.json({
    recipients_scanned: recipients?.length ?? 0,
    delivered,
    items_sent: itemsSent,
    skipped_empty: skippedEmpty,
    errors,
  })
}

// -------- Match: new items from followed sources, not yet sent --------
async function findNewItems(
  db: D1Database,
  r: Recipient,
  limit: number,
): Promise<DigestItem[]> {
  // Window: items published since last_sent_at (or all time for first digest),
  // AND NOT already present in voices_digest_sent for this user (belt-and-
  // suspenders against retries). Cap at DIGEST_ITEM_LIMIT newest.
  const { results } = await db.prepare(
    `SELECT i.id,
            s.slug AS source_slug,
            s.name AS source_name,
            s.kind AS source_kind,
            i.title, i.url, i.excerpt, i.published_at
       FROM voices_items i
       JOIN voices_sources s ON s.id = i.source_id
       JOIN voices_follows f
         ON f.source_id = i.source_id
        AND f.clerk_user_id = ?
      WHERE i.hidden = 0
        AND s.active = 1
        AND (? IS NULL OR i.published_at > ?)
        AND i.id NOT IN (
              SELECT item_id FROM voices_digest_sent WHERE clerk_user_id = ?
            )
      ORDER BY i.published_at DESC
      LIMIT ?`
  ).bind(
    r.clerk_user_id,
    r.last_sent_at, r.last_sent_at,
    r.clerk_user_id,
    limit,
  ).all<DigestItem>()
  return results ?? []
}

// -------- Email rendering --------
function renderSubject(items: DigestItem[]): string {
  const n = items.length
  const sourceSet = new Set(items.map(i => i.source_name))
  if (n === 1) return `${items[0].source_name}: new on The Wrap`
  if (sourceSet.size === 1) return `${items[0].source_name}: ${n} new posts on The Wrap`
  return `Voices you follow: ${n} new posts on The Wrap`
}

function renderDigestHtml(
  items: DigestItem[],
  unsubUrl: string,
  manageUrl: string,
): string {
  // Group by source so the digest reads like a newsletter rather than a list.
  const bySource = new Map<string, DigestItem[]>()
  for (const it of items) {
    const key = `${it.source_name}|${it.source_kind}`
    const arr = bySource.get(key) ?? []
    arr.push(it)
    bySource.set(key, arr)
  }

  const sections: string[] = []
  for (const [key, group] of bySource) {
    const [name, kind] = key.split('|')
    const rows = group.map(renderItemRow).join('\n')
    sections.push(`
<div style="margin-bottom: 28px;">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 4px;">${escapeHtml(kind)}</div>
  <div style="font-size: 15px; font-weight: 600; color: #c0623a; margin-bottom: 10px;">${escapeHtml(name)}</div>
  ${rows}
</div>`)
  }

  return `
<div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
  <a href="https://ilovethewrap.com" style="text-decoration: none;">
    <img src="https://ilovethewrap.com/logo.png" alt="The Wrap" style="width: 60px; margin-bottom: 24px;" />
  </a>
  <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #c0623a; margin: 0 0 6px;">Wrap+ · Voices Digest</p>
  <h1 style="font-size: 24px; margin: 0 0 6px; line-height: 1.25;">From the voices you follow</h1>
  <p style="color: #666; margin: 0 0 28px; font-size: 14px;">
    ${items.length} new post${items.length === 1 ? '' : 's'} from the writers and analysts you follow on The Wrap.
  </p>
  ${sections.join('\n')}
  <div style="margin-top: 24px;">
    <a href="https://ilovethewrap.com/voices/following" style="display: inline-block; background: #c0623a; color: #fff; text-decoration: none; font-weight: 600; padding: 10px 20px; border-radius: 6px;">Open on The Wrap</a>
  </div>
  <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
    <p>You're receiving this because you follow one or more voices on <a href="https://ilovethewrap.com/voices" style="color: #c0623a;">The Wrap</a>.</p>
    <p>
      <a href="${manageUrl}" style="color: #c0623a;">Manage voices</a>
      &nbsp;·&nbsp;
      <a href="${unsubUrl}" style="color: #999;">Pause this digest</a>
    </p>
  </div>
</div>`
}

function renderItemRow(it: DigestItem): string {
  const title = escapeHtml(it.title)
  const excerpt = it.excerpt ? escapeHtml(it.excerpt) : ''
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #eee; border-radius: 8px; margin-bottom: 10px;">
  <tr>
    <td style="padding: 16px 18px;">
      <a href="${escapeHtml(it.url)}" style="color: #1a1a1a; text-decoration: none;">
        <div style="font-size: 16px; font-weight: 600; line-height: 1.35; margin-bottom: 4px;">${title}</div>
        ${excerpt ? `<div style="color: #666; font-size: 13px; line-height: 1.5;">${excerpt}</div>` : ''}
      </a>
    </td>
  </tr>
</table>`
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// -------- Resend wire --------
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
