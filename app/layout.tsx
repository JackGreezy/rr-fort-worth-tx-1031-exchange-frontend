import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StickyCta from "@/components/StickyCta";
import { SITE_URL } from "@/lib/constants";
import { getContactPointSchema, getWebsiteSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "1031 Exchange Fort Worth | Free Turnkey Exchange Help",
  description:
    "Get free 1031 exchange guidance in Fort Worth. Plan your sale, compare direct and DST replacement properties, and stay on track through closing.",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",

  twitter: { card: "summary_large_image", title: "1031 Exchange Fort Worth | Free Turnkey Exchange Help", description: "Get free 1031 exchange guidance in Fort Worth. Plan your sale, compare direct and DST replacement properties, and stay on track through closing." },

  openGraph: { title: "1031 Exchange Fort Worth | Free Turnkey Exchange Help", description: "Get free 1031 exchange guidance in Fort Worth. Plan your sale, compare direct and DST replacement properties, and stay on track through closing." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = [getWebsiteSchema(), getContactPointSchema()];

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} flex min-h-screen flex-col bg-paper text-ink antialiased`}>
        <Header />
        <div className="flex-1 pt-20">{children}</div>
        <Footer />
        <StickyCta />
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
