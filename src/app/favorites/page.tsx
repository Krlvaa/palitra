import type { Metadata } from "next";
import { FavoritesClient } from "@/components/favorites/favorites-client";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Сохранённые пальто palitra. Сравните модели, цвета и размеры перед покупкой.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
