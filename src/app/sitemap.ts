import type { MetadataRoute } from "next";
import { getAnalisis, getChangelog } from "@/lib/content";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const analisis = getAnalisis();
  const changelog = getChangelog();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/herramientas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/herramientas/calculadora`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/herramientas/envios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/datos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/datos/comisiones`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/datos/ivas-europa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/datos/herramientas-tts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/analisis`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/changelog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/sobre-mi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/afiliados`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/afiliados/calculadora-ganancias`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/afiliados/como-empezar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/afiliados/muestras`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/afiliados/multipais`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/afiliados/cuantos-videos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const analisisPages: MetadataRoute.Sitemap = analisis.map((item) => ({
    url: `${SITE_URL}/analisis/${item.slug}`,
    lastModified: new Date(item.frontmatter.updatedDate ?? item.frontmatter.pubDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // No incluir changelog entries individuales — se muestran en una sola pagina

  return [...staticPages, ...analisisPages];
}
