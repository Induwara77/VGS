import { MongoClient, Db, ObjectId } from 'mongodb';

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

// MongoDB client singleton
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

async function getMongoDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('[DB] MONGODB_URI environment variable is not defined.');
  }

  if (mongoDb) return mongoDb;

  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  mongoDb = mongoClient.db(process.env.MONGODB_DB_NAME || 'vgs_database');
  return mongoDb;
}

// ----------------- SUBSCRIBERS -----------------

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const db = await getMongoDb();
  const collection = db.collection<Subscriber>('subscribers');
  return await collection.find({ active: true }).toArray();
}

export async function addSubscriber(email: string): Promise<{ success: boolean; alreadySubscribed: boolean }> {
  const normalizedEmail = email.trim().toLowerCase();
  const db = await getMongoDb();
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
  const collection = db.collection<BlogPost>('blogs');
  const blogs = await collection.find({}).sort({ publishedAt: -1 }).toArray();
  return blogs; // Will return an empty array if nothing has been published yet
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getMongoDb();
  const collection = db.collection<BlogPost>('blogs');
  return await collection.findOne({ slug });
}

export async function createBlog(data: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
  const newBlog: BlogPost = {
    ...data,
    id: `blog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    publishedAt: new Date().toISOString(),
  };

  const db = await getMongoDb();
  const collection = db.collection<BlogPost>('blogs');
  await collection.insertOne(newBlog as any);
  return newBlog;
}

export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const db = await getMongoDb();
  const collection = db.collection<BlogPost>('blogs');
  
  const queryConditions: any[] = [{ id }, { slug: id }];
  if (ObjectId.isValid(id)) {
    try {
      queryConditions.push({ _id: new ObjectId(id) });
    } catch {}
  }

  const result = await collection.findOneAndUpdate(
    { $or: queryConditions },
    { $set: data },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function deleteBlog(id: string): Promise<{ success: boolean; notFound?: boolean }> {
  const db = await getMongoDb();
  const collection = db.collection<BlogPost>('blogs');
  
  let result = await collection.deleteOne({ id });
  if (result.deletedCount === 0) {
    result = await collection.deleteOne({ slug: id });
  }

  if (result.deletedCount === 0 && ObjectId.isValid(id)) {
    try {
      result = await collection.deleteOne({ _id: new ObjectId(id) });
    } catch {}
  }

  if (result.deletedCount === 0) {
    return { success: false, notFound: true };
  }

  return { success: true };
}