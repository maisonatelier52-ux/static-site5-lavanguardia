import us from "@/data/categories/us.json";
import business from "@/data/categories/business.json";
import finance from "@/data/categories/finance.json";
import world from "@/data/categories/world.json";
import { getAllAuthors } from "@/lib/getAuthors";

const CATEGORY_DATA = [us, business, finance, world];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Auto-generated from the same data every page already reads —
 * data/categories/*.json for category + article URLs, lib/getAuthors.js
 * for author URLs — so it can never drift out of sync with what
 * actually exists on the site. Next.js serves this at /sitemap.xml.
 */
export default function sitemap() {
  const now = new Date();

  const staticEntries = [{ url: siteUrl, lastModified: now, changeFrequency: "hourly", priority: 1 }];

  const categoryEntries = CATEGORY_DATA.map((file) => ({
    url: `${siteUrl}/${file.category}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: 0.9,
  }));

  const articleEntries = CATEGORY_DATA.flatMap((file) =>
    (file.articles || []).map((article) => ({
      url: `${siteUrl}/${file.category}/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : now,
      changeFrequency: "daily",
      priority: 0.7,
    }))
  );

  const authorEntries = getAllAuthors().map((author) => ({
    url: `${siteUrl}/authors/${author.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...categoryEntries, ...articleEntries, ...authorEntries];
}
