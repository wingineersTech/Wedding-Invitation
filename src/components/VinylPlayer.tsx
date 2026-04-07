"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export function VinylPlayer({ musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }: { musicUrl?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // We create the audio element only on the client side
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [musicUrl]);

  // Listen for the custom global event
  useEffect(() => {
    const handleGlobalStart = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio playback failed", e));
      }
    };

    window.addEventListener("play-wedding-music", handleGlobalStart);
    return () => window.removeEventListener("play-wedding-music", handleGlobalStart);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`fixed top-6 right-6 z-[100] flex items-center gap-4 transition-all duration-1000 ${(!hasScrolled && !isPlaying) ? 'opacity-0 pointer-events-none translate-y-[-20px]' : 'opacity-100 translate-y-0'}`}>
      {/* Helper text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isPlaying ? 0 : 0.8, x: isPlaying ? 20 : 0 }}
        className="text-gold-300 font-sans text-xs tracking-widest uppercase pointer-events-none hidden md:block"
      >
        {isPlaying ? "Playing..." : "Tap for Music"}
      </motion.div>

      {/* Vinyl Record */}
      <button
        onClick={togglePlay}
        className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer focus:outline-none transition-transform hover:scale-105 hover:box-glow"
        aria-label={isPlaying ? "Pause music" : "Play background music"}
      >
        {/* Outer Black Vinyl Grooves */}
        <div 
          className={`absolute inset-0 rounded-full bg-[#111] shadow-[0_0_15px_rgba(212,175,55,0.2)] border-2 border-[#222] flex items-center justify-center overflow-hidden
            ${isPlaying ? "animate-[spin_4s_linear_infinite]" : "transition-transform duration-1000"}
          `}
        >
          {/* Subtle record grooves lines */}
          <div className="absolute inset-1 rounded-full border border-white/5 disabled" />
          <div className="absolute inset-3 rounded-full border border-white/10 disabled" />
          <div className="absolute inset-5 rounded-full border border-white/5 disabled" />
          
          {/* Gold Center Label */}
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gold-gradient relative flex items-center justify-center border border-gold-300">
            {/* Center spindle hole */}
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            {/* Tiny icon visible when hovering */}
            <Music className="absolute w-3 h-3 text-dark-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Vinyl Shine Reflection (doesn't spin, but overlaid) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform -rotate-45 pointer-events-none rounded-full" />
        </div>
      </button>
    </div>
  );
}
