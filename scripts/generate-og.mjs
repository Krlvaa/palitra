import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const products = JSON.parse(
  await readFile(path.join(process.cwd(), "src", "data", "products.json"), "utf8"),
);

const cream = "#F6F1E9";
const creamSoft = "#FBF8F3";
const creamDeep = "#EDE4D7";
const graphite = "#1C1C1C";
const muted = "#6B625C";
const bordeaux = "#6E2A2F";

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function baseSvg({ title, subtitle, badge }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${cream}"/>
    <circle cx="1080" cy="40" r="300" fill="${creamDeep}" opacity="0.55"/>
    <rect x="760" y="56" width="384" height="518" rx="10" fill="${creamDeep}"/>
    <rect x="80" y="79" width="26" height="3" fill="${bordeaux}"/>
    <text x="118" y="85" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="5" fill="${muted}">${escapeXml(badge)}</text>
    <text x="78" y="172" font-family="Georgia, 'Times New Roman', serif" font-size="60" fill="${graphite}">palitra</text>
    <circle cx="268" cy="160" r="5" fill="${bordeaux}"/>
    <text x="80" y="268" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="${graphite}">${escapeXml(title[0])}</text>
    <text x="80" y="338" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="${graphite}">${escapeXml(title[1])}</text>
    <text x="80" y="410" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="${muted}">${escapeXml(subtitle)}</text>
    <rect x="80" y="458" width="560" height="1" fill="${graphite}" opacity="0.15"/>
    <text x="80" y="500" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="2" fill="${muted}">БЕСПЛАТНАЯ ДОСТАВКА</text>
    <text x="80" y="524" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="2" fill="${muted}">ВОЗВРАТ 30 ДНЕЙ</text>
    <text x="80" y="592" font-family="Arial, Helvetica, sans-serif" font-size="12" letter-spacing="2" fill="${muted}">PALITRA.EXAMPLE</text>
  </svg>`;
}

async function roundedImage(sourcePath, width, height) {
  const rounded = await sharp(sourcePath)
    .extract({ left: 180, top: 150, width: 540, height: 738 })
    .resize(width, height, { fit: "cover" })
    .png()
    .toBuffer();

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="6" fill="#fff"/></svg>`,
  );

  return sharp(rounded).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function render(file, svg, imagePath) {
  const image = await roundedImage(imagePath, 356, 486);
  await sharp(Buffer.from(svg))
    .composite([{ input: image, left: 774, top: 72 }])
    .png({ quality: 88 })
    .toFile(file);
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
}

const publicDir = path.join(process.cwd(), "public");
const ogDir = path.join(publicDir, "og", "products");
await mkdir(ogDir, { recursive: true });

const heroImage = path.join(publicDir, "products", "stockholm-bordeaux.svg");

await render(
  path.join(publicDir, "og.png"),
  baseSvg({
    badge: "FW’26 · ПАЛЬТО",
    title: ["Пальто, в котором", "хочется остаться"],
    subtitle: "Шерсть · кашемир · альпака. Сшито в России.",
  }),
  heroImage,
);

for (const product of products) {
  const image = path.join(publicDir, "products", `${product.slug}-${product.colors[0].slug}.svg`);
  const price = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(product.price);

  await render(
    path.join(ogDir, `${product.slug}.png`),
    baseSvg({
      badge: product.gender === "women" ? "ЖЕНСКАЯ КОЛЛЕКЦИЯ" : "МУЖСКАЯ КОЛЛЕКЦИЯ",
      title: [`Пальто «${product.name}»`, product.colors[0].name],
      subtitle: `${price} · ${product.composition}`,
    }),
    image,
  );
}

const iconSvg = await readFile(path.join(process.cwd(), "src", "app", "icon.svg"));
await sharp(iconSvg).resize(180, 180).png().toFile(path.join(process.cwd(), "src", "app", "apple-icon.png"));
console.log("done");
