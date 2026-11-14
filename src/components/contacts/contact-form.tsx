"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactValues {
  name: string;
  email: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  function update<K extends keyof ContactValues>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(): ContactErrors {
    const next: ContactErrors = {};
    if (values.name.trim().length < 2) next.name = "Как к вам обращаться?";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Проверьте адрес — нужен формат mail@example.ru";
    if (values.message.trim().length < 10) next.message = "Расскажите чуть подробнее — хотя бы 10 символов";
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("sent");
    toast.success("Сообщение отправлено", {
      description: "Ответим в течение рабочего дня. Спасибо, что написали.",
    });
    setValues({ name: "", email: "", message: "" });
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-white/60 bg-cream-soft/70 p-6 shadow-glass backdrop-blur-sm">
        <span className="grid size-11 place-items-center rounded-full bg-bord/[0.08] text-bord">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-4 font-serif text-2xl">Сообщение у нас</p>
        <p className="mt-1.5 text-sm leading-relaxed text-graphite-soft">
          Ответим в течение рабочего дня — обычно быстрее. Если срочно, позвоните{" "}
          <a href="tel:+74951204590" className="text-bord underline underline-offset-4">
            +7 (495) 120-45-90
          </a>
          .
        </p>
        <Button type="button" variant="outline" className="mt-5" onClick={() => setStatus("idle")}>
          Написать ещё
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-white/60 bg-cream-soft/60 p-5 shadow-glass backdrop-blur-sm sm:p-7"
    >
      <h2 className="font-serif text-2xl">Напишите нам</h2>
      <p className="mt-1.5 text-sm text-graphite-muted">
        Поможем с размером, заказом или возвратом. Отвечает человек, не бот.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Имя</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="Как к вам обращаться"
            className="mt-2"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-bord">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            placeholder="mail@example.ru"
            className="mt-2"
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-bord">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="contact-message">Сообщение</Label>
          <Textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            placeholder="Например: подскажите размер на рост 172, грудь 90"
            className="mt-2"
          />
          {errors.message && (
            <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-bord">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={status === "loading"} className="mt-5">
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          <>
            Отправить
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="mt-3 text-[11px] leading-relaxed text-graphite-muted">
        Нажимая «Отправить», вы соглашаетесь с{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-bord">
          политикой конфиденциальности
        </a>
        . Демо-форма: сообщение не покидает браузер.
      </p>
    </form>
  );
}
