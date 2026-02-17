import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://github-contributions-api.jogruber.de/v4/slouowzee?y=last', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}
