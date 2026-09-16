import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importando o componente oficial do GTM do Next.js
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Academia S12 | Método Definitivo para Goleiros",
  description: "Aprenda técnica de elite, o jogo moderno com os pés e a blindagem mental com o ex-goleiro profissional Sidão.",
  openGraph: {
    title: "Academia S12 | Método Sidão",
    description: "Domine a grande área e blinde sua mente. A metodologia oficial de quem viveu a pressão dos maiores clubes do Brasil.",
    url: "https://sidao-lp-oficial.vercel.app", 
    siteName: "Academia S12",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551280857-2b9bbe5240dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
        width: 1200,
        height: 630,
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
      <body className={inter.className}>{children}</body>
      {/* Injetando o GTM otimizado */}
      <GoogleTagManager gtmId="GTM-WMTNWDXX" />
    </html>
  );
}