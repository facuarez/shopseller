"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const TOOLS = [
  {
    href: "/herramientas/calculadora",
    label: "Calculadora de rentabilidad",
    desc: "PVP mínimo rentable por país",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" /></svg>,
  },
  {
    href: "/herramientas/envios",
    label: "Comparador de envíos",
    desc: "Costes por ruta y peso",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  },
  {
    href: "/herramientas/afiliados",
    label: "Analizador de afiliados",
    desc: "Rankings desde tu CSV de TTS",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></svg>,
  },
  {
    href: "/afiliados/calculadora-ganancias",
    label: "Calculadora para afiliados",
    desc: "Ganancias por video estimadas",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  },
];

export default function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${open ? "text-text bg-bg-secondary" : "text-text-secondary hover:text-text hover:bg-bg-secondary"}`}
      >
        Herramientas
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-card-bg border border-border rounded-xl shadow-lg p-2 z-50">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-secondary transition-colors group"
            >
              <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                {tool.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-text group-hover:text-accent transition-colors">{tool.label}</p>
                <p className="text-[11px] text-text-secondary">{tool.desc}</p>
              </div>
            </Link>
          ))}
          <div className="border-t border-border mt-1 pt-1">
            <Link href="/herramientas" onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-secondary transition-colors text-xs text-text-secondary hover:text-accent font-medium">
              Ver todas las herramientas →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
