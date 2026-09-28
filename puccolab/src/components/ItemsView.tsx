"use client";

import { useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { filterAndSort, type FeedFilter, type FeedSort } from "@/lib/utils";
import type { Item } from "@/lib/types";
import ItemCard from "@/components/ItemCard";
import { EmptyState } from "@/components/ItemParts";

const TABS: [FeedFilter, string][] = [
  ["all", "Tudo"],
  ["materials", "Materiais"],
  ["posts", "Fóruns"],
  ["saved", "Salvos"],
];
const SORTS: [FeedSort, string][] = [
  ["hot", "Quentes"],
  ["new", "Recentes"],
  ["top", "Populares"],
];

/** Lista com abas (Tudo/Materiais/Fóruns/Salvos) e ordenação — o renderItemsView do protótipo. */
export default function ItemsView({ title, subtitle, items }: { title?: string; subtitle?: string; items: Item[] }) {
  const savedIds = useStore((s) => s.savedIds);
  const { searchQuery, feedFilter, feedSort, setFilter, setSort } = useUI();
  const list = filterAndSort(items, { query: searchQuery, filter: feedFilter, sort: feedSort, savedIds });

  let empty = { title: "Nada por aqui ainda.", sub: "Seja a primeira pessoa a enviar um material ou abrir um fórum nessa matéria." };
  if (searchQuery.trim()) {
    empty = { title: `Nada encontrado para "${searchQuery}".`, sub: "Tente outro termo ou outro código de matéria — ou seja a primeira pessoa a postar sobre isso." };
  } else if (feedFilter === "saved") {
    empty = { title: "Você ainda não salvou nada.", sub: "Toque no marcador de um material ou fórum pra guardar aqui." };
  }

  return (
    <>
      <div className="mb-1.5">
        {title && <h1 className="text-2xl font-semibold">{title}</h1>}
        {subtitle && <p className="mt-1 text-[.9rem] text-stone">{subtitle}</p>}
        <div className="mb-[18px] mt-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap gap-1 rounded-[9px] border border-rule bg-white p-[3px]" role="tablist">
            {TABS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={feedFilter === value}
                onClick={() => setFilter(value)}
                className={`rounded-[7px] px-[13px] py-[7px] text-[.85rem] font-medium ${feedFilter === value ? "bg-blue-mist text-blue-deep" : "text-stone"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {SORTS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSort(value)}
                className={`rounded-[7px] border bg-white px-3 py-[7px] text-[.82rem] ${feedSort === value ? "border-blue font-semibold text-blue-deep" : "border-rule text-stone"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {list.length ? list.map((item) => <ItemCard key={item.id} item={item} />) : <EmptyState {...empty} />}
      </div>
    </>
  );
}
