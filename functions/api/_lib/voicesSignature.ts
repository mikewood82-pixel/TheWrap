// HMAC-SHA256 helpers for signing one-click voices-digest unsubscribe links.
// Parallel to alertSignature.ts but keyed on the Clerk user id (string) rather
// than a numeric alert id.
//
// Signed token: `${userIdBase64Url}.${sig}` (dot-separated so . can't appear
// in userId — Clerk ids are `user_<alphanumeric>` which is safe).

export async function signUserId(userId: string, secret: string): Promise<string> {
  const enc = base64urlEncode(userId)
  const sig = await hmacHex(secret, userId)
  return `${enc}.${sig}`
}

export async function verifyUserToken(
  token: string,
  secret: string,
): Promise<string | null> {
  const dot = token.indexOf('.')
  if (dot <= 0) return null
  const encUser = token.slice(0, dot)
  const sig     = token.slice(dot + 1)
  const userId = base64urlDecode(encUser)
  if (!userId) return null
  const expected = await hmacHex(secret, userId)
  if (!timingSafeEqual(sig, expected)) return null
  return userId
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

function base64urlEncode(s: string): string {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlDecode(s: string): string | null {
  try {
    const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    return new TextDecoder().decode(bytes)
  } catch { return null }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
