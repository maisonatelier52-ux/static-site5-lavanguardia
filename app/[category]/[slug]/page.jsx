import { notFound } from "next/navigation";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import TagBadge from "@/components/TagBadge";
import CategoryMostViewed from "@/components/category/CategoryMostViewed";
import ArticleAudioWidget from "@/components/article/ArticleAudioWidget";
import ArticleByline from "@/components/article/ArticleByline";
import ArticleAuthorCard from "@/components/article/ArticleAuthorCard";
import { getArticle, getCategoryTitle } from "@/lib/getArticle";
import { getHomeContent } from "@/lib/getHomeContent";
import { authorSlug, parseByline } from "@/lib/authorSlug";

// Article content — including body paragraphs — is looked up from
// data/categories/<category>.json (see lib/getArticle.js), the same
// single source of truth the homepage and category pages already read
// from. Body text is stored data, not generated at render time.

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};

  const { name: authorName } = parseByline(article.author);
  const categoryTitle = getCategoryTitle(article.category);
  const url = `/${category}/${slug}`;
  const images = article.image ? [{ url: article.image }] : undefined;

  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: url },
    keywords: [article.tag, categoryTitle, "La Vanguardia"].filter(Boolean),
    authors: authorName ? [{ name: authorName }] : undefined,
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      type: "article",
      publishedTime: article.date,
      authors: authorName ? [authorName] : undefined,
      section: categoryTitle,
      tags: article.tag ? [article.tag] : undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
      images,
    },
  };
}

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(`${iso}T00:00:00Z`)
    );
  } catch {
    return null;
  }
}

export default async function ArticleDetailPage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const { name: authorName, location } = parseByline(article.author);
  const authorHref = article.author ? `/authors/${authorSlug(article.author)}` : null;
  const bodyParagraphs = article.body?.length ? article.body : [article.dek].filter(Boolean);
  const mostViewed = getHomeContent().mostViewed?.items || [];
  const categoryTitle = getCategoryTitle(article.category);
  const displayDate = formatDate(article.date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: categoryTitle,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    publisher: {
      "@type": "Organization",
      name: "La Vanguardia",
    },
    image: article.image ? [article.image] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/${category}/${slug}`,
    },
  };

  return (
    <article className="bg-paper">
      {/* Structured data for search engines / Google News — kept in sync
          with the visible headline, dek, byline and date above rather
          than duplicated by hand. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Headline / dek / audio widget — full width, no rail alongside */}
      <div className="mx-auto max-w-[1440px] px-6 pt-8 md:pt-10">
        <div className="mx-auto max-w-[760px] text-center">
          {article.tag && (
            <p className="mb-3">
              <TagBadge>{article.tag}</TagBadge>
            </p>
          )}
          <h1 className="font-serif text-[2.1rem] font-bold leading-[1.12] text-ink text-balance sm:text-[2.6rem] md:text-[3rem]">
            {article.title}
          </h1>
          {article.dek && (
            <p className="mx-auto mt-5 max-w-[620px] font-serif text-lg leading-relaxed text-ink-soft sm:text-xl">
              {article.dek}
            </p>
          )}
          <div className="mt-5 flex justify-center">
            <ArticleAudioWidget />
          </div>
        </div>
      </div>

      {/* Hero image — full container width, no rail alongside */}
      <div className="mx-auto mt-8 max-w-[1440px] px-6">
        <ImagePlaceholder src={article.image} alt={article.title} className="aspect-[16/9] w-full" />
      </div>

      {/* Byline + body + rail */}
      <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="mx-auto w-full max-w-[700px] lg:mx-0">
            <ArticleByline authorName={authorName} authorHref={authorHref} location={location} date={displayDate} />
            <div className="rule-hairline" />

            <div
              data-drop-cap
              className="mt-8 space-y-6 font-serif text-[19px] leading-[1.75] text-ink [text-align:justify] [hyphens:auto]"
            >
              {bodyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <ArticleAuthorCard authorName={authorName} authorHref={authorHref} categoryTitle={categoryTitle} />
          </div>

          <div className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start lg:pt-6">
            <CategoryMostViewed items={mostViewed} />
          </div>
        </div>
      </div>
    </article>
  );
}
