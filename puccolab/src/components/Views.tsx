"use client";

import Link from "next/link";
import { useAllSubjects, useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { groupByDept } from "@/lib/utils";
import ItemsView from "@/components/ItemsView";
import { EmptyState } from "@/components/ItemParts";

export function FeedView() {
  const items = useStore((s) => s.items);
  const searchQuery = useUI((s) => s.searchQuery);
  const searching = searchQuery.trim() !== "";

  return (
    <ItemsView
      title={searching ? `Resultados para "${searchQuery}"` : "O que a turma compartilhou"}
      subtitle={searching ? undefined : "Materiais e fóruns de todas as matérias, em um só lugar."}
      items={items}
    />
  );
}

export function SubjectsDirectory() {
  const items = useStore((s) => s.items);
  const subjects = useAllSubjects();
  const resetNav = useUI((s) => s.resetNav);
  const { depts, order } = groupByDept(subjects);

  return (
    <>
      <div className="mb-1.5">
        <h1 className="text-2xl font-semibold">Matérias</h1>
        <p className="mt-1 text-[.9rem] text-stone">Todas as disciplinas com materiais ou fóruns no PUColab.</p>
      </div>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
        {order.flatMap((d) =>
          depts[d].map((s) => {
            const count = items.filter((i) => i.subjectCode === s.code).length;
            return (
              <Link
                key={s.code}
                href={`/materias/${s.code}`}
                onClick={resetNav}
                className="flex flex-col gap-[3px] rounded-[10px] border border-l-[3px] border-rule border-l-red bg-white p-3.5 text-left hover:shadow-card"
              >
                <span className="eyebrow">{d}</span>
                <span className="mt-0.5 font-mono text-[1.05rem] font-semibold text-blue-deep">{s.code}</span>
                <span className="text-[.86rem]">{s.name}</span>
                <span className="mt-1 text-[.76rem] text-stone-light">
                  {count} {count === 1 ? "publicação" : "publicações"}
                </span>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}

export function SubjectView({ code }: { code: string }) {
  const items = useStore((s) => s.items);
  const subjects = useAllSubjects();
  const subject = subjects.find((s) => s.code === code);
  if (!subject) return <EmptyState title="Matéria não encontrada." />;

  const list = items.filter((i) => i.subjectCode === code);
  return (
    <>
      <div className="mb-1.5 rounded-[10px] border border-t-4 border-rule border-t-red bg-white px-[22px] py-5">
        <span className="eyebrow">{subject.dept}</span>
        <h1 className="mt-1 font-mono text-[1.9rem] font-normal tracking-[-.01em] text-blue-deep">{subject.code}</h1>
        <p className="mt-1">{subject.name}</p>
        <p className="mt-2 text-[.82rem] text-stone">
          {list.filter((i) => i.kind === "material").length} materiais · {list.filter((i) => i.kind === "post").length} fóruns
        </p>
      </div>
      <ItemsView items={list} />
    </>
  );
}
