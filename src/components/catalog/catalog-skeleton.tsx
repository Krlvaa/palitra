import { Skeleton } from "@/components/ui/skeleton";

export function CatalogSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Загружаем товары">
      <div className="mb-6 flex gap-3">
        <Skeleton className="h-11 flex-1 rounded-full" />
        <Skeleton className="h-11 w-28 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-x-3 gap-y-9 min-[360px]:grid-cols-2 sm:gap-x-5 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-[3/4] w-full rounded-sm" />
            <div className="mt-3.5 space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3.5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
