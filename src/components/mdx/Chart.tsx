"use client";

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type ChartType = "line" | "bar" | "pie";

interface DataPoint {
  [key: string]: string | number;
}

interface Props {
  type: ChartType;
  /** Array como JSON string para compatibilidad con MDX. Ej: '[{"name":"A","value":10}]' */
  dataJson: string;
  xKey?: string;
  yKey?: string;
  pieKey?: string;
  pieValueKey?: string;
  title?: string;
  height?: number;
  /** Colors como CSV string. Ej: '#FF5A1F,#3B82F6' */
  colors?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const DEFAULT_COLORS = ["#FF5A1F", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];

/**
 * Gráfico inline con Recharts. Uso:
 *
 * <Chart type="line" title="Evolución comisiones TTS"
 *   data={[{month: "Nov 23", pct: 2}, {month: "Mar 24", pct: 5}]}
 *   xKey="month" yKey="pct" valueSuffix="%" />
 *
 * <Chart type="pie" title="Atribución de ventas"
 *   data={[{name: "Orgánico", value: 46}, {name: "Propio", value: 39}, {name: "Paid", value: 14}]}
 *   pieKey="name" pieValueKey="value" />
 */
export default function Chart({
  type, dataJson, xKey = "name", yKey = "value", pieKey = "name", pieValueKey = "value",
  title, height = 260, colors, valuePrefix = "", valueSuffix = "",
}: Props) {
  let data: DataPoint[] = [];
  try { data = JSON.parse(dataJson); } catch { data = []; }
  const colorArr = colors ? colors.split(",").map((c) => c.trim()) : DEFAULT_COLORS;
  const tooltipStyle = {
    backgroundColor: "var(--color-card-bg, #FFF)",
    border: "1px solid var(--color-border, #E5E5E5)",
    borderRadius: "8px",
    fontSize: "12px",
  };

  const formatter = (value: unknown): string => `${valuePrefix}${value}${valueSuffix}`;

  return (
    <div className="not-prose my-6 p-5 rounded-xl border border-border bg-card-bg">
      {title && <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">{title}</p>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          {type === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #E5E5E5)" />
              <XAxis dataKey={xKey} stroke="var(--color-text-secondary, #999)" style={{ fontSize: 11 }} />
              <YAxis stroke="var(--color-text-secondary, #999)" style={{ fontSize: 11 }} tickFormatter={formatter} />
              <Tooltip contentStyle={tooltipStyle} formatter={formatter} />
              <Line type="monotone" dataKey={yKey} stroke={colorArr[0]} strokeWidth={2.5} dot={{ fill: colorArr[0], r: 4 }} />
            </LineChart>
          ) : type === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #E5E5E5)" />
              <XAxis dataKey={xKey} stroke="var(--color-text-secondary, #999)" style={{ fontSize: 11 }} />
              <YAxis stroke="var(--color-text-secondary, #999)" style={{ fontSize: 11 }} tickFormatter={formatter} />
              <Tooltip contentStyle={tooltipStyle} formatter={formatter} />
              <Bar dataKey={yKey} radius={[6, 6, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={colorArr[i % colorArr.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie data={data} dataKey={pieValueKey} nameKey={pieKey} cx="50%" cy="50%" outerRadius={90}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={(props: any) => `${props[pieKey]}: ${props[pieValueKey]}${valueSuffix}`}>
                {data.map((_, i) => (
                  <Cell key={i} fill={colorArr[i % colorArr.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={formatter} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
