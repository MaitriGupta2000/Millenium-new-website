import { Star } from "lucide-react";
import type { Product } from "@/lib/types";

export function ReviewsSection({ product }: { product: Product }) {
  if (!product.rating || product.rating.count === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-3xl text-[#1A1A1A]">Customer Reviews</h2>
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-semibold text-[#1A1A1A]">{product.rating.value}</span>
          <span className="text-sm text-[#737373] font-body">({product.rating.count} ratings on Amazon)</span>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {product.reviews.map((review, i) => (
            <div key={i} className="rounded-2xl border border-[#E5E5E5] p-5">
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-[#E5E5E5]"}`}
                  />
                ))}
              </div>
              {review.title && <p className="text-sm font-medium text-[#1A1A1A] mb-1 font-body">{review.title}</p>}
              <p className="text-sm text-[#737373] leading-relaxed font-body">{review.text}</p>
              <p className="text-xs text-[#737373] mt-3 font-body">— {review.author}, Amazon Customer</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
