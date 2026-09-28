"use client";

import Link from "next/link";
import { Menu, Plus, Search } from "lucide-react";
import { useUI } from "@/store/useUI";

export default function Topbar() {
  const { searchQuery, setSearch, menuOpen, setMenuOpen, openModal, resetNav } = useUI();

  return (
    <header className="sticky top-0 z-80 border-b border-rule bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-4 px-5 py-3">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu de matérias"
          className="inline-flex p-1 text-ink min-[761px]:hidden"
        >
          <Menu size={20} />
        </button>

        <Link href="/" onClick={resetNav} aria-label="Ir para o início" className="flex items-center gap-[9px] py-0.5">
          <span className="flex size-[30px] shrink-0 items-center justify-center rounded-[7px] bg-blue-deep font-mono text-[.8rem] font-semibold text-white">
            PL
          </span>
          <span className="font-display text-[1.2rem] font-bold tracking-[-.01em] text-blue-deep">PUColab</span>
        </Link>

        <div className="order-5 flex min-w-40 flex-[1_1_100%] items-center gap-2 rounded-lg border border-rule bg-paper px-3 py-2 sm:order-2 sm:flex-[1_1_260px]">
          <Search size={16} className="shrink-0 text-stone-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por matéria, código ou título..."
            className="w-full bg-transparent text-[.92rem] outline-none"
          />
        </div>

        <div className="order-3 ml-auto flex gap-2">
          <button type="button" onClick={() => openModal("upload")} className="btn btn-primary">
            <Plus size={14} strokeWidth={2.4} />
            <span className="hidden sm:inline">Enviar material</span>
          </button>
          <button type="button" onClick={() => openModal("forum")} className="btn btn-secondary">
            <Plus size={14} strokeWidth={2.4} />
            <span className="hidden sm:inline">Criar fórum</span>
          </button>
        </div>
      </div>
    </header>
  );
}
