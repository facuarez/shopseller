import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import IVACalculator from "@/components/IVACalculator";
import { readDataFile } from "@/lib/content";
import type { IVAsData } from "@/types/content";

export const metadata: Metadata = {
  title: "IVAs por pais europeo + Calculadora de IVA",
  description: "IVA estandar y reducido de cada pais donde opera TikTok Shop en Europa. Calculadora de IVA interactiva con comparativa por pais.",
};

export default function IVAsPage() {
  const data = readDataFile<IVAsData>("ivas-europa.json");

  const rows = Object.entries(data).map(([code, pais]) => ({
    country: `${pais.country} (${code})`,
    currency: pais.currency,
    standard: `${pais.standard}%`,
    reduced: pais.reduced.map((r) => `${r}%`).join(", "),
    notes: pais.notes,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Datos</p>
      <h1 className="text-3xl font-bold text-text mb-3">IVAs por pais europeo</h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        IVA estandar y tipos reducidos de cada pais donde opera TikTok Shop en Europa, incluyendo UK. Usa la calculadora para ver el impacto en tus precios.
      </p>

      {/* Calculadora de IVA */}
      <div className="mb-10">
        <IVACalculator />
      </div>

      {/* Tabla de IVAs */}
      <DataTable
        columns={[
          { key: "country", label: "Pais" },
          { key: "currency", label: "Moneda", mono: true },
          { key: "standard", label: "IVA estandar", align: "right", mono: true },
          { key: "reduced", label: "Tipos reducidos", mono: true },
        ]}
        data={rows}
        caption="IVA vigente a abril 2026. Consulta con un asesor fiscal para tu caso particular."
      />

      {/* Notas detalladas */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold text-text">Notas por pais</h2>
        {Object.entries(data).map(([code, pais]) => (
          <div key={code} className="border border-border rounded-lg p-4 bg-card-bg">
            <h3 className="font-semibold text-text mb-1">
              {pais.country} ({code})
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{pais.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
