import ImagePlaceholder from "@/components/ImagePlaceholder";

/**
 * Author page top section — reworked into a magazine masthead/bio card:
 * a large circular portrait sits inside a tinted panel beside the
 * author's name and bio, rather than a small avatar floating loose next
 * to text. The "By" label and oversized name set the same cover-line
 * scale used on the category page banner, so author pages feel like part
 * of the same publication rather than a lighter secondary template.
 */
export default function AuthorBanner({ name, bio }) {
  return (
    <div className="flex flex-col gap-6 border-b-4 border-ink bg-panel px-6 py-8 sm:flex-row sm:items-center md:px-9">
      <ImagePlaceholder
        label="Photo"
        className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
        rounded="rounded-full"
      />
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent">By</p>
        <h1 className="mt-1 font-serif text-4xl font-bold leading-none text-ink sm:text-5xl">{name}</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{bio}</p>
      </div>
    </div>
  );
}
