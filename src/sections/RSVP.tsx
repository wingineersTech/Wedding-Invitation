"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { GoldButton } from "@/components/GoldButton";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MailOpen, Navigation } from "lucide-react";

export function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
    attendance: "yes", 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    const guestsNum = parseInt(formData.guests);
    if (formData.attendance === "no") {
      // ignore guest count
    } else if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 10) {
      setError("Please enter a valid number of guests (1-10).");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 md:py-40 px-4 relative bg-[#050505] overflow-hidden">
      {/* Scattered background dots matching reference */}
      <div className="absolute top-[20%] right-[30%] w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60" />
      <div className="absolute bottom-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-gold-400 opacity-80" />
      <div className="absolute bottom-[10%] left-[10%] w-1.5 h-1.5 rounded-full bg-gold-600 opacity-40" />

      <div className="max-w-xl mx-auto relative z-10">
        <FadeIn>
          <div className="rounded-[2rem] border border-gold-500/20 overflow-hidden bg-[#0a0a0a] shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-14"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-5xl md:text-6xl text-gold-300 drop-shadow-md mb-4" style={{ fontFamily: '"Bickham Script Pro", "Great Vibes", cursive' }}>
                      Will you join us?
                    </h2>
                    <p className="text-white/60 tracking-[0.3em] uppercase text-[10px] md:text-[11px]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                      PLEASE RSVP BY OCTOBER 1ST
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 font-serif">
                    <div className="space-y-3">
                       <label htmlFor="name" className="block text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gold-500 uppercase" style={{ fontFamily: '"Playfair Display", serif' }}>
                         Your Name
                       </label>
                       <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#030303] border border-gold-500/20 rounded-xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-gold-500/50 transition-all placeholder:text-foreground/30"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Number of Guests */}
                      <div className="space-y-3">
                         <label htmlFor="guests" className={`block text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${formData.attendance === 'no' ? 'text-gold-500/40' : 'text-gold-500'}`} style={{ fontFamily: '"Playfair Display", serif' }}>
                           Number of Guests
                         </label>
                         <input
                          type="number"
                          id="guests"
                          min="1"
                          max="10"
                          disabled={formData.attendance === 'no'}
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full bg-[#030303] border border-gold-500/20 rounded-xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-gold-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Attendance Dropdown */}
                      <div className="space-y-3">
                        <label htmlFor="attendance" className="block text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gold-500 uppercase" style={{ fontFamily: '"Playfair Display", serif' }}>
                          Attending?
                        </label>
                        <div className="relative">
                          <select
                            id="attendance"
                            value={formData.attendance}
                            onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                            className="w-full bg-[#030303] border border-gold-500/20 rounded-xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-gold-500/50 transition-all appearance-none cursor-pointer"
                          >
                            <option value="yes">Yes, I'll be there</option>
                            <option value="no">No, unfortunately</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded border border-red-400/20">
                        {error}
                      </p>
                    )}

                    <div className="pt-2">
                      <button 
                         type="submit" 
                         disabled={isSubmitting} 
                         className="w-full bg-[#CD9335] hover:bg-[#B3802C] text-[#0A0A0A] font-bold tracking-[0.1em] text-[12px] md:text-[13px] py-4 md:py-5 rounded-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                         style={{ fontFamily: '"Playfair Display", serif' }}
                      >
                         <Navigation className="w-4 h-4 rotate-45 -ml-1" strokeWidth={2} />
                         {isSubmitting ? "Sending..." : "Send RSVP"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="p-16 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    <Check className="w-10 h-10 text-dark-700" strokeWidth={3} />
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-gold-200 mb-4">
                    Thank You!
                  </h3>
                  <p className="font-serif text-foreground/80 text-lg">
                    {formData.attendance === "yes"
                      ? "We look forward to celebrating with you."
                      : "We will miss you, but thank you for letting us know."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
