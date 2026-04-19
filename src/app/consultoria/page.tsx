import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consultoría 1-1 para sellers de TikTok Shop Europa",
  description: "Sesión de consultoría personalizada con un operador real de TikTok Shop Europa. Para marcas evaluando entrar o sellers que necesitan optimizar. 499€.",
  keywords: [
    "consultoria tiktok shop españa",
    "asesoria tiktok shop",
    "mentor tiktok shop",
    "consultor tiktok shop europa",
    "ayuda vender tiktok shop",
  ],
};

export default function ConsultoriaPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#0A0A0A] border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent font-medium">Consultoría 1-1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
            Evaluá tu caso en TikTok Shop
            <br />
            <span className="text-accent">con un operador que opera hace años</span>
          </h1>
          <p className="text-lg text-[#999] max-w-2xl mb-6 leading-relaxed">
            Sesión de 60 minutos donde revisamos tu caso específico: si TTS encaja con tu producto,
            por qué tu operación actual no rinde, o cómo estructurar los primeros 90 días. Con datos,
            no con teoría.
          </p>
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-bold text-white font-data">499€</span>
            <span className="text-sm text-[#888]">por sesión · 60 min</span>
          </div>
          <a href="mailto:facu@shopseller.online?subject=Consultor%C3%ADa%20ShopSeller"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all shadow-lg shadow-accent/20">
            Reservar consultoría
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <p className="text-xs text-[#666] mt-3">Te respondo en 24h con disponibilidad y agenda.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* Para quién es */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-6 rounded-xl border-2 border-green-500/20 bg-green-500/5">
            <h2 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
              <span className="text-green-500">✓</span> Para vos si...
            </h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Estás evaluando entrar a TTS y querés validar si tu producto encaja antes de invertir miles de euros.</li>
              <li>Ya estás operando pero tu margen neto es bajo o negativo y no sabés qué está mal.</li>
              <li>Tenés tracción inicial y querés escalar con método, no adivinando.</li>
              <li>Tu operación de afiliados no genera ventas proporcionales a la inversión en muestras.</li>
              <li>No entendés de dónde vienen tus ventas (orgánico vs afiliado vs paid).</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border-2 border-red-500/20 bg-red-500/5">
            <h2 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
              <span className="text-red-500">✗</span> No es para vos si...
            </h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Esperás que una consulta te garantice resultados. Nada en ecommerce garantiza resultados.</li>
              <li>Todavía no registraste la cuenta. Esa parte es gratis y autoexplicativa.</li>
              <li>Tu producto claramente no encaja con TTS (ticket muy alto, no se demuestra visualmente).</li>
              <li>Buscás implementación. La consultoría te da claridad, la ejecución es tuya.</li>
              <li>Querés copiar la fórmula de otro. TTS no funciona así.</li>
            </ul>
          </div>
        </div>

        {/* Qué incluye */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-text mb-6">Qué incluye la consultoría</h2>
          <div className="space-y-4">
            {[
              {
                titulo: "60 minutos de llamada por Google Meet",
                desc: "No es una charla genérica. Llegamos con tu caso específico: datos actuales, producto, mercado objetivo, problemas concretos.",
              },
              {
                titulo: "Análisis previo de tu caso (30 min de mi tiempo)",
                desc: "Antes de la llamada te paso un formulario breve. Reviso tu operación, producto y mercado para llegar con un diagnóstico inicial ya armado.",
              },
              {
                titulo: "Documento de acción post-sesión",
                desc: "Dentro de 48h después de la llamada te envío un documento con las decisiones concretas, métricas a seguir, y próximos pasos ordenados por prioridad.",
              },
              {
                titulo: "Follow-up por email (2 semanas)",
                desc: "Durante los 14 días siguientes podés escribirme preguntas puntuales sobre implementación. Sin límite de emails.",
              },
            ].map((item) => (
              <div key={item.titulo} className="flex gap-4 p-4 rounded-xl border border-border bg-card-bg">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-text">{item.titulo}</p>
                  <p className="text-sm text-text-secondary mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-text mb-6">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: "1", t: "Escribime", d: "Mandá un email contando brevemente tu caso." },
              { n: "2", t: "Formulario", d: "Te paso un form con preguntas específicas. 10 min de completar." },
              { n: "3", t: "Llamada", d: "60 min por Meet, analizamos y decidimos." },
              { n: "4", t: "Documento", d: "Recibís el plan de acción en 48h + 2 semanas de email." },
            ].map((step) => (
              <div key={step.n} className="p-5 rounded-xl border border-border bg-card-bg">
                <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold font-data mb-3">{step.n}</div>
                <p className="font-bold text-text mb-1">{step.t}</p>
                <p className="text-xs text-text-secondary leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quién la hace */}
        <div className="mb-14 p-6 rounded-xl border border-border bg-card-bg">
          <h2 className="text-2xl font-bold text-text mb-3">Quién te va a asesorar</h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            Soy Facu, operador de TikTok Shop en una empresa europea de productos para el hogar basada en España.
            Llevo operando en TTS Europa desde las primeras etapas del lanzamiento en España, gestionando catálogo,
            afiliados, campañas GMV Max y logística de manera diaria.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            No soy consultor profesional ni vendo cursos. Lo que te comparto es experiencia operativa real: lo que
            funcionó, lo que falló, y las decisiones concretas que tomé ante situaciones similares a la tuya.
          </p>
          <Link href="/sobre-mi" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
            Más sobre mí →
          </Link>
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-text mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: "¿Por qué 499€?", a: "Refleja el valor de 2-3 meses de aprendizaje que te ahorrás tomando decisiones con información. No es un servicio masivo ni barato por diseño — quiero clientes que van a implementar, no a probar." },
              { q: "¿Puedo pedir reembolso?", a: "Si al terminar la llamada sentís que no te aportó valor concreto, te devuelvo el 100%. Preferís eso a tener un cliente insatisfecho." },
              { q: "¿Hacés consultorías en otros idiomas?", a: "Solo en español. El contenido operativo de TTS en España tiene particularidades que conozco bien. Otros mercados requieren perfiles con experiencia local específica." },
              { q: "¿Atendés a competidores directos de tu empresa?", a: "Si operás en la misma categoría y país que la empresa donde trabajo, te lo digo al principio y decidimos si tiene sentido avanzar. Transparencia total." },
              { q: "¿Hay descuentos para startups o early-stage?", a: "No. Pero si el caso es realmente interesante y estás en una etapa muy temprana, te invito a que me escribas y vemos opciones. Caso por caso." },
            ].map((item) => (
              <details key={item.q} className="group p-5 rounded-xl border border-border bg-card-bg">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-text">{item.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary group-open:rotate-180 transition-transform"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <p className="text-sm text-text-secondary leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="p-8 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/[0.02] text-center">
          <h2 className="text-2xl font-bold text-text mb-3">¿Listo para tener claridad?</h2>
          <p className="text-text-secondary max-w-lg mx-auto mb-6">
            Una llamada de 60 minutos puede ahorrarte meses de aprendizaje por error y miles de euros en decisiones mal calibradas.
          </p>
          <a href="mailto:facu@shopseller.online?subject=Consultor%C3%ADa%20ShopSeller"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all shadow-lg shadow-accent/20">
            Reservar por 499€
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <p className="text-xs text-text-secondary mt-3">facu@shopseller.online · Respuesta en 24h</p>
        </div>
      </div>
    </div>
  );
}
