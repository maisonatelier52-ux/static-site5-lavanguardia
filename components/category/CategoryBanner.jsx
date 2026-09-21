/**
 * Category page banner — a bold magazine section title, sized closer to
 * a cover line than a page heading, with the sub-section index running
 * beneath it as a distinct secondary row rather than crowding the same
 * line as the title.
 *
 * Closes with the system's signature teal→violet glow rule (the same
 * `.rule-glow` used on the header/footer edges and every SectionHeader)
 * instead of a flat print rule, so the page-front masthead reads as part
 * of the same dark/futuristic system as the homepage.
 */
export default function CategoryBanner({ title, subNav = [] }) {
  const items = [...subNav, "Latest news"];

  return (
    <div className="pb-6">
      <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent">
        <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]" aria-hidden="true" />
        Section
      </p>
      <h1 className="mt-1 font-serif text-[3rem] font-black uppercase leading-[0.95] tracking-[-0.01em] text-ink sm:text-[3.8rem]">
        {title}
      </h1>
      <nav aria-label={`${title} sections`} className="mt-4">
        <ul className="flex flex-wrap items-center gap-x-1 text-[12.5px] font-semibold text-ink-soft">
          {items.map((label, idx) => (
            <li key={label} className="flex items-center">
              <a
                href="#"
                className="group relative px-2.5 py-1 transition-colors hover:text-accent first:pl-0"
              >
                {label}
                <span
                  className="pointer-events-none absolute inset-x-2.5 bottom-0 h-px origin-center scale-x-0 bg-accent shadow-[0_0_6px_var(--color-accent)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </a>
              {idx < items.length - 1 && <span className="h-3 w-px bg-rule" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </nav>
      <div className="rule-glow mt-6 w-full" aria-hidden="true" />
    </div>
  );
}
