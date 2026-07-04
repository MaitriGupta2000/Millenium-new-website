"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Leaf, Ruler, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const carouselProducts = [
  {
    id: 1,
    name: "DermaVerde",
    price: 329,
    description: "A lightweight moisturizing cream that keeps your skin soft and hydrated all day.",
    image: "/images/product-detail-skincare.jpg",
  },
  {
    id: 2,
    name: "PureGlow",
    price: 289,
    description: "Premium serum with advanced brightening formula for radiant complexion.",
    image: "/images/product-serum-set.jpg",
  },
  {
    id: 3,
    name: "BeautySet",
    price: 459,
    description: "Complete beauty collection with essential skincare products for every need.",
    image: "/images/product-gift-set.jpg",
  },
  {
    id: 4,
    name: "HydraMist",
    price: 189,
    description: "Refreshing hydration spray for instant moisture and natural glow throughout the day.",
    image: "/images/product-skincare-duo.jpg",
  },
];

export function ProductDetailSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProduct = carouselProducts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselProducts.length - 1 : prev - 1
    );
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
            Featured Collections
          </h2>
          <p className="text-[#737373] text-base font-body">
            Discover our curated selection of premium products.
          </p>
        </div>

        {/* Product Carousel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image with Carousel Controls */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="aspect-square relative overflow-hidden bg-[#F5F5F5] rounded-3xl">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  fill
                  className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                  priority
                />
              </div>

              {/* Carousel Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center shadow-lg"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
                </button>
                <div className="flex gap-2">
                  {carouselProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-[#1A1A1A] w-6"
                          : "bg-white/50 hover:bg-white/70"
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

          {/* Product Info */}
          <div
            className={`flex flex-col justify-center transition-opacity duration-300 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="font-display text-4xl lg:text-5xl text-[#1A1A1A] mb-2 transition-opacity duration-300 ease-in-out">
              {currentProduct.name}
            </h1>
            <p className="text-xl text-[#1A1A1A] mb-6 font-body transition-opacity duration-300 ease-in-out">
              USD ${currentProduct.price}
            </p>

            <p className="text-[#737373] leading-relaxed mb-8 font-body transition-opacity duration-300 ease-in-out">
              {currentProduct.description}
            </p>

            {/* Info Blocks - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="border border-[#E5E5E5] p-4 rounded-xs border-none px-4">
                <Leaf className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Product Details</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  Natural ingredients, dermatologically tested.
                </p>
              </div>
              <div className="border border-[#E5E5E5] p-4 rounded-xs border-none px-4">
                <Ruler className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Size</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  30ml, 50ml, and 100ml. Sustainable glass packaging.
                </p>
              </div>
              <div className="border border-[#E5E5E5] p-4 rounded-xs border-none px-4">
                <Truck className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Shipping</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  Free over $100. 3-5 days delivery. 30-day returns.
                </p>
              </div>
            </div>

            {/* Buy Button */}
            <button
              type="button"
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Buy now
            </button>
          </div>
        </div>


      </div>
    </section>
  );
}
