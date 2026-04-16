import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mi",
  description: "Quien esta detras de este sitio sobre TikTok Shop Europa.",
};

export default function SobreMiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-8">Sobre mi</h1>

      <div className="prose max-w-none">
        <h2>Quien soy</h2>
        <p>
          {/* TODO: Completar con tu historia real */}
          Soy Facu, operador de TikTok Shop en una empresa europea de productos para el hogar basada en
          España. Llevo operando en TTS Europa desde sus primeras etapas y he visto de primera mano como
          evoluciona la plataforma, que funciona y que no.
        </p>

        <h2>Por que este sitio</h2>
        <p>
          {/* TODO: Expandir con tu motivacion real */}
          Cuando empece a operar en TikTok Shop Europa, la informacion disponible en español era
          practicamente inexistente. Lo que habia estaba enfocado a creadores de contenido o afiliados,
          no a vendedores que gestionan productos, logistica, margenes y operaciones reales. Este sitio
          nace para llenar ese hueco.
        </p>

        <h2>Como opero TTS</h2>
        <p>
          {/* TODO: Describir tu operacion — categorias, paises, volumen aproximado, enfoque */}
          TODO: Describir aqui como operas en TikTok Shop. Que categorias manejas, en que paises vendes,
          que volumen aproximado gestionas, si usas fulfillment de TTS o logistica propia, si trabajas con
          afiliados, etc.
        </p>

        <h2>Contacto</h2>
        <p>
          {/* TODO: Agregar metodos de contacto reales */}
          TODO: Agregar aqui tus metodos de contacto preferidos. Email, Twitter/X, LinkedIn, etc.
        </p>
      </div>
    </div>
  );
}
