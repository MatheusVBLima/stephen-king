import type { Metadata } from "next";
import { Special_Elite, Bodoni_Moda } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arquivo Stephen King",
  description: "Arquivo local de obras de Stephen King.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scheme-dark">
      <body
        className={`${specialElite.variable} ${bodoniModa.variable} ${specialElite.className} antialiased [touch-action:manipulation]`}
      >
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-2 focus:ring-ring"
        >
          Pular para o conteúdo
        </a>
        <NuqsAdapter>
          <Header />
          <div id="conteudo-principal">{children}</div>
          <SiteFooter />
        </NuqsAdapter>
      </body>
    </html>
  );
}
