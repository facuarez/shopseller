import type { Metadata } from "next";
import CalculadoraGananciasClient from "./CalculadoraGananciasClient";

export const metadata: Metadata = {
  title: "Calculadora de ganancias para afiliados TikTok Shop",
  description: "Calculá cuánto podés ganar como afiliado de TikTok Shop según ticket, comisión, views y frecuencia de publicación. Proyección mensual incluida.",
};

export default function CalculadoraGananciasPage() {
  return <CalculadoraGananciasClient />;
}
