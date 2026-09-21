/**
 * Small category tag that precedes a headline, showing the article's
 * section using the same category names as the header nav (e.g.
 * "Economy", "Opinion", "Society") rather than cryptic abbreviations, so
 * every visible label maps to a real nav category.
 *
 * Set in monospace with a small glowing dot ahead of it — a "live data
 * readout" tag rather than a printed section flag — since this is one of
 * the most-repeated elements on the page and the clearest place to carry
 * the system's HUD/console motif.
 */
export default function TagBadge({ children }) {
  if (!children) return null;
  return (
    <span className="mr-2 inline-flex items-center gap-1.5 align-middle font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
      <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]" aria-hidden="true" />
      {children}
    </span>
  );
}
