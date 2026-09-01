/**
 * Turns a raw byline string (e.g. "MARÍA FERNÁNDEZ | Madrid") into a stable
 * URL slug (e.g. "maria-fernandez"). The location suffix (" | City") is not
 * part of the slug — it's parsed out separately by parseByline() below, so
 * the same person's byline always resolves to the same author page
 * regardless of which article's dateline it came from.
 */
export function authorSlug(raw) {
  if (!raw) return "";
  const namePart = raw.split("|")[0].trim();
  return namePart
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents (á -> a, etc.)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Splits a raw byline into a display name (Title Case) and an optional
 * location, e.g.:
 *   "MARÍA FERNÁNDEZ | Madrid"  -> { name: "María Fernández", location: "Madrid" }
 *   "CARLOS MENA"                -> { name: "Carlos Mena", location: null }
 *   "GEMA ESCRIBANO / PABLO MARTÍN | Madrid"
 *                                 -> { name: "Gema Escribano / Pablo Martín", location: "Madrid" }
 */
export function parseByline(raw) {
  if (!raw) return { name: "", location: null };
  const [namePart, locationPart] = raw.split("|").map((s) => s.trim());
  return {
    name: toTitleCase(namePart),
    location: locationPart || null,
  };
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(/(\s|\/)/) // keep separators (spaces, slashes) so joint bylines stay readable
    .map((chunk) => (chunk === " " || chunk === "/" ? chunk : chunk.charAt(0).toUpperCase() + chunk.slice(1)))
    .join("");
}
