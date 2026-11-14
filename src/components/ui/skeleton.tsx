import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative overflow-hidden rounded-md bg-cream-deep/70", className)} {...props} />;
}

export { Skeleton };
