// One-off image conversion for edition 88. Reads source images out of the .docx
// media folder, writes WebP (sharp, quality 78; hero <=1600w, inline <=1200w) into
// public/newsletters/edition-88/.
//
// Note: media/imageN is the docx *upload* order, not document order. The mapping
// below is document order, resolved from word/_rels/document.xml.rels and
// confirmed by opening each file — the hero is media/image3.jpg.
//
// All three sources are small (under 700w), so everything encodes at native
// width rather than being upscaled.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/9d9cd41e-59cd-423d-9e23-9889477652a5/scratchpad/docx/word/media'
const OUT = 'C:/Users/mikew/TheWrap/public/newsletters/edition-88'
mkdirSync(OUT, { recursive: true })

const q = 78
const report = (name, info) =>
  console.log(name.padEnd(38), `${info.width}x${info.height}`.padEnd(11), Math.round(info.size / 1024) + 'KB')

const inline = async (src, name, width = 1200) => {
  const info = await sharp(join(MEDIA, src))
    .flatten({ background: '#ffffff' }) // the bonobo source is an RGBA PNG
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  report(name, info)
}

// ---- doc #1 — hero: Gander airport crew and volunteers under the GANDER sign ----
const hero = await sharp(join(MEDIA, 'image3.jpg'))
  .resize({ width: 1600, withoutEnlargement: true }) // no-op at 624w; kept for consistency
  .webp({ quality: q })
  .toFile(join(OUT, 'gander-airport-group-photo.webp'))
report('gander-airport-group-photo.webp', hero)

// Homepage "Latest Edition" tile is ~2.7:1. A centre crop of this 624x500 frame
// cuts off the front rows of the crowd, so the crop is biased low to keep the
// GANDER sign and the people together.
const tile = await sharp(join(MEDIA, 'image3.jpg'))
  .extract({ left: 0, top: 225, width: 624, height: 240 })
  .webp({ quality: q })
  .toFile(join(OUT, 'gander-airport-group-photo-tile.webp'))
report('gander-airport-group-photo-tile.webp', tile)

// ---- doc #2 — iceberg off the Newfoundland coast ----
await inline('image1.jpg', 'newfoundland-iceberg-coast.webp')

// ---- doc #3 — Gander and Unga, the bonobos ----
await inline('image2.png', 'gander-and-unga-bonobos.webp')
