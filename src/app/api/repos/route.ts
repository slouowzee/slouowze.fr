import { NextResponse } from 'next/server';
import { getPublicRepos } from '@/lib/github';

export async function GET() {
  try {
    const repos = await getPublicRepos();
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch repos' }, { status: 500 });
  }
}
