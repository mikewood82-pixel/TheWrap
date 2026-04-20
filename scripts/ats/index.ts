import type { AtsConnector, AtsSource, NormalizedJob, VendorAtsRef } from './types.js'
import { greenhouse } from './greenhouse.js'
import { lever } from './lever.js'
import { ashby } from './ashby.js'
import { smartrecruiters } from './smartrecruiters.js'
import { workable } from './workable.js'
import { recruitee } from './recruitee.js'

export const connectors: Record<AtsSource, AtsConnector> = {
  greenhouse,
  lever,
  ashby,
  smartrecruiters,
  workable,
  recruitee,
}

export async function fetchVendorJobs(ref: VendorAtsRef): Promise<NormalizedJob[]> {
  const c = connectors[ref.ats]
  if (!c) throw new Error(`no connector for ats=${ref.ats}`)
  return c.fetchJobs(ref)
}

export type { AtsConnector, AtsSource, NormalizedJob, VendorAtsRef }
