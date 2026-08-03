// Remembered email for the per-user email features (job alerts, vendor alerts,
// Voices digest). Since the site has no accounts, the user types an email the
// first time they set up an alert; we stash it locally so subsequent alert/
// follow actions are one click instead of re-prompting. This is a convenience
// cache only — the server independently validates the email against the
// newsletter-subscriber list on every write.

const KEY = 'wrap_email'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim())
}

export function getRememberedEmail(): string {
  try {
    return localStorage.getItem(KEY)?.trim() ?? ''
  } catch {
    return ''
  }
}

export function setRememberedEmail(email: string): void {
  try {
    localStorage.setItem(KEY, email.trim().toLowerCase())
  } catch {
    /* private mode / storage disabled — remembering is best-effort */
  }
}
