"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

const SLIDES = [
  {
    image: "/cats/hero-d.jpg",
    position: "70% center",
    kicker: "Pawsome videos everyday",
    title: "MeowTube",
    subtitle: "A world of cat videos, for cat lovers",
  },
  {
    image: "/cats/hero-c.jpg",
    position: "center 28%",
    kicker: "Laughs on demand",
    title: "Funny Cats",
    subtitle: "Boxes, zoomies, and chaotic little legends",
  },
  {
    image: "/cats/hero-a.jpg",
    position: "center 18%",
    kicker: "Out in the sun",
    title: "Adventure Cats",
    subtitle: "Big eyes, blue skies, and brave little explorers",
  },
  {
    image: "/cats/hero-e.jpg",
    position: "center",
    kicker: "Every coat and color",
    title: "Cat Breeds",
    subtitle: "From fluffy gingers to tiny tabbies",
  },
  {
    image: "/cats/hero-b.jpg",
    position: "center 35%",
    kicker: "Slow down and purr",
    title: "Cozy Hours",
    subtitle: "Naps, window seats, and quiet company",
  },
];

export function HeroBanner({ onWatch }: { onWatch: () => void }) {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured cat videos"
      className="relative h-[250px] overflow-hidden rounded-[22px] sm:h-[300px] lg:h-[332px]"
    >
      <Image
        src={slide.image}
        alt=""
        fill
        priority={index === 0}
        sizes="(max-width: 1024px) 100vw, 1200px"
        className="object-cover"
        style={{ objectPosition: slide.position }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/5" />
      <div className="relative flex h-full max-w-xl flex-col justify-center px-6 text-white sm:px-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase sm:text-xs">
          {slide.kicker}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {slide.title}
        </h1>
        <p className="mt-2 max-w-md text-sm text-white/90 sm:text-lg">
          {slide.subtitle}
        </p>
        <button
          type="button"
          onClick={onWatch}
          className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-meow px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff4b26]"
        >
          <Play className="h-4 w-4 fill-white" />
          Watch Now
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {SLIDES.map((item, slideIndex) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}: ${item.title}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => setIndex(slideIndex)}
            className={`rounded-full bg-white transition-all ${
              slideIndex === index ? "h-2 w-2" : "h-1.5 w-1.5 opacity-70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
