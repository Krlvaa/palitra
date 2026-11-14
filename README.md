# palitra — интернет-магазин пальто

Премиальный минималистичный магазин женских и мужских пальто на Next.js 15 (App Router).
Двенадцать моделей, полный путь от каталога до оформления заказа, корзина и избранное в
`localStorage`, демо-оплата и демо-доставка с понятными точками интеграции.

Сайт полностью на русском языке, адаптирован от 320 px, соответствует WCAG AA.

**Живой сайт: [palitra-shop.vercel.app](https://palitra-shop.vercel.app)** — бесплатный хостинг
Vercel Hobby, бесплатный домен и HTTPS.

**Исходный код: [github.com/Krlvaa/palitra](https://github.com/Krlvaa/palitra)**

---

## Быстрый старт

Требования: Node.js 20+ и npm.

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Продакшен-сборка:

```bash
npm run build
npm run start
```

### Скрипты

| Команда            | Что делает                                      |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Дев-сервер с hot reload                          |
| `npm run build`    | Продакшен-сборка (все страницы статические)      |
| `npm run start`    | Запуск собранного приложения                     |
| `npm run lint`     | ESLint (`next lint`)                             |
| `npm run typecheck`| Проверка типов `tsc --noEmit`                    |

---

## Стек

- **Next.js 15.5** (App Router, серверные компоненты, статическая генерация)
- **React 19** + **TypeScript 5.9**
- **Tailwind CSS 3.4** + собственные примитивы в стиле shadcn/ui на Radix UI
- **sonner** для тостов, **lucide-react** для иконок
- Шрифты **Cormorant Garamond** (заголовки) и **Inter** (текст) — self-hosted, `woff2`
- Изображения — `next/image`, SVG-плейсхолдеры и PNG OG-картинки

---

## Структура проекта

```
palitra/
├─ public/
│  ├─ fonts/                  # self-hosted woff2 (Cormorant, Inter)
│  ├─ products/               # 111 SVG-плейсхолдеров: front / detail / back × цвета
│  ├─ og/                     # OG-изображения товаров (PNG)
│  └─ og.png                  # OG-картинка сайта
├─ scripts/
│  ├─ generate-placeholders.mjs  # генерация SVG-заглушек товаров
│  ├─ generate-og.mjs            # генерация OG-картинок (sharp)
│  └─ fonts.mjs                  # загрузка и подготовка woff2
├─ src/
│  ├─ app/                    # маршруты App Router
│  │  ├─ page.tsx             # главная
│  │  ├─ catalog/             # каталог + loading skeleton
│  │  ├─ product/[slug]/      # карточка товара
│  │  ├─ cart/                # корзина
│  │  ├─ checkout/            # оформление + success
│  │  ├─ favorites/           # избранное
│  │  ├─ contacts/            # контакты и форма
│  │  ├─ delivery/ returns/ care/ size-guide/ privacy/
│  │  ├─ layout.tsx           # шрифты, метаданные, провайдеры, шапка/футер
│  │  ├─ sitemap.ts robots.ts manifest.ts
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ home/                # hero, категории, бестселлеры, сервис, отзывы, рассылка
│  │  ├─ catalog/             # фильтры, поиск, сортировка, скелетоны
│  │  ├─ product/             # галерея, опции, размеры, карточка, избранное
│  │  ├─ cart/ checkout/      # корзина, drawer, оформление, success
│  │  ├─ layout/              # шапка, футер, мобильное меню, поиск
│  │  ├─ shared/              # breadcrumbs, info-page, section-heading, toaster
│  │  └─ ui/                  # button, input, dialog, sheet, select, accordion…
│  ├─ data/products.json      # 12 товаров — единственный источник данных
│  └─ lib/
│     ├─ products.ts          # выборки, цены, галереи, лейблы
│     ├─ catalog.ts           # фильтрация, поиск, сортировка
│     ├─ store.tsx            # корзина, избранное, промокоды (Context + localStorage)
│     ├─ checkout.ts          # валидация и mock-отправка заказа
│     ├─ site.ts              # контакты, доставка, оплата, промокоды
│     ├─ sizing.ts            # таблица размеров
│     └─ types.ts             # доменные типы
└─ next.config.mjs            # next/image для SVG, CSP, metadata в <head>
```

---

## Деплой на Vercel (бесплатно)

Проект уже опубликован: **https://palitra-shop.vercel.app**.

Повторить деплой своего экземпляра:

```bash
npm i -g vercel
vercel login
vercel link --project palitra-shop
vercel deploy --prod
```

Vercel Hobby бесплатен для личных проектов, даёт HTTPS, CDN и домен
`<project>.vercel.app`. Если имя занято, выберите другое при `vercel link`.
Превью-деплои закрыты Vercel Authentication, production-домен публичный.

Канонический адрес берётся из `NEXT_PUBLIC_SITE_URL`, а на Vercel — автоматически из
`VERCEL_PROJECT_PRODUCTION_URL`, поэтому sitemap и canonical сразу указывают на
публичный домен.

---

## Данные товаров

Все товары лежат в `src/data/products.json` (массив `Product`). Поля:

```jsonc
{
  "id": "p-01",
  "slug": "stockholm",               // используется в URL /product/stockholm
  "name": "Стокгольм",
  "gender": "women",                 // women | men
  "price": 22900,
  "oldPrice": 27900,                 // опционально, включает бейдж скидки
  "isNew": false,
  "isBestseller": true,
  "isSale": true,
  "sizes": ["40", "42", "44", "46", "48"],
  "colors": [{ "slug": "graphite", "name": "Графит", "hex": "#3C3B39" }],
  "length": "regular",               // short | regular | long
  "material": "wool",                // wool | cashmere | tweed | alpaca | blend
  "composition": "70% шерсть, 20% полиамид, 10% кашемир",
  "care": ["…"],
  "description": "…",
  "rating": 4.9,
  "reviewsCount": 128
}
```

Изображения собираются по шаблону `/products/{slug}-{colorSlug}.svg`,
`-detail.svg`, `-back.svg`. Чтобы заменить заглушки на реальные фото, положите файлы с
теми же именами в `public/products/` (или поменяйте `getGallery()` в `src/lib/products.ts`).
Пока изображения векторные, `next/image` работает в режиме `unoptimized` — так быстрее.
После подключения фотографий уберите `unoptimized` в `next.config.mjs`, чтобы включить
ресайз и форматы AVIF/WebP.

### Генерация ассетов

Заглушки и OG-картинки уже в репозитории. Перегенерировать:

```bash
npm i -D sharp
node scripts/generate-placeholders.mjs
node scripts/generate-og.mjs
```

---

## Корзина, избранное, промокоды

Состояние живёт в React Context (`src/lib/store.tsx`) и сохраняется в браузере:

- `palitra.cart.v1` — позиции корзины
- `palitra.favorites.v1` — slug'и избранного
- `palitra.promo.v1` — применённый промокод

Демо-промокоды (`src/lib/site.ts`):

- `PALITRA10` — −10 % на весь заказ
- `WELCOME` — −1 500 ₽ на первый заказ

Чтобы подключить серверную корзину, замените чтение/запись `localStorage` в `store.tsx`
на вызовы API — публичный интерфейс контекста (`addLine`, `setQuantity`, `applyPromo`…)
можно сохранить без изменений.

---

## Оформление заказа и точки интеграции

Оплата и доставка — демонстрационные. Никакие данные никуда не отправляются.

- **Заказ**: `submitOrder()` в `src/lib/checkout.ts` — единственная mock-точка. Замените
  тело функции на `fetch("/api/orders", …)`; контракты `OrderRequest` / `OrderResponse`
  уже описаны.
- **Валидация**: `validateCheckout()` там же — имя, телефон, email, адрес, индекс,
  согласие. Ошибки показываются у полей и озвучиваются скринридером.
- **Доставка**: `DELIVERY_OPTIONS` в `src/lib/site.ts` (курьер, самовывоз, экспресс).
- **Оплата**: `PAYMENT_OPTIONS` там же (карта, СБП, при получении). Для реального
  эквайринга создайте платёжную сессию в `submitOrder` и редирект на страницу банка.
- **Промокоды**: `PROMO_CODES` в `src/lib/site.ts`.
- **Рассылка и форма контактов**: `src/components/home/newsletter-form.tsx` и
  `src/components/contacts/contact-form.tsx` — локальная имитация отправки.

После успешного заказа корзина очищается, а страница `/checkout/success` показывает
номер заказа, состав и срок доставки.

---

## Дизайн-система

| Токен            | Значение  | Где использовать                    |
| ---------------- | --------- | ----------------------------------- |
| `cream`          | `#F6F1E9` | фон страниц                         |
| `cream-soft`     | `#FBF8F3` | карточки, стеклянные панели         |
| `cream-deep`     | `#EDE4D7` | подложки изображений                |
| `graphite`       | `#1C1C1C` | основной текст                      |
| `graphite-soft`  | `#4A4643` | вторичный текст                     |
| `graphite-muted` | `#6B625C` | подписи, служебный текст            |
| `bord`           | `#6E2A2F` | акцент, кнопки, ссылки              |

- Заголовки — Cormorant Garamond, текст — Inter; размеры заголовков через `clamp()`.
- Матовое стекло: `bg-cream-soft/70`, `backdrop-blur`, `shadow-glass`.
- Скругления сдержанные (`rounded-sm` / `rounded-lg`), анимации короткие (`ease-soft`).
- Утилиты темы — `src/app/globals.css`, `tailwind.config.ts`.

---

## SEO и доступность

- Метаданные каждой страницы, canonical, Open Graph и Twitter Card.
- `sitemap.ts`, `robots.ts`, `manifest.ts`, JSON-LD (`Organization`, `Product`,
  `BreadcrumbList`).
- Семантические заголовки без пропусков уровней, `aria-*`, видимый focus-ring,
  skip-link, поддержка клавиатуры в диалогах, фильтрах и галерее.
- Контраст текста проверен по WCAG AA (включая декоративные подписи).
- Цели Lighthouse (desktop, прод-сборка): Accessibility, Best Practices, SEO — 100;
  Performance — 90+.

Проверить самостоятельно:

```bash
npm run build
npm run start
npx lighthouse http://localhost:3000 --view
```

---

## Демо-сценарий

1. Главная → блок «Бестселлеры» или «Каталог».
2. Фильтры: пол, размер, цвет, длина, материал, цена; поиск и сортировка.
3. Карточка товара: цвет, размер, таблица размеров, галерея с зумом.
4. Добавить в корзину и в избранное (переживёт перезагрузку страницы).
5. Корзина → промокод `PALITRA10` → оформление → заполнить поля → подтвердить.
6. Страница успеха с номером заказа; корзина очищена.

---

## Ограничения демо

- Изображения — векторные заглушки, а не фотографии.
- Оплата, доставка, рассылка и форма контактов имитируются на клиенте.
- Заказы не сохраняются на сервере; авторизации и личного кабинета нет.
- Цены, наличие и контакты — вымышленные.

---

## Переменные окружения

| Переменная             | По умолчанию              | Назначение                    |
| ---------------------- | ------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://palitra.example` | canonical, sitemap, OG-URL    |

На Vercel переменная не обязательна: адрес автоматически берётся из системной
`VERCEL_PROJECT_PRODUCTION_URL`.

Создайте `.env.local` при деплое:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.ru
```

---

© 2026 palitra. Демонстрационный проект.
