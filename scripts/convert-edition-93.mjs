#!/usr/bin/env node
/**
 * Edition #93 — "Workday Rising Road Report" image conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye.
 *
 *   image1.png  1096x633  essay hero — Workday Rising broadcast set, RISING panels
 *
 * Essay-only edition: one image, no news / funding / worth-a-click sections.
 * No tile crop: the hero is a 1.73:1 landscape with no baked-in wordmark, and
 * the homepage tile's center-crop keeps the stage, desk and Workday logo.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/4a717e31-e04b-4a53-a377-1f72a441b39d/scratchpad/docx/word/media'
const OUT = 'C:/Users/mikew/TheWrap-ed93/public/newsletters/edition-93'
const q = 78

mkdirSync(OUT, { recursive: true })

function report(name) {
  const kb = Math.round(statSync(join(OUT, name)).size / 1024)
  return sharp(join(OUT, name)).metadata().then(m => {
    console.log(`  ${name.padEnd(38)} ${String(m.width).padStart(4)}x${String(m.height).padEnd(4)}  ${String(kb).padStart(4)} KB`)
  })
}

// Inline image: flatten any alpha onto white, cap width, WebP q78.
async function inline(src, name, width = 1200) {
  await sharp(join(MEDIA, src))
    .rotate()
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  await report(name)
}

console.log('edition-93 →', OUT)

// ---- hero ----
await inline('image1.png', 'workday-rising-hero.webp', 1600)
