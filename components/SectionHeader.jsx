/**
 * "<Title>" heading used at the top of every homepage section — Present,
 * The best of the week, Cryptos, Opinion and analysis, Economy, Extras,
 * Markets, Funds and plans, Most viewed — so the rhythm stays identical
 * throughout.
 *
 * Reworked into a magazine "running head": a large italic serif title
 * sitting directly on a heavy ink rule, with a small solid mark to its
 * left — the kind of section flag you'd see opening a spread in a print
 * magazine, rather than a plain heading with an underline.
 */
export default function SectionHeader({ title, rightSlot }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-t-4 border-ink pt-4">
      <h2 className="flex items-baseline gap-3 font-serif text-[28px] font-bold italic leading-none text-ink sm:text-[32px]">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-navy" aria-hidden="true" />
        {title}
      </h2>
      {rightSlot && <div className="pb-1">{rightSlot}</div>}
    </div>
  );
}
