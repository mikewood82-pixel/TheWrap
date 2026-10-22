#!/usr/bin/env node
/**
 * Edition #94 — "The Wrap takes an epic journey to HR Tech" image conversion.
 *
 * Sources come from the extracted docx media folder. The doc has a single
 * drawing (rId6 -> media/image1.gif), confirmed by eye:
 *
 *   image1.gif  480x480, 97 frames, 7.3 MB  essay hero — Odysseus lashed to the
 *                                           mast, shouting (The Odyssey)
 *
 * Essay-only edition: no news / funding sections.
 *
 * The hero stays a GIF (a WebP re-encode would flatten it to a still), but at
 * 7.3 MB it would never load in mobile mail. Prior GIFs shipped at 0.25–1.3 MB,
 * so: drop to 400px, keep every 3rd frame (summing the dropped frames' delays so
 * playback speed is unchanged), 96-colour palette.
 *
 * Tile: the homepage Latest Edition tile can't use an animated square, so a
 * still WebP band from the first frame (face + mast) is set as `tileImage`.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MEDIA = 'C:/Users/mikew/AppData/Local/Temp/claude/C--Users-mikew--claude-agents/b5328656-fb19-4842-b24e-5d193ec6df7a/scratchpad/docx94/word/media'
const OUT = 'C:/Users/mikew/TheWrap-ed94/public/newsletters/edition-94'
const SRC = join(MEDIA, 'image1.gif')

mkdirSync(OUT, { recursive: true })

function report(name) {
  const kb = Math.round(statSync(join(OUT, name)).size / 1024)
  return sharp(join(OUT, name)).metadata().then(m => {
    console.log(`  ${name.padEnd(38)} ${String(m.width).padStart(4)}x${String(m.pageHeight ?? m.height).padEnd(4)}  ${String(kb).padStart(5)} KB  ${m.pages ?? 1} frame(s)`)
  })
}

console.log('edition-94 →', OUT)

// ---- hero — animated, stays GIF ----
const WIDTH = 400, STEP = 3
const meta = await sharp(SRC, { animated: true }).metadata()
const { data, info } = await sharp(SRC, { animated: true })
  .resize({ width: WIDTH })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
const fh = info.height / meta.pages
const fsz = info.width * fh * 4
const frames = [], delay = []
for (let i = 0; i < meta.pages; i += STEP) {
  frames.push(data.subarray(i * fsz, (i + 1) * fsz))
  let d = 0
  for (let j = i; j < Math.min(i + STEP, meta.pages); j++) d += meta.delay[j]
  delay.push(d)
}
await sharp(Buffer.concat(frames), { raw: { width: info.width, height: fh * frames.length, channels: 4, pageHeight: fh } })
  .gif({ colours: 96, effort: 10, dither: 0.6, loop: 0, delay, interFrameMaxError: 6 })
  .toFile(join(OUT, 'odyssey-mast.gif'))
await report('odyssey-mast.gif')

// ---- homepage tile — still band from frame 1 ----
await sharp(SRC, { page: 0 })
  .extract({ left: 0, top: 40, width: 480, height: 190 })
  .webp({ quality: 78 })
  .toFile(join(OUT, 'odyssey-mast-tile.webp'))
await report('odyssey-mast-tile.webp')
