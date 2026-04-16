"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  mono?: boolean; // Usar JetBrains Mono para esta columna
}

interface Props {
  columns: Column[];
  data: Record<string, string | number>[];
  filterKey?: string; // Clave para el dropdown de filtro
  filterOptions?: { value: string; label: string }[];
  caption?: string;
}

/**
 * Tabla genérica reutilizable con filtro opcional.
 * Se usa para comisiones, IVAs, y cualquier dato tabular.
 */
export default function DataTable({ columns, data, filterKey, filterOptions, caption }: Props) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!filterKey || filter === "all") return data;
    return data.filter((row) => row[filterKey] === filter);
  }, [data, filter, filterKey]);

  return (
    <div>
      {/* Filtro */}
      {filterKey && filterOptions && (
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="table-filter" className="text-sm text-text-secondary">
            Filtrar por:
          </label>
          <select
            id="table-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-card-bg text-text"
          >
            <option value="all">Todos</option>
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-sm">
          {caption && (
            <caption className="text-xs text-text-secondary text-left p-3 border-b border-border">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="bg-bg-secondary">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-2.5 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center"
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary">
                  No hay datos para este filtro.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-2.5",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.mono && "font-data"
                      )}
                    >
                      {row[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
