"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function QuantityControl({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-graphite/15">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label={`Уменьшить количество: ${label}`}
        className="grid size-9 place-items-center rounded-full text-graphite transition-colors hover:bg-cream-deep disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= 10}
        aria-label={`Увеличить количество: ${label}`}
        className="grid size-9 place-items-center rounded-full text-graphite transition-colors hover:bg-cream-deep disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function CartClient() {
  const {
    lines,
    hydrated,
    setQuantity,
    removeLine,
    subtotal,
    discount,
    total,
    promo,
    applyPromo,
    clearPromo,
    cartCount,
  } = useStore();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  if (!hydrated) {
    return (
      <div className="container pb-10 pt-6 sm:pt-10">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-6 h-12 w-56" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="h-32 w-24 rounded-sm" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-9 w-28 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Корзина" }]} />

      <header className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-3">Ваш заказ</p>
          <h1 className="text-display-lg">Корзина</h1>
        </div>
        {cartCount > 0 && (
          <p className="text-sm text-graphite-muted">
            {cartCount} {cartCount === 1 ? "товар" : cartCount < 5 ? "товара" : "товаров"} · доставка бесплатно
          </p>
        )}
      </header>

      {lines.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-graphite/20 bg-cream-soft/50 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-cream-deep/80">
            <ShoppingBag className="size-6 text-graphite-soft" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-display-sm">Пока пусто</h2>
          <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-graphite-muted">
            Выберите пальто — доставим бесплатно и дадим 30 дней на примерку и возврат.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/catalog">Смотреть каталог</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/catalog?sale=1">Распродажа</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-14">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5 sm:gap-6">
                  <Link
                    href={`/product/${line.slug}`}
                    className="relative h-32 w-24 shrink-0 overflow-hidden rounded-sm bg-cream-deep sm:h-40 sm:w-32"
                  >
                    <Image
                      src={line.image}
                      alt={`Пальто «${line.name}» цвета ${line.color.toLowerCase()}`}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-xl leading-tight sm:text-2xl">
                          <Link href={`/product/${line.slug}`} className="hover:text-bord">
                            Пальто «{line.name}»
                          </Link>
                        </h2>
                        <p className="mt-1.5 text-xs text-graphite-muted">
                          Размер {line.size} · Цвет: {line.color}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label={`Удалить «${line.name}» из корзины`}
                        className="grid size-9 shrink-0 place-items-center rounded-full text-graphite-muted transition-colors hover:bg-cream-deep hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                      <QuantityControl
                        quantity={line.quantity}
                        onChange={(value) => setQuantity(line.key, value)}
                        label={`«${line.name}»`}
                      />
                      <div className="text-right">
                        <p className="text-sm tabular-nums">{formatPrice(line.price * line.quantity)}</p>
                        {line.quantity > 1 && (
                          <p className="text-[11px] text-graphite-muted tabular-nums">
                            {formatPrice(line.price)} за шт.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-graphite-soft link-line hover:text-bord"
              >
                Продолжить покупки
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-white/60 bg-cream-soft/60 p-5 backdrop-blur-sm">
              <h2 className="font-serif text-xl">Промокод</h2>
              <p className="mt-1 text-xs text-graphite-muted">
                Демо-промокод: <span className="text-graphite-soft">PALITRA10</span> — скидка 10%.
              </p>

              {promo ? (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-bord/20 bg-bord/[0.04] px-4 py-3">
                  <p className="text-sm text-bord">
                    <span className="font-medium">{promo.code}</span> · {promo.label}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      clearPromo();
                      setFeedback(null);
                    }}
                    className="text-xs text-graphite-muted underline underline-offset-4 hover:text-bord"
                  >
                    Убрать
                  </button>
                </div>
              ) : (
                <form
                  className="mt-3 flex flex-col gap-2 sm:flex-row"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const result = applyPromo(code);
                    setFeedback({ ok: result.ok, message: result.message });
                    if (result.ok) setCode("");
                  }}
                >
                  <label htmlFor="promo" className="sr-only">
                    Промокод
                  </label>
                  <Input
                    id="promo"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      setFeedback(null);
                    }}
                    placeholder="Введите промокод"
                    autoComplete="off"
                    className="h-11 flex-1 uppercase placeholder:normal-case"
                    aria-invalid={feedback?.ok === false}
                    aria-describedby={feedback ? "promo-feedback" : undefined}
                  />
                  <Button type="submit" variant="outline" className="h-11 shrink-0">
                    Применить
                  </Button>
                </form>
              )}
              {feedback && (
                <p
                  id="promo-feedback"
                  role="status"
                  className={cn("mt-2 text-xs", feedback.ok ? "text-[#3F6B4F]" : "text-bord")}
                >
                  {feedback.message}
                </p>
              )}
            </div>
          </div>

          <aside aria-labelledby="summary-heading" className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-white/60 bg-cream-soft/75 p-5 shadow-glass backdrop-blur-md sm:p-6">
              <h2 id="summary-heading" className="font-serif text-2xl">
                Итого
              </h2>

              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-graphite-muted">Товары</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-bord">
                    <dt>Скидка{promo ? ` · ${promo.code}` : ""}</dt>
                    <dd className="tabular-nums">−{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-graphite-muted">Доставка</dt>
                  <dd>Бесплатно</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-line pt-3 font-serif text-2xl">
                  <dt>К оплате</dt>
                  <dd className="tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>

              <Button asChild size="lg" className="mt-5 w-full">
                <Link href="/checkout">
                  Перейти к оформлению
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>

              <ul className="mt-5 space-y-2.5 text-[11px] text-graphite-muted">
                <li className="flex items-center gap-2">
                  <Truck className="size-3.5 shrink-0" aria-hidden="true" />
                  Доставим за 1–2 дня по Москве
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                  Возврат 30 дней, заберём курьером
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
