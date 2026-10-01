import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

/**
 * Desktop category nav row — bold serif links in a single dense strip,
 * each separated by a thin vertical rule (a print column-rule, not a
 * literal "/" glyph) so the row reads as one continuous edition index
 * rather than a set of separate pill buttons.
 *
 * Hover state is a soft glowing pill (background + border + halo),
 * matching the header's "Cinematic glow" treatment — nav items light up
 * rather than just gaining an underline.
 */
export default function MainNav({ className = "" }) {
  return (
    <nav className={className} aria-label="Main navigation">
      <ul className="flex flex-wrap items-stretch justify-center">
        {siteConfig.mainNav.map((item, idx) => (
          <li key={item.href} className="flex items-stretch">
            <Link
              href={item.href}
              className="flex items-center rounded-full border border-transparent px-4 py-2 text-[13px] font-bold text-ink transition-all duration-200 ease-out hover:border-accent/35 hover:bg-accent/[0.08] hover:text-accent-ink hover:shadow-[0_0_14px_rgba(47,230,201,0.2)] lg:px-4.5 lg:text-[13.5px]"
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
