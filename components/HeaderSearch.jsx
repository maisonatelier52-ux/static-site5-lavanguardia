"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import us from "@/data/categories/us.json";
import business from "@/data/categories/business.json";
import finance from "@/data/categories/finance.json";
import world from "@/data/categories/world.json";

// Built once at module load from the same 4 files every other page reads
// — never a separate/duplicated dataset. Small enough (24 articles) to
// search entirely client-side with no API round trip.
const SEARCH_INDEX = [us, business, finance, world].flatMap((file) =>
  (file.articles || []).map((article) => ({ ...article, categoryTitle: file.title }))
);

// Shown before the person has typed anything, so the empty state is a
// small "browse" list rather than blank — one real article per category.
const SUGGESTED_IDS = ["us1", "biz1", "fin5", "wld2"];
const SUGGESTED = SUGGESTED_IDS.map((id) => SEARCH_INDEX.find((a) => a.id === id)).filter(Boolean);

const PLACEHOLDERS = [
  "Search articles…",
  "Try “Fed rate decision”…",
  "Try “black hole star”…",
  "Try “New Hampshire primary”…",
];

function matchArticles(query) {
  const q = query.trim().toLowerCase();
  if (!q) return SUGGESTED;
  return SEARCH_INDEX.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      (a.dek && a.dek.toLowerCase().includes(q)) ||
      (a.tag && a.tag.toLowerCase().includes(q)) ||
      a.categoryTitle.toLowerCase().includes(q)
  ).slice(0, 6);
}

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-bold text-accent-ink">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 transition-colors ${className}`}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Header search — replaces the old Subscribe button (desktop) and Account
 * icon (mobile). Self-contained: owns its own open/query state, positions
 * its own results panel, and needs only one thing from its parent — to sit
 * inside a `position: relative` ancestor that spans the full width the
 * dropdown should cover. In Header.jsx that's a wrapper around the whole
 * desktop row (bar + nav) so results drop below the nav row, and the
 * mobile row itself so results drop below the full-width expanded field.
 *
 * The dropdown is `position: absolute` and always mounted (visibility
 * toggled by CSS `max-height`/opacity, the same technique the header's
 * own dateline/nav rows already use) rather than pushing document flow —
 * deliberately, so opening it can never change the sticky header's actual
 * height. That's the exact class of bug the header's scroll-collapse fix
 * exists to prevent; an overlay panel sidesteps it entirely rather than
 * relying on being careful.
 */
export default function HeaderSearch({ mobile = false }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => matchArticles(query), [query]);

  // Idle placeholder cycling — desktop only, paused once there's a query.
  useEffect(() => {
    if (mobile || query) return;
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length), 2600);
    return () => clearInterval(id);
  }, [mobile, query]);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) closeAll();
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // "/" focuses search from anywhere on the page (GitHub/Notion-style
  // shortcut) — skipped while the person is already typing somewhere else.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "/") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      openAndFocus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function openAndFocus() {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function closeAll() {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }

  function go(article) {
    router.push(`/${article.category}/${article.slug}`);
    closeAll();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeAll();
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex] || results[0];
      if (target) go(target);
    }
  }

  const resultLabel = query
    ? results.length
      ? `${results.length} result${results.length > 1 ? "s" : ""}`
      : "No results"
    : "Suggested";

  const dropdown = (
    <div
      aria-hidden={!open}
      className={`absolute inset-x-0 top-full z-10 overflow-hidden border-t border-white/[0.06] bg-navy/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out ${
        open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 py-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">{resultLabel}</p>
        {results.length > 0 ? (
          <div>
            {results.map((a, i) => (
              <button
                key={a.id}
                type="button"
                tabIndex={open ? 0 : -1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(a)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-baseline gap-3 border-b border-rule px-2 py-2.5 text-left transition-colors last:border-b-0 ${
                  i === activeIndex ? "bg-white/5" : ""
                }`}
              >
                <span className="shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-accent">
                  {a.tag}
                </span>
                <span className="font-serif text-[14.5px] leading-snug text-ink">{highlight(a.title, query)}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="px-2 py-3 text-sm text-ink-soft">No articles match &ldquo;{query}&rdquo;.</p>
        )}
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div ref={wrapRef} className="flex shrink-0 items-center">
        <button
          type="button"
          aria-label="Search"
          onClick={openAndFocus}
          className={`flex h-8 w-8 shrink-0 items-center justify-center text-white transition-colors hover:text-accent ${
            open ? "hidden" : ""
          }`}
        >
          <SearchIcon className="h-[18px] w-[18px]" />
        </button>

        {/* `absolute inset-0` here resolves against the mobile header
            row (Header.jsx marks that row `relative` for exactly this),
            not against this wrapper — this wrapper is `shrink-0`, sized
            to the collapsed search icon alone, so if it were the
            positioning root instead, `inset-0` would squeeze the entire
            expanded field into that same icon-sized box. The row is
            what needs to be covered when search opens, so the row is
            what this has to be positioned against. */}
        <div className={`absolute inset-0 flex items-center gap-2 bg-navy px-4 ${open ? "" : "pointer-events-none opacity-0"}`}>
          <button type="button" aria-label="Close search" onClick={closeAll} className="flex h-8 w-8 shrink-0 items-center justify-center text-ink-soft">
            <BackIcon />
          </button>
          <SearchIcon className="text-accent" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search articles"
            aria-label="Search articles"
            tabIndex={open ? 0 : -1}
            className="min-w-0 flex-1 bg-transparent font-serif text-[16px] text-ink outline-none placeholder:text-ink-faint"
          />
        </div>

        {dropdown}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <div
        onClick={openAndFocus}
        className={`relative flex cursor-text items-center gap-2.5 rounded-full border px-4 py-2 transition-all duration-300 ease-out ${
          open
            ? "search-bar-active w-[300px] border-transparent bg-accent/[0.04]"
            : "w-[210px] border-white/10 bg-white/[0.03] hover:border-white/20"
        }`}
      >
        <SearchIcon className={open ? "text-accent" : "text-ink-faint"} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          aria-label="Search articles"
          className="w-full bg-transparent font-mono text-[12.5px] text-ink outline-none placeholder:text-ink-faint"
        />
        {!open && (
          <span className="shrink-0 rounded border border-panel-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">/</span>
        )}
      </div>
      {dropdown}
    </div>
  );
}
