# nuevositio

Sitio de referencia en español sobre TikTok Shop Europa para vendedores. Herramientas interactivas, datos actualizados, analisis y changelog de cambios en la plataforma.

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + MDX

## Setup local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura de carpetas

```
src/
├── app/                  # App Router — paginas y layouts
│   ├── herramientas/     # Hub + cada herramienta individual
│   ├── datos/            # Hub + comisiones, IVAs, directorio
│   ├── analisis/         # Listado + [slug] individual + RSS
│   ├── changelog/        # Cronologia con filtros
│   ├── sobre-mi/         # Pagina personal
│   └── og/               # OG image dinamica
├── components/           # Componentes reutilizables
├── content/              # Contenido MDX
│   ├── analisis/         # Articulos
│   └── changelog/        # Entradas del changelog
├── data/                 # JSON con datos estructurados
│   ├── comisiones-tts.json
│   ├── ivas-europa.json
│   ├── herramientas-tts.json
│   └── envios.json
├── lib/                  # Utilidades y helpers
└── types/                # Tipos TypeScript
```

## Como agregar contenido

### Nuevo articulo de analisis

1. Crear archivo `.mdx` en `src/content/analisis/` con nombre en slug format (ej: `mi-articulo.mdx`).
2. Agregar frontmatter requerido:

```yaml
---
title: "Titulo del articulo"
description: "Descripcion breve para SEO"
pubDate: "2026-04-20"
author: "Facu"
tags: ["tag1", "tag2"]
featured: false
draft: false
---
```

3. Escribir contenido en MDX debajo del frontmatter.
4. Si `draft: true`, el articulo no aparece en el sitio.
5. `readingTime` se calcula automaticamente.

### Nueva entrada de changelog

1. Crear archivo `.mdx` en `src/content/changelog/`.
2. Frontmatter requerido:

```yaml
---
date: "2026-04-20"
title: "Descripcion del cambio"
category: "politica" | "feature" | "comision" | "bug" | "expansion"
country: "ES" | "FR" | "IT" | "DE" | "IE" | "UK" | "all"
impact: "alto" | "medio" | "bajo"
---
```

3. Contenido opcional debajo del frontmatter (descripcion extendida).

### Agregar herramienta al directorio

Editar `src/data/herramientas-tts.json` y agregar un objeto al array `tools`:

```json
{
  "slug": "nombre-tool",
  "name": "Nombre Tool",
  "type": "analytics",
  "description": "Descripcion breve",
  "pricing": "freemium",
  "url": "https://...",
  "countries": ["ES", "FR"],
  "tags": ["research", "analytics"]
}
```

### Actualizar comisiones

Editar `src/data/comisiones-tts.json`. Cada pais tiene un array de categorias con nombre, comision (porcentaje), y notas.

## Deploy a Vercel

1. Push el repo a GitHub.
2. Importar en [vercel.com](https://vercel.com).
3. Framework preset: Next.js (se detecta automaticamente).
4. Build command: `npm run build`.
5. Deploy.

## TODO

- [ ] Elegir y comprar dominio definitivo
- [ ] Reemplazar "nuevositio" en todo el codigo por nombre real
- [ ] Portar TTrack como componente en `/herramientas/calculadora`
- [ ] Portar tabla de envios
- [ ] Completar `comisiones-tts.json` con datos reales por categoria
- [ ] Escribir `/sobre-mi`
- [ ] Configurar Plausible cuando haya trafico
- [ ] Escribir primeros 3 analisis reales
- [ ] Agregar 20 herramientas mas al directorio
- [ ] Decidir cuando activar newsletter (Buttondown / ConvertKit)
