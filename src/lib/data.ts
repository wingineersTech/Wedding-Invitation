import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "siteData.json");

export interface SiteData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  location: string;
  adminPassword?: string;
  countdownVideoUrl?: string;
  countdownTargetDate?: string;
  backgroundMusicUrl?: string;
  lagunDate?: string;
  lagunTime?: string;
  lagunLocation?: string;
  haldiDate?: string;
  haldiTime?: string;
  haldiLocation?: string;
  sangeetDate?: string;
  sangeetTime?: string;
  sangeetLocation?: string;
  weddingEventTime?: string;
  weddingLocation?: string;
  venue1Name?: string;
  venue1Description?: string;
  venue1Events?: string;
  venue1MapUrl?: string;
  venue1DirectionsUrl?: string;
  venue2Name?: string;
  venue2Description?: string;
  venue2Events?: string;
  venue2MapUrl?: string;
  venue2DirectionsUrl?: string;
}

export function getSiteData(): SiteData {
  try {
    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    // Return sensible defaults if file is missing
    return {
      groomName: "Mayank",
      brideName: "Manisha",
      weddingDate: "November 29, 2025",
      location: "New York City",
      countdownVideoUrl: "https://cdn.pixabay.com/video/2019/11/24/29517-376510489_large.mp4",
      countdownTargetDate: "2025-11-29T00:00:00",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      lagunDate: "NOVEMBER 26, 2025",
      lagunTime: "10:00 AM onwards",
      lagunLocation: "Family Residence",
      haldiDate: "NOVEMBER 27, 2025",
      haldiTime: "9:00 AM onwards",
      haldiLocation: "Family Residence",
      sangeetDate: "NOVEMBER 28, 2025",
      sangeetTime: "7:00 PM onwards",
      sangeetLocation: "Royal Ballroom",
      weddingEventTime: "4:00 PM onwards",
      weddingLocation: "St. Patrick's Cathedral",
      venue1Name: "Family Residence",
      venue1Description: "Groom's Home, Mumbai",
      venue1Events: "LAGUN & HALDI",
      venue1MapUrl: "https://maps.google.com/maps?q=Mumbai,+India&t=m&z=10&ie=UTF8&iwloc=&output=embed&z=10",
      venue1DirectionsUrl: "https://maps.google.com/?q=Mumbai",
      venue2Name: "The Royal Palace",
      venue2Description: "Mumbai",
      venue2Events: "SANGEET & WEDDING",
      venue2MapUrl: "https://maps.google.com/maps?q=Mumbai,+India&t=m&z=10&ie=UTF8&iwloc=&output=embed&z=10",
      venue2DirectionsUrl: "https://maps.google.com/?q=Mumbai",
    };
  }
}

export function saveSiteData(data: Partial<SiteData>) {
  const currentData = getSiteData();
  const newData = { ...currentData, ...data };
  fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), "utf-8");
  return newData;
}
