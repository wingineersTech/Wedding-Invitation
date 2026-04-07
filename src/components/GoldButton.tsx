import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

export function GoldButton({ className, variant = "solid", children, ...props }: GoldButtonProps) {
  const baseStyles = "relative px-8 py-3 rounded-md transition-all duration-300 font-semibold tracking-widest text-sm uppercase overflow-hidden group";
  
  const variants = {
    solid: "bg-gold-gradient text-dark-700 hover:scale-[1.02]",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-500/10 hover:scale-[1.02]"
  };

  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Animated glowing backdrop */}
      <div className={cn(
        "absolute -inset-1 rounded-md blur opacity-30 group-hover:opacity-70 transition duration-1000 animate-pulse",
        variant === 'solid' ? "bg-gold-gradient" : "bg-gold-500/50"
      )}></div>
      <button className={cn(baseStyles, variants[variant], className)} {...props}>
        <span className="relative z-10">{children}</span>
      </button>
    </div>
  );
}
