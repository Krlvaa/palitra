import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contacts/contact-form";
import { InfoPage } from "@/components/shared/info-page";
import { CONTACTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Шоурум palitra в Москве, телефон и email. Поможем с размером, заказом, доставкой и возвратом.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <InfoPage
      eyebrow="Мы рядом"
      title="Контакты"
      lead="Шоурум в Москве, телефон и почта. Отвечаем на вопросы о размерах, заказах и возврате — без скриптов и долгих ожиданий."
    >
      <h2>Шоурум</h2>
      <p>{CONTACTS.address}</p>
      <p>Второй этаж, вход со двора. Есть примерочные и кофе.</p>

      <div className="not-prose relative flex aspect-[16/9] items-end overflow-hidden rounded-lg border border-white/60 bg-cream-deep/80 p-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,28,28,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(28,28,28,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bord text-cream-soft shadow-lift">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <p className="relative rounded-md bg-cream-soft/80 px-3 py-2 text-xs text-graphite-soft backdrop-blur-sm">
          Нижняя Сыромятническая, 10, стр. 2 · 5 минут от м. Курская
        </p>
      </div>

      <h2>Телефон и почта</h2>
      <ul>
        <li>
          <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a> — ежедневно с 10:00 до 21:00.
        </li>
        <li>
          <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a> — отвечаем в течение рабочего дня.
        </li>
        <li>Для оптовых заказов и коллабораций: <a href="mailto:hello@palitra.example">hello@palitra.example</a>.</li>
      </ul>

      <div className="not-prose mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: MapPin, title: "Адрес", text: CONTACTS.address },
          { icon: Clock, title: "Часы", text: CONTACTS.hours },
          { icon: Phone, title: "Телефон", text: CONTACTS.phone },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-lg border border-white/60 bg-cream-soft/60 p-4">
              <Icon className="size-4 text-bord" aria-hidden="true" />
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-graphite-muted">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-graphite-soft">{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="not-prose mt-10">
        <ContactForm />
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs text-graphite-muted">
        <Mail className="size-3.5" aria-hidden="true" />
        Это демонстрационный проект — форма не отправляет сообщения на сервер.
      </p>
    </InfoPage>
  );
}
