import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabla de envios TTS Europa",
  description: "Costes, tiempos y carriers de envio en TikTok Shop Europa por ruta y pais.",
};

export default function EnviosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Tabla de envios TTS Europa</h1>
      <p className="text-text-secondary mb-8">
        Costes, tiempos estimados y carriers disponibles por ruta en TikTok Shop Europa.
      </p>

      {/* Placeholder */}
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center mb-12">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        </div>
        <p className="text-text font-medium mb-1">Herramienta en integracion</p>
        <p className="text-sm text-text-secondary">
          La tabla interactiva de envios se esta portando a este sitio. Proximamente disponible.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2>Para que sirve esta tabla</h2>
        <p>
          El envio es uno de los factores mas criticos en TikTok Shop Europa. Dependiendo del pais de
          origen, el destino, y si usas fulfillment de TTS o gestionas envios por tu cuenta, los costes y
          tiempos varian significativamente.
        </p>
        <p>
          Esta tabla recopila datos reales de costes de envio por ruta, tiempos de entrega promedio, y
          carriers disponibles en cada pais. Incluye tanto las opciones de fulfillment gestionadas por TTS
          como carriers externos que puedes usar si gestionas tu propia logistica.
        </p>
        <h2>Que vas a encontrar</h2>
        <p>
          Para cada ruta (origen-destino) veras el coste medio por paquete, el tiempo de entrega estimado,
          el carrier o carriers disponibles, y notas sobre restricciones o particularidades. Los datos se
          actualizan manualmente basandome en mi propia experiencia operativa y en informacion verificada
          con otros vendedores.
        </p>
      </div>
    </div>
  );
}
