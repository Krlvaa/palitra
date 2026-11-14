import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogLoading() {
  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Skeleton className="h-3 w-32" />
      <div className="mt-6 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-14 w-80 max-w-full" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-2/3 max-w-md" />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="hidden space-y-6 rounded-lg border border-white/60 bg-cream-soft/55 p-5 lg:block">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
        <CatalogSkeleton />
      </div>
    </div>
  );
}
