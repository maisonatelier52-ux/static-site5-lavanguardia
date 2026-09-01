import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

/**
 * "Present" section — 3 columns:
 *  - left: one image-led lead story (given a bolder, larger treatment so
 *    this section reads differently from the Hero above it) + a stack of
 *    text articles below
 *  - middle: opinion-style items marked with a large quote glyph (an
 *    editorial-page convention), an image item, a sponsored-content card
 *  - right: a single ad slot
 *
 * Columns use `items-start` (the grid default) rather than being forced to
 * equal height, so a short ad never leaves a dead gap next to taller
 * article content, and vice versa.
 */
export default function PresentSection({ left, middle, sponsored }) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_1fr_0.7fr] lg:gap-0">
      {/* Left column — lead treatment, larger than a standard "image" card */}
      <div className="lg:pr-9">
        <ArticleCard article={left.lead} variant="image" size="lg" imageAspect="aspect-[4/3]" />
        <div className="mt-6 divide-y divide-rule [&>*]:py-5 first:[&>*]:pt-0">
          {left.items.map((article) => (
            <ArticleCard key={article.id} article={article} variant="text" />
          ))}
        </div>
      </div>

      {/* Middle column */}
      <div className="lg:border-l lg:border-rule lg:px-9">
        <span className="font-serif text-5xl leading-none text-panel-line" aria-hidden="true">
          &ldquo;
        </span>
        <div className="-mt-6 divide-y divide-rule [&>*]:pb-5 [&>*:not(:first-child)]:pt-5">
          {middle.opinionItems.map((article) => (
            <ArticleCard key={article.id} article={article} variant="opinion" />
          ))}
        </div>

        <div className="mt-5 border-t border-rule pt-5">
          <ArticleCard article={middle.imageItem} variant="image" />
        </div>

        <div className="mt-5 border-t border-rule pt-5">
          <ArticleCard article={middle.textItem} variant="text" />
        </div>
      </div>

      {/* Right column */}
      <div className="lg:border-l lg:border-rule lg:pl-9">
        <AdSlot size="rail" sticky />
      </div>
    </div>
  );
}
