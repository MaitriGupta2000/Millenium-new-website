"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CATEGORIES, getProductsByCategory } from "@/lib/products";
import type { CategorySlug } from "@/lib/types";

const GALLERY_CATEGORIES: CategorySlug[] = [
  "monitor-extenders",
  "networking-cards",
  "addon-cards",
  "gaming-accessories",
];

export function LifestyleGallerySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const tiles = GALLERY_CATEGORIES.map((slug) => {
    const meta = CATEGORIES.find((c) => c.slug === slug)!;
    const product = getProductsByCategory(slug).find((p) => p.images.length > 0);
    return { slug, title: meta.title, image: product?.images[0] };
  });

  return (
    <section id="lifestyle" ref={sectionRef} className="py-16 px-6 md:px-12 lg:px-24 bg-[#FAFAFA] border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
            <p
              className={`text-[#737373] text-sm uppercase tracking-widest transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              The Millennium Workspace
            </p>
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
          </div>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Use Cases
          </h2>
          <p
            className={`text-[#737373] text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            From dual-screen laptop stands to server racks, browse the lines that make up every Millennium setup.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className={`lg:w-1/3 bg-amber-500 text-white p-12 flex flex-col justify-center rounded-3xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="font-display text-3xl mb-6 lg:text-6xl">Built To Perform</h3>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              Every line we build is designed around one idea: more capability, wherever you set up shop.
            </p>
            <Link
              href="/category/monitor-extenders"
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 self-start"
            >
              Explore More
            </Link>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiles.map((tile, index) => (
              <Link
                key={tile.slug}
                href={`/category/${tile.slug}`}
                className={`relative overflow-hidden rounded-3xl bg-white group transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms`, aspectRatio: "3/4" }}
              >
                {tile.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-white text-2xl md:text-3xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {tile.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
