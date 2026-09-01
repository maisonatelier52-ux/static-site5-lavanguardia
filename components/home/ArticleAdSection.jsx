import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import TagBadge from "@/components/TagBadge";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

/**
 * Generic "content + ad rail" section, reused for Cryptos, Economy,
 * Markets, and Funds and plans.
 *
 * The lead story now runs as a side-by-side feature strip (image left,
 * headline/dek set large on the right) instead of a stacked image card —
 * this is what makes these four sections read differently from the
 * hero/present/best-of-week sections above them, which all stack image
 * over text. Below the lead, columns of mixed image/text items continue
 * as before, with a sticky ad rail beside the whole thing (never
 * stretched to the content column's height, so a short ad never leaves a
 * dead gap next to taller article columns).
 */
export default function ArticleAdSection({ lead, columns, secondaryRow, adSize = "rail" }) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
      <div>
        {lead && (
          <div className={columns?.length ? "mb-8 border-b border-rule pb-8" : ""}>
            <LeadFeature article={lead} />
          </div>
        )}

        {columns?.length > 0 && (
          <div
            className={`grid grid-cols-1 items-start gap-x-9 gap-y-6 ${
              columns.length >= 2 ? "sm:grid-cols-2 sm:divide-x sm:divide-rule" : ""
            }`}
          >
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="divide-y divide-rule [&>*]:py-5 first:[&>*]:pt-0 sm:px-9 sm:first:pl-0 sm:last:pr-0">
                {col.map((item) => (
                  <ArticleCard
                    key={item.article.id}
                    article={item.article}
                    variant={item.variant || "text"}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {secondaryRow?.length > 0 && (
          <div className="mt-7 grid grid-cols-1 gap-x-9 gap-y-5 border-t border-rule pt-7 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryRow.map((article) => (
              <ArticleCard key={article.id} article={article} variant="text" size="sm" showDek={false} />
            ))}
          </div>
        )}
      </div>

      <div>
        <AdSlot size={adSize} sticky />
      </div>
    </div>
  );
}

function LeadFeature({ article }) {
  if (!article) return null;
  const href = `/${article.category || "article"}/${article.slug}`;

  return (
    <article className="group grid grid-cols-1 gap-5 sm:grid-cols-[1fr_1.2fr] sm:items-center sm:gap-8">
      <Link href={href} className="block overflow-hidden">
        <ImagePlaceholder
          src={article.image}
          alt={article.title}
          className="aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div>
        {article.tag && (
          <p className="mb-2">
            <TagBadge>{article.tag}</TagBadge>
          </p>
        )}
        <h3 className="font-serif text-2xl font-bold leading-[1.15] text-ink text-balance md:text-[1.75rem]">
          <Link href={href} className="hover:text-accent-ink">
            {article.title}
          </Link>
        </h3>
        {article.dek && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{article.dek}</p>}
        {article.author && (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">{article.author}</p>
        )}
      </div>
    </article>
  );
}
