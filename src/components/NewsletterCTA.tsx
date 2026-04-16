/**
 * CTA visual de newsletter. NO funcional — sin form real ni backend.
 * Activar cuando se decida el servicio (Buttondown / ConvertKit).
 */
export default function NewsletterCTA() {
  return (
    <section className="border border-border rounded-lg p-8 bg-card-bg text-center">
      <h2 className="text-xl font-semibold text-text mb-2">
        Novedades de TikTok Shop Europa en tu inbox
      </h2>
      <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
        Cambios en politicas, nuevas comisiones, herramientas que valen la pena.
        Sin spam, solo lo que necesitas saber como vendedor.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
        <input
          type="email"
          placeholder="tu@email.com"
          disabled
          className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-bg text-text-secondary cursor-not-allowed"
          aria-label="Email para newsletter"
        />
        <button
          disabled
          className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-md opacity-50 cursor-not-allowed"
        >
          Suscribirme
        </button>
      </div>
      <p className="text-xs text-text-secondary mt-3">
        Newsletter de TTS Seller en preparacion. Proximamente.
      </p>
    </section>
  );
}
