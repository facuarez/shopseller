import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Analisis, AnalisisFrontmatter, ChangelogEntry, ChangelogFrontmatter } from "@/types/content";

// Directorio de contenido MDX
const CONTENT_DIR = path.join(process.cwd(), "src", "content");

/**
 * Lee todos los archivos MDX de un directorio y retorna frontmatter + contenido.
 */
function readMDXFiles<T>(dir: string): Array<{ slug: string; frontmatter: T; content: string }> {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const filePath = path.join(fullDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      slug,
      frontmatter: data as T,
      content,
    };
  });
}

/**
 * Obtiene todos los análisis publicados (no drafts), ordenados por fecha desc.
 * Calcula readingTime automáticamente.
 */
export function getAnalisis(): Analisis[] {
  const items = readMDXFiles<AnalisisFrontmatter>("analisis");

  return items
    .filter((item) => !item.frontmatter.draft)
    .map((item) => ({
      ...item,
      frontmatter: {
        ...item.frontmatter,
        readingTime: Math.ceil(readingTime(item.content).minutes),
      },
    }))
    .sort((a, b) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime());
}

/**
 * Obtiene un análisis individual por slug.
 */
export function getAnalisisBySlug(slug: string): Analisis | null {
  const items = getAnalisis();
  return items.find((item) => item.slug === slug) ?? null;
}

/**
 * Obtiene todos los slugs de análisis (para generateStaticParams).
 */
export function getAnalisisSlugs(): string[] {
  return getAnalisis().map((item) => item.slug);
}

/**
 * Obtiene todas las entradas del changelog, ordenadas por fecha desc.
 */
export function getChangelog(): ChangelogEntry[] {
  const items = readMDXFiles<ChangelogFrontmatter>("changelog");

  return items.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Lee un archivo JSON de datos desde src/data/.
 */
export function readDataFile<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "src", "data", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
