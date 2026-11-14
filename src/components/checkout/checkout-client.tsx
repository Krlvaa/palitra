"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  INITIAL_CHECKOUT_VALUES,
  getDeliveryPrice,
  submitOrder,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutValues,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/products";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "@/lib/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface FieldErrorProps {
  id: string;
  message?: string;
}

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-bord">
      {message}
    </p>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const { lines, hydrated, subtotal, discount, total, promo, clearCart } = useStore();
  const [values, setValues] = useState<CheckoutValues>(INITIAL_CHECKOUT_VALUES);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const deliveryPrice = getDeliveryPrice(values.delivery);
  const grandTotal = total + deliveryPrice;

  function update<K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleBlur(key: keyof CheckoutValues) {
    const nextErrors = validateCheckout(values);
    if (nextErrors[key]) {
      setErrors((current) => ({ ...current, [key]: nextErrors[key] }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCheckout(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      const field = event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`);
      field?.focus();
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    try {
      const response = await submitOrder({
        values,
        items: lines.map((line) => ({
          name: line.name,
          size: line.size,
          color: line.color,
          quantity: line.quantity,
          price: line.price,
        })),
        total: grandTotal,
      });

      window.sessionStorage.setItem(
        "palitra.lastOrder.v1",
        JSON.stringify({
          orderNumber: response.orderNumber,
          eta: response.eta,
          total: grandTotal,
          name: values.name,
          email: values.email,
        }),
      );

      setCompleted(true);
      clearCart();
      router.push(
        `/checkout/success?order=${encodeURIComponent(response.orderNumber)}&eta=${encodeURIComponent(response.eta)}`,
      );
    } catch {
      setStatus("idle");
      setSubmitError("Не удалось оформить заказ. Попробуйте ещё раз или позвоните нам.");
      toast.error("Оплата не прошла", { description: "Попробуйте ещё раз — данные сохранены." });
    }
  }

  if (!hydrated) {
    return (
      <div className="container pb-10 pt-6 sm:pt-10">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-6 h-12 w-72" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (lines.length === 0 && !completed) {
    return (
      <div className="container pb-4 pt-6 sm:pt-10">
        <Breadcrumbs items={[{ label: "Корзина", href: "/cart" }, { label: "Оформление" }]} />
        <div className="mx-auto mt-12 flex max-w-lg flex-col items-center rounded-xl border border-dashed border-graphite/20 bg-cream-soft/50 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-cream-deep/80">
            <ShoppingBag className="size-6 text-graphite-soft" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-display-sm">Сначала выберите пальто</h1>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-graphite-muted">
            В корзине пока пусто. Добавьте модель — и мы продолжим оформление.
          </p>
          <Button asChild className="mt-6">
            <Link href="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Корзина", href: "/cart" }, { label: "Оформление" }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow mb-3">Последний шаг</p>
        <h1 className="text-display-lg">Оформление заказа</h1>
        <p className="mt-3 text-sm leading-relaxed text-graphite-soft">
          Доставка бесплатная, возврат — 30 дней. Это демо-магазин: оплата не списывается, а данные
          остаются только в вашем браузере.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <section aria-labelledby="contacts-heading" className="rounded-xl border border-white/60 bg-cream-soft/55 p-5 shadow-glass backdrop-blur-sm sm:p-7">
            <div className="flex items-baseline gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-bord/30 font-serif text-sm text-bord">
                1
              </span>
              <h2 id="contacts-heading" className="font-serif text-2xl">
                Контакты
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Имя и фамилия</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Анна Петрова"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="name-error" message={errors.name} />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 900 000-00-00"
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  onBlur={() => handleBlur("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="phone-error" message={errors.phone} />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="mail@example.ru"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>
          </section>

          <section aria-labelledby="delivery-heading" className="rounded-xl border border-white/60 bg-cream-soft/55 p-5 shadow-glass backdrop-blur-sm sm:p-7">
            <div className="flex items-baseline gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-bord/30 font-serif text-sm text-bord">
                2
              </span>
              <h2 id="delivery-heading" className="font-serif text-2xl">
                Доставка
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={(event) => update("city", event.target.value)}
                  onBlur={() => handleBlur("city")}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="city-error" message={errors.city} />
              </div>

              <div>
                <Label htmlFor="postalCode">Индекс</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="101000"
                  maxLength={6}
                  value={values.postalCode}
                  onChange={(event) => update("postalCode", event.target.value)}
                  onBlur={() => handleBlur("postalCode")}
                  aria-invalid={Boolean(errors.postalCode)}
                  aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="postalCode-error" message={errors.postalCode} />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="street">Улица</Label>
                <Input
                  id="street"
                  name="street"
                  autoComplete="address-line1"
                  placeholder="Нижняя Сыромятническая"
                  value={values.street}
                  onChange={(event) => update("street", event.target.value)}
                  onBlur={() => handleBlur("street")}
                  aria-invalid={Boolean(errors.street)}
                  aria-describedby={errors.street ? "street-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="street-error" message={errors.street} />
              </div>

              <div>
                <Label htmlFor="house">Дом</Label>
                <Input
                  id="house"
                  name="house"
                  placeholder="10"
                  value={values.house}
                  onChange={(event) => update("house", event.target.value)}
                  onBlur={() => handleBlur("house")}
                  aria-invalid={Boolean(errors.house)}
                  aria-describedby={errors.house ? "house-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="house-error" message={errors.house} />
              </div>

              <div>
                <Label htmlFor="apartment">Квартира / офис</Label>
                <Input
                  id="apartment"
                  name="apartment"
                  inputMode="numeric"
                  placeholder="Необязательно"
                  value={values.apartment}
                  onChange={(event) => update("apartment", event.target.value)}
                  onBlur={() => handleBlur("apartment")}
                  aria-invalid={Boolean(errors.apartment)}
                  aria-describedby={errors.apartment ? "apartment-error" : undefined}
                  className="mt-2"
                />
                <FieldError id="apartment-error" message={errors.apartment} />
              </div>
            </div>

            <fieldset className="mt-7">
              <legend className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-graphite">
                Способ доставки
              </legend>
              <RadioGroup
                value={values.delivery}
                onValueChange={(value) => update("delivery", value as CheckoutValues["delivery"])}
                className="mt-3 space-y-2.5"
                aria-label="Способ доставки"
              >
                {DELIVERY_OPTIONS.map((option) => {
                  const selected = values.delivery === option.id;
                  return (
                    <label
                      key={option.id}
                      htmlFor={`delivery-${option.id}`}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                        selected ? "border-bord/50 bg-bord/[0.035]" : "border-graphite/15 hover:border-graphite/30",
                      )}
                    >
                      <RadioGroupItem
                        id={`delivery-${option.id}`}
                        value={option.id}
                        className="mt-0.5"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-graphite">{option.title}</span>
                        <span className="mt-0.5 block text-xs text-graphite-muted">{option.description}</span>
                      </span>
                      <span className="shrink-0 text-xs tabular-nums text-graphite-soft">
                        {option.price === 0 ? "Бесплатно" : formatPrice(option.price)}
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
            </fieldset>
          </section>

          <section aria-labelledby="payment-heading" className="rounded-xl border border-white/60 bg-cream-soft/55 p-5 shadow-glass backdrop-blur-sm sm:p-7">
            <div className="flex items-baseline gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-bord/30 font-serif text-sm text-bord">
                3
              </span>
              <h2 id="payment-heading" className="font-serif text-2xl">
                Оплата
              </h2>
            </div>

            <RadioGroup
              value={values.payment}
              onValueChange={(value) => update("payment", value as CheckoutValues["payment"])}
              className="mt-5 space-y-2.5"
              aria-label="Способ оплаты"
            >
              {PAYMENT_OPTIONS.map((option) => {
                const selected = values.payment === option.id;
                return (
                  <label
                    key={option.id}
                    htmlFor={`payment-${option.id}`}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                      selected ? "border-bord/50 bg-bord/[0.035]" : "border-graphite/15 hover:border-graphite/30",
                    )}
                  >
                    <RadioGroupItem
                      id={`payment-${option.id}`}
                      value={option.id}
                      className="mt-0.5"
                    />
                    <span>
                      <span className="block text-sm text-graphite">{option.title}</span>
                      <span className="mt-0.5 block text-xs text-graphite-muted">{option.description}</span>
                    </span>
                  </label>
                );
              })}
            </RadioGroup>

            <div className="mt-6">
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Домофон, удобное время доставки или пожелания к упаковке"
                value={values.comment}
                onChange={(event) => update("comment", event.target.value)}
                className="mt-2"
              />
            </div>
          </section>

          <section aria-labelledby="confirm-heading" className="rounded-xl border border-white/60 bg-cream-soft/55 p-5 shadow-glass backdrop-blur-sm sm:p-7">
            <h2 id="confirm-heading" className="sr-only">
              Подтверждение
            </h2>
            <label htmlFor="agreement" className="flex cursor-pointer items-start gap-3">
              <Checkbox
                id="agreement"
                name="agreement"
                checked={values.agreement}
                onCheckedChange={(checked) => update("agreement", checked === true)}
                aria-invalid={Boolean(errors.agreement)}
                aria-describedby={errors.agreement ? "agreement-error" : undefined}
                className="mt-0.5"
              />
              <span className="text-xs leading-relaxed text-graphite-soft">
                Согласен с{" "}
                <Link
                  href="/privacy"
                  onClick={(event) => event.stopPropagation()}
                  className="text-bord underline underline-offset-4"
                >
                  политикой конфиденциальности
                </Link>{" "}
                и обработкой персональных данных для доставки заказа.
              </span>
            </label>
            <FieldError id="agreement-error" message={errors.agreement} />

            {Object.keys(errors).length > 0 && (
              <p role="alert" className="mt-4 rounded-md bg-bord/[0.06] px-3 py-2 text-xs text-bord">
                Проверьте отмеченные поля — осталось совсем немного.
              </p>
            )}

            {submitError && (
              <p role="alert" className="mt-4 rounded-md bg-bord/[0.06] px-3 py-2 text-xs text-bord">
                {submitError}
              </p>
            )}

            <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-5 w-full">
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Оформляем заказ…
                </>
              ) : (
                <>
                  Подтвердить заказ · {formatPrice(grandTotal)}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-graphite-muted">
              <Lock className="size-3" aria-hidden="true" />
              Демо-оплата: деньги не списываются. Данные не покидают ваш браузер.
            </p>
          </section>
        </form>

        <aside aria-labelledby="order-summary-heading" className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-white/60 bg-cream-soft/75 p-5 shadow-glass backdrop-blur-md sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 id="order-summary-heading" className="font-serif text-2xl">
                Ваш заказ
              </h2>
              <Link href="/cart" className="text-xs text-graphite-muted underline underline-offset-4 hover:text-bord">
                Изменить
              </Link>
            </div>

            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-cream-deep">
                    <Image
                      src={line.image}
                      alt={`Пальто «${line.name}»`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base leading-tight">«{line.name}»</p>
                    <p className="mt-0.5 text-[11px] text-graphite-muted">
                      {line.size} · {line.color} · {line.quantity} шт.
                    </p>
                    <p className="mt-1 text-xs tabular-nums">{formatPrice(line.price * line.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
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
                <dd className="tabular-nums">
                  {deliveryPrice === 0 ? "Бесплатно" : formatPrice(deliveryPrice)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-3 font-serif text-2xl">
                <dt>Итого</dt>
                <dd className="tabular-nums">{formatPrice(grandTotal)}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-1.5 text-[11px] text-graphite-muted">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-bord" aria-hidden="true" />
                Бесплатная доставка по России
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-bord" aria-hidden="true" />
                Возврат 30 дней без объяснений
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
