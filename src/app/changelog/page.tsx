import { getChangelog } from "@/lib/content";
import ChangelogFilters from "./ChangelogFilters";

export default function ChangelogPage() {
  const items = getChangelog();

  const highImpact = items.filter((i) => i.frontmatter.impact === "alto").length;
  const totalEntries = items.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Changelog</p>
        <h1 className="text-3xl font-bold text-text mb-3">Cambios en TikTok Shop Europa</h1>
        <p className="text-text-secondary max-w-2xl mb-4">
          Cronologia de cambios reales en politicas, comisiones, features y expansiones de TTS en Europa.
          Documentado manualmente porque TikTok no tiene un changelog publico para sellers.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-data font-semibold text-text">{totalEntries}</span> cambios documentados
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-data font-semibold text-text">{highImpact}</span> de alto impacto
          </span>
        </div>
      </div>

      <ChangelogFilters items={items} />
    </div>
  );
}
