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
  title: "1031 Exchange Fort Worth | Tax-Deferred Real Estate Exchange",
  description:
    "1031 Exchange services in Fort Worth, TX. Expert guidance for tax-deferred real estate exchanges. Contact us at 801 Cherry St, Fort Worth, TX 76102 or call 817-985-3561.",
  alternates: {
    canonical: SITE_URL,
  },
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
        <div className="flex-1">{children}</div>
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
