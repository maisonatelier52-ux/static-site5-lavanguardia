import Link from "next/link";

/**
 * "Most viewed" numbered list for the category page's right rail — see
 * to-be-done-as-right-section.png. Same numbered treatment as the
 * homepage's Most viewed section, but stacked in a single column (the
 * homepage uses two columns because its rail is much wider).
 *
 * Deliberately a standalone component rather than a reuse of
 * ArticleCard's "numbered" variant + MostViewedSection's 2-column layout,
 * so the homepage's Most viewed section is never touched by category-page
 * changes.
 */
export default function CategoryMostViewed({ items = [] }) {
  if (!items.length) return null;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold leading-none text-ink">
        Most viewed
        <span className="mt-3 block h-[3px] w-9 bg-accent" aria-hidden="true" />
      </h2>

      <ol className="mt-6 divide-y divide-rule">
        {items.map((article, idx) => {
          const href = `/${article.category || "article"}/${article.slug}`;
          return (
            <li key={article.id} className="flex items-baseline gap-3.5 py-4 first:pt-0">
              <span className="w-5 shrink-0 font-serif text-xl font-bold leading-none text-ink-faint">{idx + 1}</span>
              <h3 className="font-serif text-[15px] font-bold leading-snug text-ink">
                <Link href={href} className="hover:text-accent-ink">
                  {article.title}
                </Link>
              </h3>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
