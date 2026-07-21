import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./forms.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rusvektor.ru"),
  title: "РУСВЕКТОР — строительство и пожарная безопасность",
  description: "Строительные, инженерные и противопожарные работы под ключ.",
  openGraph: {
    title: "РУСВЕКТОР — строительство и пожарная безопасность",
    description: "Строительные, инженерные и противопожарные работы под ключ.",
    images: [{ url: "/og-rusvektor.png", width: 1731, height: 909 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "РУСВЕКТОР — строительство и пожарная безопасность",
    description: "Строительные, инженерные и противопожарные работы под ключ.",
    images: ["/og-rusvektor.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
