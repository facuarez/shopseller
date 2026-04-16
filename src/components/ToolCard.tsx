import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  description: string;
  href: string;
  status: "disponible" | "proximamente";
  icon?: React.ReactNode;
}

export default function ToolCard({ name, description, href, status, icon }: Props) {
  const isAvailable = status === "disponible";

  return (
    <div
      className={cn(
        "p-5 rounded-xl border border-border bg-card-bg shadow-sm transition-all",
        isAvailable && "hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-md bg-bg-secondary flex items-center justify-center text-text-secondary">
          {icon ?? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          )}
        </div>
        <span
          className={cn(
            "text-[11px] font-medium px-2 py-0.5 rounded-full",
            isAvailable
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-bg-secondary text-text-secondary"
          )}
        >
          {isAvailable ? "Disponible" : "Proximamente"}
        </span>
      </div>

      <h3 className="font-semibold text-text mb-1">{name}</h3>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{description}</p>

      {isAvailable ? (
        <Link
          href={href}
          className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Abrir herramienta &rarr;
        </Link>
      ) : (
        <span className="text-sm text-text-secondary">En desarrollo</span>
      )}
    </div>
  );
}
