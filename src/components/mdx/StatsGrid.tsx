interface StatItem {
  value: string | number;
  label: string;
  sub?: string;
  accent?: boolean;
}

interface Props {
  stats: StatItem[];
}

/**
 * Grid de 2-4 métricas destacadas. Uso:
 * <StatsGrid stats={[
 *   { value: "17%", label: "Margen neto", accent: true },
 *   { value: "114", label: "Pedidos" },
 * ]} />
 */
export default function StatsGrid({ stats }: Props) {
  const cols = stats.length === 2 ? "grid-cols-2" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4";
  return (
    <div className={`not-prose grid ${cols} gap-3 my-6`}>
      {stats.map((s, i) => (
        <div key={i} className="p-4 rounded-xl border border-border bg-card-bg">
          <p className={`text-2xl sm:text-3xl font-bold font-data ${s.accent ? "text-accent" : "text-text"} leading-none`}>{s.value}</p>
          <p className="text-[11px] text-text-secondary uppercase tracking-wider mt-2">{s.label}</p>
          {s.sub && <p className="text-[10px] text-text-secondary/70 mt-0.5">{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}
