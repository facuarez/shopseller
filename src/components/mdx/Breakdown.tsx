interface Item {
  label: string;
  value: string | number;
  pct?: number;
  negative?: boolean;
  highlight?: boolean;
}

interface Props {
  title?: string;
  items: Item[];
  total?: { label: string; value: string | number };
}

/**
 * Desglose visual de costes tipo waterfall. Uso:
 * <Breakdown
 *   title="Desglose de 3.400€ de facturación"
 *   items={[
 *     { label: "IVA", value: "589€", pct: 17.4, negative: true },
 *     { label: "Comisión TTS", value: "305€", pct: 9, negative: true },
 *   ]}
 *   total={{ label: "Beneficio neto", value: "591€" }}
 * />
 */
export default function Breakdown({ title, items, total }: Props) {
  const max = Math.max(...items.map((i) => i.pct ?? 0));
  return (
    <div className="not-prose my-6 p-5 rounded-xl border-2 border-border bg-card-bg">
      {title && <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">{title}</p>}
      <div className="space-y-2">
        {items.map((item, i) => {
          const barWidth = item.pct ? (item.pct / max) * 100 : 0;
          return (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-text">{item.label}</span>
                <span className={`text-sm font-data font-semibold ${item.negative ? "text-red-500" : item.highlight ? "text-accent" : "text-text"}`}>
                  {item.negative && "−"}{item.value}
                  {item.pct !== undefined && <span className="text-xs text-text-secondary ml-1">({item.pct}%)</span>}
                </span>
              </div>
              {item.pct !== undefined && (
                <div className="h-1.5 rounded-full bg-bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.negative ? "bg-red-500/50" : item.highlight ? "bg-accent" : "bg-text-secondary/40"}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {total && (
        <div className="mt-4 pt-4 border-t-2 border-accent/30">
          <div className="flex justify-between items-baseline p-3 rounded-lg bg-accent/5">
            <span className="text-sm font-bold text-text">{total.label}</span>
            <span className="text-lg font-black font-data text-accent">{total.value}</span>
          </div>
        </div>
      )}
    </div>
  );
}
