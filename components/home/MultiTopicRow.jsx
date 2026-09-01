import ArticleCard from "@/components/ArticleCard";

/**
 * Row of independent mini topic-columns (Fortune / Legal / Breaking Views
 * / Smartlife). Reworked with alternating tinted backgrounds so the row
 * reads as a set of distinct mini-sections placed side by side — like a
 * magazine's "quick reads" strip — rather than four plain text columns
 * separated only by a hairline.
 */
export default function MultiTopicRow({ topics }) {
  return (
    <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
      {topics.map((topic, idx) => (
        <div key={topic.title} className={`px-6 py-6 ${idx % 2 === 1 ? "bg-panel" : ""}`}>
          <h3 className="font-serif text-[17px] font-bold italic text-ink">{topic.title}</h3>
          <div className="mt-4 divide-y divide-rule [&>*]:py-3.5 first:[&>*]:pt-0">
            {topic.items.map((article) => (
              <ArticleCard key={article.id} article={article} variant="text" size="sm" showDek={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
