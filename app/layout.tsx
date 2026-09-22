import type { Metadata } from "next";
import "./globals.css";
// Importando o componente oficial do GTM do Next.js
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL("https://sidao-lp-oficial.vercel.app"),
  title: "Academia S12 | Método Definitivo para Goleiros",
  description: "Aprenda técnica de elite, o jogo moderno com os pés e a blindagem mental com o ex-goleiro profissional Sidão.",
  openGraph: {
    title: "Academia S12 | Método Sidão",
    description: "Domine a grande área e blinde sua mente. A metodologia oficial de quem viveu a pressão dos maiores clubes do Brasil.",
    url: "https://sidao-lp-oficial.vercel.app", 
    siteName: "Academia S12",
    images: [
      {
        url: "/sidao-goleiro.png", 
        width: 800,
        height: 1000,
        alt: "Academia S12 - Sidão",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">{children}</body>
      {/* Injetando o GTM otimizado */}
      <GoogleTagManager gtmId="GTM-WMTNWDXX" />
    </html>
  );
}