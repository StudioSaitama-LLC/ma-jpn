import type { Metadata } from "next";
import { Noto_Sans_JP, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "間｜MA",
  description:
    "立ち止まること。余白を残すこと。すぐに、意味を求めないこと。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${sourceSans3.variable} antialiased`}
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
