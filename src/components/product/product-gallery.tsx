"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  productName,
  priority = true,
}: {
  images: GalleryImage[];
  productName: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState<{ active: boolean; x: number; y: number }>({
    active: false,
    x: 50,
    y: 50,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % images.length);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, images.length]);

  const activeImage = images[index] ?? images[0];

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
    setZoom({ active: true, x, y });
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream-deep"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoom({ active: false, x: 50, y: 50 })}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Открыть фото ${index + 1} из ${images.length} крупнее`}
          className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bord"
        >
          <span className="sr-only">Открыть галерею</span>
        </button>

        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            transform: zoom.active ? "scale(1.7)" : "scale(1)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
          }}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute bottom-4 right-4 z-20 hidden items-center gap-1.5 rounded-full bg-cream-soft/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-graphite-soft backdrop-blur-md md:flex">
          <ZoomIn className="size-3.5" aria-hidden="true" />
          Наведите для увеличения
        </span>

        <span className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full bg-graphite/55 px-2.5 py-1 text-[10px] tabular-nums text-cream-soft backdrop-blur-md md:hidden">
          {index + 1} / {images.length}
        </span>
      </div>

      <ul className="mt-3 grid grid-cols-3 gap-3" aria-label="Фотографии товара">
        {images.map((image, imageIndex) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`Показать фото ${imageIndex + 1}: ${image.alt}`}
              aria-pressed={imageIndex === index}
              className={cn(
                "relative block aspect-[3/4] w-full overflow-hidden rounded-sm bg-cream-deep transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord focus-visible:ring-offset-2",
                imageIndex === index ? "ring-1 ring-bord ring-offset-2" : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                priority={priority && imageIndex === 0}
                sizes="(max-width: 1024px) 33vw, 18vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl gap-3 bg-cream-soft/95 p-3 sm:p-4">
          <DialogTitle className="sr-only">Галерея: пальто «{productName}»</DialogTitle>
          <DialogDescription className="sr-only">
            Фото {index + 1} из {images.length}. Используйте стрелки для переключения и Esc, чтобы
            закрыть.
          </DialogDescription>
          <div className="relative mx-auto aspect-[3/4] max-h-[76vh] w-full max-w-2xl overflow-hidden rounded-sm bg-cream-deep">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-1 pb-1">
            <button
              type="button"
              onClick={() => setIndex((current) => (current - 1 + images.length) % images.length)}
              aria-label="Предыдущее фото"
              className="grid size-10 place-items-center rounded-full border border-graphite/20 transition-colors hover:border-bord hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <p className="text-xs text-graphite-muted">
              {index + 1} / {images.length} · {activeImage.alt}
            </p>
            <button
              type="button"
              onClick={() => setIndex((current) => (current + 1) % images.length)}
              aria-label="Следующее фото"
              className="grid size-10 place-items-center rounded-full border border-graphite/20 transition-colors hover:border-bord hover:text-bord focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
