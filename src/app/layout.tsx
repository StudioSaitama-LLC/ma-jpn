import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
});

export const metadata: Metadata = {
  title: "MA - The Space Between",
  description:
    "A curated collection of silence, sound, and the space in between. Atmospheric fragments of a quiet life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSerif.variable} ${plusJakarta.variable} antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface text-on-surface font-body">
        <Header />
        <main className="pt-32 relative overflow-hidden">{children}</main>
        <Footer />
        <GrainOverlay />
      </body>
    </html>
  );
}
