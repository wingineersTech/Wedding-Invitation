import { NextResponse } from 'next/server';
import { getSiteData, saveSiteData } from '@/lib/data';

// Generic GET for the admin panel to fetch current config
export async function GET() {
  const data = getSiteData();
  // Strip password object
  const { adminPassword, ...safeData } = data;
  return NextResponse.json(safeData);
}

// POST endpoint for updates
export async function POST(request: Request) {
  try {
    const { password, data } = await request.json();

    if (password !== "Hl5tmrj9fi5") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Save
    saveSiteData(data);
    return NextResponse.json({ success: true, message: 'Settings updated successfully!' });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid Request Format' }, { status: 400 });
  }
}
