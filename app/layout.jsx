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

import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: "La Vanguardia",
  description: "La Vanguardia — frontend clone",
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
