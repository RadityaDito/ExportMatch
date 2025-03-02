import { cn } from "@/lib/utils";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExportMatch",
  description: "B2B Export Matching Platform",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          inter.className,
          "min-h-[100dvh] bg-background antialiased touch-manipulation overflow-x-hidden"
        )}
      >
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
