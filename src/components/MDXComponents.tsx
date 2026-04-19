import type { MDXComponents } from "mdx/types";
import Stat from "./mdx/Stat";
import StatsGrid from "./mdx/StatsGrid";
import Callout from "./mdx/Callout";
import Quote from "./mdx/Quote";
import Breakdown from "./mdx/Breakdown";
import Process from "./mdx/Process";
import BeforeAfter from "./mdx/BeforeAfter";
import Summary from "./mdx/Summary";
import Chart from "./mdx/Chart";

/**
 * Componentes disponibles dentro de los archivos MDX.
 *
 * Componentes tipográficos (HTML overrides): h2, h3, p, a, ul, ol, li, blockquote, code, pre, table
 *
 * Componentes custom para artículos enriquecidos:
 *   - <Summary>...</Summary> — TL;DR al inicio del artículo
 *   - <Stat value="17%" label="Margen" accent /> — número destacado inline
 *   - <StatsGrid stats={[...]} /> — grid de 2-4 métricas
 *   - <Callout type="insight" title="...">...</Callout> — box destacado
 *   - <Quote author="Facu">...</Quote> — pullquote grande
 *   - <Breakdown items={[...]} total={{...}} /> — desglose con barras
 *   - <Process steps={[...]} /> — timeline numerado vertical
 *   - <BeforeAfter before={...} after={...} /> — comparativa 2 cols
 *   - <Chart type="line|bar|pie" data={[...]} /> — gráfico Recharts
 */
const components: MDXComponents = {
  // HTML overrides (estilos prose)
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  p: (props) => <p {...props} />,
  a: (props) => <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
  table: (props) => <div className="overflow-x-auto"><table {...props} /></div>,

  // Componentes custom
  Summary,
  Stat,
  StatsGrid,
  Callout,
  Quote,
  Breakdown,
  Process,
  BeforeAfter,
  Chart,
};

export default components;
