// Utility helpers reutilizables

/**
 * cn — combina clases CSS condicionalmente.
 * Versión simple sin dependencia de clsx/tailwind-merge.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formatea una fecha ISO a formato legible en español.
 * "2026-04-16" → "16 de abril de 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formatea una fecha ISO a formato corto.
 * "2026-04-16" → "16 abr 2026"
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Genera un slug URL-safe desde un string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Trunca texto a N caracteres con "..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * URL base del sitio — cambiar cuando se elija dominio definitivo.
 */
export const SITE_URL = "https://ttsseller.com";
export const SITE_NAME = "TTS Seller";
export const SITE_DESCRIPTION =
  "TikTok Shop Europa para vendedores que operan de verdad. Herramientas, datos y analisis.";
