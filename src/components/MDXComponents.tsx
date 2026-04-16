import type { MDXComponents } from "mdx/types";

/**
 * Componentes custom que se inyectan en el renderizado MDX.
 * Se pueden agregar componentes interactivos aquí (callouts, embeds, etc.)
 */
const components: MDXComponents = {
  // Override de elementos HTML para aplicar estilos prose
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
  // Componente custom: callout/nota
  Callout: ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) => {
    const styles = {
      info: "border-blue-500/30 bg-blue-500/5",
      warning: "border-yellow-500/30 bg-yellow-500/5",
      tip: "border-green-500/30 bg-green-500/5",
    };
    return (
      <div className={`border-l-4 ${styles[type]} p-4 rounded-r-md my-4`}>
        {children}
      </div>
    );
  },
};

export default components;
