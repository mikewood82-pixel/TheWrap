import { vendors } from '../data/vendors'
import { vendorDetails } from '../data/vendorDetails'

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

export function parseNewsDate(s: string): Date | null {
  const m = s.trim().match(/^(\w{3})\s+(\d{4})$/)
  if (!m) return null
  const month = MONTHS[m[1]]
  if (month === undefined) return null
  const year = parseInt(m[2], 10)
  if (Number.isNaN(year)) return null
  return new Date(year, month, 1)
}

export type Announcement = {
  vendorSlug: string
  vendorName: string
  vendorWebsite: string
  vendorCategory: string
  headline: string
  date: string
  parsedDate: Date
  source: string
}

export function aggregateAnnouncements(): Announcement[] {
  const items: Announcement[] = []
  for (const [slug, detail] of Object.entries(vendorDetails)) {
    if (!detail.news?.length) continue
    const vendor = vendors.find(v => v.slug === slug)
    if (!vendor) continue
    for (const item of detail.news) {
      const parsed = parseNewsDate(item.date)
      if (!parsed) continue
      items.push({
        vendorSlug: slug,
        vendorName: vendor.name,
        vendorWebsite: vendor.website,
        vendorCategory: vendor.category,
        headline: item.headline,
        date: item.date,
        parsedDate: parsed,
        source: item.source,
      })
    }
  }
  return items.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime())
}
