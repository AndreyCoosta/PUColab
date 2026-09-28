"use client";

import Link from "next/link";
import { Bookmark, Download, MessageSquare } from "lucide-react";
import { useStore } from "@/store/useStore";
import { itemHref, timeAgo } from "@/lib/utils";
import type { Item } from "@/lib/types";
import { CodeTag, TypeTag, VoteColumn } from "@/components/ItemParts";

export default function ItemCard({ item }: { item: Item }) {
  const toggleSave = useStore((s) => s.toggleSave);
  const saved = useStore((s) => s.savedIds.includes(item.id));
  const isMaterial = item.kind === "material";
  const text = isMaterial ? item.description : item.body;
  const snippet = text.length > 140 ? text.slice(0, 140) + "…" : text;

  return (
    <div className="flex animate-fade-up gap-2.5 rounded-[10px] border border-rule bg-white p-3 hover:shadow-card min-[761px]:gap-3.5 min-[761px]:px-4 min-[761px]:py-3.5">
      <VoteColumn id={item.id} score={item.score} />

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <CodeTag code={item.subjectCode} />
          <TypeTag label={isMaterial ? item.docType : item.tag} />
        </div>

        <Link href={itemHref(item)} className="group mb-2 mt-0.5 block">
          <h3 className="text-[1.02rem] font-semibold group-hover:text-blue-deep group-hover:underline">{item.title}</h3>
          <p className="mt-[5px] text-[.87rem] text-stone">{snippet}</p>
        </Link>

        <div className="mt-1 flex flex-wrap items-center gap-[7px] text-[.78rem] text-stone-light">
          <span>{item.author}</span>
          <span className="opacity-70">·</span>
          <span>{timeAgo(item.date)}</span>
          <span className="opacity-70">·</span>
          <span className="inline-flex items-center gap-[3px]">
            <MessageSquare size={13} className="opacity-80" />
            {item.comments.length}
          </span>
          {isMaterial && (
            <>
              <span className="opacity-70">·</span>
              <span className="inline-flex items-center gap-[3px]">
                <Download size={13} className="opacity-80" />
                {item.downloads}
              </span>
            </>
          )}
          <button
            type="button"
            onClick={() => toggleSave(item.id)}
            aria-label={saved ? "Remover dos salvos" : "Salvar"}
            className={`ml-auto rounded-[5px] p-[3px] hover:bg-paper ${saved ? "text-gold-deep" : "text-stone-light hover:text-stone"}`}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
