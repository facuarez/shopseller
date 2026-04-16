import type { Metadata } from "next";
import CalculadoraClient from "./CalculadoraClient";

export const metadata: Metadata = {
  title: "Calculadora de rentabilidad TTS Europa",
  description: "Calcula el PVP mínimo rentable para TikTok Shop EU. Comisiones, IVA, envíos, afiliados y ads incluidos.",
};

export default function CalculadoraPage() {
  return <CalculadoraClient />;
}
