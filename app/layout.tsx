import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Millennium Technology - Innovative Products Designed for You",
  description:
    "Millennium Technology designs and manufactures monitor extenders, networking cards, add-on cards, gaming accessories, and compute accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-[#1A1A1A]">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
