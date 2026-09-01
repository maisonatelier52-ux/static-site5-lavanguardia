import ArticleCard from "@/components/ArticleCard";

/**
 * "Opinion and analysis" — reworked into an editorial "column well": a
 * tinted panel that visually separates opinion content from reported
 * news elsewhere on the page (a convention real magazines and papers
 * use — opinion pages read differently from news pages). The first item
 * (kicker "Editorial" in the source data) runs as the lead column voice,
 * larger and set apart from the other three.
 */
export default function OpinionSection({ items }) {
  if (!items?.length) return null;
  const [lead, ...rest] = items;

  return (
    <div className="bg-panel px-6 py-8 md:px-9 md:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="border-b border-panel-line pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-9">
          <OpinionLead article={lead} />
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 lg:divide-y lg:divide-panel-line">
          {rest.map((article) => (
            <div key={article.id} className="lg:py-5 lg:first:pt-0 lg:last:pb-0">
              <ArticleCard article={article} variant="opinion" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpinionLead({ article }) {
  if (!article) return null;
  const href = `/${article.category || "article"}/${article.slug}`;
  const excerpt = article.body?.slice(0, 2);

  return (
    <article>
      {article.kicker && (
        <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-accent">{article.kicker}</p>
      )}
      <h3 className="mt-2 font-serif text-[1.7rem] italic font-semibold leading-[1.2] text-ink text-balance md:text-[2rem]">
        <a href={href} className="hover:text-accent-ink">
          {article.title}
        </a>
      </h3>
      {article.dek && <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-soft">{article.dek}</p>}
      {excerpt?.map((paragraph, i) => (
        <p key={i} className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          {paragraph}
        </p>
      ))}
      {article.author && (
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-faint">{article.author}</p>
      )}
    </article>
  );
}
