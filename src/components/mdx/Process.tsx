interface Step {
  title: string;
  description: string;
  detail?: string;
}

interface Props {
  steps: Step[];
}

/**
 * Timeline vertical numerado. Uso:
 * <Process steps={[
 *   { title: "Día 1", description: "Setup inicial" },
 *   { title: "Día 30", description: "Primeras ventas" },
 * ]} />
 */
export default function Process({ steps }: Props) {
  return (
    <div className="not-prose my-8">
      <div className="relative pl-8 border-l-2 border-border space-y-6">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-widest font-data">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-bold text-text">{step.title}</span>
            </div>
            <p className="text-sm text-text-secondary">{step.description}</p>
            {step.detail && <p className="text-xs text-text-secondary/70 mt-1 italic">{step.detail}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
