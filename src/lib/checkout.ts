import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "@/lib/site";

export interface CheckoutValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
  comment: string;
  delivery: (typeof DELIVERY_OPTIONS)[number]["id"];
  payment: (typeof PAYMENT_OPTIONS)[number]["id"];
  agreement: boolean;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export const INITIAL_CHECKOUT_VALUES: CheckoutValues = {
  name: "",
  phone: "",
  email: "",
  city: "Москва",
  street: "",
  house: "",
  apartment: "",
  postalCode: "",
  comment: "",
  delivery: "courier",
  payment: "card",
  agreement: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/;
const PHONE_RE = /^\+?[78][\s(-]*\d{3}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Укажите имя и фамилию";
  } else if (!values.name.trim().includes(" ")) {
    errors.name = "Укажите имя и фамилию через пробел";
  }

  if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Формат: +7 900 000-00-00";
  }

  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Проверьте адрес — нужен формат mail@example.ru";
  }

  if (values.city.trim().length < 2) errors.city = "Укажите город";
  if (values.street.trim().length < 3) errors.street = "Укажите улицу";
  if (!/^\d+[а-яА-Яa-zA-Z]?$/.test(values.house.trim())) {
    errors.house = "Номер дома, например 12 или 12А";
  }
  if (values.apartment && !/^\d+$/.test(values.apartment.trim())) {
    errors.apartment = "Только цифры";
  }
  if (!/^\d{6}$/.test(values.postalCode.trim())) {
    errors.postalCode = "Шесть цифр индекса";
  }
  if (!values.agreement) {
    errors.agreement = "Без согласия мы не сможем оформить заказ";
  }

  return errors;
}

export interface OrderRequest {
  values: CheckoutValues;
  items: Array<{ name: string; size: string; color: string; quantity: number; price: number }>;
  total: number;
}

export interface OrderResponse {
  orderNumber: string;
  createdAt: string;
  eta: string;
}

/**
 * Mock-точка интеграции с бэкендом. Замените тело функции на реальный запрос,
 * например `fetch("/api/orders", { method: "POST", body: JSON.stringify(request) })`.
 * Контракт OrderRequest / OrderResponse остаётся тем же.
 */
export async function submitOrder(request: OrderRequest): Promise<OrderResponse> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const orderNumber = `PLT-${Math.floor(100000 + Math.random() * 900000)}`;
  const delivery = DELIVERY_OPTIONS.find((option) => option.id === request.values.delivery);

  return {
    orderNumber,
    createdAt: new Date().toISOString(),
    eta: delivery?.eta ?? "15–17 ноября",
  };
}

export function getDeliveryPrice(deliveryId: CheckoutValues["delivery"]) {
  return DELIVERY_OPTIONS.find((option) => option.id === deliveryId)?.price ?? 0;
}
