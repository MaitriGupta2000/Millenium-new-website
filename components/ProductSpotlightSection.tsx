"use client";

import { useState } from "react";
import Image from "next/image";
import { Layers, Cable, Truck, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductBySlug, formatPriceINR } from "@/lib/products";

const SPOTLIGHT_SLUGS = [
  "triview-15-6-flexsplit",
  "10gb-dual-sfp-network-adapter-x520-da2",
  "ps5-slim-pro-external-cooling-fan",
  "4k-hdmi-video-capture-card",
];

export function ProductSpotlightSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const spotlightProducts = SPOTLIGHT_SLUGS.map((slug) => getProductBySlug(slug)).filter(Boolean);
  const currentProduct = spotlightProducts[currentIndex];
  if (!currentProduct) return null;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % spotlightProducts.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? spotlightProducts.length - 1 : prev - 1));

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">Featured Collections</h2>
          <p className="text-[#737373] text-base font-body">Discover our curated selection of flagship products.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="aspect-square relative overflow-hidden bg-[#F5F5F5] rounded-3xl">
                {currentProduct.images[0] && (
                  <Image
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    fill
                    className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                    priority
                  />
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center shadow-lg"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
                </button>
                <div className="flex gap-2">
                  {spotlightProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-[#1A1A1A] w-6" : "bg-white/50 hover:bg-white/70 w-2"
                      }`}
                      aria-label={`Go to product ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center shadow-lg"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col justify-center transition-opacity duration-300 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="font-display text-4xl lg:text-5xl text-[#1A1A1A] mb-2 transition-opacity duration-300 ease-in-out">
              {currentProduct.name}
            </h1>
            <p className="text-xl text-[#1A1A1A] mb-6 font-body transition-opacity duration-300 ease-in-out">
              {currentProduct.stock === "out_of_stock" ? "Out of Stock" : formatPriceINR(currentProduct.price)}
            </p>

            <p className="text-[#737373] leading-relaxed mb-8 font-body transition-opacity duration-300 ease-in-out">
              {currentProduct.tagline}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="px-4">
                <Layers className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Specifications</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  {currentProduct.cardFeatures[0] ?? "Real specs, verified on every listing."}
                </p>
              </div>
              <div className="px-4">
                <Cable className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Compatibility</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  {currentProduct.cardFeatures[1] ?? currentProduct.typeLabel}
                </p>
              </div>
              <div className="px-4">
                <Truck className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Shipping</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">Fulfilled and delivered via Amazon.</p>
              </div>
            </div>

            <a
              href={currentProduct.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Buy on Amazon
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
