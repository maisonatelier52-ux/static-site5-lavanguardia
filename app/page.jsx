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

// Note: the reference site's "Tools" and "EL PAÍS Wines" promo sections are
// intentionally left out per request — every other section below matches
// the reference's order, item counts, and layout shape.
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

        <HomeSection title={c.cryptos.title}>
          <ArticleAdSection lead={c.cryptos.lead} columns={c.cryptos.columns} secondaryRow={c.cryptos.secondaryRow} adSize="mrec" />
        </HomeSection>

        <HomeSection title={c.opinionAndAnalysis.title}>
          <OpinionSection items={c.opinionAndAnalysis.items} />
        </HomeSection>

        <HomeSection title={c.economy.title}>
          <ArticleAdSection lead={c.economy.lead} columns={c.economy.columns} />
        </HomeSection>

        <HomeSection title={c.extras.title}>
          <ImageGridSection items={c.extras.items} columns={4} />
        </HomeSection>

        <HomeSection title={c.markets.title}>
          <ArticleAdSection lead={c.markets.lead} columns={c.markets.columns} />
        </HomeSection>

        <HomeSection title={c.elPais.title}>
          <ImageGridSection items={c.elPais.items} columns={4} />
        </HomeSection>

        <HomeSection title={c.fundsAndPlans.title} rightSlot={<SponsorLabel text={c.fundsAndPlans.sponsorLabel} />}>
          <ArticleAdSection lead={c.fundsAndPlans.lead} columns={c.fundsAndPlans.columns} adSize="mrec" />
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
      className="border border-ink px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
    >
      Newsletter agenda
    </button>
  );
}

function SponsorLabel({ text }) {
  if (!text) return null;
  return <span className="text-xs font-semibold text-ink-faint">{text}</span>;
}
