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
  title: {
    default: "Vendora Global Solutions | Custom Software, Web & Mobile Development",
    template: "%s | Vendora Global Solutions",
  },
  description: "Vendora Global Solutions architects digital excellence through full-stack web and mobile engineering, custom software systems, and AI automation.",
  alternates: {
    canonical: "https://www.vendoraglobalsolutions.com",
  },
  icons: {
    icon: "/images/fav.ico",
  },
  openGraph: {
    title: "Vendora Global Solutions | Custom Software, Web & Mobile Development",
    description: "Vendora Global Solutions architects digital excellence through full-stack web and mobile engineering, custom software systems, and AI automation.",
    url: "https://www.vendoraglobalsolutions.com",
    siteName: "Vendora Global Solutions",
    images: [
      {
        url: "/images/Vendora.jpg",
        width: 1200,
        height: 630,
        alt: "Vendora Global Solutions Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendora Global Solutions | Custom Software, Web & Mobile Development",
    description: "Vendora Global Solutions architects digital excellence through full-stack web and mobile engineering, custom software systems, and AI automation.",
    images: ["/images/Vendora.jpg"],
  },
  verification: {
    google: 'hellovendora2026',
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