import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="text-display-md text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-graphite-soft sm:text-base">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-graphite-soft transition-colors hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord sm:self-auto"
        >
          {link.label}
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
