"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export function CartDrawer() {
  const {
    lines,
    isCartOpen,
    closeCart,
    setQuantity,
    removeLine,
    subtotal,
    discount,
    total,
    promo,
    cartCount,
  } = useStore();

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent className="max-w-[26rem]">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>
            {cartCount > 0
              ? `${cartCount} ${cartCount === 1 ? "товар" : cartCount < 5 ? "товара" : "товаров"} · доставка бесплатно`
              : "Пока пусто — самое время выбрать пальто"}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-cream-deep/70">
              <ShoppingBag className="size-6 text-graphite-soft" aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-2xl">Корзина пуста</p>
              <p className="mt-1 text-sm text-graphite-muted">
                Начните с хитов — их выбирают чаще всего.
              </p>
            </div>
            <Button asChild onClick={closeCart}>
              <Link href="/catalog">Смотреть пальто</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 sm:px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-4">
                  <Link
                    href={`/product/${line.slug}`}
                    onClick={closeCart}
                    className="relative h-28 w-[5.25rem] shrink-0 overflow-hidden rounded-sm bg-cream-deep"
                  >
                    <Image
                      src={line.image}
                      alt={`Пальто «${line.name}»`}
                      fill
                      sizes="84px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="font-serif text-lg leading-tight hover:text-bord"
                      >
                        «{line.name}»
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label={`Удалить «${line.name}» из корзины`}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-graphite-muted transition-colors hover:bg-cream-deep hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-graphite-muted">
                      Размер {line.size} · {line.color}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <div className="flex items-center rounded-full border border-graphite/15">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          disabled={line.quantity <= 1}
                          aria-label={`Уменьшить количество: ${line.name}`}
                          className="grid size-8 place-items-center rounded-full text-graphite transition-colors hover:bg-cream-deep disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-xs tabular-nums" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          disabled={line.quantity >= 10}
                          aria-label={`Увеличить количество: ${line.name}`}
                          className="grid size-8 place-items-center rounded-full text-graphite transition-colors hover:bg-cream-deep disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
                        >
                          <Plus className="size-3" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm tabular-nums">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line bg-cream-soft/80 px-5 py-5 sm:px-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-graphite-muted">Товары</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                {discount > 0 && promo && (
                  <div className="flex justify-between text-bord">
                    <dt>Скидка · {promo.code}</dt>
                    <dd className="tabular-nums">−{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-graphite-muted">Доставка</dt>
                  <dd>Бесплатно</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2 font-serif text-xl">
                  <dt>Итого</dt>
                  <dd className="tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>

              <Button asChild className="mt-4 w-full" size="lg">
                <Link href="/checkout" onClick={closeCart}>
                  Оформить заказ
                </Link>
              </Button>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 block text-center text-xs uppercase tracking-[0.14em] text-graphite-soft link-line"
              >
                Перейти в корзину
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
