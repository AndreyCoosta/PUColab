"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, BookOpen, Home } from "lucide-react";
import { useAllSubjects } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { groupByDept } from "@/lib/utils";

const sideLink =
  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-left text-[.9rem] font-medium hover:bg-white [&_svg]:shrink-0";
const sideActive = "bg-blue-mist text-blue-deep hover:bg-blue-mist [&_svg]:text-blue-deep";

export default function SidebarLeft() {
  const pathname = usePathname();
  const router = useRouter();
  const subjects = useAllSubjects();
  const { feedFilter, setFilter, menuOpen, setMenuOpen, resetNav } = useUI();
  const { depts, order } = groupByDept(subjects);

  const activeCode = pathname.startsWith("/materias/")
    ? decodeURIComponent(pathname.split("/")[2] ?? "")
    : null;

  function showSaved() {
    setFilter("saved");
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <>
      <aside
        className={`flex flex-col gap-[18px] max-[760px]:fixed max-[760px]:top-0 max-[760px]:z-210 max-[760px]:h-screen max-[760px]:w-[270px] max-[760px]:overflow-y-auto max-[760px]:border-r max-[760px]:border-rule max-[760px]:bg-white max-[760px]:p-[18px] max-[760px]:shadow-[2px_0_24px_rgba(0,0,0,.18)] max-[760px]:transition-[left] max-[760px]:duration-200 min-[761px]:sticky min-[761px]:top-20 ${
          menuOpen ? "max-[760px]:left-0" : "max-[760px]:-left-[300px]"
        }`}
      >
        <nav className="flex flex-col gap-0.5">
          <Link href="/" onClick={resetNav} className={`${sideLink} ${pathname === "/" && feedFilter !== "saved" ? sideActive : "[&_svg]:text-stone"}`}>
            <Home size={15} /> Início
          </Link>
          <Link href="/materias" onClick={resetNav} className={`${sideLink} ${pathname === "/materias" ? sideActive : "[&_svg]:text-stone"}`}>
            <BookOpen size={15} /> Todas as matérias
          </Link>
          <button type="button" onClick={showSaved} className={`${sideLink} ${feedFilter === "saved" ? sideActive : "[&_svg]:text-stone"}`}>
            <Bookmark size={15} /> Salvos
          </button>
        </nav>

        <div>
          {order.map((d) => (
            <div key={d} className="mb-1.5">
              <div className="px-2.5 pb-1 pt-2.5 text-[.72rem] font-semibold uppercase tracking-[.06em] text-stone-light">{d}</div>
              {depts[d].map((s) => {
                const active = activeCode === s.code;
                return (
                  <Link
                    key={s.code}
                    href={`/materias/${s.code}`}
                    onClick={resetNav}
                    title={s.name}
                    className={`block w-full rounded-lg px-2.5 py-1.5 text-left ${active ? "bg-blue-mist" : "hover:bg-white"}`}
                  >
                    <span className={`font-mono text-[.8rem] ${active ? "font-semibold text-blue-deep" : "text-stone"}`}>{s.code}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="rounded-[10px] border border-rule bg-white px-3.5 py-3 text-[.78rem] text-stone">
          <strong className="text-ink">PUColab</strong> é um mural de materiais e fóruns entre estudantes. O que você envia fica salvo neste navegador.
        </div>
      </aside>

      {menuOpen && (
        <div
          className="fixed inset-0 z-190 bg-[rgba(20,23,28,.4)] min-[761px]:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
