"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CatalogFiltersPanel } from "@/components/catalog/catalog-filters-panel";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DEFAULT_FILTERS,
  SORT_LABELS,
  countActiveFilters,
  filterProducts,
  filtersToSearchParams,
  parseFilters,
} from "@/lib/catalog";
import {
  ALL_COLORS,
  GENDER_LABELS,
  LENGTH_LABELS,
  MATERIAL_LABELS,
  MAX_PRICE,
  formatPrice,
} from "@/lib/products";
import type { CatalogFilters, SortOption } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Chip {
  key: string;
  label: string;
  remove: (filters: CatalogFilters) => Partial<CatalogFilters>;
}

function buildChips(filters: CatalogFilters): Chip[] {
  const chips: Chip[] = [];

  if (filters.q.trim()) {
    chips.push({ key: "q", label: `«${filters.q.trim()}»`, remove: () => ({ q: "" }) });
  }
  filters.gender.forEach((gender) => {
    chips.push({
      key: `gender-${gender}`,
      label: GENDER_LABELS[gender],
      remove: (current) => ({ gender: current.gender.filter((item) => item !== gender) }),
    });
  });
  filters.sizes.forEach((size) => {
    chips.push({
      key: `size-${size}`,
      label: `Размер ${size}`,
      remove: (current) => ({ sizes: current.sizes.filter((item) => item !== size) }),
    });
  });
  filters.colors.forEach((slug) => {
    const color = ALL_COLORS.find((option) => option.slug === slug);
    chips.push({
      key: `color-${slug}`,
      label: color?.name ?? slug,
      remove: (current) => ({ colors: current.colors.filter((item) => item !== slug) }),
    });
  });
  filters.lengths.forEach((length) => {
    chips.push({
      key: `length-${length}`,
      label: LENGTH_LABELS[length],
      remove: (current) => ({ lengths: current.lengths.filter((item) => item !== length) }),
    });
  });
  filters.materials.forEach((material) => {
    chips.push({
      key: `material-${material}`,
      label: MATERIAL_LABELS[material],
      remove: (current) => ({ materials: current.materials.filter((item) => item !== material) }),
    });
  });
  if (filters.maxPrice < MAX_PRICE) {
    chips.push({
      key: "price",
      label: `до ${formatPrice(filters.maxPrice)}`,
      remove: () => ({ maxPrice: MAX_PRICE }),
    });
  }
  if (filters.saleOnly) {
    chips.push({ key: "sale", label: "Со скидкой", remove: () => ({ saleOnly: false }) });
  }

  return chips;
}

export function CatalogClient({ products }: { products: import("@/lib/types").Product[] }) {
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const [filters, setFilters] = useState<CatalogFilters>(() =>
    parseFilters(new URLSearchParams(searchKey)),
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const lastSearchKey = useRef(searchKey);

  useEffect(() => {
    if (lastSearchKey.current === searchKey) return;
    lastSearchKey.current = searchKey;
    setFilters(parseFilters(new URLSearchParams(searchKey)));
  }, [searchKey]);

  useEffect(() => {
    const query = filtersToSearchParams(filters).toString();
    window.history.replaceState(null, "", query ? `/catalog?${query}` : "/catalog");
  }, [filters]);

  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);
  const activeCount = countActiveFilters(filters);
  const chips = buildChips(filters);

  function update(patch: Partial<CatalogFilters>) {
    setFilters((current) => ({ ...current, ...patch }));
  }

  function reset() {
    setFilters({ ...DEFAULT_FILTERS, sort: filters.sort });
  }

  const panel = (
    <CatalogFiltersPanel filters={filters} onChange={update} onReset={reset} />
  );

  return (
    <div className="mt-7 lg:mt-10 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-14">
      <aside className="hidden lg:block" aria-label="Фильтры каталога">
        <div className="sticky top-24 rounded-lg border border-white/60 bg-cream-soft/55 p-5 shadow-glass backdrop-blur-sm">
          {panel}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-graphite-muted"
              aria-hidden="true"
            />
            <label htmlFor="catalog-search" className="sr-only">
              Поиск по каталогу
            </label>
            <Input
              id="catalog-search"
              type="search"
              value={filters.q}
              onChange={(event) => update({ q: event.target.value })}
              placeholder="Поиск: название, цвет, ткань"
              className="h-11 rounded-full pl-11 pr-10"
              autoComplete="off"
            />
            {filters.q && (
              <button
                type="button"
                onClick={() => update({ q: "" })}
                aria-label="Очистить поиск"
                className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-graphite-muted transition-colors hover:bg-cream-deep hover:text-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen(true)}
              className="h-11 gap-2 rounded-full px-4 normal-case tracking-normal lg:hidden"
              aria-haspopup="dialog"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Фильтры
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-bord text-[10px] text-cream-soft">
                  {activeCount}
                </span>
              )}
            </Button>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <label htmlFor="catalog-sort" className="hidden text-[10px] uppercase tracking-[0.14em] text-graphite-muted sm:block">
                Сортировка
              </label>
              <Select
                value={filters.sort}
                onValueChange={(value) => update({ sort: value as SortOption })}
              >
                <SelectTrigger id="catalog-sort" aria-label="Сортировка" className="h-11 w-[9.5rem] text-xs sm:w-[14.5rem] sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((value) => (
                    <SelectItem key={value} value={value}>
                      {SORT_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex min-h-[1.75rem] flex-wrap items-center gap-2">
          <p className="mr-1 text-xs text-graphite-muted" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "модель" : filtered.length < 5 ? "модели" : "моделей"}
          </p>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => update(chip.remove(filters))}
              className="inline-flex items-center gap-1.5 rounded-full border border-graphite/15 bg-cream-soft/70 py-1 pl-3 pr-2 text-[11px] text-graphite-soft transition-colors hover:border-bord hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              {chip.label}
              <X className="size-3" aria-hidden="true" />
              <span className="sr-only">Убрать фильтр</span>
            </button>
          ))}
          {chips.length > 1 && (
            <button
              type="button"
              onClick={reset}
              className="px-2 text-[11px] text-graphite-muted underline underline-offset-4 transition-colors hover:text-bord"
            >
              Сбросить всё
            </button>
          )}
        </div>

        <h2 className="sr-only">Результаты подбора</h2>
        {filtered.length > 0 ? (
          <ul
            className={cn(
              "mt-6 grid grid-cols-1 gap-x-3 gap-y-9 min-[360px]:grid-cols-2 sm:gap-x-5 xl:grid-cols-3",
            )}
          >
            {filtered.map((product, index) => (
              <li key={product.slug}>
                <ProductCard product={product} priority={index < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-graphite/20 bg-cream-soft/50 px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-cream-deep/80">
              <Search className="size-5 text-graphite-soft" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-display-sm">Ничего не подошло</h2>
            <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-graphite-muted">
              Попробуйте убрать один из фильтров или расширить бюджет. Все модели есть в наличии в
              шоуруме.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button type="button" onClick={reset}>
                Сбросить фильтры
              </Button>
              <Button asChild variant="outline">
                <Link href="/catalog?gender=women">Женские пальто</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/catalog?gender=men">Мужские пальто</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="right" className="max-w-[22rem] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
            <SheetDescription className="sr-only">
              Пол, размер, цвет, длина, материал и цена
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 px-5 py-5">{panel}</div>
          <div className="border-t border-line bg-cream-soft/90 px-5 py-4">
            <Button type="button" className="w-full" onClick={() => setFiltersOpen(false)}>
              Показать {filtered.length}{" "}
              {filtered.length === 1 ? "модель" : filtered.length < 5 ? "модели" : "моделей"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
