import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de rentabilidad TTS",
  description: "Calcula margenes reales por producto en TikTok Shop Europa incluyendo comisiones, envio, IVA y costes ocultos.",
};

export default function CalculadoraPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Calculadora de rentabilidad</h1>
      <p className="text-text-secondary mb-8">
        Calcula el margen real de cada producto que vendes en TikTok Shop Europa.
      </p>

      {/* Placeholder — aqui se portara TTrack */}
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center mb-12">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <p className="text-text font-medium mb-1">Herramienta en integracion</p>
        <p className="text-sm text-text-secondary">
          La calculadora de rentabilidad TTrack se esta portando a este sitio. Proximamente disponible.
        </p>
      </div>

      {/* Explicacion */}
      <div className="prose max-w-none">
        <h2>Para que sirve esta calculadora</h2>
        <p>
          Vender en TikTok Shop Europa no es simplemente poner un precio y listo. Entre comisiones de la
          plataforma, costes de envio (que varian segun pais y carrier), IVA aplicable, coste del producto,
          packaging, y potenciales devoluciones, el margen real puede ser muy diferente al que imaginas.
        </p>
        <p>
          Esta calculadora toma en cuenta todos esos factores para darte el margen neto real por unidad vendida.
          No es un estimador generico: usa las comisiones reales de TTS por categoria, los costes de envio
          actualizados, y te permite ajustar cada variable segun tu situacion particular.
        </p>
        <h2>Que incluye</h2>
        <p>
          La calculadora te permite introducir el coste del producto (landed cost), seleccionar el pais de
          destino, la categoria de TTS aplicable, y el precio de venta. Con eso calcula automaticamente la
          comision TTS, el IVA, los costes de envio estimados, y te muestra el margen neto por unidad y el
          porcentaje de margen sobre el precio de venta.
        </p>
        <p>
          Tambien incluye campos opcionales para costes de packaging, tasa de devolucion estimada, y costes
          de ads si estas usando TikTok Ads para impulsar las ventas.
        </p>
      </div>
    </div>
  );
}
