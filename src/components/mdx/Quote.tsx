interface Props {
  children: React.ReactNode;
  author?: string;
}

/**
 * Pullquote grande destacado. Uso:
 * <Quote author="Facu">La traba no está en qué hacer, está en hacer.</Quote>
 */
export default function Quote({ children, author }: Props) {
  return (
    <blockquote className="not-prose my-8 p-6 rounded-2xl border-2 border-accent/20 bg-accent/[0.03]">
      <p className="text-xl sm:text-2xl font-bold text-text leading-snug italic">
        &quot;{children}&quot;
      </p>
      {author && (
        <footer className="mt-3 text-sm text-text-secondary not-italic">— {author}</footer>
      )}
    </blockquote>
  );
}
