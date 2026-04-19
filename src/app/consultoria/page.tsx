import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diagnóstico operativo 1-1 para sellers de TikTok Shop Europa",
  description: "Análisis profundo de tu operación TTS: producto, competencia, expectativas y plan de acción por escrito. 60 min de call + entregable completo a los 3 días. 499€.",
  keywords: [
    "consultoria tiktok shop españa",
    "auditoria tiktok shop",
    "diagnostico tiktok shop",
    "analisis competencia tiktok shop",
    "plan accion tiktok shop",
    "mentor tiktok shop europa",
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
            <span className="text-xs text-accent font-medium">Diagnóstico operativo 1-1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
            Análisis profundo de tu operación en <span className="whitespace-nowrap">TikTok&nbsp;Shop</span>
            <br />
            <span className="text-accent">por un operador con casi 500K€ facturados</span>
          </h1>
          <p className="text-lg text-[#999] max-w-2xl mb-4 leading-relaxed">
            No es una llamada de 1 hora y ya está. Es un análisis completo de tu caso:
            productos, competencia, mercado, operación actual, y un plan de acción por escrito que recibís
            a los 3 días. Con datos reales, no con teoría.
          </p>
          <p className="text-sm text-[#666] max-w-2xl mb-8 leading-relaxed">
            Operando TikTok Shop desde septiembre 2025 en una empresa de productos para el hogar en España.
            Cerca de 500.000€ facturados en 7 meses con visión diaria de afiliados, GMV Max, logística y márgenes reales.
          </p>
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-bold text-white font-data">499€</span>
            <span className="text-sm text-[#888]">pago único · sin retainer</span>
          </div>
          <a href="mailto:facu@shopseller.online?subject=Diagn%C3%B3stico%20operativo%20%E2%80%94%20Mi%20caso"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Escribime y charlamos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <p className="text-xs text-[#666] mt-3">Respondo yo directamente en 24h. Sin compromiso.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* Proceso visual timeline */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">El proceso</p>
          <h2 className="text-2xl font-bold text-text mb-8">Cómo funciona de principio a fin</h2>

          <div className="relative pl-8 border-l-2 border-border space-y-8">
            {/* Paso 1 */}
            <div className="relative">
              <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Día 0</span>
                <span className="text-[10px] text-text-secondary">· Reservá por email</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-1">Primer contacto</h3>
              <p className="text-sm text-text-secondary">Escribime contando brevemente tu caso. En 24h te respondo con agenda disponible y te mando un formulario estructurado para completar antes de la call.</p>
            </div>

            {/* Paso 2 */}
            <div className="relative">
              <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Días 1-2</span>
                <span className="text-[10px] text-text-secondary">· Completás el formulario</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-1">Formulario de diagnóstico inicial</h3>
              <p className="text-sm text-text-secondary mb-3">Te pido información concreta — no preguntas genéricas. El formulario cubre:</p>
              <ul className="text-sm text-text-secondary space-y-1 pl-4 list-disc marker:text-accent">
                <li>Tus 3-5 productos principales con enlaces, fotos, costes</li>
                <li>Tu operación actual (si ya estás vendiendo) o plan (si estás empezando)</li>
                <li>Datos de TTS Seller Center (si aplica): facturación, afiliados, CPA</li>
                <li>Competidores directos que ya identificaste</li>
                <li>Tus expectativas concretas: facturación objetivo, plazos, canales</li>
              </ul>
            </div>

            {/* Paso 3 */}
            <div className="relative">
              <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Días 2-4</span>
                <span className="text-[10px] text-text-secondary">· Análisis profundo (mi tiempo)</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-1">Research y análisis previo</h3>
              <p className="text-sm text-text-secondary mb-3">Antes de la call, invierto 3-4 horas analizando tu caso con datos reales:</p>
              <ul className="text-sm text-text-secondary space-y-1 pl-4 list-disc marker:text-accent">
                <li>Análisis de tus productos: precio óptimo, margen real, posicionamiento en TTS</li>
                <li>Benchmarking con 10-15 competidores directos (Kalodata, búsqueda manual)</li>
                <li>Identificación de productos top de la categoría y qué están haciendo bien</li>
                <li>Review de afiliados activos en tu nicho con los que podrías trabajar</li>
                <li>Estimación realista de facturación según tu setup</li>
              </ul>
            </div>

            {/* Paso 4 */}
            <div className="relative">
              <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Día 5</span>
                <span className="text-[10px] text-text-secondary">· 60 minutos por Meet</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-1">Llamada de diagnóstico</h3>
              <p className="text-sm text-text-secondary mb-3">Llegamos a la call con diagnóstico previo armado. No perdemos tiempo en contexto básico. Cubrimos:</p>
              <ul className="text-sm text-text-secondary space-y-1 pl-4 list-disc marker:text-accent">
                <li>Revisión de mi análisis con vos — ajustamos según información que no estaba en el formulario</li>
                <li>Decisiones operativas concretas: productos a priorizar, comisiones, estrategia de afiliados</li>
                <li>Plan de primeros 90 días con hitos medibles</li>
                <li>Preguntas abiertas tuyas sobre casos específicos</li>
              </ul>
            </div>

            {/* Paso 5 */}
            <div className="relative">
              <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Día 8</span>
                <span className="text-[10px] text-text-secondary">· 3 días post-call</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-1">Entregable por escrito</h3>
              <p className="text-sm text-text-secondary mb-3">A los 3 días post-call recibís un documento completo (20-30 páginas) con:</p>
              <ul className="text-sm text-text-secondary space-y-1 pl-4 list-disc marker:text-accent">
                <li><strong className="text-text">Análisis de producto:</strong> posicionamiento, ticket óptimo por mercado EU, margen proyectado</li>
                <li><strong className="text-text">Análisis de competencia:</strong> top 10-15 competidores con data de facturación, afiliados, crecimiento</li>
                <li><strong className="text-text">Plan de acción de 90 días:</strong> hitos concretos por semana, métricas a seguir, decisiones ya tomadas</li>
                <li><strong className="text-text">Setup recomendado:</strong> comisiones afiliados por producto, estrategia GMV Max, presupuesto inicial</li>
                <li><strong className="text-text">Red flags:</strong> qué cosas de tu operación actual/planificada son riesgosas y cómo mitigarlas</li>
                <li><strong className="text-text">Benchmarks:</strong> qué facturación/CPA/ROI es realista esperar en tu caso</li>
              </ul>
            </div>

            {/* Paso 6 */}
            <div className="relative">
              <div className="absolute -left-[calc(2rem+9px)] w-4 h-4 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Días 8-22</span>
                <span className="text-[10px] text-text-secondary">· 2 semanas de follow-up</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-1">Acompañamiento por email</h3>
              <p className="text-sm text-text-secondary">Durante los 14 días después del entregable podés escribirme preguntas puntuales sobre implementación. Sin límite de emails. Te respondo en 48h.</p>
            </div>
          </div>
        </div>

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
              <li>Querés un plan escrito con criterios medibles, no una charla genérica.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border-2 border-red-500/20 bg-red-500/5">
            <h2 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
              <span className="text-red-500">✗</span> No es para vos si...
            </h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Esperás que te garantice resultados. Nada en ecommerce se garantiza.</li>
              <li>Todavía no registraste la cuenta. Esa parte es gratis y autoexplicativa.</li>
              <li>Tu producto claramente no encaja con TTS (ticket muy alto, no se demuestra visualmente).</li>
              <li>Buscás implementación hecha. Te doy claridad y plan, la ejecución es tuya.</li>
              <li>Querés copiar la fórmula de otro seller. TTS no funciona así.</li>
              <li>No vas a completar el formulario inicial en serio. Sin eso, no hay análisis profundo posible.</li>
            </ul>
          </div>
        </div>

        {/* Qué recibís — sumario visual */}
        <div className="mb-14 p-6 rounded-2xl border-2 border-accent/20 bg-accent/[0.03]">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Qué recibís por tus 499€</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: "Formulario estructurado", d: "10-15 min de tu tiempo, máxima información" },
              { t: "3-4h de análisis previo", d: "Antes de la call, trabajo tu caso en profundidad" },
              { t: "60 min de call por Meet", d: "Con diagnóstico ya armado, sin contexto básico" },
              { t: "Documento de 20-30 páginas", d: "A los 3 días: análisis + competencia + plan de 90 días" },
              { t: "Análisis de 10-15 competidores", d: "Con data de Kalodata + búsqueda manual" },
              { t: "2 semanas de follow-up email", d: "Preguntas sobre implementación sin límite" },
            ].map((item) => (
              <div key={item.t} className="flex gap-3 items-start">
                <div className="shrink-0 w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{item.t}</p>
                  <p className="text-xs text-text-secondary">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quién la hace */}
        <div className="mb-14 p-6 rounded-xl border border-border bg-card-bg">
          <h2 className="text-2xl font-bold text-text mb-3">Quién te va a asesorar</h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            Soy Facu, operador de TikTok Shop en una empresa de productos para el hogar basada en España.
            Arranqué en septiembre de 2025 y en 7 meses facturamos cerca de <strong className="text-text">500.000€</strong> gestionando
            catálogo, afiliados, campañas GMV Max y logística de manera diaria.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            Lo que te ofrezco no es teoría ni un curso. Es experiencia operativa directa: lo que funcionó, lo que falló,
            y las decisiones concretas que tomé ante situaciones similares a la tuya. Consultoría de operador, no de consultor.
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
              { q: "¿Por qué 499€ si son solo 60 minutos de call?", a: "Los 60 min son solo una parte. El valor real está en las 3-4 horas de análisis previo que invierto en tu caso, el documento escrito de 20-30 páginas que recibís a los 3 días, y las 2 semanas de follow-up por email. En total son entre 6-8 horas de mi tiempo enfocadas en tu operación específica." },
              { q: "¿Qué diferencia hay con una consultoría de las clásicas?", a: "La mayoría de consultorías TTS son sesiones de 60 min donde tomás notas y después tenés que organizar todo vos. Acá el entregable está armado: documento escrito, análisis de competencia con datos, plan de acción semana a semana. Es trabajo hecho, no charla." },
              { q: "¿Puedo pedir reembolso si no me aporta valor?", a: "Si al recibir el documento final sentís que no te aportó valor concreto, te devuelvo el 100%. Preferís eso a tener un cliente insatisfecho." },
              { q: "¿Hacés diagnósticos en otros idiomas?", a: "Solo en español. El contenido operativo de TTS en España y países EU cercanos tiene particularidades que conozco bien. Otros mercados requieren perfiles con experiencia local específica." },
              { q: "¿Atendés a competidores directos de tu empresa?", a: "Si operás en la misma categoría y país que la empresa donde trabajo, te lo digo al principio y decidimos si tiene sentido avanzar. Transparencia total desde el primer email." },
              { q: "¿Qué pasa si necesito ayuda continua después del diagnóstico?", a: "Después de las 2 semanas de follow-up incluidas, si el caso requiere acompañamiento sostenido, conversamos un retainer mensual. Caso por caso, no hay paquete estándar." },
              { q: "¿Hay descuentos para startups o early-stage?", a: "No hay descuentos automáticos. Pero si tu caso es realmente interesante y estás en etapa muy temprana, escribime y vemos opciones. Caso por caso." },
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

        {/* CTA final — personal + simple */}
        <div className="relative p-8 sm:p-10 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/[0.02] overflow-hidden">
          {/* Avatar + identidad */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white text-xl font-bold shrink-0">
              F
            </div>
            <div>
              <p className="text-sm font-bold text-text">Facu</p>
              <p className="text-xs text-text-secondary">Operador TikTok Shop España</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
            Escribime. Respondo yo.
          </h2>

          <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
            Sin formularios automáticos, sin sales funnel. Me contás tu caso en 4-5 líneas,
            te digo honestamente si puedo ayudarte o no. Si tiene sentido, avanzamos con los 499€.
          </p>

          <a href="mailto:facu@shopseller.online?subject=Diagn%C3%B3stico%20operativo%20%E2%80%94%20Mi%20caso"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Escribir a Facu directamente
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              facu@shopseller.online
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Respondo en 24h
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              Sin compromiso
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
