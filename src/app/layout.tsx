import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/shared/toaster";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "palitra — женские и мужские пальто",
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Пальто из шерсти, кашемира и альпаки. Спокойный дизайн, честная посадка, бесплатная доставка и возврат 30 дней.",
  keywords: ["пальто", "женские пальто", "мужские пальто", "шерсть", "кашемир", "palitra"],
  authors: [{ name: "palitra" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: SITE_NAME,
    title: "palitra — пальто, в котором хочется остаться",
    description:
      "Тёплая шерсть, честная посадка и спокойные цвета. Бесплатная доставка по России и возврат 30 дней.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "palitra — коллекция пальто из шерсти, кашемира и альпаки",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "palitra — пальто, в котором хочется остаться",
    description: "Шерсть, кашемир и альпака. Бесплатная доставка и возврат 30 дней.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F1E9",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "palitra",
  url: SITE_URL,
  logo: `${SITE_URL}/og.png`,
  description: "Пальто из шерсти, кашемира и альпаки. Сшито в России.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-495-120-45-90",
    contactType: "customer service",
    availableLanguage: ["ru"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/cormorant-500-normal-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/cormorant-500-normal-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-500-normal-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-400-normal-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-400-normal-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bord focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-cream-soft"
        >
          Перейти к содержимому
        </a>
        <StoreProvider>
          <SiteHeader />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
          <Toaster />
        </StoreProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
