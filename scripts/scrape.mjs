// One-time data-enrichment scraper.
// Pulls doc-link -> Google Doc copy, and Amazon listing -> real images + real reviews,
// for all 45 products already defined in lib/products.ts. Output: data/enrichment.json
// (+ downloaded images in public/products/<slug>/).
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const SHEET_ID = "1xxV1IuG_J6MoXc4cRIHwqeKjHApF_d2PU76sJpFajHw";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Node's fetch (undici) is unreliable in this sandbox; curl works consistently, so
// all network I/O shells out to it instead.
function curlText(url, extraArgs = []) {
  try {
    return execFileSync("curl", ["-s", "-L", "--compressed", "-A", UA, ...extraArgs, url], {
      maxBuffer: 1024 * 1024 * 50,
    }).toString("utf8");
  } catch {
    return "";
  }
}

function curlToFile(url, destPath) {
  try {
    execFileSync("curl", ["-s", "-L", "-A", UA, "-o", destPath, url]);
    return true;
  } catch {
    return false;
  }
}

// ---------- 1. slug <-> amazonUrl pairs from the existing hand-authored data file ----------
async function extractSlugAmazonPairs() {
  const src = await fs.readFile(path.join(ROOT, "lib/products.ts"), "utf8");
  const chunks = src.split(/(?=slug: ")/);
  const pairs = [];
  for (const chunk of chunks) {
    const slugMatch = chunk.match(/^slug: "([^"]+)"/);
    const urlMatch = chunk.match(/amazonUrl: "([^"]+)"/);
    if (slugMatch && urlMatch) pairs.push({ slug: slugMatch[1], amazonUrl: urlMatch[1] });
  }
  return pairs;
}

// ---------- 2. sheet tabs -> amazonUrl -> docUrl ----------
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

async function fetchTab(tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}&headers=0`;
  const text = curlText(url);
  return parseCsv(text);
}

async function buildAmazonToDocMap() {
  const tabs = ["Laptop Screen Extenders", "Networking Cards", "Add on Cards", "Gaming Accesories", "Computer Accessories"];
  const map = new Map();
  for (const tab of tabs) {
    const rows = await fetchTab(tab);
    const header = rows[0].map((h) => h.trim().toLowerCase());
    const docIdx = header.findIndex((h) => h.startsWith("doc link"));
    const linkIdx = header.findIndex((h) => h.startsWith("link"));
    for (const r of rows.slice(1)) {
      const docUrl = (r[docIdx] || "").trim();
      const amazonUrl = (r[linkIdx] || "").trim();
      if (amazonUrl) map.set(amazonUrl, docUrl);
    }
  }
  return map;
}

// ---------- 3. generic Google Doc parser ----------
function extractDocId(docUrl) {
  const m = docUrl.match(/\/document\/d\/([^/]+)/);
  return m ? m[1] : null;
}

async function fetchDocText(docUrl) {
  const id = extractDocId(docUrl);
  if (!id) return null;
  const text = curlText(`https://docs.google.com/document/d/${id}/export?format=txt`);
  if (!text || /<html/i.test(text.slice(0, 200))) return null; // empty or login/permission page
  return text.replace(/^﻿/, "");
}

