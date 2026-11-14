export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://palitra.example");

export const SITE_NAME = "palitra";

export const CONTACTS = {
  phone: "+7 (495) 120-45-90",
  phoneHref: "tel:+74951204590",
  email: "hello@palitra.example",
  address: "Москва, Нижняя Сыромятническая, 10, строение 2",
  hours: "Ежедневно, 10:00–21:00",
};

export const FREE_SHIPPING_FROM = 10000;
export const RETURNS_DAYS = 30;

export const DELIVERY_OPTIONS = [
  {
    id: "courier",
    title: "Курьером по Москве",
    description: "1–2 дня, примерка при получении",
    price: 0,
    eta: "15–17 ноября",
  },
  {
    id: "pickup",
    title: "Самовывоз из шоурума",
    description: "Нижняя Сыромятническая, 10",
    price: 0,
    eta: "сегодня после 14:00",
  },
  {
    id: "express",
    title: "Экспресс до 12:00",
    description: "Москва, следующий день",
    price: 990,
    eta: "14 ноября до 12:00",
  },
] as const;

export const PAYMENT_OPTIONS = [
  {
    id: "card",
    title: "Картой онлайн",
    description: "Мир, Visa, Mastercard — защищённый платёж",
  },
  {
    id: "sbp",
    title: "СБП",
    description: "Оплата по QR-коду в приложении банка",
  },
  {
    id: "cash",
    title: "При получении",
    description: "Курьеру или в шоуруме — картой или наличными",
  },
] as const;

export const PROMO_CODES = {
  PALITRA10: { type: "percent", value: 10, label: "−10% на весь заказ" },
  WELCOME: { type: "fixed", value: 1500, label: "−1 500 ₽ на первый заказ" },
} as const;

export type PromoCode = keyof typeof PROMO_CODES;
