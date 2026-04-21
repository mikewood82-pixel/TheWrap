/**
 * Feature flags \u2014 flip PLUS_ENABLED to true when ready to launch
 * Vendor Intel and Wrap+ membership, then redeploy.
 */
export const FEATURES = {
  PLUS_ENABLED: false,
  // /voices \u2014 curated hub of outbound HR tech writers, analysts, podcasters.
  // Flip true once the ingest cron has populated voices_items.
  VOICES_ENABLED: false,
}
