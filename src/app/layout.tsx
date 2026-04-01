import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Header } from "@/components/Header";

import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arquivo Stephen King",
  description: "Arquivo local de obras e especiais sobre Stephen King.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${specialElite.className} antialiased`}>
        <NuqsAdapter>
          <Header />
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
