import rawProducts from "@/data/products.json";
import type { CoatLength, GalleryImage, Gender, Material, Product } from "@/lib/types";

export const products = rawProducts as Product[];

export const GENDER_LABELS: Record<Gender, string> = {
  women: "Женские",
  men: "Мужские",
};

export const LENGTH_LABELS: Record<CoatLength, string> = {
  short: "Короткое",
  regular: "Среднее",
  long: "Длинное",
};

export const MATERIAL_LABELS: Record<Material, string> = {
  wool: "Шерсть",
  cashmere: "Кашемир",
  tweed: "Твид",
  alpaca: "Альпака",
  blend: "Смесовая ткань",
};

export const MIN_PRICE = Math.min(...products.map((product) => product.price));
export const MAX_PRICE = Math.max(...products.map((product) => product.price));

export const ALL_COLORS = Array.from(
  new Map(products.flatMap((product) => product.colors).map((color) => [color.slug, color])).values(),
).sort((a, b) => a.name.localeCompare(b.name, "ru"));

export const ALL_SIZES = Array.from(new Set(products.flatMap((product) => product.sizes))).sort(
  (a, b) => Number(a) - Number(b),
);

export const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getGallery(product: Product, colorSlug = product.colors[0].slug): GalleryImage[] {
  const color = product.colors.find((option) => option.slug === colorSlug) ?? product.colors[0];
  const base = `/products/${product.slug}-${color.slug}`;
  return [
    {
      src: `${base}.svg`,
      alt: `Пальто «${product.name}» цвета ${color.name.toLowerCase()}, вид спереди`,
    },
    {
      src: `${base}-detail.svg`,
      alt: `Пальто «${product.name}»: лацкан, шов и фурнитура крупным планом`,
    },
    {
      src: `${base}-back.svg`,
      alt: `Пальто «${product.name}» цвета ${color.name.toLowerCase()}, вид со спины`,
    },
  ];
}

export function getCardImages(product: Product) {
  const [front, detail] = getGallery(product);
  return { front, hover: detail };
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.gender === product.gender && item.slug !== product.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return products
    .filter((product) => product.isBestseller)
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return products.filter((product) => product.isNew).slice(0, limit);
}

export function getSaleProducts(limit = 4): Product[] {
  return products.filter((product) => product.isSale).slice(0, limit);
}

export function getCategoryCover(gender: Gender) {
  const product = products.find((item) => item.gender === gender && item.isBestseller)
    ?? products.find((item) => item.gender === gender);
  return product ?? products[0];
}

export function discountPercent(price: number, oldPrice: number | null) {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function getSizesForGender(gender: Gender) {
  const sizes = new Set<string>();
  products
    .filter((product) => product.gender === gender)
    .forEach((product) => product.sizes.forEach((size) => sizes.add(size)));
  return [...sizes].sort((a, b) => Number(a) - Number(b));
}
