import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Muestras gratis TikTok Shop: cómo funcionan de verdad",
  description: "Muestras gratis vs reembolsables en TTS. Cómo pedirlas, qué esperan los sellers, cuánto invertir, y cálculo de ROI real. Desde el lado vendedor.",
};

export default function MuestrasPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/afiliados" className="text-xs text-accent hover:text-accent-hover transition-colors mb-4 inline-block">&larr; Volver a Afiliados</Link>

      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-medium mb-4">Guía</div>

      <h1 className="text-3xl font-bold text-text mb-3">Muestras en TikTok Shop: cómo funcionan de verdad</h1>
      <p className="text-lg text-text-secondary mb-8">Todo lo que necesitás saber sobre muestras gratis y reembolsables en TTS. Desde la perspectiva de un vendedor que las gestiona.</p>

      <div className="prose max-w-none">
        <h2>Tipos de muestras en TikTok Shop</h2>
        <p>TTS tiene dos mecanismos para que los afiliados consigan productos para reseñar:</p>

        <h3>Muestras gratis (Free Samples)</h3>
        <p>El seller envía el producto sin costo para el afiliado. No hay que devolver nada. El vendedor asume el 100% del riesgo: paga el producto, paga el envío, y espera que el creador publique contenido.</p>
        <p><strong>Desde el lado vendedor:</strong> enviamos muestras gratis porque es la forma más efectiva de activar afiliados. Pero es caro. Si el producto cuesta 10€ y el envío 3.50€, cada muestra nos sale 13.50€. De cada 10 muestras enviadas, 3-4 creadores publican video. El coste real por video publicado es de 33-45€.</p>

        <h3>Muestras reembolsables</h3>
        <p>El afiliado compra el producto a precio completo. Si publica un video que cumple los requisitos (mínimo de views, duración, etc.), TikTok le reembolsa el precio del producto. El seller no paga nada — es TikTok quien financia el reembolso como incentivo.</p>
        <p><strong>Ventaja para el afiliado:</strong> podés acceder a productos sin depender de que un seller te apruebe. Si el producto cuesta 20€ y después te reembolsan, tu inversión neta es 0€ (salvo que no cumplas los requisitos).</p>

        <h2>Cómo pedir muestras gratis (paso a paso)</h2>
        <ol>
          <li><strong>Entrá al TikTok Shop Creator Center</strong> desde la app</li>
          <li><strong>Buscá productos</strong> que te interesen por categoría</li>
          <li><strong>Fijate si el seller ofrece muestras</strong> — aparece un ícono de &quot;muestra disponible&quot; en el listing</li>
          <li><strong>Hacé click en &quot;Solicitar muestra&quot;</strong> y escribí un mensaje personalizado</li>
          <li><strong>Esperá la aprobación</strong> — el seller revisa tu perfil y decide</li>
          <li><strong>Recibí el producto</strong> y publicá contenido dentro del plazo establecido</li>
        </ol>

        <h2>Qué esperan los sellers de vos</h2>
        <p>Esto es lo que yo como vendedor espero cuando apruebo una muestra:</p>
        <ul>
          <li><strong>Que publiques al menos 1 video</strong> dentro de 7-14 días de recibir el producto</li>
          <li><strong>Que el video sea original</strong> — no un slideshow de fotos del listing</li>
          <li><strong>Que muestres el producto en uso real</strong> — unboxing, demo, before/after</li>
          <li><strong>Que seas honesto</strong> — si algo no te gusta, decilo. Preferimos una reseña honesta que una falsa</li>
        </ul>
        <p>Lo que NO esperamos (pero agradecemos): que el video se vuelva viral. Lo que sí esperamos: que hagas un esfuerzo genuino.</p>

        <h2>Cálculo de ROI de muestras</h2>
        <p>Si vas a invertir tu tiempo en pedir muestras, hacé el cálculo:</p>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-border bg-card-bg">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Ejemplo con muestras reembolsables</p>
          <div className="space-y-2 font-data text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Precio producto</span><span className="text-text font-semibold">20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Reembolso (si publicás)</span><span className="text-green-600 dark:text-green-400 font-semibold">-20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Tu inversión neta</span><span className="text-text font-bold">0,00 €</span></div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between"><span className="text-text-secondary">Si el video genera 5 ventas × 20€ × 15%</span><span className="text-accent font-bold">+15,00 €</span></div>
            </div>
          </div>
        </div>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-border bg-card-bg">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Ejemplo con muestras gratis</p>
          <div className="space-y-2 font-data text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Tu inversión</span><span className="text-text font-semibold">0,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Tu tiempo (grabar, editar, publicar)</span><span className="text-text-secondary">~2 horas</span></div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between"><span className="text-text-secondary">Si genera 10 ventas × 25€ × 15%</span><span className="text-accent font-bold">+37,50 €</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Ganancia por hora de trabajo</span><span className="text-accent font-bold">~18,75 €/h</span></div>
            </div>
          </div>
        </div>

        <h2>Cuántas muestras pedir por mes</h2>
        <p>Recomendación basada en lo que veo funcionar:</p>
        <ul>
          <li><strong>Si estás empezando:</strong> 3-5 muestras por semana. Focalizate en una categoría.</li>
          <li><strong>Si ya tenés tracción:</strong> 5-10 muestras por semana. Diversificá entre categorías que te funcionan.</li>
          <li><strong>Si sos top performer:</strong> los sellers te van a contactar a vos. Elegí los mejores y negociá comisiones más altas.</li>
        </ul>

        <p>Recordá: cada muestra que pedís y no publicas te quema reputación con ese seller. Es mejor pedir menos y cumplir siempre.</p>
      </div>
    </div>
  );
}
