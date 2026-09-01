import atTheMinute from "@/data/categories/at-the-minute.json";
import cities from "@/data/categories/cities.json";
import culture from "@/data/categories/culture.json";
import economy from "@/data/categories/economy.json";
import events from "@/data/categories/events.json";
import international from "@/data/categories/international.json";
import opinion from "@/data/categories/opinion.json";
import policy from "@/data/categories/policy.json";
import pop from "@/data/categories/pop.json";
import society from "@/data/categories/society.json";
import sports from "@/data/categories/sports.json";

const CATEGORY_DATA = {
  "at-the-minute": atTheMinute,
  cities,
  culture,
  economy,
  events,
  international,
  opinion,
  policy,
  pop,
  society,
  sports,
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

/** Display title for a category slug (e.g. "economy" -> "Economy"). */
export function getCategoryTitle(category) {
  return CATEGORY_DATA[category]?.title || category;
}

export default getArticle;
