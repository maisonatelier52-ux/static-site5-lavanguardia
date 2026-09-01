"use client";

import { useEffect } from "react";
import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

/**
 * Off-canvas navigation drawer, opened from the hamburger button at every
 * breakpoint. On mobile it's the only way to reach the category list
 * (there's no visible nav row in the compact mobile header); on desktop
 * it doubles as a full-site menu alongside the always-visible nav row.
 */
export default function MobileNavDrawer({ open, onClose }) {
  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[84%] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between bg-navy px-5 py-4">
            <span className="font-serif text-xl font-black uppercase tracking-[-0.01em] text-white">
              {siteConfig.siteName}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-2 py-3" aria-label="Site navigation">
            <ul>
              {siteConfig.mainNav.map((item, idx) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3.5 font-serif text-[15px] font-bold text-ink transition-colors hover:bg-neutral-50 hover:text-navy"
                  >
                    {item.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      className="opacity-40"
                    >
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  {idx < siteConfig.mainNav.length - 1 && <div className="mx-4 border-b border-rule" />}
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-rule px-5 py-5">
            <Link
              href="/subscribe"
              onClick={onClose}
              className="block w-full bg-gold py-3 text-center text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
            >
              {siteConfig.subscribeLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
