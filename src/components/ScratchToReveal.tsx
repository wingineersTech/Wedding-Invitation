"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScratchToReveal({ children }: { children: React.ReactNode }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const scratchedPixels = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      if (isRevealed || !containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Use higher pixel density for sharpness on retina screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);

      // Clean Slate
      ctx.globalCompositeOperation = "source-over";

      // 1. Draw solid Gold Gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#C59B27"); // dark gold
      gradient.addColorStop(0.3, "#FCECA1"); // bright gold glare
      gradient.addColorStop(0.7, "#D4AF37"); // standard gold
      gradient.addColorStop(1, "#8A6E21"); // deep shadow
      ctx.fillStyle = gradient;
      
      // Give the scratch card rounded corners matching the card
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 32); // Assuming 2rem (32px) border radius from parent
      ctx.fill();

      // 2. Add diagonal scratch texture overlay
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      for (let i = -width; i < width * 2; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }

      // 3. Add Golden Glowing Effect / Border
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 230, 150, 0.4)";
      ctx.strokeRect(2, 2, width - 4, height - 4);

      // 4. "SCRATCH TO REVEAL" text mapping
      ctx.fillStyle = "rgba(0,0,0,0.6)"; // Dark text for contrast
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Canvas letter-spacing hack
      const text = "✦ SCRATCH TO REVEAL ✦";
      const spacedText = text.split("").join(String.fromCharCode(8202)); 
      ctx.fillText(spacedText, width / 2, height / 2);

      // Set to erase mode
      ctx.globalCompositeOperation = "destination-out";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isRevealed]);

  // Scratch Drawing Logic
  const scratch = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDrawing.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    
    // Normalize coordinates for mouse and touch
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Draw the "scratch" circle (eraser)
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Check hit logic (approximate by drag length to avoid heavygetImageData loops)
    scratchedPixels.current += 1;
    
    // If user has rubbed roughly ~35 times over the area, fade it out entirely
    if (scratchedPixels.current > 35) {
      setIsRevealed(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full select-none" style={{ touchAction: 'none' }}>
       {/* Hidden Content Beneath */}
       {children}

       {/* Top Canvas Layer */}
       <AnimatePresence>
         {!isRevealed && (
           <motion.canvas
              key="scratch-canvas"
              ref={canvasRef}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-50 cursor-crosshair rounded-[2rem] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              onMouseDown={() => (isDrawing.current = true)}
              onMouseUp={() => (isDrawing.current = false)}
              onMouseLeave={() => (isDrawing.current = false)}
              onMouseMove={scratch}
              onTouchStart={(e) => { isDrawing.current = true; scratch(e); }}
              onTouchEnd={() => (isDrawing.current = false)}
              onTouchMove={(e) => {
                 // Prevent page scroll while scratching
                 // Note: we use touchAction: 'none' above which handles vertical scrolling
                 scratch(e); 
              }}
           />
         )}
       </AnimatePresence>
    </div>
  );
}
