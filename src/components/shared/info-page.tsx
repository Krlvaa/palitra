import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CONTACTS } from "@/lib/site";

interface InfoPageProps {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export function InfoPage({ eyebrow, title, lead, children, aside }: InfoPageProps) {
  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Breadcrumbs items={[{ label: title }]} />

      <header className="mt-6 max-w-3xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="text-display-lg text-balance">{title}</h1>
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-graphite-soft sm:text-base">
          {lead}
        </p>
      </header>

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
        <div className="rich-text min-w-0 max-w-2xl">{children}</div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          {aside}
          <div className="rounded-xl border border-white/60 bg-cream-soft/70 p-5 shadow-glass backdrop-blur-sm">
            <p className="eyebrow">Поддержка</p>
            <ul className="mt-4 space-y-3 text-sm text-graphite-soft">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-bord" aria-hidden="true" />
                <a href={CONTACTS.phoneHref} className="link-line hover:text-bord">
                  {CONTACTS.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-bord" aria-hidden="true" />
                <a href={`mailto:${CONTACTS.email}`} className="link-line hover:text-bord">
                  {CONTACTS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-bord" aria-hidden="true" />
                <span>{CONTACTS.address}</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-graphite-muted">{CONTACTS.hours}</p>
            <Link
              href="/contacts"
              className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-bord link-line"
            >
              Написать нам
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
