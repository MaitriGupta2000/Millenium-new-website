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

const siteUrl = "https://millenniumtechnology.in";
const description =
  "Millennium Technology designs and manufactures laptop screen extenders, networking cards, add-on cards, gaming accessories, and compute accessories.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Millennium Technology - Innovative Products Designed for You",
    template: "%s | Millennium Technology",
  },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Millennium Technology",
    title: "Millennium Technology - Innovative Products Designed for You",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Millennium Technology - Innovative Products Designed for You",
    description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Millennium Technology",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-[#1A1A1A]">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
