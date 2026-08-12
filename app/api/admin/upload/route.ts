import { NextRequest, NextResponse } from "next/server";
import { uploadPublicFile, deletePublicFile } from "@/lib/github";

function safeSegment(s: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(s);
}

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const slug = form.get("slug");
    const file = form.get("file");
    if (typeof slug !== "string" || !safeSegment(slug)) {
      return NextResponse.json({ ok: false, error: "Invalid or missing slug" }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });
    }
    const ext = (file.name.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!ALLOWED_EXT.has(ext) || !file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "Only image files (jpg, png, webp, gif, avif) are allowed" }, { status: 400 });
    }
    const filename = `${Date.now()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const base64 = bytes.toString("base64");
    const repoPath = `public/products/${slug}/${filename}`;

    await uploadPublicFile(repoPath, base64, `admin: upload image for ${slug}`);
    return NextResponse.json({ ok: true, path: `/products/${slug}/${filename}` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { path } = await req.json();
    if (typeof path !== "string" || !path.startsWith("/products/") || path.includes("..")) {
      return NextResponse.json({ ok: false, error: "Invalid path" }, { status: 400 });
    }
    await deletePublicFile(`public${path}`, `admin: remove image ${path}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
