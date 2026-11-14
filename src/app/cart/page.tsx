import type { Metadata } from "next";
import { CartClient } from "@/components/cart/cart-client";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Ваши пальто palitra. Проверьте размеры, количество и оформите заказ с бесплатной доставкой.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
