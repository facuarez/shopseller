// Tipos para el frontmatter y contenido del sitio

export interface AnalisisFrontmatter {
  title: string;
  description: string;
  pubDate: string; // YYYY-MM-DD
  updatedDate?: string;
  author: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime?: number; // minutos, auto-calculado
}

export interface Analisis {
  slug: string;
  frontmatter: AnalisisFrontmatter;
  content: string; // raw MDX string
}

export interface ChangelogFrontmatter {
  date: string; // YYYY-MM-DD
  title: string;
  category: "politica" | "feature" | "comision" | "bug" | "expansion";
  country: "ES" | "FR" | "IT" | "DE" | "IE" | "UK" | "all";
  impact: "alto" | "medio" | "bajo";
}

export interface ChangelogEntry {
  slug: string;
  frontmatter: ChangelogFrontmatter;
  content: string;
}

// Datos estructurados

export interface ComisionCategoria {
  name: string;
  commission: number; // porcentaje
  notes: string;
}

export interface ComisionesPais {
  country: string;
  lastUpdated: string;
  categories: ComisionCategoria[];
}

export type ComisionesData = Record<string, ComisionesPais>;

export interface IVAPais {
  country: string;
  standard: number;
  reduced: number[];
  currency: string;
  notes: string;
}

export type IVAsData = Record<string, IVAPais>;

export interface HerramientaExterna {
  slug: string;
  name: string;
  type: string;
  description: string;
  pricing: "free" | "freemium" | "paid";
  url: string;
  countries: string[];
  tags: string[];
}

export interface HerramientasData {
  tools: HerramientaExterna[];
}

export interface EnviosData {
  // TODO: Definir estructura cuando se complete la tabla de envíos
  lastUpdated: string;
  routes: Array<{
    origin: string;
    destination: string;
    carrier: string;
    estimatedDays: string;
    notes: string;
  }>;
}
