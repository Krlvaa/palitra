"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, PackageCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import { CONTACTS } from "@/lib/site";

interface LastOrder {
  orderNumber: string;
  eta: string;
  total: number;
  name: string;
  email: string;
}

export function SuccessClient() {
  const searchParams = useSearchParams();
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);

  const orderNumber = searchParams.get("order") ?? "PLT-000000";
  const eta = searchParams.get("eta") ?? "15–17 ноября";

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("palitra.lastOrder.v1");
      if (raw) setLastOrder(JSON.parse(raw) as LastOrder);
    } catch {
      setLastOrder(null);
    }
  }, []);

  const firstName = lastOrder?.name?.trim().split(" ")[0];

  return (
    <div className="container pb-4 pt-10 sm:pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-bord/[0.08] text-bord">
          <Check className="size-7" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5">Заказ оформлен</p>
        <h1 className="mt-3 text-display-lg text-balance">
          {firstName ? `${firstName}, спасибо за заказ` : "Спасибо за заказ"}
        </h1>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-graphite-soft sm:text-base">
          Мы уже собираем пальто: проверим швы, отпарим и упакуем в чехол. Номер заказа —
          <span className="mx-1.5 font-medium text-graphite">{orderNumber}</span>.
          {lastOrder?.email && (
            <> Подтверждение отправили на {lastOrder.email}.</>
          )}
        </p>

        <div className="mt-8 rounded-xl border border-white/60 bg-cream-soft/75 p-5 text-left shadow-glass backdrop-blur-md sm:p-7">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">Номер заказа</dt>
              <dd className="mt-1.5 font-serif text-2xl">{orderNumber}</dd>
            </div>
            <div>
              <dt className="eyebrow">Доставка</dt>
              <dd className="mt-1.5 font-serif text-2xl">{eta}</dd>
              <dd className="mt-0.5 text-xs text-graphite-muted">Курьером, бесплатно</dd>
            </div>
            {lastOrder?.total !== undefined && (
              <div>
                <dt className="eyebrow">Сумма</dt>
                <dd className="mt-1.5 font-serif text-2xl tabular-nums">{formatPrice(lastOrder.total)}</dd>
              </div>
            )}
            <div>
              <dt className="eyebrow">Оплата</dt>
              <dd className="mt-1.5 font-serif text-2xl">Демо-заказ</dd>
              <dd className="mt-0.5 text-xs text-graphite-muted">Деньги не списаны</dd>
            </div>
          </dl>

          <ol className="mt-6 space-y-4 border-t border-line pt-5">
            <li className="flex gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-deep">
                <PackageCheck className="size-4 text-graphite-soft" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-graphite">Собираем заказ</p>
                <p className="mt-0.5 text-xs leading-relaxed text-graphite-muted">
                  Проверим пальто и упакуем. Обычно это занимает несколько часов.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-deep">
                <Truck className="size-4 text-graphite-soft" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-graphite">Передаём курьеру</p>
                <p className="mt-0.5 text-xs leading-relaxed text-graphite-muted">
                  Пришлём SMS с трек-номером и позвоним за час до доставки.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-deep">
                <Check className="size-4 text-graphite-soft" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-graphite">Примерка на месте</p>
                <p className="mt-0.5 text-xs leading-relaxed text-graphite-muted">
                  Курьер подождёт. Если не подойдёт — вернём в течение 30 дней.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/catalog">Продолжить покупки</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contacts">Связаться с нами</Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-graphite-muted">
          Вопросы по заказу:{" "}
          <a href={CONTACTS.phoneHref} className="text-graphite-soft underline underline-offset-4 hover:text-bord">
            {CONTACTS.phone}
          </a>{" "}
          · {CONTACTS.hours}
        </p>
      </div>
    </div>
  );
}
