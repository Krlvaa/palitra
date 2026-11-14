"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getGallery } from "@/lib/products";
import { PROMO_CODES, type PromoCode } from "@/lib/site";
import type { CartLine, ColorOption, Product } from "@/lib/types";

const CART_KEY = "palitra.cart.v1";
const FAVORITES_KEY = "palitra.favorites.v1";
const PROMO_KEY = "palitra.promo.v1";

interface PromoState {
  code: PromoCode;
  label: string;
}

interface StoreValue {
  lines: CartLine[];
  favorites: string[];
  promo: PromoState | null;
  hydrated: boolean;
  cartCount: number;
  isCartOpen: boolean;
  subtotal: number;
  discount: number;
  total: number;
  addLine: (product: Product, size: string, color: ColorOption) => void;
  removeLine: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.key === "string" &&
    typeof line.slug === "string" &&
    typeof line.name === "string" &&
    typeof line.price === "number" &&
    typeof line.image === "string" &&
    typeof line.size === "string" &&
    typeof line.color === "string" &&
    typeof line.quantity === "number" &&
    line.quantity > 0
  );
}

function isPromoCode(value: unknown): value is PromoCode {
  return typeof value === "string" && value in PROMO_CODES;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [promo, setPromo] = useState<PromoState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const storedLines = readJson<unknown[]>(CART_KEY, []).filter(isCartLine);
    const storedFavorites = readJson<unknown[]>(FAVORITES_KEY, []).filter(
      (slug): slug is string => typeof slug === "string",
    );
    const storedPromo = readJson<string | null>(PROMO_KEY, null);

    setLines(storedLines);
    setFavorites(storedFavorites);
    if (isPromoCode(storedPromo)) {
      setPromo({ code: storedPromo, label: PROMO_CODES[storedPromo].label });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (promo) window.localStorage.setItem(PROMO_KEY, JSON.stringify(promo.code));
    else window.localStorage.removeItem(PROMO_KEY);
  }, [promo, hydrated]);

  const addLine = useCallback((product: Product, size: string, color: ColorOption) => {
    const key = `${product.slug}-${size}-${color.slug}`;
    const image = getGallery(product, color.slug)[0].src;
    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: Math.min(line.quantity + 1, 10) } : line,
        );
      }
      return [
        ...current,
        {
          key,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image,
          size,
          color: color.name,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) =>
      current.map((line) =>
        line.key === key ? { ...line, quantity: Math.max(1, Math.min(10, quantity)) } : line,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setPromo(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { ok: false, message: "Введите промокод" };
    if (!isPromoCode(normalized)) {
      return { ok: false, message: "Такого промокода нет. Проверьте написание" };
    }
    setPromo({ code: normalized, label: PROMO_CODES[normalized].label });
    return { ok: true, message: `Промокод применён: ${PROMO_CODES[normalized].label}` };
  }, []);

  const clearPromo = useCallback(() => setPromo(null), []);

  const toggleFavorite = useCallback((slug: string) => {
    let added = false;
    setFavorites((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      added = true;
      return [...current, slug];
    });
    return added;
  }, []);

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [lines],
  );

  const discount = useMemo(() => {
    if (!promo) return 0;
    const rule = PROMO_CODES[promo.code];
    if (rule.type === "percent") return Math.round((subtotal * rule.value) / 100);
    return Math.min(rule.value, subtotal);
  }, [promo, subtotal]);

  const cartCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const value = useMemo<StoreValue>(
    () => ({
      lines,
      favorites,
      promo,
      hydrated,
      cartCount,
      isCartOpen,
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
      addLine,
      removeLine,
      setQuantity,
      clearCart,
      applyPromo,
      clearPromo,
      isFavorite: (slug) => favorites.includes(slug),
      toggleFavorite,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
    }),
    [
      lines,
      favorites,
      promo,
      hydrated,
      cartCount,
      isCartOpen,
      subtotal,
      discount,
      addLine,
      removeLine,
      setQuantity,
      clearCart,
      applyPromo,
      clearPromo,
      toggleFavorite,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
