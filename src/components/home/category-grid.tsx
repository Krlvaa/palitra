import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    label: "Женские",
    caption: "12 моделей",
    href: "/catalog?gender=women",
    image: "/products/verona-milk.svg",
    alt: "Молочное женское пальто «Верона» на нейтральном фоне",
  },
  {
    label: "Мужские",
    caption: "Сдержанный крой",
    href: "/catalog?gender=men",
    image: "/products/helsinki-graphite.svg",
    alt: "Графитовое мужское пальто «Хельсинки» прямого силуэта",
  },
  {
    label: "Новинки",
    caption: "FW’26",
    href: "/catalog?sort=new",
    image: "/products/turin-navy.svg",
    alt: "Тёмно-синее мужское пальто «Турин» с воротником-стойкой",
  },
  {
    label: "Распродажа",
    caption: "−30%",
    href: "/catalog?sale=1",
    image: "/products/prague-terracotta.svg",
    alt: "Терракотовое пальто «Прага» свободного силуэта",
  },
];

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-heading" className="container mt-16 sm:mt-24">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Выберите своё</p>
          <h2 id="categories-heading" className="text-display-md">
            Коллекции
          </h2>
        </div>
        <Link
          href="/catalog"
          className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-graphite-soft transition-colors hover:text-bord sm:inline-flex"
        >
          Всё пальто
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <li key={category.href} className="group relative">
            <Link
              href={category.href}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream-deep">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-graphite/65 via-graphite/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-cream-soft/75">
                      {category.caption}
                    </p>
                    <p className="mt-1 font-serif text-lg text-cream-soft sm:text-3xl">
                      {category.label}
                    </p>
                  </div>
                  <span className="mb-1 hidden size-9 shrink-0 place-items-center rounded-full border border-cream-soft/50 text-cream-soft transition-all duration-300 ease-soft group-hover:bg-cream-soft group-hover:text-graphite sm:grid">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
