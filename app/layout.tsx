import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site-config";
// Importando o componente oficial do GTM do Next.js
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: ["/sidao-goleiro.png"] },
  openGraph: {
    title: "Academia S12 | Método Sidão",
    description: "Domine a grande área e blinde sua mente. A metodologia oficial de quem viveu a pressão dos maiores clubes do Brasil.",
    url: SITE_URL, 
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