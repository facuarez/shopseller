interface Props {
  type?: "info" | "warning" | "tip" | "insight" | "danger";
  title?: string;
  children: React.ReactNode;
}

const STYLES = {
  info: { bg: "bg-blue-500/5", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", icon: "ℹ" },
  warning: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-700 dark:text-yellow-400", icon: "⚠" },
  tip: { bg: "bg-green-500/5", border: "border-green-500/30", text: "text-green-700 dark:text-green-400", icon: "✓" },
  insight: { bg: "bg-accent/5", border: "border-accent/30", text: "text-accent", icon: "💡" },
  danger: { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-600 dark:text-red-400", icon: "⚠" },
};

/**
 * Box destacado para insights o warnings. Uso:
 * <Callout type="insight" title="Lo clave">
 *   Los afiliados top no son los más rentables.
 * </Callout>
 */
export default function Callout({ type = "info", title, children }: Props) {
  const s = STYLES[type];
  return (
    <div className={`not-prose my-6 p-5 rounded-xl border-l-4 ${s.bg} ${s.border}`}>
      {title && (
        <div className={`flex items-center gap-2 mb-2 font-bold ${s.text}`}>
          <span>{s.icon}</span>
          <span className="uppercase text-xs tracking-wider">{title}</span>
        </div>
      )}
      <div className="text-sm text-text leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
