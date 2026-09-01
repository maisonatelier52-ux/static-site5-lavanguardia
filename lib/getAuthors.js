import { authorSlug, parseByline } from "./authorSlug";

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

const CATEGORY_DATA = [
  atTheMinute,
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
];

const CATEGORY_TITLES = Object.fromEntries(CATEGORY_DATA.map((f) => [f.category, f.title]));

/**
 * Author index derived entirely from data/categories/*.json — the same
 * byline strings already attached to real articles across the site.
 * There is no separate author dataset and no author who doesn't already
 * appear as an `author` field on at least one article: every entry here
 * is discovered from the site's own content, never hand-added.
 *
 * Each author record:
 *   {
 *     slug, raw, name, location,
 *     categories: ["economy", "policy"],   // every category they've written in
 *     articles: [ ...full article objects, most-referenced-category-first ],
 *   }
 */
function buildAuthorIndex() {
  const bySlug = new Map();

  for (const file of CATEGORY_DATA) {
    for (const article of file.articles || []) {
      const raw = article.author;
      if (!raw) continue;

      const slug = authorSlug(raw);
      if (!slug) continue;

      if (!bySlug.has(slug)) {
        const { name, location } = parseByline(raw);
        bySlug.set(slug, { slug, raw, name, location, categories: [], articles: [] });
      }

      const record = bySlug.get(slug);
      if (!record.categories.includes(article.category)) {
        record.categories.push(article.category);
      }
      // Guard against the same article object being reached twice (it
      // isn't currently, since each category file is disjoint, but this
      // keeps the index correct if that ever changes).
      if (!record.articles.some((a) => a.id === article.id)) {
        record.articles.push(article);
      }
    }
  }

  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

let cachedIndex = null;
function index() {
  if (!cachedIndex) cachedIndex = buildAuthorIndex();
  return cachedIndex;
}

export function getAllAuthors() {
  return index();
}

export function getAuthorBySlug(slug) {
  return index().find((a) => a.slug === slug) || null;
}

/**
 * A short, honest "about" line built only from real data (which sections
 * they write for, how many pieces, where they're based) — never invented
 * career history, employers, or biographical claims.
 */
export function getAuthorBio(author) {
  if (!author) return "";
  const labels = author.categories.map((c) => CATEGORY_TITLES[c] || c);
  const sectionList =
    labels.length === 1
      ? labels[0]
      : labels.length === 2
      ? `${labels[0]} and ${labels[1]}`
      : `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;

  const count = author.articles.length;
  const pieceWord = count === 1 ? "story" : "stories";

  const locationPart = author.location ? ` Based in ${author.location}.` : "";

  return `Covers ${sectionList} for La Vanguardia — ${count} ${pieceWord} published on the site so far.${locationPart}`;
}
