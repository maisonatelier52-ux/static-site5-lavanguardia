import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Ad placeholder slot. Intentionally NOT designed to look like a real ad —
 * just a clearly-labelled dashed box sized to a common IAB ad unit, so you
 * can drop your real ad code/tag in later without me guessing at a fake
 * design for it.
 *
 * `size` picks a natural, common footprint (never stretched to fill a
 * column's full height, which is what caused the leftover gaps on the
 * reference site when a short ad sat next to taller article columns).
 */
const SIZES = {
  // Tall rail unit — sits beside stacked article rows (Economy, Markets, Funds and plans…)
  rail: { label: "Ad space — 300×600", className: "h-[600px] w-full max-w-[300px]" },
  roj: { label: "Ad space — 300×350", className: "h-[350px] w-full max-w-[300px]" },
  // Medium rectangle — sits beside a shorter 3-column block (Present, Cryptos, Most viewed…)
  mrec: { label: "Ad space — 300×250", className: "h-[250px] w-full max-w-[300px]" },
  // Full-width leaderboard — used as its own standalone strip between sections
  leaderboard: { label: "Ad space — 728×90", className: "h-[90px] w-full sm:h-[100px]" },
};

export default function AdSlot({ size = "mrec", sticky = false, className = "" }) {
  const cfg = SIZES[size] || SIZES.mrec;

  return (
    <div className={`flex justify-center lg:justify-start ${sticky ? "lg:sticky lg:top-24" : ""}`}>
      <ImagePlaceholder variant="ad" label={cfg.label} className={`${cfg.className} ${className}`} />
    </div>
  );
}
