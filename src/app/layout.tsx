import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font"; // Correct import for Geist fonts
import "./globals.css";
import { Providers } from "../store/providers"; // Import Redux Provider

// Define metadata for the application
export const metadata: Metadata = {
  title: "PGAGI Analytics Dashboard",
  description: "A comprehensive analytics dashboard for weather, news, and finance data.",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {/* Wrap the application with Redux Provider */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}