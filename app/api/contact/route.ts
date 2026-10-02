import { NextResponse } from 'next/server';

function isOriginAllowed(origin: string, host: string | null): boolean {
  if (!origin) return true; // same-origin or server-side invocation
  try {
    const url = new URL(origin);
    const hostname = url.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    if (hostname === 'vendoraglobalsolutions.com' || hostname.endsWith('.vendoraglobalsolutions.com')) return true;
    if (hostname.endsWith('.vercel.app')) return true;
    if (host && (origin.includes(host) || host.includes(hostname))) return true;
  } catch {
    return false;
  }
  return false;
}

export async function POST(request: Request) {
  // 1. Origin verification
  const origin = request.headers.get('origin') || '';
  const host = request.headers.get('host');
  if (!isOriginAllowed(origin, host)) {
    return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // 2. Server-side Input Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Valid name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const sheetDbUrl = process.env.SHEETDB_API || process.env.SHEETDB_API_URL;
    if (!sheetDbUrl) {
      console.error('[API /api/contact] Missing SHEETDB_API or SHEETDB_API_URL in environment');
      return NextResponse.json({ error: 'Server configuration error: Database endpoint not configured' }, { status: 500 });
    }

    // 3. Send Data to SheetDB securely from the server
    // Note: Column names in the spreadsheet match capitalized keys: Name, Email, Service, Message, Date
    const sheetResponse = await fetch(sheetDbUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            Name: name.trim(),
            Email: email.trim(),
            Service: service || 'General Inquiry',
            Message: message.trim(),
            Date: new Date().toLocaleString(),
          }
        ]
      }),
    });

    if (!sheetResponse.ok) {
      const errText = await sheetResponse.text().catch(() => '');
      console.error('[API /api/contact] SheetDB responded with error:', sheetResponse.status, errText);
      throw new Error(`Failed to save to spreadsheet (Status ${sheetResponse.status})`);
    }

    return NextResponse.json({ success: true, message: 'Inquiry saved successfully!' }, { status: 200 });

  } catch (error: any) {
    console.error('[API /api/contact] Submission error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}