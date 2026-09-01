import ArticleCard from "@/components/ArticleCard";

/**
 * Reused for "The best of the week", "Extras", and "EL PAÍS" — each of
 * these always resolves to exactly 4 items (see data/homeLayout.js), so
 * rather than a uniform 4-up grid this is composed as a magazine
 * "featured + brief" layout: the first item runs large on the left, the
 * remaining three stack as a tighter brief column on the right — the way
 * a section spread picks one story to lead with instead of giving every
 * item equal weight.
 */
export default function ImageGridSection({ items, columns = 4 }) {
  if (!items?.length) return null;
  const [feature, ...rest] = items;

  return (
    <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.3fr_1fr]">
      <ArticleCard article={feature} variant="image" size="lg" imageAspect="aspect-[3/2]" />

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-0 lg:divide-y lg:divide-rule">
        {rest.map((article) => (
          <div key={article.id} className="lg:py-5 lg:first:pt-0 lg:last:pb-0">
            <ArticleCard article={article} variant="imageRow" />
          </div>
        ))}
      </div>
    </div>
  );
}
