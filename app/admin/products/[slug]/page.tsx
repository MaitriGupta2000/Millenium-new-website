"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/lib/types";

export default function EditProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/products/${params.slug}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setProduct(data.product);
        else setError(data.error || "Failed to load product");
      });
  }, [params.slug]);

  if (error) return <p className="mx-auto max-w-3xl px-4 py-8 text-sm text-red-600">{error}</p>;
  if (!product) return <p className="mx-auto max-w-3xl px-4 py-8 text-sm text-neutral-500">Loading…</p>;

  return <ProductForm initial={product} isNew={false} />;
}
