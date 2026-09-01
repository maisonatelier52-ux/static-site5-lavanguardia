/**
 * The heavy rule that opens every major homepage section — a thick bar
 * with a thin companion line beneath it, the way a printed page's section
 * flag sits above its column, rather than a plain double hairline.
 */
export default function SectionDivider() {
  return <div aria-hidden="true" className="rule-double" />;
}
