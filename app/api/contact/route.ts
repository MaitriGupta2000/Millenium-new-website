import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Contact webhook is not configured (CONTACT_WEBHOOK_URL missing)." },
      { status: 500 }
    );
  }

  const { name, mobile, email, message } = await req.json();

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, mobile, email, message, to: "sales@millenniumtechnology.in" }),
  });

  const result = await res.json().catch(() => ({ ok: false, error: "Invalid response from webhook" }));

  if (!res.ok || !result.ok) {
    return NextResponse.json({ ok: false, error: result.error || "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
