"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { tagColor } from "@/lib/utils";

export function VoteColumn({ id, score, large = false }: { id: string; score: number; large?: boolean }) {
  const vote = useStore((s) => s.vote);
  const my = useStore((s) => s.myVotes[id] ?? 0);
  const btn = "flex items-center justify-center rounded-[5px] p-[3px]";
  const idle = "text-stone-light hover:bg-paper hover:text-stone";

  return (
    <div className={`flex shrink-0 flex-col items-center gap-px ${large ? "w-9 pt-1" : "w-[30px] pt-0.5"}`}>
      <button
        type="button"
        onClick={() => vote(id, 1)}
        aria-label="Votar a favor"
        className={`${btn} ${my === 1 ? "bg-gold-mist text-gold-deep" : idle}`}
      >
        <ChevronUp size={15} strokeWidth={2.6} />
      </button>
      <span className="font-mono text-[.82rem] font-semibold">{score}</span>
      <button
        type="button"
        onClick={() => vote(id, -1)}
        aria-label="Votar contra"
        className={`${btn} ${my === -1 ? "bg-red-mist text-red-deep" : idle}`}
      >
        <ChevronDown size={15} strokeWidth={2.6} />
      </button>
    </div>
  );
}

export function CodeTag({ code }: { code: string }) {
  const resetNav = useUI((s) => s.resetNav);
  return (
    <Link href={`/materias/${code}`} onClick={resetNav} className="code-tag hover:bg-blue hover:text-white">
      {code}
    </Link>
  );
}

export function TypeTag({ label }: { label: string }) {
  return <span className={`rounded px-2 py-[3px] text-[.72rem] font-medium ${tagColor(label)}`}>{label}</span>;
}

export function EmptyState({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="rounded-[10px] border border-dashed border-rule bg-white px-5 py-15 text-center text-stone">
      <p className="mb-1.5">{title}</p>
      {sub && <p className="text-[.85rem] text-stone-light">{sub}</p>}
    </div>
  );
}
