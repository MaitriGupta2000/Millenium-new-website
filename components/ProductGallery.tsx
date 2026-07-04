"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.images;

  if (images.length === 0) {
    return <ProductImagePlaceholder category={product.category} className="w-full aspect-square" iconClassName="w-24 h-24" />;
  }

  return (
    <div>
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#F5F5F5]">
        <Image
          src={images[active]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 500px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-colors ${
                active === i ? "border-[#1A1A1A]" : "border-transparent"
              }`}
            >
              <Image src={src} alt={`${product.name} view ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
