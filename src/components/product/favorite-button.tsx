"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  slug,
  name,
  className,
  size = "default",
  showLabel = false,
}: {
  slug: string;
  name: string;
  className?: string;
  size?: "default" | "large";
  showLabel?: boolean;
}) {
  const { isFavorite, toggleFavorite, hydrated } = useStore();
  const active = hydrated && isFavorite(slug);

  function handleClick() {
    const added = toggleFavorite(slug);
    if (added) {
      toast.success("Добавлено в избранное", {
        description: `Пальто «${name}» ждёт вас в избранном.`,
      });
    } else {
      toast("Удалено из избранного", { description: `Пальто «${name}» больше не в списке.` });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Убрать «${name}» из избранного` : `Добавить «${name}» в избранное`}
      className={cn(
        "grid place-items-center rounded-full border border-white/60 bg-cream-soft/80 text-graphite shadow-sm backdrop-blur-md transition-all duration-300 ease-soft hover:bg-cream-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2",
        size === "large" ? "size-12" : "size-10",
        showLabel && "flex w-full grid-flow-col items-center gap-2.5 rounded-full border-graphite/20 bg-transparent px-5 py-3 shadow-none backdrop-blur-none hover:border-graphite/40",
        active && "text-bord",
        className,
      )}
    >
      <Heart
        className={cn(size === "large" ? "size-5" : "size-[1.05rem]", active && "fill-current")}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em]">
          {active ? "В избранном" : "В избранное"}
        </span>
      )}
    </button>
  );
}
