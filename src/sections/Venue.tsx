"use client";

import { FadeIn } from "@/components/FadeIn";
import { MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import { SiteData } from "@/lib/data";

export function Venue({ 
  venue1Name = "Family Residence",
  venue1Description = "Groom's Home",
  venue1Events = "LAGUN & HALDI",
  venue1MapUrl = "https://maps.google.com/maps?q=Mumbai,+India&t=m&z=10&ie=UTF8&iwloc=&output=embed&z=10",
  venue1DirectionsUrl = "https://maps.google.com/?q=Mumbai",
  venue2Name = "The Royal Palace",
  venue2Description = "Mumbai",
  venue2Events = "SANGEET & WEDDING",
  venue2MapUrl = "https://maps.google.com/maps?q=Mumbai,+India&t=m&z=10&ie=UTF8&iwloc=&output=embed&z=10",
  venue2DirectionsUrl = "https://maps.google.com/?q=Mumbai"
}: Partial<SiteData>) {
  const locations = [
    {
      name: venue1Name,
      description: venue1Description,
      events: venue1Events,
      mapUrl: venue1MapUrl,
      directionsUrl: venue1DirectionsUrl,
    },
    {
      name: venue2Name,
      description: venue2Description,
      events: venue2Events,
      mapUrl: venue2MapUrl,
      directionsUrl: venue2DirectionsUrl,
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 bg-[#050505] relative overflow-hidden">
      {/* Optional lantern graphic absolute on top left if needed to match context */}
      <div className="absolute top-12 left-4 md:left-12 opacity-30 pointer-events-none hidden md:block">
         <Image src="/images/lantern.svg" alt="" width={60} height={120} className="w-[40px] md:w-[60px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16 relative">
            <p className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase text-gold-500 mb-2">
              Find Your Way
            </p>
            <h2 className="text-6xl md:text-8xl text-gold-300 drop-shadow-md" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>
              Venue
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-10">
          {locations.map((loc, index) => (
            <FadeIn key={loc.name} delay={0.2 * index} direction="up">
              <div className="w-full rounded-2xl overflow-hidden bg-[#0a0a0a] border border-gold-500/20 shadow-2xl">
                
                {/* Edge-to-Edge Map Frame */}
                <div className="w-full h-56 md:h-64 relative bg-[#111]">
                  <iframe
                    src={loc.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(80%) contrast(150%)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${loc.name}`}
                  ></iframe>
                  {/* Subtle overlay to fade map edges slightly into the dark theme */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/50" />
                </div>

                {/* Card Content Block */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-1">
                    <MapPin className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                    <h3 className="text-2xl text-white/90" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{loc.name}</h3>
                  </div>
                  
                  <p className="text-[13px] text-white/60 pl-8 tracking-wide" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    {loc.description}
                  </p>

                  <div className="h-px w-full bg-white/10 my-6" />

                  <div className="flex items-center justify-between">
                    <p className="text-[11px] md:text-[12px] tracking-[0.1em] font-medium text-gold-600/70 uppercase" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                      {loc.events}
                    </p>
                    <a 
                      href={loc.directionsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-gold-500 hover:text-gold-400 uppercase transition-colors"
                    >
                      <Navigation className="w-3 h-3 rotate-45" strokeWidth={2} /> 
                      Get Directions
                    </a>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