function parseDoc(text) {
  const lines = text.split("\n").map((l) => l.trim());
  const nonEmpty = (from) => {
    let i = from;
    while (i < lines.length && !lines[i]) i++;
    return i;
  };
  // Reads a field value at/after index i, transparently skipping an optional
  // bare "label" line (docs are inconsistent: some have "Headline"/"Copy"
  // label lines before the real content, some go straight to the content).
  const readField = (i, labelRe) => {
    i = nonEmpty(i);
    if (labelRe && labelRe.test(lines[i] || "")) i = nonEmpty(i + 1);
    return [lines[i] || "", i + 1];
  };

  const idxHero = lines.findIndex((l) => /^hero section$/i.test(l));
  const idxTech = lines.findIndex((l) => /^technical specifications$/i.test(l));
  const idxReviews = lines.findIndex((l) => /^(customer reviews|reviews|testimonials)$/i.test(l));

  let headline = "";
  let subheading = "";
  if (idxHero !== -1) {
    let i;
    [headline, i] = readField(idxHero + 1, /^headline$/i);
    [subheading, i] = readField(i, /^sub-?heading$/i);
  }

  // Quick Specs (aka "Quick Specs Row")
  const quickSpecs = [];
  const idxQuick = lines.findIndex((l) => /^quick specs\b/i.test(l));
  if (idxQuick !== -1) {
    for (let i = idxQuick + 1; i < lines.length; i++) {
      const l = lines[i];
      if (!l) continue;
      if (!l.startsWith("*")) break;
      quickSpecs.push(l.replace(/^\*\s*/, "").trim());
    }
  }

  // Feature/Section N blocks
  const featureIdxs = [];
  lines.forEach((l, i) => { if (/^(feature )?section \d+$/i.test(l)) featureIdxs.push(i); });
  const boundary = idxTech !== -1 ? idxTech : (idxReviews !== -1 ? idxReviews : lines.length);
  const features = [];
  const useCases = new Set();
  for (let fi = 0; fi < featureIdxs.length; fi++) {
    const start = featureIdxs[fi];
    const end = fi + 1 < featureIdxs.length ? featureIdxs[fi + 1] : boundary;
    let i;
    let title;
    [title, i] = readField(start + 1, /^title$/i);
    i = nonEmpty(i);
    if (/^(copy|description)$/i.test(lines[i] || "")) i = nonEmpty(i + 1);
    // description can span several one-sentence-per-line paragraphs; collect
    // until a bullet-intro (":"), a bullet, or "Designer Direction"
    const descLines = [];
    while (i < end && lines[i] && !lines[i].startsWith("*") && !/:$/.test(lines[i]) && !/^designer direction$/i.test(lines[i])) {
      descLines.push(lines[i]);
      i++;
    }
    const description = descLines.join(" ");
    if (title) features.push({ title, description });
    // scan the rest of this block for a "X for:" / "X with:" bullet list -> use cases
    for (let j = i; j < end; j++) {
      if (/^designer direction$/i.test(lines[j])) break;
      if (/:$/.test(lines[j]) && lines[j].length < 40) {
        for (let k = j + 1; k < end; k++) {
          if (!lines[k].startsWith("*")) break;
          useCases.add(lines[k].replace(/^\*\s*/, "").trim());
        }
      }
    }
  }

  // Technical Specifications groups
  const specs = [];
  if (idxTech !== -1) {
    const end = idxReviews !== -1 ? idxReviews : lines.length;
    let i = idxTech + 1;
    while (i < end) {
      if (!lines[i]) { i++; continue; }
      if (lines[i].startsWith("*") || /^_+$/.test(lines[i])) { i++; continue; }
      const groupTitle = lines[i];
      const items = [];
      i++;
      while (i < end && (lines[i].startsWith("*") || !lines[i])) {
        if (lines[i].startsWith("*")) items.push(lines[i].replace(/^\*\s*/, "").trim());
        i++;
      }
      if (groupTitle && items.length) specs.push({ title: groupTitle, items });
    }
  }

  if (!headline && !quickSpecs.length && !features.length) return null;
  return { headline, subheading, quickSpecs, features, specs, useCases: [...useCases] };
}

// ---------- 4. Amazon listing scrape ----------
async function fetchAmazon(amazonUrl) {
  return curlText(amazonUrl, ["-H", "Accept-Language: en-IN,en;q=0.9"]);
}

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function parseAmazon(html) {
  const hiRes = [...html.matchAll(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g)].map((m) => m[1]);
  const large = [...html.matchAll(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g)].map((m) => m[1]);
  const images = [...new Set([...hiRes, ...large].map((u) => u.replace(/\\u002F/g, "/")))].slice(0, 4);

  const ratingMatch = html.match(/([0-9]\.[0-9]) out of 5 stars/);
  const countMatch = html.match(/([0-9][0-9,]*)\s*ratings?\b/i);
  const rating = ratingMatch ? { value: Number(ratingMatch[1]), count: countMatch ? Number(countMatch[1].replace(/,/g, "")) : 0 } : null;

  const reviews = [];
  const nameRe = /class="a-profile-name">([^<]+)</g;
  let m;
  const nameIdxs = [];
  while ((m = nameRe.exec(html))) nameIdxs.push({ idx: m.index, name: m[1] });
  for (const { idx, name } of nameIdxs) {
    const window = html.slice(idx, idx + 4000);
    const starM = window.match(/data-hook="review-star-rating" class="a-icon a-icon-star a-star-(\d)"/);
    const titleM = window.match(/data-hook="reviewTitle"[^>]*>([^<]*)</);
    const bodyM = window.match(/data-hook="reviewRichContentContainer"[\s\S]*?<\/div>/);
    if (!starM) continue;
    let text = "";
    if (bodyM) {
      text = [...bodyM[0].matchAll(/<span>([^<]+)<\/span>/g)].map((x) => x[1]).join(" ").trim();
    }
    if (name === "Amazon Customer" && !text) continue;
    if (text) {
      reviews.push({
        author: decodeEntities(name),
        rating: Number(starM[1]),
        title: decodeEntities((titleM?.[1] || "").trim()),
        text: decodeEntities(text),
      });
    }
    if (reviews.length >= 4) break;
  }

  return { images, rating, reviews };
}

