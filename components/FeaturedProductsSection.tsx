"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CATEGORIES, PRODUCTS, formatPriceINR, getCategoryMeta } from "@/lib/products";

const categories = CATEGORIES.map((c) => c.title);

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = PRODUCTS.filter((p) => getCategoryMeta(p.category).title === activeCategory);

  return (
    <section id="shop" ref={ref} className="py-14 lg:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">Explore Products</h2>
          </div>
          <p className="text-[#737373] text-base font-body">
            Discover laptop screen extenders, networking cards, and accessories made for every workspace.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div
            className={`w-full lg:w-48 flex-shrink-0 lg:sticky lg:top-24 lg:self-start transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-col gap-1.5">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left py-3 px-4 rounded-full text-sm transition-all duration-300 font-body ${
                    activeCategory === category
                      ? "bg-[#1A1A1A] text-white font-medium shadow-sm"
                      : "text-[#737373] hover:bg-[#F0F0F0] hover:text-[#1A1A1A]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10 lg:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.slug}
                  className={`group transition-all duration-300 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${50 + index * 30}ms` }}
                >
                  <div className="text-center">
                    <div className="aspect-square relative overflow-hidden bg-[#F5F5F5] mb-4 rounded-2xl">
                      <Link href={`/products/${product.slug}`} className="absolute inset-0">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1024px) 220px, 45vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </Link>
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Buy ${product.name} on Amazon`}
                        title="Buy on Amazon"
                        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" />
                      </a>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-display text-base text-[#1A1A1A] mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-[#737373] text-sm font-body">
                        {product.stock === "out_of_stock" ? "Out of Stock" : formatPriceINR(product.price)}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
