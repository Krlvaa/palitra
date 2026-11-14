import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/product/favorite-button";
import { Badge } from "@/components/ui/badge";
import { discountPercent, formatPrice, getCardImages } from "@/lib/products";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const images = getCardImages(product);
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream-deep">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`Пальто «${product.name}» — ${formatPrice(product.price)}`}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2"
        >
          <Image
            src={images.front.src}
            alt={images.front.alt}
            fill
            priority={priority}
            sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
          <Image
            src={images.hover.src}
            alt=""
            fill
            aria-hidden="true"
            sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-soft group-hover:opacity-100"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {discount && <Badge>−{discount}%</Badge>}
          {product.isNew && <Badge variant="dark">Новинка</Badge>}
          {!discount && !product.isNew && product.isBestseller && <Badge variant="soft">Хит</Badge>}
        </div>

        <FavoriteButton
          slug={product.slug}
          name={product.name}
          className="absolute right-3 top-3 z-20"
        />
      </div>

      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          <h3 className="font-serif text-base leading-tight sm:text-xl">
            <Link
              href={`/product/${product.slug}`}
              className="transition-colors hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              «{product.name}»
            </Link>
          </h3>
          <div className="text-left sm:shrink-0 sm:text-right">
            <span className="block text-[13px] tabular-nums sm:text-sm">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="block text-[11px] text-graphite-muted line-through tabular-nums">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.12em] text-graphite-muted">
            {product.gender === "women" ? "Женское" : "Мужское"}
          </p>
          <div className="flex items-center gap-1" aria-hidden="true">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.slug}
                title={color.name}
                className="size-2.5 rounded-full ring-1 ring-inset ring-graphite/15"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          <span className="sr-only">
            Цвета: {product.colors.map((color) => color.name).join(", ")}
          </span>
        </div>
      </div>
    </article>
  );
}
