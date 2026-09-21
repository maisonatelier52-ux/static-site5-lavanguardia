/**
 * "Subscribe to listen to this article" bar — see detailpage-design.mp4
 * (~0:01). Purely decorative site chrome (like the AdSlot placeholders):
 * no text-to-speech is wired up, matching the pattern already used for
 * every other non-functional promo element on this site.
 */
export default function ArticleAudioWidget() {
  return (
    <div className="inline-flex items-center gap-2.5 border-y border-rule px-4 py-2.5 text-ink">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/30">
        <HeadphonesIcon className="h-3.5 w-3.5 text-accent" />
      </span>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em]">
        Subscribe to listen to this article
      </span>
    </div>
  );
}

function HeadphonesIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
    </svg>
  );
}
