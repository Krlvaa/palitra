import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-md border border-graphite/20 bg-cream-soft/80 px-4 py-3 font-sans text-base text-graphite shadow-sm transition-colors placeholder:text-graphite-muted/70 hover:border-graphite/35 focus-visible:border-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord/25 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
