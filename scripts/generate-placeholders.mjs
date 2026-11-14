// Generates editorial SVG placeholders for every product and colour.
// Run with `node scripts/generate-placeholders.mjs`. Replace these files with
// real photography before launch — the rest of the app only relies on the
// naming convention.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const products = JSON.parse(
  await readFile(path.join(process.cwd(), "src", "data", "products.json"), "utf8"),
);

const outDir = path.join(process.cwd(), "public", "products");
await mkdir(outDir, { recursive: true });

const BACKGROUNDS = [
  ["#EDE3D4", "#DACDBB"],
  ["#EAE0D3", "#D6C8B6"],
  ["#E6DED2", "#CEC3B2"],
  ["#F0E8DB", "#DFD3C1"],
  ["#E5DBD0", "#D2C4B8"],
];

function clamp(value, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value));
}

function toRgb(hex) {
  const clean = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(clean.slice(offset, offset + 2), 16));
}

function toHex(rgb) {
  return `#${rgb.map((value) => clamp(Math.round(value)).toString(16).padStart(2, "0")).join("")}`;
}

function shade(hex, amount) {
  const [r, g, b] = toRgb(hex);
  const target = amount < 0 ? 0 : 255;
  const ratio = Math.abs(amount);
  return toHex([r, g, b].map((value) => value + (target - value) * ratio));
}

function mix(hexA, hexB, ratio) {
  const a = toRgb(hexA);
  const b = toRgb(hexB);
  return toHex(a.map((value, index) => value + (b[index] - value) * ratio));
}

function coatDefs(color, id) {
  const light = shade(color, 0.18);
  const deep = shade(color, -0.26);
  const darkest = shade(color, -0.4);
  return `
  <defs>
    <linearGradient id="coat-${id}" x1="0.12" y1="0" x2="0.88" y2="1">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="0.42" stop-color="${color}"/>
      <stop offset="1" stop-color="${deep}"/>
    </linearGradient>
    <linearGradient id="lapel-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${shade(color, 0.1)}"/>
      <stop offset="1" stop-color="${mix(color, deep, 0.55)}"/>
    </linearGradient>
    <pattern id="weave-${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>
      <line x1="3" y1="0" x2="3" y2="6" stroke="#000000" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
    <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="24"/>
    </filter>
    <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>`;
}

const WOMAN_FRONT = (id) => `
  <g>
    <path d="M334 344 C 306 356 286 390 280 440 L 258 770 C 255 800 276 814 302 808 L 328 796 L 344 512 Z" fill="url(#coat-${id})"/>
    <path d="M566 344 C 594 356 614 390 620 440 L 642 770 C 645 800 624 814 598 808 L 572 796 L 556 512 Z" fill="url(#coat-${id})"/>
    <path d="M330 344 C 356 330 384 326 404 324 Q 450 344 496 324 C 516 326 544 330 570 344 L 584 640 L 598 1006 C 516 1024 384 1024 302 1006 L 316 640 Z" fill="url(#coat-${id})"/>
    <path d="M414 336 L 450 636 L 486 336 Z" fill="${shade(colorSafe, -0.5)}" opacity="0.48"/>
    <path d="M414 336 L 454 624 L 428 636 L 382 474 L 370 356 Z" fill="url(#lapel-${id})" stroke="${shade(colorSafe, -0.24)}" stroke-width="1.5"/>
    <path d="M486 336 L 446 624 L 472 636 L 518 474 L 530 356 Z" fill="url(#lapel-${id})" stroke="${shade(colorSafe, -0.24)}" stroke-width="1.5"/>
    <path d="M398 328 Q 450 348 502 328 L 506 312 Q 450 332 394 312 Z" fill="${shade(colorSafe, 0.1)}" stroke="${shade(colorSafe, -0.22)}" stroke-width="1.5"/>
    <path d="M376 366 Q 450 402 524 366" fill="none" stroke="${shade(colorSafe, -0.28)}" stroke-width="1.5" opacity="0.5"/>
    <path d="M316 612 L 584 612 L 588 650 L 312 650 Z" fill="${shade(colorSafe, -0.2)}"/>
    <path d="M316 616 L 584 616" stroke="${shade(colorSafe, 0.24)}" stroke-width="1.5" opacity="0.6"/>
    <rect x="433" y="606" width="34" height="50" rx="5" fill="none" stroke="#C4AB7E" stroke-width="3"/>
    <path d="M433 631 L 467 631" stroke="#C4AB7E" stroke-width="3"/>
    <circle cx="450" cy="692" r="7" fill="${shade(colorSafe, -0.45)}"/>
    <circle cx="450" cy="692" r="2.5" fill="${shade(colorSafe, 0.34)}"/>
    <circle cx="450" cy="748" r="7" fill="${shade(colorSafe, -0.45)}"/>
    <circle cx="450" cy="748" r="2.5" fill="${shade(colorSafe, 0.34)}"/>
    <path d="M338 726 L 398 720 L 400 734 L 340 740 Z" fill="${shade(colorSafe, -0.14)}" stroke="${shade(colorSafe, -0.3)}" stroke-width="1"/>
    <path d="M562 726 L 502 720 L 500 734 L 560 740 Z" fill="${shade(colorSafe, -0.14)}" stroke="${shade(colorSafe, -0.3)}" stroke-width="1"/>
    <path d="M450 652 L 450 1004" stroke="${shade(colorSafe, -0.35)}" stroke-width="1.5" opacity="0.26"/>
    <path d="M360 872 Q 402 892 440 886" stroke="${shade(colorSafe, -0.4)}" stroke-width="2" fill="none" opacity="0.2"/>
    <path d="M540 872 Q 498 892 460 886" stroke="${shade(colorSafe, -0.4)}" stroke-width="2" fill="none" opacity="0.2"/>
    <path d="M334 344 C 306 356 286 390 280 440 L 258 770" fill="none" stroke="${shade(colorSafe, 0.2)}" stroke-width="1.5" opacity="0.4"/>
    <path d="M330 344 C 356 330 384 326 404 324 Q 450 344 496 324 C 516 326 544 330 570 344 L 584 640 L 598 1006 C 516 1024 384 1024 302 1006 L 316 640 Z" fill="url(#weave-${id})" opacity="0.3"/>
    <path d="M330 344 C 356 330 384 326 404 324 Q 450 344 496 324 C 516 326 544 330 570 344" fill="none" stroke="${shade(colorSafe, 0.22)}" stroke-width="1.5" opacity="0.5"/>
  </g>`;

