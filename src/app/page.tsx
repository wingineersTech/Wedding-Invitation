import dynamic from "next/dynamic";
import { Hero } from "@/sections/Hero";
import { Countdown } from "@/sections/Countdown";
import { VinylPlayer } from "@/components/VinylPlayer";

import { getSiteData, SiteData } from "@/lib/data";

const EventsCarousel = dynamic<Partial<SiteData>>(() => import("@/sections/EventsCarousel").then(mod => mod.EventsCarousel));
const Venue = dynamic<Partial<SiteData>>(() => import("@/sections/Venue").then(mod => mod.Venue));
const RSVP = dynamic(() => import("@/sections/RSVP").then(mod => mod.RSVP));
const Closing = dynamic<Partial<SiteData>>(() => import("@/sections/Closing").then(mod => mod.Closing));

export default function Home() {
  const siteData = getSiteData();
  return (
    <main className="min-h-screen bg-background w-full relative">
      <VinylPlayer musicUrl={siteData.backgroundMusicUrl} />
      <Hero {...siteData} />
      <Countdown {...siteData} />
      <EventsCarousel {...siteData} />
      <Venue {...siteData} />
      <RSVP />
      <Closing {...siteData} />
    </main>
  );
}
