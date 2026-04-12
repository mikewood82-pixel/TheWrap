import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fef9f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f7ede4;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#c0623a;stop-opacity:1" />
      <stop offset="60%" style="stop-color:#d4a853;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d4a853;stop-opacity:0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)" />

  <!-- Left edge accent bar -->
  <rect x="0" y="0" width="6" height="630" fill="#c0623a" />

  <!-- Top decorative rule -->
  <rect x="6" y="48" width="1194" height="1" fill="#1a1a1a" opacity="0.12" />

  <!-- Bottom decorative rule -->
  <rect x="6" y="581" width="1194" height="1" fill="#1a1a1a" opacity="0.12" />

  <!-- Top label -->
  <text x="80" y="36" font-family="Georgia, serif" font-size="13" font-weight="400" fill="#1a1a1a" opacity="0.45" letter-spacing="3">INDEPENDENT · EDITORIAL · HR TECHNOLOGY</text>

  <!-- Subtle background circles -->
  <circle cx="980" cy="315" r="320" fill="#c0623a" opacity="0.04" />
  <circle cx="1060" cy="220" r="180" fill="#d4a853" opacity="0.05" />

  <!-- Ornamental rule above headline -->
  <rect x="80" y="162" width="60" height="3" fill="#c0623a" />
  <rect x="148" y="163" width="8" height="1" fill="#d4a853" />

  <!-- Main headline -->
  <text x="80" y="310" font-family="Georgia, 'Times New Roman', serif" font-size="148" font-weight="700" fill="#1a1a1a" letter-spacing="-3">The Wrap</text>

  <!-- Underline accent -->
  <rect x="80" y="328" width="680" height="4" fill="url(#accentLine)" rx="2" />

  <!-- Subheadline -->
  <text x="83" y="396" font-family="Georgia, 'Times New Roman', serif" font-size="38" font-weight="400" fill="#c0623a" letter-spacing="1" font-style="italic">HR Tech News</text>

  <!-- Divider -->
  <circle cx="80" cy="444" r="3" fill="#d4a853" />
  <rect x="92" y="442" width="200" height="1.5" fill="#d4a853" opacity="0.5" />

  <!-- Descriptor -->
  <text x="80" y="486" font-family="system-ui, Arial, sans-serif" font-size="20" font-weight="400" fill="#1a1a1a" opacity="0.55" letter-spacing="0.5">The independent newsletter for HR technology professionals.</text>

  <!-- Footer -->
  <text x="80" y="612" font-family="system-ui, Arial, sans-serif" font-size="16" font-weight="500" fill="#1a1a1a" opacity="0.40" letter-spacing="2">EVERY FRIDAY</text>
  <circle cx="210" cy="607" r="2.5" fill="#c0623a" opacity="0.6" />
  <text x="222" y="612" font-family="system-ui, Arial, sans-serif" font-size="16" font-weight="500" fill="#c0623a" opacity="0.75" letter-spacing="1">ilovethewrap.com</text>

  <!-- Right monogram -->
  <rect x="980" y="220" width="140" height="140" fill="none" stroke="#c0623a" stroke-width="1.5" opacity="0.18" />
  <rect x="992" y="232" width="116" height="116" fill="none" stroke="#d4a853" stroke-width="0.75" opacity="0.2" />
  <text x="1050" y="306" font-family="Georgia, serif" font-size="64" font-weight="700" fill="#c0623a" opacity="0.12" text-anchor="middle" letter-spacing="-2">TW</text>

  <!-- Bottom right stamp -->
  <text x="1120" y="612" font-family="system-ui, Arial, sans-serif" font-size="13" font-weight="400" fill="#1a1a1a" opacity="0.30" text-anchor="end" letter-spacing="1">EST. 2024</text>
</svg>`

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
})

const pngData = resvg.render()
const pngBuffer = pngData.asPng()

const outPath = join(__dirname, '..', 'public', 'og-default.png')
writeFileSync(outPath, pngBuffer)

console.log(`✅ OG image generated: public/og-default.png (${pngBuffer.length} bytes)`)
