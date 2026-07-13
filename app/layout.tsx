import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rocaje | Diseño, estrategia y presencia digital",
  description:
    "Rocaje crea experiencias digitales modernas para marcas que quieren destacar.",
  keywords: ["Rocaje", "diseño", "marca", "estrategia", "Next.js"],
  openGraph: {
    title: "Rocaje | Diseño, estrategia y presencia digital",
    description:
      "Rocaje crea experiencias digitales modernas para marcas que quieren destacar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
