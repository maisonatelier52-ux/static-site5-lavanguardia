"use client";

/**
 * Image box used everywhere an article/author photo is needed on the
 * homepage (and, later, category/detail/author pages).
 *
 * Pass `src` pointing at a file under /public/images/... (e.g.
 * `/images/articles/my-slug.jpg`) once you have a real photo. Until then
 * (or if the file 404s), the fallback icon + label stays visible — no
 * broken-image icon flash, and it's obvious at a glance which slots still
 * need a real image dropped in.
 *
 * `variant="ad"` renders the dashed-border "ad space" box instead — see
 * AdSlot.jsx, which wraps this for the site's ad placeholders.
 */
export default function ImagePlaceholder({ src, alt = "", className = "", label, variant = "photo", rounded = "" }) {
  const isAd = variant === "ad";

  if (isAd) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-rule bg-panel ${rounded} ${className}`}
      >
        <div className="flex flex-col items-center gap-1.5 px-3 text-center">
          <PictureIcon className="text-ink-faint" />
          <span className="text-[11px] font-medium text-ink-faint">
            {label || "Ad space"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-panel ${rounded} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-1.5 px-3 text-center">
          <PictureIcon className="text-ink-faint" />
          <span className="text-[11px] font-medium text-ink-faint">
            {label || "Image placeholder"}
          </span>
        </div>
      </div>
      {src && (
        <img
          src={src}
          alt={alt}
          className="relative h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      )}
    </div>
  );
}

function PictureIcon({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="M21 16l-5.5-5.5L4 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
