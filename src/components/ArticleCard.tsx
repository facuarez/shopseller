import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { AnalisisFrontmatter } from "@/types/content";

interface Props {
  slug: string;
  frontmatter: AnalisisFrontmatter;
}

export default function ArticleCard({ slug, frontmatter }: Props) {
  return (
    <Link
      href={`/analisis/${slug}`}
      className="group block p-5 rounded-xl border border-border bg-card-bg shadow-sm hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
        <time dateTime={frontmatter.pubDate}>{formatDate(frontmatter.pubDate)}</time>
        {frontmatter.readingTime && (
          <>
            <span>&middot;</span>
            <span className="font-data">{frontmatter.readingTime} min</span>
          </>
        )}
      </div>
      <h3 className="font-semibold text-text group-hover:text-accent transition-colors mb-1.5">
        {frontmatter.title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
        {frontmatter.description}
      </p>
      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-bg-secondary text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
