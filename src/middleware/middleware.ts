import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey || apiKey !== process.env.API_KEY!) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}
