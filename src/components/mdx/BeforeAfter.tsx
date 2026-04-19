interface Props {
  beforeLabel: string;
  beforeValue?: string;
  beforeDesc: string;
  afterLabel: string;
  afterValue?: string;
  afterDesc: string;
}

/**
 * Comparativa antes/después en dos columnas. Uso en MDX:
 *
 * <BeforeAfter
 *   beforeLabel="Sin optimizar"
 *   beforeValue="17%"
 *   beforeDesc="Margen actual"
 *   afterLabel="Con optimización"
 *   afterValue="24%"
 *   afterDesc="Margen proyectado"
 * />
 */
export default function BeforeAfter({ beforeLabel, beforeValue, beforeDesc, afterLabel, afterValue, afterDesc }: Props) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="p-5 rounded-xl border border-border bg-card-bg">
        <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest mb-2">{beforeLabel}</p>
        {beforeValue && <p className="text-3xl font-bold font-data text-text mb-1">{beforeValue}</p>}
        <p className="text-sm text-text-secondary leading-relaxed">{beforeDesc}</p>
      </div>
      <div className="p-5 rounded-xl border-2 border-accent/30 bg-accent/5">
        <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">{afterLabel}</p>
        {afterValue && <p className="text-3xl font-bold font-data text-accent mb-1">{afterValue}</p>}
        <p className="text-sm text-text leading-relaxed">{afterDesc}</p>
      </div>
    </div>
  );
}
