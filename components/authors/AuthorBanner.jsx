import ImagePlaceholder from "@/components/ImagePlaceholder";

/**
 * Author page top section — reworked into a magazine masthead/bio card:
 * a large circular portrait sits inside a frosted-glass panel beside the
 * author's name and bio, rather than a small avatar floating loose next
 * to text. The "By" label and oversized name set the same cover-line
 * scale used on the category page banner, so author pages feel like part
 * of the same publication rather than a lighter secondary template.
 *
 * Uses the same `.glass` panel as the homepage's hero sidebar/opinion
 * well, and closes with the system's signature glow rule instead of a
 * flat ink border, so it reads as part of the same dark/futuristic
 * system as every other page.
 */
export default function AuthorBanner({ name, bio, image }) {
  return (
    <div className="glass flex flex-col gap-6 border-l-2 border-accent/50 px-6 py-8 sm:flex-row sm:items-center md:px-9">
      <div className="shrink-0 rounded-full shadow-[var(--shadow-accent-sm)] ring-2 ring-accent/30">
        <ImagePlaceholder src={image} label="Photo" className="h-24 w-24 sm:h-28 sm:w-28" rounded="rounded-full" />
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent">
          <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]" aria-hidden="true" />
          By
        </p>
        <h1 className="mt-1 font-serif text-4xl font-bold leading-none text-ink sm:text-5xl">{name}</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{bio}</p>
      </div>
    </div>
  );
}
