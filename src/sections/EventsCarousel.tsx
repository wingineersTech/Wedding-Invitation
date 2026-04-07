"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { AnimatePresence, motion } from "framer-motion";
import { GoldButton } from "@/components/GoldButton";
import { MapPin, Clock, ChevronLeft, ChevronRight, Eye } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SiteData } from "@/lib/data";

export function EventsCarousel({ 
  weddingDate = "November 29, 2025",
  lagunDate = "NOVEMBER 26, 2025",
  lagunTime = "10:00 AM onwards",
  lagunLocation = "Family Residence",
  haldiDate = "NOVEMBER 27, 2025",
  haldiTime = "9:00 AM onwards",
  haldiLocation = "Family Residence",
  sangeetDate = "NOVEMBER 28, 2025",
  sangeetTime = "7:00 PM onwards",
  sangeetLocation = "Royal Ballroom",
  weddingEventTime = "4:00 PM onwards",
  weddingLocation = "St. Patrick's Cathedral"
}: Partial<SiteData>) {
  const [showAll, setShowAll] = useState(false);

  const events = [
    {
      title: "Lagun",
      date: lagunDate,
      time: lagunTime,
      location: lagunLocation,
      image: "/images/event-lagun.png",
    },
    {
      title: "Haldi",
      date: haldiDate,
      time: haldiTime,
      location: haldiLocation,
      image: "/images/event-haldi.png",
    },
    {
      title: "Sangeet",
      date: sangeetDate,
      time: sangeetTime,
      location: sangeetLocation,
      image: "/images/event-sangeet.png",
    },
    {
      title: "Wedding",
      date: weddingDate.toUpperCase(),
      time: weddingEventTime,
      location: weddingLocation,
      image: "/images/event-wedding.png",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center min-h-[100dvh]">
      
      {/* Immersive Dreamy Wedding Background Setup */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/events-bg.jpg"
          alt="Luxury Cinematic Wedding Environment"
          fill
          className="object-cover opacity-[0.45]"
        />
        {/* Gradients to blend text beautifully onto the wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <FadeIn delay={0.1}>
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/70 mb-2">
               Wedding Celebrations
            </p>
            <h2 className="text-5xl md:text-7xl text-white drop-shadow-md" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>
              Our Events
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <div className="w-full relative"> 
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{ 
                 el: '.swiper-custom-pagination',
                 clickable: true 
              }}
              navigation={{
                 prevEl: '.swiper-custom-prev',
                 nextEl: '.swiper-custom-next',
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="w-full !px-4 pb-12"
              initialSlide={1}
            >
              {events.map((event, index) => (
                <SwiperSlide key={index} className="!w-[270px] md:!w-[320px] !h-[420px] md:!h-[480px]">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden group shadow-2xl border-[1px] border-white/10 bg-[#0a0a0a]">
                    
                    <div className="absolute inset-0 bg-white/5 z-0" />

                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover absolute inset-0 z-0"
                    />

                    {/* Very subtle gradient overlay for text readability without washing out image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                    {/* Top Right Little Emblem */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 z-20 flex items-center justify-center">
                       <span className="text-sm shadow-sm opacity-80">🌸</span>
                    </div>
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-20 pb-8">
                      <p className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] font-medium uppercase text-white/70 mb-2 drop-shadow-md">
                        {event.date}
                      </p>
                      <h3 className="text-5xl md:text-6xl text-white mb-4 drop-shadow-md" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>
                        {event.title}
                      </h3>
                      
                      <div className="space-y-3">
                        <p className="text-[12px] md:text-[14px] text-white/90 flex items-center gap-3 drop-shadow-md" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                          <Clock className="w-[14px] h-[14px] opacity-70" /> <span className="tracking-wide">{event.time}</span>
                        </p>
                        <p className="text-[12px] md:text-[14px] text-white/90 flex items-center gap-3 drop-shadow-md" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                          <MapPin className="w-[14px] h-[14px] opacity-70" /> <span className="tracking-wide">{event.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation & Pagination */}
            <div className="flex items-center justify-center gap-6 mt-8 relative z-10">
               <button className="swiper-custom-prev w-12 h-12 rounded-full border-[0.5px] border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/10 transition-all cursor-pointer">
                  <ChevronLeft className="w-5 h-5 ml-[-2px]" />
               </button>
               
               <div className="flex gap-2 swiper-custom-pagination min-w-[70px] justify-center"></div>

               <button className="swiper-custom-next w-12 h-12 rounded-full border-[0.5px] border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/10 transition-all cursor-pointer">
                  <ChevronRight className="w-5 h-5 mr-[-2px]" />
               </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} direction="up">
          <div className="text-center mt-12 mb-8 relative z-10">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white/90 font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <Eye className="w-4 h-4 opacity-70" />
              {showAll ? "CLOSE" : "VIEW ALL EVENTS"}
            </button>
          </div>
        </FadeIn>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative z-10 w-full overflow-hidden"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 max-w-5xl mx-auto pb-12 pt-4">
                {events.map((event, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/20 group">
                    <Image 
                       src={event.image} 
                       alt={event.title} 
                       fill 
                       className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-90" />
                    <div className="absolute bottom-0 left-0 p-4 z-20">
                      <h4 className="text-3xl md:text-4xl text-white drop-shadow-md mb-1" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>{event.title}</h4>
                      <p className="font-sans text-[7px] md:text-[9px] tracking-[0.2em] text-white/70 uppercase drop-shadow-md">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        /* Swiper Active/Inactive Slide Visual Hack */
        .swiper-slide {
           transition: opacity 0.5s ease, filter 0.5s ease !important;
        }
        .swiper-slide:not(.swiper-slide-active) {
           filter: blur(4px) brightness(0.5);
           opacity: 0; /* Hides neighbor slides to exactly match user reference */
           pointer-events: none;
        }
        .swiper-slide-active {
           filter: blur(0px) brightness(1);
           opacity: 1;
        }

        /* Custom Pagination Dots */
        .swiper-custom-pagination {
           display: flex;
           align-items: center;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          width: 5px !important;
          height: 5px !important;
          margin: 0 4px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9) !important;
          width: 20px !important;
          border-radius: 4px !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
}
