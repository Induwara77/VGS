import { Resend } from 'resend';
import { BlogPost } from './db';

/**
 * Returns an instance of the Resend client dynamically using current environment variables.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }
  return new Resend(apiKey.trim());
}

/**
 * Gets configured sender email with sensible fallback.
 */
export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || 'Vendora Global Solutions <onboarding@resend.dev>';
}

/**
 * Gets the configured public site URL for link building.
 */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://www.vendoraglobalsolutions.com').replace(/\/$/, '');
}

/**
 * Send a warm welcome email when a user subscribes from the footer.
 */
export async function sendWelcomeEmail(toEmail: string): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  const resend = getResendClient();
  const normalizedTo = toEmail.trim().toLowerCase();
  const fromEmail = getFromEmail();
  const siteUrl = getSiteUrl();

  if (!resend) {
    console.log(`[Email Service - Simulated] Welcome email to ${normalizedTo}. Set RESEND_API_KEY in .env.local to send live emails.`);
    return { success: true, simulated: true };
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to VGS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F7FB; margin: 0; padding: 30px 10px; color: #1E1E1E; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #eaeaea; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #0A64DC; padding: 36px 30px; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 1px; font-weight: 800; text-transform: uppercase; }
    .header p { margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px; }
    .content { padding: 35px 30px; line-height: 1.6; }
    .content h2 { margin-top: 0; color: #0A64DC; font-size: 20px; }
    .btn { display: inline-block; background-color: #0A64DC; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px; margin-top: 20px; }
    .footer { padding: 20px 30px; background-color: #FAFAFA; border-top: 1px solid #f0f0f0; font-size: 12px; color: #8A8F98; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Vendora Global Solutions</h1>
      <p>Tech, Engineering & Digital Innovation</p>
    </div>
    <div class="content">
      <h2>Welcome aboard! 🎉</h2>
      <p>Thank you for subscribing to our newsletter. You're now on the list to receive our latest engineering insights, software architecture deep-dives, and tech updates as soon as they are published.</p>
      <p>Whenever we post a new article on our blog, we will notify you right here so you never miss out.</p>
      <p style="text-align: center;">
        <a href="${siteUrl}/blog" class="btn">Explore Our Blog</a>
      </p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Vendora Global Solutions. All rights reserved.</p>
      <p>You received this email because you subscribed on vendoraglobalsolutions.com.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: normalizedTo,
      subject: 'Welcome to Vendora Global Solutions Newsletter! 🚀',
      html,
    });

    if (error) {
      console.error(`[Email Service] Resend error for welcome email to ${normalizedTo}:`, error);
      return { success: false, error: error.message };
    }

    console.log(`[Email Service] Welcome email successfully dispatched to ${normalizedTo} (ID: ${data?.id})`);
    return { success: true };
  } catch (error: any) {
    console.error('[Email Service] Unexpected exception sending welcome email:', error);
    return { success: false, error: error?.message || 'Failed to send email' };
  }
}

/**
 * Send an email broadcast announcing a new blog to all subscribers.
 * Uses individual parallel sends in controlled batches so that one unverified/restricted email
 * does not block delivery to valid subscribers.
 */
