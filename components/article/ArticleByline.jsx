import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

/**
 * Top byline row on the article detail page — see
 * detailpage-design.mp4 (~0:05): avatar, author name (linking to their
 * author page), location, a row of share icons, and an
 * "Add {site} as a preferred source" pill.
 *
 * No publish date/time is shown: the site's article data has no publish
 * timestamp field (only the homepage's "Latest news" strip carries a
 * `time`, which is homepage-specific), and inventing one per-article
 * would be exactly the kind of dummy data this feature is meant to avoid.
 */
export default function ArticleByline({ authorName, authorHref, location }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
      <div className="flex items-center gap-3">
        {authorName && (
          <div className="text-sm">
            <p className="font-serif font-bold text-ink">
              {authorHref ? (
                <Link href={authorHref} className="hover:text-accent-ink">
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
            </p>
            {location && <p className="text-ink-faint">{location}</p>}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 text-ink-soft">
          <WhatsAppIcon className="h-[17px] w-[17px] transition-colors hover:text-accent" />
          <FacebookIcon className="h-[17px] w-[17px] transition-colors hover:text-accent" />
          <XIcon className="h-[15px] w-[15px] transition-colors hover:text-accent" />
          <ShareIcon className="h-[17px] w-[17px] transition-colors hover:text-accent" />
        </div>
        <span className="inline-flex items-center gap-2 border border-rule px-3.5 py-1.5 text-xs font-semibold text-ink-soft">
          <GoogleGlyph className="h-3.5 w-3.5" />
          Add {siteConfig.siteName} as a preferred source
        </span>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.44 1.26 4.88L2 22l5.25-1.27a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.49-9.95-10.01-9.95zm5.86 14.24c-.25.7-1.45 1.33-2 1.42-.51.08-1.15.11-1.86-.12-.43-.13-.98-.32-1.68-.62-2.96-1.28-4.89-4.26-5.04-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13.99 2.08 1.31 2.38 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.27.1 1.75.82 2.05.97.3.15.5.23.57.35.08.13.08.72-.17 1.41z" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.35c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H8v3h2.42V21z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ShareIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8 15.8 6.7M8.2 13.2l7.6 4.1" strokeLinecap="round" />
    </svg>
  );
}

function GoogleGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.55-5.17 3.55-8.87z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-3c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.28v3.09A12 12 0 0 0 12 24z"
      />
      <path fill="#FBBC05" d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.28a12 12 0 0 0 0 10.78z" />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.61l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}
