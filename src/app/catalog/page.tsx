import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/catalog-client";
import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Каталог пальто",
  description:
    "Каталог женских и мужских пальто palitra. Фильтры по размеру, цвету, длине, материалу и цене. Шерсть, кашемир, альпака и твид.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: "Каталог пальто · palitra",
    description: "Женские и мужские пальто из шерсти, кашемира и альпаки. Подберите размер и цвет.",
    url: "/catalog",
  },
};

export default function CatalogPage() {
  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Каталог" }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow mb-3">Коллекция FW’26</p>
        <h1 className="text-display-lg">Все пальто</h1>
        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-graphite-soft sm:text-base">
          Двенадцать моделей из шерсти, кашемира и альпаки. Плотные ткани, честная посадка и
          спокойные цвета, которые легко сочетать.
        </p>
      </header>

      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogClient products={products} />
      </Suspense>
    </div>
  );
}
