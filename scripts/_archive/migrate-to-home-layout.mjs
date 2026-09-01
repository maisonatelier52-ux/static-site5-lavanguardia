// ONE-TIME MIGRATION SCRIPT.
//
// Converts the old data/homeContent.js (full article objects embedded
// inline, in homepage layout order) into data/homeLayout.js — the same
// nested structure, but with each article replaced by just its `id`
// (a plain string), since the actual article content now lives solely in
// data/categories/<category>.json.
//
// A handful of fields are homepage-presentation-only, not article
// content, and are kept alongside the id reference instead of being
// dropped: `time` (Latest news timestamps), `kicker` (the one "Editorial"
// label in Opinion and analysis), and `rank` (Most viewed numbering).
//
// Run once: `node scripts/migrate-to-home-layout.mjs`
// Safe to delete after the migration — data/homeLayout.js is the
// hand-maintained file going forward, this script is not part of the
// regular build.
import { homeContent } from "../data/homeContent.js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "data", "homeLayout.js");

const EXTRA_FIELDS = ["time", "kicker", "rank"];

function isArticleLike(node) {
  return (
    node &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    typeof node.id === "string" &&
    typeof node.slug === "string" &&
    typeof node.title === "string"
  );
}

function toRef(article) {
  const ref = { id: article.id };
  for (const field of EXTRA_FIELDS) {
    if (article[field] !== undefined) ref[field] = article[field];
  }
  return ref;
}

function transform(node) {
  if (Array.isArray(node)) {
    return node.map(transform);
  }
  if (isArticleLike(node)) {
    return toRef(node);
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const key of Object.keys(node)) {
      out[key] = transform(node[key]);
    }
    return out;
  }
  return node;
}

const layout = transform(homeContent);

const source = `// Homepage LAYOUT — which articles appear in which section, column, and
// order. This file intentionally holds NO article content (no title, dek,
// author, image, tag) — only structure plus a few homepage-only display
// fields (time / kicker / rank). Every entry below is just \`{ id }\` (or
// \`{ id, time }\`, \`{ id, kicker }\`, \`{ id, rank }\`), and the actual
// article content is looked up from data/categories/<category>.json by
// lib/getHomeContent.js at render time.
//
// This is the single place to reorder/add/remove what shows up on the
// homepage. To change what an article SAYS, edit its entry in
// data/categories/<category>.json — the same edit is instantly reflected
// on both the homepage and that article's category page, since both now
// read from the same underlying data.
//
// Regenerated once by scripts/migrate-to-home-layout.mjs from the old
// data/homeContent.js — hand-maintain this file from now on.

export const homeLayout = ${JSON.stringify(layout, null, 2)};

export default homeLayout;
`;

writeFileSync(OUT_PATH, source, "utf8");
console.log(`Wrote data/homeLayout.js`);
