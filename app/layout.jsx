// Self-hosted fonts (bundled via @fontsource, no external network calls at build/runtime)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/600-italic.css";
import "@fontsource/playfair-display/700-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";

import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

// metadataBase resolves every relative URL used in child pages' Open Graph
// / Twitter metadata (e.g. openGraph.images: ["/images/..."]) into an
// absolute one, which social platforms and crawlers require. Set
// NEXT_PUBLIC_SITE_URL in production to the real deployed domain; this
// falls back to localhost so `npm run dev`/`next build` work out of the
// box without it.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Vanguardia — U.S., Business, Finance & World News",
    template: "%s | La Vanguardia",
  },
  description:
    "La Vanguardia covers U.S. news, business, finance and world affairs — breaking news, markets, and analysis updated throughout the day.",
  keywords: ["news", "U.S. news", "business news", "finance news", "world news", "breaking news", "markets"],
  openGraph: {
    siteName: "La Vanguardia",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-paper text-ink">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
