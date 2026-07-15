import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rocaje.com";
const siteName = "Rocaje";
const siteTitle = "Rocaje | Consultoria industrial para plantas de block y adoquin";
const siteDescription =
  "Rocaje Consultoria acompana plantas de block y adoquin en Mexico con enfoque tecnico, operativo y orientado a resultados medibles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Rocaje",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Rocaje",
    "consultoria industrial",
    "plantas de block",
    "plantas de adoquin",
    "optimizacion de planta",
    "ingenieria industrial Mexico",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "industrial",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/about.jpg",
        width: 1200,
        height: 630,
        alt: "Rocaje Consultoria Industrial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/about.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/about.jpg`,
    description: siteDescription,
    sameAs: [
      "https://instagram.com/rocaje",
      "https://linkedin.com/company/rocaje",
    ],
  };

  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
