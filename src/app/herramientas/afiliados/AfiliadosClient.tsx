"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import {
  parseAffiliateCSV, tiktokProfileUrl, tiktokVideoUrl, fmtEur, fmtPct,
  type ParseResult, type AffiliateStats, type VideoStats, type ProductStats,
} from "@/lib/affiliate-parser";

type Tab = "affiliates" | "videos" | "products";
type ChannelFilter = "all" | "organic" | "paid";
type SortDir = "asc" | "desc";

// ─── External link icon ───
function ExtLink() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1 opacity-50"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}

function Medal({ pos }: { pos: number }) {
  if (pos === 0) return <span className="text-yellow-500 font-bold">#1</span>;
  if (pos === 1) return <span className="text-gray-400 font-bold">#2</span>;
  if (pos === 2) return <span className="text-amber-700 font-bold">#3</span>;
  return <span className="text-text-secondary font-data text-xs">#{pos + 1}</span>;
}

function ChannelBadge({ organicPct }: { organicPct: number }) {
  if (organicPct > 0.7) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">Orgánico</span>;
  if (organicPct < 0.3) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">Paid</span>;
  return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">Mixto</span>;
}

function OrgPaidBar({ organic, paid }: { organic: number; paid: number }) {
  const total = organic + paid;
  if (total === 0) return null;
  const orgPct = (organic / total) * 100;
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 rounded-full bg-bg-secondary overflow-hidden">
        <div className="h-full bg-green-500/60 rounded-full" style={{ width: `${orgPct}%` }} />
      </div>
      <span className="text-[10px] text-text-secondary font-data shrink-0">{organic}/{paid}</span>
    </div>
  );
}

