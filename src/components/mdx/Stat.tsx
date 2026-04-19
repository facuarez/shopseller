interface Props {
  value: string | number;
  label: string;
  sub?: string;
  accent?: boolean;
}

/**
 * Número grande con label. Uso:
 * <Stat value="17%" label="Margen neto" sub="sobre facturación" />
 */
export default function Stat({ value, label, sub, accent }: Props) {
  return (
    <span className="not-prose inline-flex flex-col items-start align-middle mx-1 my-4 py-2 px-4 rounded-lg border border-border bg-card-bg">
      <span className={`text-2xl font-bold font-data leading-none ${accent ? "text-accent" : "text-text"}`}>{value}</span>
      <span className="text-[10px] text-text-secondary uppercase tracking-wider mt-1.5">{label}</span>
      {sub && <span className="text-[10px] text-text-secondary/70 mt-0.5">{sub}</span>}
    </span>
  );
}
