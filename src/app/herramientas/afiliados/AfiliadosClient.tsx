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
  if (organicPct > 0.7) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">Organico</span>;
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

  function SortHeader({ label, field }: { label: string; field: string }) {
    const active = sortKey === field;
    return (
      <button onClick={() => toggleSort(field)} className={`text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1 ${active ? "text-accent" : "text-text-secondary"} hover:text-accent transition-colors`}>
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
        <p className="text-text-secondary mb-8">Subi tu export de ordenes de afiliados y obtene un desglose completo. Tus datos no salen de tu navegador.</p>

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
              <p className="text-text font-medium mb-1">Arrastra tu CSV aqui o hace click para seleccionar</p>
              <p className="text-sm text-text-secondary">Export de &quot;Ordenes de afiliados&quot; del TikTok Seller Center</p>
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
            <p className="text-xs text-text-secondary">Esta herramienta procesa tu archivo localmente en tu navegador. Ningun dato se envia a nuestros servidores ni a terceros.</p>
          </div>
        </div>

        {/* How to export */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-text mb-3">Como exportar el CSV desde TikTok Seller Center</h2>
          <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
            <li>Entra a <strong className="text-text">TikTok Seller Center</strong> → seccion <strong className="text-text">Afiliados</strong></li>
            <li>Ve a <strong className="text-text">Ordenes de afiliados</strong></li>
            <li>Selecciona el rango de fechas que queres analizar</li>
            <li>Click en <strong className="text-text">Exportar</strong> → descarga el CSV</li>
            <li>Subi ese archivo aqui arriba</li>
          </ol>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  const m = data.metrics;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Analizador de Afiliados</h1>
          <p className="text-sm text-text-secondary">{m.totalOrders} ordenes · {m.activeAffiliates} afiliados · {data.skippedRows > 0 && <span className="text-yellow-600">{data.skippedRows} filas ignoradas</span>}</p>
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
          { label: "Comision estimada", value: fmtEur(m.commissionTotal) },
        ].map((card) => (
          <div key={card.label} className="p-4 rounded-xl border border-border bg-card-bg shadow-sm">
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-xl font-bold font-data ${card.accent ? "text-accent" : "text-text"}`}>{card.value}</p>
            {card.sub && <p className="text-[10px] text-text-secondary mt-0.5">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-bg-secondary rounded-lg p-1">
          {([["affiliates", "Afiliados"], ["videos", "Videos"], ["products", "Productos"]] as [Tab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); setSortKey(id === "affiliates" ? "gmvTotal" : id === "videos" ? "totalOrders" : "totalOrders"); setSortDir("desc"); }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${tab === id ? "bg-card-bg text-text shadow-sm" : "text-text-secondary hover:text-text"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Channel filter */}
        <div className="flex gap-1 bg-bg-secondary rounded-lg p-1">
          {([["all", "Todos"], ["organic", "Organico"], ["paid", "Paid"]] as [ChannelFilter, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setChannelFilter(id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${channelFilter === id ? "bg-card-bg text-text shadow-sm" : "text-text-secondary hover:text-text"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar afiliado o producto..."
            className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-bg-secondary border border-border text-text placeholder:text-text-secondary/50 focus:outline-none focus:border-accent" />
        </div>
      </div>

      {/* ─── TAB: AFFILIATES ─── */}
      {tab === "affiliates" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card-bg shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-secondary border-b border-border">
                <th className="text-left px-4 py-3 w-10"><span className="text-[10px] text-text-secondary uppercase">#</span></th>
                <th className="text-left px-4 py-3"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Afiliado</span></th>
                <th className="text-right px-4 py-3"><SortHeader label="Ventas" field="totalOrders" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="GMV" field="gmvTotal" /></th>
                <th className="text-right px-4 py-3 hidden lg:table-cell"><SortHeader label="GMV Org." field="gmvOrganic" /></th>
                <th className="text-right px-4 py-3 hidden lg:table-cell"><SortHeader label="GMV Paid" field="gmvPaid" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="Comision" field="commissionTotal" /></th>
                <th className="text-center px-4 py-3 hidden md:table-cell"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Videos</span></th>
                <th className="text-center px-4 py-3 hidden md:table-cell"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Canal</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((a, i) => (
                <tr key={a.username} className={`border-b border-border/50 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 === 0 ? "" : "bg-bg-secondary/30"}`}>
                  <td className="px-4 py-2.5"><Medal pos={i} /></td>
                  <td className="px-4 py-2.5">
                    <a href={tiktokProfileUrl(a.username)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-text hover:text-accent transition-colors">
                      @{a.username}<ExtLink />
                    </a>
                  </td>
                  <td className="text-right px-4 py-2.5 font-data font-semibold text-text">{a.totalOrders}</td>
                  <td className="text-right px-4 py-2.5 font-data font-bold text-accent">{fmtEur(a.gmvTotal)}</td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary hidden lg:table-cell">{fmtEur(a.gmvOrganic)}</td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary hidden lg:table-cell">{fmtEur(a.gmvPaid)}</td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary">{fmtEur(a.commissionTotal)}</td>
                  <td className="text-center px-4 py-2.5 font-data text-text-secondary hidden md:table-cell">{a.uniqueVideos}</td>
                  <td className="text-center px-4 py-2.5 hidden md:table-cell"><ChannelBadge organicPct={a.organicPct} /></td>
                </tr>
              ))}
              {filteredAffiliates.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-text-secondary">No hay afiliados para estos filtros.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── TAB: VIDEOS ─── */}
      {tab === "videos" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card-bg shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-secondary border-b border-border">
                <th className="text-left px-4 py-3 w-10"><span className="text-[10px] text-text-secondary uppercase">#</span></th>
                <th className="text-left px-4 py-3"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Creador</span></th>
                <th className="text-left px-4 py-3 hidden lg:table-cell"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Producto principal</span></th>
                <th className="text-right px-4 py-3"><SortHeader label="Ventas" field="totalOrders" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="GMV" field="gmv" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="Comision" field="commission" /></th>
                <th className="text-center px-4 py-3"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Tipo</span></th>
                <th className="text-center px-4 py-3 w-14"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Link</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((v, i) => (
                <tr key={v.contentId} className={`border-b border-border/50 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 === 0 ? "" : "bg-bg-secondary/30"}`}>
                  <td className="px-4 py-2.5"><Medal pos={i} /></td>
                  <td className="px-4 py-2.5 text-sm font-semibold text-text">@{v.username}</td>
                  <td className="px-4 py-2.5 text-xs text-text-secondary max-w-[200px] truncate hidden lg:table-cell">{v.productName}</td>
                  <td className="text-right px-4 py-2.5 font-data font-semibold text-text">{v.totalOrders}</td>
                  <td className="text-right px-4 py-2.5 font-data font-bold text-accent">{fmtEur(v.gmv)}</td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary">{fmtEur(v.commission)}</td>
                  <td className="text-center px-4 py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${v.contentType === "video" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-purple-500/10 text-purple-600 dark:text-purple-400"}`}>
                      {v.contentType === "video" ? "Video" : "Escaparate"}
                    </span>
                  </td>
                  <td className="text-center px-4 py-2.5">
                    {v.contentType === "video" ? (
                      <a href={tiktokVideoUrl(v.username, v.contentId)} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      </a>
                    ) : <span className="text-text-secondary/30">—</span>}
                  </td>
                </tr>
              ))}
              {filteredVideos.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-text-secondary">No hay videos para estos filtros.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── TAB: PRODUCTS ─── */}
      {tab === "products" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card-bg shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-secondary border-b border-border">
                <th className="text-left px-4 py-3 w-10"><span className="text-[10px] text-text-secondary uppercase">#</span></th>
                <th className="text-left px-4 py-3"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Producto</span></th>
                <th className="text-right px-4 py-3"><SortHeader label="Pedidos" field="totalOrders" /></th>
                <th className="text-right px-4 py-3 hidden md:table-cell"><SortHeader label="Uds" field="totalUnits" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="GMV" field="gmvTotal" /></th>
                <th className="text-center px-4 py-3 w-32 hidden lg:table-cell"><span className="text-[10px] text-text-secondary uppercase tracking-wider">Org / Paid</span></th>
                <th className="text-right px-4 py-3 hidden md:table-cell"><SortHeader label="Afiliados" field="uniqueAffiliates" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="Comision" field="commissionTotal" /></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, i) => (
                <tr key={p.productId} className={`border-b border-border/50 last:border-0 hover:bg-bg-secondary/50 transition-colors ${i % 2 === 0 ? "" : "bg-bg-secondary/30"}`}>
                  <td className="px-4 py-2.5"><Medal pos={i} /></td>
                  <td className="px-4 py-2.5 text-sm font-medium text-text max-w-[250px]"><span className="line-clamp-2">{p.productName}</span></td>
                  <td className="text-right px-4 py-2.5 font-data font-semibold text-text">{p.totalOrders}</td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary hidden md:table-cell">{p.totalUnits}</td>
                  <td className="text-right px-4 py-2.5 font-data font-bold text-accent">{fmtEur(p.gmvTotal)}</td>
                  <td className="px-4 py-2.5 hidden lg:table-cell"><OrgPaidBar organic={p.organicOrders} paid={p.paidOrders} /></td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary hidden md:table-cell">{p.uniqueAffiliates}</td>
                  <td className="text-right px-4 py-2.5 font-data text-text-secondary">{fmtEur(p.commissionTotal)}</td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-text-secondary">No hay productos para estos filtros.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Privacy footer */}
      <div className="mt-6 text-center text-[11px] text-text-secondary/60">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1 -mt-0.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        Tus datos se procesan localmente. Nada se envia a ningun servidor.
      </div>
    </div>
  );
}
