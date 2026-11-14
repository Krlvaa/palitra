import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформите заказ пальто palitra: доставка бесплатно, оплата картой, СБП или при получении.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
