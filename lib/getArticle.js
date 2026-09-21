import us from "@/data/categories/us.json";
import business from "@/data/categories/business.json";
import finance from "@/data/categories/finance.json";
import world from "@/data/categories/world.json";

const CATEGORY_DATA = {
  us,
  business,
  finance,
  world,
};

/**
 * Looks up a single article by its category + slug — the same
 * data/categories/<category>.json files the category listing pages and
 * the homepage already read from. No separate article-detail dataset.
 */
export function getArticle(category, slug) {
  const file = CATEGORY_DATA[category];
  if (!file) return null;
  return file.articles.find((a) => a.slug === slug) || null;
}

/** Display title for a category slug (e.g. "business" -> "Business"). */
export function getCategoryTitle(category) {
  return CATEGORY_DATA[category]?.title || category;
}

export default getArticle;
