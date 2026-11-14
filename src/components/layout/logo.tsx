import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="palitra — на главную"
      className={cn("group inline-flex items-baseline gap-1", className)}
    >
      <span className="font-serif text-[1.7rem] font-medium leading-none tracking-[-0.025em] text-graphite">
        palitra
      </span>
      <span
        aria-hidden="true"
        className="mb-[3px] size-1.5 rounded-full bg-bord transition-transform duration-300 ease-soft group-hover:scale-125"
      />
    </Link>
  );
}