export default function AfiliadosClient() {
  const [data, setData] = useState<ParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("affiliates");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("gmvTotal");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setError("El archivo debe ser un CSV exportado desde TikTok Seller Center.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await parseAffiliateCSV(file);
      setData(result);
      setTab("affiliates");
      setSortKey("gmvTotal");
      setSortDir("desc");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  function toggleSort(key: string) {
    if (sortKey === key) setSortDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  function SortHeader({ label, field, align = "right" }: { label: string; field: string; align?: "left" | "right" | "center" }) {
    const active = sortKey === field;
    return (
      <button onClick={() => toggleSort(field)} className={`text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1 w-full ${align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start"} ${active ? "text-accent" : "text-text-secondary"} hover:text-accent transition-colors`}>
        {label}
        {active && <span className="text-[8px]">{sortDir === "desc" ? "▼" : "▲"}</span>}
      </button>
    );
  }

  // ─── Filtered + sorted data ───
  const filteredAffiliates = useMemo(() => {
    if (!data) return [];
    let items = [...data.affiliates];
    if (search) items = items.filter((a) => a.username.toLowerCase().includes(search.toLowerCase()));
    if (channelFilter === "organic") items = items.filter((a) => a.organicPct > 0.5);
    if (channelFilter === "paid") items = items.filter((a) => a.organicPct <= 0.5);
    const key = sortKey as keyof AffiliateStats;
    items.sort((a, b) => {
      const va = a[key] as number, vb = b[key] as number;
      return sortDir === "desc" ? vb - va : va - vb;
    });
    return items;
  }, [data, search, channelFilter, sortKey, sortDir]);

  const filteredVideos = useMemo(() => {
    if (!data) return [];
    let items = [...data.videos];
    if (search) items = items.filter((v) => v.username.toLowerCase().includes(search.toLowerCase()) || v.productName.toLowerCase().includes(search.toLowerCase()));
    const key = sortKey as keyof VideoStats;
    items.sort((a, b) => {
      const va = (a[key] ?? 0) as number, vb = (b[key] ?? 0) as number;
      return sortDir === "desc" ? vb - va : va - vb;
    });
    return items;
  }, [data, search, sortKey, sortDir]);

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    let items = [...data.products];
    if (search) items = items.filter((p) => p.productName.toLowerCase().includes(search.toLowerCase()));
    if (channelFilter === "organic") items = items.filter((p) => p.organicOrders > p.paidOrders);
    if (channelFilter === "paid") items = items.filter((p) => p.paidOrders >= p.organicOrders);
    const key = sortKey as keyof ProductStats;
    items.sort((a, b) => {
      const va = (a[key] ?? 0) as number, vb = (b[key] ?? 0) as number;
      return sortDir === "desc" ? vb - va : va - vb;
    });
    return items;
  }, [data, search, channelFilter, sortKey, sortDir]);

  // ─── Upload screen ───
  if (!data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-text mb-2">Analizador de Afiliados TikTok Shop</h1>
        <p className="text-text-secondary mb-8">Subí tu export de órdenes de afiliados y obtené un desglose completo. Tus datos no salen de tu navegador.</p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-16 text-center cursor-pointer hover:border-accent/40 hover:bg-bg-secondary/50 transition-all"
        >
          <input ref={fileRef} type="file" accept=".csv" onChange={onFileSelect} className="hidden" />
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          </div>
          {loading ? (
            <p className="text-text font-medium">Procesando CSV...</p>
          ) : (
            <>
              <p className="text-text font-medium mb-1">Arrastrá tu CSV aquí o hacé click para seleccionar</p>
              <p className="text-sm text-text-secondary">Export de &quot;Órdenes de afiliados&quot; del TikTok Seller Center</p>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}

        {/* Privacy notice */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-bg-secondary border border-border">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400 shrink-0 mt-0.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          <div>
            <p className="text-sm font-semibold text-text mb-0.5">100% client-side</p>
            <p className="text-xs text-text-secondary">Esta herramienta procesa tu archivo localmente en tu navegador. Ningún dato se envía a nuestros servidores ni a terceros.</p>
          </div>
        </div>

        {/* How to export */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-text mb-3">Cómo exportar el CSV desde TikTok Seller Center</h2>
          <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
            <li>Entra a <strong className="text-text">TikTok Seller Center</strong> → sección <strong className="text-text">Afiliados</strong></li>
            <li>Ve a <strong className="text-text">Órdenes de afiliados</strong></li>
            <li>Selecciona el rango de fechas que querés analizar</li>
            <li>Click en <strong className="text-text">Exportar</strong> → descarga el CSV</li>
            <li>Subí ese archivo aquí arriba</li>
          </ol>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  const m = data.metrics;

  const TAB_CONFIG: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: "affiliates", label: "Afiliados", count: data.affiliates.length, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg> },
    { id: "videos", label: "Videos", count: data.videos.length, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> },
    { id: "products", label: "Productos", count: data.products.length, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg> },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Analizador de Afiliados</h1>
          <p className="text-sm text-text-secondary">{m.totalOrders} órdenes · {m.organicOrders} org · {m.paidOrders} paid{data.skippedRows > 0 && <> · <span className="text-yellow-600">{data.skippedRows} filas ignoradas</span></>}</p>
        </div>
        <button
          onClick={() => { setData(null); setError(null); setSearch(""); }}
          className="px-4 py-2 rounded-lg text-xs font-semibold text-text-secondary bg-bg-secondary hover:bg-border transition-colors"
        >
          Cargar otro CSV
        </button>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total pedidos", value: String(m.totalOrders), sub: `${m.organicOrders} org · ${m.paidOrders} paid` },
          { label: "GMV total", value: fmtEur(m.gmvTotal), accent: true },
          { label: "Afiliados activos", value: String(m.activeAffiliates) },
          { label: "Videos con ventas", value: String(m.videosWithSales) },
          { label: "Comisión estimada", value: fmtEur(m.commissionTotal) },
        ].map((card) => (
          <div key={card.label} className="p-4 rounded-xl border border-border bg-card-bg shadow-sm">
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-xl font-bold font-data ${card.accent ? "text-accent" : "text-text"}`}>{card.value}</p>
            {card.sub && <p className="text-[10px] text-text-secondary mt-0.5">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* ═══ TABS — prominentes ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {TAB_CONFIG.map(({ id, label, icon, count }) => (
            <button key={id} onClick={() => { setTab(id); setSortKey(id === "affiliates" ? "gmvTotal" : "totalOrders"); setSortDir("desc"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                tab === id
                  ? "bg-accent text-white border-accent shadow-sm shadow-accent/20"
                  : "bg-card-bg text-text-secondary border-border hover:border-text-secondary/30 hover:text-text"
              }`}>
              {icon}
              {label}
              <span className={`text-xs font-data px-1.5 py-0.5 rounded-md ${tab === id ? "bg-white/20" : "bg-bg-secondary"}`}>{count}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] max-w-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-card-bg border border-border text-text placeholder:text-text-secondary/50 focus:outline-none focus:border-accent" />
        </div>
      </div>

      {/* ═══ TABLE CONTAINER — max height with internal scroll ═══ */}
      <div className="rounded-xl border border-border bg-card-bg shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[560px] overflow-y-auto">

        {/* ─── TAB: AFFILIATES ─── */}
        {tab === "affiliates" && (
          <table className="w-full text-sm table-fixed">
            <thead className="sticky top-0 z-10">
              <tr className="bg-bg-secondary border-b border-border">
                <th className="text-center px-2 py-3 w-10"><span className="text-[10px] text-text-secondary uppercase">#</span></th>
                <th className="text-left px-2 py-3 w-[180px]"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Afiliado</span></th>
                <th className="text-right px-2 py-3"><SortHeader label="Ventas" field="totalOrders" /></th>
                <th className="text-right px-2 py-3"><SortHeader label="GMV" field="gmvTotal" /></th>
                <th className="text-right px-2 py-3 hidden lg:table-cell"><SortHeader label="Org." field="gmvOrganic" /></th>
                <th className="text-right px-2 py-3 hidden lg:table-cell"><SortHeader label="Paid" field="gmvPaid" /></th>
                <th className="text-right px-2 py-3"><SortHeader label="Comision" field="commissionTotal" /></th>
                <th className="text-center px-2 py-3 w-14 hidden md:table-cell"><span className="text-[10px] text-text-secondary uppercase">Vid.</span></th>
                <th className="text-center px-2 py-3 w-20 hidden md:table-cell"><span className="text-[10px] text-text-secondary uppercase">Canal</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((a, i) => (
                <tr key={a.username} className={`border-b border-border/40 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 !== 0 ? "bg-bg-secondary/20" : ""}`}>
                  <td className="text-center px-2 py-2"><Medal pos={i} /></td>
                  <td className="px-2 py-2 truncate">
                    <a href={tiktokProfileUrl(a.username)} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                      @{a.username}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 shrink-0"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                  </td>
                  <td className="text-right px-2 py-2 font-data font-semibold text-text">{a.totalOrders}</td>
                  <td className="text-right px-2 py-2 font-data font-bold text-text">{fmtEur(a.gmvTotal)}</td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary hidden lg:table-cell">{fmtEur(a.gmvOrganic)}</td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary hidden lg:table-cell">{fmtEur(a.gmvPaid)}</td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary">{fmtEur(a.commissionTotal)}</td>
                  <td className="text-center px-2 py-2 font-data text-text-secondary hidden md:table-cell">{a.uniqueVideos}</td>
                  <td className="text-center px-2 py-2 hidden md:table-cell"><ChannelBadge organicPct={a.organicPct} /></td>
                </tr>
              ))}
              {filteredAffiliates.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-text-secondary">No hay afiliados para estos filtros.</td></tr>
              )}
            </tbody>
          </table>
        )}

        {/* ─── TAB: VIDEOS — link integrado en creador ─── */}
        {tab === "videos" && (
          <table className="w-full text-sm table-fixed">
            <thead className="sticky top-0 z-10">
              <tr className="bg-bg-secondary border-b border-border">
                <th className="text-center px-2 py-3 w-10"><span className="text-[10px] text-text-secondary uppercase">#</span></th>
                <th className="text-left px-2 py-3 w-[200px]"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Creador / Video</span></th>
                <th className="text-left px-2 py-3 hidden lg:table-cell"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Producto</span></th>
                <th className="text-right px-2 py-3"><SortHeader label="Ventas" field="totalOrders" /></th>
                <th className="text-right px-2 py-3"><SortHeader label="GMV" field="gmv" /></th>
                <th className="text-right px-2 py-3"><SortHeader label="Comision" field="commission" /></th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((v, i) => (
                <tr key={v.contentId} className={`border-b border-border/40 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 !== 0 ? "bg-bg-secondary/20" : ""}`}>
                  <td className="text-center px-2 py-2"><Medal pos={i} /></td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      {/* Play button as video link */}
                      {v.contentType === "video" ? (
                        <a href={tiktokVideoUrl(v.username, v.contentId)} target="_blank" rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all" title="Ver video en TikTok">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </a>
                      ) : (
                        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg-secondary text-text-secondary">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg>
                        </span>
                      )}
                      <div className="min-w-0">
                        <a href={tiktokProfileUrl(v.username)} target="_blank" rel="noopener noreferrer"
                          className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors truncate block">
                          @{v.username}
                        </a>
                        <span className={`text-[10px] font-medium ${v.contentType === "video" ? "text-text-secondary" : "text-purple-500"}`}>
                          {v.contentType === "video" ? "Video" : "Escaparate"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-xs text-text-secondary truncate hidden lg:table-cell">{v.productName}</td>
                  <td className="text-right px-2 py-2 font-data font-semibold text-text">{v.totalOrders}</td>
                  <td className="text-right px-2 py-2 font-data font-bold text-text">{fmtEur(v.gmv)}</td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary">{fmtEur(v.commission)}</td>
                </tr>
              ))}
              {filteredVideos.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-text-secondary">No hay videos para estos filtros.</td></tr>
              )}
            </tbody>
          </table>
        )}

        {/* ─── TAB: PRODUCTS ─── */}
        {tab === "products" && (
          <table className="w-full text-sm table-fixed">
            <thead className="sticky top-0 z-10">
              <tr className="bg-bg-secondary border-b border-border">
                <th className="text-center px-2 py-3 w-10"><span className="text-[10px] text-text-secondary uppercase">#</span></th>
                <th className="text-left px-2 py-3"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Producto</span></th>
                <th className="text-right px-2 py-3 w-16"><SortHeader label="Ped." field="totalOrders" /></th>
                <th className="text-right px-2 py-3 w-14 hidden md:table-cell"><SortHeader label="Uds" field="totalUnits" /></th>
                <th className="text-right px-2 py-3 w-24"><SortHeader label="GMV" field="gmvTotal" /></th>
                <th className="text-center px-2 py-3 w-24 hidden lg:table-cell"><span className="text-[10px] text-text-secondary uppercase">Org/Paid</span></th>
                <th className="text-right px-2 py-3 w-14 hidden md:table-cell"><SortHeader label="Afil." field="uniqueAffiliates" /></th>
                <th className="text-right px-2 py-3 w-24"><SortHeader label="Comision" field="commissionTotal" /></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, i) => (
                <tr key={p.productId} className={`border-b border-border/40 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 !== 0 ? "bg-bg-secondary/20" : ""}`}>
                  <td className="text-center px-2 py-2"><Medal pos={i} /></td>
                  <td className="px-2 py-2 text-sm font-medium text-text truncate">{p.productName}</td>
                  <td className="text-right px-2 py-2 font-data font-semibold text-text">{p.totalOrders}</td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary hidden md:table-cell">{p.totalUnits}</td>
                  <td className="text-right px-2 py-2 font-data font-bold text-text">{fmtEur(p.gmvTotal)}</td>
                  <td className="px-2 py-2 hidden lg:table-cell"><OrgPaidBar organic={p.organicOrders} paid={p.paidOrders} /></td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary hidden md:table-cell">{p.uniqueAffiliates}</td>
                  <td className="text-right px-2 py-2 font-data text-text-secondary">{fmtEur(p.commissionTotal)}</td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-text-secondary">No hay productos para estos filtros.</td></tr>
              )}
            </tbody>
          </table>
        )}

        </div>
      </div>

      {/* Privacy footer */}
      <div className="mt-4 text-center text-[11px] text-text-secondary/60">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1 -mt-0.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        Tus datos se procesan localmente. Nada se envía a ningún servidor.
      </div>
    </div>
  );
}
