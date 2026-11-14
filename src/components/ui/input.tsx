import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-graphite/20 bg-cream-soft/80 px-4 font-sans text-base text-graphite shadow-sm transition-colors placeholder:text-graphite-muted/70 hover:border-graphite/35 focus-visible:border-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-bord aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-bord/15",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
