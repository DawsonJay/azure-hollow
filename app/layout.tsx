import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Azure Hollow - Tarot Readings with Jessica Rose",
  description: "Personal tarot readings via Zoom. Get guidance and clarity through intuitive card readings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

