import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { readDataFile } from "@/lib/content";
import type { ComisionesData } from "@/types/content";

export const metadata: Metadata = {
  title: "Comisiones TikTok Shop por pais",
  description: "Tabla de comisiones de TikTok Shop Europa desglosadas por pais y categoria de producto.",
};

export default function ComisionesPage() {
  const data = readDataFile<ComisionesData>("comisiones-tts.json");

  // Aplanar datos para la tabla
  const rows = Object.entries(data).flatMap(([code, pais]) =>
    pais.categories.map((cat) => ({
      country: `${pais.country} (${code})`,
      countryCode: code,
      category: cat.name,
      commission: cat.commission === 0 ? "TODO" : `${cat.commission}%`,
      notes: cat.notes,
    }))
  );

  const filterOptions = Object.entries(data).map(([code, pais]) => ({
    value: code,
    label: `${pais.country} (${code})`,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Comisiones TikTok Shop Europa</h1>
      <p className="text-text-secondary mb-2">
        Comisiones por pais y categoria de producto. Datos verificados manualmente.
      </p>
      <p className="text-sm text-accent mb-8">
        Ultima actualizacion: {data.ES.lastUpdated}. Si ves un error, contactame.
      </p>

      <DataTable
        columns={[
          { key: "country", label: "Pais" },
          { key: "category", label: "Categoria" },
          { key: "commission", label: "Comision", align: "right", mono: true },
          { key: "notes", label: "Notas" },
        ]}
        data={rows}
        filterKey="countryCode"
        filterOptions={filterOptions}
        caption="Comisiones TTS Europa — datos actualizados manualmente. Las comisiones pueden cambiar sin previo aviso."
      />
    </div>
  );
}
