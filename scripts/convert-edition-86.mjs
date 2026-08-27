// One-off image conversion for edition 86. Reads source images out of the .docx
// media folder, writes WebP (sharp, quality 78; hero <=1600w, inline <=1200w) into
// public/newsletters/edition-86/.
//
// Note: media/imageN is the docx *upload* order, not document order. The mapping
// below is document order, resolved from word/_rels/document.xml.rels and
// confirmed by opening each file.
//
// No animated GIFs this week, so every output is WebP.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/41362970-0f3c-4b49-ab94-1f634b945115/scratchpad/ed83/x/word/media'
const OUT = 'C:/Users/mikew/TheWrap/public/newsletters/edition-86'
mkdirSync(OUT, { recursive: true })

const q = 78
const report = (name, info) =>
  console.log(name.padEnd(34), `${info.width}x${info.height}`.padEnd(11), Math.round(info.size / 1024) + 'KB')

const inline = async (src, name, width = 1200) => {
  const info = await sharp(join(MEDIA, src))
    .flatten({ background: '#ffffff' }) // several sources are RGBA PNGs
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(join(OUT, name))
  report(name, info)
}

// ---- doc #1 — hero: recruiter buried in job applications ----
// 2048x1143 landscape. Subject is centred, so the homepage tile's ~2.7:1
// object-cover crop keeps his face — no separate tileImage needed.
const hero = await sharp(join(MEDIA, 'image8.jpg'))
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: q })
  .toFile(join(OUT, 'drowning-in-applications.webp'))
report('drowning-in-applications.webp', hero)

// ---- doc #2-4 — HR Tech News ----
await inline('image6.png', 'top-hr-products-badge.webp')
await inline('image5.png', 'gp-mcp-server.webp')
await inline('image4.png', 'otter-ai-privacy-ruling.webp')

// ---- doc #5 — Labor Market ----
await inline('image3.png', 'uk-graduate-vacancies.webp')

// ---- doc #6 — Podcasts ----
await inline('image1.png', 'executive-search-ai-era.webp')

// ---- doc #7-8 — Worth a Click ----
await inline('image7.png', 'nyc-911-tour-guide.webp')
await inline('image2.png', 'bill-gates-turbulent-ai.webp')
