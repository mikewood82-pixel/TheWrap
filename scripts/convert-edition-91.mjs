#!/usr/bin/env node
/**
 * Edition #91 — "Surveillance Pricing Is One Way AI Is Destroying Us" image
 * conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye, image by image.
 *
 *   rId6  image6.jpg  1065x799   essay hero — Mike and his dad on a desert tee box
 *   rId7  image4.png  1372x627   essay inline — tee-time grid, $110.12 vs $128.12
 *   rId8  image1.png   820x426   news — LinkedIn "Hiring Assistant 2"
 *   rId10 image3.png  1480x833   news — confused candidate on the phone with a bot
 *   rId13 image2.png   537x264   news — PitchMe SONAR wordmark
 *   rId21 image8.png  2048x1152  podcasts — Totally Talent, David Cohen
 *   rId24 image7.png   554x471   worth a click — Mean Girls still
 *   rId27 image5.png  1024x954   worth a click — Bear 89 at Katmai
 *
 * Tile crop: the hero is ~1.33:1 with both golfers in the upper-middle, and a
 * center-crop to the homepage tile's ~2.7:1 cuts them off at the knees, so a
 * banner crop anchored on the two of them ships as golf-with-dad-tile.webp
 * (set as `tileImage`).
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/a036f36f-ba7b-474d-8174-7e4c4c6d6cc4/scratchpad/docx/word/media'
const OUT = 'C:/Users/mikew/TheWrap-ed91/public/newsletters/edition-91'
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

console.log('edition-91 →', OUT)

// ---- hero ----
await inline('image6.jpg', 'golf-with-dad-hero.webp', 1600)

// ---- homepage tile (~2.7:1 banner anchored on the two golfers) ----
await sharp(join(MEDIA, 'image6.jpg'))
  .rotate()
  .extract({ left: 0, top: 195, width: 1065, height: 394 })
  .webp({ quality: q })
  .toFile(join(OUT, 'golf-with-dad-tile.webp'))
await report('golf-with-dad-tile.webp')

// ---- essay inline ----
await inline('image4.png', 'tee-time-dynamic-pricing.webp')

// ---- news ----
await inline('image1.png', 'linkedin-hiring-assistant-2.webp')
await inline('image3.png', 'ai-interview-walkaways.webp')
await inline('image2.png', 'pitchme-sonar.webp')

// ---- podcasts ----
await inline('image8.png', 'totally-talent-eeo-is-not-dei.webp')

// ---- worth a click ----
await inline('image7.png', 'mean-girls.webp')
await inline('image5.png', 'fat-bear-week-backpack.webp')
