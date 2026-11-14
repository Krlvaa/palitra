import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-5 max-w-2xl text-display-lg text-balance">Кажется, это пальто уже ушло</h1>
      <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-graphite-soft sm:text-base">
        Страница не найдена или модель распродана. Посмотрите коллекцию — там точно есть что-то
        ваше.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/catalog">
            Перейти в каталог <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">На главную</Link>
        </Button>
      </div>
      <p className="mt-10 font-serif text-2xl text-graphite-muted/75" aria-hidden="true">
        palitra
      </p>
    </div>
  );
}
