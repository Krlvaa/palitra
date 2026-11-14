import { MAX_PRICE } from "@/lib/products";
import type { CatalogFilters, CoatLength, Gender, Material, Product, SortOption } from "@/lib/types";

export const DEFAULT_FILTERS: CatalogFilters = {
  q: "",
  gender: [],
  sizes: [],
  colors: [],
  lengths: [],
  materials: [],
  maxPrice: MAX_PRICE,
  saleOnly: false,
  sort: "popular",
};

export const SORT_LABELS: Record<SortOption, string> = {
  popular: "Популярные",
  new: "Новинки",
  "price-asc": "Цена: по возрастанию",
  "price-desc": "Цена: по убыванию",
};

const isSortOption = (value: string | null): value is SortOption =>
  value === "popular" || value === "new" || value === "price-asc" || value === "price-desc";

const isGender = (value: string): value is Gender => value === "women" || value === "men";
const isLength = (value: string): value is CoatLength =>
  value === "short" || value === "regular" || value === "long";
const isMaterial = (value: string): value is Material =>
  value === "wool" || value === "cashmere" || value === "tweed" || value === "alpaca" || value === "blend";

export function parseFilters(params: URLSearchParams): CatalogFilters {
  const list = (key: string) => params.get(key)?.split(",").filter(Boolean) ?? [];
  const maxPrice = Number(params.get("maxPrice"));

  return {
    q: params.get("q") ?? "",
    gender: list("gender").filter(isGender),
    sizes: list("sizes"),
    colors: list("colors"),
    lengths: list("length").filter(isLength),
    materials: list("material").filter(isMaterial),
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : MAX_PRICE,
    saleOnly: params.get("sale") === "1",
    sort: isSortOption(params.get("sort")) ? (params.get("sort") as SortOption) : "popular",
  };
}

export function filtersToSearchParams(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.gender.length) params.set("gender", filters.gender.join(","));
  if (filters.sizes.length) params.set("sizes", filters.sizes.join(","));
  if (filters.colors.length) params.set("colors", filters.colors.join(","));
  if (filters.lengths.length) params.set("length", filters.lengths.join(","));
  if (filters.materials.length) params.set("material", filters.materials.join(","));
  if (filters.maxPrice < MAX_PRICE) params.set("maxPrice", String(filters.maxPrice));
  if (filters.saleOnly) params.set("sale", "1");
  if (filters.sort !== "popular") params.set("sort", filters.sort);
  return params;
}

export function countActiveFilters(filters: CatalogFilters): number {
  return (
    filters.gender.length +
    filters.sizes.length +
    filters.colors.length +
    filters.lengths.length +
    filters.materials.length +
    (filters.maxPrice < MAX_PRICE ? 1 : 0) +
    (filters.saleOnly ? 1 : 0)
  );
}

export function filterProducts(items: Product[], filters: CatalogFilters): Product[] {
  const query = filters.q.trim().toLowerCase();
  const selectedColors = new Set(filters.colors);

  const filtered = items.filter((product) => {
    if (query) {
      const haystack = [
        product.name,
        product.description,
        product.composition,
        ...product.colors.map((color) => color.name),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.gender.length && !filters.gender.includes(product.gender)) return false;
    if (filters.sizes.length && !product.sizes.some((size) => filters.sizes.includes(size))) return false;
    if (selectedColors.size && !product.colors.some((color) => selectedColors.has(color.slug))) return false;
    if (filters.lengths.length && !filters.lengths.includes(product.length)) return false;
    if (filters.materials.length && !filters.materials.includes(product.material)) return false;
    if (filters.saleOnly && !product.isSale) return false;
    if (product.price > filters.maxPrice) return false;
    return true;
  });

  return sortProducts(filtered, filters.sort);
}

export function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "new":
      return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.rating - a.rating);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "popular":
    default:
      return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }
}

export function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
