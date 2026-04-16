import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ser afiliado TikTok Shop en varios países EU al mismo tiempo",
  description: "Cómo operar como afiliado de TikTok Shop en España, Francia, Italia y Alemania al mismo tiempo. Nadie habla de esto en español.",
};

export default function MultipaisPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/afiliados" className="text-xs text-accent hover:text-accent-hover transition-colors mb-4 inline-block">&larr; Volver a Afiliados</Link>

      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-medium mb-4">Estrategia avanzada</div>

      <h1 className="text-3xl font-bold text-text mb-3">Ser afiliado en ES + FR + IT + DE al mismo tiempo</h1>
      <p className="text-lg text-text-secondary mb-8">Nadie habla de esto en español. Cómo multiplicar tus ingresos como afiliado operando en varios mercados EU de TikTok Shop.</p>

      <div className="prose max-w-none">
        <h2>Por qué multi-país</h2>
        <p>TikTok Shop opera en 5 países de la UE (España, Francia, Alemania, Italia, Irlanda) más UK. La mayoría de afiliados en español solo operan en España. Pero los productos que venden los sellers en TTS están disponibles en todos los países EU al mismo tiempo — el mismo listing, el mismo seller.</p>
        <p>Esto significa que si un producto se vende bien en España, probablemente se venda bien en Francia o Italia. Y vos podés promocionarlo en esos mercados sin que el seller tenga que hacer nada diferente.</p>

        <h2>Cómo funciona técnicamente</h2>
        <p>Tu cuenta de TikTok no está limitada a un país. Si publicás un video en español, TikTok lo muestra principalmente a audiencia hispanohablante. Pero si publicás en francés o italiano, llega a esas audiencias.</p>
        <p>El punto clave: <strong>no necesitás hablar el idioma perfectamente.</strong> Los videos de demostración de productos funcionan con poco texto. Un before/after de un producto de limpieza se entiende en cualquier idioma. Podés usar subtítulos automáticos o texto en pantalla en el idioma del mercado.</p>

        <h2>Estrategias que funcionan</h2>

        <h3>1. Una cuenta, múltiples idiomas</h3>
        <p>Publicás videos en español e intercalás videos en francés o italiano. TikTok va a mostrar cada video a la audiencia correcta. Ventaja: una sola cuenta, un solo perfil. Desventaja: puede confundir al algoritmo si mezclás demasiados idiomas.</p>

        <h3>2. Una cuenta por idioma</h3>
        <p>Creás una cuenta para ES, otra para FR, otra para IT. Cada una publica en su idioma. Ventaja: algoritmo claro, audiencia segmentada. Desventaja: más gestión, más contenido que producir.</p>

        <h3>3. Contenido universal con texto localizado</h3>
        <p>Grabás el video una vez (sin hablar o con música) y le ponés texto en pantalla en cada idioma. Publicás el mismo video con diferentes textos en cada cuenta o en la misma. Es la forma más eficiente de escalar.</p>

        <h2>Números: por qué vale la pena</h2>

        <div className="not-prose my-6 p-5 rounded-xl border-2 border-border bg-card-bg">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Ejemplo: mismo producto en 3 mercados</p>
          <div className="space-y-2 font-data text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">🇪🇸 España (5 ventas/video)</span><span className="text-text font-semibold">15,00 €/video</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">🇫🇷 Francia (3 ventas/video)</span><span className="text-text font-semibold">9,00 €/video</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">🇮🇹 Italia (2 ventas/video)</span><span className="text-text font-semibold">6,00 €/video</span></div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between"><span className="text-text font-semibold">Total por video (3 mercados)</span><span className="text-accent font-bold">30,00 €</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">vs solo España</span><span className="text-text-secondary">15,00 €</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Incremento</span><span className="text-green-600 dark:text-green-400 font-bold">+100%</span></div>
            </div>
          </div>
        </div>

        <h2>Qué mercados priorizar</h2>
        <ul>
          <li><strong>Francia 🇫🇷</strong> — segundo mercado más activo después de España. Si hablás algo de francés o podés usar subtítulos, empezá acá.</li>
          <li><strong>Italia 🇮🇹</strong> — buena adopción en belleza y moda. El italiano es relativamente fácil de leer para hispanohablantes.</li>
          <li><strong>Alemania 🇩🇪</strong> — mercado grande pero el idioma es barrera. Funciona mejor con contenido visual sin voz.</li>
          <li><strong>Irlanda 🇮🇪</strong> — mercado pequeño pero en inglés, accesible si manejás el idioma.</li>
          <li><strong>UK 🇬🇧</strong> — el más maduro. Mucha competencia entre afiliados pero también mucho volumen.</li>
        </ul>

        <h2>Consideraciones fiscales</h2>
        <p>Las comisiones de afiliado se pagan desde la entidad de TikTok del país donde se hizo la venta. Consultá con tu asesor fiscal sobre cómo declarar ingresos de múltiples países EU. En general, si operás como autónomo en España, declarás todos los ingresos en España independientemente del país de origen de la venta.</p>

        <p>Usá la <Link href="/afiliados/calculadora-ganancias" className="text-accent">calculadora de ganancias</Link> para proyectar cuánto podrías ganar sumando mercados.</p>
      </div>
    </div>
  );
}
