import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vendoraglobalsolutions.com"),
  title: "Vendor Global Solutions",
  description: "Architecting digital excellence through rigorous engineering and design.",
  icons: {
    icon: "/images/fav.ico",
  },
  openGraph: {
    title: "Vendor Global Solutions",
    description: "Architecting digital excellence through rigorous engineering and design.",
    url: "https://www.vendoraglobalsolutions.com",
    siteName: "Vendor Global Solutions",
    images: [
      {
        url: "/images/Vendora.jpg",
        width: 1200,
        height: 630,
        alt: "Vendor Global Solutions Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendor Global Solutions",
    description: "Architecting digital excellence through rigorous engineering and design.",
    images: ["/images/Vendora.jpg"],
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}