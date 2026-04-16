import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAnalisis } from "@/lib/content";

export const metadata: Metadata = {
  title: "Analisis",
  description: "Analisis y reflexiones sobre TikTok Shop Europa desde la perspectiva de un vendedor real.",
};

export default function AnalisisPage() {
  const items = getAnalisis();

  // Separar featured del resto
  const featured = items.filter((i) => i.frontmatter.featured);
  const rest = items.filter((i) => !i.frontmatter.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Analisis</h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Reflexiones, datos y angulos sobre TikTok Shop Europa que no vas a encontrar
        en ningun otro sitio en español. Todo desde la experiencia operando.
      </p>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
            Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((item) => (
              <ArticleCard key={item.slug} slug={item.slug} frontmatter={item.frontmatter} />
            ))}
          </div>
        </div>
      )}

      {/* Todos */}
      <div>
        {featured.length > 0 && (
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
            Todos los articulos
          </h2>
        )}
        {items.length === 0 ? (
          <p className="text-text-secondary py-8">Todavia no hay articulos publicados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(featured.length > 0 ? rest : items).map((item) => (
              <ArticleCard key={item.slug} slug={item.slug} frontmatter={item.frontmatter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
