import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import TagBadge from "@/components/TagBadge";

/**
 * Reusable article teaser card for the homepage.
 *
 * variants:
 *  - "text"       headline-only item (no image). size: "lg" | "md" | "sm"
 *  - "image"      image + headline below + optional byline/dek
 *  - "imageRow"   compact horizontal row: small square thumbnail + headline
 *  - "opinion"    italic serif headline, columnist tone
 *  - "latestNews" compact timestamp + tag + headline row
 *  - "numbered"   index number + headline (Most viewed list)
 */
export default function ArticleCard({
  article,
  variant = "text",
  size = "md",
  showDek = true,
  showByline = true,
  imageAspect = "aspect-[16/10]",
  className = "",
}) {
  if (!article) return null;
  const href = `/${article.category || "article"}/${article.slug}`;

  if (variant === "image") {
    return (
      <article className={`group flex flex-col ${className}`}>
        <Link href={href} className="block overflow-hidden">
          <ImagePlaceholder
            src={article.image}
            alt={article.title}
            className={`${imageAspect} w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
          />
        </Link>
        <h3
          className={`font-serif font-bold leading-[1.2] text-ink text-balance ${
            size === "lg" ? "mt-4 text-[1.85rem] md:text-[2.1rem]" : size === "sm" ? "mt-3 text-base" : "mt-3.5 text-lg"
          }`}
        >
          {article.tag && (
            <span className="mb-1 block">
              <TagBadge>{article.tag}</TagBadge>
            </span>
          )}
          <Link href={href} className="hover:text-accent-ink">
            {article.title}
          </Link>
        </h3>
        {showDek && article.dek && <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{article.dek}</p>}
        {showByline && article.author && (
          <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">{article.author}</p>
        )}
      </article>
    );
  }

  if (variant === "imageRow") {
    return (
      <article className={`group flex gap-4 ${className}`}>
        <Link href={href} className="block w-24 shrink-0 overflow-hidden sm:w-28">
          <ImagePlaceholder
            src={article.image}
            alt={article.title}
            className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base font-bold leading-snug text-ink text-balance">
            {article.tag && (
              <span className="mb-1 block">
                <TagBadge>{article.tag}</TagBadge>
              </span>
            )}
            <Link href={href} className="hover:text-accent-ink">
              {article.title}
            </Link>
          </h3>
          {showByline && article.author && (
            <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">
              {article.author}
            </p>
          )}
        </div>
      </article>
    );
  }

  if (variant === "opinion") {
    return (
      <article>
        {article.kicker && (
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-accent">{article.kicker}</p>
        )}
        <h3 className={`font-serif italic font-semibold leading-snug text-ink ${article.kicker ? "mt-2" : ""} text-[19px]`}>
          {article.tag && <TagBadge>{article.tag}</TagBadge>}
          <Link href={href} className="hover:text-accent-ink">
            {article.title}
          </Link>
        </h3>
        {showDek && article.dek && <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{article.dek}</p>}
        {showByline && article.author && (
          <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">{article.author}</p>
        )}
      </article>
    );
  }

  if (variant === "latestNews") {
    return (
      <article className="flex gap-2.5 py-3 text-[14.5px] leading-snug">
        {article.time && <span className="shrink-0 font-bold text-accent">{article.time}</span>}
        <span className="text-ink">
          {article.tag && <TagBadge>{article.tag}</TagBadge>}
          <Link href={href} className="font-semibold hover:text-accent-ink">
            {article.title}
          </Link>
        </span>
      </article>
    );
  }

  if (variant === "numbered") {
    return (
      <article className="flex items-baseline gap-4">
        <span className="w-6 shrink-0 font-serif text-[22px] font-bold leading-none text-ink-faint">{article.rank}</span>
        <h3 className="font-serif text-base font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-accent-ink">
            {article.title}
          </Link>
        </h3>
      </article>
    );
  }

  // "text" (default)
  return (
    <article>
      <h3
        className={`font-serif font-bold leading-snug text-ink text-balance ${
          size === "lg" ? "text-[1.4rem] md:text-[1.6rem]" : size === "sm" ? "text-[15px]" : "text-lg"
        }`}
      >
        {article.tag && <TagBadge>{article.tag}</TagBadge>}
        <Link href={href} className="hover:text-accent-ink">
          {article.title}
        </Link>
      </h3>
      {showDek && article.dek && <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{article.dek}</p>}
      {showByline && article.author && (
        <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">{article.author}</p>
      )}
    </article>
  );
}
