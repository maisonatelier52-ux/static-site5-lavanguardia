import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

/**
 * Site logo / wordmark.
 *
 * The reference masthead is a high-contrast serif wordmark ("LA VANGUARDIA").
 * It's mimicked here as text set in Playfair Display (closest self-hosted
 * match to the reference typeface's letterforms/contrast), so it stays
 * crisp at any size and needs no image asset. A slim accent rule sits
 * beneath the wordmark at full size — a small printed-masthead detail
 * rather than a plain floating word — and steps away once the header
 * shrinks so the compact state stays purely functional.
 *
 * To swap in the real logo file instead:
 * 1. Drop your logo image at /public/images/logo.png (or .svg)
 * 2. Uncomment the <img> block below and delete/comment the <span> wordmark
 *
 * `shrink` renders the smaller sticky-header size (desktop only).
 * `mobile` renders the fixed mobile-header size.
 * `glow` swaps the plain gold glow for a slow "breathing" teal/violet
 * glow (the `.logo-glow-pulse` animation in globals.css) — used only on
 * the main site header, where the "Cinematic glow" treatment wants the
 * wordmark quietly alive. Every other usage (mobile, drawer, footer)
 * keeps the static gold glow.
 *
 * Both glows are `filter: drop-shadow()`, NOT `text-shadow`, and that is
 * deliberate. The wordmark span carries Tailwind's `truncate`
 * (`overflow: hidden`, so a squeezed mobile logo ellipsizes instead of
 * wrapping), and an element's own `overflow: hidden` clips its own
 * `text-shadow` at its box edge — which drew a hard-edged tinted
 * rectangle behind the logo once the glow got strong enough to see
 * (the old faint gold one was clipped identically, just invisibly).
 * `drop-shadow` is computed from the rendered glyphs and isn't clipped
 * by the element's own overflow, so the glow follows the letters.
 */
export default function Logo({ className = "", shrink = false, mobile = false, glow = false }) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.siteName}
      className={`inline-flex min-w-0 flex-col items-center justify-center select-none ${className}`}
    >
      {/* --- Image placeholder (uncomment and point to your own asset) ---
      <img
        src="/images/logo.png"
        alt={siteConfig.siteName}
        className={mobile ? "h-5 w-auto" : shrink ? "h-6 w-auto" : "h-10 md:h-14 w-auto"}
      />
      ------------------------------------------------------------------ */}

      <span
        className={`truncate font-serif font-black uppercase text-white transition-all duration-300 ease-out ${
          glow ? "logo-glow-pulse" : "[filter:drop-shadow(0_0_13px_rgba(255,215,0,0.16))]"
        } ${
          mobile
            ? "text-lg tracking-[-0.01em]"
            : shrink
            ? "text-2xl tracking-[-0.01em] md:text-3xl"
            : "text-4xl tracking-[-0.015em] sm:text-5xl md:text-6xl lg:text-[3.4rem]"
        }`}
      >
        {siteConfig.siteName}
      </span>
      {!mobile && (
        <span
          className={`bg-gold shadow-[var(--shadow-gold)] transition-all duration-300 ease-out ${
            shrink ? "mt-0 h-0 w-0 opacity-0" : "mt-2 h-[3px] w-14 opacity-100"
          }`}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
