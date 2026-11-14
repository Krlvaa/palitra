import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductExperience } from "@/components/product/product-experience";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  GENDER_LABELS,
  MATERIAL_LABELS,
  getGallery,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";
import { SITE_URL } from "@/lib/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Пальто не найдено" };
  }

  const image = `/og/products/${product.slug}.png`;

  return {
    title: `Пальто «${product.name}»`,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: `Пальто «${product.name}» · palitra`,
      description: product.description,
      url: `/product/${product.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: `Пальто «${product.name}»` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Пальто «${product.name}» · palitra`,
      description: product.description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const gallery = getGallery(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Пальто «${product.name}»`,
    image: gallery.map((image) => `${SITE_URL}${image.src}`),
    description: product.description,
    sku: product.id.toUpperCase(),
    brand: { "@type": "Brand", name: "palitra" },
    material: product.composition,
    color: product.colors.map((color) => color.name).join(", "),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "RUB",
      price: product.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "palitra" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Пальто «${product.name}»`,
        item: `${SITE_URL}/product/${product.slug}`,
      },
    ],
  };

  return (
    <div className="container pb-4 pt-6 sm:pt-10">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/catalog" },
          { label: GENDER_LABELS[product.gender], href: `/catalog?gender=${product.gender}` },
          { label: `«${product.name}»` },
        ]}
      />

      <div className="mt-6 sm:mt-8">
        <ProductExperience product={product} />
      </div>

      <section aria-labelledby="related-heading" className="mt-20 sm:mt-28">
        <SectionHeading
          id="related-heading"
          eyebrow="С этим носят"
          title="Похожие пальто"
          description={`Ещё ${GENDER_LABELS[product.gender].toLowerCase()} модели из ${MATERIAL_LABELS[product.material].toLowerCase()} — в том же спокойном настроении.`}
          link={{ href: `/catalog?gender=${product.gender}`, label: "Все модели" }}
        />
        <ul className="mt-8 grid grid-cols-1 gap-x-3 gap-y-9 min-[360px]:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
          {related.map((item) => (
            <li key={item.slug}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-center text-xs text-graphite-muted">
        Нужна помощь с выбором?{" "}
        <Link href="/contacts" className="text-graphite-soft underline underline-offset-4 hover:text-bord">
          Напишите нам
        </Link>{" "}
        или позвоните{" "}
        <a href="tel:+74951204590" className="text-graphite-soft underline underline-offset-4 hover:text-bord">
          +7 (495) 120-45-90
        </a>
        .
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
