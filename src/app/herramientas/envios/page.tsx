import type { Metadata } from "next";
import EnviosClient from "./EnviosClient";

export const metadata: Metadata = {
  title: "Comparador de envios TTS Europa",
  description: "Costes de envio TikTok Shop EU por ruta, peso y tipo de entrega. Matriz interactiva con todos los paises.",
};

export default function EnviosPage() {
  return <EnviosClient />;
}
