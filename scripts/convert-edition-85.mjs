// One-off image conversion for edition 85. Reads source images out of the .docx
// media folder, writes WebP (sharp, quality 78; hero <=1600w, inline <=1200w) into
// public/newsletters/edition-85/.
//
// Note: media/imageN is the docx *upload* order, not document order. The mapping
// below is document order, resolved from word/_rels/document.xml.rels.
//
// Two special cases:
//   - The road-trip reaction clip stays a .gif (animated; a WebP re-encode would
//     flatten it to a still). Same as edition 83's ai-interview.gif.
//   - The van's Virginia plate is pixelated before encoding — it belongs to a
//     private individual who stopped to help.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/e33cd8a8-c45c-4f63-9ccc-f14c04c1f5c3/scratchpad/wrap85/extracted/word/media'
const OUT = 'C:/Users/mikew/TheWrap/public/newsletters/edition-85'
mkdirSync(OUT, { recursive: true })

const q = 78
const report = (name, info) =>
  console.log(name.padEnd(38), `${info.width}x${info.height}`.padEnd(11), Math.round(info.size / 1024) + 'KB')

const inline = async (src, name, width = 1200) => {
  const info = await sharp(join(MEDIA, src))
    .flatten({ background: '#ffffff' }) // several sources are RGBA PNGs
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  report(name, info)
}

// ---- doc #1 — hero: Mike with the grandfather and grandson who fixed the van ----
// 1536x2048 portrait. Full width, no upscale.
const hero = await sharp(join(MEDIA, 'image12.jpg'))
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: q })
  .toFile(join(OUT, 'roadside-rescue.webp'))
report('roadside-rescue.webp', hero)

// Homepage "Latest Edition" tile is ~2.7:1. A center-crop of a 3:4 portrait
// decapitates all three subjects, so cut a banner centred on the faces.
const TILE_H = Math.round(1536 / 2.7) // 569
const tile = await sharp(join(MEDIA, 'image12.jpg'))
  .extract({ left: 0, top: 400, width: 1536, height: TILE_H })
  .webp({ quality: q })
  .toFile(join(OUT, 'roadside-rescue-tile.webp'))
report('roadside-rescue-tile.webp', tile)

// ---- doc #2 — animated reaction clip. Stays GIF. ----
const gif = await sharp(join(MEDIA, 'image10.gif'), { animated: true })
  .gif({ colours: 128 })
  .toFile(join(OUT, 'family-road-trip-singing.gif'))
report('family-road-trip-singing.gif', gif)

// ---- doc #3 — the van, with the plate pixelated ----
// Two passes on purpose: sharp honours only one resize() per pipeline, so
// crushing and re-expanding in a single chain silently no-ops (the second
// resize wins and you composite the original pixels straight back on).
const PLATE = { left: 282, top: 460, width: 64, height: 41 }
const crushed = await sharp(join(MEDIA, 'image8.png'))
  .extract(PLATE)
  .resize({ width: 6, height: 4, fit: 'fill' })
  .png()
  .toBuffer()
const plateBlock = await sharp(crushed)
  .resize({ width: PLATE.width, height: PLATE.height, kernel: 'nearest', fit: 'fill' })
  .png()
  .toBuffer()

const van = await sharp(join(MEDIA, 'image8.png'))
  .flatten({ background: '#ffffff' })
  .composite([{ input: plateBlock, left: PLATE.left, top: PLATE.top }])
  .resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: q })
  .toFile(join(OUT, 'green-van-gas-station.webp'))
report('green-van-gas-station.webp', van)

// ---- doc #4-5 — rest of the essay ----
await inline('image11.png', 'van-interior-vhs-console.webp')
await inline('image7.png', 'fixing-the-radiator-hose.webp')

// ---- doc #6-9 — HR Tech News ----
await inline('image1.jpg', 'joveo-chatgpt-jobs.webp')
await inline('image9.png', 'deepmind-application-workaround.webp')
await inline('image6.png', 'hireez-agentic.webp')
await inline('image3.png', 'did-they-ghost-you.webp')

// ---- doc #10 — Hot Takes ----
await inline('image5.jpg', 'thomas-otter-workday.webp')

// ---- doc #11-12 — Worth a Click ----
await inline('image4.png', 'youtube-view-count.webp')
await inline('image2.jpg', 'zuckerberg-ai-future.webp')
