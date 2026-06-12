import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "HoneyBee Farm | Pure Local Honey Direct from Farm",
  description:
    "100% pure honey directly from our farm in Raigad, Maharashtra. Order fresh honey with UPI/COD payment, delivery estimates, and WhatsApp updates. 7-day money-back guarantee.",
  keywords: [
    "pure honey",
    "local honey",
    "raw honey",
    "honey online",
    "buy honey",
    "farm fresh honey",
    "natural honey",
    "honey jar",
    "organic honey",
    "raigad honey",
    "maharashtra honey",
  ],
  authors: [{ name: "Ansh Koli", url: "https://honeybeefarm.in" }],
  creator: "Ansh Koli",
  publisher: "HoneyBee Farm",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://honeybeefarm.in",
    title: "HoneyBee Farm | Pure Local Honey",
    description: "100% pure honey directly from our farm. Order now with UPI/COD.",
    images: [
      {
        url: "https://honeybeefarm.in/images/honeycomb-1.jpg",
        width: 1200,
        height: 630,
        alt: "HoneyBee Farm pure honey",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HoneyBee Farm | Pure Local Honey",
    description: "Order 100% pure honey from our farm",
    creator: "@honeybeefarm",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://honeybeefarm.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta name="theme-color" content="#2f6b4f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <div className="page-shell flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

