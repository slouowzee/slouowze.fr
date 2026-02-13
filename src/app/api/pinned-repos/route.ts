
import { NextResponse } from 'next/server';
import { getPinnedRepos } from '@/lib/github';

export async function GET() {
  try {
    const pinned = await getPinnedRepos();
    return NextResponse.json(pinned);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
