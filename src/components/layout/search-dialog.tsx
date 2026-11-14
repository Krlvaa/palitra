"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatPrice, getCardImages, products } from "@/lib/products";

const QUICK_LINKS = [
  { label: "Новинки", href: "/catalog?sort=new" },
  { label: "Шерсть", href: "/catalog?material=wool" },
  { label: "Бордо", href: "/catalog?colors=bordeaux" },
  { label: "Со скидкой", href: "/catalog?sale=1" },
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? products
        .filter((product) =>
          `${product.name} ${product.description} ${product.colors.map((color) => color.name).join(" ")}`
            .toLowerCase()
            .includes(normalized),
        )
        .slice(0, 5)
    : [];

  function goToResults() {
    onOpenChange(false);
    router.push(normalized ? `/catalog?q=${encodeURIComponent(query.trim())}` : "/catalog");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] max-w-xl translate-y-0 gap-4 p-0 sm:top-[18%]">
        <DialogHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
          <DialogTitle>Поиск</DialogTitle>
          <DialogDescription>Найдите пальто по названию, цвету или ткани.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            goToResults();
          }}
          className="px-5 sm:px-6"
          role="search"
        >
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-graphite-muted"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Например, «Верона» или «кашемир»"
              aria-label="Поисковый запрос"
              className="h-12 rounded-full pl-11 pr-12"
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Найти"
              className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-bord text-cream-soft transition-colors hover:bg-bord-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className="px-5 pb-6 sm:px-6">
          {normalized ? (
            matches.length ? (
              <ul className="divide-y divide-line">
                {matches.map((product) => {
                  const images = getCardImages(product);
                  return (
                    <li key={product.slug}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="group flex items-center gap-4 py-3"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-cream-deep">
                          <Image
                            src={images.front.src}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-lg leading-tight">Пальто «{product.name}»</p>
                          <p className="mt-1 text-xs text-graphite-muted">
                            {product.gender === "women" ? "Женское" : "Мужское"} ·{" "}
                            {product.colors[0].name}
                          </p>
                        </div>
                        <span className="shrink-0 font-sans text-sm">{formatPrice(product.price)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-6 text-center">
                <p className="font-serif text-xl">Ничего не нашлось</p>
                <p className="mt-1 text-sm text-graphite-muted">
                  Попробуйте другое название или посмотрите весь каталог.
                </p>
                <Link
                  href="/catalog"
                  onClick={() => onOpenChange(false)}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-bord link-line"
                >
                  Открыть каталог <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            )
          ) : (
            <div>
              <p className="eyebrow mb-3">Часто ищут</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => onOpenChange(false)}
                    className="rounded-full border border-graphite/15 px-4 py-2 text-xs text-graphite-soft transition-colors hover:border-bord hover:text-bord"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
