// One-off image conversion for edition 83. Reads source images, writes WebP
// (sharp, quality 78; hero <=1600w, inline <=1200w) into public/newsletters/edition-83/.
// Hero is banner-cropped to strip the VEVO watermark rows top/bottom.
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/7a376cfd-156c-4cd3-b3b7-b3351ecc563b/scratchpad/wrap_extract/unpacked/word/media'
const HERO_SRC = 'C:/Users/mikew/Downloads/hq720.jpg'
const OUT = 'C:/Users/mikew/TheWrap/public/newsletters/edition-83'
mkdirSync(OUT, { recursive: true })

const q = 78
const inline = async (src, name, width = 1200) => {
  const info = await sharp(join(MEDIA, src))
    .flatten({ background: '#ffffff' }) // drop alpha on white (image8 is RGBA)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB')
}

// Hero: 686x386. Trim top 48px (top watermark) + bottom 62px (VEVO logo/text) -> 686x276.
const heroInfo = await sharp(HERO_SRC)
  .extract({ left: 0, top: 48, width: 686, height: 276 })
  .webp({ quality: q })
  .toFile(join(OUT, 'i-want-it-that-way.webp'))
console.log('i-want-it-that-way.webp', heroInfo.width + 'x' + heroInfo.height, Math.round(heroInfo.size / 1024) + 'KB')

// Tile: 2.7:1 banner (686x254) centered within the trimmed region.
const tileInfo = await sharp(HERO_SRC)
  .extract({ left: 0, top: 59, width: 686, height: 254 })
  .webp({ quality: q })
  .toFile(join(OUT, 'i-want-it-that-way-tile.webp'))
console.log('i-want-it-that-way-tile.webp', tileInfo.width + 'x' + tileInfo.height, Math.round(tileInfo.size / 1024) + 'KB')

// Story / essay inline images (document order)
await inline('image4.png', 'four-chord-resume.webp')          // Modern Anthems chart (essay inline)
await inline('image6.png', 'axis-of-awesome-chords.webp')     // I-V-vi-IV chord loop
await inline('image8.png', 'ai-resume-ats-scoring.webp')      // ATS scoring infographic
await inline('image7.png', 'openai-presence.webp')            // OpenAI Presence
await inline('image3.png', 'shrm-insurance-suit.webp')        // SHRM insurer suit
await inline('image1.png', 'eu-ai-act.webp')                  // EU AI Act
await inline('image10.jpg', 'gartner-entry-level.webp')       // Gartner masks
await inline('image5.png', 'meta-louisiana-data-center.webp') // Meta Louisiana
await inline('image2.png', 'aca-uninsured-hospitals.webp')    // ACA / trauma center

// Animated GIF: keep as-is (universally email-safe; already 251KB)
copyFileSync(join(MEDIA, 'image9.gif'), join(OUT, 'ai-interview.gif'))
console.log('ai-interview.gif copied (kept animated)')
