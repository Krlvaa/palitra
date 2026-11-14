import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-graphite-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-bord">
            Главная
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 text-graphite-muted/60" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-bord">
                {item.label}
              </Link>
            ) : (
              <span className="text-graphite" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
