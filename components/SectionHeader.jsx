/**
 * "<Title>" heading used at the top of every homepage section — Present,
 * The best of the week, Cryptos, Opinion and analysis, Economy, Extras,
 * Markets, Funds and plans, Most viewed — so the rhythm stays identical
 * throughout.
 *
 * A magazine "running head" reworked for the dark/futuristic system: the
 * italic serif title sits beneath the system's signature teal→violet
 * glow rule (the same `.rule-glow` used on the header/footer edges),
 * with a small glowing accent dot to its left — the kind of section
 * flag you'd see opening a spread in a print magazine, redrawn as a
 * live console readout rather than a plain ink line.
 */
export default function SectionHeader({ title, rightSlot }) {
  return (
    <div>
      <div className="rule-glow w-full" aria-hidden="true" />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="flex items-baseline gap-3 font-serif text-[28px] font-bold italic leading-none text-ink sm:text-[32px]">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
            aria-hidden="true"
          />
          {title}
        </h2>
        {rightSlot && <div className="pb-1">{rightSlot}</div>}
      </div>
    </div>
  );
}
