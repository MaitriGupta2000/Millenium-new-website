import { NextRequest, NextResponse } from "next/server";
import { getProductsFile, writeProductsFile } from "@/lib/github";
import type { Product } from "@/lib/types";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { products } = await getProductsFile();
    const product = products.find((p) => p.slug === params.slug);
    if (!product) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const updated = (await req.json()) as Product;
    const { products, sha } = await getProductsFile();
    const idx = products.findIndex((p) => p.slug === params.slug);
    if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    const next = [...products];
    next[idx] = updated;
    await writeProductsFile(next, sha, `admin: update product ${params.slug}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { products, sha } = await getProductsFile();
    const next = products.filter((p) => p.slug !== params.slug);
    if (next.length === products.length) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    await writeProductsFile(next, sha, `admin: delete product ${params.slug}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
