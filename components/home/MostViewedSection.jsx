import Link from "next/link";
import AdSlot from "@/components/AdSlot";

/**
 * "Most viewed" — reworked with oversized outline numerals sitting behind
 * each headline, magazine-sidebar style, rather than small inline digits.
 * Still a 1-10 list split into two 5-item columns beside an ad rail,
 * matching the reference's item count and grouping.
 */
export default function MostViewedSection({ items }) {
  const colA = items.slice(0, 5);
  const colB = items.slice(5, 10);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
      <div className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 sm:divide-x sm:divide-rule">
        <div className="sm:pr-10">
          {colA.map((article, idx) => (
            <RankedRow key={article.id} article={article} rank={idx + 1} />
          ))}
        </div>
        <div className="sm:pl-10">
          {colB.map((article, idx) => (
            <RankedRow key={article.id} article={article} rank={idx + 6} />
          ))}
        </div>
      </div>

      <div>
        <AdSlot size="roj" />
      </div>
    </div>
  );
}

function RankedRow({ article, rank }) {
  const href = `/${article.category || "article"}/${article.slug}`;
  return (
    <article className="relative flex items-center gap-1 border-b border-rule py-4 first:pt-0 last:border-b-0">
      <span
        className="pointer-events-none select-none font-serif text-[3.4rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-rule)]"
        aria-hidden="true"
      >
        {rank}
      </span>
      <h3 className="-ml-2 font-serif text-base font-bold leading-snug text-ink">
        <Link href={href} className="hover:text-accent-ink">
          {article.title}
        </Link>
      </h3>
    </article>
  );
}
