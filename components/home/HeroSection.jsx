import ImagePlaceholder from "@/components/ImagePlaceholder";
import ArticleCard from "@/components/ArticleCard";
import TagBadge from "@/components/TagBadge";

/**
 * Homepage hero / trending block — an asymmetric magazine splash rather
 * than three evenly-weighted columns:
 *
 *  - a "Latest" ticker bar runs full-width along the top, styled as a
 *    genuine breaking-news ticker (single-line rows, a live pulse dot,
 *    vertical rules between items) rather than a stacked list — the
 *    previous version mixed a single-line badge with wrapping multi-line
 *    headlines inside one `items-stretch` row, which stretched the badge
 *    down to match the tallest wrapped headline and left a tall block of
 *    empty space beneath the word "Latest". Every row here is a single
 *    truncated line by construction (the standard convention for a news
 *    ticker), so there's no variable-height content left to stretch
 *    against and the mismatch can't recur.
 *  - the center story is the dominant visual: a large image with its
 *    headline overlaid directly on the photo in a bottom scrim, the way a
 *    magazine cover or lead feature treats its hero image.
 *  - left/right rails stay text-led but are framed as a distinct
 *    "In brief" well (tinted panel) so the page reads as hero + sidebar,
 *    not three identical columns.
 */
export default function HeroSection({ left, center, right, latestNews }) {
  const stacked = [...left, ...right];

  return (
    <div>
      {latestNews?.length > 0 && (
        <div className="mb-7 hidden items-stretch border-y-2 border-ink md:flex">
          <span className="flex shrink-0 items-center gap-2 bg-accent px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
            <PulseDot />
            Latest
          </span>
          <ul className="grid flex-1 grid-cols-1 sm:grid-cols-3">
            {latestNews.slice(0, 3).map((item, idx) => (
              <li key={item.id} className={idx > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""}>
                <LatestNewsItem article={item} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_1fr]">
        {/* Center — dominant cover-style feature */}
        <div>
          <CoverArticle article={center} />
        </div>

        {/* Right — "In brief" sidebar well */}
        <div className="bg-panel px-6 py-5">
          <p className="font-serif text-lg font-bold italic text-ink">In brief</p>
          <div className="mt-3 divide-y divide-rule [&>*]:py-3 first:[&>*]:pt-0">
            {stacked.map((article) => (
              <ArticleCard key={article.id} article={article} variant="text" size="md" showDek={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * A small pulse dot beside the "Latest" tag — a live-broadcast convention,
 * purely decorative (no real-time data is implied or fetched).
 */
function PulseDot() {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  );
}

/**
 * One cell in the Latest-news ticker. `h-full` + `items-center` make it
 * fill its grid cell (so the hover background and border rules reach the
 * cell's full, row-matched height), while `truncate` on the headline
 * keeps every cell exactly one line tall — that single-line guarantee is
 * what keeps the whole ticker row a uniform, predictable height with no
 * leftover empty space in any cell.
 */
function LatestNewsItem({ article }) {
  const href = `/${article.category || "article"}/${article.slug}`;
  return (
    <a href={href} className="group flex h-full items-center gap-2.5 px-4 py-3 transition-colors hover:bg-panel">
      {article.time && (
        <span className="shrink-0 font-mono text-[12.5px] font-bold text-accent">{article.time}</span>
      )}
      <span className="min-w-0 truncate text-[13.5px] font-semibold text-ink">
        {article.tag && <TagBadge>{article.tag}</TagBadge>}
        <span className="group-hover:text-accent-ink">{article.title}</span>
      </span>
    </a>
  );
}

/**
 * The hero's signature move: headline set directly over the photograph in
 * a dark gradient scrim, magazine-cover style — distinct from every other
 * "image above, text below" card on the rest of the site.
 */
function CoverArticle({ article }) {
  if (!article) return null;
  const href = `/${article.category || "article"}/${article.slug}`;

  return (
    <article className="group relative overflow-hidden">
      <a href={href} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] md:aspect-[16/10]">
          <ImagePlaceholder
            src={article.image}
            alt={article.title}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        </div>
      </a>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-8">
        {article.tag && (
          <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.05em] text-gold">
            {article.tag}
          </span>
        )}
        <h1 className="font-serif text-[1.5rem] font-bold leading-[1.15] text-white text-balance sm:text-[1.9rem] md:text-[2.5rem]">
          <a href={href} className="pointer-events-auto hover:underline decoration-2 underline-offset-4">
            {article.title}
          </a>
        </h1>
        {article.dek && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/85 md:text-base">{article.dek}</p>
        )}
        {article.author && (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-white/70">{article.author}</p>
        )}
      </div>
    </article>
  );
}
