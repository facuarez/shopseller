"use client";

import { useState, useMemo } from "react";

const COUNTRIES = [
  { id: "ES", name: "España", flag: "🇪🇸", standard: 21, reduced: [10, 4], currency: "EUR" },
  { id: "FR", name: "Francia", flag: "🇫🇷", standard: 20, reduced: [10, 5.5, 2.1], currency: "EUR" },
  { id: "IT", name: "Italia", flag: "🇮🇹", standard: 22, reduced: [10, 5, 4], currency: "EUR" },
  { id: "DE", name: "Alemania", flag: "🇩🇪", standard: 19, reduced: [7], currency: "EUR" },
  { id: "IE", name: "Irlanda", flag: "🇮🇪", standard: 23, reduced: [13.5, 9, 4.8, 0], currency: "EUR" },
  { id: "UK", name: "Reino Unido", flag: "🇬🇧", standard: 20, reduced: [5, 0], currency: "GBP" },
];

type Direction = "add" | "remove";

function fmt(n: number, currency: string): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
}

export default function IVACalculator() {
  const [amount, setAmount] = useState("100");
  const [countryId, setCountryId] = useState("ES");
  const [rateType, setRateType] = useState("standard");
  const [direction, setDirection] = useState<Direction>("add");

  const country = COUNTRIES.find((c) => c.id === countryId)!;

  const rate = useMemo(() => {
    if (rateType === "standard") return country.standard;
    const idx = parseInt(rateType.replace("reduced-", ""), 10);
    return country.reduced[idx] ?? country.standard;
  }, [country, rateType]);

  const result = useMemo(() => {
    const base = parseFloat(amount) || 0;
    if (base <= 0) return null;

    if (direction === "add") {
      const iva = base * (rate / 100);
      return { base, iva, total: base + iva, label: "Precio + IVA" };
    } else {
      const base_sin = base / (1 + rate / 100);
      const iva = base - base_sin;
      return { base: base_sin, iva, total: base, label: "Precio sin IVA" };
    }
  }, [amount, rate, direction]);

  return (
    <div className="border-2 border-border rounded-xl bg-card-bg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-text mb-1">Calculadora de IVA</h2>
      <p className="text-sm text-text-secondary mb-5">Calcula el IVA para cualquier pais TTS Europa.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Importe */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Importe ({country.currency})</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2 text-sm font-semibold font-data focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
          />
        </div>

        {/* Pais */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Pais</label>
          <select
            value={countryId}
            onChange={(e) => { setCountryId(e.target.value); setRateType("standard"); }}
            className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-accent cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.id} value={c.id}>{c.flag} {c.name} ({c.standard}%)</option>
            ))}
          </select>
        </div>

        {/* Tipo IVA */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Tipo de IVA</label>
          <select
            value={rateType}
            onChange={(e) => setRateType(e.target.value)}
            className="bg-bg-secondary border border-border text-text rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="standard">Estandar ({country.standard}%)</option>
            {country.reduced.map((r, i) => (
              <option key={i} value={`reduced-${i}`}>Reducido ({r}%)</option>
            ))}
          </select>
        </div>

        {/* Direccion */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Operacion</label>
          <div className="flex gap-1">
            <button
              onClick={() => setDirection("add")}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${direction === "add" ? "bg-accent text-white shadow-sm shadow-accent/25" : "bg-bg-secondary text-text-secondary hover:bg-border border border-border"}`}
            >
              + Agregar IVA
            </button>
            <button
              onClick={() => setDirection("remove")}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${direction === "remove" ? "bg-accent text-white shadow-sm shadow-accent/25" : "bg-bg-secondary text-text-secondary hover:bg-border border border-border"}`}
            >
              − Quitar IVA
            </button>
          </div>
        </div>
      </div>

      {/* Resultado */}
      {result && (
        <div className="bg-bg-secondary rounded-xl p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                {direction === "add" ? "Base imponible" : "Base sin IVA"}
              </p>
              <p className="text-xl font-bold font-data text-text">{fmt(result.base, country.currency)}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                IVA ({rate}%)
              </p>
              <p className="text-xl font-bold font-data text-accent">{fmt(result.iva, country.currency)}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
                {result.label}
              </p>
              <p className="text-xl font-bold font-data text-text">{fmt(result.total, country.currency)}</p>
            </div>
          </div>

          {/* Multi-country comparison */}
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-3">Comparativa: mismo importe en todos los paises (IVA estandar)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {COUNTRIES.map((c) => {
                const base = parseFloat(amount) || 0;
                const iva = direction === "add" ? base * (c.standard / 100) : base - (base / (1 + c.standard / 100));
                const total = direction === "add" ? base + base * (c.standard / 100) : base;
                return (
                  <div key={c.id} className={`p-2.5 rounded-lg border text-center ${c.id === countryId ? "border-accent/40 bg-accent/5" : "border-border/60"}`}>
                    <p className="text-xs mb-0.5">{c.flag} {c.id}</p>
                    <p className="text-xs font-data font-bold text-text">{fmt(direction === "add" ? total : base - iva, c.currency)}</p>
                    <p className="text-[10px] font-data text-accent">+{fmt(iva, c.currency)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
