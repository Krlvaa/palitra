"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CONTACTS } from "@/lib/site";

const LINKS = [
  { label: "Весь каталог", href: "/catalog" },
  { label: "Женские пальто", href: "/catalog?gender=women" },
  { label: "Мужские пальто", href: "/catalog?gender=men" },
  { label: "Новинки", href: "/catalog?sort=new" },
  { label: "Распродажа", href: "/catalog?sale=1" },
  { label: "Избранное", href: "/favorites" },
  { label: "Контакты", href: "/contacts" },
];

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="max-w-[20rem]">
        <SheetHeader>
          <SheetTitle>Меню</SheetTitle>
          <SheetDescription className="sr-only">
            Навигация по каталогу, избранному и контактам
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Мобильная навигация" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-line">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center justify-between py-4 font-serif text-2xl text-graphite transition-colors hover:text-bord"
                >
                  {link.label}
                  <ArrowUpRight className="size-4 text-graphite-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line px-5 py-5 text-sm text-graphite-soft">
          <p className="eyebrow mb-2">Связаться</p>
          <a href={CONTACTS.phoneHref} className="link-line inline-block">
            {CONTACTS.phone}
          </a>
          <p className="mt-1 text-xs text-graphite-muted">{CONTACTS.hours}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
