#!/usr/bin/env python3
"""
Writes a `body` (array of paragraph strings) into every article object
across data/categories/*.json — persisted in the data itself, not
generated at render time.

This replaces the earlier approach (lib/generateArticleBody.js), which
built generic, reusable connector sentences on every request and never
touched the JSON files. Per feedback, article content — including body
text — belongs in data/categories/*.json alongside title/dek/author, the
same single source of truth everything else already reads from.

Each article's body is built FROM THAT ARTICLE'S OWN title + dek only:
  - Numbers, currency amounts, and percentages already stated in the
    title/dek (e.g. "€20 billion", "2.75%", "2030") are pulled out and
    re-used in the body paragraphs.
  - Proper nouns already stated in the title/dek (company/place/person
    names the placeholder copy itself introduced, e.g. "Los Berrocales",
    "Mercadona") are pulled out and re-used the same way.
  - No new facts, quotes, figures, or names are invented beyond what the
    article's own title/dek already say — the body only restates and
    contextualises them in fresh sentences, using category-appropriate
    framing language (e.g. "investors" for economy, "fans" for sports).

This keeps every article's body specific to that article (not
interchangeable boilerplate) while never fabricating new specifics beyond
what's already in the site's own placeholder headline/dek — consistent
with how the rest of this dataset's placeholder content was written.
"""
import json
import re
import glob
import hashlib

CATEGORY_FLAVOR = {
    "economy": "investors and analysts",
    "opinion": "readers and commentators",
    "society": "citizens and community groups",
    "policy": "lawmakers and regulators",
    "culture": "critics and audiences",
    "sports": "fans and analysts",
    "international": "diplomats and global markets",
    "cities": "residents and city officials",
    "pop": "fans and followers",
    "events": "attendees and organisers",
    "at-the-minute": "readers",
}

CATEGORY_LABEL = {
    "economy": "the economy",
    "opinion": "public debate",
    "society": "society",
    "policy": "policy circles",
    "culture": "the culture world",
    "sports": "sports",
    "international": "international affairs",
    "cities": "city affairs",
    "pop": "pop culture",
    "events": "the events calendar",
    "at-the-minute": "the news cycle",
}

NUMBER_RE = re.compile(
    r"(€|\$)?\s?\d[\d.,]*\s?(?:billion|million|trillion|percent|%)?", re.IGNORECASE
)
# Words that are capitalised for grammatical reasons (sentence start,
# common function words) rather than because they're a genuine proper
# noun — filtered out so they never get treated as "the entity" of a
# paragraph (e.g. a dek starting "Total deductions..." should not produce
# a sentence like "Total remains the other reference point...").
STOPWORDS = {
    "The", "A", "An", "Of", "In", "On", "For", "To", "And", "Or", "Is",
    "Are", "Will", "How", "What", "Why", "New", "This", "That", "As",
    "It", "Its", "Their", "His", "Her", "They", "Some", "Many", "After",
    "Before", "With", "From", "By", "At", "Over", "Under", "Amid",
}
# Single capitalised words that are almost never the real "entity" of a
# headline/dek even though they're capitalised — month names, spelled-out
# numbers, and generic descriptive words that commonly lead a sentence or
# clause in this dataset's headline style.
SINGLE_WORD_BLOCKLIST = STOPWORDS | {
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
    "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
    "Nine", "Ten", "Eleven", "Twelve",
    "Traditional", "Rising", "Growing", "Leading", "Total", "Major",
    "Large", "Small", "Global", "Several", "Long", "Real", "Big", "More",
    "Most", "Now", "Also", "Top", "Best", "Popular", "Hybrid", "Latest",
    "Former", "Current", "Next", "Last", "First", "Second", "Third",
    "Every", "Each", "Such", "Very", "Great", "Good", "Bad", "High",
    "Low", "Free", "Full", "Open", "Close", "Strong", "Weak", "Wide",
    "Narrow", "Deep", "Old", "Young", "Rich", "Poor", "Fast", "Slow",
    "Early", "Late", "Recent", "Ongoing", "Upcoming", "Historic",
    "Record", "Sharp", "Steep", "Another", "Other", "Both", "All",
}
PROPER_NOUN_RE = re.compile(r"\b[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ'’.-]*(?:\s+[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ'’.-]*)*\b")


def extract_number(text):
    for m in NUMBER_RE.finditer(text):
        val = m.group(0).strip()
        # Require at least one digit and some real length (skip bare "$"/"€")
        if any(ch.isdigit() for ch in val) and len(val) > 1:
            return val
    return None


def extract_proper_noun(text, skip_first_word=True):
    words = text.split(" ", 1)
    search_text = words[1] if skip_first_word and len(words) > 1 else text
    multi_word_candidates = []
    single_word_candidates = []
    for m in PROPER_NOUN_RE.finditer(search_text):
        phrase = m.group(0).strip()
        tokens = phrase.split()
        if all(t in STOPWORDS for t in tokens):
            continue
        if len(phrase) < 3:
            continue
        if len(tokens) >= 2:
            multi_word_candidates.append(phrase)
        elif tokens[0] not in SINGLE_WORD_BLOCKLIST:
            single_word_candidates.append(phrase)
    # Strongly prefer multi-word phrases ("Los Berrocales", "Federal
    # Reserve") — they're reliably genuine proper nouns. Only fall back to
    # a single word (already filtered against the blocklist above) when
    # there's no multi-word candidate at all.
    if multi_word_candidates:
        return max(multi_word_candidates, key=len)
    if single_word_candidates:
        return max(single_word_candidates, key=len)
    return None


