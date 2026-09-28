"use client";

import Link from "next/link";
import { Bookmark, Download, Share2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { itemHref, timeAgo } from "@/lib/utils";
import type { Item, Material } from "@/lib/types";
import CommentsSection from "@/components/CommentsSection";
import ItemCard from "@/components/ItemCard";
import { CodeTag, EmptyState, TypeTag, VoteColumn } from "@/components/ItemParts";

const SKELETON_WIDTHS = ["92%", "78%", "85%", "60%"];

function DocPreview({ item }: { item: Material }) {
  const pageCount = Math.min(item.pages || 1, 6);
  return (
    <div className="relative mb-[18px] rounded-[10px] border border-rule bg-white py-[26px] pb-[22px] pl-[42px] pr-[26px] before:absolute before:bottom-3.5 before:left-7 before:top-3.5 before:w-[1.5px] before:bg-red before:opacity-55">
      {Array.from({ length: pageCount }, (_, i) => (
        <div key={i} className="mb-[22px] last-of-type:mb-2.5">
          <div className="mb-2.5 font-mono text-[.7rem] uppercase tracking-[.05em] text-stone-light">Página {i + 1}</div>
          {i === 0 ? (
            <p className="whitespace-pre-wrap text-[.94rem] leading-[1.7]">{item.description}</p>
          ) : (
            SKELETON_WIDTHS.map((w) => <div key={w} className="mb-2.5 h-2.5 rounded-xs bg-[#E7E9EE]" style={{ width: w }} />)
          )}
        </div>
      ))}
      <p className="mt-1 text-[.75rem] italic text-stone-light">Pré-visualização ilustrativa deste protótipo.</p>
    </div>
  );
}

export default function ItemDetail({ id, kind }: { id: string; kind: Item["kind"] }) {
  const items = useStore((s) => s.items);
  const toggleSave = useStore((s) => s.toggleSave);
  const addDownload = useStore((s) => s.addDownload);
  const saved = useStore((s) => s.savedIds.includes(id));
  const { showToast, resetNav } = useUI();

  const item = items.find((i) => i.id === id && i.kind === kind);
  if (!item) return <EmptyState title={kind === "material" ? "Material não encontrado." : "Fórum não encontrado."} />;

  const related = items.filter((i) => i.subjectCode === item.subjectCode && i.id !== id).slice(0, 3);

  async function share() {
    const url = window.location.origin + itemHref(item!);
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copiado!");
    } catch {
      showToast("Não foi possível copiar o link.");
    }
  }

  function download(m: Material) {
    const content = `${m.title}\n${m.subjectCode} — ${m.subjectName}\nEnviado por ${m.author}\n\n${m.description}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (m.title.replace(/[^\w\- ]+/g, "").slice(0, 60) || "material") + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addDownload(m.id);
    showToast("Download iniciado (arquivo de exemplo deste protótipo).");
  }

  return (
    <>
      <Link
        href={`/materias/${item.subjectCode}`}
        onClick={resetNav}
        className="mb-2.5 inline-block py-1.5 font-mono text-[.85rem] text-stone hover:text-blue-deep"
      >
        ← {item.subjectCode}
      </Link>

      <div className="mb-[18px] flex gap-4">
        <VoteColumn id={item.id} score={item.score} large />
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <CodeTag code={item.subjectCode} />
            <TypeTag label={item.kind === "material" ? item.docType : item.tag} />
          </div>
          <h1 className="mt-1.5 text-[clamp(1.3rem,3.4vw,1.85rem)] font-semibold">{item.title}</h1>
          <p className="mt-2 text-[.85rem] text-stone">
            {item.kind === "material"
              ? `Enviado por ${item.author} · ${timeAgo(item.date)} · ${item.pages} páginas · ${item.downloads} downloads`
              : `${item.author} · ${timeAgo(item.date)}`}
          </p>
        </div>
      </div>

      {item.kind === "material" ? (
        <DocPreview item={item} />
      ) : (
        <div className="mb-[18px] rounded-[10px] border border-rule bg-white px-[22px] py-5">
          <p className="whitespace-pre-wrap text-[.96rem] leading-[1.7]">{item.body}</p>
        </div>
      )}

      <div className="mb-[26px] flex flex-wrap gap-2">
        {item.kind === "material" && (
          <button type="button" onClick={() => download(item)} className="btn btn-primary">
            <Download size={13} /> Baixar
          </button>
        )}
        <button type="button" onClick={() => toggleSave(item.id)} className={`btn btn-ghost ${saved ? "is-saved" : ""}`}>
          <Bookmark size={15} fill={saved ? "currentColor" : "none"} /> {saved ? "Salvo" : "Salvar"}
        </button>
        <button type="button" onClick={share} className="btn btn-ghost">
          <Share2 size={13} /> Compartilhar
        </button>
      </div>

      <CommentsSection key={item.id} item={item} />

      {related.length > 0 && (
        <div className="mt-[30px]">
          <h2 className="mb-3 text-[1.02rem] font-semibold">
            Outros {item.kind === "material" ? "materiais" : "posts"} de {item.subjectCode}
          </h2>
          <div className="flex flex-col gap-3">
            {related.map((r) => (
              <ItemCard key={r.id} item={r} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
