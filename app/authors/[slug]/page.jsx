import { notFound } from "next/navigation";
import AuthorBanner from "@/components/authors/AuthorBanner";
import CategoryArticleRow from "@/components/category/CategoryArticleRow";
import { getAuthorBySlug, getAuthorBio } from "@/lib/getAuthors";

// Author data is derived entirely from data/categories/*.json (see
// lib/getAuthors.js) — every author here already exists as a real
// `author` byline on at least one article somewhere on the site. Nothing
// is hand-added or invented.
export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const bio = getAuthorBio(author);

  return (
    <div className="bg-page-bg">
      <div className="mx-auto max-w-[1440px] px-6 py-6 md:py-8">
        <AuthorBanner name={author.name} bio={bio} />

        <div className="mt-9">
          {author.articles.length > 0 ? (
            <div className="grid grid-cols-1 items-start gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {author.articles.map((article) => (
                <CategoryArticleRow key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-ink-soft">No articles published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
