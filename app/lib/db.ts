import fs from 'fs';
import path from 'path';
import { MongoClient, Db } from 'mongodb';

export interface Subscriber {
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole?: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
}

// Initial seed blogs to ensure the blog section looks populated immediately
const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "vgs-welcome-article",
    slug: "welcome-to-vendor-global-solutions-engineering",
    title: "How VGS Builds Scalable Cloud & Web Architecture for Global Businesses",
    excerpt: "Discover the engineering principles, microservices approach, and modern tech stack behind Vendor Global Solutions' digital transformation services.",
    content: `## Engineering the Future of Global Solutions

At Vendor Global Solutions (VGS), our mission is to build robust, scalable, and ultra-performant digital systems that empower modern enterprises. Whether developing microservices-driven web apps or orchestrating cloud infrastructures, our engineering standards are designed for durability and speed.

### 1. Modern Architectural Foundations
Every application we design starts with a clear division of concerns:
- **Resilient Frontend:** Built with React, Next.js, and modern CSS primitives to deliver lightning-fast interactive experiences.
- **Scalable Backends:** Event-driven Node.js and distributed microservices capable of handling heavy concurrent traffic.
- **Secure Data Storage:** Modern database topologies engineered with failover protection and low-latency replication.

### 2. Why Real-Time & Cloud Matter
In today's fast-moving market, latency directly impacts conversion. By adopting edge caching, serverless computing, and real-time synchronization, we help businesses eliminate bottlenecks and optimize operational workflows.

### 3. What to Expect from This Blog
We will regularly share deep dives, engineering case studies, cloud architectural breakdowns, and best practices. Make sure you stay subscribed to receive instant notifications whenever a new article drops!`,
    category: "Engineering",
    author: "Induwara Dilshan",
    authorRole: "Lead Solutions Architect",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "vgs-nextjs-tailwind-guide",
    slug: "modern-fullstack-performance-standards-2026",
    title: "Modern Fullstack Performance Standards: From Core Web Vitals to Edge Computing",
    excerpt: "A practical guide to achieving sub-second load times and exceptional user experiences with modern frameworks and edge deployment strategies.",
    content: `## Achieving High-Velocity Web Performance

Speed is not just a feature; it is an essential foundation of user trust and conversion rates. In this article, we outline the benchmarks and strategies our team uses to guarantee superior performance across all client deployments.

### Key Focus Areas:
- **Largest Contentful Paint (LCP):** Optimizing server response times and preloading critical visual assets.
- **Interaction to Next Paint (INP):** Minimizing main-thread blocking JavaScript to guarantee instantaneous button and input response.
- **Cumulative Layout Shift (CLS):** Reserving aspect-ratio boxes and preventing unexpected content jumps during hydration.

By following these standards, VGS projects consistently achieve top-tier Lighthouse scores and deliver smooth, responsive web applications worldwide.`,
    category: "Web Development",
    author: "VGS Tech Team",
    authorRole: "Frontend Specialists",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

// Fallback JSON file storage paths
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([]), 'utf-8');
  }
  if (!fs.existsSync(BLOGS_FILE)) {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(INITIAL_BLOGS, null, 2), 'utf-8');
  }
}

// MongoDB client singleton
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

async function getMongoDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (mongoDb) return mongoDb;

  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(uri);
      await mongoClient.connect();
    }
    mongoDb = mongoClient.db(process.env.MONGODB_DB_NAME || 'vgs_database');
    return mongoDb;
  } catch (error) {
    console.warn('[DB] MongoDB connection failed, falling back to local storage:', error);
    return null;
  }
}

// ----------------- SUBSCRIBERS -----------------

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const db = await getMongoDb();
  if (db) {
    try {
      const collection = db.collection<Subscriber>('subscribers');
      return await collection.find({ active: true }).toArray();
    } catch (e) {
      console.warn('[DB] MongoDB fetch subscribers failed, falling back to file:', e);
    }
  }

  ensureDataDir();
  try {
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
    const subscribers: Subscriber[] = JSON.parse(raw);
    return subscribers.filter((s) => s.active !== false);
  } catch (e) {
    return [];
  }
}

