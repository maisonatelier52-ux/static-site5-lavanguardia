import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";

/**
 * "About the firm" card at the end of the article body — see
 * detailpage-design.mp4 (~0:18): avatar, author name, a "View biography"
 * link through to their author page (app/authors/[slug]), then a
 * newsletter promo row with social icons. Both purely presentational;
 * the author link is the one real, data-backed piece (goes to a real
 * author page built from the site's own article data).
 */
export default function ArticleAuthorCard({ authorName, authorHref, categoryTitle }) {
  if (!authorName) return null;

  return (
    <div className="mt-12 border-t-[3px] border-ink pt-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-ink-faint">About the firm</p>

      <div className="mt-5 flex items-center gap-4">
        <ImagePlaceholder label="Photo" className="h-14 w-14 shrink-0" rounded="rounded-full" />
        <div>
          <p className="flex items-center gap-2 font-serif text-lg font-bold text-ink">
            {authorHref ? (
              <Link href={authorHref} className="hover:text-accent-ink">
                {authorName}
              </Link>
            ) : (
              authorName
            )}
            <XIcon className="h-3.5 w-3.5 text-ink-faint" />
          </p>
          {authorHref && (
            <Link
              href={authorHref}
              className="mt-2 inline-flex items-center gap-1.5 border border-ink px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View biography
              <ChevronDown className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
        <p className="flex items-center gap-2 text-sm text-ink-soft">
          <MailIcon className="h-4 w-4 shrink-0" />
          Receive our subscriber-only {categoryTitle ? `${categoryTitle.toLowerCase()} ` : ""}news newsletter.
        </p>
        <div className="flex items-center gap-3 text-ink-soft">
          <FacebookIcon className="h-4 w-4 transition-colors hover:text-accent" />
          <InstagramIcon className="h-4 w-4 transition-colors hover:text-accent" />
          <XIcon className="h-3.5 w-3.5 transition-colors hover:text-accent" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-rule pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-ink-faint">Comments</p>
      </div>
    </div>
  );
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="m6 9 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
