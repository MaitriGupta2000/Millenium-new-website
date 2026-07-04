"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setScrollProgress(easeProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const borderRadius = scrollProgress * 24;
  const finalHeight = 700;
  const initialHeight = 940;
  const currentHeight = initialHeight - (initialHeight - finalHeight) * scrollProgress;
  const horizontalPadding = scrollProgress * 48;

  return (
    <section className="relative bg-black -mt-20 overflow-hidden">
      <div
        className="w-full bg-black"
        style={{
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
          paddingTop: `${scrollProgress * 48}px`,
          paddingBottom: `${scrollProgress * 48}px`,
        }}
      >
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{
            height: `${currentHeight}px`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/hero-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center right",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #000 0%, #000 10%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.05) 72%, transparent 85%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
            {/* Mobile */}
            <div className="lg:hidden flex flex-col items-center text-center space-y-6 w-full">
              <h1
                className={`font-display text-5xl sm:text-6xl text-white italic transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Work Beautifully.
              </h1>
              <p
                className={`text-white/90 text-base transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Monitor extenders, networking cards, and accessories engineered for real workspaces.
              </p>
              <Link
                href="#shop"
                className={`flex items-center justify-center gap-2 bg-white text-[#1A1A1A] px-6 py-4 rounded-full text-sm font-medium hover:bg-[#F5F5F5] transition-all duration-700 delay-500 w-full ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Shop now
                <span className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex absolute inset-y-0 left-16 flex-col justify-center w-[40%] max-w-xl">
              <h1
                className={`font-display text-7xl text-white italic transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Built for Focus.
              </h1>
              <p
                className={`mt-6 text-white/90 text-base transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Discover monitor extenders, networking cards, and accessories designed for real workspaces.
              </p>
              <div
                className={`mt-10 transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  href="#shop"
                  className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                >
                  Shop now
                  <span className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
