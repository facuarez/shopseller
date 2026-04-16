import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datos y fichas",
  description: "Base de datos estructurada para vendedores TTS Europa: comisiones, IVAs, directorio de herramientas.",
};

const DATA_PAGES = [
  {
    href: "/datos/comisiones",
    title: "Comisiones TTS por país y categoría",
    description: "Tabla completa de comisiones de TikTok Shop desglosadas por país europeo y categoría de producto. Datos verificados y actualizados manualmente.",
  },
  {
    href: "/datos/ivas-europa",
    title: "IVAs por país europeo",
    description: "IVA estándar y tipos reducidos de cada país donde opera TikTok Shop en Europa. Incluye UK y notas sobre categorías específicas.",
  },
  {
    href: "/datos/herramientas-tts",
    title: "Directorio de herramientas externas",
    description: "Herramientas de analytics, research y gestión para vendedores TTS. Cada una con descripción, precio y para qué sirve realmente.",
  },
];

export default function DatosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Datos y fichas</h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Información estructurada y actualizada para operar en TikTok Shop Europa.
        Datos que se verifican manualmente, no scraping automático.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DATA_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group p-6 rounded-lg border border-border bg-card-bg hover:border-accent/40 transition-colors"
          >
            <h2 className="font-semibold text-text group-hover:text-accent transition-colors mb-2">
              {page.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">{page.description}</p>
            <span className="inline-block mt-4 text-sm text-accent font-medium">
              Ver datos &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
