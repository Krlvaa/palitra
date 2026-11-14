"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Проверьте адрес — нужен формат mail@example.ru");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("idle");
    setEmail("");
    toast.success("Вы в списке", {
      description: "Пришлём письмо, когда выйдет новая коллекция. Обещаем без спама.",
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? "w-full" : "w-full max-w-md"}>
      <label htmlFor={compact ? "footer-email" : "newsletter-email"} className="sr-only">
        Электронная почта
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id={compact ? "footer-email" : "newsletter-email"}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="mail@example.ru"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setError("");
            }
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="bg-cream-soft"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-graphite px-6 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-cream-soft transition-colors hover:bg-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
          Подписаться
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-bord">
          {error}
        </p>
      )}
      <p className="mt-2 text-[11px] leading-relaxed text-graphite-muted">
        Письма о новых коллекциях и уходе за вещами. Отписаться можно в один клик.
      </p>
    </form>
  );
}
