// Builds public/prisma-house-portfolio.pdf from lib/work.ts and the screenshots in public/work.
//   npm run portfolio          (needs: npx playwright install chromium — once)
// Published projects only. Same labels and wording as the site; no metrics, no testimonials.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { WORK, resolveImage } from "../lib/work.ts";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "prisma-house-portfolio.pdf");
const file = (rel) => pathToFileURL(path.join(ROOT, rel)).href;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Service titles come from lib/services.tsx so the intro page stays in sync.
const servicesSrc = fs.readFileSync(path.join(ROOT, "lib", "services.tsx"), "utf8");
const SERVICES = [...servicesSrc.matchAll(/slug: "[^"]+",\s*group: "(consult|build)",\s*title: "([^"]+)"/g)].map((m) => ({ group: m[1], title: m[2] }));

const PRISM = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pg" x1="0" y1="28" x2="28" y2="0"><stop offset="0%" stop-color="#7C5CFF"/><stop offset="40%" stop-color="#E14ECA"/><stop offset="75%" stop-color="#FFB347"/><stop offset="100%" stop-color="#4ED9E1"/></linearGradient></defs><path d="M14 2L26 24H2L14 2Z" stroke="url(#pg)" stroke-width="2.4" stroke-linejoin="round"/><path d="M14 9L20.5 21H7.5L14 9Z" fill="url(#pg)" opacity="0.45"/></svg>`;

const logo = (size = 22) => `<span class="logo" style="--s:${size}px"><span class="mark">${PRISM}</span><span class="word">Prisma<span class="dim"> House</span></span></span>`;
const img = (key, variant) => { const r = resolveImage(key, variant); return r ? { src: file("public" + r.src), w: r.width, h: r.height } : null; };
const firstSentences = (text, max = 360) => { if (text.length <= max) return text; const cut = text.slice(0, max); const i = cut.lastIndexOf(". "); return (i > 120 ? cut.slice(0, i + 1) : cut.trimEnd() + "…"); };

function projectPages(p) {
  const hero = img(p.heroImage, "desktop");
  const mobileKey = (p.images.find((i) => i.key === p.heroImage && img(i.key, "mobile")) || p.images.find((i) => img(i.key, "mobile")))?.key;
  const mobile = mobileKey ? img(mobileKey, "mobile") : null;
  const landscape = hero ? hero.h / hero.w < 0.8 : false; // wide app screens vs tall web pages
  const allExtras = p.images.filter((i) => i.key !== p.heroImage && img(i.key, "desktop"));
  const inline = landscape ? allExtras[0] : null; // shown on page 1 under the hero
  const extras = (landscape ? allExtras.slice(1) : allExtras).slice(0, 2);
  const groups = p.featureGroups.slice(0, 4).map((g) => ({ title: g.title, items: g.items.slice(0, 2) }));
  const chips = [`<span class="chip">${esc(p.clientLabel)}</span>`, `<span class="chip muted">${esc(p.category)}</span>`, !p.liveUrl && p.statusNote ? `<span class="chip amber">${esc(p.statusNote)}</span>` : ""].join("");
  const live = p.liveUrl ? `<p class="live">${esc(p.liveUrl.replace(/^https?:\/\//, ""))}</p>` : "";
  const page1 = `
  <section class="page project">
    <header class="ph">${logo(14)}<span class="crumb">Selected work · ${esc(p.name)}</span></header>
    <div class="cols">
      <div class="text">
        <div class="chips">${chips}</div>
        <h2>${esc(p.name)}</h2>
        <p class="tag">${esc(p.tagline)}</p>
        <p class="brief">${esc(firstSentences(p.brief[0]))}</p>
        <div class="groups">${groups.map((g) => `<div class="g"><h4>${esc(g.title)}</h4><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
        <p class="stack"><span>Stack</span> ${esc(p.stack.join(" · "))}</p>
        ${p.provenance ? `<p class="prov">${esc(p.provenance)}</p>` : ""}
        ${live}
      </div>
      <div class="shots${landscape ? " landscape" : ""}">
        ${hero ? `<figure class="desk"><img src="${hero.src}" alt=""></figure>` : ""}
        ${inline ? `<figure class="desk second"><img src="${img(inline.key, "desktop").src}" alt=""></figure>` : ""}
        ${mobile ? `<figure class="mob"><img src="${mobile.src}" alt=""></figure>` : ""}
      </div>
    </div>
    <footer class="pf"><span>prisma-house.com</span><span class="beam"></span></footer>
  </section>`;
  const page2 = extras.length ? `
  <section class="page project two">
    <header class="ph">${logo(14)}<span class="crumb">Selected work · ${esc(p.name)} · screens</span></header>
    <div class="pair${extras.length === 1 ? " single" : ""}">${extras.map((i) => { const d = img(i.key, "desktop"); return `<figure class="desk wide"><img src="${d.src}" alt=""><figcaption>${esc(i.alt)}</figcaption></figure>`; }).join("")}</div>
    <footer class="pf"><span>prisma-house.com</span><span class="beam"></span></footer>
  </section>` : "";
  return page1 + page2;
}

const projects = WORK.filter((p) => p.published);
const consult = SERVICES.filter((s) => s.group === "consult"), build = SERVICES.filter((s) => s.group === "build");

const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Prisma House — Selected Work</title>
<style>
@font-face{font-family:"Display";src:url("${file("assets/BricolageGrotesque-ExtraBold.ttf")}");font-weight:800}
@font-face{font-family:"Body";src:url("${file("assets/Manrope-Medium.ttf")}");font-weight:500}
@page{size:A4 landscape;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0A0A0C;color:#F4F2EE;font-family:"Body",system-ui,sans-serif;font-size:10.5pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:297mm;height:210mm;padding:14mm 16mm 12mm;position:relative;overflow:hidden;break-after:page;page-break-after:always;background:#0A0A0C;display:flex;flex-direction:column}
.page:last-child{break-after:auto;page-break-after:auto}
h1,h2,h3,h4,.word{font-family:"Display",sans-serif;letter-spacing:-0.02em;line-height:1.02}
.logo{display:inline-flex;align-items:center;gap:calc(var(--s)*.4)}.logo .mark svg{width:calc(var(--s)*1.3);height:calc(var(--s)*1.3);display:block}.logo .word{font-size:var(--s);letter-spacing:-0.02em}.logo .dim{color:#A7A5A0;font-family:"Body";font-weight:500}
.eyebrow{font-size:7.5pt;letter-spacing:.28em;text-transform:uppercase;color:#A7A5A0}
.prism{background:linear-gradient(100deg,#7C5CFF 0%,#E14ECA 38%,#FFB347 72%,#4ED9E1 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.beam{display:block;height:1px;flex:1;background:linear-gradient(90deg,transparent,#7C5CFF 20%,#E14ECA 45%,#FFB347 70%,#4ED9E1 90%,transparent)}
.ph{display:flex;justify-content:space-between;align-items:center;margin-bottom:6mm}.crumb{font-size:8pt;color:#6E6C68}
.pf{margin-top:auto;display:flex;align-items:center;gap:6mm;font-size:7.5pt;color:#6E6C68;padding-top:4mm}
/* cover */
.cover{justify-content:center;align-items:flex-start}.cover .orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.28}.cover h1{font-size:64pt;margin:10mm 0 4mm}.cover .tag{font-size:16pt;color:#A7A5A0;max-width:150mm}.cover .big{--s:28px}
/* intro */
.intro .cols{display:grid;grid-template-columns:1.1fr 1fr;gap:16mm;align-items:start}.intro h2{font-size:30pt;margin-bottom:6mm}.intro p{color:#A7A5A0;font-size:11pt;margin-bottom:4mm;max-width:130mm}
.svc{border:1px solid #232329;border-radius:4mm;padding:6mm 7mm;background:#141419;margin-bottom:5mm}.svc h3{font-size:12pt;margin-bottom:3mm}.svc .eyebrow{display:block;margin-bottom:2mm;color:#7C5CFF}.svc li{list-style:none;padding:1.4mm 0;border-top:1px solid #232329;font-size:10pt}.svc li:first-child{border-top:0}
/* project */
.project .cols{display:grid;grid-template-columns:118mm 1fr;gap:12mm;flex:1;min-height:0}
.chips{display:flex;gap:2mm;flex-wrap:wrap;margin-bottom:4mm}.chip{font-size:7pt;letter-spacing:.12em;text-transform:uppercase;border:1px solid #232329;border-radius:99px;padding:1.2mm 3mm;color:#A7A5A0}.chip.muted{color:#6E6C68}.chip.amber{border-color:rgba(255,179,71,.4);color:#FFB347;text-transform:none;letter-spacing:0}
.project h2{font-size:28pt;margin-bottom:2.5mm}.tag{font-family:"Display";color:#7C5CFF;font-size:11.5pt;line-height:1.25;margin-bottom:4mm}.brief{color:#A7A5A0;font-size:9.5pt;margin-bottom:5mm}
.groups{display:grid;grid-template-columns:1fr 1fr;gap:3mm 6mm;margin-bottom:5mm}.g h4{font-size:9pt;margin-bottom:1.2mm}.g li{list-style:none;font-size:8.3pt;color:#A7A5A0;padding-left:4mm;position:relative;line-height:1.35;margin-bottom:.8mm}.g li::before{content:"";position:absolute;left:0;top:1.9mm;width:2mm;height:2mm;border-radius:50%;background:linear-gradient(135deg,#7C5CFF,#4ED9E1)}
.stack{font-size:8pt;color:#A7A5A0;border-top:1px solid #232329;padding-top:3mm}.stack span{font-family:"Display";color:#F4F2EE;margin-right:2mm}
.prov{font-size:7.5pt;color:#6E6C68;border-left:2px solid rgba(255,179,71,.6);padding-left:3mm;margin-top:3mm}.live{font-size:8pt;color:#4ED9E1;margin-top:3mm}
.shots{display:grid;grid-template-columns:1fr 34mm;gap:5mm;align-content:start;align-items:start;min-height:0}
.shots.landscape .desk:first-child{grid-column:1 / -1}.shots.landscape .second{grid-column:1}.shots.landscape .mob{grid-column:2}.shots.landscape .mob img{max-height:62mm}.shots.landscape .second img{max-height:62mm}
figure{border:1px solid #232329;border-radius:3mm;overflow:hidden;background:#141419}figure img{width:100%;display:block;object-fit:cover;object-position:top}
.shots .desk{grid-column:1}.shots .desk img{height:auto;max-height:112mm}.shots .mob img{height:auto;max-height:112mm}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:8mm;flex:1;min-height:0;align-items:start}.pair.single{grid-template-columns:1fr}.pair.single .desk img{max-height:150mm}.pair .desk img{height:auto;max-height:138mm}figcaption{font-size:7.5pt;color:#6E6C68;padding:2mm 3mm;border-top:1px solid #232329}
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
      <p style="margin-top:8mm;color:#6E6C68;font-size:9pt">The projects that follow list real features taken from each codebase and show real screens. No invented numbers, no borrowed testimonials.</p>
    </div>
    <div>
      <div class="svc"><span class="eyebrow">Consult · Strategy &amp; growth</span><ul>${consult.map((s) => `<li>${esc(s.title)}</li>`).join("")}</ul></div>
      <div class="svc"><span class="eyebrow">Build · Digital infrastructure</span><ul>${build.map((s) => `<li>${esc(s.title)}</li>`).join("")}</ul></div>
    </div>
  </div>
  <footer class="pf"><span>prisma-house.com</span><span class="beam"></span></footer>
</section>

${projects.map(projectPages).join("")}

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
// re-encode the screenshots at the size they are actually shown and keep the PDF small.
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Downscale every screenshot to its rendered box (top-anchored crop) as JPEG before printing.
await page.evaluate(async () => {
  const imgs = [...document.querySelectorAll("figure img")];
  await Promise.all(imgs.map((im) => im.complete ? null : new Promise((r) => { im.onload = r; im.onerror = r; })));
  for (const im of imgs) {
    const box = im.getBoundingClientRect(); if (!box.width || !im.naturalWidth) continue;
    const scale = Math.min(1, (box.width * 3.2) / im.naturalWidth); // ~3.2 px per CSS px ≈ 240 dpi on A4
    const cropH = Math.min(im.naturalHeight, im.naturalWidth * (box.height / box.width));
    const c = document.createElement("canvas"); c.width = Math.round(im.naturalWidth * scale); c.height = Math.round(cropH * scale);
    c.getContext("2d").drawImage(im, 0, 0, im.naturalWidth, cropH, 0, 0, c.width, c.height);
    im.src = c.toDataURL("image/jpeg", 0.8);
  }
  await Promise.all(imgs.map((im) => im.complete ? null : new Promise((r) => { im.onload = r; im.onerror = r; })));
});
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
