import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/herramientas", label: "Herramientas" },
  { href: "/datos", label: "Datos" },
  { href: "/analisis", label: "Analisis" },
  { href: "/changelog", label: "Changelog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg text-text hover:text-accent transition-colors">
          nuevositio
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
