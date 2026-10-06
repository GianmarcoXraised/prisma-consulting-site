// Builds public/prisma-house-portfolio.pdf from lib/work.ts and the real-scale crops in public/work.
//   npm run portfolio          (needs: npx playwright install chromium — once)
// Published projects only. One page per project: the hero crop plus three feature crops, with the
// same labels and wording as the site; no metrics, no testimonials.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { WORK, resolveImage } from "../lib/work.ts";
import { CATEGORIES } from "../lib/categories.ts";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "prisma-house-portfolio.pdf");
const file = (rel) => pathToFileURL(path.join(ROOT, rel)).href;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Service titles come from lib/services.tsx so the intro page stays in sync.
const servicesSrc = fs.readFileSync(path.join(ROOT, "lib", "services.tsx"), "utf8");
const SERVICES = [...servicesSrc.matchAll(/slug: "[^"]+",\s*group: "(consult|build)",\s*title: "([^"]+)"/g)].map((m) => ({ group: m[1], title: m[2] }));

const PRISM = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pg" x1="0" y1="28" x2="28" y2="0"><stop offset="0%" stop-color="#7C5CFF"/><stop offset="40%" stop-color="#E14ECA"/><stop offset="75%" stop-color="#FFB347"/><stop offset="100%" stop-color="#4ED9E1"/></linearGradient></defs><path d="M14 2L26 24H2L14 2Z" stroke="url(#pg)" stroke-width="2.4" stroke-linejoin="round"/><path d="M14 9L20.5 21H7.5L14 9Z" fill="url(#pg)" opacity="0.45"/></svg>`;

const logo = (size = 22) => `<span class="logo" style="--s:${size}px"><span class="mark">${PRISM}</span><span class="word">Prisma<span class="dim"> House</span></span></span>`;
const img = (key) => { const r = resolveImage(key); return r ? { src: file("public" + r.src), w: r.width, h: r.height } : null; };


const domain = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
function projectPage(p) {
  const hero = img(p.heroImage);
  const feats = p.features.filter((f) => img(f.image)).slice(0, 3);
  const chips = p.components.map((c) => `<span class="chip">${esc(c)}</span>`).join("");
  const status = "";
  const live = "";
  const footLink = p.siteUrl ? `<a class="flink" href="${esc(p.siteUrl)}">Live at ${esc(domain(p.siteUrl))} →</a>` : `<span class="flink muted">${esc(p.privateNote ?? "Private system, demo on request")}</span>`;
  const heroFig = hero
    ? `<figure class="hero"><img src="${hero.src}" alt=""></figure>`
    : `<figure class="hero empty"></figure>`;
  const featFigs = feats.length
    ? `<div class="feats">${feats.map((f) => { const d = img(f.image); return `<figure class="feat"><img src="${d.src}" alt=""><figcaption><b>${esc(f.title)}</b>${esc(f.text)}</figcaption></figure>`; }).join("")}</div>`
    : `<div class="feats text">${p.features.slice(0, 3).map((f) => `<div class="feat"><figcaption><b>${esc(f.title)}</b>${esc(f.text)}</figcaption></div>`).join("")}</div>`;
  return `
  <section class="page project">
    <header class="ph">${logo(14)}<span class="crumb">Selected work · ${esc(p.category)}</span></header>
    <div class="top">
      ${heroFig}
      <div class="text">
        <p class="label">${esc(p.kind)}</p>
        <h2>${esc(p.category)}</h2>
        <p class="tagline">${esc(p.tagline)}</p>
        <p class="problem">${esc(p.problem)}</p>
        <div class="chips">${chips}${status}</div>
        <p class="stack"><span>Built with</span> ${esc(p.stack.join(" · "))}</p>
        ${live}
      </div>
    </div>
    ${featFigs}
    ${p.provenance ? `<p class="prov">${esc(p.provenance)}</p>` : ""}
    <footer class="pf"><span>prisma-house.com</span><span class="beam"></span>${footLink}</footer>
  </section>`;
}

const projects = WORK.filter((p) => p.published);
// One page per category (typographic tile + sentence + chips), followed by that category's examples.
function categoryPage(c, n) {
  return `
  <section class="page category">
    <header class="ph">${logo(14)}<span class="crumb">What we build · ${String(n).padStart(2, "0")} of ${CATEGORIES.length}</span></header>
    <div class="cat-cols">
      <div class="tile" style="background:${c.gradient}"><div class="orb2"></div><span class="code">${esc(c.code)}</span><span class="cname">${esc(c.name)}</span></div>
      <div class="cat-text">
        <p class="eyebrow">${esc(c.code)}</p>
        <h2>${esc(c.name)}</h2>
        <p class="blurb">${esc(c.blurb)}</p>
        <div class="chips">${c.chips.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        <p class="examples">${c.examples.length === 1 ? "The example on the next page" : "The examples on the next pages"}: ${c.examples.map((slug) => WORK.find((p) => p.slug === slug)).filter(Boolean).map((p) => esc(p.category)).join(" · ")}.</p>
      </div>
    </div>
    <footer class="pf"><span>prisma-house.com</span><span class="beam"></span></footer>
  </section>`;
}
const sections = CATEGORIES.map((c, i) => categoryPage(c, i + 1) + c.examples.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean).map(projectPage).join("")).join("");
const consult = SERVICES.filter((s) => s.group === "consult"), build = SERVICES.filter((s) => s.group === "build");

