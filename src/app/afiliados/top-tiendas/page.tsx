import type { Metadata } from "next";
import Link from "next/link";
import { readDataFile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Top tiendas de TikTok Shop España por categoría — abril 2026",
  description: "Ranking de las tiendas que más venden en TikTok Shop España, desglosado por categoría. Datos reales de ingresos, afiliados, GMV Max y crecimiento. Actualizado mensualmente.",
  keywords: [
    "mejores tiendas tiktok shop españa",
    "top vendedores tiktok shop",
    "mejores marcas belleza tiktok shop",
    "productos mas vendidos tiktok shop españa",
    "tiendas mascotas tiktok shop",
    "accesorios moda tiktok shop españa",
    "productos bebes tiktok shop",
    "vendedores tts españa 2026",
    "tiktok shop españa ranking",
    "quien vende mas en tiktok shop",
  ],
};

interface Tienda {
  pos: number;
  nombre: string;
  tipo: string;
  ingresos: number;
  unidades: number;
  ticket: number;
  ingresosAfiliados: number;
  ingresosVideoPaid: number;
  crecimiento: number;
  categoria?: string;
}

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  keywords: string;
  tiendas: Tienda[];
}

interface TopTiendasData {
  _meta: { lastUpdated: string; period: string; source: string; disclaimer: string };
  categorias: Categoria[];
}

function fmtEur(n: number): string {
  if (n >= 1000000) return `€${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `€${(n / 1000).toFixed(1)}K`;
  return `€${n.toFixed(0)}`;
}

function Badge({ children, color }: { children: React.ReactNode; color: "green" | "yellow" | "red" | "gray" | "accent" | "blue" | "purple" }) {
  const colors = {
    green: "bg-green-500/10 text-green-700 dark:text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    red: "bg-red-500/10 text-red-700 dark:text-red-400",
    gray: "bg-bg-secondary text-text-secondary",
    accent: "bg-accent/10 text-accent",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };
  return <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium ${colors[color]}`}>{children}</span>;
}

function pctAfil(t: Tienda): number {
  if (t.ingresos === 0) return 0;
  return (t.ingresosAfiliados / t.ingresos) * 100;
}

function afiliadoBadge(t: Tienda) {
  const pct = pctAfil(t);
  if (pct >= 90) return <Badge color="accent">{pct.toFixed(0)}% afiliados</Badge>;
  if (pct >= 50) return <Badge color="blue">{pct.toFixed(0)}% afiliados</Badge>;
  if (pct >= 20) return <Badge color="gray">{pct.toFixed(0)}% afiliados</Badge>;
  return <Badge color="gray">Bajo afiliados</Badge>;
}

function crecimientoBadge(c: number) {
  if (c >= 50) return <Badge color="green">+{c.toFixed(0)}%</Badge>;
  if (c >= 0) return <Badge color="green">+{c.toFixed(1)}%</Badge>;
  if (c >= -30) return <Badge color="yellow">{c.toFixed(1)}%</Badge>;
  return <Badge color="red">{c.toFixed(1)}%</Badge>;
}

function tipoBadge(tipo: string) {
  return tipo === "Marca"
    ? <Badge color="purple">Marca</Badge>
    : <Badge color="blue">Minorista</Badge>;
}

