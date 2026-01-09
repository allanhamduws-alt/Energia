import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Energia Supply Solution",
  description: "Admin-Bereich für Energia Supply Solution",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

