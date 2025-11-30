import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "JSON Viewer | AI Insights, format JSON easily",
  description: "Visualize and format JSON easily. Paste your data and explore it in a clean, readable structure.",
  metadataBase: new URL("https://jsonvisualizerr.vercel.app"),
  openGraph: {
    title: "JSON Viewer | AI Insights, format JSON easily",
    type: "website",
    siteName: "JSON Viewer",
    url: "https://jsonvisualizerr.vercel.app",
    description: "Visualize and format JSON easily. Paste your data and explore it in a clean, readable structure.",
    locale: "en_US",
    images: [
      {
        url: "https://jsonvisualizerr.vercel.app/og-json.png",
        width: 1200,
        height: 630,
        alt: "JSON Viewer",
      },
    ],
  },
  twitter: {
    title: "JSON Viewer | AI Insights, format JSON easily",
    description: "Visualize and format JSON easily. Paste your data and explore it in a clean, readable structure.",
    card: "summary_large_image",
    images: [
      {
        url: "https://jsonvisualizerr.vercel.app/twitter-json.png",
        width: 1200,
        height: 630,
        alt: "JSON Viewer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
