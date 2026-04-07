import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

export function OurStory() {
  return (
    <section id="our-story" className="py-24 md:py-32 px-4 relative overflow-hidden text-center bg-dark-600">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <h2 className="font-script text-5xl md:text-7xl text-gold-300 mb-4 gold-glow">How We Met</h2>
            <div className="h-px w-24 bg-gold-gradient mx-auto"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-sm border border-gold-500/20 box-glow">
              <Image
                src="/images/story.png"
                alt="Our Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="text-left space-y-6 flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl text-gold-100">A chance encounter...</h3>
              <p className="text-foreground/70 leading-relaxed text-lg font-sans">
                It all started on a rainy evening in lower Manhattan. James was trying to catch a cab, and Eleanor had an extra umbrella. What was supposed to be a simple act of kindness turned into hours of conversation over coffee.
              </p>
              <p className="text-foreground/70 leading-relaxed text-lg font-sans">
                Five years, two apartments, and countless adventures later, we are thrilled to be taking this next step together. We cannot wait to celebrate our love with the people who mean the most to us.
              </p>
              <div className="pt-4">
                <p className="font-script text-4xl text-gold-400">E & J</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
