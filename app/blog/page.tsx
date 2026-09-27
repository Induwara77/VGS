"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { outrun, meshedDisplay } from "../fonts";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import BackgroundLines from "../components/BackgroundLines";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = filteredBlogs[0];
  const gridBlogs = filteredBlogs.slice(1);

  return (
    <div className="relative min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] flex flex-col justify-between">
      <BackgroundLines />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--vgs-blue)]/10 text-[var(--vgs-blue)] text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[var(--vgs-blue)] animate-pulse"></span>
            VGS Engineering & Insights
          </div>
          <h1
            className={`${outrun.className} text-4xl sm:text-6xl uppercase tracking-tight text-[var(--vgs-blue)]`}
          >
            Our Latest Blogs
          </h1>
          <p className="font-sans text-base sm:text-lg text-[var(--vgs-cloud)] leading-relaxed">
            Deep-dives into modern web architecture, cloud engineering, real-time systems, and
            digital innovation by the Vendor Global Solutions team.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--vgs-blue)] hover:underline bg-white px-4 py-2 rounded-lg border border-black/10 shadow-sm transition-all hover:shadow"
            >
              <span>🔒</span> Admin: Publish New Article
            </Link>
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTERS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[var(--vgs-blue)] text-white shadow-md shadow-[var(--vgs-blue)]/30"
                    : "bg-white text-[var(--vgs-ink)]/70 hover:bg-black/5 border border-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[var(--vgs-ink)] placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)] shadow-sm"
            />
            <span className="absolute right-3.5 top-2.5 text-black/40 text-sm">🔍</span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[var(--vgs-blue)] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-sans text-sm text-[var(--vgs-cloud)] mt-4">Loading insights...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-black/10 shadow-sm max-w-md mx-auto my-10">
            <span className="text-4xl">📝</span>
            <h3 className="font-sans text-lg font-bold text-[var(--vgs-ink)] mt-4">
              No articles found
            </h3>
            <p className="font-sans text-xs text-[var(--vgs-cloud)] mt-2">
              Try adjusting your search terms or category filter, or publish a new blog post.
            </p>
          </div>
        )}

        {/* FEATURED BLOG POST */}
        {!loading && featuredBlog && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-black/10 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative h-64 sm:h-96 w-full overflow-hidden bg-slate-100">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[var(--vgs-blue)] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    Featured
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[var(--vgs-blue)] uppercase tracking-wider bg-[var(--vgs-blue)]/10 px-3 py-1 rounded-md">
                        {featuredBlog.category}
                      </span>
                      <span className="text-xs text-[var(--vgs-cloud)]">
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    <h2
                      className={`${meshedDisplay.className} text-2xl sm:text-3xl font-bold text-[var(--vgs-ink)] group-hover:text-[var(--vgs-blue)] transition-colors line-clamp-2`}
                    >
                      {featuredBlog.title}
                    </h2>

                    <p className="font-sans text-sm sm:text-base text-[var(--vgs-cloud)] line-clamp-3 leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-6">
                    <div>
                      <p className="font-sans text-xs font-bold text-[var(--vgs-ink)]">
                        {featuredBlog.author}
                      </p>
                      <p className="font-sans text-xs text-[var(--vgs-cloud)]">
                        {new Date(featuredBlog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-[var(--vgs-blue)] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Article &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* BLOG GRID */}
        {!loading && gridBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[var(--vgs-ink)] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-[var(--vgs-cloud)] font-medium">
                      ⏳ {blog.readTime}
                    </span>
                    <h3
                      className={`${meshedDisplay.className} text-xl font-bold text-[var(--vgs-ink)] group-hover:text-[var(--vgs-blue)] transition-colors line-clamp-2`}
                    >
                      {blog.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[var(--vgs-cloud)] line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[var(--vgs-ink)] block">{blog.author}</span>
                      <span className="text-[var(--vgs-cloud)]">
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="font-bold text-[var(--vgs-blue)] group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
