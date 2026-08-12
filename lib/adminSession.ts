// Shared by app/api/admin/login/route.ts (Node runtime) and middleware.ts (Edge runtime).
// Uses Web Crypto (crypto.subtle) because Node's 'crypto' module isn't available on Edge.

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bufToHex(sig);
}

// Constant-time string compare (byte length + XOR accumulate) — avoids leaking match progress via timing.
export function timingSafeEqualStr(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

// Session cookie = base64url(payload with expiry) + "." + HMAC-SHA256(secret, payload).
// The secret itself is never sent to the client, and a leaked cookie stops verifying once
// `exp` passes — checked server-side here, not just via the cookie's client-set maxAge.
// No server-side session store (no KV/DB in this stack), so a single leaked token can't be
// individually revoked before it expires — rotating ADMIN_SESSION_SECRET invalidates all of them.
export async function signSessionToken(secret: string): Promise<string> {
  const payload = btoa(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS }));
  const sig = await hmacHex(secret, payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expectedSig = await hmacHex(secret, payload);
  if (!timingSafeEqualStr(sig, expectedSig)) return false;
  try {
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}
