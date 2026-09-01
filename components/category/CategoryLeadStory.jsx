import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import TagBadge from "@/components/TagBadge";
import { authorSlug } from "@/lib/authorSlug";

/**
 * The section-front lead story — the first article in a category's list,
 * given a large side-by-side feature treatment (image + big serif
 * headline + dek) so every category page opens with a real "cover story"
 * the way a print section front does, instead of starting straight into
 * a uniform list of equally-weighted rows.
 */
export default function CategoryLeadStory({ article }) {
  if (!article) return null;
  const href = `/${article.category || "article"}/${article.slug}`;
  const authorHref = article.author ? `/authors/${authorSlug(article.author)}` : null;

  return (
    <article className="group grid grid-cols-1 gap-6 border-b-2 border-ink pb-9 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10">
      <Link href={href} className="block overflow-hidden">
        <ImagePlaceholder
          src={article.image}
          alt={article.title}
          className="aspect-[3/2] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div>
        {article.tag && (
          <p className="mb-2">
            <TagBadge>{article.tag}</TagBadge>
          </p>
        )}
        <h2 className="font-serif text-[2rem] font-bold leading-[1.1] text-ink text-balance md:text-[2.4rem]">
          <Link href={href} className="hover:text-accent-ink">
            {article.title}
          </Link>
        </h2>
        {article.dek && <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{article.dek}</p>}
        {article.author && (
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">
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
