import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAnalisis, getAnalisisBySlug, getAnalisisSlugs } from "@/lib/content";
import { formatDate, SITE_URL, SITE_NAME } from "@/lib/utils";
import mdxComponents from "@/components/MDXComponents";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generar rutas estáticas para todos los análisis
export async function generateStaticParams() {
  return getAnalisisSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getAnalisisBySlug(slug);
  if (!item) return {};

  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    openGraph: {
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      type: "article",
      publishedTime: item.frontmatter.pubDate,
      modifiedTime: item.frontmatter.updatedDate,
      authors: [item.frontmatter.author],
      tags: item.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: item.frontmatter.title,
      description: item.frontmatter.description,
    },
  };
}

export default async function AnalisisArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = getAnalisisBySlug(slug);
  if (!item) notFound();

  // Artículos relacionados: mismos tags, excluyendo el actual
  const allItems = getAnalisis();
  const related = allItems
    .filter((a) => a.slug !== slug)
    .filter((a) => a.frontmatter.tags.some((t) => item.frontmatter.tags.includes(t)))
    .slice(0, 2);

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.frontmatter.title,
    description: item.frontmatter.description,
    datePublished: item.frontmatter.pubDate,
    dateModified: item.frontmatter.updatedDate ?? item.frontmatter.pubDate,
    author: {
      "@type": "Person",
      name: item.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Header del artículo */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
            <time dateTime={item.frontmatter.pubDate}>{formatDate(item.frontmatter.pubDate)}</time>
            {item.frontmatter.readingTime && (
              <>
                <span>&middot;</span>
                <span className="font-data">{item.frontmatter.readingTime} min de lectura</span>
              </>
            )}
            <span>&middot;</span>
            <span>{item.frontmatter.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-text leading-tight mb-3">
            {item.frontmatter.title}
          </h1>

          <p className="text-lg text-text-secondary">{item.frontmatter.description}</p>

          {item.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-bg-secondary text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Contenido MDX */}
        <div className="prose">
          <MDXRemote
            source={item.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
              },
            }}
          />
        </div>

        {/* Separador */}
        <hr className="border-border my-12" />

        {/* Newsletter CTA */}
        <NewsletterCTA />

        {/* Artículos relacionados */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-text mb-4">Seguir leyendo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <ArticleCard key={r.slug} slug={r.slug} frontmatter={r.frontmatter} />
              ))}
            </div>
          </div>
        )}

        {/* Volver */}
        <div className="mt-8">
          <Link href="/analisis" className="text-sm text-accent hover:text-accent-hover transition-colors">
            &larr; Volver a análisis
          </Link>
        </div>
      </article>
    </>
  );
}
