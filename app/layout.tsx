import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Shared";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
  ),
  title: {
    default: "ITACAPS | Streetwear, Sneakers e Moda Masculina em Itabirito/MG",
    template: "%s | ITACAPS",
  },
  description:
    "Bonés, streetwear, sneakers e perfumaria importada em Itabirito/MG. Conheça a ITACAPS. Envio para todo o Brasil e atendimento pelo WhatsApp.",
  openGraph: {
    title: "ITACAPS — Seu estilo. Do seu jeito.",
    description:
      "Streetwear, sneakers e moda masculina. De Itabirito para todo o Brasil.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/hero.webp", width: 1536, height: 1024 }],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>
        <Header />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
