export type Gender = "women" | "men";
export type CoatLength = "short" | "regular" | "long";
export type Material = "wool" | "cashmere" | "tweed" | "alpaca" | "blend";

export interface ColorOption {
  name: string;
  slug: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  price: number;
  oldPrice: number | null;
  isNew: boolean;
  isBestseller: boolean;
  isSale: boolean;
  sizes: string[];
  colors: ColorOption[];
  length: CoatLength;
  material: Material;
  composition: string;
  care: string[];
  description: string;
  rating: number;
  reviewsCount: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CartLine {
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export type SortOption = "new" | "popular" | "price-asc" | "price-desc";

export interface CatalogFilters {
  q: string;
  gender: Gender[];
  sizes: string[];
  colors: string[];
  lengths: CoatLength[];
  materials: Material[];
  maxPrice: number;
  saleOnly: boolean;
  sort: SortOption;
}
