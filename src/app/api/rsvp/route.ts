import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSiteData } from "@/lib/data";

const dataFilePath = path.join(process.cwd(), "data", "rsvpData.json");

// Helper to reliably parse the RSVPs
function getRSVPs() {
  try {
    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    // If file doesn't exist or is corrupt, return empty array
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");
    const siteData = getSiteData();

    // Verify admin access before releasing personal guest list info
    if (password !== "Hl5tmrj9fi5") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rsvps = getRSVPs();
    return NextResponse.json({ success: true, rsvps }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Structure the incoming RSVP submission
    const newRSVP = {
      id: Date.now().toString(),
      name: body.name || "Unknown",
      guests: parseInt(body.guests) || 1,
      attendance: body.attendance || "yes",
      timestamp: new Date().toISOString()
    };

    const currentRSVPs = getRSVPs();
    currentRSVPs.push(newRSVP);

    // Save back to local JSON
    fs.writeFileSync(dataFilePath, JSON.stringify(currentRSVPs, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "RSVP received successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save RSVP." }, { status: 500 });
  }
}
