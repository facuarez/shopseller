"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/herramientas", label: "Herramientas" },
  { href: "/datos", label: "Datos" },
  { href: "/analisis", label: "Analisis" },
  { href: "/changelog", label: "Changelog" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:bg-bg-secondary transition-colors"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <nav className="absolute top-full left-0 right-0 bg-card-bg border-b border-border p-4 flex flex-col gap-3 z-50">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-text hover:text-accent transition-colors py-1 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
