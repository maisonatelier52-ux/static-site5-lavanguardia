import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

/**
 * Desktop category nav row — bold serif links in a single dense strip,
 * each separated by a thin vertical rule (a print column-rule, not a
 * literal "/" glyph) so the row reads as one continuous edition index
 * rather than a set of separate pill buttons.
 */
export default function MainNav({ className = "" }) {
  return (
    <nav className={className} aria-label="Main navigation">
      <ul className="flex flex-wrap items-stretch justify-center">
        {siteConfig.mainNav.map((item, idx) => (
          <li key={item.href} className="flex items-stretch">
            <Link
              href={item.href}
              className="flex items-center px-3 py-3.5 text-[13px] font-bold text-ink transition-colors hover:text-navy/70 lg:px-3.5 lg:text-[13.5px]"
            >
              {item.label}
            </Link>
            {idx < siteConfig.mainNav.length - 1 && (
              <span className="my-3 w-px bg-rule" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