export async function addSubscriber(email: string): Promise<{ success: boolean; alreadySubscribed: boolean }> {
  const normalizedEmail = email.trim().toLowerCase();
  const db = await getMongoDb();

  if (db) {
    try {
      const collection = db.collection<Subscriber>('subscribers');
      const existing = await collection.findOne({ email: normalizedEmail });
      if (existing) {
        if (!existing.active) {
          await collection.updateOne({ email: normalizedEmail }, { $set: { active: true } });
        }
        return { success: true, alreadySubscribed: true };
      }

      await collection.insertOne({
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        active: true,
      });

      syncToSheetDb(normalizedEmail).catch(() => {});

      return { success: true, alreadySubscribed: false };
    } catch (e) {
      console.warn('[DB] MongoDB save subscriber failed, falling back to file:', e);
    }
  }

  ensureDataDir();
  try {
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
    const subscribers: Subscriber[] = JSON.parse(raw);
    const existingIndex = subscribers.findIndex((s) => s.email.toLowerCase() === normalizedEmail);

    if (existingIndex >= 0) {
      if (!subscribers[existingIndex].active) {
        subscribers[existingIndex].active = true;
        fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
      }
      return { success: true, alreadySubscribed: true };
    }

    subscribers.push({
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      active: true,
    });

    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');

    syncToSheetDb(normalizedEmail).catch(() => {});

    return { success: true, alreadySubscribed: false };
  } catch (e) {
    console.error('[DB] Failed to save subscriber:', e);
    throw new Error('Failed to save subscriber');
  }
}

async function syncToSheetDb(email: string) {
  const sheetUrl = process.env.SHEETDB_API || process.env.SHEETDB_API_URL;
  if (!sheetUrl) return;

  try {
    await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            Email: email,
            Type: 'Newsletter Subscriber',
            Date: new Date().toLocaleString(),
          }
        ]
      })
    });
  } catch (err) {
    console.warn('[SheetDB Sync] Could not sync subscriber to SheetDB:', err);
  }
}

// ----------------- BLOGS -----------------

export async function getAllBlogs(): Promise<BlogPost[]> {
  const db = await getMongoDb();
  if (db) {
    try {
      const collection = db.collection<BlogPost>('blogs');
      const blogs = await collection.find({}).sort({ publishedAt: -1 }).toArray();
      if (blogs.length > 0) return blogs;
    } catch (e) {
      console.warn('[DB] MongoDB fetch blogs failed, falling back to file:', e);
    }
  }

  ensureDataDir();
  try {
    const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
    const blogs: BlogPost[] = JSON.parse(raw);
    return blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (e) {
    return INITIAL_BLOGS;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getMongoDb();
  if (db) {
    try {
      const collection = db.collection<BlogPost>('blogs');
      const blog = await collection.findOne({ slug });
      if (blog) return blog;
    } catch (e) {
      console.warn('[DB] MongoDB fetch blog by slug failed, falling back to file:', e);
    }
  }

  const blogs = await getAllBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}

export async function createBlog(data: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
  const newBlog: BlogPost = {
    ...data,
    id: `blog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    publishedAt: new Date().toISOString(),
  };

  const db = await getMongoDb();
  if (db) {
    try {
      const collection = db.collection<BlogPost>('blogs');
      await collection.insertOne(newBlog as any);
      return newBlog;
    } catch (e) {
      console.warn('[DB] MongoDB create blog failed, falling back to file:', e);
    }
  }

  ensureDataDir();
  const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
  const blogs: BlogPost[] = JSON.parse(raw);
  blogs.unshift(newBlog);
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
  return newBlog;
}

export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const db = await getMongoDb();
  if (db) {
    try {
      const collection = db.collection<BlogPost>('blogs');
      const result = await collection.findOneAndUpdate(
        { $or: [{ id }, { slug: id }] },
        { $set: data },
        { returnDocument: 'after' }
      );
      if (result) return result;
    } catch (e) {
      console.warn('[DB] MongoDB update blog failed, falling back to file:', e);
    }
  }

  ensureDataDir();
  try {
    const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
    const blogs: BlogPost[] = JSON.parse(raw);
    const index = blogs.findIndex((b) => b.id === id || b.slug === id);
    if (index === -1) return null;

    blogs[index] = {
      ...blogs[index],
      ...data,
      id: blogs[index].id, // preserve original id
    };

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
    return blogs[index];
  } catch (e) {
    console.error('[DB] Failed to update blog:', e);
    return null;
  }
}

export async function deleteBlog(id: string): Promise<{ success: boolean; notFound?: boolean }> {
  const db = await getMongoDb();
  if (db) {
    try {
      const collection = db.collection<BlogPost>('blogs');
      const result = await collection.deleteOne({ id });
      if (result.deletedCount === 0) {
        await collection.deleteOne({ slug: id });
      }
      return { success: true };
    } catch (e) {
      console.warn('[DB] MongoDB delete blog failed, falling back to file:', e);
    }
  }

  ensureDataDir();
  try {
    const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
    const blogs: BlogPost[] = JSON.parse(raw);
    const filtered = blogs.filter((b) => b.id !== id && b.slug !== id);
    if (filtered.length === blogs.length) {
      return { success: false, notFound: true };
    }
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return { success: true };
  } catch (e) {
    console.error('[DB] Failed to delete blog:', e);
    return { success: false };
  }
}