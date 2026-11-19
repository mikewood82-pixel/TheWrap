#!/usr/bin/env node
/**
 * Edition #96 — "Superworker, Super Tired" image conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye.
 *
 *   image7.jpg  1200x675   essay hero — exhausted worker asleep on desk at night
 *   image4.png  1304x734   TechScreen — interview-fraud / Zero Trust recruiting
 *   image1.jpg  2000x1336  Napster — old Napster logo in Internet Explorer
 *   image2.png   729x420   Joveo Tandem — landing page
 *   image3.png   717x577   PitchMe — enrichment wheel graphic
 *   image5.png   537x532   Worth a Click — NYT vacuum among empty desks
 *   image6.png   900x488   Worth a Click — Voyager 1/2 mission map
 *
 * The hero is a plain photo with no wordmark, so the homepage tile's default
 * center-crop is fine and no tileImage override is needed.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/75929915976cf4b3/5d1cb36e-2b52-42c0-9cde-906d73d0a8a6/scratchpad/docx96/word/media'
const OUT = 'C:/Users/mikew/TheWrap-ed96/public/newsletters/edition-96'
const q = 78

mkdirSync(OUT, { recursive: true })

function report(name) {
  const kb = Math.round(statSync(join(OUT, name)).size / 1024)
  return sharp(join(OUT, name)).metadata().then(m => {
    console.log(`  ${name.padEnd(38)} ${String(m.width).padStart(4)}x${String(m.height).padEnd(4)}  ${String(kb).padStart(4)} KB`)
  })
}

// Flatten any alpha onto white, cap width, WebP q78.
async function inline(src, name, width = 1200) {
  await sharp(src)
    .rotate()
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  await report(name)
}

console.log('edition-96 →', OUT)

// ---- hero ----
await inline(join(MEDIA, 'image7.jpg'), 'superworker-super-tired.webp', 1600)

// ---- news ----
await inline(join(MEDIA, 'image4.png'), 'techscreen-interview-fraud.webp')
await inline(join(MEDIA, 'image1.jpg'), 'napster-crews.webp')
await inline(join(MEDIA, 'image2.png'), 'joveo-tandem.webp')
await inline(join(MEDIA, 'image3.png'), 'pitchme-candidateiq.webp')

// ---- worth a click ----
await inline(join(MEDIA, 'image5.png'), 'nyt-ai-wage-bill.webp')
await inline(join(MEDIA, 'image6.png'), 'voyager-one-light-day.webp')
