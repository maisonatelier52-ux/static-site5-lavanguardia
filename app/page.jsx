import { getHomeContent } from "@/lib/getHomeContent";
import HeroSection from "@/components/home/HeroSection";
import HomeSection from "@/components/home/HomeSection";
import PresentSection from "@/components/home/PresentSection";
import ImageGridSection from "@/components/home/ImageGridSection";
import ArticleAdSection from "@/components/home/ArticleAdSection";
import OpinionSection from "@/components/home/OpinionSection";
import MultiTopicRow from "@/components/home/MultiTopicRow";
import BrandTeaserRow from "@/components/home/BrandTeaserRow";
import MostViewedSection from "@/components/home/MostViewedSection";

const DESCRIPTION =
  "Breaking U.S. news, business, finance and world coverage from La Vanguardia — top stories, markets and analysis updated throughout the day.";

export const metadata = {
  title: { absolute: "La Vanguardia — U.S., Business, Finance & World News" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "La Vanguardia — U.S., Business, Finance & World News",
    description: DESCRIPTION,
    url: "/",
    type: "website",
  },
  twitter: {
    title: "La Vanguardia — U.S., Business, Finance & World News",
    description: DESCRIPTION,
  },
};

// Note: the reference site's "Tools" and "EL PAÍS Wines" promo sections are
// intentionally left out per request — every other section below matches
// the reference's order, item counts, and layout shape.
//
// The old "Funds and plans" (Kutxabank-sponsored) and "EL PAÍS" sections
// were dropped when the site moved to its 4 real categories — see the
// header comment in data/homeLayout.js for why.
//
// Article CONTENT (title, dek, author, image, tag) now lives only in
// data/categories/<category>.json. This page's layout — which article
// appears in which section/column/order — lives in data/homeLayout.js.
// getHomeContent() resolves the two together into the same nested shape
// this component always consumed, so nothing below this line changed.

export default function HomePage() {
  const c = getHomeContent();

  return (
    <div className="bg-page-bg">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Hero / trending — no title row, sits directly at the top */}
        <div className="py-6 md:py-8">
          <HeroSection left={c.hero.left} center={c.hero.center} right={c.hero.right} latestNews={c.hero.latestNews} />
        </div>

        <HomeSection title="Present" rightSlot={<NewsletterButton />}>
          <PresentSection left={c.present.left} middle={c.present.middle} sponsored={c.present.sponsored} />
        </HomeSection>

        <HomeSection title={c.bestOfWeek.title}>
          <ImageGridSection items={c.bestOfWeek.items} columns={4} />
        </HomeSection>

        <HomeSection title={c.markets.title}>
          <ArticleAdSection lead={c.markets.lead} columns={c.markets.columns} secondaryRow={c.markets.secondaryRow} adSize="mrec" />
        </HomeSection>

        <HomeSection title={c.opinionAndAnalysis.title}>
          <OpinionSection items={c.opinionAndAnalysis.items} />
        </HomeSection>

        <HomeSection title={c.business.title}>
          <ArticleAdSection lead={c.business.lead} columns={c.business.columns} />
        </HomeSection>

        <HomeSection title={c.extras.title}>
          <ImageGridSection items={c.extras.items} columns={4} />
        </HomeSection>

        <HomeSection>
          <MultiTopicRow topics={c.multiTopics} />
        </HomeSection>

        <HomeSection>
          <BrandTeaserRow brands={c.brandTeasers} />
        </HomeSection>

        <HomeSection title={c.mostViewed.title}>
          <MostViewedSection items={c.mostViewed.items} />
        </HomeSection>
      </div>
    </div>
  );
}

function NewsletterButton() {
  return (
    <button
      type="button"
      className="border border-white/15 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-ink transition-all hover:border-accent hover:text-accent hover:shadow-[var(--shadow-accent-sm)]"
    >
      Newsletter agenda
    </button>
  );
}