export default function TopTiendasPage() {
  const data = readDataFile<TopTiendasData>("top-tiendas-es.json");

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#0A0A0A] border-b border-[#222]">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <Link href="/afiliados" className="text-xs text-accent hover:text-accent-hover transition-colors mb-4 inline-block">&larr; Volver a Afiliados</Link>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Data real · actualizado mensual</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Top tiendas de TikTok Shop España
            <br />
            <span className="text-accent">por categoría · abril 2026</span>
          </h1>
          <p className="text-lg text-[#999] max-w-2xl mb-6">
            Ranking de las tiendas que más venden en TikTok Shop España desglosado por categoría.
            Datos verificados de ingresos, afiliados, GMV Max y crecimiento. Sirve para decidir a qué sellers
            pedirles muestras y qué nichos tienen tracción real.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#888]">
            <span>📅 {data._meta.period}</span>
            <span>📊 Fuente: Kalodata</span>
            <span>🔄 Actualizado: {data._meta.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Nav por categoría */}
      <div className="sticky top-14 z-30 bg-bg-secondary/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2">
          {data.categorias.map((c) => (
            <a key={c.id} href={`#${c.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-card-bg border border-border hover:border-accent/40 hover:text-accent transition-all">
              {c.nombre.replace("Top tiendas de ", "").replace("TikTok Shop España", "General")}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Cómo leer los datos */}
        <div className="mb-12 p-6 rounded-xl border-2 border-border bg-card-bg">
          <h2 className="font-bold text-text mb-4 text-lg">Cómo leer estas tablas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-text mb-1">💰 Ingresos</p>
              <p className="text-text-secondary">Facturación GMV de la tienda en los últimos 30 días.</p>
            </div>
            <div>
              <p className="font-semibold text-text mb-1">🎯 % Afiliados</p>
              <p className="text-text-secondary">Qué porcentaje de los ingresos vienen de afiliados. <strong className="text-accent">Cuanto más alto, más te conviene.</strong> Si un seller vende el 95% via afiliados, te va a dar muestras.</p>
            </div>
            <div>
              <p className="font-semibold text-text mb-1">📹 GMV Max (video paid)</p>
              <p className="text-text-secondary">Ingresos provenientes de Shop Ads. Estas tiendas impulsan videos con paid — incluso los tuyos pueden convertir en paid.</p>
            </div>
            <div>
              <p className="font-semibold text-text mb-1">📈 Crecimiento</p>
              <p className="text-text-secondary">Cambio vs período anterior. Tiendas en verde están creciendo — más probable que acepten afiliados nuevos.</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-4 italic">{data._meta.disclaimer}</p>
        </div>

        {/* Categorías */}
        <div className="space-y-16">
          {data.categorias.map((cat) => {
            const topAfil = [...cat.tiendas].sort((a, b) => pctAfil(b) - pctAfil(a))[0];
            const topCrec = [...cat.tiendas].sort((a, b) => b.crecimiento - a.crecimiento)[0];
            const lowTicket = [...cat.tiendas].filter((t) => t.ticket > 0).sort((a, b) => a.ticket - b.ticket)[0];

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-32">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-text mb-2">{cat.nombre}</h2>
                  <p className="text-text-secondary max-w-2xl">{cat.descripcion}</p>
                </div>

                {/* Insights rápidos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-4 rounded-xl border border-accent/20 bg-accent/5">
                    <p className="text-[10px] text-accent uppercase tracking-wider mb-1 font-semibold">💎 Mejor para afiliados</p>
                    <p className="font-bold text-text">{topAfil.nombre}</p>
                    <p className="text-xs text-text-secondary">{pctAfil(topAfil).toFixed(0)}% de ingresos de afiliados</p>
                  </div>
                  <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                    <p className="text-[10px] text-green-700 dark:text-green-400 uppercase tracking-wider mb-1 font-semibold">🚀 Mayor crecimiento</p>
                    <p className="font-bold text-text">{topCrec.nombre}</p>
                    <p className="text-xs text-text-secondary">{topCrec.crecimiento > 0 ? "+" : ""}{topCrec.crecimiento.toFixed(0)}% este mes</p>
                  </div>
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 font-semibold">🎫 Ticket más bajo</p>
                    <p className="font-bold text-text">{lowTicket.nombre}</p>
                    <p className="text-xs text-text-secondary">€{lowTicket.ticket.toFixed(2)} promedio — fácil de vender</p>
                  </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto rounded-xl border border-border bg-card-bg shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-bg-secondary border-b border-border">
                      <tr>
                        <th className="text-center px-3 py-3 w-10 text-[10px] text-text-secondary uppercase">#</th>
                        <th className="text-left px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider">Tienda</th>
                        <th className="text-right px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider">Ingresos</th>
                        <th className="text-right px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider hidden md:table-cell">Unidades</th>
                        <th className="text-right px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider">Ticket</th>
                        <th className="text-center px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider">Afiliados</th>
                        <th className="text-right px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider hidden lg:table-cell">GMV Max</th>
                        <th className="text-center px-3 py-3 text-[10px] text-text-secondary uppercase tracking-wider">Crecim.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.tiendas.map((t, i) => {
                        const pct = pctAfil(t);
                        return (
                          <tr key={t.nombre} className={`border-b border-border/40 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 !== 0 ? "bg-bg-secondary/20" : ""}`}>
                            <td className="text-center px-3 py-2.5">
                              {t.pos === 1 ? <span className="text-yellow-500 font-bold">#1</span> :
                               t.pos === 2 ? <span className="text-gray-400 font-bold">#2</span> :
                               t.pos === 3 ? <span className="text-amber-700 font-bold">#3</span> :
                               <span className="text-text-secondary font-data text-xs">#{t.pos}</span>}
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-text">{t.nombre}</span>
                                {tipoBadge(t.tipo)}
                                {t.categoria && cat.id === "general" && <Badge color="gray">{t.categoria}</Badge>}
                              </div>
                            </td>
                            <td className="text-right px-3 py-2.5 font-data font-bold text-text">{fmtEur(t.ingresos)}</td>
                            <td className="text-right px-3 py-2.5 font-data text-text-secondary hidden md:table-cell">{t.unidades.toLocaleString("es-ES")}</td>
                            <td className="text-right px-3 py-2.5 font-data text-text-secondary">€{t.ticket.toFixed(2)}</td>
                            <td className="text-center px-3 py-2.5">
                              <div className="inline-flex flex-col items-center gap-0.5">
                                {afiliadoBadge(t)}
                                <span className="text-[10px] text-text-secondary font-data">{fmtEur(t.ingresosAfiliados)}</span>
                              </div>
                            </td>
                            <td className="text-right px-3 py-2.5 font-data text-text-secondary hidden lg:table-cell">{fmtEur(t.ingresosVideoPaid)}</td>
                            <td className="text-center px-3 py-2.5">{crecimientoBadge(t.crecimiento)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Interpretación de la categoría */}
                {cat.id === "belleza" && (
                  <div className="mt-5 p-4 rounded-lg border-l-4 border-accent bg-accent/5">
                    <p className="text-sm text-text">
                      <strong>Insight:</strong> La mayoría de estas marcas top tienen &gt;90% de ingresos de afiliados.
                      Eso significa que <strong>dependen del contenido de afiliados para vender</strong> — son las más propensas a aprobar muestras.
                      Los tickets de €9-€12 (Maybelline, LASTAR, L&apos;Oréal) son ideales para afiliados nuevos.
                    </p>
                  </div>
                )}
                {cat.id === "mascotas" && (
                  <div className="mt-5 p-4 rounded-lg border-l-4 border-accent bg-accent/5">
                    <p className="text-sm text-text">
                      <strong>Insight:</strong> Aigotech y TORCHPET están creciendo +80% y +137%.
                      Tiendas en crecimiento fuerte suelen ser más flexibles con afiliados nuevos porque necesitan volumen de contenido.
                      Contactalas con la <Link href="/afiliados/muestras#plantilla" className="text-accent underline">plantilla de mensaje</Link>.
                    </p>
                  </div>
                )}
                {cat.id === "bebes" && (
                  <div className="mt-5 p-4 rounded-lg border-l-4 border-accent bg-accent/5">
                    <p className="text-sm text-text">
                      <strong>Insight:</strong> BATHBY (+186%) y Mercatodo (+53%) son las estrellas del crecimiento.
                      Ticket medio en esta categoría es más alto que en otras (~€40), así que las comisiones por venta son mayores.
                      Importante: algunos productos requieren certificación CE.
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Cómo usar esta lista */}
        <div className="mt-16 p-6 rounded-xl border border-border bg-card-bg">
          <h2 className="text-xl font-bold text-text mb-3">Cómo usar este ranking si sos afiliado</h2>
          <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
            <li><strong className="text-text">Filtrá por % de afiliados alto (&gt;70%):</strong> son las tiendas que dependen de contenido de creadores y van a aprobar muestras.</li>
            <li><strong className="text-text">Priorizá tickets bajos (&lt;€20)</strong> si estás empezando. Más volumen, menos riesgo.</li>
            <li><strong className="text-text">Buscá crecimiento positivo:</strong> tiendas creciendo necesitan más contenido y son más flexibles.</li>
            <li><strong className="text-text">Evitá tiendas con 0% de afiliados:</strong> no trabajan con afiliados o solo con los muy grandes.</li>
            <li><strong className="text-text">Usá la <Link href="/afiliados/muestras" className="text-accent underline">guía de muestras</Link></strong> con la plantilla de mensaje para contactarlas.</li>
          </ol>
        </div>

        {/* CTAs */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/afiliados/calculadora-ganancias" className="group p-5 rounded-xl border border-border bg-card-bg hover:border-accent/40 hover:shadow-md transition-all">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Calculadora</p>
            <p className="font-bold text-text group-hover:text-accent transition-colors">Calculá cuánto podrías ganar con estos productos</p>
            <p className="text-xs text-text-secondary mt-1">Probá con los tickets promedio de cada categoría.</p>
          </Link>
          <Link href="/afiliados/muestras" className="group p-5 rounded-xl border border-border bg-card-bg hover:border-accent/40 hover:shadow-md transition-all">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Cómo pedir muestras</p>
            <p className="font-bold text-text group-hover:text-accent transition-colors">Plantilla de mensaje que funciona con estos sellers</p>
            <p className="text-xs text-text-secondary mt-1">Qué miran y cómo estructurar tu propuesta.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
