import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalAmbientBackground } from "@/components/GlobalAmbientBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-cormorant" });

const billionDreams = localFont({
  src: [
    {
      path: './fonts/BillionDreams_PERSONAL.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-billion-dreams',
  display: 'swap',
});

import { getSiteData } from "@/lib/data";

export function generateMetadata(): Metadata {
  const siteData = getSiteData();
  const groom = siteData.groomName || "Mayank";
  const bride = siteData.brideName || "Manisha";
  
  return {
    title: `${groom} & ${bride} | Wedding Invitation`,
    description: `Join us to celebrate the wedding of ${groom} and ${bride}.`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth snap-y snap-mandatory">
      <body className={`${inter.variable} ${playfair.variable} ${billionDreams.variable} ${greatVibes.variable} ${cormorant.variable} antialiased bg-dark-600 text-foreground`}>
        <GlobalAmbientBackground />
        {children}
      </body>
    </html>
  );
}
