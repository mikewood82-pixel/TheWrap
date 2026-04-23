// Shared webhook delivery helper.
//
// Used by both /api/jobs/alerts/deliver and /api/vendor-alerts/deliver so any
// Wrap+ member can route alerts into a team Slack channel (or any incoming
// webhook) in addition to email.
//
// Format choice is URL-driven:
//   - hooks.slack.com/*  → Slack Block Kit payload
//   - anything else      → generic JSON payload (same shape)
// Generic JSON is a superset; Slack won't render most of it, so we post
// Block Kit to Slack URLs specifically.

export type WebhookPayloadJob = {
  kind: 'jobs_alert'
  alert_id: number
  alert_name: string | null
  matches: Array<{
    id: number
    title: string
    vendor_name: string | null
    location: string | null
    remote: string
    url: string
  }>
  manage_url: string
}

export type WebhookPayloadVendor = {
  kind: 'vendor_alert'
  alerts: Array<{
    vendor_slug: string
    vendor_name: string
    verdict: string
    previous_verdict: string | null
    vendor_page_url: string
  }>
  manage_url: string
}

export type WebhookPayload = WebhookPayloadJob | WebhookPayloadVendor

/**
 * Best-effort POST. Returns true on 2xx, false otherwise. Never throws —
 * deliver endpoints treat webhook failures as soft: email still went out.
 */
export async function deliverWebhook(
  url: string,
  payload: WebhookPayload,
): Promise<boolean> {
  try {
    const isSlack = /^https:\/\/hooks\.slack\.com\//i.test(url)
    const body = isSlack ? slackBlocks(payload) : payload
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      // Cap the wait so a slow webhook can't bottleneck the whole delivery loop.
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      console.error(`webhook ${url.slice(0, 80)}... → ${res.status}`)
      return false
    }
    return true
  } catch (e) {
    console.error(`webhook ${url.slice(0, 80)}... threw:`, e)
    return false
  }
}

// ---- Slack Block Kit renderers --------------------------------------------
function slackBlocks(payload: WebhookPayload): unknown {
  if (payload.kind === 'jobs_alert') {
    const header = payload.alert_name
      ? `:briefcase: *${escapeSlack(payload.alert_name)}* — ${payload.matches.length} new role${payload.matches.length === 1 ? '' : 's'}`
      : `:briefcase: ${payload.matches.length} new role${payload.matches.length === 1 ? '' : 's'} on The Wrap`
    const rows = payload.matches.slice(0, 10).map(m => {
      const meta = [m.vendor_name, m.location?.split(';')[0]?.trim(), m.remote !== 'unknown' ? m.remote : null].filter(Boolean).join(' · ')
      return {
        type: 'section',
        text: { type: 'mrkdwn', text: `<${m.url}|*${escapeSlack(m.title)}*>\n${escapeSlack(meta)}` },
      }
    })
    return {
      text: header,    // fallback for notifications
      blocks: [
        { type: 'section', text: { type: 'mrkdwn', text: header } },
        { type: 'divider' },
        ...rows,
        { type: 'context', elements: [{ type: 'mrkdwn', text: `<${payload.manage_url}|Manage alerts on The Wrap>` }] },
      ],
    }
  }

  // Vendor alerts
  const freezes = payload.alerts.filter(a => a.verdict === 'freeze')
  const others  = payload.alerts.filter(a => a.verdict !== 'freeze')
  const header = freezes.length
    ? `:snowflake: *${freezes.length} vendor freeze${freezes.length === 1 ? '' : 's'}*`
    : `:bell: ${payload.alerts.length} hiring-verdict change${payload.alerts.length === 1 ? '' : 's'}`

  const renderRow = (a: WebhookPayloadVendor['alerts'][number]) => {
    const arrow = a.verdict === 'freeze' ? ':snowflake:'
                : a.verdict === 'slowing' ? ':arrow_down_small:'
                : a.verdict === 'trending_up' ? ':arrow_up_small:' : ':minus:'
    const prev = a.previous_verdict ? `${a.previous_verdict} → ` : ''
    return {
      type: 'section',
      text: { type: 'mrkdwn', text: `${arrow} <${a.vendor_page_url}|*${escapeSlack(a.vendor_name)}*> · ${escapeSlack(prev + a.verdict)}` },
    }
  }

  return {
    text: header,
    blocks: [
      { type: 'section', text: { type: 'mrkdwn', text: header } },
      { type: 'divider' },
      ...freezes.map(renderRow),
      ...(freezes.length && others.length ? [{ type: 'divider' }] : []),
      ...others.map(renderRow),
      { type: 'context', elements: [{ type: 'mrkdwn', text: `<${payload.manage_url}|Manage vendor alerts on The Wrap>` }] },
    ],
  }
}

function escapeSlack(s: string): string {
  // Slack mrkdwn needs these escaped or they hijack rendering.
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
