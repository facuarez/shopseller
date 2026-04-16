import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * OG Image dinámica.
 * Uso: /og?title=Mi+titulo&description=Mi+descripcion
 * Para v1 genera un OG image simple con texto.
 * TODO: Mejorar diseño con logo y branding cuando se defina el dominio.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "nuevositio";
  const description = searchParams.get("description") ?? "TikTok Shop Europa para vendedores";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          padding: "60px 80px",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            width: 60,
            height: 4,
            backgroundColor: "#FF5A1F",
            marginBottom: 32,
          }}
        />
        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 700,
            color: "#E5E5E5",
            lineHeight: 1.2,
            maxWidth: 900,
            marginBottom: 16,
          }}
        >
          {title}
        </div>
        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#999999",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          {description}
        </div>
        {/* Footer */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 20,
            color: "#555555",
          }}
        >
          nuevositio — TikTok Shop Europa
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
