#!/usr/bin/env node
/**
 * Edition #90 — "Road Report: RecFest USA, Nashville" image conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye, image by image.
 *
 *   rId6  image3.png   846x612   essay hero — RECFEST marquee letters, Geodis Park
 *   rId7  image5.png  2048x1112  news — ZoomInfo Talent Autopilot pipeline UI
 *   rId9  image2.jpg   480x360   news — Findem Studio (YouTube thumbnail; the
 *                                 black letterbox bars are trimmed off)
 *   rId11 image6.png  1080x720   news — Joveo agentic recruiting illustration
 *   rId13 image7.png  2000x1200  news — HireClix press release card
 *   rId15 image1.jpg   500x455   news — RippleMatch "Now Free for All Universities"
 *   rId19 image4.png   769x480   worth a click — a16z AI school students
 *
 * Tile crop: the hero is ~1.38:1, and a center-crop to the homepage tile's
 * ~2.7:1 clips the bottom of the RECFEST letters, so a banner crop anchored on
 * the letters ships as recfest-road-report-tile.webp (set as `tileImage`).
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/45560dc1-0c21-497b-8bb6-2512471fc012/scratchpad/docx/word/media'
const OUT = 'C:/Users/mikew/TheWrap-ed90/public/newsletters/edition-90'
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
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  await report(name)
}

console.log('edition-90 →', OUT)

// ---- hero ----
await inline('image3.png', 'recfest-road-report-hero.webp', 1600)

// ---- homepage tile (~2.7:1 banner anchored on the letters) ----
await sharp(join(MEDIA, 'image3.png'))
  .extract({ left: 0, top: 215, width: 846, height: 313 })
  .webp({ quality: q })
  .toFile(join(OUT, 'recfest-road-report-tile.webp'))
await report('recfest-road-report-tile.webp')

// ---- news ----
await inline('image5.png', 'zoominfo-talent-autopilot.webp')
await sharp(join(MEDIA, 'image2.jpg'))
  .trim({ threshold: 30 })
  .webp({ quality: 85 })
  .toFile(join(OUT, 'findem-studio.webp'))
await report('findem-studio.webp')
await inline('image6.png', 'joveo-agentic-platform.webp')
await inline('image7.png', 'hireclix-ebn.webp')
await inline('image1.jpg', 'ripplematch-free-for-universities.webp')

// ---- worth a click ----
await inline('image4.png', 'a16z-ai-school.webp')
