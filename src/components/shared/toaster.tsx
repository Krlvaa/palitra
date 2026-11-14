"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-cream-soft/95 !border !border-graphite/10 !text-graphite !backdrop-blur-xl !shadow-lift !font-sans !rounded-xl",
          title: "!font-serif !text-base !font-medium",
          description: "!text-xs !text-graphite-muted",
          closeButton: "!bg-cream-deep !border-graphite/10 !text-graphite",
          success: "!text-graphite",
          actionButton: "!bg-bord !text-cream-soft",
        },
      }}
    />
  );
}
