import type { Product } from "./types";

const FILE_PATH = "data/products.json";

function config() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN;
  if (!owner || !repo || !token) {
    throw new Error("Missing GITHUB_OWNER/GITHUB_REPO/GITHUB_TOKEN env vars");
  }
  return { owner, repo, branch, token };
}

function apiUrl(owner: string, repo: string) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getProductsFile(): Promise<{ products: Product[]; sha: string }> {
  const { owner, repo, branch, token } = config();
  const res = await fetch(`${apiUrl(owner, repo)}?ref=${branch}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { products: JSON.parse(content) as Product[], sha: data.sha as string };
}

export async function writeProductsFile(products: Product[], sha: string, message: string): Promise<void> {
  const { owner, repo, branch, token } = config();
  const content = Buffer.from(JSON.stringify(products, null, 2) + "\n", "utf-8").toString("base64");
  const res = await fetch(apiUrl(owner, repo), {
    method: "PUT",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ message, content, sha, branch }),
  });
  if (!res.ok) {
    throw new Error(`GitHub write failed: ${res.status} ${await res.text()}`);
  }
}
