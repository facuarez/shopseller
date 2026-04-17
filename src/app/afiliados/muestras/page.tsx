import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo pedir muestras gratis en TikTok Shop: guía para afiliados nuevos",
  description: "Cómo conseguir muestras gratis en TikTok Shop cuando sos afiliado nuevo sin historial. Plantilla de mensaje, qué mira el seller, y cómo romper el círculo vicioso sin seguidores ni ventas previas.",
  keywords: [
    "como pedir muestras gratis tiktok shop",
    "muestras tiktok shop afiliados nuevos",
    "mensaje solicitud muestra tiktok shop",
    "tiktok shop afiliado sin historial",
    "muestras reembolsables tiktok shop",
    "pedir producto gratis tiktok shop",
    "afiliado tiktok shop empezar sin ventas",
    "como conseguir muestras tiktok shop",
  ],
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

        <h2>El círculo vicioso del afiliado nuevo</h2>
        <p>Si estás intentando arrancar como afiliado en TikTok Shop Europa y todavía no tenés ventas, probablemente te chocaste con este problema: los sellers no te mandan muestras porque no tenés historial, y sin muestras es difícil generar contenido con el que construir ese historial.</p>
        <p>Es el círculo vicioso clásico de los afiliados nuevos. En las próximas secciones te explico cómo salir de él, qué criterios usamos los sellers para elegir a quién mandarle producto, y cómo redactar un mensaje de solicitud que realmente convierte.</p>

        <h2>Qué mira un seller cuando recibe una solicitud de muestra</h2>
        <p>Antes de escribir un solo mensaje, tenés que entender desde qué lado está mirando el seller. Un vendedor en TikTok Shop tiene un objetivo muy claro: <strong>facturación</strong>. No le importa tu contenido per se — le importa si tu contenido va a generar ventas.</p>
        <p>Cuando llega una solicitud de muestra, el seller revisa esto en este orden:</p>
        <ol>
          <li><strong>Tasa de publicación.</strong> ¿Qué porcentaje de las muestras que pediste en el pasado resultaron en un video publicado? Los sellers priorizamos afiliados con una tasa por encima del 90%. Si pediste 10 muestras y publicaste 3 videos, eso se nota.</li>
          <li><strong>Seguidores y engagement.</strong> Un perfil con 20.000 seguidores reales vale más que uno con 200.000 comprados. Lo que el seller busca es potencial de alcance orgánico real.</li>
          <li><strong>Historial de ventas en TTS.</strong> Si ya vendiste aunque sea 5 unidades de otro producto como afiliado, eso pesa muchísimo. Le dice al seller que no sos un coleccionista de muestras gratis.</li>
          <li><strong>Calidad del perfil y nicho.</strong> Un perfil coherente con el producto que estás pidiendo genera más confianza que uno genérico.</li>
        </ol>
        <p>El problema del afiliado nuevo: si ninguna de estas métricas te favorece todavía, el mensaje que mandás es tu única carta. Tiene que compensar lo que los números todavía no dicen.</p>

        <h2>Cómo pedir muestras gratis (paso a paso)</h2>
        <ol>
          <li><strong>Entrá al TikTok Shop Creator Center</strong> desde la app</li>
          <li><strong>Buscá productos</strong> que te interesen por categoría</li>
          <li><strong>Fijate si el seller ofrece muestras</strong> — aparece un ícono de &quot;muestra disponible&quot; en el listing</li>
          <li><strong>Hacé click en &quot;Solicitar muestra&quot;</strong> y escribí un mensaje personalizado</li>
          <li><strong>Esperá la aprobación</strong> — el seller revisa tu perfil y decide</li>
          <li><strong>Recibí el producto</strong> y publicá contenido dentro del plazo establecido</li>
        </ol>

        <h2>La propuesta que funciona: 5 videos, 5 ángulos, 1 vivo</h2>
        <p>En lugar de pedir una muestra genérica, llegá con una propuesta concreta. Los sellers recibimos decenas de solicitudes vagas del tipo &quot;me gustaría colaborar contigo&quot;. Lo que diferencia a los afiliados que obtienen muestras es que llegan con un plan específico.</p>
        <p>La estructura que recomiendo es esta:</p>
        <ul>
          <li><strong>5 videos de contenido en un plazo de 30 días:</strong> unboxing, uso real, comparativa, antes/después, respuesta a comentarios.</li>
          <li><strong>5 ángulos distintos del producto:</strong> cada video ataca una objeción o beneficio diferente para cubrir distintas intenciones de búsqueda dentro de TikTok.</li>
          <li><strong>1 video en vivo (TikTok Live)</strong> mencionando el producto dentro de los primeros 15 días.</li>
          <li><strong>Disponibilidad del producto</strong> para futuros ángulos de contenido, sin necesidad de nuevas muestras cada vez.</li>
        </ul>
        <p>Esto le muestra al seller que pensaste en su producto, que no querés un regalo sino una colaboración, y que vas a sacarle el máximo partido a una sola unidad.</p>

        <h2>Plantilla de mensaje para afiliados nuevos</h2>
        <p>Si sos nuevo y tus números no hablan por vos, el mensaje tiene que hacer dos cosas: <strong>generar confianza</strong> y <strong>demostrar que entendés el producto</strong>. Evitá los mensajes genéricos que claramente son copy-paste.</p>

        <div className="not-prose my-6 p-6 rounded-xl border-2 border-accent/20 bg-accent/5">
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Plantilla — copiá, personalizá</p>
          <div className="text-sm text-text leading-relaxed space-y-3 font-mono whitespace-pre-wrap">{`Hola [Nombre del seller / marca],

Me llamo [Tu nombre], soy creador de contenido enfocado en [nicho: hogar / cocina / fitness / etc.] con [X seguidores en TikTok].

Vi tu producto [nombre del producto] y me parece que encaja muy bien con mi audiencia, especialmente por [beneficio concreto del producto que hayas investigado].

Mi propuesta es concreta: a cambio de una muestra, me comprometo a publicar 5 videos en 30 días desde distintos ángulos (unboxing, uso real, comparativa) más un mencionado en vivo. El producto quedaría disponible para seguir generando contenido sin necesidad de nuevas unidades.

Entiendo que como afiliado nuevo mis métricas son limitadas, por eso prefiero que juzgues esta propuesta por lo específica que es y no por los números. Podés ver mi perfil en [link a tu cuenta TikTok].

¿Te interesa que lo exploremos?

[Tu nombre]`}</div>
        </div>

        <p><strong>Clave:</strong> mencioná siempre algo específico del producto. Eso demuestra que lo investigaste y que no estás mandando el mismo mensaje a 50 sellers distintos. Un seller lo nota inmediatamente.</p>

        <h2>Qué esperan los sellers de vos</h2>
        <p>Esto es lo que yo como vendedor espero cuando apruebo una muestra:</p>
        <ul>
          <li><strong>Que publiques al menos 1 video</strong> dentro de 7-14 días de recibir el producto</li>
          <li><strong>Que el video sea original</strong> — no un slideshow de fotos del listing</li>
          <li><strong>Que muestres el producto en uso real</strong> — unboxing, demo, before/after</li>
          <li><strong>Que seas honesto</strong> — si algo no te gusta, decilo. Preferimos una reseña honesta que una falsa</li>
        </ul>
        <p>Lo que NO esperamos (pero agradecemos): que el video se vuelva viral. Lo que sí esperamos: que hagas un esfuerzo genuino.</p>

        <h2>Si no te aprueban: comprate tu primera muestra (low ticket)</h2>
        <p>Hay sellers que directamente no mandan muestras a afiliados sin historial, sin importar qué tan buena sea tu propuesta. Para esos casos, la alternativa más inteligente es <strong>comprarte el producto vos mismo y recuperar la inversión con las primeras ventas</strong>.</p>
        <p>La lógica es simple: si el producto cuesta 8-12 euros y tu comisión de afiliado es del 15-20%, necesitás entre 4 y 6 ventas para recuperar el costo de la muestra. Con un producto bien elegido, eso puede pasar en la primera semana.</p>

        <h3>Criterios para elegir tu primera muestra comprada</h3>
        <ul>
          <li><strong>Precio bajo.</strong> Nada por encima de 15 euros. Querés minimizar el riesgo de la inversión inicial.</li>
          <li><strong>Ticket bajo, volumen alto.</strong> Preferís vender 20 unidades a 9 euros cada una que 3 unidades a 60 euros. El volumen construye tu historial y posiciona tu perfil.</li>
          <li><strong>Producto con demanda probada.</strong> Antes de comprar, fijate si hay otros afiliados que ya lo estén vendiendo. Si existen videos con tracción, hay mercado. No necesitás ser el primero — necesitás ser consistente.</li>
          <li><strong>Evitá productos caros al inicio.</strong> No arranques con electrónica o artículos de más de 30 euros. Un video que no convierte con un producto caro no genera ventas; con un producto low ticket, al menos genera tráfico y señales para el algoritmo.</li>
        </ul>

        <h2>Por qué tu primer objetivo no es facturar, es posicionar tu perfil</h2>
        <p>Este es el error más común de los afiliados nuevos: querer empezar con productos caros porque la comisión absoluta es mayor. La lógica es incorrecta.</p>
        <p>TikTok Shop evalúa tu perfil de afiliado por la <strong>cantidad de ventas cerradas</strong>, no por la facturación total. Un perfil con 40 ventas de productos de 10 euros tiene más peso algorítmico y más credibilidad frente a sellers que uno con 4 ventas de productos de 100 euros.</p>
        <p>El objetivo de las primeras semanas es acumular ventas, subir tu tasa de conversión como afiliado, y construir el historial que va a hacer que los sellers más interesantes te digan que sí automáticamente.</p>
        <p>Una vez que tenés ese historial, las muestras llegan solas.</p>

        <h2>Proceso paso a paso para romper el círculo vicioso</h2>
        <ol>
          <li>Identificá 3-5 productos low ticket en TTS Europa que encajen con tu nicho.</li>
          <li>Para cada uno, mandá un mensaje personalizado con la propuesta de 5 videos + vivo.</li>
          <li>Si no te responden o te rechazan, comprá la muestra vos. Recuperás la inversión en pocas ventas.</li>
          <li>Publicá con constancia: 5 videos en 30 días por producto, distintos ángulos. <Link href="/afiliados/cuantos-videos" className="text-accent">Ver por qué volumen &gt; calidad →</Link></li>
          <li>Documentá tu tasa de publicación. Es lo primero que te van a pedir los sellers más grandes.</li>
          <li>Con 10-15 ventas acumuladas, volvé a contactar sellers más grandes con datos reales.</li>
        </ol>

        <p className="italic text-text-secondary mt-6">El círculo vicioso &quot;sin historial no hay muestras, sin muestras no hay historial&quot; se rompe siendo específico en tu propuesta y eligiendo bien el primer producto. No hace falta tener 50.000 seguidores para que un seller confíe en vos — hace falta demostrar que sabés lo que estás haciendo.</p>

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
