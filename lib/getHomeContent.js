import homeLayout from "@/data/homeLayout";

// Static imports of every category's article data — Next.js bundles JSON
// imports at build time, so this has no runtime file-system cost, and it
// keeps this module framework-simple (no dynamic import() bookkeeping).
// Add a new import + entry in CATEGORY_DATA whenever a new
// data/categories/<name>.json file is added.
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

/**
 * data/categories/<category>.json is the ONLY place article content
 * (title, dek, author, image, tag) lives. data/homeLayout.js holds only
 * homepage structure — which article id appears in which section/column,
 * plus a few homepage-only display fields (time, kicker, rank).
 *
 * This module resolves the two together at render time, rebuilding the
 * exact nested shape app/page.jsx and every components/home/* component
 * already expect (the same shape data/homeContent.js used to export
 * directly) — so nothing in app/page.jsx or components/home/* had to
 * change for this migration.
 */

// id -> full article object, built once per server process (module-level
// cache; this file only runs on the server, so there's no risk of leaking
// build-time state to the client).
const articlesById = new Map();
for (const file of CATEGORY_DATA) {
  for (const article of file.articles || []) {
    articlesById.set(article.id, article);
  }
}

function resolveRef(ref) {
  if (!ref || typeof ref !== "object" || typeof ref.id !== "string") return ref;
  const article = articlesById.get(ref.id);
  if (!article) {
    console.warn(`[getHomeContent] No article found for id "${ref.id}" — check data/categories/*.json`);
    return null;
  }
  // Merge homepage-only display fields (time / kicker / rank) onto the
  // resolved article content, without mutating the shared cached object.
  const { id, ...extra } = ref;
  return Object.keys(extra).length > 0 ? { ...article, ...extra } : article;
}

function isRef(node) {
  return (
    node &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    typeof node.id === "string" &&
    // A resolved article (or any other plain data object) also has an
    // `id`, so disambiguate: a *ref* is a small id(+time/kicker/rank)-only
    // object, never carrying `title`/`slug` itself.
    node.title === undefined &&
    node.slug === undefined
  );
}

function resolve(node) {
  if (Array.isArray(node)) {
    return node.map(resolve);
  }
  if (isRef(node)) {
    return resolveRef(node);
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const key of Object.keys(node)) {
      out[key] = resolve(node[key]);
    }
    return out;
  }
  return node;
}

let cached = null;

/**
 * Returns the homepage content tree in the exact shape
 * data/homeContent.js used to export (homeContent.hero.left,
 * homeContent.present.middle.opinionItems, etc.), fully resolved from
 * data/homeLayout.js + data/categories/*.json.
 */
export function getHomeContent() {
  if (!cached) {
    cached = resolve(homeLayout);
  }
  return cached;
}

export default getHomeContent;
