"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUI } from "@/store/useUI";
import { FeedView } from "@/components/Views";

/**
 * Envolve o conteúdo das páginas:
 * - só renderiza depois de carregar o localStorage (evita erro de hidratação);
 * - com uma busca ativa, mostra os resultados no lugar da página atual (como no protótipo).
 */
export default function MainContent({ children }: { children: React.ReactNode }) {
  const hydrated = useUI((s) => s.hydrated);
  const searching = useUI((s) => s.searchQuery.trim() !== "");
  const toast = useUI((s) => s.toast);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <main className="min-w-0">
      {!hydrated ? (
        <p className="py-10 text-center text-[.9rem] text-stone-light">Carregando…</p>
      ) : searching ? (
        <FeedView />
      ) : (
        children
      )}
      {toast && (
        <div role="status" className="fixed bottom-[26px] left-1/2 z-400 -translate-x-1/2 rounded-[9px] bg-ink px-5 py-[11px] text-[.87rem] text-white shadow-card">
          {toast}
        </div>
      )}
    </main>
  );
}
