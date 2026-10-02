import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights",
  description:
    "Explore engineering insights, software architecture deep dives, web development guides, and tech updates from Vendora Global Solutions.",
  alternates: {
    canonical: "https://www.vendoraglobalsolutions.com/blog",
  },
  openGraph: {
    title: "Engineering Blog | Vendora Global Solutions",
    description:
      "Explore engineering insights, software architecture deep dives, web development guides, and tech updates from Vendora Global Solutions.",
    url: "https://www.vendoraglobalsolutions.com/blog",
    siteName: "Vendora Global Solutions",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
