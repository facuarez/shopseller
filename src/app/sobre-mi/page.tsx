import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Quién está detrás de este sitio sobre TikTok Shop Europa.",
};

export default function SobreMiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-8">Sobre mí</h1>

      <div className="prose max-w-none">
        <h2>Quién soy</h2>
        <p>
          {/* TODO: Completar con tu historia real */}
          Soy Facu, operador de TikTok Shop en una empresa europea de productos para el hogar basada en
          España. Llevo operando en TTS Europa desde sus primeras etapas y he visto de primera mano cómo
          evoluciona la plataforma, qué funciona y qué no.
        </p>

        <h2>Por qué este sitio</h2>
        <p>
          {/* TODO: Expandir con tu motivación real */}
          Cuando empecé a operar en TikTok Shop Europa, la información disponible en español era
          prácticamente inexistente. Lo que había estaba enfocado a creadores de contenido o afiliados,
          no a vendedores que gestionan productos, logística, márgenes y operaciones reales. Este sitio
          nace para llenar ese hueco.
        </p>

        <h2>Cómo opero TTS</h2>
        <p>
          {/* TODO: Describir tu operación — categorías, países, volumen aproximado, enfoque */}
          TODO: Describir aquí cómo operás en TikTok Shop. Qué categorías manejás, en qué países vendés,
          qué volumen aproximado gestionás, si usás fulfillment de TTS o logística propia, si trabajás con
          afiliados, etc.
        </p>

        <h2>Contacto</h2>
        <p>
          {/* TODO: Agregar métodos de contacto reales */}
          TODO: Agregar aquí tus métodos de contacto preferidos. Email, Twitter/X, LinkedIn, etc.
        </p>
      </div>
    </div>
  );
}
