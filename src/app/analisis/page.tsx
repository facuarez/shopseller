import type { Metadata } from "next";
import Link from "next/link";
import { getAnalisis } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Analisis",
  description: "Analisis y reflexiones sobre TikTok Shop Europa desde la perspectiva de un vendedor real.",
};

export default function AnalisisPage() {
  const items = getAnalisis();
  const featured = items.find((i) => i.frontmatter.featured);
  const rest = items.filter((i) => i.slug !== featured?.slug);

  return (
    <div>
      {/* Header con fondo */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Analisis</p>
          <h1 className="text-3xl font-bold text-text mb-3">Desde la trinchera, no desde la teoria</h1>
          <p className="text-text-secondary max-w-xl">
            Reflexiones, datos y angulos sobre TikTok Shop Europa que no vas a encontrar
            en ningun otro sitio en español. Todo desde la experiencia operando.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-data font-semibold text-text">{items.length}</span> articulos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Por <span className="font-semibold text-text">Facu</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Featured — grande, visual */}
        {featured && (
          <div className="mb-10">
            <Link
              href={`/analisis/${featured.slug}`}
              className="group block rounded-2xl border-2 border-border bg-card-bg overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Accent sidebar */}
                <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a2e] p-8 flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/20 text-accent text-[11px] font-semibold mb-4">Destacado</span>
                    <h2 className="text-2xl font-bold text-white leading-snug group-hover:text-accent transition-colors">
                      {featured.frontmatter.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-xs text-[#888] font-data">{formatDate(featured.frontmatter.pubDate)}</span>
                    <span className="text-[#555]">&middot;</span>
                    <span className="text-xs text-[#888] font-data">{featured.frontmatter.readingTime} min</span>
                  </div>
                </div>
                {/* Content */}
                <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="lg:hidden mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-semibold">Destacado</span>
                  </div>
                  <h2 className="lg:hidden text-xl font-bold text-text group-hover:text-accent transition-colors mb-2">
                    {featured.frontmatter.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {featured.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured.frontmatter.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md bg-bg-secondary text-text-secondary font-medium">{tag}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Leer articulo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid de articulos */}
        {rest.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest shrink-0">Todos los articulos</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/analisis/${item.slug}`}
                  className="group flex gap-4 p-5 rounded-xl border border-border bg-card-bg shadow-sm hover:border-accent/40 hover:shadow-md transition-all"
                >
                  {/* Number */}
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold font-data text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-text-secondary mb-1.5">
                      <time dateTime={item.frontmatter.pubDate}>{formatDate(item.frontmatter.pubDate)}</time>
                      <span>&middot;</span>
                      <span className="font-data">{item.frontmatter.readingTime} min</span>
                    </div>
                    <h3 className="font-semibold text-text group-hover:text-accent transition-colors mb-1 leading-snug">
                      {item.frontmatter.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {item.frontmatter.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {item.frontmatter.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-bg-secondary text-text-secondary">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
