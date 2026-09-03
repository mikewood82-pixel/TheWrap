// One-off image conversion for edition 87. Reads source images out of the .docx
// media folder, writes WebP (sharp, quality 78; hero <=1600w, inline <=1200w) into
// public/newsletters/edition-87/.
//
// Note: media/imageN is the docx *upload* order, not document order. The mapping
// below is document order, resolved from word/_rels/document.xml.rels and
// confirmed by opening each file. This week they disagree badly — the hero is
// media/image1.jpg but the second doc image is media/image6.gif.
//
// Two things worth knowing about this week's sources:
//   - The Flex Tape clip stays a .gif (animated, 42 frames; a WebP re-encode
//     would flatten it to a still). Same as editions 83 and 85.
//   - The hero is only 639x480 — the smallest hero we've shipped. Encoded at
//     native width rather than upscaled; the tile is cropped from the top so the
//     "new release" sign survives the homepage 2.7:1 object-cover.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/904d76da-4a53-421e-be6f-62f66982a1b7/scratchpad/docx/word/media'
const OUT = 'C:/Users/mikew/TheWrap/public/newsletters/edition-87'
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

// ---- doc #1 — hero: the video store new-release wall ----
const hero = await sharp(join(MEDIA, 'image1.jpg'))
  .resize({ width: 1600, withoutEnlargement: true }) // no-op at 639w; kept for consistency
  .webp({ quality: q })
  .toFile(join(OUT, 'video-store-new-release-wall.webp'))
report('video-store-new-release-wall.webp', hero)

// Homepage "Latest Edition" tile is ~2.7:1. A centre crop of this 4:3 frame
// slices off the "new release" sign, which is the whole point of the image, so
// the crop is biased toward the top.
const tile = await sharp(join(MEDIA, 'image1.jpg'))
  .extract({ left: 0, top: 40, width: 639, height: 237 })
  .webp({ quality: q })
  .toFile(join(OUT, 'video-store-new-release-wall-tile.webp'))
report('video-store-new-release-wall-tile.webp', tile)

// ---- doc #2 — animated Flex Tape clip. Stays GIF. ----
const gif = await sharp(join(MEDIA, 'image6.gif'), { animated: true })
  .gif({ colours: 128 })
  .toFile(join(OUT, 'flex-tape-pipeline.gif'))
report('flex-tape-pipeline.gif', gif)

// ---- doc #3-5 — HR Tech News ----
await inline('image7.jpg', 'icims-intelligent-hiring-platform.webp')
await inline('image8.jpg', 'hr-tech-preview-elvis.webp')
await inline('image4.jpg', 'adp-august-payrolls.webp')

// ---- doc #6 — Hot Takes ----
await inline('image2.jpg', 'hibob-salesforce-investment.webp')

// ---- doc #7-8 — Worth a Click ----
await inline('image5.png', 'lawn-care-youtuber.webp')
await inline('image3.png', 'mapquest-lake-ontario.webp')
