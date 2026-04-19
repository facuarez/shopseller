interface Props {
  children: React.ReactNode;
}

/**
 * TL;DR al inicio del artículo. Uso:
 * <Summary>
 *   - Punto 1
 *   - Punto 2
 * </Summary>
 */
export default function Summary({ children }: Props) {
  return (
    <div className="not-prose my-6 p-5 rounded-xl bg-bg-secondary border-l-4 border-accent">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">TL;DR</span>
        <span className="text-xs text-text-secondary">Lo clave en 30 segundos</span>
      </div>
      <div className="text-sm text-text [&>ul]:space-y-1.5 [&>ul>li]:pl-1">{children}</div>
    </div>
  );
}
