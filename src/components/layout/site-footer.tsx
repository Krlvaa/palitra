import Link from "next/link";
import { CONTACTS } from "@/lib/site";

const CATALOG_LINKS = [
  { label: "Все пальто", href: "/catalog" },
  { label: "Женские", href: "/catalog?gender=women" },
  { label: "Мужские", href: "/catalog?gender=men" },
  { label: "Новинки", href: "/catalog?sort=new" },
  { label: "Распродажа", href: "/catalog?sale=1" },
];

const HELP_LINKS = [
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Возврат и обмен", href: "/returns" },
  { label: "Таблица размеров", href: "/size-guide" },
  { label: "Уход за пальто", href: "/care" },
  { label: "Контакты", href: "/contacts" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-graphite/10 bg-cream-soft/60">
      <div className="container py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="palitra — на главную" className="inline-flex items-baseline gap-1">
              <span className="font-serif text-3xl font-medium tracking-[-0.025em]">palitra</span>
              <span aria-hidden="true" className="mb-1 size-1.5 rounded-full bg-bord" />
            </Link>
            <p className="mt-4 max-w-xs font-serif text-xl leading-snug text-graphite-soft">
              Пальто, которое остаётся с вами не один сезон.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-graphite-muted">
              Шерсть, кашемир и альпака. Шьём небольшими партиями в Санкт-Петербурге и Иваново.
            </p>
          </div>

          <nav aria-label="Каталог">
            <h2 className="eyebrow mb-4">Каталог</h2>
            <ul className="space-y-2.5">
              {CATALOG_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-graphite-soft link-line hover:text-bord">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Помощь">
            <h2 className="eyebrow mb-4">Помощь</h2>
            <ul className="space-y-2.5">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-graphite-soft link-line hover:text-bord">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4">Связаться</h2>
            <a href={CONTACTS.phoneHref} className="font-serif text-2xl link-line hover:text-bord">
              {CONTACTS.phone}
            </a>
            <p className="mt-1 text-xs text-graphite-muted">{CONTACTS.hours}</p>
            <a
              href={`mailto:${CONTACTS.email}`}
              className="mt-3 inline-block text-sm text-graphite-soft link-line hover:text-bord"
            >
              {CONTACTS.email}
            </a>
            <p className="mt-3 max-w-[16rem] text-xs leading-relaxed text-graphite-muted">
              {CONTACTS.address}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-graphite-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 palitra. Все права защищены.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="link-line hover:text-bord">
              Политика конфиденциальности
            </Link>
            <span aria-hidden="true" className="hidden sm:block">Мир · Visa · Mastercard · СБП</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
