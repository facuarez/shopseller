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

        <h3>Muestras reembolsables (Cost Refund)</h3>
        <p>El afiliado compra el producto a precio completo. El reembolso no depende solo de publicar el video — depende de <strong>generar ventas</strong>. El seller configura cuántas ventas necesitás para recuperar tu inversión, con opciones típicas de <strong>1, 2 o 3 ventas</strong>.</p>
        <p>Esto es clave entenderlo: no es "publico video → me devuelven el dinero". Es "publico video → si genera X ventas, me reembolsan". Si no generás las ventas mínimas, perdés el precio del producto.</p>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-border bg-card-bg">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Configuraciones típicas de reembolso</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold font-data">1</span>
              <div>
                <p className="font-semibold text-text">Reembolso a 1 venta</p>
                <p className="text-text-secondary text-xs leading-relaxed">Facilísimo de cumplir. Producto probablemente barato o nuevo en el catálogo del seller, que necesita activación.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-xs font-bold font-data">2</span>
              <div>
                <p className="font-semibold text-text">Reembolso a 2 ventas</p>
                <p className="text-text-secondary text-xs leading-relaxed">Lo más común. Seller busca contenido que convierta, no videos sueltos. Exige que valides que el producto te funciona.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold font-data">3</span>
              <div>
                <p className="font-semibold text-text">Reembolso a 3 ventas (o más)</p>
                <p className="text-text-secondary text-xs leading-relaxed">Seller exigente o producto de ticket alto. Solo te conviene si tenés audiencia probada o el producto es muy vendible.</p>
              </div>
            </div>
          </div>
        </div>

        <p><strong>Ventaja para el afiliado:</strong> podés acceder a productos sin depender de que un seller te apruebe una muestra gratis. Si el producto cuesta 20€ y generás las ventas mínimas, tu inversión neta es 0€ + las comisiones que hayas ganado.</p>
        <p><strong>Riesgo:</strong> si el producto no convierte, perdés el precio del producto. Por eso es crítico elegir bien antes de invertir.</p>

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

        <h2>Cálculo de ROI de muestras reembolsables</h2>
        <p>El cálculo cambia según cuántas ventas te exige el seller para reembolsar. Mirá los tres escenarios con un producto de 20€ y 15% de comisión:</p>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-green-500/20 bg-green-500/5">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">Escenario A — Reembolso a 1 venta (fácil)</p>
          <div className="space-y-2 font-data text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Inversión inicial</span><span className="text-text font-semibold">20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Generás 1 venta → te reembolsan</span><span className="text-green-600 dark:text-green-400 font-semibold">-20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Comisión de esa venta (15%)</span><span className="text-accent font-semibold">+3,00 €</span></div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between"><span className="text-text-secondary">Si el video genera 5 ventas totales</span><span className="text-text-secondary">—</span></div>
              <div className="flex justify-between"><span className="text-text font-semibold">Ganancia neta</span><span className="text-accent font-bold">+15,00 €</span></div>
            </div>
          </div>
        </div>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5">
          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider mb-3">Escenario B — Reembolso a 2 ventas (común)</p>
          <div className="space-y-2 font-data text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Inversión inicial</span><span className="text-text font-semibold">20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Si generás solo 1 venta</span><span className="text-red-500 font-semibold">sin reembolso · -20€</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Si generás 2 ventas → reembolso</span><span className="text-green-600 dark:text-green-400 font-semibold">-20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Comisiones de 2 ventas (15%)</span><span className="text-accent font-semibold">+6,00 €</span></div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between"><span className="text-text-secondary">Si el video genera 5 ventas totales</span><span className="text-text-secondary">—</span></div>
              <div className="flex justify-between"><span className="text-text font-semibold">Ganancia neta</span><span className="text-accent font-bold">+15,00 €</span></div>
            </div>
          </div>
        </div>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-red-500/20 bg-red-500/5">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wider mb-3">Escenario C — Reembolso a 3 ventas (exigente)</p>
          <div className="space-y-2 font-data text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Inversión inicial</span><span className="text-text font-semibold">20,00 €</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Si generás menos de 3 ventas</span><span className="text-red-500 font-semibold">sin reembolso · -20€</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Si generás 3+ ventas → reembolso</span><span className="text-green-600 dark:text-green-400 font-semibold">-20,00 €</span></div>
            <div className="border-t border-border pt-2 mt-2">
              <p className="text-xs text-text-secondary">Solo te conviene si tu audiencia probada convierte bien. Si no tenés historial, el riesgo es alto.</p>
            </div>
          </div>
        </div>

        <h3>Cómo elegir qué muestras reembolsables pedir</h3>
        <p>Tres criterios antes de invertir:</p>
        <ul>
          <li><strong>El umbral de ventas:</strong> si estás empezando, solo aceptá muestras con reembolso a 1 o máximo 2 ventas.</li>
          <li><strong>El producto:</strong> tiene que ser algo que tu audiencia realmente compraría. No importa si el producto es genial — si no le interesa a tu gente, no vende.</li>
          <li><strong>El precio:</strong> cuanto más caro el producto, más riesgo asumís si no convierte. Para empezar, quedate con productos de 10-20€.</li>
        </ul>

        <h2>ROI de muestras gratis</h2>

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

        <p>Las muestras gratis siempre tienen ROI positivo (tu inversión es solo tiempo). El problema es que son más difíciles de conseguir: el seller aprueba pocas, y solo si tu perfil le cierra. Por eso muchos afiliados combinan ambas estrategias.</p>

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
