import type { Metadata } from "next";
import AfiliadosClient from "./AfiliadosClient";

export const metadata: Metadata = {
  title: "Analizador de Afiliados TikTok Shop",
  description: "Subí tu export CSV de órdenes de afiliados y obtené un desglose completo: top afiliados, top videos, top productos. 100% client-side.",
};

export default function AfiliadosPage() {
  return <AfiliadosClient />;
}
