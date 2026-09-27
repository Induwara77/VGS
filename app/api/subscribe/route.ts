import { NextResponse } from 'next/server';
import { addSubscriber, getAllSubscribers } from '@/app/lib/db';
import { sendWelcomeEmail } from '@/app/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const { success, alreadySubscribed } = await addSubscriber(email);

    if (alreadySubscribed) {
      return NextResponse.json(
        {
          success: true,
          alreadySubscribed: true,
          message: "You're already subscribed to our newsletter! We'll keep you updated.",
        },
        { status: 200 }
      );
    }

    // Fire welcome email asynchronously without blocking the user response
    sendWelcomeEmail(email.trim()).catch((err) => {
      console.warn('[Subscribe] Error triggering welcome email:', err);
    });

    return NextResponse.json(
      {
        success: true,
        alreadySubscribed: false,
        message: 'Thank you for subscribing! You will receive our latest blog updates.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /api/subscribe] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await getAllSubscribers();
    return NextResponse.json({
      count: subscribers.length,
      subscribers: subscribers.map((s) => ({
        email: s.email,
        subscribedAt: s.subscribedAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ count: 0, subscribers: [] }, { status: 500 });
  }
}
