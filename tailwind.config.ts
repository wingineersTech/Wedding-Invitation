import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ededed",
        gold: {
          100: '#FDFBF4',
          200: '#FAF4E3',
          300: '#F3E5AB',
          400: '#EBD175',
          500: '#D4AF37', // metallic gold
          600: '#B08D2A',
          700: '#8A6E21',
          800: '#634E17',
          900: '#3D300E',
        },
        dark: {
          100: '#2A2A2A',
          200: '#202020',
          300: '#181818',
          400: '#111111',
          500: '#0A0A0A',
          600: '#050505',
          700: '#000000',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
        script: ['var(--font-billion-dreams)', 'cursive', 'Georgia'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #B08D2A, #F3E5AB, #D4AF37)',
        'dark-gradient': 'linear-gradient(to bottom, #111111, #050505)',
      },
    },
  },
  plugins: [],
} satisfies Config;