async function downloadImages(slug, urls) {
  if (!urls.length) return [];
  const dir = path.join(ROOT, "public/products", slug);
  await fs.mkdir(dir, { recursive: true });
  const saved = [];
  for (let i = 0; i < urls.length; i++) {
    const file = `${i + 1}.jpg`;
    const dest = path.join(dir, file);
    const ok = curlToFile(urls[i], dest);
    if (!ok) continue;
    const stat = await fs.stat(dest).catch(() => null);
    if (!stat || stat.size === 0) { await fs.rm(dest, { force: true }); continue; }
    saved.push(`/products/${slug}/${file}`);
  }
  return saved;
}

// ---------- main ----------
async function main() {
  console.log("Extracting slug/amazonUrl pairs from lib/products.ts...");
  const pairs = await extractSlugAmazonPairs();
  console.log(`  ${pairs.length} products found`);

  console.log("Fetching sheet tabs for doc links...");
  const docMap = await buildAmazonToDocMap();
  console.log(`  ${docMap.size} rows mapped`);

  const limit = process.env.SCRAPE_LIMIT ? Number(process.env.SCRAPE_LIMIT) : pairs.length;
  const slugFilter = process.env.SCRAPE_SLUGS ? new Set(process.env.SCRAPE_SLUGS.split(",")) : null;
  const targets = (slugFilter ? pairs.filter((p) => slugFilter.has(p.slug)) : pairs).slice(0, limit);

  const enrichmentPath = path.join(ROOT, "data/enrichment.json");
  const enrichment = JSON.parse(await fs.readFile(enrichmentPath, "utf8").catch(() => "{}"));
  let docHits = 0, imgHits = 0, reviewHits = 0;

  for (const [i, { slug, amazonUrl }] of targets.entries()) {
    process.stdout.write(`[${i + 1}/${targets.length}] ${slug} ... `);
    const entry = { images: [], rating: null, reviews: [], doc: null };

    const docUrl = docMap.get(amazonUrl);
    if (docUrl) {
      try {
        const text = await fetchDocText(docUrl);
        if (text) {
          const parsed = parseDoc(text);
          if (parsed) { entry.doc = parsed; docHits++; }
        }
      } catch (e) { /* ignore */ }
    }

    try {
      const html = await fetchAmazon(amazonUrl);
      const { images, rating, reviews } = parseAmazon(html);
      entry.rating = rating;
      entry.reviews = reviews;
      if (rating) imgHits += images.length ? 0 : 0; // noop, keep counts below
      if (reviews.length) reviewHits++;
      const saved = await downloadImages(slug, images);
      entry.images = saved;
      if (saved.length) imgHits++;
    } catch (e) {
      console.warn(`amazon fetch failed: ${e.message}`);
    }

    enrichment[slug] = entry;
    console.log(`doc=${entry.doc ? "y" : "n"} images=${entry.images.length} rating=${entry.rating ? entry.rating.value : "-"} reviews=${entry.reviews.length}`);
    await sleep(250);
  }

  await fs.mkdir(path.join(ROOT, "data"), { recursive: true });
  await fs.writeFile(enrichmentPath, JSON.stringify(enrichment, null, 2));
  console.log(`\nDone. docs=${docHits}/${targets.length} images=${imgHits}/${targets.length} reviews=${reviewHits}/${targets.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