const MAN_FRONT = (id) => `
  <g>
    <path d="M322 346 C 292 358 272 394 266 446 L 246 786 C 243 814 264 826 290 820 L 316 808 L 334 514 Z" fill="url(#coat-${id})"/>
    <path d="M578 346 C 608 358 628 394 634 446 L 654 786 C 657 814 636 826 610 820 L 584 808 L 566 514 Z" fill="url(#coat-${id})"/>
    <path d="M316 344 C 344 328 382 324 404 322 Q 450 344 496 322 C 518 324 556 328 584 344 L 594 1008 C 516 1024 384 1024 306 1008 Z" fill="url(#coat-${id})"/>
    <path d="M412 334 L 450 560 L 488 334 Z" fill="${shade(colorSafe, -0.5)}" opacity="0.48"/>
    <path d="M412 334 L 450 552 L 416 646 L 374 476 L 376 354 Z" fill="url(#lapel-${id})" stroke="${shade(colorSafe, -0.24)}" stroke-width="1.5"/>
    <path d="M488 334 L 450 552 L 484 646 L 526 476 L 524 354 Z" fill="url(#lapel-${id})" stroke="${shade(colorSafe, -0.24)}" stroke-width="1.5"/>
    <path d="M378 330 L 354 316 L 414 328 L 450 346 L 486 328 L 546 316 L 522 330 Q 450 370 378 330 Z" fill="${shade(colorSafe, 0.06)}" stroke="${shade(colorSafe, -0.22)}" stroke-width="1.5"/>
    <circle cx="450" cy="692" r="7" fill="${shade(colorSafe, -0.45)}"/>
    <circle cx="450" cy="692" r="2.5" fill="${shade(colorSafe, 0.34)}"/>
    <circle cx="450" cy="756" r="7" fill="${shade(colorSafe, -0.45)}"/>
    <circle cx="450" cy="756" r="2.5" fill="${shade(colorSafe, 0.34)}"/>
    <path d="M336 730 L 400 726 L 401 740 L 338 744 Z" fill="${shade(colorSafe, -0.14)}" stroke="${shade(colorSafe, -0.3)}" stroke-width="1"/>
    <path d="M564 730 L 500 726 L 499 740 L 562 744 Z" fill="${shade(colorSafe, -0.14)}" stroke="${shade(colorSafe, -0.3)}" stroke-width="1"/>
    <path d="M450 648 L 450 1004" stroke="${shade(colorSafe, -0.35)}" stroke-width="1.5" opacity="0.24"/>
    <path d="M450 640 L 450 890" stroke="${shade(colorSafe, -0.42)}" stroke-width="1" opacity="0.18"/>
    <path d="M322 346 C 292 358 272 394 266 446 L 246 786" fill="none" stroke="${shade(colorSafe, 0.2)}" stroke-width="1.5" opacity="0.4"/>
    <path d="M316 344 C 344 328 382 324 404 322 Q 450 344 496 322 C 518 324 556 328 584 344 L 594 1008 C 516 1024 384 1024 306 1008 Z" fill="url(#weave-${id})" opacity="0.3"/>
    <path d="M316 344 C 344 328 382 324 404 322 Q 450 344 496 322 C 518 324 556 328 584 344" fill="none" stroke="${shade(colorSafe, 0.22)}" stroke-width="1.5" opacity="0.5"/>
  </g>`;

