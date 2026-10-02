import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vendora Global Solutions, our engineering philosophy, mission, vision, and how we architect digital excellence for high-performance businesses.",
  alternates: {
    canonical: "https://www.vendoraglobalsolutions.com/about",
  },
  openGraph: {
    title: "About Us | Vendora Global Solutions",
    description:
      "Learn about Vendora Global Solutions, our engineering philosophy, mission, vision, and how we architect digital excellence for high-performance businesses.",
    url: "https://www.vendoraglobalsolutions.com/about",
    siteName: "Vendora Global Solutions",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
