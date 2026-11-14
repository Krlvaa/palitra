import { SIZE_TABLE } from "@/lib/sizing";
import type { Gender } from "@/lib/types";

export function SizeTable({ gender }: { gender: Gender }) {
  const rows = SIZE_TABLE[gender];

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Таблица размеров: {gender === "women" ? "женские" : "мужские"} пальто palitra
        </caption>
        <thead>
          <tr className="border-b border-graphite/20 text-[10px] uppercase tracking-[0.14em] text-graphite-muted">
            <th scope="col" className="py-2.5 pr-3 font-medium">Размер</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Грудь, см</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Талия, см</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Бёдра, см</th>
            <th scope="col" className="py-2.5 font-medium">Рукав, см</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.size} className="border-b border-line last:border-0">
              <th scope="row" className="py-2.5 pr-3 font-serif text-base font-medium">{row.size}</th>
              <td className="py-2.5 pr-3 tabular-nums text-graphite-soft">{row.chest}</td>
              <td className="py-2.5 pr-3 tabular-nums text-graphite-soft">{row.waist}</td>
              <td className="py-2.5 pr-3 tabular-nums text-graphite-soft">{row.hips}</td>
              <td className="py-2.5 tabular-nums text-graphite-soft">{row.sleeve}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