export async function sendBlogAnnouncementEmail(
  blog: BlogPost,
  subscriberEmails: string[]
): Promise<{
  success: boolean;
  sentCount: number;
  totalCount: number;
  simulated?: boolean;
  warning?: string;
  error?: string;
  failures?: { email: string; reason: string }[];
}> {
  const uniqueEmails = Array.from(
    new Set(
      subscriberEmails
        .map((e) => (typeof e === 'string' ? e.trim().toLowerCase() : ''))
        .filter((e) => e.length > 0 && e.includes('@'))
    )
  );

  if (uniqueEmails.length === 0) {
    return { success: true, sentCount: 0, totalCount: 0 };
  }

  const resend = getResendClient();
  const fromEmail = getFromEmail();
  const siteUrl = getSiteUrl();
  const isSandboxSender = fromEmail.includes('onboarding@resend.dev');

  if (isSandboxSender) {
    console.warn(
      `[Email Service] Warning: RESEND_FROM_EMAIL is using the sandbox domain (${fromEmail}). ` +
      `Resend will only deliver to the account owner's registered email address. ` +
      `To deliver to all public subscribers, verify your domain in Resend and update RESEND_FROM_EMAIL in .env.local.`
    );
  }

  if (!resend) {
    console.log(`[Email Service - Simulated] Broadcast announcement for "${blog.title}" to ${uniqueEmails.length} subscribers:`, uniqueEmails);
    return {
      success: true,
      sentCount: uniqueEmails.length,
      totalCount: uniqueEmails.length,
      simulated: true,
      warning: 'Live sending skipped: RESEND_API_KEY is not configured.',
    };
  }

  const blogUrl = `${siteUrl}/blog/${blog.slug}`;

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Blog on VGS: ${blog.title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F7FB; margin: 0; padding: 30px 10px; color: #1E1E1E; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #eaeaea; box-shadow: 0 6px 24px rgba(0,0,0,0.06); }
    .header { background: #0A64DC; padding: 28px 30px; text-align: center; }
    .header-tag { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; letter-spacing: 1px; margin-bottom: 8px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
    .cover-img { width: 100%; max-height: 280px; object-fit: cover; display: block; }
    .content { padding: 32px 30px; }
    .meta-badge { display: inline-block; background: #EEF4FF; color: #0A64DC; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; margin-bottom: 12px; }
    .blog-title { margin: 0 0 14px; font-size: 22px; font-weight: 800; color: #111827; line-height: 1.35; }
    .blog-excerpt { font-size: 15px; color: #4B5563; line-height: 1.6; margin-bottom: 24px; }
    .author-info { font-size: 13px; color: #6B7280; margin-bottom: 24px; }
    .cta-container { text-align: center; margin: 30px 0 10px; }
    .btn { display: inline-block; background-color: #0A64DC; color: #ffffff !important; padding: 15px 34px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(10,100,220,0.35); }
    .footer { padding: 24px 30px; background-color: #FAFAFA; border-top: 1px solid #f0f0f0; font-size: 12px; color: #8A8F98; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-tag">New Article Uploaded</div>
      <h1>Vendora Global Solutions Insights</h1>
    </div>

    ${blog.coverImage ? `<img src="${blog.coverImage}" alt="${blog.title}" class="cover-img" />` : ''}

    <div class="content">
      <div>
        <span class="meta-badge">${blog.category || 'Tech & Engineering'}</span>
        ${blog.readTime ? `<span style="font-size: 12px; color: #8A8F98; margin-left: 8px;">⏳ ${blog.readTime}</span>` : ''}
      </div>

      <h2 class="blog-title">${blog.title}</h2>

      <p class="blog-excerpt">${blog.excerpt}</p>

      <div class="author-info">
        By <strong>${blog.author || 'VGS Team'}</strong>
      </div>

      <div class="cta-container">
        <a href="${blogUrl}" class="btn">Read Full Article &rarr;</a>
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Vendora Global Solutions. All rights reserved.</p>
      <p>You received this email because you subscribed to the VGS blog newsletter.</p>
    </div>
  </div>
</body>
</html>
  `;

  let sentCount = 0;
  const failures: { email: string; reason: string }[] = [];

  // Send in controlled concurrent chunks (5 concurrent requests) to respect Resend rate limits
  const concurrency = 5;
  for (let i = 0; i < uniqueEmails.length; i += concurrency) {
    const chunk = uniqueEmails.slice(i, i + concurrency);
    const chunkResults = await Promise.allSettled(
      chunk.map(async (email) => {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `New Blog: ${blog.title}`,
          html: emailHtml,
        });

        if (error) {
          throw new Error(error.message || 'Unknown Resend error');
        }
        return { email, id: data?.id };
      })
    );

    chunkResults.forEach((result, idx) => {
      const email = chunk[idx];
      if (result.status === 'fulfilled') {
        sentCount++;
      } else {
        const reason = result.reason?.message || 'Failed to send';
        failures.push({ email, reason });
        console.error(`[Email Service] Failed to send broadcast to ${email}: ${reason}`);
      }
    });
  }

  let warning: string | undefined;
  if (isSandboxSender && failures.length > 0) {
    warning = 'Some or all emails failed because Resend is in testing mode (onboarding@resend.dev) which only allows sending to your verified account email.';
  }

  return {
    success: sentCount > 0,
    sentCount,
    totalCount: uniqueEmails.length,
    failures,
    warning,
  };
}
