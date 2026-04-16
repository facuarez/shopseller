"use client";

import { useState, useMemo } from "react";
import { COUNTRIES } from "@/data/ttrack-countries";
import { WEIGHT_TIERS, getSellerNet, getBuyerFee } from "@/data/ttrack-shipping";

function fmt(n: number | undefined | null): string {
  if (n === undefined || n === null || isNaN(n)) return "—";
  return `€${n.toFixed(2)}`;
}

const DELIVERY_MODES = [
  { id: "home", label: "Home Delivery" },
  { id: "pudo", label: "PUDO (punto recogida)" },
];

interface RouteData {
  to: typeof COUNTRIES[number];
  sellerNet: number;
  buyerFee: number;
  total: number;
}

export default function EnviosClient() {
  const [weightTier, setWeightTier] = useState("0-5");
  const [delivery, setDelivery] = useState<"home" | "pudo">("home");
  const [viewMode, setViewMode] = useState("total");

  const viewModes = [
    { id: "total", label: "Coste total TTS" },
    { id: "seller", label: "Seller paga" },
    { id: "buyer", label: "Buyer paga" },
  ];

  const matrix = useMemo(() => {
    return COUNTRIES.map((from) => ({
      from,
      routes: COUNTRIES.filter((to) => to.id !== from.id).map((to) => {
        const sellerNet = getSellerNet(from.id, to.id);
        const weight = weightTier === "0-5" ? 0.5 : weightTier === "5-10" ? 7.5 : 15;
        const buyerFee = getBuyerFee(from.id, to.id, weight, delivery);
        const total = sellerNet + buyerFee;
        return { to, sellerNet, buyerFee, total } as RouteData;
      }),
    }));
  }, [weightTier, delivery]);

  function getValue(route: RouteData): number {
    if (viewMode === "seller") return route.sellerNet;
    if (viewMode === "buyer") return route.buyerFee;
    return route.total;
  }

  const allValues = matrix.flatMap((r) => r.routes.map((route) => getValue(route)));
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  function getCellColor(val: number): string {
    if (maxVal === minVal) return "bg-green-500/10";
    const ratio = (val - minVal) / (maxVal - minVal);
    if (ratio < 0.25) return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (ratio < 0.5) return "bg-green-500/5 text-green-600 dark:text-green-400";
    if (ratio < 0.75) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  }

  const bestRoutes = useMemo(() => {
    const best: Record<string, RouteData> = {};
    for (const row of matrix) {
      const sorted = [...row.routes].sort((a, b) => getValue(a) - getValue(b));
      if (sorted.length > 0) best[row.from.id] = sorted[0];
    }
    return best;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix, viewMode]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-text">Comparador de envío</h1>
        <p className="text-sm text-text-secondary mt-1">Costes de envío TikTok Shop EU por ruta, peso y tipo de entrega. Datos Nov 2025.</p>
      </div>

      {/* Controls */}
      <div className="bg-card-bg rounded-2xl border border-border shadow-sm px-5 py-4">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Peso</span>
            <div className="flex gap-1">
              {WEIGHT_TIERS.map((w) => (
                <button key={w.id} onClick={() => setWeightTier(w.id)}
                  className={`px-3 py-[7px] rounded-lg text-xs font-bold transition-all ${weightTier === w.id ? "bg-accent text-white shadow-sm shadow-accent/25" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}>
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Entrega</span>
            <div className="flex gap-1">
              {DELIVERY_MODES.map((m) => (
                <button key={m.id} onClick={() => setDelivery(m.id as "home" | "pudo")}
                  className={`px-3 py-[7px] rounded-lg text-xs font-bold transition-all ${delivery === m.id ? "bg-accent text-white shadow-sm shadow-accent/25" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-border self-end mb-1" />

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Mostrar</span>
            <div className="flex gap-1">
              {viewModes.map((m) => (
                <button key={m.id} onClick={() => setViewMode(m.id)}
                  className={`px-3 py-[7px] rounded-lg text-xs font-bold transition-all ${viewMode === m.id ? "bg-text text-bg shadow-sm" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Matrix table */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card-bg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-secondary border-b border-border">
              <th className="text-left px-5 py-3 text-[10px] text-text-secondary font-semibold uppercase tracking-wider w-32">Origen → Destino</th>
              {COUNTRIES.map((c) => (
                <th key={c.id} className="text-center px-4 py-3 text-sm font-semibold text-text">
                  <span className="mr-1">{c.flag}</span>{c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COUNTRIES.map((from) => {
              const row = matrix.find((r) => r.from.id === from.id)!;
              return (
                <tr key={from.id} className="border-b border-border/50">
                  <td className="px-5 py-3 text-sm font-semibold text-text">
                    <span className="mr-1.5">{from.flag}</span>{from.name}
                  </td>
                  {COUNTRIES.map((to) => {
                    if (from.id === to.id) {
                      return <td key={to.id} className="text-center px-4 py-3"><span className="text-text-secondary/40 text-xs">—</span></td>;
                    }
                    const route = row.routes.find((r) => r.to.id === to.id)!;
                    const val = getValue(route);
                    const colorClass = getCellColor(val);
                    const isBest = bestRoutes[from.id]?.to.id === to.id;
                    return (
                      <td key={to.id} className={`text-center px-4 py-3 ${colorClass} transition-colors`}>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`text-sm font-bold tabular-nums ${isBest ? "underline decoration-2 underline-offset-2" : ""}`}>{fmt(val)}</span>
                          {viewMode === "total" && (
                            <span className="text-[10px] opacity-60">S:{fmt(route.sellerNet)} · B:{fmt(route.buyerFee)}</span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] text-text-secondary">
        <span className="font-semibold text-text">Leyenda:</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-500/10 border border-green-500/20" /> Más barato</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-500/10 border border-yellow-500/20" /> Medio</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/10 border border-red-500/20" /> Más caro</span>
        <span className="text-text-secondary/40">·</span>
        <span>Subrayado = ruta más barata desde ese origen</span>
        <span className="text-text-secondary/40">·</span>
        <span>Precios sin IVA</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {COUNTRIES.map((from) => {
          const best = bestRoutes[from.id];
          if (!best) return null;
          return (
            <div key={from.id} className="bg-card-bg rounded-2xl border border-border shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{from.flag}</span>
                <span className="text-sm font-bold text-text">{from.name}</span>
              </div>
              <p className="text-[11px] text-text-secondary mb-1">Ruta mas barata</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{best.to.flag}</span>
                <div>
                  <span className="text-base font-black text-green-600 dark:text-green-400 tabular-nums">{fmt(getValue(best))}</span>
                  <span className="text-[11px] text-text-secondary ml-1.5">→ {best.to.name}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border text-[11px] text-text-secondary flex justify-between">
                <span>Seller: {fmt(best.sellerNet)}</span>
                <span>Buyer: {fmt(best.buyerFee)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
