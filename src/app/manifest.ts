import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "palitra — пальто из шерсти и кашемира",
    short_name: "palitra",
    description: "Женские и мужские пальто. Бесплатная доставка и возврат 30 дней.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E9",
    theme_color: "#6E2A2F",
    lang: "ru",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
