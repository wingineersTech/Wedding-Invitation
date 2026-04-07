"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function GlobalAmbientBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate particles for a magic ambient luxury feel. 
    // They are positioned fixed so they follow the user or seem to drift through the screen.
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-200"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.1,
            boxShadow: "0 0 10px 2px rgba(212,175,55,0.3)",
          }}
          animate={{
            y: [-100, 100], // drift across screen over long timespan
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
