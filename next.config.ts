import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimización de imágenes — agregar dominios externos cuando sea necesario
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Extensiones de página para soportar MDX en el futuro si se necesita
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
