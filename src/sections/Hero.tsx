"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { ChevronDown } from "lucide-react";
import { getSiteData, SiteData } from "@/lib/data";

// Subtle floating particle component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.3,
            boxShadow: "0 0 8px 2px rgba(212,175,55,0.4)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export function Hero({ groomName = "Mayank", brideName = "Manisha", weddingDate = "November 29, 2025" }: Partial<SiteData>) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-dark-700">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          // Fog / Blur Overlay State
          <motion.div
            key="fog-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }} // Cinematic slow ease
            className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-md bg-white/10"
            onClick={() => setIsRevealed(true)}
          >
            {/* Foggy white/light background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#e5e5e5] via-[#f5f5f5] to-[#ffffff] opacity-90" />
            
            {/* Soft pulsing fog circles */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/50 rounded-full blur-3xl pointer-events-none"
            />

            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full border border-dark-300 flex items-center justify-center mb-6 text-dark-500 box-glow shadow-white/50">
                <div className="w-4 h-4 bg-dark-500 rounded-full animate-ping" />
              </div>
              <h2 className="font-serif text-2xl tracking-[0.2em] uppercase text-dark-600">
                Tap to Reveal
              </h2>
            </motion.div>
          </motion.div>
        ) : (
          // Main Content State
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full"
          >
            {/* Dark background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-dark-700 to-dark-700 z-0"></div>

            {/* Top Left Lantern Icon */}
            <FadeIn delay={1.5} className="absolute top-8 left-6 z-20 flex flex-col items-center opacity-80">
              <div className="w-px h-10 bg-gold-600/70"></div>
              <div className="w-6 h-8 border border-gold-600/70 rounded-b-md rounded-t-sm flex items-center justify-center relative mt-1 overflow-hidden shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <div className="absolute inset-0 border-b-2 border-gold-600/40"></div>
                {/* Glowing light inside */}
                <div className="w-1 h-3 bg-gold-400 rounded-full blur-[2px] animate-pulse"></div>
              </div>
              <span className="text-[7px] uppercase tracking-[0.3em] text-gold-600/80 mt-2 font-sans font-bold">Light</span>
            </FadeIn>

            <div className="relative z-10 w-full flex flex-col items-center px-2 mt-4">
              
              {/* Pre-title */}
              <FadeIn direction="down" delay={1.5}>
                <p className="tracking-[0.4em] uppercase text-gold-500/70 text-[9px] md:text-xs mb-4 md:mb-6 font-semibold font-serif whitespace-nowrap">
                  The Wedding Celebration Of
                </p>
              </FadeIn>

              {/* Classic single-line script header */}
              <FadeIn delay={2} className="w-full text-center px-1 mb-10 md:mb-14">
                <h1 style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }} className="text-[11.5vw] sm:text-[9vw] md:text-[9vw] lg:text-[7vw] text-gold-200 gold-glow whitespace-nowrap drop-shadow-xl">
                  {groomName} <span style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }} className="text-gold-400 mx-[1vw]">&amp;</span> {brideName}
                </h1>
              </FadeIn>

              {/* Giant Luxury CSS Vinyl */}
              <FadeIn 
                delay={2.5} 
                direction="up" 
                className="flex flex-col items-center w-full mt-4 group cursor-pointer"
              >
                <div 
                  onClick={() => window.dispatchEvent(new CustomEvent('play-wedding-music'))}
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full box-glow shadow-2xl flex items-center justify-center mb-8 overflow-hidden z-20 hover:scale-105 transition-transform duration-500"
                >
                  {/* Vinyl Outer Base */}
                  <div className="absolute inset-0 bg-[#0a0804] rounded-full border-[2px] border-gold-500/40 shadow-[inset_0_0_50px_rgba(0,0,0,1)]"></div>
                  
                  {/* Conic Grooves Gradient for Hyper-Realistic 3D metallic shine */}
                  <div className="absolute inset-0 rounded-full opacity-70 mix-blend-screen bg-[conic-gradient(from_0deg,_#3D300E,_#FDFBF4,_#D4AF37,_#3D300E,_#FDFBF4,_#8A6E21,_#3D300E)] group-hover:rotate-[360deg] transition-transform duration-[15s] ease-linear"></div>
                  
                  {/* Concentric Vinyl Grooves Lines */}
                  <div className="absolute inset-2 border border-black/80 rounded-full mix-blend-overlay"></div>
                  <div className="absolute inset-6 border-[3px] border-black/60 rounded-full mix-blend-overlay"></div>
                  <div className="absolute inset-10 border border-black/80 rounded-full mix-blend-overlay"></div>
                  <div className="absolute inset-14 border-[2px] border-black/70 rounded-full mix-blend-overlay"></div>
                  <div className="absolute inset-20 border border-black/90 rounded-full mix-blend-overlay"></div>
                  <div className="absolute inset-24 border-[4px] border-black/50 rounded-full mix-blend-overlay"></div>

                  {/* Inner Record Label */}
                  <div className="absolute w-24 h-24 bg-dark-600 rounded-full border-2 border-gold-500/60 flex flex-col items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                     {/* Fine text detailing on record label */}
                     <p className="text-[4px] uppercase tracking-widest text-gold-500/40 font-sans mb-1 mt-1">Stereo</p>
                     <div className="w-12 h-12 border-[0.5px] border-gold-500/30 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#050505] rounded-full border border-gold-400"></div>
                     </div>
                     <p className="text-[5px] uppercase tracking-widest text-gold-500/60 font-serif mt-1">Side A</p>
                  </div>

                  {/* Glass highlight glare */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent rounded-r-full pointer-events-none"></div>
                </div>

                <p className="tracking-[0.4em] uppercase text-gold-600/80 text-[11px] md:text-sm font-bold font-serif drop-shadow-md">
                  Tap For Music
                </p>
              </FadeIn>

              {/* Date Block */}
              <FadeIn direction="up" delay={3} className="mt-10 mb-8 z-20">
                <p className="font-serif text-lg md:text-xl text-foreground/80 tracking-widest uppercase">
                  <span className="italic text-gold-300 pr-1 capitalize">{weddingDate.split(' ')[0]}</span> {weddingDate.split(' ').slice(1).join(' ')}
                </p>
              </FadeIn>
            </div>

            {/* Scroll indicator */}
            <FadeIn delay={4} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
               <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-sans cursor-default">
                  Scroll Down &darr;
               </span>
            </FadeIn>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
