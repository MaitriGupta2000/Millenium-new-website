import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
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
const siteName = "Millenium Technology";
const description =
  `${siteName} designs and manufactures laptop screen extenders, networking cards, add-on cards, gaming accessories, and compute accessories.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/small_logo.png",
    shortcut: "/small_logo.png",
    apple: "/small_logo.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  telephone: "+919662545915",
  address: {
    "@type": "PostalAddress",
    streetAddress: "208-209, Regent Square, Above D-Mart, Near Mahalaxmi Temple, Anand Mahal Road, Adajan",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395009",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/millenniumtechno",
    "https://www.facebook.com/millenniumtech/",
  ],
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
      <GoogleTagManager gtmId="GTM-MN6WQNCS" />
    </html>
  );
}
