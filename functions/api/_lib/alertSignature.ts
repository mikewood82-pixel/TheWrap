// HMAC-SHA256 helpers for signing one-click alert-unsubscribe links so an
// email recipient can pause or delete their alert without signing in.
//
// Signed token shape (url-safe base64url):  `${alertId}.${sig}`
// Signature: HMAC-SHA256 of alertId (decimal string) using ALERT_UNSUB_SECRET.
//
// We deliberately don't include an expiry — if someone finds a 6-month-old
// Wrap+ digest in their archive, the unsub link should still work. The signing
// secret can be rotated if we ever need to invalidate outstanding tokens.

export async function signAlertId(alertId: number, secret: string): Promise<string> {
  const sig = await hmacHex(secret, String(alertId))
  return `${alertId}.${sig}`
}

export async function verifyAlertToken(
  token: string,
  secret: string,
): Promise<number | null> {
  const dot = token.indexOf('.')
  if (dot <= 0) return null
  const idStr = token.slice(0, dot)
  const sig   = token.slice(dot + 1)
  const id = Number(idStr)
  if (!Number.isInteger(id) || id <= 0) return null
  const expected = await hmacHex(secret, String(id))
  // Constant-time compare to avoid timing oracles.
  if (!timingSafeEqual(sig, expected)) return null
  return id
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(message)))
  let hex = ''
  for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0')
  return hex
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
