import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'views.json');

// Helper to read current count
function getCount() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { count: 0 };
    }
    const file = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(file);
  } catch {
    return { count: 0 };
  }
}

// Helper to write new count
function setCount(count: number) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count }), 'utf8');
  } catch (error) {
    console.error("Failed to write views count", error);
  }
}

export async function GET() {
  try {
    const { count } = getCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: 'Failed to read views' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    // Check for cookie: has_viewed_profile=true
    const hasViewed = cookieHeader.includes('has_viewed_profile=true');

    let { count: currentCount } = getCount();

    if (!hasViewed) {
      currentCount += 1;
      setCount(currentCount);
    }
    
    // Create response
    const response = NextResponse.json({ count: currentCount });

    // Set cookie if not present
    if (!hasViewed) {
        response.cookies.set({
            name: 'has_viewed_profile',
            value: 'true',
            httpOnly: true,
            path: '/',
            maxAge: 31536000,
            sameSite: 'strict',
        });
    }

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
  }
}
