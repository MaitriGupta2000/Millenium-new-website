"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CategorySlug, FeatureItem, Product, Review, SpecGroup, StockStatus } from "@/lib/types";

const CATEGORIES: CategorySlug[] = [
  "monitor-extenders",
  "networking-cards",
  "addon-cards",
  "gaming-accessories",
  "compute-accessories",
];

const EMPTY: Product = {
  slug: "",
  category: "monitor-extenders",
  name: "",
  tag: "",
  typeLabel: "",
  tagline: "",
  description: [],
  price: null,
  stock: "in_stock",
  cardFeatures: [],
  features: [],
  specs: [],
  useCases: [],
  amazonUrl: "",
  images: [],
  rating: null,
  reviews: [],
  filterGroup: "",
};

function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

// Accepts "12499", "12,499", "₹12499" etc. Throws on anything that isn't a plain number, blank -> null.
function parseNumberField(text: string, label: string): number | null {
  const trimmed = text.trim();
  if (trimmed === "") return null;
  const cleaned = trimmed.replace(/[₹,\s]/g, "");
  const n = Number(cleaned);
  if (Number.isNaN(n)) throw new Error(`${label} must be a number (got "${text}")`);
  return n;
}

export default function ProductForm({ initial, isNew }: { initial?: Product; isNew: boolean }) {
  const router = useRouter();
  const base = initial ?? EMPTY;

  const [slug, setSlug] = useState(base.slug);
  const [category, setCategory] = useState<CategorySlug>(base.category);
  const [name, setName] = useState(base.name);
  const [tag, setTag] = useState(base.tag ?? "");
  const [typeLabel, setTypeLabel] = useState(base.typeLabel);
  const [tagline, setTagline] = useState(base.tagline);
  const [descriptionText, setDescriptionText] = useState(base.description.join("\n"));
  const [price, setPrice] = useState(base.price === null ? "" : String(base.price));
  const [stock, setStock] = useState<StockStatus>(base.stock);
  const [cardFeaturesText, setCardFeaturesText] = useState(base.cardFeatures.join("\n"));
  const [useCasesText, setUseCasesText] = useState((base.useCases ?? []).join("\n"));
  const [amazonUrl, setAmazonUrl] = useState(base.amazonUrl);
  const [imagesText, setImagesText] = useState(base.images.join("\n"));
  const [filterGroup, setFilterGroup] = useState(base.filterGroup ?? "");
  const [ratingValue, setRatingValue] = useState(base.rating?.value?.toString() ?? "");
  const [ratingCount, setRatingCount] = useState(base.rating?.count?.toString() ?? "");
  const [features, setFeatures] = useState<FeatureItem[]>(base.features);
  const [specs, setSpecs] = useState<(Omit<SpecGroup, "items"> & { itemsText: string })[]>(
    base.specs.map((s) => ({ title: s.title, itemsText: s.items.join("\n") }))
  );
  const [reviews, setReviews] = useState<Review[]>(base.reviews);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function buildProduct(): Product {
    return {
      slug: slug.trim(),
      category,
      name: name.trim(),
      tag: tag.trim() || undefined,
      typeLabel: typeLabel.trim(),
      tagline: tagline.trim(),
      description: linesToArray(descriptionText),
      price: parseNumberField(price, "Price"),
      stock,
      cardFeatures: linesToArray(cardFeaturesText),
      features,
      specs: specs.map((s) => ({ title: s.title, items: linesToArray(s.itemsText) })),
      useCases: linesToArray(useCasesText),
      amazonUrl: amazonUrl.trim(),
      images: linesToArray(imagesText),
      rating: (() => {
        const value = parseNumberField(ratingValue, "Rating value");
        const count = parseNumberField(ratingCount, "Rating count");
        if (value === null || count === null) return null;
        return { value, count };
      })(),
      reviews,
      filterGroup: filterGroup.trim() || undefined,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!slug.trim() || !name.trim()) {
      setError("Slug and name are required");
      return;
    }
    let product: Product;
    try {
      product = buildProduct();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
      return;
    }
    setSaving(true);
    const res = isNew
      ? await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
      : await fetch(`/api/admin/products/${base.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
    setSaving(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-xl font-semibold text-neutral-900">{isNew ? "Add product" : `Edit: ${base.name}`}</h1>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <Section title="Basics">
        <Field label="Slug (unique URL id)">
          <input value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!isNew} className={inputCls} />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value as CategorySlug)} className={inputCls}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Tag (small badge, optional)">
          <input value={tag} onChange={(e) => setTag(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Type label">
          <input value={typeLabel} onChange={(e) => setTypeLabel(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Tagline">
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Filter group (optional)">
          <input value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)} className={inputCls} />
        </Field>
      </Section>

      <Section title="Pricing & stock">
        <Field label="Price (₹, leave blank if unpriced)">
          <input value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Stock">
          <select value={stock} onChange={(e) => setStock(e.target.value as StockStatus)} className={inputCls}>
            <option value="in_stock">In stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
        </Field>
        <Field label="Amazon URL">
          <input value={amazonUrl} onChange={(e) => setAmazonUrl(e.target.value)} className={inputCls} />
        </Field>
      </Section>

      <Section title="Description (one paragraph per line)">
        <textarea value={descriptionText} onChange={(e) => setDescriptionText(e.target.value)} rows={4} className={inputCls} />
      </Section>

      <Section title="Card features (one per line, shown on product cards)">
        <textarea value={cardFeaturesText} onChange={(e) => setCardFeaturesText(e.target.value)} rows={3} className={inputCls} />
      </Section>

      <Section title="Use cases (one per line, optional)">
        <textarea value={useCasesText} onChange={(e) => setUseCasesText(e.target.value)} rows={3} className={inputCls} />
      </Section>

      <Section title="Images (one URL/path per line)">
        <textarea value={imagesText} onChange={(e) => setImagesText(e.target.value)} rows={3} className={inputCls} />
      </Section>

      <Section title="Rating (optional)">
        <div className="flex gap-3">
          <Field label="Value (0-5)">
            <input value={ratingValue} onChange={(e) => setRatingValue(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Count">
            <input value={ratingCount} onChange={(e) => setRatingCount(e.target.value)} className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section title="Features (title + description shown on product page)">
        {features.map((f, i) => (
          <div key={i} className="mb-2 space-y-1 rounded-md border border-neutral-200 p-3">
            <input
              placeholder="Title"
              value={f.title}
              onChange={(e) => setFeatures((prev) => prev.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
              className={inputCls}
            />
            <textarea
              placeholder="Description"
              value={f.description ?? ""}
              onChange={(e) =>
                setFeatures((prev) => prev.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))
              }
              rows={2}
              className={inputCls}
            />
            <button type="button" onClick={() => setFeatures((prev) => prev.filter((_, j) => j !== i))} className={removeCls}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFeatures((prev) => [...prev, { title: "", description: "" }])}
          className={addCls}
        >
          + Add feature
        </button>
      </Section>

      <Section title="Specs (grouped spec table, e.g. Display / Connectivity)">
        {specs.map((s, i) => (
          <div key={i} className="mb-2 space-y-1 rounded-md border border-neutral-200 p-3">
            <input
              placeholder="Group title (e.g. Display)"
              value={s.title}
              onChange={(e) => setSpecs((prev) => prev.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
              className={inputCls}
            />
            <textarea
              placeholder="One spec per line"
              value={s.itemsText}
              onChange={(e) => setSpecs((prev) => prev.map((x, j) => (j === i ? { ...x, itemsText: e.target.value } : x)))}
              rows={3}
              className={inputCls}
            />
            <button type="button" onClick={() => setSpecs((prev) => prev.filter((_, j) => j !== i))} className={removeCls}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setSpecs((prev) => [...prev, { title: "", itemsText: "" }])} className={addCls}>
          + Add spec group
        </button>
      </Section>

      <Section title="Reviews (optional)">
        {reviews.map((r, i) => (
          <div key={i} className="mb-2 space-y-1 rounded-md border border-neutral-200 p-3">
            <div className="flex gap-2">
              <input
                placeholder="Author"
                value={r.author}
                onChange={(e) => setReviews((prev) => prev.map((x, j) => (j === i ? { ...x, author: e.target.value } : x)))}
                className={inputCls}
              />
              <input
                placeholder="Rating (1-5)"
                value={r.rating}
                onChange={(e) =>
                  setReviews((prev) => prev.map((x, j) => (j === i ? { ...x, rating: Number(e.target.value) } : x)))
                }
                className={inputCls}
              />
            </div>
            <input
              placeholder="Title"
              value={r.title}
              onChange={(e) => setReviews((prev) => prev.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
              className={inputCls}
            />
            <textarea
              placeholder="Text"
              value={r.text}
              onChange={(e) => setReviews((prev) => prev.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
              rows={2}
              className={inputCls}
            />
            <button type="button" onClick={() => setReviews((prev) => prev.filter((_, j) => j !== i))} className={removeCls}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setReviews((prev) => [...prev, { author: "", rating: 5, title: "", text: "" }])}
          className={addCls}
        >
          + Add review
        </button>
      </Section>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700">
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputCls = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500";
const addCls = "rounded-md border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700";
const removeCls = "text-xs text-red-600 hover:underline";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-neutral-700">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <label className="mb-1 block text-xs text-neutral-500">{label}</label>
      {children}
    </div>
  );
}
