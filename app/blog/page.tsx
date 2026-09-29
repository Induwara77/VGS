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
        <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[var(--vgs-blue)] text-white py-20 px-6 mb-16">
          <div className="max-w-[1200px] mx-auto text-center space-y-4">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-sm font-sans uppercase tracking-widest rounded-full">
              VGS Engineering & Insights
            </div>

            {/* Title */}
            <h1 className={`${outrun.className} text-4xl sm:text-6xl uppercase text-white`}>
              Our Latest Blogs
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Deep-dives into modern web architecture, cloud engineering, real-time systems, and
              digital innovation by the Vendor Global Solutions team.
            </p>

            {/* Admin Action Button */}
            {/* <div className="pt-4 flex justify-center">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--vgs-blue)] hover:bg-white/90 bg-white px-4 py-2 rounded-lg border border-black/10 shadow-sm transition-all hover:shadow"
              >
                <span>🔒</span> Admin: Publish New Article
              </Link>
            </div> */}

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
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[var(--vgs-blue)] text-white"
                    : "bg-[var(--vgs-canvas)] text-[var(--vgs-ink)]/70 hover:bg-black/5 border border-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-72 relative flex items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white border border-black/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-[var(--vgs-ink)] placeholder-black/40 focus:outline-none focus:ring-1 focus:ring-[var(--vgs-ink)]"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.8} 
              stroke="currentColor" 
              className="absolute right-3.5 w-4 h-4 text-black/40 pointer-events-none"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
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
          <div className="bg-white rounded-2xl p-12 text-center border border-black/10 shadow-md max-w-md mx-auto my-10">
            <span className="text-4xl">📝</span>
            <h3 className="font-sans text-lg font-bold text-[var(--vgs-ink)] mt-4">
              No articles found
            </h3>
            <p className="font-sans text-xs text-[var(--vgs-cloud)] mt-2">
              Try adjusting your search terms or category filter, or check back soon for more insights.
            </p>
          </div>
        )}

        {/* FEATURED BLOG POST */}
        {!loading && featuredBlog && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="group block bg-[var(--vgs-blue)] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative h-64 sm:h-96 w-full overflow-hidden bg-slate-100">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[var(--vgs-blue)] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 shadow-md">
                    Featured
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--vgs-canvas)] uppercase tracking-wider bg-[var(--vgs-canvas)]/10 px-3 py-1">
                        {featuredBlog.category}
                      </span>
                      <span className="text-xs uppercase text-[var(--vgs-canvas)]">
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    <h2
                      className="font-sans font-black uppercase text-3xl sm:text-4xl text-[var(--vgs-canvas)] line-clamp-3"
                    >
                      {featuredBlog.title}
                    </h2>

                    <p className="font-sans text-sm sm:text-base text-[var(--vgs-canvas)] line-clamp-2 leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--vgs-canvas)]/30 flex items-center justify-between mt-6">
                    <div>
                      <p className="font-sans text-xs font-bold text-[var(--vgs-canvas)]">
                        {featuredBlog.author}
                      </p>
                      <p className="font-sans text-xs text-[var(--vgs-canvas)]">
                        {new Date(featuredBlog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-[var(--vgs-canvas)] group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
                className="flex flex-col bg-white overflow-hidden border border-black/10 shadow-lg"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[var(--vgs-ink)] text-xs font-bold px-3 py-1 shadow-sm">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-[var(--vgs-cloud)] font-medium">
                      ⏳ {blog.readTime}
                    </span>
                    <h3
                      className="font-sans text-xl font-black text-[var(--vgs-ink)] transition-colors line-clamp-2"
                    >
                      {blog.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-md text-[var(--vgs-cloud)] line-clamp-3 leading-relaxed">
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
                    <span className="font-bold text-[var(--vgs-ink)] hover:translate-x-1 transition-transform">
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