const BACK = (id, gender) => `
  <g>
    <path d="M318 342 C 286 356 264 392 258 444 L 238 782 C 235 810 256 822 284 818 L 314 806 L 332 504 Z" fill="${shade(colorSafe, -0.05)}"/>
    <path d="M582 342 C 614 356 636 392 642 444 L 662 782 C 665 810 644 822 616 818 L 586 806 L 568 504 Z" fill="${shade(colorSafe, -0.05)}"/>
    <path d="M318 340 C 344 320 556 320 582 340 L 592 1008 C 515 1024 385 1024 308 1008 Z" fill="url(#coat-${id})"/>
    <path d="M352 330 Q 450 366 548 330 L 552 312 Q 450 346 348 312 Z" fill="${shade(colorSafe, 0.02)}" stroke="${shade(colorSafe, -0.2)}" stroke-width="1.5"/>
    <path d="M450 360 L 450 1004" stroke="${shade(colorSafe, -0.38)}" stroke-width="2" opacity="0.32"/>
    <path d="M340 392 Q 450 420 560 392" fill="none" stroke="${shade(colorSafe, -0.35)}" stroke-width="1.5" opacity="0.28"/>
    <path d="M450 902 L 450 1006" stroke="${shade(colorSafe, -0.4)}" stroke-width="3" opacity="0.3"/>
    ${gender === "women"
      ? `<path d="M318 614 L 582 614 L 586 656 L 314 656 Z" fill="${shade(colorSafe, -0.22)}"/>
         <circle cx="450" cy="636" r="8" fill="${shade(colorSafe, -0.45)}"/>
         <circle cx="450" cy="636" r="3" fill="${shade(colorSafe, 0.3)}"/>`
      : ""}
    <path d="M318 340 C 344 320 556 320 582 340 L 592 1008 C 515 1024 385 1024 308 1008 Z" fill="url(#weave-${id})" opacity="0.35"/>
  </g>`;

let colorSafe = "#3C3B39";

function svg({ color, gender, seed, variant, index }) {
  colorSafe = color;
  const id = `${seed}${index}`;
  const [bgFrom, bgTo] = BACKGROUNDS[seed % BACKGROUNDS.length];
  const isDetail = variant === "detail";
  const isBack = variant === "back";
  const viewBox = isDetail ? "240 236 480 640" : "0 0 900 1200";

  const coatMarkup =
    variant === "detail"
      ? (gender === "women" ? WOMAN_FRONT(id) : MAN_FRONT(id))
      : isBack
        ? BACK(id, gender)
        : gender === "women"
          ? WOMAN_FRONT(id)
          : MAN_FRONT(id);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="${viewBox}" role="img">
${coatDefs(color, id)}
  <rect width="900" height="1200" fill="${bgFrom}"/>
  <rect width="900" height="1200" fill="${bgTo}" opacity="0.55"/>
  <circle cx="470" cy="470" r="330" fill="#FFFFFF" opacity="0.22"/>
  <circle cx="470" cy="470" r="330" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1.5"/>
  <path d="M0 1078 H900" stroke="${shade(bgTo, -0.18)}" stroke-width="1" opacity="0.5"/>
  <ellipse cx="450" cy="1042" rx="252" ry="26" fill="${shade(bgTo, -0.5)}" opacity="0.22" filter="url(#soft-${id})"/>
  ${coatMarkup}
  <rect width="900" height="1200" fill="#FFFFFF" opacity="0.03"/>
  <rect width="900" height="1200" filter="url(#grain-${id})" opacity="0.06"/>
</svg>`;
}

for (const [index, product] of products.entries()) {
  const seed = index + 1;
  for (const color of product.colors) {
    const front = svg({ color: color.hex, gender: product.gender, seed, variant: "front", index: color.slug });
    const detail = svg({ color: color.hex, gender: product.gender, seed, variant: "detail", index: `${color.slug}-detail` });
    const back = svg({ color: color.hex, gender: product.gender, seed, variant: "back", index: `${color.slug}-back` });
    await writeFile(path.join(outDir, `${product.slug}-${color.slug}.svg`), front);
    await writeFile(path.join(outDir, `${product.slug}-${color.slug}-detail.svg`), detail);
    await writeFile(path.join(outDir, `${product.slug}-${color.slug}-back.svg`), back);
  }
  console.log(`generated ${product.slug}`);
}

console.log(`done: ${products.length} products`);
