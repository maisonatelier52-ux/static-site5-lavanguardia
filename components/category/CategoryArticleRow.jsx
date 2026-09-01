import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import TagBadge from "@/components/TagBadge";
import { authorSlug } from "@/lib/authorSlug";

/**
 * Category-feed item — used for every article after the section's lead
 * story. Reworked from a single fixed "image-left, text-right" row
 * repeated down the page into a 2-up magazine grid card (image on top,
 * headline/dek/byline below), so a category page reads as a real section
 * front with a proper grid rather than a long uniform list. See
 * CategoryFeed in app/[category]/page.jsx for how the lead story is
 * separated out and given its own larger treatment above this grid.
 *
 * Also reused as-is on the author page (app/authors/[slug]) to list that
 * author's articles.
 */
export default function CategoryArticleRow({ article }) {
  if (!article) return null;
  const href = `/${article.category || "article"}/${article.slug}`;
  const authorHref = article.author ? `/authors/${authorSlug(article.author)}` : null;

  return (
    <article className="group">
      <Link href={href} className="block overflow-hidden">
        <ImagePlaceholder
          src={article.image}
          alt={article.title}
          className="aspect-[16/10] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </Link>

      <div className="mt-4">
        {article.tag && (
          <p>
            <TagBadge>{article.tag}</TagBadge>
          </p>
        )}
        <h3 className={`font-serif text-xl font-bold leading-snug text-ink text-balance ${article.tag ? "mt-1" : ""}`}>
          <Link href={href} className="hover:text-accent-ink">
            {article.title}
          </Link>
        </h3>
        {article.dek && <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{article.dek}</p>}
        {article.author && (
          <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">
            {authorHref ? (
              <Link href={authorHref} className="hover:text-accent">
                {article.author}
              </Link>
            ) : (
              article.author
            )}
          </p>
        )}
      </div>
    </article>
  );
}
