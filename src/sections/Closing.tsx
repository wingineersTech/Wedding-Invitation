"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { SiteData } from "@/lib/data";

export function Closing({ groomName = "Mayank", brideName = "Manisha", weddingDate = "November 29, 2025", location = "Mumbai" }: Partial<SiteData>) {
  return (
    <section className="relative py-32 md:py-48 px-4 bg-[#050505] overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      {/* Scattered background dots matching reference */}
      <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60" />
      <div className="absolute top-[35%] right-[30%] w-2 h-2 rounded-full bg-gold-500 opacity-70" />
      <div className="absolute flex top-[40%] right-[5%] w-1.5 h-1.5 rounded-full bg-gold-400 opacity-80" />
      <div className="absolute bottom-[25%] right-[25%] w-1.5 h-1.5 rounded-full bg-gold-600 opacity-50" />
      <div className="absolute bottom-[10%] left-[10%] w-1.5 h-1.5 rounded-full bg-gold-400 opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto text-center mt-auto flex flex-col items-center justify-center h-full w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          <FadeIn delay={0.1} direction="down">
            <p className="text-[10px] md:text-sm tracking-[0.3em] font-bold uppercase text-gold-500 mb-6 max-w-lg leading-relaxed" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              We can't wait to celebrate<br className="md:hidden" /> with you
            </p>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
             <h2 className="text-6xl md:text-8xl lg:text-9xl text-gold-400 drop-shadow-md mb-10 capitalize tracking-normal" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>
               See You There!
             </h2>
          </FadeIn>

          <FadeIn delay={0.5}>
             {/* Divider with Center Diamond */}
             <div className="flex items-center justify-center gap-4 w-full mb-10 opacity-70">
                <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-gold-500"></div>
                <span className="text-gold-500 text-lg md:text-xl leading-none">✦</span>
                <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-gold-500"></div>
             </div>
             
             <p className="italic text-2xl md:text-4xl text-white/70 mb-4 font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
               {groomName} &amp; {brideName}
             </p>
             <p className="text-white/50 tracking-widest text-xs md:text-sm uppercase font-bold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
               {weddingDate} • {location}
             </p>
          </FadeIn>
        </motion.div>
      </div>

      <div className="mt-auto pt-24 pb-8 w-full text-center relative z-20">
        <p className="font-sans text-gold-500/40 text-[8px] md:text-[10px] tracking-[0.2em] uppercase">
          Designed with love for {groomName} &amp; {brideName}
        </p>
      </div>
    </section>
  );
}
