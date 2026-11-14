import { Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "Пальто село сразу, без примерок и подгонок. Плотная шерсть, но не колючая — ношу с тонким кашемиром даже в минус.",
    name: "Анна",
    meta: "Москва · «Стокгольм», 44",
  },
  {
    quote:
      "Заказывал «Хельсинки» на 50-й. Сел ровно, рукава по длине. Отдельное спасибо за упаковку: приехало на вешалке, ни одной складки.",
    name: "Дмитрий",
    meta: "Санкт-Петербург · «Хельсинки», 50",
  },
  {
    quote:
      "Вернула первое пальто из-за цвета и заказала другое. Деньги пришли на третий день, курьер забрал сам. Спокойно и по-человечески.",
    name: "Мария",
    meta: "Казань · «Верона», 42",
  },
];

export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="container mt-16 sm:mt-24">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-3">Отзывы</p>
          <h2 id="reviews-heading" className="text-display-md">
            Носят и возвращаются
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 fill-bord text-bord" />
            ))}
          </span>
          <p className="text-sm text-graphite-soft">
            <span className="font-medium text-graphite">4.9</span> из 5 · 1 200+ отзывов
          </p>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <li
            key={review.name}
            className="flex flex-col justify-between rounded-lg border border-white/60 bg-cream-soft/70 p-6 shadow-glass backdrop-blur-sm"
          >
            <div>
              <span className="flex" role="img" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-bord text-bord" aria-hidden="true" />
                ))}
              </span>
              <blockquote className="mt-4 text-pretty font-serif text-xl leading-snug text-graphite">
                «{review.quote}»
              </blockquote>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
              <span className="grid size-9 place-items-center rounded-full bg-cream-deep font-serif text-sm">
                {review.name.charAt(0)}
              </span>
              <div>
                <p className="text-xs font-medium text-graphite">{review.name}</p>
                <p className="text-[11px] text-graphite-muted">{review.meta}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
