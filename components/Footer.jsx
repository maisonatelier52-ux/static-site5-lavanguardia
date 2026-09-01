import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

/**
 * Site footer / colophon. Restyled from a single centered stack into a
 * printed-masthead colophon: a wordmark + accent rule flag on the left,
 * the legal link index on the right, with the copyright line running
 * full-width beneath — closer to how a real newspaper prints its
 * ownership/legal block than a centered social-card footer.
 */
export default function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="mt-auto bg-navy">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label={siteConfig.siteName} className="inline-flex flex-col">
              <span className="font-serif text-3xl font-black uppercase tracking-[-0.01em] text-white md:text-4xl">
                {siteConfig.siteName}
              </span>
              <span className="mt-3 h-[3px] w-12 bg-gold" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Footer navigation" className="md:max-w-xl">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-white/75 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/50">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
