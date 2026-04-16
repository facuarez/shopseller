"use client";

import { useState, useMemo } from "react";
import ChangelogEntryComponent from "@/components/ChangelogEntry";
import type { ChangelogFrontmatter } from "@/types/content";

// Los datos se pasan como props desde un wrapper server component
// Para simplificar, este componente lee datos inline
// En produccion, se podria separar en un server component + client component

interface ChangelogItem {
  slug: string;
  frontmatter: ChangelogFrontmatter;
  content: string;
}

const CATEGORIES = [
  { value: "all", label: "Todas" },
  { value: "politica", label: "Politica" },
  { value: "feature", label: "Feature" },
  { value: "comision", label: "Comision" },
  { value: "bug", label: "Bug" },
  { value: "expansion", label: "Expansion" },
];

const COUNTRIES = [
  { value: "all", label: "Todos" },
  { value: "ES", label: "España" },
  { value: "FR", label: "Francia" },
  { value: "IT", label: "Italia" },
  { value: "DE", label: "Alemania" },
  { value: "IE", label: "Irlanda" },
  { value: "UK", label: "UK" },
];

const IMPACTS = [
  { value: "all", label: "Todos" },
  { value: "alto", label: "Alto" },
  { value: "medio", label: "Medio" },
  { value: "bajo", label: "Bajo" },
];

export default function ChangelogPageClient({ items }: { items: ChangelogItem[] }) {
  const [catFilter, setCatFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (catFilter !== "all" && item.frontmatter.category !== catFilter) return false;
      if (countryFilter !== "all" && item.frontmatter.country !== countryFilter && item.frontmatter.country !== "all") return false;
      if (impactFilter !== "all" && item.frontmatter.impact !== impactFilter) return false;
      return true;
    });
  }, [items, catFilter, countryFilter, impactFilter]);

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2">
          <label className="text-xs text-text-secondary" htmlFor="cat-filter">Categoria:</label>
          <select id="cat-filter" value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="text-sm border border-border rounded-md px-2 py-1 bg-card-bg text-text">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-text-secondary" htmlFor="country-filter">Pais:</label>
          <select id="country-filter" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="text-sm border border-border rounded-md px-2 py-1 bg-card-bg text-text">
            {COUNTRIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-text-secondary" htmlFor="impact-filter">Impacto:</label>
          <select id="impact-filter" value={impactFilter} onChange={(e) => setImpactFilter(e.target.value)} className="text-sm border border-border rounded-md px-2 py-1 bg-card-bg text-text">
            {IMPACTS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      {/* Entradas */}
      {filtered.length === 0 ? (
        <p className="text-text-secondary py-8">No hay entradas para estos filtros.</p>
      ) : (
        <div className="divide-y divide-border">
          {filtered.map((entry) => (
            <ChangelogEntryComponent
              key={entry.slug}
              frontmatter={entry.frontmatter}
              content={entry.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}
