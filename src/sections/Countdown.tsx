"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { SiteData } from "@/lib/data";
import { ScratchToReveal } from "@/components/ScratchToReveal";

export function Countdown({ 
  weddingDate = "November 29, 2025",
  countdownTargetDate = "2025-11-29T00:00:00",
  countdownVideoUrl = "https://cdn.pixabay.com/video/2019/11/24/29517-376510489_large.mp4",
  groomName = "Mayank",
  brideName = "Manisha",
  location = "Mumbai"
}: Partial<SiteData>) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const targetDate = new Date(countdownTargetDate);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft(); // initial calc
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) return null; // Avoid hydration mismatch

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  // Parse the explicitly written text date from the admin panel (e.g. "November 29, 2025")
  const textDateParts = weddingDate.split(',');
  const mainDateStr = textDateParts[0]?.trim() || "Nov 29";
  const yearStr = textDateParts[1] ? `, ${textDateParts[1].trim()}` : ", 2025";

  return (
    <section className="py-24 md:py-32 px-4 relative flex items-center justify-center min-h-[100dvh] overflow-hidden bg-dark-700">
      
      {/* Immersive Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen"
      >
        <source src={countdownVideoUrl} type="video/mp4" />
        {/* Note: This is an elegant gold particles placeholder. You can replace the src with a local '/videos/ganesha.mp4' */}
      </video>

      {/* Dark Vignette Overlay for Text Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--tw-gradient-stops))] from-dark-700/40 via-dark-700/80 to-dark-700 z-0 pointer-events-none"></div>

      {/* Top Left Lantern Icon - from reference */}
      <FadeIn delay={1.5} className="absolute top-8 left-6 z-20 flex flex-col items-center opacity-80 hidden md:flex">
        <div className="w-px h-10 bg-gold-600/70"></div>
        <div className="w-6 h-8 border border-gold-600/70 rounded-b-md rounded-t-sm flex items-center justify-center relative mt-1 overflow-hidden shadow-[0_0_10px_rgba(212,175,55,0.2)]">
          <div className="absolute inset-0 border-b-2 border-gold-600/40"></div>
          {/* Glowing light inside */}
          <div className="w-1 h-3 bg-gold-400 rounded-full blur-[2px] animate-pulse"></div>
        </div>
        <span className="text-[7px] uppercase tracking-[0.3em] text-gold-600/80 mt-2 font-sans font-bold">Light</span>
      </FadeIn>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
        <FadeIn delay={0.2}>
          <div className="mb-10 text-center">
             <p className="font-sans text-[10px] md:text-sm tracking-[0.3em] uppercase text-gold-500 mb-4 opacity-80">
                Counting Down To
             </p>
             <h2 className="text-5xl md:text-7xl text-gold-200 tracking-wide gold-glow mt-4" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>
              The Big Day
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {timeUnits.map((unit, index) => (
            <FadeIn key={unit.label} delay={0.1 * index} direction="up">
              <div className="flex flex-col items-center">
                <div className="w-20 h-24 md:w-[100px] md:h-[110px] rounded-[14px] border-[1px] border-gold-500/30 flex items-center justify-center bg-[#050505]/80 backdrop-blur-md relative overflow-hidden transition-all duration-300">
                  <AnimatePresence mode="popLayout">
                     <motion.span
                        key={unit.value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, position: "absolute" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="font-serif text-3xl md:text-5xl text-gold-300 font-medium tracking-tight drop-shadow-md"
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </motion.span>
                  </AnimatePresence>
                </div>
                <span className="mt-5 font-sans text-[9px] md:text-xs uppercase tracking-[0.3em] text-foreground/50">
                  {unit.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quote Block */}
        <FadeIn delay={0.6} direction="up" className="max-w-xl mx-auto mb-16 px-4">
           <p className="text-sm md:text-lg text-foreground/80 italic leading-relaxed" style={{ fontFamily: '"Playfair Display", serif' }}>
             "Entering into a new life of togetherness, with the<br className="hidden md:block" /> blessings of our elders and loved ones."
           </p>
        </FadeIn>

        {/* Save The Date Badge Box - Wrapped heavily in Scratch To Reveal */}
        <FadeIn delay={0.8} direction="up" className="w-[90%] max-w-[450px] mx-auto relative mb-12">
           <ScratchToReveal>
             <div className="w-full relative py-10 px-4 md:px-6 rounded-[2rem] border border-gold-500/10 bg-[#0a0a0a]/70 backdrop-blur-lg flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(212,175,55,0.05)] overflow-hidden">
                {/* Box Inner Glow Top */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
                
                <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-sans text-gold-500/70 mb-4 font-semibold">
                   Save The Date
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
                   <span className="text-5xl md:text-6xl text-gold-200 gold-glow text-center leading-tight" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>{mainDateStr}</span>
                   <span className="text-xl md:text-2xl text-gold-200 font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>{yearStr}</span>
                </div>

                {/* Heart Separator Line */}
                <div className="flex items-center gap-4 opacity-70 mb-6">
                   <div className="w-8 h-[1px] bg-gold-400"></div>
                   <span className="text-gold-400 text-xs">♥</span>
                   <div className="w-8 h-[1px] bg-gold-400"></div>
                </div>

                <p className="font-serif text-[10px] md:text-[11px] text-foreground/60 italic tracking-wider">
                   {groomName} &amp; {brideName} • {location}
                </p>
             </div>
           </ScratchToReveal>
        </FadeIn>

        {/* Closing Signature */}
        <FadeIn delay={1.2} direction="up">
           <p className="text-[10px] uppercase font-sans tracking-[0.3em] text-gold-500/60 font-semibold cursor-default">
             ✦ You're Invited ✦
           </p>
        </FadeIn>
      </div>
    </section>
  );
}
