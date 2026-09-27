"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { outrun, meshedDisplay } from "../fonts";
import BackgroundLines from "../components/BackgroundLines";

interface SubscriberItem {
  email: string;
  subscribedAt: string;
}

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
}

const PRESET_IMAGES = [
  {
    name: "Cloud & Infrastructure",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Engineering & Code",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Modern Tech & Hardware",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "AI & Innovation",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function AdminPage() {
  const [secretKey, setSecretKey] = useState("vgsadmin2026");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Stats
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [activeTab, setActiveTab] = useState<"create" | "subscribers" | "blogs">("create");

  // Blog Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [author, setAuthor] = useState("VGS Engineering Team");
  const [authorRole, setAuthorRole] = useState("Solutions Architect");
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [notifySubscribers, setNotifySubscribers] = useState(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    success: boolean;
    message: string;
    warning?: string;
    slug?: string;
  } | null>(null);

  // Check initial local session
  useEffect(() => {
    const saved = sessionStorage.getItem("vgs_admin_auth");
    const savedSecret = sessionStorage.getItem("vgs_admin_secret");
    if (saved === "true") {
      setIsAuthenticated(true);
      if (savedSecret) {
        setSecretKey(savedSecret);
      }
      fetchStats();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey) {
      setAuthError("Please enter your admin secret key.");
      return;
    }
    // We verify by calling the API
    setIsAuthenticated(true);
    sessionStorage.setItem("vgs_admin_auth", "true");
    sessionStorage.setItem("vgs_admin_secret", secretKey);
    fetchStats();
  };

  const fetchStats = async () => {
    try {
      const [subRes, blogRes] = await Promise.all([
        fetch("/api/subscribe"),
        fetch("/api/blogs"),
      ]);
      const subData = await subRes.json();
      const blogData = await blogRes.json();

      if (subData && typeof subData.count === "number") {
        setSubscriberCount(subData.count);
        setSubscribers(subData.subscribers || []);
      }
      if (blogData && Array.isArray(blogData.blogs)) {
        setBlogs(blogData.blogs);
      }
    } catch (e) {
      console.warn("Failed to fetch admin stats:", e);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      alert("Please fill in Title, Excerpt, and Article Content.");
      return;
    }

    setIsSubmitting(true);
    setPublishResult(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          author,
          authorRole,
          coverImage,
          excerpt,
          content,
          notifySubscribers,
          secretKey,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPublishResult({
          success: true,
          message: data.message || "Blog published successfully!",
          warning: data.emailBroadcast?.warning,
          slug: data.blog?.slug,
        });
        // Clear fields
        setTitle("");
        setExcerpt("");
        setContent("");
        fetchStats();
      } else {
        setPublishResult({
          success: false,
          message: data.error || "Failed to publish blog.",
        });
      }
    } catch (err: any) {
      setPublishResult({
        success: false,
        message: err.message || "Network error while publishing.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--vgs-canvas)] flex items-center justify-center p-4">
        <BackgroundLines />
        <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-black/10">
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[var(--vgs-blue)] text-white flex items-center justify-center text-xl mx-auto shadow-md">
              🔒
            </div>
            <h2 className={`${outrun.className} text-2xl uppercase tracking-wider text-[var(--vgs-blue)]`}>
              VGS Admin Portal
            </h2>
            <p className="font-sans text-xs text-[var(--vgs-cloud)]">
              Enter your admin secret key to publish blogs & broadcast emails.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-sans text-xs font-bold text-[var(--vgs-ink)] mb-1">
                Admin Secret Key
              </label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter secret key (default: vgsadmin2026)"
                className="w-full px-4 py-3 bg-black/5 rounded-xl border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)]"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-500 font-semibold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[var(--vgs-blue)] text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-md hover:bg-blue-600 transition-all cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] relative pt-28 pb-20 px-4 sm:px-8">
      <BackgroundLines />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--vgs-blue)] uppercase tracking-wider">
              <span>⚡</span> Content & Newsletter Broadcast Engine
            </div>
            <h1 className={`${outrun.className} text-3xl sm:text-4xl text-[var(--vgs-blue)] uppercase`}>
              Blog & Broadcast Studio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="px-4 py-2 bg-white border border-black/10 rounded-xl text-xs font-bold text-[var(--vgs-ink)] hover:bg-black/5 shadow-sm transition-all"
            >
              View Public Blog &rarr;
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem("vgs_admin_auth");
                sessionStorage.removeItem("vgs_admin_secret");
                setSecretKey("");
                setIsAuthenticated(false);
              }}
              className="px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--vgs-blue)] flex items-center justify-center text-2xl font-bold">
              📬
            </div>
            <div>
              <p className="text-xs text-[var(--vgs-cloud)] font-semibold uppercase tracking-wider">
                Total Subscribers
              </p>
              <h3 className="text-2xl font-extrabold text-[var(--vgs-ink)]">{subscriberCount}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold">
              📚
            </div>
            <div>
              <p className="text-xs text-[var(--vgs-cloud)] font-semibold uppercase tracking-wider">
                Published Articles
              </p>
              <h3 className="text-2xl font-extrabold text-[var(--vgs-ink)]">{blogs.length}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-bold">
              🚀
            </div>
            <div>
              <p className="text-xs text-[var(--vgs-cloud)] font-semibold uppercase tracking-wider">
                Email Dispatch
              </p>
              <h3 className="text-sm font-bold text-emerald-600">Active (Resend Ready)</h3>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-2 border-b border-black/10 pb-2">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "create"
                ? "bg-[var(--vgs-blue)] text-white shadow-md"
                : "bg-white text-[var(--vgs-ink)]/70 hover:bg-black/5"
            }`}
          >
            ✏️ Publish New Blog
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "subscribers"
                ? "bg-[var(--vgs-blue)] text-white shadow-md"
                : "bg-white text-[var(--vgs-ink)]/70 hover:bg-black/5"
            }`}
          >
            👥 Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "blogs"
                ? "bg-[var(--vgs-blue)] text-white shadow-md"
                : "bg-white text-[var(--vgs-ink)]/70 hover:bg-black/5"
            }`}
          >
            📑 All Posts ({blogs.length})
          </button>
        </div>

        {/* TAB 1: CREATE BLOG FORM */}
        {activeTab === "create" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/10 shadow-md space-y-6">
            <div>
              <h2 className={`${meshedDisplay.className} text-2xl font-bold text-[var(--vgs-ink)]`}>
                Write a New Blog & Notify Subscribers
              </h2>
              <p className="font-sans text-xs text-[var(--vgs-cloud)] mt-1">
                When you publish this article, an announcement email will be automatically crafted
                and sent to all {subscriberCount} subscribers!
              </p>
            </div>

            {publishResult && (
              <div
                className={`p-4 rounded-xl border text-sm flex items-start justify-between gap-3 ${
                  publishResult.success
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                <div>
                  <p className="font-bold">{publishResult.success ? "🎉 Success!" : "⚠️ Error"}</p>
                  <p>{publishResult.message}</p>
                  {publishResult.warning && (
                    <p className="text-xs mt-2 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg p-2 font-medium">
                      ⚠️ <strong>Resend Notice:</strong> {publishResult.warning}
                    </p>
                  )}
                  {publishResult.slug && (
                    <Link
                      href={`/blog/${publishResult.slug}`}
                      target="_blank"
                      className="font-bold underline text-[var(--vgs-blue)] mt-1 inline-block"
                    >
                      View Live Article &rarr;
                    </Link>
                  )}
                </div>
                <button
                  onClick={() => setPublishResult(null)}
                  className="text-xs font-bold opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handlePublish} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Building High-Speed Microservices in 2026"
                  required
                  className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)]"
                />
              </div>

              {/* Category & Author Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Business Insights">Business Insights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="VGS Engineering Team"
                    className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-2">
                    Author Title / Role
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Solutions Architect"
                    className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)]"
                  />
                </div>
              </div>

              {/* Cover Image Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)] mb-3"
                />

                <div className="space-y-2">
                  <p className="text-xs text-[var(--vgs-cloud)] font-semibold">Or pick a curated tech cover preset:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCoverImage(preset.url)}
                        className={`text-left p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                          coverImage === preset.url
                            ? "border-[var(--vgs-blue)] bg-blue-50/50 font-bold"
                            : "border-black/10 hover:bg-black/5"
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-16 object-cover rounded-lg mb-1.5"
                        />
                        <span className="block truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-1">
                  Article Excerpt / Email Summary *
                </label>
                <p className="text-xs text-[var(--vgs-cloud)] mb-2">
                  This summary appears on the blog card and is included in the announcement email sent to subscribers!
                </p>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  placeholder="A concise summary of what this article covers and why readers should check it out..."
                  required
                  className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)] leading-relaxed"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--vgs-ink)] mb-1">
                  Full Article Body *
                </label>
                <p className="text-xs text-[var(--vgs-cloud)] mb-2">
                  Use blank lines between paragraphs. Use <code>## Section Header</code> and <code>- Bullet item</code> for clean formatting.
                </p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Write your article here..."
                  required
                  className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vgs-blue)] font-mono leading-relaxed"
                />
              </div>

              {/* BROADCAST TOGGLE */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--vgs-ink)]">
                      Notify Subscribed Users via Email
                    </h4>
                    <p className="text-xs text-[var(--vgs-cloud)]">
                      Sends an announcement email to all {subscriberCount} newsletter subscribers automatically upon clicking Publish.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifySubscribers}
                    onChange={(e) => setNotifySubscribers(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--vgs-blue)]"></div>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--vgs-blue)] text-white font-extrabold py-4 rounded-xl text-sm uppercase tracking-wider shadow-lg hover:bg-blue-600 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Publishing & Dispatching Emails...</span>
                  </>
                ) : (
                  <span>🚀 Publish Blog {notifySubscribers ? "& Broadcast to Subscribers" : ""}</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: SUBSCRIBERS LIST */}
        {activeTab === "subscribers" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/10 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`${meshedDisplay.className} text-2xl font-bold text-[var(--vgs-ink)]`}>
                  Newsletter Subscribers
                </h2>
                <p className="text-xs text-[var(--vgs-cloud)]">
                  Users who subscribed from the footer or blog page to receive blog announcements.
                </p>
              </div>
              <span className="bg-blue-50 text-[var(--vgs-blue)] font-bold text-xs px-3 py-1.5 rounded-full border border-blue-200">
                {subscribers.length} Subscribed
              </span>
            </div>

            {subscribers.length === 0 ? (
              <div className="p-8 text-center text-sm text-[var(--vgs-cloud)]">
                No subscribers registered yet. Test by submitting an email in the footer!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-[var(--vgs-cloud)]">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Subscribed Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {subscribers.map((sub, i) => (
                      <tr key={i} className="hover:bg-black/5">
                        <td className="py-3 px-4 font-mono text-xs text-[var(--vgs-cloud)]">{i + 1}</td>
                        <td className="py-3 px-4 font-semibold text-[var(--vgs-ink)]">{sub.email}</td>
                        <td className="py-3 px-4 text-xs text-[var(--vgs-cloud)]">
                          {sub.subscribedAt
                            ? new Date(sub.subscribedAt).toLocaleString()
                            : "Recently"}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PUBLISHED BLOGS LIST */}
        {activeTab === "blogs" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/10 shadow-md space-y-4">
            <h2 className={`${meshedDisplay.className} text-2xl font-bold text-[var(--vgs-ink)]`}>
              Published Articles
            </h2>
            <div className="divide-y divide-black/5">
              {blogs.map((b) => (
                <div key={b.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[var(--vgs-blue)] uppercase mr-2">
                      [{b.category}]
                    </span>
                    <span className="font-bold text-sm text-[var(--vgs-ink)]">{b.title}</span>
                    <p className="text-xs text-[var(--vgs-cloud)] mt-0.5">
                      Published {new Date(b.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    className="text-xs font-bold text-[var(--vgs-blue)] hover:underline whitespace-nowrap"
                  >
                    View Post &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
