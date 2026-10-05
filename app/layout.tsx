import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site-config";
import Script from "next/script";

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
      {/* Injetando o GTM otimizado */}        <Script id="academia-s12-gtm" strategy="lazyOnload">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WMTNWDXX');
        `}</Script>
    </html>
  );
}