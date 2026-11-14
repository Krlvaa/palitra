import type { Metadata } from "next";
import { InfoPage } from "@/components/shared/info-page";
import { SizeTable } from "@/components/product/size-table";

export const metadata: Metadata = {
  title: "Таблица размеров",
  description:
    "Таблица размеров женских и мужских пальто palitra: грудь, талия, бёдра и длина рукава. Как правильно измерить себя.",
  alternates: { canonical: "/size-guide" },
};

export default function SizeGuidePage() {
  return (
    <InfoPage
      eyebrow="Помощь"
      title="Таблица размеров"
      lead="Мерки указаны по телу, а не по пальто. Посадка свободная: если вы между размерами, берите меньший — под свитер останется место."
    >
      <h2>Женские пальто</h2>
      <SizeTable gender="women" />

      <h2>Мужские пальто</h2>
      <SizeTable gender="men" />

      <h2>Как измерить</h2>
      <ul>
        <li><strong>Грудь:</strong> по самой широкой точке, лента не провисает.</li>
        <li><strong>Талия:</strong> по естественной линии, не затягивайте.</li>
        <li><strong>Бёдра:</strong> на 10 см ниже талии, по выступающим точкам.</li>
        <li><strong>Рукав:</strong> от плечевого шва до запястья, рука чуть согнута.</li>
      </ul>

      <h2>Если сомневаетесь</h2>
      <p>
        Напишите нам рост, вес и привычный размер — подскажем модель и размер. Или закажите два
        размера: лишний вернёте бесплатно в течение 30 дней, курьер заберёт.
      </p>
      <p>
        Телефон{" "}
        <a href="tel:+74951204590">+7 (495) 120-45-90</a>, ежедневно с 10:00 до 21:00.
      </p>
    </InfoPage>
  );
}
