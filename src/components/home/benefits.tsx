import { BadgeCheck, Gift, RotateCcw, Truck } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Доставляем бесплатно",
    text: "Курьером по Москве за 1–2 дня и по России — от 3 дней. Отправим трек-номер в SMS.",
  },
  {
    icon: RotateCcw,
    title: "Возврат 30 дней",
    text: "Если посадка не та — вернём деньги. Заберём курьером, без справок и объяснений.",
  },
  {
    icon: Gift,
    title: "Упаковываем с любовью",
    text: "Пальто приезжает в чехле на вешалке, с лентой и открыткой. Можно сразу дарить.",
  },
  {
    icon: BadgeCheck,
    title: "Ценим качество",
    text: "Проверяем каждую партию: швы, фурнитуру, состав. Работаем с фабриками в России.",
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="container mt-16 sm:mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-bord px-5 py-12 text-cream-soft sm:px-10 sm:py-16 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 size-[32rem] rounded-full bg-cream-soft/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-24 size-[28rem] rounded-full bg-graphite/20 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-cream-soft/80">Сервис palitra</p>
            <h2 id="benefits-heading" className="mt-4 text-display-md text-cream-soft">
              Ваш выбор,
              <br />
              наша забота
            </h2>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-cream-soft/80">
              Мы хотим, чтобы покупка пальто была спокойной. Поэтому убираем всё лишнее — и берём
              заботы на себя.
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <li key={benefit.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cream-soft/25 bg-cream-soft/5">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="flex items-baseline gap-2 font-serif text-xl">
                      <span className="font-sans text-[10px] tracking-[0.2em] text-cream-soft/75">
                        0{index + 1}
                      </span>
                      {benefit.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream-soft/75 sm:text-[13px]">
                      {benefit.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
