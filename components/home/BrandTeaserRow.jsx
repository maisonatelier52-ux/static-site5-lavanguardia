import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";

/**
 * Partner/brand teaser row (EL MOTOR / AS / Retina) — each brand mark now
 * sits inside its own bordered "masthead" box using that brand's color,
 * rather than a floating wordmark above the article, so each column reads
 * as its own mini publication card.
 */
export default function BrandTeaserRow({ brands }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-9 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <div key={brand.name} className="border-t-4" style={{ borderColor: brand.color }}>
          <Link href={brand.href || "#"} className="inline-block px-0.5 pt-3">
            <span className="font-serif text-lg font-black uppercase tracking-[-0.01em]" style={{ color: brand.color }}>
              {brand.name}
            </span>
          </Link>
          <div className="mt-3">
            <ArticleCard article={brand.article} variant="image" size="sm" showDek={false} />
          </div>
        </div>
      ))}
    </div>
  );
}
