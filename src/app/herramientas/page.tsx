import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "Herramientas",
  description: "Apps interactivas para vendedores de TikTok Shop Europa: calculadora de rentabilidad, tabla de envíos, trackers y simuladores.",
};

const TOOLS = [
  {
    name: "Calculadora de rentabilidad",
    description: "Calcula márgenes reales por producto incluyendo comisiones TTS, envío, IVA y todos los costes ocultos.",
    href: "/herramientas/calculadora",
    status: "disponible" as const,
  },
  {
    name: "Tabla de envíos TTS Europa",
    description: "Costes, tiempos y carriers por ruta. Comparativa entre países y opciones de fulfillment TTS.",
    href: "/herramientas/envios",
    status: "disponible" as const,
  },
  {
    name: "Analizador de afiliados",
    description: "Subí tu CSV de órdenes de afiliados y obtené rankings de afiliados, videos y productos. 100% client-side.",
    href: "/herramientas/afiliados",
    status: "disponible" as const,
  },
  {
    name: "Seguimiento de muestras gratis",
    description: "Controla el inventario de muestras enviadas, tasa de conversión a contenido, y ROI de cada envío.",
    href: "/herramientas/muestras-gratis",
    status: "proximamente" as const,
  },
  {
    name: "Simulador ROI por campaña",
    description: "Proyecta el retorno de campañas de afiliados y ads basándote en datos históricos y benchmarks del mercado.",
    href: "/herramientas",
    status: "proximamente" as const,
  },
];

export default function HerramientasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Herramientas</h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Apps interactivas para gestionar y optimizar tu operación en TikTok Shop Europa.
        Construidas desde la experiencia real como vendedor.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
}
