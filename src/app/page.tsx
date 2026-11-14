import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Benefits } from "@/components/home/benefits";
import { CategoryGrid } from "@/components/home/category-grid";
import { Hero } from "@/components/home/hero";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { Reviews } from "@/components/home/reviews";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBestsellers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Женские и мужские пальто из шерсти и кашемира",
  description:
    "Коллекция пальто palitra: шерсть, кашемир, альпака. Спокойный дизайн, точная посадка, бесплатная доставка по России и возврат 30 дней.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const bestsellers = getBestsellers(4);

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section aria-labelledby="bestsellers-heading" className="container mt-16 sm:mt-24">
        <SectionHeading
          id="bestsellers-heading"
          eyebrow="Выбор покупателей"
          title="Хиты сезона"
          description="Модели, которые заказывают снова и советуют друзьям. Все — из плотной шерсти и с посадочным запасом для свитера."
          link={{ href: "/catalog?sort=popular", label: "Все хиты" }}
        />
        <ul className="mt-8 grid grid-cols-1 gap-x-3 gap-y-9 min-[360px]:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
          {bestsellers.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={index < 2} />
            </li>
          ))}
        </ul>
      </section>

      <Benefits />
      <Reviews />

      <section aria-labelledby="newsletter-heading" className="container mt-16 sm:mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-cream-deep/70 px-5 py-10 shadow-glass sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-bord/10"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3">Письма palitra</p>
              <h2 id="newsletter-heading" className="max-w-md text-display-sm text-balance">
                Новые коллекции — без шума и спама
              </h2>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-graphite-soft">
                Одно письмо в месяц: что привезли, как ухаживать за шерстью и когда будет следующий
                размер. Плюс −10% на первый заказ.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="container mt-16 sm:mt-24">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-cream-deep">
            <Image
              src="/products/milan-camel-detail.svg"
              alt="Крупный план лацкана и шва пальто «Милан» верблюжьего цвета"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">О вещах</p>
            <h2 id="about-heading" className="max-w-lg text-display-sm text-balance">
              Ткани, которые хочется трогать
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-graphite-soft sm:text-base">
              Мы выбираем шерсть с небольшим добавлением кашемира: она держит форму, не колется и
              почти не пилингуется. Каждую партию проверяем руками — от плотности полотна до хода
              молнии.
            </p>
            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-graphite-muted">Плотность</dt>
                <dd className="mt-1 font-serif text-2xl">420 г/м²</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-graphite-muted">Сезон</dt>
                <dd className="mt-1 font-serif text-2xl">−20 °C</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-graphite-muted">Гарантия</dt>
                <dd className="mt-1 font-serif text-2xl">2 года</dd>
              </div>
            </dl>
            <Link
              href="/care"
              className="mt-7 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-graphite-soft transition-colors hover:text-bord"
            >
              Как ухаживать за пальто
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
