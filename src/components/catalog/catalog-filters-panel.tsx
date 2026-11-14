"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { countActiveFilters, toggleValue } from "@/lib/catalog";
import {
  ALL_COLORS,
  ALL_SIZES,
  GENDER_LABELS,
  LENGTH_LABELS,
  MATERIAL_LABELS,
  MAX_PRICE,
  MIN_PRICE,
  formatPrice,
} from "@/lib/products";
import type { CatalogFilters, CoatLength, Gender, Material } from "@/lib/types";
import { cn } from "@/lib/utils";

const GENDERS: Gender[] = ["women", "men"];
const LENGTHS: CoatLength[] = ["short", "regular", "long"];
const MATERIALS: Material[] = ["wool", "cashmere", "alpaca", "tweed", "blend"];

interface FilterPanelProps {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-graphite">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export function CatalogFiltersPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const activeCount = countActiveFilters(filters);
  const uid = React.useId();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl">Фильтры</p>
        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="text-[10px] uppercase tracking-[0.14em] text-graphite-muted underline-offset-4 transition-colors hover:text-bord hover:underline disabled:opacity-40 disabled:hover:no-underline"
        >
          Сбросить{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
      </div>

      <Separator />

      <FilterSection title="Пол">
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((gender) => {
            const selected = filters.gender.includes(gender);
            return (
              <button
                key={gender}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ gender: toggleValue(filters.gender, gender) })}
                className={cn(
                  "h-9 rounded-full border px-4 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord",
                  selected
                    ? "border-bord bg-bord text-cream-soft"
                    : "border-graphite/20 text-graphite-soft hover:border-graphite/50",
                )}
              >
                {GENDER_LABELS[gender]}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Размер">
        <div className="flex flex-wrap gap-1.5">
          {ALL_SIZES.map((size) => {
            const selected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ sizes: toggleValue(filters.sizes, size) })}
                className={cn(
                  "h-9 min-w-9 rounded-[4px] border px-2 text-xs tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord",
                  selected
                    ? "border-graphite bg-graphite text-cream-soft"
                    : "border-graphite/20 text-graphite-soft hover:border-graphite/50",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Цвет">
        <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
          {ALL_COLORS.map((color) => {
            const selected = filters.colors.includes(color.slug);
            return (
              <li key={color.slug}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChange({ colors: toggleValue(filters.colors, color.slug) })}
                  className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bord"
                >
                  <span
                    className={cn(
                      "relative grid size-6 place-items-center rounded-full ring-1 ring-inset ring-graphite/20 transition-shadow",
                      selected && "ring-2 ring-bord ring-offset-2 ring-offset-cream-soft",
                    )}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selected && (
                      <span className="size-1.5 rounded-full bg-white/90 mix-blend-difference" aria-hidden="true" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-xs transition-colors",
                      selected ? "text-bord" : "text-graphite-soft group-hover:text-graphite",
                    )}
                  >
                    {color.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      <FilterSection title="Длина">
        <div className="space-y-2.5">
          {LENGTHS.map((length) => {
            const selected = filters.lengths.includes(length);
            const id = `${uid}-length-${length}`;
            return (
              <label key={length} htmlFor={id} className="flex cursor-pointer items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={selected}
                  onCheckedChange={() => onChange({ lengths: toggleValue(filters.lengths, length) })}
                />
                <span className="text-sm text-graphite-soft">{LENGTH_LABELS[length]}</span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Материал">
        <div className="space-y-2.5">
          {MATERIALS.map((material) => {
            const selected = filters.materials.includes(material);
            const id = `${uid}-material-${material}`;
            return (
              <label key={material} htmlFor={id} className="flex cursor-pointer items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={selected}
                  onCheckedChange={() => onChange({ materials: toggleValue(filters.materials, material) })}
                />
                <span className="text-sm text-graphite-soft">{MATERIAL_LABELS[material]}</span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Цена">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-graphite-muted">до</span>
          <output className="font-serif text-lg tabular-nums">{formatPrice(filters.maxPrice)}</output>
        </div>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={filters.maxPrice}
          onChange={(event) => onChange({ maxPrice: Number(event.target.value) })}
          aria-label="Максимальная цена"
          className="range-input mt-3"
        />
        <div className="mt-1.5 flex justify-between text-[10px] text-graphite-muted">
          <span>{formatPrice(MIN_PRICE)}</span>
          <span>{formatPrice(MAX_PRICE)}</span>
        </div>
      </FilterSection>

      <div className="border-t border-line pt-5">
        <label htmlFor={`${uid}-sale-only`} className="flex cursor-pointer items-center gap-2.5">
          <Checkbox
            id={`${uid}-sale-only`}
            checked={filters.saleOnly}
            onCheckedChange={(checked) => onChange({ saleOnly: checked === true })}
          />
          <span className="text-sm text-graphite-soft">Только со скидкой</span>
        </label>
      </div>
    </div>
  );
}
