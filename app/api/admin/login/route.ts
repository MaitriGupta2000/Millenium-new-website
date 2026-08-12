import { NextRequest, NextResponse } from "next/server";
import { getSessionToken, timingSafeEqualStr } from "@/lib/adminSession";

const COOKIE_NAME = "admin_session";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret) {
    return NextResponse.json({ ok: false, error: "Admin login is not configured" }, { status: 500 });
  }

  if (!timingSafeEqualStr(password ?? "", expected)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }

  const token = await getSessionToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
