import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { readDataFile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comisiones TikTok Shop por pais — EU5 + UK",
  description: "Comisiones reales de TikTok Shop Europa por pais y categoria. Datos verificados con fuentes oficiales. Actualizado a enero 2026.",
};

interface Category { name: string; commission: number; notes: string }
interface CountryData { country: string; lastUpdated: string; source: string; categories: Category[] }
interface MetaData { formula: string; effectiveDate: string; notes: string; sources: string[] }
type Data = Record<string, CountryData> & { _meta: MetaData }

export default function ComisionesPage() {
  const data = readDataFile<Data>("comisiones-tts.json");
  const meta = data._meta;

  const countries = Object.entries(data).filter(([k]) => k !== "_meta") as [string, CountryData][];

  const rows = countries.flatMap(([code, pais]) =>
    pais.categories.map((cat) => ({
      country: `${pais.country} (${code})`,
      countryCode: code,
      category: cat.name,
      commission: cat.commission === 0 ? "Ver notas" : `${cat.commission}%`,
      notes: cat.notes,
    }))
  );

  const filterOptions = countries.map(([code, pais]) => ({
    value: code,
    label: `${pais.country} (${code})`,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Datos</p>
      <h1 className="text-3xl font-bold text-text mb-3">Comisiones TikTok Shop Europa</h1>
      <p className="text-text-secondary mb-6 max-w-2xl">
        Comisiones reales de la plataforma por pais y tipo de producto. EU5 tiene estructura de 2 niveles: 9% estandar y 7% para electronica de consumo y belleza. UK igual pero con fee adicional por pedido MFN.
      </p>

      {/* Key info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card-bg">
          <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Estandar EU5</p>
          <p className="text-2xl font-bold font-data text-accent">9%</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card-bg">
          <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Electronica</p>
          <p className="text-2xl font-bold font-data text-text">7%</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card-bg">
          <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Nuevo seller</p>
          <p className="text-2xl font-bold font-data text-green-600 dark:text-green-400">4%</p>
          <p className="text-[10px] text-text-secondary">60 dias</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card-bg">
          <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Vigente desde</p>
          <p className="text-lg font-bold font-data text-text">8 ene 2026</p>
        </div>
      </div>

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
        caption="Comisiones TTS Europa — vigentes desde 8 enero 2026. Las comisiones pueden cambiar sin previo aviso."
      />

      {/* Formula */}
      <div className="mt-8 p-5 rounded-xl border border-border bg-card-bg">
        <h2 className="font-bold text-text mb-2">Como se calcula la comision</h2>
        <p className="text-sm text-text-secondary mb-3">{meta.formula}</p>
        <p className="text-xs text-text-secondary">{meta.notes}</p>
      </div>

      {/* Sources */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-text mb-2">Fuentes oficiales</h3>
        <ul className="space-y-1">
          {meta.sources.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent-hover transition-colors break-all">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
