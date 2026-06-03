// One-off: fetch the YouTube thumbnail for the first Wrapline segment and
// re-encode it to WebP for use in the newsletter in-issue section.
// Run: node scripts/make-wrapline-thumb.mjs
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const id = 'bJCsX7kVMxY'
const out = 'public/wrapline/kristy-mccann-skillcycle.webp'
const urls = [
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
]

let buf = null
let used = null
for (const u of urls) {
  const r = await fetch(u)
  if (r.ok) {
    buf = Buffer.from(await r.arrayBuffer())
    used = u
    break
  }
}
if (!buf) {
  console.error('no thumbnail available')
  process.exit(1)
}

const meta = await sharp(buf).metadata()
const webp = await sharp(buf)
  .resize({ width: Math.min(1200, meta.width), withoutEnlargement: true })
  .webp({ quality: 78 })
  .toBuffer()
await writeFile(out, webp)

const info = await sharp(webp).metadata()
console.log(`source: ${used} (${meta.width}x${meta.height})`)
console.log(`wrote:  ${out} (${info.width}x${info.height}, ${(webp.length / 1024).toFixed(1)} KB)`)
