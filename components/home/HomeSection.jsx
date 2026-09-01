import SectionDivider from "@/components/SectionDivider";
import SectionHeader from "@/components/SectionHeader";

/**
 * Every homepage section (Present, The best of the week, Cryptos, Opinion
 * and analysis, Economy, Extras, Markets, Funds and plans, Most viewed…)
 * is wrapped in this ONE component for its divider + heading + vertical
 * rhythm.
 *
 * SectionHeader now draws its own heavy top rule as part of the magazine
 * "running head" treatment, so a titled section no longer needs a
 * separate SectionDivider above it — that would double the rule. The two
 * title-less sections (the topic-brand rows near the foot of the page)
 * still get the plain double-rule divider since nothing else marks where
 * they begin.
 */
export default function HomeSection({ title, rightSlot, first = false, children }) {
  return (
    <section>
      {!first && !title && <SectionDivider />}
      <div className="py-9 md:py-11">
        {title && <SectionHeader title={title} rightSlot={rightSlot} />}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}
