// Shared by app/api/admin/login/route.ts (Node runtime) and middleware.ts (Edge runtime).
// Uses Web Crypto (crypto.subtle) because Node's 'crypto' module isn't available on Edge.

const SESSION_PAYLOAD = "admin-session-v1";

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// The session cookie is a signature derived from ADMIN_SESSION_SECRET, never the secret itself,
// so a leaked cookie can't be used to mint new sessions or recover the secret.
export async function getSessionToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(SESSION_PAYLOAD));
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
