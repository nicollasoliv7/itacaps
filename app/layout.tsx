import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "ITACAPS | Bonés, tênis e moda masculina em Itabirito-MG",
  description:
    "Bonés, tênis, camisetas, camisas de time, óculos e perfumes no centro de Itabirito-MG. Monte seu look no site e receba as opções pelo WhatsApp. Enviamos para todo o Brasil.",
  openGraph: {
    title: "ITACAPS",
    description: "Bonés, tênis e o look completo. Rua Dr. Guilherme, 272, Itabirito-MG.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/fachada.webp", width: 1200, height: 1600 }],
  },
};

export const viewport: Viewport = { themeColor: "#e8e8e5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
