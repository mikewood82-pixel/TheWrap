// ─── Wrap+ is free for all subscribers (2026-05-22 pivot) ─────────────
// This component used to render a "Wrap+ paywall" overlay on top of a
// blurred preview when the visitor wasn't a paying Plus subscriber.
// After the free-for-all pivot, it renders its children unconditionally
// and ignores the `preview` and `feature` props. Kept around so the
// dozens of `<ProGate>...</ProGate>` call sites across the codebase
// keep compiling — a future cleanup pass can rip those wrappers out
// and delete this file. The full plan lives at
// C:\Users\mikew\.claude\plans\elegant-crafting-gizmo.md
// ──────────────────────────────────────────────────────────────────────

interface ProGateProps {
  children: React.ReactNode
  preview?: React.ReactNode
  feature?: string
}

export default function ProGate({ children }: ProGateProps) {
  return <>{children}</>
}
