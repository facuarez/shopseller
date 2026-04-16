import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ChangelogFrontmatter } from "@/types/content";

interface Props {
  frontmatter: ChangelogFrontmatter;
  content?: string;
  compact?: boolean; // Modo compacto para la home
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  politica: { label: "Política", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  feature: { label: "Feature", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  comision: { label: "Comisión", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  bug: { label: "Bug", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  expansion: { label: "Expansión", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
};

const IMPACT_LABELS: Record<string, { label: string; color: string }> = {
  alto: { label: "Alto", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  medio: { label: "Medio", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  bajo: { label: "Bajo", color: "bg-bg-secondary text-text-secondary" },
};

export default function ChangelogEntryComponent({ frontmatter, content, compact }: Props) {
  const cat = CATEGORY_LABELS[frontmatter.category];
  const impact = IMPACT_LABELS[frontmatter.impact];

  return (
    <div className={cn("flex gap-4", compact ? "py-3" : "py-5 border-b border-border last:border-0")}>
      {/* Fecha */}
      <div className="shrink-0 w-24 text-right">
        <time dateTime={frontmatter.date} className="text-xs font-data text-text-secondary">
          {formatDate(frontmatter.date)}
        </time>
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          {cat && (
            <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", cat.color)}>
              {cat.label}
            </span>
          )}
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-bg-secondary text-text-secondary">
            {frontmatter.country === "all" ? "Todos" : frontmatter.country}
          </span>
          {impact && (
            <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", impact.color)}>
              {impact.label}
            </span>
          )}
        </div>

        <h3 className={cn("font-medium text-text", compact ? "text-sm" : "text-base")}>
          {frontmatter.title}
        </h3>

        {!compact && content && (
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">{content}</p>
        )}
      </div>
    </div>
  );
}
