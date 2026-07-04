"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const categories = ["All", "New Arrivals", "Best Sellers", "Serums", "Moisturizers", "Treatments"];

const products = [
  {
    id: 1,
    name: "DermaVerde Cream",
    slug: "dermaverde-cream",
    price: 79,
    image: "/images/product-detail-skincare.jpg",
    category: "Moisturizers",
  },
  {
    id: 2,
    name: "PureGlow Serum",
    slug: "pureglow-serum",
    price: 129,
    image: "/images/product-serum-set.jpg",
    category: "Serums",
  },
  {
    id: 3,
    name: "Beauty Essentials Set",
    slug: "beauty-essentials-set",
    price: 199,
    image: "/images/product-gift-set.jpg",
    category: "Best Sellers",
  },
  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    slug: "vitamin-c-brightening-serum",
    price: 95,
    image: "/images/product-serum-set.jpg",
    category: "Serums",
  },
  {
    id: 5,
    name: "Hyaluronic Hydrator",
    slug: "hyaluronic-hydrator",
    price: 85,
    image: "/images/product-detail-skincare.jpg",
    category: "Moisturizers",
  },
  {
    id: 6,
    name: "Retinol Night Treatment",
    slug: "retinol-night-treatment",
    price: 109,
    image: "/images/product-detail-skincare.jpg",
    category: "Treatments",
  },
  {
    id: 7,
    name: "Radiant Glow Duo",
    slug: "radiant-glow-duo",
    price: 159,
    image: "/images/product-gift-set.jpg",
    category: "New Arrivals",
  },
  {
    id: 8,
    name: "Ceramide Repair Set",
    slug: "ceramide-repair-set",
    price: 175,
    image: "/images/product-gift-set.jpg",
    category: "Best Sellers",
  },
  {
    id: 9,
    name: "Daily Defense SPF",
    slug: "daily-defense-spf",
    price: 65,
    image: "/images/product-detail-skincare.jpg",
    category: "Treatments",
  },
  {
    id: 10,
    name: "Niacinamide Essence",
    slug: "niacinamide-essence",
    price: 85,
    image: "/images/product-serum-set.jpg",
    category: "Serums",
  },
  {
    id: 11,
    name: "Rose Water Toner",
    slug: "rose-water-toner",
    price: 55,
    image: "/images/product-detail-skincare.jpg",
    category: "Treatments",
  },
  {
    id: 12,
    name: "Collagen Boost Cream",
    slug: "collagen-boost-cream",
    price: 99,
    image: "/images/product-detail-skincare.jpg",
    category: "Moisturizers",
  },
  {
    id: 13,
    name: "AHA/BHA Exfoliant",
    slug: "aha-bha-exfoliant",
    price: 75,
    image: "/images/product-detail-skincare.jpg",
    category: "Treatments",
  },
  {
    id: 14,
    name: "Peptide Power Set",
    slug: "peptide-power-set",
    price: 219,
    image: "/images/product-gift-set.jpg",
    category: "New Arrivals",
  },
  {
    id: 15,
    name: "Squalane Facial Oil",
    slug: "squalane-facial-oil",
    price: 88,
    image: "/images/product-serum-set.jpg",
    category: "Serums",
  },
  {
    id: 16,
    name: "Eye Renewal Cream",
    slug: "eye-renewal-cream",
    price: 89,
    image: "/images/product-detail-skincare.jpg",
    category: "Treatments",
  },
  {
    id: 17,
    name: "Barrier Repair Moisturizer",
    slug: "barrier-repair-moisturizer",
    price: 92,
    image: "/images/product-detail-skincare.jpg",
    category: "Moisturizers",
  },
  {
    id: 18,
    name: "Complete Routine Bundle",
    slug: "complete-routine-bundle",
    price: 299,
    image: "/images/product-gift-set.jpg",
    category: "Best Sellers",
  },
];

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
              Explore Lumera Shop
            </h2>
          </div>
          <p className="text-[#737373] text-base font-body">
            Discover our products made just for you.
          </p>
        </div>

        {/* Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Categories */}
          <div
            className={`w-full lg:w-48 flex-shrink-0 lg:sticky lg:top-24 lg:self-start transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-col gap-0 border-t border-[#E5E5E5]">
              {categories.map((category) => (
                <div key={category} className="border-b border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left py-4 px-2 text-sm transition-colors font-body ${
                      activeCategory === category
                        ? "text-[#1A1A1A] font-medium"
                        : "text-[#737373] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid - 5 columns */}
          <div className="flex-1">
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={`group transition-all duration-300 ease-out text-center ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${50 + index * 30}ms` }}
                >
                  {/* Product Image */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#F5F5F5] mb-4 rounded-2xl">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#737373] text-sm font-body">
                    USD ${product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
