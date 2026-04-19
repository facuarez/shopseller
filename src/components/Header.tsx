import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import ToolsDropdown from "./ToolsDropdown";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg text-text hover:text-accent transition-colors tracking-tight shrink-0">
          <span className="text-accent font-bold">Shop</span>Seller
        </Link>

        {/* Nav desktop — pegado a la izquierda */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          <Link href="/" className="px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-bg-secondary rounded-lg transition-all font-medium">
            Inicio
          </Link>
          <ToolsDropdown />
          <Link href="/afiliados" className="px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-bg-secondary rounded-lg transition-all font-medium">
            Afiliados
          </Link>
          <Link href="/datos" className="px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-bg-secondary rounded-lg transition-all font-medium">
            Datos
          </Link>
          <Link href="/analisis" className="px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-bg-secondary rounded-lg transition-all font-medium">
            Análisis
          </Link>
          <Link href="/changelog" className="px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-bg-secondary rounded-lg transition-all font-medium">
            Changelog
          </Link>
        </nav>

        {/* CTA Diagnóstico — destacado */}
        <Link href="/consultoria" className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-accent border border-accent/30 rounded-lg hover:bg-accent hover:text-white transition-all">
          Diagnóstico 1-1
          <span className="text-[10px] font-data opacity-70">499€</span>
        </Link>

        {/* Actions — derecha */}
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
