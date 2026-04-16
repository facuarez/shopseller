import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog TTS Europa",
  description: "Cronología de cambios reales en políticas, features y comisiones de TikTok Shop en Europa.",
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
