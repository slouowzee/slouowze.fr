import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { JsonLd } from "@/components/layout/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slouowze.fr"),
  title: {
    default: "slouowze.fr",
    template: "%s | Slouowze",
  },
  description: "Développeur Web passionné, spécialisé en React, Next.js et Laravel. Je conçois des applications web performantes, esthétiques et fonctionnelles. Basé en France.",
  keywords: ["Développeur Web", "Fullstack", "React", "Next.js", "Laravel", "Portfolio", "Freelance", "Front-end", "Back-end", "Slouowze"],
  authors: [{ name: "Slouowze", url: "https://slouowze.fr" }],
  creator: "Slouowze",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://slouowze.fr",
    title: "Slouowze | Développeur Web Fullstack",
    description: "Découvrez mon portfolio, mes projets et mes compétences en développement web (React, Next.js, Laravel).",
    siteName: "Portfolio de Slouowze",
    images: [
      {
        url: "/lou.png",
        width: 1200,
        height: 630,
        alt: "Slouowze Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slouowze | Développeur Web",
    description: "Développeur Web passionné, spécialisé en React, Next.js et Laravel.",
    images: ["/lou.png"],
    creator: "@slouowzee",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
