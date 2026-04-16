import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguimiento de muestras gratis",
  description: "Controla el inventario de muestras enviadas y su conversión a contenido en TikTok Shop.",
};

export default function MuestrasGratisPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Seguimiento de muestras gratis</h1>
      <p className="text-text-secondary mb-8">
        Controla las muestras enviadas a creadores, tasa de conversión a contenido y ROI por envío.
      </p>

      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-xl font-medium text-text mb-2">Próximamente</p>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Esta herramienta está en desarrollo. Te permitirá registrar cada muestra enviada, trackear si el
          creador publicó contenido, y calcular el coste real por video/publicación obtenida.
        </p>
      </div>
    </div>
  );
}
