import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracker de ventas de afiliados",
  description: "Seguimiento de ventas generadas por creadores afiliados en TikTok Shop Europa.",
};

export default function AfiliadosTrackerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Tracker de ventas de afiliados</h1>
      <p className="text-text-secondary mb-8">
        Seguimiento de ventas generadas por creadores afiliados. Metricas por creador, producto y periodo.
      </p>

      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-xl font-medium text-text mb-2">Proximamente</p>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Esta herramienta esta en desarrollo. Permitira trackear las ventas que generan tus creadores
          afiliados, comparar rendimiento entre creadores, y calcular el ROI de tu programa de afiliados.
        </p>
      </div>
    </div>
  );
}
