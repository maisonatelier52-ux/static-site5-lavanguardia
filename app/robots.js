const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Next.js serves this at /robots.txt. */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
