"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw, Ruler, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/product/favorite-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { SizeGuideDialog } from "@/components/product/size-guide-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MATERIAL_LABELS, discountPercent, formatPrice, getGallery } from "@/lib/products";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductExperience({ product }: { product: Product }) {
  const { addLine, openCart } = useStore();
  const [colorSlug, setColorSlug] = useState(product.colors[0].slug);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const sizeRef = useRef<HTMLFieldSetElement>(null);

  const selectedColor = product.colors.find((color) => color.slug === colorSlug) ?? product.colors[0];
  const images = useMemo(() => getGallery(product, selectedColor.slug), [product, selectedColor.slug]);
  const discount = discountPercent(product.price, product.oldPrice);
  const stock = 2 + ((product.name.length + Number(size ?? 0)) % 5);

  function handleAddToCart() {
    if (!size) {
      setSizeError(true);
      sizeRef.current?.focus();
      return;
    }
    addLine(product, size, selectedColor);
    toast.success("Добавлено в корзину", {
      description: `Пальто «${product.name}», размер ${size}, ${selectedColor.name.toLowerCase()}`,
      action: { label: "Открыть", onClick: openCart },
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
      <ProductGallery images={images} productName={product.name} />

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-wrap items-center gap-2">
          {product.isNew && <Badge variant="dark">Новинка</Badge>}
          {discount && <Badge>−{discount}%</Badge>}
          {product.isBestseller && <Badge variant="soft">Хит продаж</Badge>}
        </div>

        <p className="eyebrow mt-5">
          {product.gender === "women" ? "Женское пальто" : "Мужское пальто"} · {MATERIAL_LABELS[product.material]}
        </p>
        <h1 className="mt-2 text-display-md">Пальто «{product.name}»</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-graphite-soft">
          <span className="flex items-center gap-1.5">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-3.5 fill-bord text-bord" />
              ))}
            </span>
            {product.rating} · {product.reviewsCount} отзывов
          </span>
          <span aria-hidden="true" className="size-0.5 rounded-full bg-graphite/30" />
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#3F6B4F]" aria-hidden="true" />
            В наличии
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-sans text-2xl font-medium tabular-nums">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-graphite-muted line-through tabular-nums">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {discount && (
            <span className="text-xs text-bord">Вы экономите {formatPrice((product.oldPrice ?? 0) - product.price)}</span>
          )}
        </div>

        <p className="mt-5 max-w-prose text-pretty text-sm leading-relaxed text-graphite-soft">
          {product.description}
        </p>

        <div className="mt-7 border-t border-line pt-6">
          <fieldset>
            <legend className="flex w-full items-center justify-between gap-4">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-graphite">
                Цвет
              </span>
              <span className="text-xs text-graphite-soft" aria-live="polite">
                {selectedColor.name}
              </span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const selected = color.slug === selectedColor.slug;
                return (
                  <button
                    key={color.slug}
                    type="button"
                    onClick={() => setColorSlug(color.slug)}
                    aria-pressed={selected}
                    aria-label={`Цвет ${color.name}`}
                    title={color.name}
                    className={cn(
                      "relative grid size-9 place-items-center rounded-full ring-1 ring-inset ring-graphite/20 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                      selected && "ring-2 ring-bord ring-offset-2 ring-offset-cream",
                    )}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selected && (
                      <span className="size-2 rounded-full bg-white/90 mix-blend-difference" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset
            ref={sizeRef}
            tabIndex={-1}
            className="mt-6"
            aria-describedby={sizeError ? "size-error" : undefined}
          >
            <legend className="flex w-full flex-wrap items-center justify-between gap-2">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-graphite">
                Размер
              </span>
              <SizeGuideDialog
                gender={product.gender}
                trigger={
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs text-graphite-soft underline underline-offset-4 transition-colors hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
                  >
                    <Ruler className="size-3.5" aria-hidden="true" />
                    Таблица размеров
                  </button>
                }
              />
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((option) => {
                const selected = option === size;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSize(option);
                      setSizeError(false);
                    }}
                    aria-pressed={selected}
                    aria-label={`Размер ${option}`}
                    className={cn(
                      "h-11 min-w-12 rounded-[4px] border px-3 text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2",
                      selected
                        ? "border-graphite bg-graphite text-cream-soft"
                        : "border-graphite/20 text-graphite-soft hover:border-graphite/60",
                      sizeError && !selected && "border-bord/60",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {sizeError ? (
              <p id="size-error" role="alert" className="mt-2 text-xs text-bord">
                Выберите размер, чтобы добавить пальто в корзину.
              </p>
            ) : (
              <p className="mt-2 text-xs text-graphite-muted">
                {size ? `В наличии · осталось ${stock} шт. в размере ${size}` : "Посадка свободная — под свитер."}
              </p>
            )}
          </fieldset>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Button type="button" size="lg" onClick={handleAddToCart} className="flex-1">
              <ShoppingBag className="size-4" aria-hidden="true" />
              В корзину
            </Button>
            <FavoriteButton
              slug={product.slug}
              name={product.name}
              showLabel
              className="h-14 shrink-0 sm:w-auto sm:px-5"
            />
          </div>

          <p className="mt-3 text-center text-[11px] text-graphite-muted sm:text-left">
            Артикул {product.id.toUpperCase()} · Бесплатная доставка и возврат 30 дней
          </p>
        </div>

        <ul className="mt-6 space-y-3 border-y border-line py-5 text-xs text-graphite-soft">
          <li className="flex items-center gap-3">
            <Truck className="size-4 shrink-0 text-bord" aria-hidden="true" />
            Курьером 1–2 дня, бесплатно. Примерка при получении.
          </li>
          <li className="flex items-center gap-3">
            <RotateCcw className="size-4 shrink-0 text-bord" aria-hidden="true" />
            Возврат и обмен в течение 30 дней — заберём курьером.
          </li>
          <li className="flex items-center gap-3">
            <ShieldCheck className="size-4 shrink-0 text-bord" aria-hidden="true" />
            Безопасная оплата картой, СБП или при получении.
          </li>
        </ul>

        <h2 className="sr-only">Детали заказа</h2>
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="composition">
            <AccordionTrigger>Состав и уход</AccordionTrigger>
            <AccordionContent>
              <p className="font-medium text-graphite">{product.composition}</p>
              <ul className="mt-2 space-y-1.5">
                {product.care.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-bord" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/care" className="mt-3 inline-block text-bord underline underline-offset-4">
                Подробнее об уходе
              </Link>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery">
            <AccordionTrigger>Доставка и возврат</AccordionTrigger>
            <AccordionContent>
              <p>
                Бесплатная доставка курьером по Москве за 1–2 дня, по России — от 3 дней. Курьер
                подождёт, пока вы примерите пальто.
              </p>
              <p className="mt-2">
                Если не подошло — вернём деньги в течение 30 дней. Заберём курьером бесплатно,
                достаточно написать или позвонить.
              </p>
              <Link href="/delivery" className="mt-3 inline-block text-bord underline underline-offset-4">
                Условия доставки
              </Link>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payment">
            <AccordionTrigger>Оплата</AccordionTrigger>
            <AccordionContent>
              <p>
                Картой онлайн, через СБП или при получении — картой либо наличными. Платёж
                защищён, данные карты не попадают к нам.
              </p>
              <p className="mt-2">При оформлении можно добавить комментарий и выбрать удобное время.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
