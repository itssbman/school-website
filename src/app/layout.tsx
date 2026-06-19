import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import schoolConfig from "../../school.config";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: `${schoolConfig.name} — ${schoolConfig.tagline}`,
  description: schoolConfig.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <head>
        {/* Inject accent color as a CSS custom property so globals.css and
            any non-Tailwind CSS can reference var(--accent) */}
        <style>{`:root { --accent: ${schoolConfig.brand.accentColor}; --accent-dark: ${schoolConfig.brand.accentColorDark}; }`}</style>
      </head>
      <body className="min-h-full flex flex-col bg-[#FBFBFA] text-[#1A2B49] antialiased">
        {children}
      </body>
    </html>
  );
}
