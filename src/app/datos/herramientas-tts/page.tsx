import type { Metadata } from "next";
import { readDataFile } from "@/lib/content";
import type { HerramientasData } from "@/types/content";

export const metadata: Metadata = {
  title: "Directorio de herramientas TTS",
  description: "Herramientas externas de analytics, research y gestión para vendedores de TikTok Shop Europa.",
};

const TYPE_LABELS: Record<string, string> = {
  analytics: "Analytics",
  creative: "Creative",
  marketplace: "Marketplace",
  research: "Research",
  management: "Gestión",
};

const PRICING_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: "Gratis", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  freemium: { label: "Freemium", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  paid: { label: "De pago", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
};

export default function HerramientasTTSPage() {
  const { tools } = readDataFile<HerramientasData>("herramientas-tts.json");

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Directorio de herramientas TTS</h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Herramientas externas para vendedores de TikTok Shop. Cada una probada o investigada.
        Los enlaces se prepararán para afiliación cuando sea posible.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const pricing = PRICING_LABELS[tool.pricing];
          return (
            <div
              key={tool.slug}
              className="p-5 rounded-lg border border-border bg-card-bg"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="font-semibold text-text">{tool.name}</h2>
                  <span className="text-xs text-text-secondary">
                    {TYPE_LABELS[tool.type] ?? tool.type}
                  </span>
                </div>
                {pricing && (
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${pricing.color}`}>
                    {pricing.label}
                  </span>
                )}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {tool.description}
              </p>

              {tool.countries.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.countries.map((c) => (
                    <span key={c} className="text-[11px] px-1.5 py-0.5 rounded bg-bg-secondary text-text-secondary font-data">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={tool.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-sm text-accent hover:text-accent-hover transition-colors font-medium"
              >
                Visitar sitio &rarr;
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
