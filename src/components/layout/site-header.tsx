"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchDialog } from "@/components/layout/search-dialog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Каталог", href: "/catalog" },
  { label: "Женское", href: "/catalog?gender=women" },
  { label: "Мужское", href: "/catalog?gender=men" },
  { label: "Новинки", href: "/catalog?sort=new" },
  { label: "Sale", href: "/catalog?sale=1" },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, favorites, openCart, hydrated } = useStore();
  const pathname = usePathname();

  const favoriteCount = hydrated ? favorites.length : 0;
  const bagCount = hydrated ? cartCount : 0;

  return (
    <>
      <div className="bg-bord text-cream-soft">
        <p className="container flex h-8 items-center justify-center gap-2 whitespace-nowrap text-center font-sans text-[8px] uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.28em]">
          <span className="sm:hidden">Бесплатная доставка · Возврат 30 дней</span>
          <span className="hidden sm:inline">Бесплатная доставка по России</span>
          <span aria-hidden="true" className="hidden size-0.5 rounded-full bg-cream-soft/60 sm:block" />
          <span className="hidden sm:inline">Возврат 30 дней</span>
          <span aria-hidden="true" className="hidden size-0.5 rounded-full bg-cream-soft/60 sm:block" />
          <span className="hidden sm:inline">Упаковываем с любовью</span>
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-graphite/10 bg-cream/80 backdrop-blur-xl supports-[backdrop-filter]:bg-cream/65">
        <div className="container flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-haspopup="dialog"
              className="grid size-11 place-items-center rounded-full text-graphite transition-colors hover:bg-graphite/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <Logo />
          </div>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isCatalogRoot = link.href === "/catalog" && pathname === "/catalog";
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "link-line py-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord",
                        isCatalogRoot ? "text-bord" : "text-graphite-soft",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Поиск по каталогу"
              aria-haspopup="dialog"
              className="grid size-11 place-items-center rounded-full text-graphite transition-colors hover:bg-graphite/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              <Search className="size-[1.15rem]" aria-hidden="true" />
            </button>

            <Link
              href="/favorites"
              aria-label={
                favoriteCount
                  ? `Избранное, товаров: ${favoriteCount}`
                  : "Избранное"
              }
              className="relative grid size-11 place-items-center rounded-full text-graphite transition-colors hover:bg-graphite/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              <Heart className="size-[1.15rem]" aria-hidden="true" />
              {favoriteCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-bord px-1 text-[9px] font-medium leading-4 text-cream-soft"
                >
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={bagCount ? `Корзина, товаров: ${bagCount}` : "Корзина"}
              aria-haspopup="dialog"
              className="relative grid size-11 place-items-center rounded-full text-graphite transition-colors hover:bg-graphite/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              <ShoppingBag className="size-[1.15rem]" aria-hidden="true" />
              {bagCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0.5 top-1 grid min-w-4 place-items-center rounded-full bg-bord px-1 text-[9px] font-medium leading-4 text-cream-soft"
                >
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