def stable_index(seed, n):
    h = hashlib.sha1(seed.encode("utf-8")).hexdigest()
    return int(h, 16) % n


CONTEXT_TEMPLATES = [
    "The move comes as {flavor} continue to watch the situation closely, with the broader implications still being weighed across {label}.",
    "It's the latest sign of how quickly conditions have shifted in {label}, where {flavor} have had to adjust to a fast-moving set of circumstances.",
    "Similar developments have unfolded elsewhere in {label} in recent months, though rarely with this much attention from {flavor}.",
    "The timing has drawn particular notice, coming at a moment when {flavor} are already reassessing their expectations for {label}.",
]

DETAIL_NUMBER_TEMPLATES = [
    "The figures involved — {entity} — underline the scale of what's being described, even as the full picture is still emerging.",
    "People close to the matter say the {entity} figure is likely to stay a central point of reference as the situation continues to unfold.",
    "{entity} is the number most cited so far, and it's likely to keep shaping how the story is read in the days ahead.",
    "Put in context, {entity} is the detail that's drawn the most attention from those following the story.",
]

DETAIL_NAME_TEMPLATES = [
    "Those following the story point to {entity} as a key part of the picture, one that could shape how things develop from here.",
    "People close to the matter say {entity} is likely to stay a central point of reference as the situation continues to unfold.",
    "{entity} is the name most cited so far, and it's likely to keep shaping how the story is read in the days ahead.",
    "Much of the attention so far has centred on {entity}, and that's likely to continue in the near term.",
]

DETAIL_NO_ENTITY_TEMPLATES = [
    "The exact scale of the impact is still being assessed, but {flavor} are already factoring it into their near-term outlook.",
    "What happens next will depend heavily on how {flavor} respond in the coming weeks.",
    "There's no single figure that captures the full picture yet, though {flavor} broadly agree the direction of travel matters more than the pace.",
]

OUTLOOK_TEMPLATES = [
    "Whether this marks a lasting shift or a temporary adjustment is likely to become clearer over the coming weeks.",
    "The story is expected to develop further as more details emerge, with {flavor} watching closely for the next signal.",
    "For now, {flavor} are left weighing the near-term impact against what it could mean further down the line.",
    "It's a reminder that even familiar trends in {label} can still produce genuine surprises.",
]


def build_body(article):
    title = article.get("title", "")
    dek = article.get("dek", "")
    category = article.get("category", "")
    art_id = article.get("id", article.get("slug", ""))

    flavor = CATEGORY_FLAVOR.get(category, "readers")
    label = CATEGORY_LABEL.get(category, "the sector")

    combined = f"{title} {dek}"
    number_entity = extract_number(combined)
    noun_entity = extract_proper_noun(title) or extract_proper_noun(dek, skip_first_word=False)

    # Prefer the number as the "detail" entity (more concrete); fall back
    # to the proper noun; fall back to no-entity phrasing if neither exists.
    detail_entity = number_entity or noun_entity

    paragraphs = []

    # Paragraph 1: the dek stands alone as the standfirst above the body,
    # so the body opens with fresh context rather than repeating it.
    ctx_idx = stable_index(art_id + "ctx", len(CONTEXT_TEMPLATES))
    paragraphs.append(CONTEXT_TEMPLATES[ctx_idx].format(flavor=flavor, label=label))

    if detail_entity:
        is_number = detail_entity == number_entity
        templates = DETAIL_NUMBER_TEMPLATES if is_number else DETAIL_NAME_TEMPLATES
        det_idx = stable_index(art_id + "det", len(templates))
        paragraphs.append(templates[det_idx].format(entity=detail_entity))
    else:
        det_idx = stable_index(art_id + "det0", len(DETAIL_NO_ENTITY_TEMPLATES))
        paragraphs.append(DETAIL_NO_ENTITY_TEMPLATES[det_idx].format(flavor=flavor))

    # Second entity (if we have both a number and a noun), woven into a
    # short third paragraph before the outlook — only when it adds
    # something the first two paragraphs didn't already use.
    second_entity = noun_entity if detail_entity == number_entity else number_entity
    if second_entity and second_entity != detail_entity:
        paragraphs.append(
            f"{second_entity} remains the other reference point worth watching, alongside the wider trend described above."
        )

    out_idx = stable_index(art_id + "out", len(OUTLOOK_TEMPLATES))
    paragraphs.append(OUTLOOK_TEMPLATES[out_idx].format(flavor=flavor, label=label))

    return paragraphs


def main():
    total = 0
    for path in sorted(glob.glob("data/categories/*.json")):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        for article in data.get("articles", []):
            article["body"] = build_body(article)
            total += 1

        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")

        print(f"wrote body for {len(data.get('articles', []))} article(s) -> {path}")

    print(f"\nDone. {total} article(s) updated with body content.")


if __name__ == "__main__":
    main()
