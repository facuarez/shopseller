"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function fmtEur(n: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
}

const CVR_PRESETS = [
  { value: "0.5", label: "0.5% (bajo)" },
  { value: "1", label: "1% (normal)" },
  { value: "2", label: "2% (bueno)" },
  { value: "5", label: "5% (viral)" },
];

export default function CalculadoraGananciasClient() {
  const [ticket, setTicket] = useState("20");
  const [commission, setCommission] = useState("15");
  const [viewsPerVideo, setViewsPerVideo] = useState("5000");
  const [cvr, setCvr] = useState("1");
  const [videosPerWeek, setVideosPerWeek] = useState("3");
  const [goalMonthly, setGoalMonthly] = useState("500");

  const result = useMemo(() => {
    const t = parseFloat(ticket) || 0;
    const c = parseFloat(commission) || 0;
    const v = parseFloat(viewsPerVideo) || 0;
    const r = parseFloat(cvr) || 0;
    const vpw = parseFloat(videosPerWeek) || 0;
    const goal = parseFloat(goalMonthly) || 0;

    if (t <= 0 || c <= 0 || v <= 0) return null;

    const commissionPerSale = t * (c / 100);
    const salesPerVideo = v * (r / 100);
    const earningsPerVideo = commissionPerSale * salesPerVideo;
    const earningsPerWeek = earningsPerVideo * vpw;
    const earningsPerMonth = earningsPerWeek * 4.33;
    const videosForGoal = goal > 0 && earningsPerVideo > 0 ? Math.ceil(goal / earningsPerVideo) : null;
    const videosPerWeekForGoal = videosForGoal ? Math.ceil(videosForGoal / 4.33) : null;

    return {
      commissionPerSale,
      salesPerVideo,
      earningsPerVideo,
      earningsPerWeek,
      earningsPerMonth,
      videosForGoal,
      videosPerWeekForGoal,
    };
  }, [ticket, commission, viewsPerVideo, cvr, videosPerWeek, goalMonthly]);

  // Commission comparison
  const comparisonRates = [10, 15, 20, 25];
  const comparison = useMemo(() => {
    const t = parseFloat(ticket) || 0;
    const v = parseFloat(viewsPerVideo) || 0;
    const r = parseFloat(cvr) || 0;
    const vpw = parseFloat(videosPerWeek) || 0;
    if (t <= 0 || v <= 0) return [];

    return comparisonRates.map((rate) => {
      const cps = t * (rate / 100);
      const spv = v * (r / 100);
      const epv = cps * spv;
      return { rate, perVideo: epv, perMonth: epv * vpw * 4.33 };
    });
  }, [ticket, viewsPerVideo, cvr, videosPerWeek]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/afiliados" className="text-xs text-accent hover:text-accent-hover transition-colors mb-4 inline-block">&larr; Volver a Afiliados</Link>

      <h1 className="text-2xl font-bold text-text mb-2">Calculadora de ganancias para afiliados</h1>
      <p className="text-text-secondary mb-8">Estimá cuánto podés ganar como afiliado de TikTok Shop según el producto, comisión y tu alcance.</p>

      {/* Inputs */}
      <div className="bg-card-bg border-2 border-border rounded-xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Precio del producto (€)</label>
            <input type="number" value={ticket} onChange={(e) => setTicket(e.target.value)} step="0.5" min="0"
              className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2.5 text-sm font-semibold font-data focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Comisión del seller (%)</label>
            <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} step="1" min="0" max="50"
              className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2.5 text-sm font-semibold font-data focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Views promedio por video</label>
            <input type="number" value={viewsPerVideo} onChange={(e) => setViewsPerVideo(e.target.value)} step="500" min="0"
              className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2.5 text-sm font-semibold font-data focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Tasa de conversión (%)</label>
            <div className="flex gap-1.5">
              {CVR_PRESETS.map((p) => (
                <button key={p.value} onClick={() => setCvr(p.value)}
                  className={`flex-1 px-2 py-2.5 rounded-lg text-[11px] font-bold transition-all ${cvr === p.value ? "bg-accent text-white shadow-sm shadow-accent/25" : "bg-bg-secondary text-text-secondary border border-border hover:bg-border"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Videos por semana</label>
            <input type="number" value={videosPerWeek} onChange={(e) => setVideosPerWeek(e.target.value)} step="1" min="0"
              className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2.5 text-sm font-semibold font-data focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Objetivo mensual (€)</label>
            <input type="number" value={goalMonthly} onChange={(e) => setGoalMonthly(e.target.value)} step="50" min="0"
              className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2.5 text-sm font-semibold font-data focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Main metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card-bg shadow-sm">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Comisión por venta</p>
              <p className="text-xl font-bold font-data text-text">{fmtEur(result.commissionPerSale)}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card-bg shadow-sm">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Ganancia por video</p>
              <p className="text-xl font-bold font-data text-accent">{fmtEur(result.earningsPerVideo)}</p>
              <p className="text-[10px] text-text-secondary mt-0.5">{result.salesPerVideo.toFixed(1)} ventas/video</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card-bg shadow-sm">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Ganancia semanal</p>
              <p className="text-xl font-bold font-data text-text">{fmtEur(result.earningsPerWeek)}</p>
              <p className="text-[10px] text-text-secondary mt-0.5">{videosPerWeek} videos/semana</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-accent/30 bg-accent/5 shadow-sm rounded-xl">
              <p className="text-[10px] text-accent uppercase tracking-wider mb-1 font-semibold">Ganancia mensual</p>
              <p className="text-2xl font-bold font-data text-accent">{fmtEur(result.earningsPerMonth)}</p>
            </div>
          </div>

          {/* Goal tracker */}
          {result.videosForGoal && (
            <div className="p-5 rounded-xl border border-border bg-card-bg shadow-sm">
              <p className="text-sm text-text-secondary mb-2">
                Para ganar <span className="font-bold text-text font-data">{fmtEur(parseFloat(goalMonthly))}/mes</span> necesitás publicar:
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-data text-accent">{result.videosForGoal}</span>
                <span className="text-text-secondary">videos al mes</span>
                <span className="text-text-secondary/50">·</span>
                <span className="text-lg font-bold font-data text-text">{result.videosPerWeekForGoal}</span>
                <span className="text-text-secondary">por semana</span>
              </div>
            </div>
          )}

          {/* Commission comparison */}
          {comparison.length > 0 && (
            <div className="p-5 rounded-xl border border-border bg-card-bg shadow-sm">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Comparativa: mismo producto con diferentes comisiones</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {comparison.map((c) => (
                  <div key={c.rate} className={`p-3 rounded-lg text-center ${parseFloat(commission) === c.rate ? "border-2 border-accent/40 bg-accent/5" : "border border-border/60 bg-bg-secondary"}`}>
                    <p className="text-xs text-text-secondary mb-1">Comisión {c.rate}%</p>
                    <p className="text-sm font-bold font-data text-text">{fmtEur(c.perVideo)}<span className="text-text-secondary font-normal">/video</span></p>
                    <p className="text-lg font-black font-data text-accent">{fmtEur(c.perMonth)}<span className="text-xs text-text-secondary font-normal">/mes</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-[11px] text-text-secondary/60 text-center">
            Estimación basada en promedios. Las views, la tasa de conversión y las ganancias reales pueden variar significativamente según el contenido, el producto y la audiencia.
          </p>
        </div>
      )}
    </div>
  );
}
