"use client";

import { Ruler } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SizeTable } from "@/components/product/size-table";
import type { Gender } from "@/lib/types";

export function SizeGuideDialog({
  gender,
  trigger,
}: {
  gender: Gender;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <span className="grid size-10 place-items-center rounded-full bg-cream-deep/80">
            <Ruler className="size-4" aria-hidden="true" />
          </span>
          <DialogTitle>Таблица размеров</DialogTitle>
          <DialogDescription>
            Мерки указаны в сантиметрах по телу, не по пальто. Если вы между размерами —
            берите меньший: посадка свободная.
          </DialogDescription>
        </DialogHeader>

        <SizeTable gender={gender} />

        <div className="rounded-lg bg-cream-deep/60 p-4 text-xs leading-relaxed text-graphite-soft">
          <p className="font-medium text-graphite">Как измерить</p>
          <p className="mt-1">
            Грудь — по самой широкой точке, талия — по естественной линии, бёдра — на 10 см ниже
            талии. Рукав измеряйте от плечевого шва до запястья.
          </p>
        </div>
        <p className="text-xs text-graphite-muted">
          Не уверены? Позвоните{" "}
          <a href="tel:+74951204590" className="underline underline-offset-4 hover:text-bord">
            +7 (495) 120-45-90
          </a>{" "}
          — поможем подобрать.
        </p>
      </DialogContent>
    </Dialog>
  );
}
