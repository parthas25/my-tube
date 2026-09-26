import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MeowTube",
    template: "%s · MeowTube",
  },
  description: "A world of cat videos, for cat lovers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f6f7f8] font-sans text-[#1c1c1c]">
        {children}
      </body>
    </html>
  );
}
