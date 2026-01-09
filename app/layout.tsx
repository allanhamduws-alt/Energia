import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Energia Supply Solution | B2B Solarhandel",
  description: "Ihr B2B-Partner für Photovoltaik-Module, Wechselrichter und Batteriespeicher. Beschaffung, Großhandel und flexible Lösungen für Installateure, Händler und Projektentwickler – europaweit.",
  keywords: ["Solar", "Photovoltaik", "B2B", "Großhandel", "Module", "Wechselrichter", "Batteriespeicher", "PV", "Energia"],
  authors: [{ name: "Energia Supply Solution" }],
  openGraph: {
    title: "Energia Supply Solution | B2B Solarhandel",
    description: "Ihr B2B-Partner für Photovoltaik-Module, Wechselrichter und Batteriespeicher.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased min-h-screen flex flex-col">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
