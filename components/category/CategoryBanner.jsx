/**
 * Category page banner — a bold magazine section title, sized closer to
 * a cover line than a page heading, with the sub-section index running
 * beneath it as a distinct secondary row rather than crowding the same
 * line as the title.
 */
export default function CategoryBanner({ title, subNav = [] }) {
  const items = [...subNav, "Latest news"];

  return (
    <div className="border-b-4 border-ink pb-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent">Section</p>
      <h1 className="mt-1 font-serif text-[3rem] font-black uppercase leading-[0.95] tracking-[-0.01em] text-ink sm:text-[3.8rem]">
        {title}
      </h1>
      <nav aria-label={`${title} sections`} className="mt-4">
        <ul className="flex flex-wrap items-center gap-x-1 text-[12.5px] font-semibold text-ink-soft">
          {items.map((label, idx) => (
            <li key={label} className="flex items-center">
              <a href="#" className="px-2.5 py-1 transition-colors hover:text-accent first:pl-0">
                {label}
              </a>
              {idx < items.length - 1 && <span className="h-3 w-px bg-rule" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
