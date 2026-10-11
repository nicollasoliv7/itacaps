import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "ITACAPS | Streetwear, Sneakers e Moda Masculina em Itabirito/MG",
  description:
    "Bonés, tênis Mizuno e Nike, camisetas, bermudas, óculos e perfumaria importada no centro de Itabirito/MG. Monte seu look e receba as opções pelo WhatsApp. Envio para todo o Brasil.",
  openGraph: {
    title: "ITACAPS",
    description: "Seu estilo. Do seu jeito. Do boné ao tênis, na Rua Dr. Guilherme, 272, Itabirito/MG.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/fachada.webp", width: 1200, height: 1600 }],
  },
};

export const viewport: Viewport = { themeColor: "#e8e8e5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Sem JavaScript, o conteúdo animado aparece normalmente */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
