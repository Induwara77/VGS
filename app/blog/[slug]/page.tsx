import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, getAllBlogs } from "@/app/lib/db";
import { outrun, meshedDisplay } from "@/app/fonts";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import BackgroundLines from "@/app/components/BackgroundLines";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Split content into paragraphs or formatted sections
  const paragraphs = blog.content.split("\n\n");

  return (
    <div className="relative min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] flex flex-col justify-between">
      <BackgroundLines />

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-8 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--vgs-blue)] hover:text-[var(--vgs-ink)] transition-colors uppercase tracking-wider"
          >
            &larr; Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[var(--vgs-blue)] text-white text-xs font-bold px-3.5 py-1.5 rounded-md uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-xs text-[var(--vgs-cloud)] font-sans">
              ⏳ {blog.readTime}
            </span>
            <span className="text-xs text-[var(--vgs-cloud)]">
              Published on{" "}
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1
            className="font-sans text-3xl font-black sm:text-5xl text-[var(--vgs-ink)]"
          >
            {blog.title}
          </h1>

          <p className="font-sans text-md sm:text-lg text-[var(--vgs-cloud)] leading-relaxed border-l-4 border-[var(--vgs-blue)] pl-4 italic">
            {blog.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-4 pt-4 border-t border-black/10">
            <div className="w-12 h-12 rounded-full bg-[var(--vgs-blue)] text-white font-bold flex items-center justify-center text-lg shadow-sm">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-sans text-sm font-bold text-[var(--vgs-ink)]">{blog.author}</p>
              <p className="font-sans text-xs text-[var(--vgs-cloud)]">
                {blog.authorRole || "Vendor Global Solutions"}
              </p>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden mb-14">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <article className="prose prose-lg max-w-none space-y-6 font-sans text-base sm:text-lg text-[var(--vgs-ink)] text-justify leading-relaxed">
          {paragraphs.map((para, i) => {
            if (para.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="text-xl font-sans font-black sm:text-2xl text-[var(--vgs-blue)] uppercase tracking-wide pt-4"
                >
                  {para.replace("### ", "")}
                </h3>
              );
            }
            if (para.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-3xl font-sans font-bold sm:text-4xl text-[var(--vgs-ink)] pt-6 pb-2 border-b border-black/10"
                >
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("- ")) {
              const items = para.split("\n").filter((item) => item.trim().startsWith("- "));
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 text-base text-[var(--vgs-ink)]/80">
                  {items.map((item, idx) => (
                    <li key={idx}>{item.replace(/^- \*\*(.*?)\*\*/, "$1:").replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="font-sans leading-relaxed">
                {para}
              </p>
            );
          })}
        </article>

        {/* Share & Post-Footer Section */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="text-sm font-bold text-[var(--vgs-blue)] hover:underline flex items-center gap-2"
          >
            &larr; Back to all blog insights
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[var(--vgs-cloud)] uppercase tracking-wider">
              Share this insight:
            </span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://vendorglobalsolutions.com/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-black/5 hover:bg-[var(--vgs-blue)] hover:text-white transition-all text-xs font-semibold"
            >
              LinkedIn
            </a>
            {/* <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                blog.title
              )}&url=https://vendorglobalsolutions.com/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-black/5 hover:bg-[var(--vgs-blue)] hover:text-white transition-all text-xs font-semibold"
            >
              Twitter / X
            </a> */}
          </div>
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
