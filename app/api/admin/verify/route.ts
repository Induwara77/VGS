import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { secretKey } = await request.json();
    const configuredKey = (process.env.ADMIN_SECRET_KEY || 'vgsadmin2026').trim();

    if (!secretKey || secretKey.trim() !== configuredKey) {
      return NextResponse.json({ success: false, error: 'Invalid secret key' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}