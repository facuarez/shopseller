import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-bg-secondary">
      {/* Newsletter integrada */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="font-bold text-text mb-1">Novedades de TTS Europa en tu inbox</h3>
              <p className="text-sm text-text-secondary">Cambios en políticas, comisiones y herramientas. Sin spam.</p>
            </div>
            <div className="flex gap-2 max-w-sm w-full md:w-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                disabled
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-bg text-text-secondary cursor-not-allowed"
                aria-label="Email para newsletter"
              />
              <button disabled className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg opacity-50 cursor-not-allowed shrink-0">
                Suscribirme
              </button>
            </div>
          </div>
          <p className="text-[10px] text-text-secondary/50 mt-3 md:text-right">Próximamente.</p>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Marca */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-semibold text-text mb-2"><span className="text-accent">Shop</span>Seller</p>
            <p className="text-text-secondary leading-relaxed text-xs">
              TikTok Shop Europa para vendedores que operan de verdad.
            </p>
          </div>

          {/* Herramientas */}
          <div>
            <p className="font-semibold text-text mb-2 text-xs uppercase tracking-wider">Herramientas</p>
            <nav className="flex flex-col gap-1.5">
              <Link href="/herramientas/calculadora" className="text-text-secondary hover:text-text transition-colors text-xs">Calculadora</Link>
              <Link href="/herramientas/envios" className="text-text-secondary hover:text-text transition-colors text-xs">Envíos</Link>
              <Link href="/herramientas/afiliados" className="text-text-secondary hover:text-text transition-colors text-xs">Afiliados</Link>
            </nav>
          </div>

          {/* Afiliados */}
          <div>
            <p className="font-semibold text-text mb-2 text-xs uppercase tracking-wider">Afiliados</p>
            <nav className="flex flex-col gap-1.5">
              <Link href="/afiliados/como-empezar" className="text-text-secondary hover:text-text transition-colors text-xs">Cómo empezar</Link>
              <Link href="/afiliados/calculadora-ganancias" className="text-text-secondary hover:text-text transition-colors text-xs">Calculadora</Link>
              <Link href="/afiliados/muestras" className="text-text-secondary hover:text-text transition-colors text-xs">Muestras</Link>
            </nav>
          </div>

          {/* Contenido */}
          <div>
            <p className="font-semibold text-text mb-2 text-xs uppercase tracking-wider">Contenido</p>
            <nav className="flex flex-col gap-1.5">
              <Link href="/datos" className="text-text-secondary hover:text-text transition-colors text-xs">Datos</Link>
              <Link href="/analisis" className="text-text-secondary hover:text-text transition-colors text-xs">Análisis</Link>
              <Link href="/changelog" className="text-text-secondary hover:text-text transition-colors text-xs">Changelog</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="font-semibold text-text mb-2 text-xs uppercase tracking-wider">Info</p>
            <nav className="flex flex-col gap-1.5">
              <Link href="/sobre-mi" className="text-text-secondary hover:text-text transition-colors text-xs">Sobre mí</Link>
              <Link href="/analisis/rss.xml" className="text-text-secondary hover:text-text transition-colors text-xs">RSS Feed</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-5 text-[11px] text-text-secondary/60 text-center">
          &copy; {new Date().getFullYear()} ShopSeller. Hecho por un vendedor para vendedores.
        </div>
      </div>
    </footer>
  );
}
