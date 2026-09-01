/**
 * Small category tag badge that precedes a headline, showing the
 * article's section using the same category names as the header nav
 * (e.g. "Economy", "Opinion", "Society") rather than cryptic
 * abbreviations, so every visible label maps to a real nav category.
 * Set in the accent color directly against the page rather than boxed in
 * a filled chip, closer to how a printed section flag reads inline with
 * a headline.
 */
export default function TagBadge({ children }) {
  if (!children) return null;
  return (
    <span className="mr-2 inline-block align-middle text-[11px] font-bold text-accent">
      {children}
    </span>
  );
}