const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Prisma House — Selected Work</title>
<style>
@font-face{font-family:"Display";src:url("${file("assets/BricolageGrotesque-ExtraBold.ttf")}");font-weight:800}
@font-face{font-family:"Display";src:url("${file("assets/BricolageGrotesque-ExtraBold.ttf")}");font-weight:600 700}
@font-face{font-family:"Body";src:url("${file("assets/Manrope-Medium.ttf")}");font-weight:500}
@page{size:A4 landscape;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0A0A0C;color:#F4F2EE;font-family:"Body",system-ui,sans-serif;font-size:10.5pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:297mm;height:210mm;padding:12mm 16mm 10mm;position:relative;overflow:hidden;break-after:page;page-break-after:always;background:#0A0A0C;display:flex;flex-direction:column}
.page:last-child{break-after:auto;page-break-after:auto}
h1,h2,h3,h4,.word{font-family:"Display",sans-serif;letter-spacing:-0.02em;line-height:1.02}
.logo{display:inline-flex;align-items:center;gap:calc(var(--s)*.4)}.logo .mark svg{width:calc(var(--s)*1.3);height:calc(var(--s)*1.3);display:block}.logo .word{font-size:var(--s);letter-spacing:-0.02em}.logo .dim{color:#A7A5A0;font-family:"Body";font-weight:500}
.eyebrow{font-size:7.5pt;letter-spacing:.28em;text-transform:uppercase;color:#A7A5A0}
.prism{background:linear-gradient(100deg,#7C5CFF 0%,#E14ECA 38%,#FFB347 72%,#4ED9E1 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.beam{display:block;height:1px;flex:1;background:linear-gradient(90deg,transparent,#7C5CFF 20%,#E14ECA 45%,#FFB347 70%,#4ED9E1 90%,transparent)}
.ph{display:flex;justify-content:space-between;align-items:center;margin-bottom:5mm}.crumb{font-size:8pt;color:#6E6C68}
.pf{margin-top:auto;display:flex;align-items:center;gap:6mm;font-size:7.5pt;color:#6E6C68;padding-top:3mm}
/* cover */
.cover{justify-content:center;align-items:flex-start}.cover .orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.28}.cover h1{font-size:64pt;margin:10mm 0 4mm}.cover .tag{font-size:16pt;color:#A7A5A0;max-width:150mm}.cover .big{--s:28px}
/* intro */
.intro .cols{display:grid;grid-template-columns:1.1fr 1fr;gap:16mm;align-items:start}.intro h2{font-size:30pt;margin-bottom:6mm}.intro p{color:#A7A5A0;font-size:11pt;margin-bottom:4mm;max-width:130mm}
.svc{border:1px solid #232329;border-radius:4mm;padding:6mm 7mm;background:#141419;margin-bottom:5mm}.svc h3{font-size:12pt;margin-bottom:3mm}.svc .eyebrow{display:block;margin-bottom:2mm;color:#7C5CFF}.svc li{list-style:none;padding:1.4mm 0;border-top:1px solid #232329;font-size:10pt}.svc li:first-child{border-top:0}
/* category */
.category .cat-cols{display:grid;grid-template-columns:120mm 1fr;gap:14mm;align-items:center;flex:1}
.tile{position:relative;overflow:hidden;border-radius:8mm;border:1px solid #232329;aspect-ratio:4/3;display:flex;flex-direction:column;justify-content:flex-end;padding:10mm}
.tile .orb2{position:absolute;right:-20mm;top:-20mm;width:60mm;height:60mm;border-radius:50%;filter:blur(25mm);opacity:.5;background:linear-gradient(135deg,#7C5CFF,#4ED9E1)}
.tile .code{position:relative;font-family:"Display";font-size:52pt;letter-spacing:-0.04em;line-height:1}.tile .cname{position:relative;margin-top:4mm;font-size:10pt;color:#A7A5A0}
.category h2{font-size:30pt;margin:4mm 0 5mm}.category .blurb{font-size:12pt;color:#A7A5A0;max-width:110mm;margin-bottom:6mm}.category .examples{font-size:9pt;color:#6E6C68;margin-top:8mm}
/* project: hero + text on top, three features below */
.project .top{display:grid;grid-template-columns:136mm 1fr;gap:8mm;align-items:start;margin-bottom:4mm;max-height:89mm;overflow:hidden}
figure{border:1px solid #232329;border-radius:3mm;overflow:hidden;background:#141419}figure img{width:100%;display:block}
figure.hero{box-shadow:0 10mm 20mm -8mm rgba(0,0,0,.8)}figure.hero.empty{aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(124,92,255,.15),#141419 50%,rgba(78,217,225,.1))}
.label{font-size:7pt;letter-spacing:.2em;text-transform:uppercase;color:#7C5CFF;margin-bottom:2.5mm}
.project h2{font-size:15pt;line-height:1.1;margin-bottom:2mm}.tagline{font-family:"Display";font-size:9pt;line-height:1.3;margin-bottom:2mm}.problem{color:#A7A5A0;font-size:8pt;margin-bottom:3mm}
.flink{color:#4ED9E1;text-decoration:none;font-size:7.5pt}.flink.muted{color:#A7A5A0}
.chips{display:flex;gap:1.5mm;flex-wrap:wrap;margin-bottom:4mm}.chip{font-size:7pt;border:1px solid #232329;border-radius:99px;padding:1mm 2.6mm;color:#A7A5A0}.chip.amber{border-color:rgba(255,179,71,.4);color:#FFB347}
.stack{font-size:8pt;color:#A7A5A0;border-top:1px solid #232329;padding-top:2.5mm;line-height:1.4}.stack span{font-family:"Display";color:#F4F2EE;margin-right:2mm}
.live{font-size:8pt;color:#4ED9E1;margin-top:2.5mm}
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm}
.feat{border:1px solid #232329;border-radius:3mm;overflow:hidden;background:#141419}.feat img{width:100%;display:block;border-bottom:1px solid #232329}
figcaption,.feats.text figcaption{display:block;padding:2mm 3mm;font-size:7pt;color:#A7A5A0;line-height:1.3}figcaption b{display:block;font-family:"Display";color:#F4F2EE;font-size:8pt;margin-bottom:.8mm;letter-spacing:-0.01em}
.feats.text .feat{padding:0}.feats.text figcaption{padding:4mm}
.prov{font-size:6.5pt;color:#6E6C68;margin-top:2mm}
/* closing */
.closing{justify-content:center}.closing h2{font-size:44pt;margin:6mm 0}.closing p{font-size:12pt;color:#A7A5A0;max-width:150mm}.closing .contact{margin-top:10mm;display:grid;grid-template-columns:auto auto auto;gap:14mm;font-size:10pt}.closing .contact b{display:block;font-family:"Display";color:#F4F2EE;font-size:9pt;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.5mm}.closing .contact span{color:#A7A5A0}
</style></head><body>

<section class="page cover">
  <div class="orb" style="left:-40mm;top:-30mm;width:140mm;height:140mm;background:linear-gradient(135deg,#7C5CFF,#E14ECA)"></div>
  <div class="orb" style="right:-50mm;bottom:-50mm;width:170mm;height:170mm;background:linear-gradient(225deg,#4ED9E1,#7C5CFF)"></div>
  <div style="position:relative">${logo(28)}
  <p class="eyebrow" style="margin-top:22mm">Portfolio · ${new Date().getFullYear()}</p>
  <h1>Selected <span class="prism">Work</span></h1>
  <p class="tag">We shape the strategy. Then we build it.</p></div>
  <footer class="pf" style="position:absolute;left:16mm;right:16mm;bottom:12mm"><span>prisma-house.com</span><span class="beam"></span></footer>
</section>

<section class="page intro">
  <header class="ph">${logo(14)}<span class="crumb">One consultancy, two connected halves</span></header>
  <div class="cols">
    <div>
      <p class="eyebrow" style="margin-bottom:4mm">Consult + build</p>
      <h2>We shape the strategy.<br><span class="prism">Then we build it.</span></h2>
      <p>Prisma House is a marketing consultancy with two connected halves. The first works out where your growth actually comes from — brand, demand, content, media pitching and the honest audit — and holds every recommendation to a commercial number, not a vanity metric.</p>
      <p>The second builds the digital infrastructure that runs it: the website that sells and the systems that keep the business moving, designed and looked after by the same team that set the direction. Because advice that never ships is just opinion, we build what we recommend.</p>
      <p style="margin-top:8mm;color:#6E6C68;font-size:9pt">The projects that follow show real screens at their real scale, cropped to the part that matters. No invented numbers, no borrowed testimonials.</p>
    </div>
    <div>
      <div class="svc"><span class="eyebrow">Consult · Strategy &amp; growth</span><ul>${consult.map((s) => `<li>${esc(s.title)}</li>`).join("")}</ul></div>
      <div class="svc"><span class="eyebrow">Build · Digital infrastructure</span><ul>${build.map((s) => `<li>${esc(s.title)}</li>`).join("")}</ul></div>
    </div>
  </div>
  <footer class="pf"><span>prisma-house.com</span><span class="beam"></span></footer>
</section>

${sections}

<section class="page closing">
  <div class="orb" style="position:absolute;right:-40mm;top:-40mm;width:150mm;height:150mm;border-radius:50%;filter:blur(70px);opacity:.25;background:linear-gradient(135deg,#E14ECA,#FFB347)"></div>
  <div style="position:relative">${logo(18)}
  <p class="eyebrow" style="margin-top:16mm">Ready when you are</p>
  <h2>Book a <span class="prism">30-minute call.</span></h2>
  <p>No pitch deck, no pressure — a straight conversation about where your growth is hiding, and whether the answer is a strategy, a website, a system, or all three.</p>
  <div class="contact">
    <div><b>Web</b><span>prisma-house.com</span></div>
    <div><b>Email</b><span>info@prisma-house.com</span></div>
    <div><b>Address</b><span>950 Great West Rd, Suite 2, Floor 1,<br>Profile West, TW8 9ES Brentford, UK</span></div>
  </div></div>
  <footer class="pf" style="position:absolute;left:16mm;right:16mm;bottom:12mm"><span>© ${new Date().getFullYear()} Prisma House. All rights reserved.</span><span class="beam"></span></footer>
</section>
</body></html>`;

const tmp = path.join(os.tmpdir(), `prisma-portfolio-${Date.now()}.html`);
fs.writeFileSync(tmp, html);
// file:// pages are each their own origin, which taints canvases; this flag lets us
// re-encode the crops at the size they are actually shown and keep the PDF small.
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Downscale every crop to its rendered box as JPEG before printing (whole image, no cropping).
await page.evaluate(async () => {
  const imgs = [...document.querySelectorAll("figure img")];
  await Promise.all(imgs.map((im) => im.complete ? null : new Promise((r) => { im.onload = r; im.onerror = r; })));
  for (const im of imgs) {
    const box = im.getBoundingClientRect(); if (!box.width || !im.naturalWidth) continue;
    const scale = Math.min(1, (box.width * 3.2) / im.naturalWidth); // ~3.2 px per CSS px ≈ 240 dpi on A4
    const c = document.createElement("canvas"); c.width = Math.round(im.naturalWidth * scale); c.height = Math.round(im.naturalHeight * scale);
    c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
    im.src = c.toDataURL("image/jpeg", 0.82);
  }
  await Promise.all(imgs.map((im) => im.complete ? null : new Promise((r) => { im.onload = r; im.onerror = r; })));
});
const overflow = await page.evaluate(() => [...document.querySelectorAll("section.page.project")].map((sec) => { const f = sec.querySelector("footer"); return Math.round(f.getBoundingClientRect().bottom - sec.getBoundingClientRect().bottom) }));
console.log("footer overflow per project page (px, must be <= 0):", overflow.join(", "));
// Optional: PORTFOLIO_PREVIEW_DIR=<dir> also writes one PNG per page for visual checks.
if (process.env.PORTFOLIO_PREVIEW_DIR) {
  fs.mkdirSync(process.env.PORTFOLIO_PREVIEW_DIR, { recursive: true });
  const sections = page.locator("section.page"); const n = await sections.count();
  for (let i = 0; i < n; i++) await sections.nth(i).screenshot({ path: path.join(process.env.PORTFOLIO_PREVIEW_DIR, `page-${String(i + 1).padStart(2, "0")}.png`) });
  console.log(`preview PNGs: ${n} pages -> ${process.env.PORTFOLIO_PREVIEW_DIR}`);
}
await page.pdf({ path: OUT, format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
fs.unlinkSync(tmp);
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`wrote ${path.relative(ROOT, OUT)} — ${projects.length} projects, ${kb} KB`);
