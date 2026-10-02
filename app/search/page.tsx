import { Metadata } from 'next';
import { getAllBlogs } from '@/app/lib/db';

export const metadata: Metadata = {
  title: 'Search Results | Vendora Global Solutions',
  description: 'Search across all content on Vendora Global Solutions.',
};

// Static site pages always available for searching
const STATIC_PAGES = [
  {
    type: 'Page',
    title: 'Home',
    description: 'We build digital solutions that grow your business. Websites, Mobile Apps, AI Solutions, Social Media Marketing and Graphic Design.',
    url: '/',
    keywords: ['home', 'landing', 'main', 'vgs', 'vendora global solutions'],
  },
  {
    type: 'Page',
    title: 'Services — Full-Stack Engineering',
    description: 'Architecting digital excellence through rigorous engineering. Custom web apps, mobile apps, and cloud solutions.',
    url: '/#services',
    keywords: ['services', 'engineering', 'web', 'app', 'development', 'cloud'],
  },
  {
    type: 'Page',
    title: 'Services — AI & Machine Learning',
    description: 'Advanced AI and machine learning solutions tailored for enterprise applications.',
    url: '/#services',
    keywords: ['ai', 'machine learning', 'artificial intelligence', 'automation'],
  },
  {
    type: 'Page',
    title: 'Services — Social Media Marketing',
    description: 'Strategic social media marketing and graphic design services for brand growth.',
    url: '/#services',
    keywords: ['social media', 'marketing', 'graphic design', 'brand'],
  },
  {
    type: 'Page',
    title: 'Pricing Plans',
    description: 'Explore our transparent and flexible pricing tiers for custom development projects.',
    url: '/#pricing',
    keywords: ['pricing', 'plans', 'cost', 'packages', 'rates'],
  },
  {
    type: 'Page',
    title: 'About Us',
    description: 'Learn more about Vendora Global Solutions — our team, vision, values, and engineering standards.',
    url: '/about',
    keywords: ['about', 'team', 'company', 'vision', 'contact'],
  },
  {
    type: 'Page',
    title: 'Contact Us',
    description: 'Get in touch with Vendora Global Solutions to start your next project.',
    url: '/about#contact-form',
    keywords: ['contact', 'get in touch', 'hire', 'project', 'reach out'],
  },
  {
    type: 'Page',
    title: 'Blog',
    description: 'Read engineering articles, case studies, and technology insights from the VGS team.',
    url: '/blog',
    keywords: ['blog', 'articles', 'posts', 'engineering', 'insights'],
  },
];

function highlight(text: string, query: string): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">$1</mark>');
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const query = rawQuery.trim().toLowerCase();

  // Fetch real blogs from DB
  let blogResults: Array<{ type: string; title: string; description: string; url: string; category?: string; date?: string }> = [];
  try {
    const blogs = await getAllBlogs();
    blogResults = blogs
      .filter(
        (b) =>
          !query ||
          b.title.toLowerCase().includes(query) ||
          b.excerpt.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.content.toLowerCase().includes(query)
      )
      .map((b) => ({
        type: 'Article',
        title: b.title,
        description: b.excerpt,
        url: `/blog/${b.slug}`,
        category: b.category,
        date: new Date(b.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      }));
  } catch (e) {
    // silently degrade
  }

  // Filter static pages
  const pageResults = STATIC_PAGES.filter(
    (p) =>
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.keywords.some((k) => k.includes(query))
  ).map((p) => ({ type: p.type, title: p.title, description: p.description, url: p.url }));

  const allResults = [...blogResults, ...pageResults];

  return (
    <main className="min-h-screen pt-32 pb-20 px-5 max-w-[900px] mx-auto font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold text-[var(--vgs-blue)] uppercase tracking-widest mb-2">
          🔍 Search Results
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--vgs-ink)] leading-tight">
          {rawQuery ? (
            <>Results for &ldquo;<span className="text-[var(--vgs-blue)]">{rawQuery}</span>&rdquo;</>
          ) : (
            'All Content'
          )}
        </h1>
        <p className="text-sm text-[var(--vgs-cloud)] mt-2">
          {allResults.length > 0
            ? `${allResults.length} result${allResults.length !== 1 ? 's' : ''} found across blog articles and site pages.`
            : 'No results matched your query.'}
        </p>
      </div>

      {allResults.length === 0 ? (
        /* Empty state */
        <div className="text-center py-20 border border-dashed border-black/10 rounded-3xl bg-white">
          <div className="text-5xl mb-4">🔭</div>
          <p className="text-lg font-bold text-[var(--vgs-ink)]">No results found</p>
          <p className="text-sm text-[var(--vgs-cloud)] mt-2 max-w-sm mx-auto">
            Try searching for <span className="font-semibold">&ldquo;engineering&rdquo;</span>, <span className="font-semibold">&ldquo;pricing&rdquo;</span>, <span className="font-semibold">&ldquo;AI&rdquo;</span>, or <span className="font-semibold">&ldquo;services&rdquo;</span>.
          </p>
          <a href="/" className="mt-6 inline-block px-6 py-2.5 bg-[var(--vgs-blue)] text-white text-sm font-bold rounded-xl hover:scale-105 transition-transform">
            Go Home
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Blog articles first */}
          {blogResults.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[var(--vgs-cloud)] px-1">
                📝 Blog Articles ({blogResults.length})
              </h2>
              {blogResults.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  className="block p-5 rounded-2xl border border-black/8 bg-white shadow-sm hover:border-[var(--vgs-blue)] hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {item.category && (
                        <span className="inline-block text-[10px] font-extrabold text-white bg-[var(--vgs-blue)] uppercase px-2 py-0.5 rounded-md tracking-wide mb-2">
                          {item.category}
                        </span>
                      )}
                      <p
                        className="font-bold text-base text-[var(--vgs-ink)] group-hover:text-[var(--vgs-blue)] transition-colors leading-snug"
                        dangerouslySetInnerHTML={{ __html: highlight(item.title, rawQuery) }}
                      />
                      <p
                        className="text-sm text-[var(--vgs-cloud)] mt-1.5 leading-relaxed line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: highlight(item.description, rawQuery) }}
                      />
                      {item.date && (
                        <span className="text-xs text-[var(--vgs-cloud)] mt-2 block opacity-70">📅 {item.date}</span>
                      )}
                    </div>
                    <span className="text-[var(--vgs-blue)] text-lg group-hover:translate-x-1 transition-transform shrink-0 mt-1">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Static pages */}
          {pageResults.length > 0 && (
            <div className="space-y-3 mt-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[var(--vgs-cloud)] px-1">
                🗂️ Site Pages ({pageResults.length})
              </h2>
              {pageResults.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  className="block p-5 rounded-2xl border border-black/8 bg-white/70 shadow-sm hover:border-[var(--vgs-blue)] hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-bold text-base text-[var(--vgs-ink)] group-hover:text-[var(--vgs-blue)] transition-colors"
                        dangerouslySetInnerHTML={{ __html: highlight(item.title, rawQuery) }}
                      />
                      <p
                        className="text-sm text-[var(--vgs-cloud)] mt-1 leading-relaxed line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: highlight(item.description, rawQuery) }}
                      />
                      <span className="text-xs text-[var(--vgs-cloud)] mt-2 block font-mono opacity-50">{item.url}</span>
                    </div>
                    <span className="text-[var(--vgs-blue)] text-lg group-hover:translate-x-1 transition-transform shrink-0 mt-1">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}