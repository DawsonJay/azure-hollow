import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azure Hollow - Tarot Readings with Jessica Rose",
  description: "Professional tarot readings via Zoom. Book a 30, 60, or 90-minute session with Jessica Rose. Get guidance on relationships, career, and life questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

