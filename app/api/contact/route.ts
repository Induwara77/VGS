import { NextResponse } from 'next/server';

const allowedOrigins = [
  'https://www.vendorglobalsolutions.com', 
  'https://vendorglobalsolutions.com',
  'http://localhost:3000'
];

export async function POST(request: Request) {
  // 1. Check Origin (CORS protection)
  const origin = request.headers.get('origin') || '';
  if (!allowedOrigins.includes(origin)) {
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

    const sheetDbUrl = process.env.SHEETDB_API_URL;
    if (!sheetDbUrl) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 3. Send Data to SheetDB securely from the server
    const sheetResponse = await fetch(sheetDbUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            name: name.trim(),
            email: email.trim(),
            service: service || 'General Inquiry',
            message: message.trim(),
            date: new Date().toISOString(),
          }
        ]
      }),
    });

    if (!sheetResponse.ok) {
      throw new Error('Failed to save to spreadsheet');
    }

    return NextResponse.json({ success: true, message: 'Inquiry saved successfully!' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}