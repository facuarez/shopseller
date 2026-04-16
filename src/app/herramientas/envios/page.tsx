import type { Metadata } from "next";
import EnviosClient from "./EnviosClient";

export const metadata: Metadata = {
  title: "Comparador de envíos TTS Europa",
  description: "Costes de envío TikTok Shop EU por ruta, peso y tipo de entrega. Matriz interactiva con todos los países.",
};

export default function EnviosPage() {
  return <EnviosClient />;
}
