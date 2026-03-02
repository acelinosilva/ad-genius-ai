import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AdGenius AI | Seus anúncios vendem mais",
  description: "Plataforma SaaS de geração automatizada de anúncios para marketplaces brasileiros usando IA generativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#050505] text-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
