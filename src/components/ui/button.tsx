import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-bord text-cream-soft hover:bg-bord-deep shadow-[0_10px_30px_-18px_rgba(110,42,47,0.9)]",
        outline:
          "border border-graphite/25 bg-transparent text-graphite hover:border-graphite hover:bg-graphite/[0.04]",
        secondary: "bg-cream-deep text-graphite hover:bg-[#E5DACB]",
        ghost: "text-graphite hover:bg-graphite/[0.06]",
        link: "text-bord underline-offset-4 hover:underline rounded-none p-0 h-auto",
        glass:
          "border border-white/50 bg-white/55 text-graphite backdrop-blur-md hover:bg-white/75 shadow-glass",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-[10px]",
        lg: "h-14 px-9",
        icon: "size-11 p-0",
        "icon-sm": "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
