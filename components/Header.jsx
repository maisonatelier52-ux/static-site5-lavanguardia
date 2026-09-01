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
  // This has a feedback-loop hazard because the header is `sticky`:
  // collapsing the category row shrinks the sticky header, which shrinks
  // the scrollable area, which the browser reflects by reducing
  // window.scrollY in real time WHILE the collapse is still animating.
  // That drop can itself cross back below the "re-expand" threshold and
  // undo the collapse before it finishes — repeating any time the scroll
  // position sits near the top.
  //
  // Two things close this off: the expand threshold sits at 0 (not a
  // small positive number the animation could dip below), and scroll
  // events are ignored for the duration of the CSS transition once a
  // state flip starts, so the animation's own scroll side-effects can
  // never trigger a second flip before the first one has settled.
  useEffect(() => {
    const COLLAPSE_AT = 72;
    const EXPAND_AT = 0;
    const TRANSITION_MS = 320; // matches the 300ms CSS transition + margin
    let locked = false;
    let lockTimer = null;

    const onScroll = () => {
      if (locked) return;
      setScrolled((prev) => {
        let next = prev;
        if (!prev && window.scrollY > COLLAPSE_AT) next = true;
        else if (prev && window.scrollY <= EXPAND_AT) next = false;
        if (next !== prev) {
          locked = true;
          clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            locked = false;
          }, TRANSITION_MS);
        }
        return next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(lockTimer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-navy shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      {/* Dateline strip — a thin printed-edition line above the masthead,
          collapses away with the rest of the expanded header on scroll. */}
      <div
        className={`hidden overflow-hidden border-b border-white/10 md:block transition-all duration-300 ease-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 text-[11px] font-medium tracking-[0.02em] text-white/55">
          <span>{dateline || "\u00A0"}</span>
          <span>Edition · Barcelona</span>
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
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition-colors hover:text-gold"
        >
          <HamburgerIcon />
        </button>

        <Logo shrink={scrolled} />

        <Link
          href="/subscribe"
          className="shrink-0 bg-gold px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
        >
          {siteConfig.subscribeLabel}
        </Link>
      </div>

      {/* Desktop category nav row — collapses away on scroll */}
      <div
        className={`hidden overflow-hidden border-t border-white/10 bg-cream transition-all duration-300 ease-out md:block ${
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

      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
