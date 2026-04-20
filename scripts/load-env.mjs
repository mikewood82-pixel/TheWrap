// Minimal .env loader — no dotenv dependency, works on any Node version.
// Import this at the top of any script that needs `process.env.DEPLOY_SECRET`
// (or other local secrets). Values already in process.env always win; the
// .env file is just a convenience for interactive use.

import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = resolve(repoRoot, '.env')

if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    // Skip blanks and comments
    if (!line.trim() || /^\s*#/.test(line)) continue
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (!m) continue
    const [, key, rawVal] = m
    if (process.env[key]) continue // don't override existing
    // Strip surrounding single/double quotes if present
    process.env[key] = rawVal.replace(/^(['"])(.*)\1$/, '$2')
  }
}
