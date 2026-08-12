import { NextRequest, NextResponse } from "next/server";
import { getProductsFile, writeProductsFile } from "@/lib/github";
import type { Product } from "@/lib/types";

export async function GET() {
  try {
    const { products } = await getProductsFile();
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const product = (await req.json()) as Product;
    if (!product.slug) {
      return NextResponse.json({ ok: false, error: "slug is required" }, { status: 400 });
    }
    const { products, sha } = await getProductsFile();
    if (products.some((p) => p.slug === product.slug)) {
      return NextResponse.json({ ok: false, error: "A product with this slug already exists" }, { status: 409 });
    }
    const next = [...products, product];
    await writeProductsFile(next, sha, `admin: add product ${product.slug}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
