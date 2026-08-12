"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setError("");
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await res.json();
    if (data.ok) setProducts(data.products);
    else setError(data.error || "Failed to load products");
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This commits straight to the live site repo.`)) return;
    setDeleting(slug);
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setProducts((prev) => prev?.filter((p) => p.slug !== slug) ?? null);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Delete failed");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Products</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/products/new"
            className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
          >
            + Add product
          </Link>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-700"
          >
            Log out
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {!products && !error && <p className="text-sm text-neutral-500">Loading…</p>}

      {products && (
        <div className="overflow-hidden rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Price</th>
                <th className="px-4 py-2 font-medium">Stock</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-t border-neutral-100">
                  <td className="px-4 py-2">
                    <Link href={`/admin/products/${p.slug}`} className="font-medium text-neutral-900 hover:underline">
                      {p.name}
                    </Link>
                    <div className="text-xs text-neutral-400">{p.slug}</div>
                  </td>
                  <td className="px-4 py-2 text-neutral-600">{p.category}</td>
                  <td className="px-4 py-2 text-neutral-600">{p.price === null ? "—" : `₹${p.price}`}</td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        p.stock === "in_stock"
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                          : "rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                      }
                    >
                      {p.stock === "in_stock" ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(p.slug)}
                      disabled={deleting === p.slug}
                      className="text-xs text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deleting === p.slug ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
