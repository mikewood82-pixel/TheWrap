#!/usr/bin/env node
/**
 * Edition #92 — "This Is the Future of Work" image conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye, image by image.
 *
 *   rId6  image6.png   814x454   essay hero — surveillance cameras over a tracked crowd
 *   rId7  image3.jpg  1000x563   news — TechWolf x SAP lockup
 *   rId12 image4.jpg  1000x668   news — Glassdoor on a phone
 *   rId14 image5.png   807x475   news — head down on the keyboard
 *   rId19 image1.jpg   825x733   worth a click — eye inside a grid of faces (Uganda)
 *   rId21 image2.png   574x583   worth a click — NYT earnings-by-major chart
 *
 * No tile crop: the hero is a 1.79:1 landscape with no baked-in wordmark, and
 * the homepage tile's center-crop keeps the cameras and the crowd.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/b1028441-8054-4738-bfef-6f16c25f4b86/scratchpad/docx92/word/media'
const OUT = 'C:/Users/mikew/TheWrap-ed92/public/newsletters/edition-92'
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

console.log('edition-92 →', OUT)

// ---- hero ----
await inline('image6.png', 'future-of-work-hero.webp', 1600)

// ---- news ----
await inline('image3.jpg', 'sap-techwolf.webp')
await inline('image4.jpg', 'glassdoor-recruiter.webp')
await inline('image5.png', 'application-abandonment.webp')

// ---- worth a click ----
await inline('image1.jpg', 'uganda-surveillance.webp')
await inline('image2.png', 'college-major-earnings.webp')
