import type { MetadataRoute } from "next";
import { getAllBlogs } from "./lib/db";

const BASE_URL = "https://www.vendoraglobalsolutions.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ─────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Dynamic blog post routes ──────────────────────────────────────────────
  let dynamicBlogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getAllBlogs();

    dynamicBlogRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      // Use the post's publishedAt timestamp as lastModified so search engines
      // know exactly when the content was last changed.
      lastModified: post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    // Log the error but don't crash the build — static routes will still be
    // included in the sitemap even if the DB is unavailable.
    console.error("[sitemap] Failed to fetch blog posts from MongoDB:", error);
  }

  return [...staticRoutes, ...dynamicBlogRoutes];
}
