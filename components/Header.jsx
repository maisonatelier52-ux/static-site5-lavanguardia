"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import MainNav from "./MainNav";
import MobileNavDrawer from "./MobileNavDrawer";
import siteConfig from "@/data/siteConfig.json";

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

// Filled/solid account glyph — matches the reference mobile header exactly
// (no outline circle, just a solid silhouette).
function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20.5c0-4.42 3.58-7.5 8-7.5s8 3.08 8 7.5V21H4v-.5z" />
    </svg>
  );
}

// Today's dateline, formatted the way a printed edition line reads:
// weekday, day month year. Computed client-side only for display — no
// data dependency, purely a print-flavored chrome detail.
function useDateline() {
  const [label, setLabel] = useState(null);
  useEffect(() => {
    const d = new Date();
    setLabel(
      d.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);
  return label;
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dateline = useDateline();

  // Collapses the desktop category row and shrinks the logo once the page
  // scrolls past the top, matching the reference site's compact sticky
  // header (see header-after-sticky.png). The hamburger and Subscribe
  // button stay a fixed size/position in both states.
  //
  // The hysteresis band (collapse past 160px, re-expand below 20px) has
  // to stay wider than the header's own height delta between the two
  // states (~90px on a typical page). If the band were narrower than
  // that — it previously wasn't (72px/32px, a 40px band) — a single
  // scroll-position correction the size of that delta can overshoot both
  // thresholds in one jump, and since collapsing the header is exactly
  // what produces a correction of that size, the flip becomes
  // self-sustaining: collapse -> correction -> past the expand
  // threshold -> expand -> correction the other way -> past the collapse
  // threshold -> collapse again, forever. That's what a visible "shake"
  // between the two states, without the person actively scrolling, means
  // — this had that bug. A band wider than the delta makes a single
  // correction physically unable to cross both thresholds at once, which
  // breaks the loop regardless of what's producing the correction.
  // (`overflow-anchor: none`, in globals.css, removes the browser's own
  // scroll-anchoring as one specific source of that correction; the
  // widened band means the header no longer depends on that being the
  // only source.) Updates are batched to one `requestAnimationFrame` per
  // frame — scroll fires far more often than the page can usefully
  // repaint.
  useEffect(() => {
    const COLLAPSE_AT = 160;
    const EXPAND_AT = 20;
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      setScrolled((prev) => {
        if (!prev && window.scrollY > COLLAPSE_AT) return true;
        if (prev && window.scrollY < EXPAND_AT) return false;
        return prev;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-site-header
      className="sticky top-0 z-30 border-b border-white/[0.06] bg-navy/85 backdrop-blur-xl"
    >
      {/* Dateline strip — a thin printed-edition line above the masthead,
          reset in mono for a "console readout" feel, collapses away with
          the rest of the expanded header on scroll. */}
      <div
        className={`hidden overflow-hidden border-b border-white/[0.06] md:block transition-all duration-300 ease-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-white/45">
          <span>{dateline || "\u00A0"}</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]" aria-hidden="true" />
            Edition · Barcelona
          </span>
        </div>
      </div>

      {/* Desktop / tablet header row */}
      <div
        className={`mx-auto hidden max-w-[1440px] items-center justify-between px-6 md:flex transition-[padding] duration-300 ease-out ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-accent)]"
        >
          <HamburgerIcon />
        </button>

        <Logo shrink={scrolled} />

        <Link
          href="/subscribe"
          className="shrink-0 bg-gold px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-black transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[var(--shadow-gold)]"
        >
          {siteConfig.subscribeLabel}
        </Link>
      </div>

      {/* Desktop category nav row — collapses away on scroll */}
      <div
        className={`hidden overflow-hidden border-t border-white/[0.06] bg-cream transition-all duration-300 ease-out md:block ${
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        }`}
      >
        <MainNav className="mx-auto max-w-[1440px] px-6" />
      </div>

      {/* Mobile header row — hamburger, logo, account icon only */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          className="flex h-8 w-8 shrink-0 items-center justify-center text-white"
        >
          <HamburgerIcon />
        </button>

        <Logo mobile className="min-w-0 flex-1" />

        <Link
          href="/account"
          aria-label="Account"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-white"
        >
          <AccountIcon />
        </Link>
      </div>

      {/* Signature gradient edge — the same teal→violet glow used on
          section rules throughout the page, so the masthead reads as
          part of the same system rather than a separate flat chrome. */}
      <div className="rule-glow" aria-hidden="true" />

      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
