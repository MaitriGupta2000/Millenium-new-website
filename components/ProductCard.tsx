import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPriceINR } from "@/lib/products";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div className={`group text-center ${className}`}>
      <div className="aspect-[4/5] relative overflow-hidden bg-[#F5F5F5] mb-4 rounded-2xl">
        <Link href={`/products/${product.slug}`} className="absolute inset-0">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 250px, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ProductImagePlaceholder category={product.category} className="w-full h-full" iconClassName="w-12 h-12" />
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

      <Link href={`/products/${product.slug}`} className="block">
        {product.tag && (
          <p className="text-[11px] font-semibold tracking-wide text-amber-600 mb-1">{product.tag}</p>
        )}
        <h3 className="font-display text-lg text-[#1A1A1A] mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-[#737373] text-sm font-body">
          {product.stock === "out_of_stock" ? "Out of Stock" : formatPriceINR(product.price)}
        </p>
        {product.rating && product.rating.count > 0 && (
          <div className="flex items-center justify-center gap-1 mt-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-medium text-[#1A1A1A]">{product.rating.value}</span>
            <span className="text-xs text-[#737373]">({product.rating.count})</span>
          </div>
        )}
      </Link>
    </div>
  );
}
