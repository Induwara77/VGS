import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllBlogs, createBlog, getAllSubscribers, deleteBlog, updateBlog } from '@/app/lib/db';
import { sendBlogAnnouncementEmail } from '@/app/lib/mail';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('[API /api/blogs GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, secretKey } = body;

    // Admin auth check
    const configuredKey = (process.env.ADMIN_SECRET_KEY || 'vgsadmin2026').trim();
    if (!secretKey || secretKey.trim() !== configuredKey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret Key.' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 });
    }

    const result = await deleteBlog(id);

    if (result.notFound) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
    }

    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (error) {
    console.error('[API /api/blogs DELETE] Error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      category,
      author,
      authorRole,
      coverImage,
      readTime,
      notifySubscribers = true,
      secretKey,
    } = body;

    // Admin security check
    const configuredKey = (process.env.ADMIN_SECRET_KEY || 'vgsadmin2026').trim();
    if (!secretKey || secretKey.trim() !== configuredKey) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid Admin Secret Key.' },
        { status: 401 }
      );
    }

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required.' },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug =
      customSlug && customSlug.trim() !== ''
        ? customSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Calculate approximate read time if not provided
    const wordsCount = content.trim().split(/\s+/).length;
    const estimatedReadTime = readTime || `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

    const newBlog = await createBlog({
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category || 'Engineering',
      author: author || 'Vendora Global Solutions',
      authorRole: authorRole || 'VGS Team',
      coverImage:
        coverImage ||
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      readTime: estimatedReadTime,
    });

    let emailBroadcastResult: {
      sentCount: number;
      totalCount?: number;
      simulated?: boolean;
      warning?: string;
      failures?: { email: string; reason: string }[];
    } = { sentCount: 0, simulated: false };

    // Broadcast email to all subscribers if requested
    if (notifySubscribers) {
      try {
        const subscribers = await getAllSubscribers();
        const activeEmails = subscribers.map((s) => s.email);

        if (activeEmails.length > 0) {
          const res = await sendBlogAnnouncementEmail(newBlog, activeEmails);
          emailBroadcastResult = {
            sentCount: res.sentCount || 0,
            totalCount: res.totalCount || activeEmails.length,
            simulated: !!res.simulated,
            warning: res.warning,
            failures: res.failures,
          };
        }
      } catch (emailErr) {
        console.error('[API /api/blogs POST] Email broadcast error:', emailErr);
      }
    }

    let responseMessage = 'Blog published successfully!';
    if (notifySubscribers) {
      if (emailBroadcastResult.simulated) {
        responseMessage = `Blog published! Email broadcast simulated for ${emailBroadcastResult.sentCount} subscriber(s) (RESEND_API_KEY not configured).`;
      } else if (emailBroadcastResult.sentCount > 0) {
        responseMessage = `Blog published and notification dispatched to ${emailBroadcastResult.sentCount} subscriber(s)!`;
      } else if (emailBroadcastResult.totalCount && emailBroadcastResult.totalCount > 0) {
        responseMessage = `Blog published, but email dispatch failed for ${emailBroadcastResult.totalCount} subscriber(s). Check Resend domain restrictions.`;
      }
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${newBlog.slug}`);
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      blog: newBlog,
      emailBroadcast: emailBroadcastResult,
      message: responseMessage,
    });
  } catch (error) {
    console.error('[API /api/blogs POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post. Please check inputs.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      slug: customSlug,
      excerpt,
      content,
      category,
      author,
      authorRole,
      coverImage,
      readTime,
      secretKey,
    } = body;

    // Admin auth check
    const configuredKey = (process.env.ADMIN_SECRET_KEY || 'vgsadmin2026').trim();
    if (!secretKey || secretKey.trim() !== configuredKey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret Key.' }, { status: 401 });
    }

    if (!id || !title || !excerpt || !content) {
      return NextResponse.json({ error: 'ID, title, excerpt, and content are required.' }, { status: 400 });
    }

    // Generate slug from title
    const slug =
      customSlug && customSlug.trim() !== ''
        ? customSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const wordsCount = content.trim().split(/\s+/).length;
    const estimatedReadTime = readTime || `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

    // Make sure updateBlog is imported from your @app/lib/db file
    const updatedBlog = await updateBlog(id, {
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category || 'Engineering',
      author: author || 'Vendora Global Solutions',
      authorRole: authorRole || 'VGS Team',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      readTime: estimatedReadTime,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedBlog.slug}`);
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      blog: updatedBlog,
      message: 'Blog updated successfully!',
    });
  } catch (error) {
    console.error('[API /api/blogs PUT] Error:', error);
    return NextResponse.json({ error: 'Failed to update blog post.' }, { status: 500 });
  }
}
