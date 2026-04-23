// Editorial pin for the Voices page hero. Swap weekly.
//
// Matching rules (in order):
//   1. If `matchTitle` is set, pick the most recent item from `sourceSlug`
//      whose title contains it (case-insensitive, curly/straight quotes
//      treated as equivalent).
//   2. Otherwise, pick the most recent item from `sourceSlug`.
//
// Set `enabled: false` to hide the hero without deleting the config.

export type VoicesStaffPick = {
  enabled: boolean
  sourceSlug: string
  matchTitle?: string
  note?: string
}

export const voicesStaffPick: VoicesStaffPick = {
  enabled: true,
  sourceSlug: 'beacon-turn',
  matchTitle: "Don't AI-ify Your CEO",
}

// Normalize smart quotes and case so config written with plain ASCII still
// matches post titles pulled from sources that use curly typography.
export function normalizeForMatch(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u2018\u2019\u02BC\u2032`]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}
