#!/usr/bin/env node
/**
 * Edition #95 — "Are We Building a Future No One Wants?" image conversion.
 *
 * Sources come from the extracted docx media folder. NOTE: `media/imageN` is
 * docx *upload* order, not document order — the mapping below was resolved from
 * word/_rels/document.xml.rels and then confirmed by eye.
 *
 *   ozgk7yjyy4591.jpg  620x337   essay hero — Ian Malcolm "preoccupied with whether
 *                                you could" meme (Mike swapped this in for the docx's
 *                                image2.png robot-handing-a-folder stock photo)
 *   image3.png         900x507   Microsoft buyouts — Microsoft sign outside office
 *   image1.png         900x600   AI hiring bias — robot hand plucking a red figure
 *   image4.png        1354x697   CodeSignal — Skills Intelligence landing page
 *   image5.png         993x693   Worth a Click — NYT "into the void", APPLY cursors
 *
 * Tile crop: the meme's caption runs across the top and bottom, so the homepage
 * tile's ~2.7:1 center-crop would slice the bottom line. The tile frames the face
 * in the band between the two captions instead.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/a39ca730-71e3-4da4-8ff3-5660ddbd6547/scratchpad/docx/word/media'
const HERO = 'C:/Users/mikew/Downloads/ozgk7yjyy4591.jpg'
const OUT = 'C:/Users/mikew/TheWrap-ed95/public/newsletters/edition-95'
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
  await sharp(src)
    .rotate()
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  await report(name)
}

console.log('edition-95 →', OUT)

// ---- hero ----
await inline(HERO, 'malcolm-could-should.webp', 1600)
await sharp(HERO)
  .extract({ left: 40, top: 55, width: 540, height: 200 })
  .webp({ quality: q })
  .toFile(join(OUT, 'malcolm-could-should-tile.webp'))
await report('malcolm-could-should-tile.webp')

// ---- news ----
await inline(join(MEDIA, 'image3.png'), 'microsoft-buyouts.webp')
await inline(join(MEDIA, 'image1.png'), 'ai-hiring-bias.webp')
await inline(join(MEDIA, 'image4.png'), 'codesignal-skills-intelligence.webp')

// ---- worth a click ----
await inline(join(MEDIA, 'image5.png'), 'gen-z-into-the-void.webp')
