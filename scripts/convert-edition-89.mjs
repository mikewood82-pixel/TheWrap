#!/usr/bin/env node
/**
 * Edition #89 — "The Wrap heads to RecFest" image conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye, image by image.
 *
 *   rId6  image4.png  2048x762   essay hero — RecFest Nashville banner
 *   rId7  image9.png  1936x1370  essay — RecFest site map
 *   rId8  image2.jpg   399x501   essay — Monte & The Monsters at Johnny Cash's
 *   rId9  image1.png   733x411   news — Larry Ellison / Oracle
 *   rId11 image3.png   891x520   news — Boomband profile (Jeff Taylor)
 *   rId13 image10.gif  960x598   news — Recruitics. 15.1MB / 152 frames.
 *                                 Shipped as a STATIC still (frame 100, the
 *                                 pizza-dough spin) per Mike — an animated
 *                                 re-encode still lands ~1.65MB and Outlook
 *                                 only ever shows frame 1 anyway.
 *   rId15 image8.jpg   800x1000  news — Workday CMO announcement
 *   rId19 image5.png   778x304   research — 12Twenty jobs report banner
 *   rId21 image6.png   765x610   hot takes — BLS chart
 *   rId23 image7.png   531x376   worth a click — HAL 9000
 *
 * No tile crop this week: the hero is 2.69:1, which is already the homepage
 * tile's ~2.7:1, so a center-crop takes the whole banner and the wordmark
 * survives. No `tileImage` override needed.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/a5e10049-9c5c-4ea8-bf4e-a8207c67858b/scratchpad/docx/word/media'
const OUT = 'C:/Users/mikew/TheWrap/public/newsletters/edition-89'
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

console.log('edition-89 →', OUT)

// ---- hero ----
await sharp(join(MEDIA, 'image4.png'))
  .flatten({ background: '#ffffff' })
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: q })
  .toFile(join(OUT, 'recfest-nashville-hero.webp'))
await report('recfest-nashville-hero.webp')

// ---- essay ----
await inline('image9.png', 'recfest-nashville-site-map.webp')
await inline('image2.jpg', 'monte-and-the-monsters.webp')

// ---- news ----
await inline('image1.png', 'oracle-larry-ellison.webp')
await inline('image3.png', 'boomband-jeff-taylor-profile.webp')

// Recruitics: single frame out of the animation. `page: N` selects the frame;
// 100 is the dough mid-spin with both guys in shot, which is the frame the copy
// is actually joking about.
await sharp(join(MEDIA, 'image10.gif'), { page: 100 })
  .flatten({ background: '#ffffff' })
  .resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: q })
  .toFile(join(OUT, 'recruitics-frontline-imagery.webp'))
await report('recruitics-frontline-imagery.webp')

await inline('image8.jpg', 'workday-sarah-kennedy-ellis.webp')

// ---- research / hot takes / worth a click ----
await inline('image5.png', '12twenty-jobs-report.webp')
await inline('image6.png', 'bls-exit-concentrated-chart.webp')
await inline('image7.png', 'hal-9000.webp')

console.log('done.')
