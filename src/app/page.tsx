import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import ChangelogEntryComponent from "@/components/ChangelogEntry";
import NewsletterCTA from "@/components/NewsletterCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { getAnalisis, getChangelog } from "@/lib/content";

export default function Home() {
  const analisis = getAnalisis().slice(0, 3);
  const changelog = getChangelog().slice(0, 3);
  const featured = analisis.find((a) => a.frontmatter.featured);
  const rest = analisis.filter((a) => a.slug !== featured?.slug);

  return (
    <div>
      {/* ═══════════════════════════════════════════════
          1. HERO — fondo oscuro + mockup dashboard
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #FF5A1F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/8 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-20 lg:pt-28 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal from="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent font-medium">Operando en TTS Europa</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
                TikTok Shop Europa
                <br />
                <span className="text-accent">para vendedores reales</span>
              </h1>
              <p className="text-lg text-[#999] max-w-md mb-8 leading-relaxed">
                Herramientas, datos actualizados y analisis desde la trinchera.
                Sin humo, sin gurues, sin teoria.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/herramientas" className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all text-sm shadow-lg shadow-accent/20">
                  Ver herramientas
                </Link>
                {analisis.length > 0 && (
                  <Link href={`/analisis/${analisis[0].slug}`} className="px-6 py-3 border border-[#333] text-[#ccc] font-medium rounded-lg hover:bg-[#111] hover:border-[#555] transition-all text-sm">
                    Ultimo analisis
                  </Link>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal from="right" delay={200} className="hidden lg:block">
              <div className="relative">
                <div className="bg-[#111] border border-[#222] rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-[#666] font-medium uppercase tracking-wider">Resumen de producto</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium">Rentable</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#1a1a1a]">
                      <p className="text-[10px] text-[#666] mb-1">Margen neto</p>
                      <p className="text-2xl font-bold text-white font-data">23.4<span className="text-sm text-accent">%</span></p>
                    </div>
                    <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#1a1a1a]">
                      <p className="text-[10px] text-[#666] mb-1">Beneficio/unidad</p>
                      <p className="text-2xl font-bold text-white font-data">4.82<span className="text-sm text-[#666]">&euro;</span></p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: "PVP", value: "24.99 €", accent: false },
                      { label: "Comision TTS", value: "-5.0%", accent: true },
                      { label: "IVA (ES 21%)", value: "-4.34 €", accent: false },
                      { label: "Envio", value: "-3.50 €", accent: false },
                      { label: "Coste producto", value: "-8.20 €", accent: false },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-[#1a1a1a] last:border-0">
                        <span className="text-xs text-[#888]">{row.label}</span>
                        <span className={`text-sm font-data ${row.accent ? "text-accent font-semibold" : "text-[#ccc]"}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#111] border border-[#222] rounded-lg p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#666]">6 paises</p>
                      <p className="text-xs text-white font-semibold font-data">ES FR IT DE IE UK</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. HERRAMIENTAS — 3 cards compactas con borde
          ═══════════════════════════════════════════════ */}
      <section className="bg-bg-secondary py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Herramientas</p>
            <h2 className="text-3xl font-bold text-text mb-3">Apps que construi porque las necesitaba</h2>
            <p className="text-text-secondary max-w-lg mb-10">
              Cada herramienta nace de un problema operativo real. No son demos — son lo que uso para gestionar mi propia operacion en TTS.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Calculadora */}
            <ScrollReveal delay={0}>
              <Link href="/herramientas/calculadora" className="group block h-full p-6 rounded-xl border-2 border-border bg-card-bg shadow-sm hover:border-accent/50 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="10" y2="18" /><line x1="14" y1="18" x2="16" y2="18" /></svg>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Disponible</span>
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors mb-2">Calculadora de rentabilidad</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Calcula el PVP minimo rentable por pais. Comisiones TTS, IVA, envios y afiliados incluidos.
                </p>
                <div className="bg-bg-secondary rounded-lg p-3 font-data text-xs space-y-1.5">
                  <div className="flex justify-between"><span className="text-text-secondary">PVP</span><span className="text-text font-semibold">24.99 €</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Costes</span><span className="text-red-400">-17.29 €</span></div>
                  <div className="flex justify-between border-t border-border pt-1.5"><span className="text-text font-semibold">Margen</span><span className="text-accent font-bold">+7.70 € (30.8%)</span></div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Envios */}
            <ScrollReveal delay={100}>
              <Link href="/herramientas/envios" className="group block h-full p-6 rounded-xl border-2 border-border bg-card-bg shadow-sm hover:border-accent/50 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Disponible</span>
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors mb-2">Comparador de envios</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Matriz de costes por ruta, peso y tipo de entrega. Compara todas las rutas EU de un vistazo.
                </p>
                <div className="bg-bg-secondary rounded-lg p-3 font-data text-xs space-y-1.5">
                  <div className="flex justify-between"><span className="text-text-secondary">🇪🇸→🇪🇸</span><span className="text-green-600 dark:text-green-400 font-semibold">2.50 €</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">🇪🇸→🇫🇷</span><span className="text-text font-semibold">5.20 €</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">🇪🇸→🇮🇪</span><span className="text-red-400 font-semibold">9.60 €</span></div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Analizador de afiliados */}
            <ScrollReveal delay={200}>
              <Link href="/herramientas/afiliados" className="group block h-full p-6 rounded-xl border-2 border-border bg-card-bg shadow-sm hover:border-accent/50 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Disponible</span>
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors mb-2">Analizador de afiliados</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Subi tu CSV de ordenes y obtene rankings de afiliados, videos y productos. 100% en tu navegador.
                </p>
                <div className="bg-bg-secondary rounded-lg p-3 font-data text-xs space-y-1.5">
                  <div className="flex justify-between"><span className="text-text-secondary">Top afiliados</span><span className="text-text font-semibold">por GMV</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Top videos</span><span className="text-text font-semibold">por ventas</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Org. vs Paid</span><span className="text-accent font-semibold">atribucion</span></div>
                </div>
              </Link>
            </ScrollReveal>
          </div>

          {/* Proximamente */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              {["Seguimiento de muestras", "Simulador ROI"].map((name) => (
                <span key={name} className="px-4 py-2 rounded-lg border border-border/60 text-xs text-text-secondary">
                  Proximamente: {name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. DATOS — Bento grid asimetrico (Stripe style)
          ═══════════════════════════════════════════════ */}
      <section className="bg-bg py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Datos</p>
            <h2 className="text-3xl font-bold text-text mb-4">Base de datos del vendedor TTS</h2>
            <p className="text-text-secondary max-w-lg mb-10">
              Informacion estructurada que actualizo manualmente con datos verificados. No es scraping — es experiencia operativa documentada.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Card grande — Comisiones (2 cols) */}
            <ScrollReveal className="lg:col-span-2">
              <Link href="/datos/comisiones" className="group block h-full p-6 rounded-xl border border-border bg-card-bg shadow-sm hover:border-accent/40 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">Comisiones TTS por pais</h3>
                    <p className="text-sm text-text-secondary mt-1">Desglose por categoria y pais. Ultima actualizacion: abril 2026.</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary group-hover:text-accent transition-colors shrink-0">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
                {/* Mini tabla preview */}
                <div className="bg-bg-secondary rounded-lg p-4 mt-2">
                  <table className="w-full text-sm font-data">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-[10px] text-text-secondary uppercase pb-2">Pais</th>
                        <th className="text-left text-[10px] text-text-secondary uppercase pb-2">Categoria</th>
                        <th className="text-right text-[10px] text-text-secondary uppercase pb-2">Comision</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50"><td className="py-2 text-xs text-text">🇪🇸 España</td><td className="py-2 text-xs text-text-secondary">Hogar y jardin</td><td className="py-2 text-xs text-right text-accent font-semibold">TODO</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2 text-xs text-text">🇫🇷 Francia</td><td className="py-2 text-xs text-text-secondary">Belleza</td><td className="py-2 text-xs text-right text-accent font-semibold">TODO</td></tr>
                      <tr><td className="py-2 text-xs text-text">🇬🇧 UK</td><td className="py-2 text-xs text-text-secondary">Moda</td><td className="py-2 text-xs text-right text-accent font-semibold">TODO</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-accent font-medium mt-4">Ver tabla completa &rarr;</p>
              </Link>
            </ScrollReveal>

            {/* Cards chicas apiladas (1 col) */}
            <div className="flex flex-col gap-5">
              <ScrollReveal delay={100}>
                <Link href="/datos/ivas-europa" className="group block p-6 rounded-xl border border-border bg-card-bg shadow-sm hover:border-accent/40 hover:shadow-md transition-all">
                  <h3 className="font-bold text-text group-hover:text-accent transition-colors mb-2">IVAs Europa</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">IVA estandar y reducido por pais.</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { country: "ES", rate: "21%" },
                      { country: "FR", rate: "20%" },
                      { country: "DE", rate: "19%" },
                      { country: "IT", rate: "22%" },
                    ].map((v) => (
                      <span key={v.country} className="text-[11px] px-2 py-1 rounded-md bg-bg-secondary font-data text-text-secondary">
                        {v.country} <span className="text-text font-semibold">{v.rate}</span>
                      </span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <Link href="/datos/herramientas-tts" className="group block p-6 rounded-xl border border-border bg-card-bg shadow-sm hover:border-accent/40 hover:shadow-md transition-all">
                  <h3 className="font-bold text-text group-hover:text-accent transition-colors mb-2">Directorio de herramientas</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">Analytics, research y gestion para TTS.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Kalodata", "FastMoss", "Shoplus", "EchoTik"].map((t) => (
                      <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-bg-secondary text-text-secondary">{t}</span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. ANALISIS — Featured highlight + smaller cards
          ═══════════════════════════════════════════════ */}
      {analisis.length > 0 && (
        <section className="bg-bg-secondary py-20 border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Analisis</p>
              <h2 className="text-3xl font-bold text-text mb-10">Desde la trinchera, no desde la teoria</h2>
            </ScrollReveal>

            {/* Featured article — bloque grande */}
            {featured && (
              <ScrollReveal>
                <Link
                  href={`/analisis/${featured.slug}`}
                  className="group block p-8 rounded-xl border border-border bg-card-bg shadow-sm hover:border-accent/40 hover:shadow-md transition-all mb-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">Destacado</span>
                        <span className="text-xs text-text-secondary font-data">{featured.frontmatter.readingTime} min de lectura</span>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-text group-hover:text-accent transition-colors mb-2">
                        {featured.frontmatter.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-2xl">
                        {featured.frontmatter.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        Leer
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* Resto de articulos */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {rest.map((item, i) => (
                  <ScrollReveal key={item.slug} delay={i * 100}>
                    <ArticleCard slug={item.slug} frontmatter={item.frontmatter} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            <ScrollReveal>
              <div className="mt-8 text-center">
                <Link href="/analisis" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                  Ver todos los articulos &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          5. SOCIAL PROOF / TRUST — Fondo oscuro (rompe ritmo)
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-20 border-t border-[#222]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, #FF5A1F 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
              Datos verificados por un operador real
              <br />
              <span className="text-[#666]">que vende en TTS Europa todos los dias</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                { value: "6", label: "Paises cubiertos" },
                { value: "5+", label: "Herramientas" },
                { value: "Semanal", label: "Actualizacion de datos" },
                { value: "100%", label: "Datos propios" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-4 py-3">
                  <p className="text-2xl sm:text-3xl font-bold text-accent font-data">{stat.value}</p>
                  <p className="text-xs text-[#888] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. CHANGELOG — Timeline con dots
          ═══════════════════════════════════════════════ */}
      {changelog.length > 0 && (
        <section className="bg-bg py-20 border-t border-border">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Changelog</p>
                  <h2 className="text-3xl font-bold text-text">Cambios en TTS Europa</h2>
                </div>
                <Link href="/changelog" className="text-sm text-accent hover:text-accent-hover transition-colors font-medium">
                  Ver todos &rarr;
                </Link>
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <div className="relative pl-8 border-l-2 border-border">
              {changelog.map((entry, i) => (
                <ScrollReveal key={entry.slug} delay={i * 80}>
                  <div className="relative pb-8 last:pb-0">
                    {/* Dot */}
                    <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 rounded-full bg-accent border-2 border-bg" />
                    <ChangelogEntryComponent frontmatter={entry.frontmatter} content={entry.content} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
