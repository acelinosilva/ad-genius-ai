import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AdGenius AI | Gerador de Anúncios Profissionais para OLX e Mercado Livre",
  description: "Crie anúncios persuasivos e otimizados para OLX, Mercado Livre e Shopee em segundos. Use inteligência artificial para vender mais e evitar bloqueios.",
  keywords: ["gerador de anúncios olx", "gerador de anúncios mercado livre", "criar anúncios profissionais", "ia para vendas", "copywriting para e-commerce", "gerador de anúncios grátis", "vender na olx", "vender no mercado livre"],
  authors: [{ name: "AdGenius AI Team" }],
  creator: "AdGenius AI",
  publisher: "AdGenius AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://adgenius-ai.vercel.app"), // Fallback base URL for metadata
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AdGenius AI | Seus anúncios vendem mais",
    description: "A inteligência artificial que entende o SEO dos maiores marketplaces do Brasil.",
    url: "/",
    siteName: "AdGenius AI",
    images: [
      {
        url: "/og-image.png", // Assuming an image exists or will be added
        width: 1200,
        height: 630,
        alt: "AdGenius AI Dashboard Preview",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdGenius AI | Gerador de Anúncios com IA",
    description: "Domine o marketplace com anúncios que vendem em segundos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AdGenius AI",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "Plataforma SaaS de geração automatizada de anúncios para marketplaces brasileiros usando IA generativa.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "BRL"
    }
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#050505] text-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
