import { notFound } from "next/navigation";
import CategoryBanner from "@/components/category/CategoryBanner";
import CategoryLeadStory from "@/components/category/CategoryLeadStory";
import CategoryArticleRow from "@/components/category/CategoryArticleRow";
import CategoryMostViewed from "@/components/category/CategoryMostViewed";
import AdSlot from "@/components/AdSlot";
import { getHomeContent } from "@/lib/getHomeContent";

// All per-category article data lives in data/categories/<category>.json —
// the single source of truth for article content across the whole site
// (both this page and the homepage read from it; see lib/getHomeContent.js
// for how the homepage's layout resolves against these same files).
const categoryModules = {
  us: () => import("@/data/categories/us.json"),
  business: () => import("@/data/categories/business.json"),
  finance: () => import("@/data/categories/finance.json"),
  world: () => import("@/data/categories/world.json"),
};

async function loadCategoryData(category) {
  const loadCategory = categoryModules[category];
  if (!loadCategory) return null;
  const { default: data } = await loadCategory();
  return data;
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const data = await loadCategoryData(category);
  if (!data) return {};

  const title = `${data.title} News`;
  const description = `The latest ${data.title} headlines from La Vanguardia — breaking news, analysis and in-depth coverage, updated throughout the day.`;

  return {
    title,
    description,
    alternates: { canonical: `/${category}` },
    keywords: [data.title, `${data.title} news`, ...(data.subNav || [])],
    openGraph: {
      title: `${title} | La Vanguardia`,
      description,
      url: `/${category}`,
      type: "website",
    },
    twitter: { title: `${title} | La Vanguardia`, description },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const data = await loadCategoryData(category);
  if (!data) notFound();

  const articles = data.articles || [];

  // The first article becomes the section-front lead story (large feature
  // treatment); everything else runs in the grid feed below it — the way
  // a print section front leads with one story rather than listing every
  // article at equal weight. With only one article (e.g. Sports today),
  // the feed grid is simply empty and only the lead story shows.
  const [leadArticle, ...restArticles] = articles;

  // "Most viewed" in the reference site is a site-wide list, not scoped to
  // the current category — reusing the homepage's own resolved mostViewed
  // items (same categories/*.json data, via the same loader the homepage
  // uses) rather than inventing category-specific data.
  const mostViewed = getHomeContent().mostViewed?.items || [];

  return (
    <div className="bg-page-bg">
      <div className="mx-auto max-w-[1440px] px-6 py-6 md:py-8">
        <CategoryBanner title={data.title} subNav={data.subNav} />

        <div className="mt-9 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main feed */}
          <div>
            {leadArticle ? (
              <>
                <CategoryLeadStory article={leadArticle} />
                {restArticles.length > 0 && (
                  <div className="mt-9 grid grid-cols-1 items-start gap-x-9 gap-y-10 sm:grid-cols-2">
                    {restArticles.map((article) => (
                      <CategoryArticleRow key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="py-16 text-center text-sm text-ink-soft">
                No articles in this section yet — check back soon.
              </p>
            )}
          </div>

          {/* Right rail: sticky ad + Most viewed */}
          <div className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            <AdSlot size="rail" />
            <CategoryMostViewed items={mostViewed} />
          </div>
        </div>
      </div>
    </div>
  );
}
