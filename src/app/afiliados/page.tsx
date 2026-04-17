import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Afiliados TikTok Shop España y Europa — Data y herramientas",
  description: "Data accionable para afiliados de TikTok Shop: calculadora de ganancias, guías operativas, muestras gratis. Sin humo, sin cursos, sin MCN.",
};

const TOOLS = [
  {
    href: "/afiliados/calculadora-ganancias",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
    title: "Calculadora de ganancias",
    description: "Cuánto podés ganar por video según ticket, comisión y views. Con proyección mensual.",
    status: "disponible",
  },
  {
    href: "/afiliados/muestras",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    title: "Guía de muestras gratis",
    description: "Muestras gratis vs reembolsables, cómo pedirlas, ROI real, y qué esperan los sellers de vos.",
    status: "disponible",
  },
];

const GUIDES = [
  {
    href: "/afiliados/cuantos-videos",
    title: "Cuántos videos publicar en TikTok Shop",
    description: "La traba no está en qué hacer, sino en hacer. Por qué volumen &gt; calidad y cómo funciona realmente el algoritmo.",
    tag: "Imprescindible",
    featured: true,
  },
  {
    href: "/afiliados/como-empezar",
    title: "Cómo empezar como afiliado TTS España 2026",
    description: "Requisitos reales, paso a paso, y lo que un vendedor espera de vos. Sin las frases motivacionales de siempre.",
    tag: "Guía",
  },
  {
    href: "/afiliados/muestras",
    title: "Cómo pedir muestras gratis siendo afiliado nuevo",
    description: "Plantilla de mensaje que funciona, qué mira el seller, y cómo romper el círculo vicioso sin historial. Con ROI de muestras reembolsables.",
    tag: "Guía",
  },
  {
    href: "/afiliados/multipais",
    title: "Ser afiliado en ES + FR + IT + DE al mismo tiempo",
    description: "Nadie habla de esto en español. Cómo operar como afiliado multi-país en TTS Europa.",
    tag: "Guía",
  },
];

const COMING_SOON = [
  "Directorio de sellers que aceptan afiliados sin historial",
  "Top sellers que invierten en GMV Max",
  "Comisiones promedio por categoría",
  "Rango de ticket óptimo para empezar",
];

export default function AfiliadosPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#0A0A0A] border-b border-[#222]">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent font-medium">Sección para afiliados</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Afiliado de TikTok Shop:
            <br />
            <span className="text-accent">la traba no está en qué hacer, está en hacer</span>
          </h1>
          <p className="text-lg text-[#999] max-w-xl mb-6 leading-relaxed">
            Tus videos son como trampas de peces. Llená TikTok de ellas.
            Acá te damos data real, herramientas y la verdad de cómo funciona el algoritmo —
            desde el lado del vendedor que ve todo.
          </p>
          <p className="text-sm text-[#666] max-w-lg">
            Sin humo, sin cursos, sin MCN. Escrito por un operador que recibe solicitudes de afiliados todos los días.
          </p>
        </div>
      </div>

      {/* Herramientas */}
      <div className="bg-bg-secondary border-b border-border py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Herramientas</p>
          <h2 className="text-2xl font-bold text-text mb-8">Calculá antes de grabar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href}
                className="group flex gap-4 p-6 rounded-xl border-2 border-border bg-card-bg shadow-sm hover:border-accent/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  {tool.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text group-hover:text-accent transition-colors">{tool.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">Disponible</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Guías */}
      <div className="bg-bg border-b border-border py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Guías</p>
          <h2 className="text-2xl font-bold text-text mb-8">Lo que necesitás saber para operar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GUIDES.map((guide) => (
              <Link key={guide.href} href={guide.href}
                className={`group block p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${guide.featured ? "border-2 border-accent/30 bg-accent/[0.03] hover:border-accent/60" : "border border-border bg-card-bg hover:border-accent/40"}`}>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${guide.featured ? "bg-accent/15 text-accent" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"}`}>{guide.tag}</span>
                <h3 className="font-bold text-text group-hover:text-accent transition-colors mt-3 mb-2">{guide.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{guide.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent mt-4 group-hover:gap-2 transition-all">
                  Leer guía
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Próximamente */}
      <div className="bg-bg-secondary py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">Próximamente</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {COMING_SOON.map((name) => (
              <span key={name} className="px-4 py-2 rounded-lg border border-border/60 text-xs text-text-secondary bg-card-bg">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
