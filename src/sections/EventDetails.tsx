import { FadeIn } from "@/components/FadeIn";
import { MapPin, CalendarClock, GlassWater } from "lucide-react";

export function EventDetails() {
  return (
    <section className="py-24 md:py-32 px-4 bg-dark-500 relative">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-script text-5xl md:text-7xl text-gold-300 mb-4 gold-glow">When & Where</h2>
            <div className="h-px w-24 bg-gold-gradient mx-auto"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={0.2}>
            <div className="glass-card p-10 md:p-14 text-center rounded-sm h-full flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-2">
                <CalendarClock className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-serif text-2xl text-gold-200">The Ceremony</h3>
              <div className="text-foreground/70 font-sans space-y-2">
                <p className="font-medium text-foreground">Saturday, October 24, 2026</p>
                <p>4:00 PM in the afternoon</p>
                <p className="pt-4 text-gold-100 font-serif">St. Patrick's Cathedral</p>
                <p>5th Ave, New York, NY 10022</p>
              </div>
              <a href="#" className="mt-6 flex items-center gap-2 text-sm uppercase tracking-widest text-gold-500 hover:text-gold-300 transition-colors">
                <MapPin className="w-4 h-4" /> View Map
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="glass-card p-10 md:p-14 text-center rounded-sm h-full flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-2">
                <GlassWater className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-serif text-2xl text-gold-200">The Reception</h3>
              <div className="text-foreground/70 font-sans space-y-2">
                <p className="font-medium text-foreground">Saturday, October 24, 2026</p>
                <p>6:00 PM until late</p>
                <p className="pt-4 text-gold-100 font-serif">The Plaza Hotel</p>
                <p>768 5th Ave, New York, NY 10019</p>
              </div>
              <a href="#" className="mt-6 flex items-center gap-2 text-sm uppercase tracking-widest text-gold-500 hover:text-gold-300 transition-colors">
                <MapPin className="w-4 h-4" /> View Map
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
