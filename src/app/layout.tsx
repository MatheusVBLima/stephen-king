import type { Metadata } from "next";
import { Special_Elite } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/Header";



const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Stephen King's Works",
  description: "A collection of Stephen King's works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${specialElite.className} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
