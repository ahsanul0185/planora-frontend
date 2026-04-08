import { Toaster } from "@/components/ui/sonner";
import QueryProviders from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Inter, Newsreader, Urbanist } from "next/font/google";
import "./globals.css";
import { AIChatbot } from "@/components/shared/AIChatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Planora | The Digital Maître D’",
  description: "Planora is a comprehensive event management platform designed to help organizers and participants connect, book, and manage events with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${inter.className} ${newsreader.variable} ${urbanist.variable} antialiased font-sans overflow-x-hidden`}
      >
        <QueryProviders>
          {children}
          <Toaster position="top-right" richColors />
          <AIChatbot />
        </QueryProviders>
      </body>
    </html>
  );
}

