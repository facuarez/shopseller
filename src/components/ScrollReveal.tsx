"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Delay en ms antes de animar (para stagger entre cards) */
  delay?: number;
  /** Direccion desde donde entra. Default: "up" */
  from?: "up" | "left" | "right";
}

/**
 * Wrapper que anima su contenido al entrar en viewport.
 * Usa IntersectionObserver nativo — 0 dependencias.
 * Respeta prefers-reduced-motion: si el usuario prefiere sin movimiento, el contenido aparece directo.
 */
export default function ScrollReveal({ children, className = "", delay = 0, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respetar preferencia de usuario
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) translateX(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initialTransform = {
    up: "translateY(24px)",
    left: "translateX(-24px)",
    right: "translateX(24px)",
  }[from];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
}
