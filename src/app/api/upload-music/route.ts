import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { saveSiteData } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    if (!password || password !== "Hl5tmrj9fi5") {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin Password" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Sanitize filename
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    
    const uploadDir = path.join(process.cwd(), "public", "music");
    
    // Ensure the dir exists
    if (!fs.existsSync(uploadDir)) {
       await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, safeFilename);

    // Write file to /public/music/
    await writeFile(filepath, buffer);

    // Save internal path mapping to JSON db
    const musicUrl = `/music/${safeFilename}`;
    saveSiteData({ backgroundMusicUrl: musicUrl });

    return NextResponse.json({ success: true, url: musicUrl, message: "Music securely uploaded" });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Server upload failed." }, { status: 500 });
  }
}
