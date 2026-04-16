import { getChangelog } from "@/lib/content";
import ChangelogFilters from "./ChangelogFilters";

export default function ChangelogPage() {
  const items = getChangelog();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Changelog TTS Europa</h1>
      <p className="text-text-secondary mb-8">
        Cronologia de cambios reales en politicas, features, comisiones y expansiones de TikTok Shop en Europa.
        Orden cronologico inverso.
      </p>

      <ChangelogFilters items={items} />
    </div>
  );
}
