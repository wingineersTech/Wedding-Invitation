import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getSiteData, saveSiteData } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    const currentData = getSiteData();

    // Security verify
    if (!password || password !== currentData.adminPassword) {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin Password" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Sanitize filename to avoid weird character path traversal issues
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    
    // Determine path
    const uploadDir = path.join(process.cwd(), "public", "videos");
    const filepath = path.join(uploadDir, safeFilename);

    // Write file to /public/videos/
    await writeFile(filepath, buffer);

    // Save internal path mapping to our JSON db
    const videoUrl = `/videos/${safeFilename}`;
    saveSiteData({ countdownVideoUrl: videoUrl });

    return NextResponse.json({ success: true, url: videoUrl, message: "Video completely mapped!" });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Server upload failed." }, { status: 500 });
  }
}
