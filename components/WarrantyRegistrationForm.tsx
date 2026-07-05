"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { FileDropzone } from "@/components/FileDropzone";

const PURCHASE_SOURCES = ["Amazon", "Our Website", "Retail Store", "Other"];

export function WarrantyRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/warranty", { method: "POST", body: new FormData(e.currentTarget) });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!submitted) return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [submitted]);

  if (submitted) {
    return (
      <div
        className={`rounded-3xl border border-[#E5E5E5] bg-white p-10 sm:p-16 text-center transition-all duration-500 ${
          revealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-6 transition-all duration-500 delay-150 ${
            revealed ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] mb-2">Warranty Registered Successfully</h3>
        <p className="text-sm text-[#737373] font-body max-w-md mx-auto">
          Thanks for registering your Millennium Technology product. Our team will review your submission and
          confirm your warranty coverage within 24-48 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#1A1A1A] font-body focus:outline-none focus:border-[#1A1A1A] transition-colors";
  const labelClass = "text-sm text-[#1A1A1A] font-medium mb-2 block font-body";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-[#E5E5E5] bg-white p-6 sm:p-10">
      <h3 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] mb-8 text-center">
        Register Your Product Warranty
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name *
          </label>
          <input id="fullName" name="fullName" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email Address *
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone Number *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="address">
            Shipping Address *
          </label>
          <input id="address" name="address" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="product">
            Product Purchased *
          </label>
          <select id="product" name="product" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select the product
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="model">
            Model Number *
          </label>
          <input id="model" name="model" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="serial">
            Serial Number *
          </label>
          <input id="serial" name="serial" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="purchaseDate">
            Date of Purchase *
          </label>
          <input id="purchaseDate" name="purchaseDate" type="date" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="orderId">
            Order ID *
          </label>
          <input id="orderId" name="orderId" required className={inputClass} />
        </div>

        <FileDropzone id="invoice" name="invoice" label="Upload Invoice" accept="application/pdf" required />
        <FileDropzone id="productImage" name="productImage" label="Upload Product Image" accept="image/*" required />
        <div>
          <label className={labelClass} htmlFor="source">
            Where Did You Purchase? *
          </label>
          <select id="source" name="source" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select
            </option>
            {PURCHASE_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className={labelClass} htmlFor="notes">
            Additional Notes
          </label>
          <input id="notes" name="notes" className={inputClass} />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 font-body text-center mt-6">{error}</p>}

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#1A1A1A] text-white font-medium px-8 py-4 rounded-full hover:bg-[#333] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
