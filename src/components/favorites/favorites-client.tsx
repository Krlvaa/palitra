"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductBySlug } from "@/lib/products";
import { useStore } from "@/lib/store";

export function FavoritesClient() {
  const { favorites, hydrated } = useStore();
  const items = favorites
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Избранное" }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow mb-3">Сохранённое</p>
        <h1 className="text-display-lg">Избранное</h1>
        <p className="mt-3 text-sm leading-relaxed text-graphite-soft">
          {hydrated && items.length > 0
            ? `${items.length} ${items.length === 1 ? "модель" : items.length < 5 ? "модели" : "моделей"} ждёт вашего решения. Товары сохраняются в этом браузере.`
            : "Здесь будут пальто, которые вам понравились. Нажмите на сердце на карточке — и они останутся."}
        </p>
      </header>

      {!hydrated ? (
        <div className="mt-8 grid grid-cols-1 gap-x-3 gap-y-9 min-[360px]:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="aspect-[3/4] w-full rounded-sm" />
              <Skeleton className="mt-3.5 h-5 w-2/3" />
              <Skeleton className="mt-2 h-3.5 w-1/3" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-graphite/20 bg-cream-soft/50 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-cream-deep/80">
            <Heart className="size-6 text-graphite-soft" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-display-sm">Пока ничего не сохранено</h2>
          <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-graphite-muted">
            Добавляйте модели в избранное, чтобы сравнить посадку и цвет позже. Ничего не потеряется.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/catalog">Смотреть каталог</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/catalog?sort=new">Новинки</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="sr-only">Сохранённые модели</h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-3 gap-y-9 min-[360px]:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
            {items.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
