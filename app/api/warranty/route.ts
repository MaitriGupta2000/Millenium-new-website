import { NextRequest, NextResponse } from "next/server";

async function fileToBase64(file: File | null) {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return { name: file.name, mimeType: file.type || "application/octet-stream", base64: buffer.toString("base64") };
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.WARRANTY_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Warranty webhook is not configured (WARRANTY_WEBHOOK_URL missing)." },
      { status: 500 }
    );
  }

  const form = await req.formData();

  const payload = {
    fullName: form.get("fullName"),
    email: form.get("email"),
    phone: form.get("phone"),
    address: form.get("address"),
    product: form.get("product"),
    model: form.get("model"),
    serial: form.get("serial"),
    purchaseDate: form.get("purchaseDate"),
    orderId: form.get("orderId"),
    source: form.get("source"),
    notes: form.get("notes"),
    invoice: await fileToBase64(form.get("invoice") as File | null),
    productImage: await fileToBase64(form.get("productImage") as File | null),
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json().catch(() => ({ ok: false, error: "Invalid response from webhook" }));

  if (!res.ok || !result.ok) {
    return NextResponse.json({ ok: false, error: result.error || "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
