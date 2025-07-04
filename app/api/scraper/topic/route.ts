import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // Log the topic to the server console
    console.log(`Scraping started for topic: "${topic}"`);

    // Here you would typically trigger the actual scraping service.
    // For now, we just return a success message as per the spec.

    return NextResponse.json({ status: 'scraping_started' });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
