"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { COUNTRIES, MARGIN_PRESETS } from "@/data/ttrack-countries";
import { calculateAll, profitStatus } from "@/lib/calculator";
import type { CountryConfig, CalculatorResult } from "@/lib/calculator";

function fmt(n: number | undefined | null): string {
  if (n === undefined || n === null || isNaN(n)) return "—";
  return `€${n.toFixed(2)}`;
}

const SHIPPING_MODES = [
  { id: "free", label: "Envio gratis" },
  { id: "home", label: "Buyer paga (Home)" },
  { id: "pudo", label: "Buyer paga (PUDO)" },
];

const WEIGHT_OPTIONS = [
  { value: "0.5", label: "0–5 kg" },
  { value: "7.5", label: "5–10 kg" },
  { value: "15", label: "10–30 kg" },
];

const STORAGE_KEY = "ttrack_calc";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveState(state: Record<string, unknown>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export default function CalculadoraClient() {
  const [mounted, setMounted] = useState(false);
  const [cost, setCost] = useState("10");
  const [returnRate, setReturnRate] = useState("5");
  const [tikTokCommission, setTikTokCommission] = useState("9");
  const [marginPercent, setMarginPercent] = useState("100");
  const [customMargin, setCustomMargin] = useState("");
  const [weightKg, setWeightKg] = useState("0.5");
  const [originCountry, setOriginCountry] = useState("es");
  const [ivaPct, setIvaPct] = useState("21");
  const [shippingMode, setShippingMode] = useState("free");

  const [countryConfigs, setCountryConfigs] = useState<CountryConfig[]>(
    COUNTRIES.map((c) => ({
      ...c,
      _affiliateOrganic: String(c.affiliateOrganic),
      _affiliatePaid: String(c.affiliatePaid),
      _paidEnabled: true,
      _cpaTtsAds: "5",
      _active: true,
    }))
  );

  // Load from localStorage after mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      if (saved.cost) setCost(saved.cost);
      if (saved.returnRate) setReturnRate(saved.returnRate);
      if (saved.tikTokCommission) setTikTokCommission(saved.tikTokCommission);
      if (saved.marginPercent) setMarginPercent(saved.marginPercent);
      if (saved.customMargin !== undefined) setCustomMargin(saved.customMargin);
      if (saved.weightKg) setWeightKg(saved.weightKg);
      if (saved.originCountry) setOriginCountry(saved.originCountry);
      if (saved.ivaPct) setIvaPct(saved.ivaPct);
      if (saved.shippingMode) setShippingMode(saved.shippingMode);
      if (saved.countryConfigs) setCountryConfigs(saved.countryConfigs);
    }
    setMounted(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!mounted) return;
    saveState({ cost, returnRate, tikTokCommission, marginPercent, customMargin, weightKg, originCountry, ivaPct, shippingMode, countryConfigs });
  }, [cost, returnRate, tikTokCommission, marginPercent, customMargin, weightKg, originCountry, ivaPct, shippingMode, countryConfigs, mounted]);

  function updateCountry(id: string, patch: Partial<CountryConfig>) {
    setCountryConfigs((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  const activeMargin = customMargin !== "" ? customMargin : marginPercent;

  const results = useMemo(() => {
    if ((parseFloat(cost) || 0) <= 0) return null;
    return calculateAll({ cost, returnRate, tikTokCommission, marginPercent: activeMargin, weightKg, originCountry, countries: countryConfigs, ivaPct, shippingMode });
  }, [cost, returnRate, tikTokCommission, activeMargin, weightKg, originCountry, countryConfigs, ivaPct, shippingMode]);

  const costNum = parseFloat(cost) || 0;
  const minProfit = costNum * (parseFloat(activeMargin) || 0) / 100;
  const originFlag = COUNTRIES.find((c) => c.id === originCountry)?.flag || "";

  function selectPreset(pct: number) {
    setMarginPercent(String(pct));
    setCustomMargin("");
  }

  const exportCSV = useCallback(() => {
    if (!results || results.length === 0) return;
    const rows = [["País", "PVP Orgánico", "Beneficio Org.", "PVP Paid", "Beneficio Paid", "Envío Seller", "Estado"]];
    for (const r of results) {
      const status = profitStatus(r.organic.benefit, r.minProfit);
      rows.push([r.country.name, r.organic.pvp?.toFixed(2) ?? "", r.organic.benefit?.toFixed(2) ?? "", r.paid?.pvp?.toFixed(2) ?? "", r.paid?.benefit?.toFixed(2) ?? "", r.sellerShippingCost?.toFixed(2) ?? "", status]);
    }
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shopseller_calc_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [results]);

  if (!mounted) {
    return <div className="max-w-[1440px] mx-auto px-4 py-8"><div className="h-96 flex items-center justify-center text-text-secondary">Cargando calculadora...</div></div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Calculadora de rentabilidad</h1>
        <p className="text-sm text-text-secondary mt-1">Calcula el PVP minimo rentable para TikTok Shop EU por pais.</p>
      </div>

      {/* Parameter bar */}
      <div className="bg-card-bg rounded-2xl border border-border shadow-sm px-5 py-4 mb-4">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
          <SelectField label="Envio desde" value={originCountry} onChange={setOriginCountry}
            options={COUNTRIES.map((c) => ({ value: c.id, label: `${c.flag} ${c.name}` }))} />
          <SelectField label="Modo envio" value={shippingMode} onChange={setShippingMode}
            options={SHIPPING_MODES.map((m) => ({ value: m.id, label: m.label }))} />
          <MiniField label="Coste" value={cost} onChange={setCost} suffix="€" placeholder="10" />
          <SelectField label="Peso" value={weightKg} onChange={setWeightKg}
            options={WEIGHT_OPTIONS.map((w) => ({ value: w.value, label: w.label }))} />

          <div className="hidden lg:block w-px h-8 bg-border self-end mb-1" />

          <MiniField label="Devoluciones" value={returnRate} onChange={setReturnRate} suffix="%" placeholder="5" step="1" />
          <MiniField label="Comision TTS" value={tikTokCommission} onChange={setTikTokCommission} suffix="%" placeholder="9" step="0.5" />
          <MiniField label="IVA" value={ivaPct} onChange={setIvaPct} suffix="%" placeholder="21" step="1" />

          <div className="hidden lg:block w-px h-8 bg-border self-end mb-1" />

          {/* Margin presets */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Margen s/coste</span>
            <div className="flex gap-1 items-center">
              {MARGIN_PRESETS.map((pct) => (
                <button key={pct} onClick={() => selectPreset(pct)}
                  className={`px-2.5 py-[7px] rounded-lg text-xs font-bold transition-all ${customMargin === "" && String(marginPercent) === String(pct) ? "bg-accent text-white shadow-sm shadow-accent/25" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}>
                  {pct}%
                </button>
              ))}
              <div className="relative">
                <input type="number" value={customMargin} onChange={(e) => setCustomMargin(e.target.value)}
                  placeholder="..." step="1"
                  className={`w-[52px] text-right bg-bg-secondary border rounded-lg px-2 py-[7px] text-xs font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 ${customMargin !== "" ? "border-accent text-accent" : "border-border text-text-secondary"}`} />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary text-[9px] pointer-events-none">%</span>
              </div>
            </div>
          </div>

          {costNum > 0 && (
            <div className="text-xs text-text-secondary self-end pb-2">
              Gan. min <span className="text-green-600 dark:text-green-400 font-bold text-sm">{fmt(minProfit)}</span>
            </div>
          )}

          {results && results.length > 0 && (
            <button onClick={exportCSV}
              className="ml-auto self-end px-3 py-[7px] rounded-lg text-xs font-semibold text-text-secondary bg-bg-secondary hover:bg-border transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV
            </button>
          )}
        </div>
      </div>

      {/* Country cards */}
      {results && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {results.map((data, i) => (
            <CountryCard key={data.country.id} data={data}
              config={countryConfigs.find((c) => c.id === data.country.id)!}
              originFlag={originFlag}
              onUpdate={(patch) => updateCountry(data.country.id, patch)}
              style={{ animationDelay: `${i * 50}ms` }} />
          ))}
        </div>
      )}

      {/* Inactive countries */}
      {(() => {
        const inactive = countryConfigs.filter((c) => !c._active);
        if (inactive.length === 0) return null;
        return (
          <div className="flex gap-2 mt-4 items-center">
            <span className="text-xs text-text-secondary">Desactivados:</span>
            {inactive.map((c) => (
              <button key={c.id} onClick={() => updateCountry(c.id, { _active: true })}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card-bg border border-border rounded-lg text-xs text-text-secondary hover:bg-bg-secondary shadow-sm transition-all">
                {c.flag} {c.name} <span className="text-accent font-bold">+</span>
              </button>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ─── Sub-components ───

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-bg-secondary border border-border text-text rounded-lg px-2.5 py-[7px] text-sm font-semibold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 cursor-pointer">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function MiniField({ label, value, onChange, suffix, placeholder, step }: { label: string; value: string; onChange: (v: string) => void; suffix?: string; placeholder?: string; step?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">{label}</span>
      <div className="relative">
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)}
          step={step || "0.01"} placeholder={placeholder}
          className="w-[80px] text-right bg-bg-secondary border border-border text-text rounded-lg px-2.5 py-[7px] text-sm font-semibold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
        {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary text-[10px] pointer-events-none">{suffix}</span>}
      </div>
    </div>
  );
}

function Row({ label, value, negative, bold }: { label: string; value: string; negative?: boolean; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "py-1" : "py-[3px]"}`}>
      <span className={`text-xs ${bold ? "font-bold text-text" : "text-text-secondary"}`}>{label}</span>
      <span className={`text-xs tabular-nums font-semibold ${bold ? "font-bold text-text" : negative ? "text-red-400" : "text-text"}`}>
        {negative ? `−${value}` : value}
      </span>
    </div>
  );
}

function SmallInput({ label, value, onChange, suffix, disabled }: { label: string; value: string | undefined; onChange: (v: string) => void; suffix?: string; disabled?: boolean }) {
  return (
    <div className="flex-1 min-w-0">
      <span className={`text-[10px] font-bold uppercase ${disabled ? "text-text-secondary/40" : "text-text-secondary"}`}>{label}</span>
      <div className="relative mt-px">
        <input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value)} step="0.5" disabled={disabled}
          className={`w-full text-right border rounded-lg px-1.5 py-1 text-xs font-semibold focus:outline-none focus:border-accent ${disabled ? "bg-bg-secondary border-border/50 text-text-secondary/40 cursor-not-allowed" : "bg-bg-secondary border-border text-text"}`} />
        {suffix && <span className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] ${disabled ? "text-text-secondary/40" : "text-text-secondary"}`}>{suffix}</span>}
      </div>
    </div>
  );
}

function CountryCard({ data, config, originFlag, onUpdate, style }: {
  data: CalculatorResult; config: CountryConfig; originFlag: string;
  onUpdate: (patch: Partial<CountryConfig>) => void; style?: React.CSSProperties;
}) {
  const [expanded, setExpanded] = useState(true);
  const { country, organic, paid, cost, sellerNet, sellerShippingCost, dev, minProfit, tikP, ivaPct, shippingMode, buyerFeeForMode, weightTier, buyerFeeHome, ttsFeeHome } = data;
  const affOrg = parseFloat(config._affiliateOrganic ?? String(config.affiliateOrganic));
  const affPaid = parseFloat(config._affiliatePaid ?? String(config.affiliatePaid));
  const retPct = cost > 0 ? ((dev / cost) * 100).toFixed(0) : "0";

  const status = profitStatus(organic.benefit, minProfit);
  const statusCfg = {
    good: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", dot: "bg-green-500", label: "Rentable" },
    fair: { bg: "bg-yellow-500/10", text: "text-yellow-600 dark:text-yellow-400", dot: "bg-yellow-500", label: "Ajustado" },
    bad: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", dot: "bg-red-500", label: "Bajo" },
  };
  const st = statusCfg[status];
  const paidStatus = paid?.valid ? profitStatus(paid.benefit, minProfit) : null;
  const paidSt = paidStatus ? statusCfg[paidStatus] : null;
  const isFreeShipping = shippingMode === "free";

  return (
    <div className="bg-card-bg rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow" style={style}>
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">{country.flag}</span>
            <span className="font-bold text-sm">{country.name}</span>
          </div>
          <button onClick={() => onUpdate({ _active: false })} className="text-white/30 hover:text-white/70 text-sm transition-colors" title="Quitar">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex items-end gap-3 mt-2">
          <div className="flex-1">
            <span className="text-[10px] text-white/40 uppercase tracking-wide">{isFreeShipping ? "PVP org." : "PVP pub."}</span>
            <div className="text-2xl font-black leading-tight tracking-tight">{fmt(organic.pvp)}</div>
            {!isFreeShipping && <div className="text-[10px] text-white/35 mt-0.5">+ envio {fmt(buyerFeeForMode)} = <span className="text-white/60 font-semibold">{fmt(organic.pvp + buyerFeeForMode)}</span></div>}
          </div>
          {paid?.valid && (
            <div className="flex-1 text-right">
              <span className="text-[10px] text-accent/70 uppercase tracking-wide">{isFreeShipping ? "PVP paid" : "Paid pub."}</span>
              <div className="text-2xl font-black leading-tight tracking-tight text-accent">{fmt(paid.pvp)}</div>
              {!isFreeShipping && <div className="text-[10px] text-white/35 mt-0.5">+ envio {fmt(buyerFeeForMode)} = <span className="text-accent/60 font-semibold">{fmt(paid.pvp + buyerFeeForMode)}</span></div>}
            </div>
          )}
        </div>
      </div>

      {/* Shipping strip */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-bg-secondary text-[11px] border-b border-border">
        <span className="text-text-secondary">{originFlag} → {country.flag} · {weightTier} kg</span>
        <span className="text-text font-semibold">{isFreeShipping ? `Seller: ${fmt(sellerShippingCost)}` : `Seller: ${fmt(sellerNet)}`}</span>
      </div>

      <div className="px-4 py-3 flex-1 flex flex-col">
        {/* Config toggle */}
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-[10px] text-text-secondary hover:text-text mb-2 transition-colors">
          <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          Comisiones
        </button>

        {expanded && (
          <div className="mb-2.5 pb-2.5 border-b border-border">
            <div className="grid grid-cols-3 gap-1.5 items-end">
              <SmallInput label="Afil. org." value={config._affiliateOrganic} onChange={(v) => onUpdate({ _affiliateOrganic: v })} suffix="%" />
              <SmallInput label="Afil. paid" value={config._affiliatePaid} onChange={(v) => onUpdate({ _affiliatePaid: v })} suffix="%" disabled={!config._paidEnabled} />
              <SmallInput label="CPA" value={config._cpaTtsAds} onChange={(v) => onUpdate({ _cpaTtsAds: v })} suffix="€" disabled={!config._paidEnabled} />
            </div>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={config._paidEnabled} onChange={() => onUpdate({ _paidEnabled: !config._paidEnabled })} className="accent-accent" />
              <span className="text-[10px] text-text-secondary">Paid activo</span>
            </label>
          </div>
        )}

        {/* Organic breakdown */}
        <div className="flex-1">
          <Row label="PVP organico" value={fmt(organic.pvp)} />
          <Row label={`− TikTok ${tikP}%`} value={fmt(organic.tikCost)} negative />
          <Row label={`− Afiliado ${affOrg}%`} value={fmt(organic.affCost)} negative />
          <Row label={`− IVA ${ivaPct}%`} value={fmt(organic.ivaCost)} negative />
          <Row label="− Producto" value={fmt(cost)} negative />
          <Row label={isFreeShipping ? "− Envio (free)" : "− Envio seller"} value={fmt(sellerShippingCost)} negative />
          <Row label={`− Dev. (${retPct}%)`} value={fmt(dev)} negative />
          <div className="border-t border-border my-1.5" />
          <div className="flex items-center justify-between py-1.5">
            <span className="text-[13px] font-bold text-text">Beneficio org.</span>
            <span className="text-base font-black text-text tabular-nums">{fmt(organic.benefit)}</span>
          </div>
        </div>

        <div className="mt-1.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${st.bg} ${st.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{st.label} · {fmt(organic.benefit)}
          </span>
        </div>

        {/* Paid breakdown */}
        {paid?.valid && (
          <div className="mt-2.5 pt-2.5 border-t border-border">
            <div className={`rounded-xl px-3 py-2.5 ${config._paidEnabled ? "bg-accent/5" : "bg-bg-secondary opacity-40"}`}>
              <Row label="PVP paid" value={fmt(paid.pvp)} />
              <Row label={`− TikTok ${tikP}%`} value={fmt(paid.tikCost)} negative />
              <Row label={`− Afiliado ${affPaid}%`} value={fmt(paid.affCost)} negative />
              <Row label="− CPA TTS" value={fmt(parseFloat(config._cpaTtsAds ?? "0") || 0)} negative />
              <Row label={`− IVA ${ivaPct}%`} value={fmt(paid.ivaCost)} negative />
              <Row label="− Costes" value={fmt(cost + sellerShippingCost + dev)} negative />
              <div className="border-t border-accent/10 my-1.5" />
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[13px] font-bold text-text">Beneficio paid</span>
                <span className="text-base font-black text-text tabular-nums">{fmt(paid.benefit)}</span>
              </div>
            </div>
            {paidSt && (
              <div className="mt-1.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${paidSt.bg} ${paidSt.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${paidSt.dot}`} />Paid: {paidSt.label} · {fmt(paid.benefit)}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-2.5 pt-2 border-t border-border text-[11px] text-text-secondary">
          {isFreeShipping ? <>Buyer: €0.00 · TTS: {fmt(ttsFeeHome)}</> : <>Buyer: {fmt(buyerFeeForMode)} · TTS: {fmt(ttsFeeHome)}</>}
        </div>
      </div>
    </div>
  );
}
