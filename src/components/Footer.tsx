import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          {/* Marca */}
          <div>
            <p className="font-semibold text-text mb-2">nuevositio</p>
            <p className="text-text-secondary leading-relaxed">
              TikTok Shop Europa para vendedores que operan de verdad.
            </p>
          </div>

          {/* Secciones */}
          <div>
            <p className="font-semibold text-text mb-2">Secciones</p>
            <nav className="flex flex-col gap-1.5">
              <Link href="/herramientas" className="text-text-secondary hover:text-text transition-colors">
                Herramientas
              </Link>
              <Link href="/datos" className="text-text-secondary hover:text-text transition-colors">
                Datos
              </Link>
              <Link href="/analisis" className="text-text-secondary hover:text-text transition-colors">
                Analisis
              </Link>
              <Link href="/changelog" className="text-text-secondary hover:text-text transition-colors">
                Changelog
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="font-semibold text-text mb-2">Info</p>
            <nav className="flex flex-col gap-1.5">
              <Link href="/sobre-mi" className="text-text-secondary hover:text-text transition-colors">
                Sobre mi
              </Link>
              <Link href="/analisis/rss.xml" className="text-text-secondary hover:text-text transition-colors">
                RSS Feed
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-xs text-text-secondary text-center">
          &copy; {new Date().getFullYear()} nuevositio. Hecho por un vendedor para vendedores.
        </div>
      </div>
    </footer>
  );
}
