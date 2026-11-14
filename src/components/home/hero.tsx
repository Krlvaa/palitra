import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, getProductBySlug } from "@/lib/products";

const featured = getProductBySlug("stockholm") ?? null;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-paper"
      />
      <div className="container relative grid items-center gap-10 pb-12 pt-8 sm:pt-12 lg:grid-cols-[1.02fr_1fr] lg:items-start lg:gap-14 lg:pb-20 lg:pt-16">
        <div className="max-w-xl lg:pt-10">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-bord" aria-hidden="true" />
            Коллекция FW’26
          </p>

          <h1 className="mt-5 text-display-lg text-balance">
            Пальто, в котором хочется остаться
          </h1>

          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-graphite-soft sm:text-lg">
            Тёплая шерсть, честная посадка и спокойные цвета. Без логотипов и лишних деталей —
            только то, что вы будете носить каждый день.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/catalog">
                Смотреть коллекцию
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/size-guide">Подобрать размер</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-graphite-soft">
            <span className="flex items-center gap-1.5">
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-bord text-bord" />
                ))}
              </span>
              <span className="sr-only">Рейтинг 4.9 из 5</span>
              4.9 · 1 200+ отзывов
            </span>
            <span aria-hidden="true" className="size-0.5 rounded-full bg-graphite/30" />
            <span>Бесплатная доставка по России</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-deep sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src="/products/stockholm-bordeaux.svg"
              alt="Женское пальто «Стокгольм» глубокого бордового цвета, вид спереди"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-graphite/25 to-transparent" aria-hidden="true" />
          </div>

          {featured && (
            <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-lg p-3.5 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[19rem] sm:p-4">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.22em] text-graphite-muted">Хит сезона</p>
                <p className="mt-0.5 truncate font-serif text-xl">Пальто «{featured.name}»</p>
                <p className="mt-0.5 text-xs text-graphite-soft">
                  {formatPrice(featured.price)}
                  {featured.oldPrice && (
                    <span className="ml-2 text-graphite-muted line-through">
                      {formatPrice(featured.oldPrice)}
                    </span>
                  )}
                </p>
              </div>
              <Link
                href={`/product/${featured.slug}`}
                aria-label={`Открыть пальто «${featured.name}»`}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-bord text-cream-soft transition-colors hover:bg-bord-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-y border-graphite/10 bg-cream-soft/40">
        <div className="container flex items-center justify-center gap-4 overflow-hidden py-3 text-center font-sans text-[9px] uppercase tracking-[0.24em] text-graphite-muted sm:gap-7 sm:text-[10px]">
          <span>Шерсть</span>
          <span aria-hidden="true" className="size-0.5 rounded-full bg-bord/50" />
          <span>Кашемир</span>
          <span aria-hidden="true" className="size-0.5 rounded-full bg-bord/50" />
          <span>Альпака</span>
          <span aria-hidden="true" className="hidden size-0.5 rounded-full bg-bord/50 sm:block" />
          <span className="hidden sm:inline">Твид</span>
          <span aria-hidden="true" className="hidden size-0.5 rounded-full bg-bord/50 sm:block" />
          <span className="hidden sm:inline">Сшито в России</span>
        </div>
      </div>
    </section>
  );
}
