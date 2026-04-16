import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import ToolCard from "@/components/ToolCard";
import ChangelogEntryComponent from "@/components/ChangelogEntry";
import NewsletterCTA from "@/components/NewsletterCTA";
import { getAnalisis, getChangelog } from "@/lib/content";

export default function Home() {
  const analisis = getAnalisis().slice(0, 3);
  const changelog = getChangelog().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-text leading-tight mb-4">
          TikTok Shop Europa
          <br />
          <span className="text-accent">para vendedores que operan de verdad</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
          Herramientas, datos actualizados y analisis desde la trinchera.
          Sin humo, sin gurues, sin teoria.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/herramientas"
            className="px-6 py-2.5 bg-accent text-white font-medium rounded-md hover:bg-accent-hover transition-colors text-sm"
          >
            Ver herramientas
          </Link>
          {analisis.length > 0 && (
            <Link
              href={`/analisis/${analisis[0].slug}`}
              className="px-6 py-2.5 border border-border text-text font-medium rounded-md hover:bg-bg-secondary transition-colors text-sm"
            >
              Ultimo analisis
            </Link>
          )}
        </div>
      </section>

      {/* Herramientas */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">Herramientas</h2>
          <Link href="/herramientas" className="text-sm text-accent hover:text-accent-hover transition-colors">
            Ver todas &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ToolCard
            name="Calculadora de rentabilidad"
            description="Calcula margenes reales por producto incluyendo comisiones TTS, envio, IVA y costes."
            href="/herramientas/calculadora"
            status="disponible"
          />
          <ToolCard
            name="Tabla de envios TTS Europa"
            description="Costes, tiempos y carriers por ruta. Comparativa entre paises y opciones de fulfillment."
            href="/herramientas/envios"
            status="disponible"
          />
          <ToolCard
            name="Simulador ROI por campaña"
            description="Proyecta retorno de campañas de afiliados y ads basandote en datos historicos."
            href="/herramientas"
            status="proximamente"
          />
        </div>
      </section>

      {/* Ultimo analisis */}
      {analisis.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Ultimo analisis</h2>
            <Link href="/analisis" className="text-sm text-accent hover:text-accent-hover transition-colors">
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analisis.map((item) => (
              <ArticleCard key={item.slug} slug={item.slug} frontmatter={item.frontmatter} />
            ))}
          </div>
        </section>
      )}

      {/* Datos y fichas */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">Datos y fichas</h2>
          <Link href="/datos" className="text-sm text-accent hover:text-accent-hover transition-colors">
            Ver todos &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/datos/comisiones" className="group p-5 rounded-lg border border-border bg-card-bg hover:border-accent/40 transition-colors">
            <h3 className="font-semibold text-text group-hover:text-accent transition-colors mb-1">Comisiones TTS</h3>
            <p className="text-sm text-text-secondary">Comisiones por pais y categoria. Actualizadas manualmente.</p>
          </Link>
          <Link href="/datos/ivas-europa" className="group p-5 rounded-lg border border-border bg-card-bg hover:border-accent/40 transition-colors">
            <h3 className="font-semibold text-text group-hover:text-accent transition-colors mb-1">IVAs Europa</h3>
            <p className="text-sm text-text-secondary">IVA estandar y reducido por pais europeo donde opera TTS.</p>
          </Link>
          <Link href="/datos/herramientas-tts" className="group p-5 rounded-lg border border-border bg-card-bg hover:border-accent/40 transition-colors">
            <h3 className="font-semibold text-text group-hover:text-accent transition-colors mb-1">Directorio de herramientas</h3>
            <p className="text-sm text-text-secondary">Herramientas externas para analytics, research y gestion de TTS.</p>
          </Link>
        </div>
      </section>

      {/* Changelog */}
      {changelog.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Ultimos cambios en TTS Europa</h2>
            <Link href="/changelog" className="text-sm text-accent hover:text-accent-hover transition-colors">
              Ver todos &rarr;
            </Link>
          </div>
          <div className="border border-border rounded-lg bg-card-bg p-4 divide-y divide-border">
            {changelog.map((entry) => (
              <ChangelogEntryComponent
                key={entry.slug}
                frontmatter={entry.frontmatter}
                compact
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <NewsletterCTA />
      </section>
    </div>
  );
}
