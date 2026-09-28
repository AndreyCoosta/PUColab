"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Search, Upload } from "lucide-react";
import { useAllSubjects, useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";

const widget = "rounded-[10px] border border-rule bg-white p-4";
const widgetTitle = "mb-2.5 font-display text-[.95rem] font-semibold";

function TopSubjectsWidget() {
  const items = useStore((s) => s.items);
  const resetNav = useUI((s) => s.resetNav);
  const counts: Record<string, number> = {};
  items.forEach((i) => (counts[i.subjectCode] = (counts[i.subjectCode] ?? 0) + 1));
  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  if (!top.length) return null;

  return (
    <div className={widget}>
      <h3 className={widgetTitle}>Matérias em alta</h3>
      <ul className="flex flex-col gap-0.5">
        {top.map(([code, count]) => (
          <li key={code}>
            <Link
              href={`/materias/${code}`}
              onClick={resetNav}
              className="flex w-full items-center justify-between rounded-md px-1.5 py-[7px] hover:bg-paper"
            >
              <span className="code-tag">{code}</span>
              <span className="font-mono text-[.78rem] text-stone">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorksWidget() {
  const row = "mb-2.5 flex items-start gap-2 text-[.84rem] text-stone last:mb-0 [&_svg]:mt-0.5 [&_svg]:shrink-0 [&_svg]:text-blue";
  return (
    <div className={widget}>
      <h3 className={widgetTitle}>Como funciona</h3>
      <p className={row}><Upload size={14} />Envie resumos, provas antigas e listas que você já fez.</p>
      <p className={row}><MessageSquare size={14} />Abra um fórum quando tiver dúvida sobre a matéria.</p>
      <p className={row}><Search size={14} />Encontre tudo pelo código da disciplina.</p>
    </div>
  );
}

export default function SidebarRight() {
  const pathname = usePathname();
  const searchQuery = useUI((s) => s.searchQuery);
  const subjects = useAllSubjects();

  const onSubject = pathname.startsWith("/materias/") && !searchQuery.trim();
  const code = onSubject ? decodeURIComponent(pathname.split("/")[2] ?? "") : null;
  const subject = code ? subjects.find((s) => s.code === code) : undefined;

  return (
    <aside className="sticky top-20 hidden flex-col gap-4 min-[1081px]:flex">
      {onSubject ? (
        <>
          {subject && (
            <div className={widget}>
              <h3 className={widgetTitle}>Sobre</h3>
              <p className="font-mono text-[1.1rem] font-semibold text-blue-deep">{subject.code}</p>
              <p>{subject.name}</p>
              <p className="mt-1 text-[.82rem] text-stone">{subject.dept}</p>
            </div>
          )}
          <TopSubjectsWidget />
        </>
      ) : (
        <>
          <TopSubjectsWidget />
          <HowItWorksWidget />
        </>
      )}
    </aside>
  );
}
