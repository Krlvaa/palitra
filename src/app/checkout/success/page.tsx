import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessClient } from "@/components/checkout/success-client";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Спасибо за заказ",
  description: "Заказ оформлен. Мы свяжемся с вами для подтверждения доставки.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container pb-4 pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <Skeleton className="mx-auto size-16 rounded-full" />
            <Skeleton className="mx-auto mt-6 h-12 w-3/4" />
            <Skeleton className="mx-auto mt-4 h-4 w-2/3" />
            <Skeleton className="mt-8 h-72 rounded-xl" />
          </div>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
