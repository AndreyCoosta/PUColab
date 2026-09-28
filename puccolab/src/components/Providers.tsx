"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";

/** Carrega os dados salvos no localStorage depois que a página monta. */
export default function Providers() {
  const setHydrated = useUI((s) => s.setHydrated);
  const menuOpen = useUI((s) => s.menuOpen);
  const modal = useUI((s) => s.modal);

  useEffect(() => {
    Promise.resolve(useStore.persist.rehydrate()).finally(setHydrated);
  }, [setHydrated]);

  // Trava a rolagem da página com o menu mobile ou um modal aberto.
  useEffect(() => {
    document.body.style.overflow = menuOpen || modal ? "hidden" : "";
  }, [menuOpen, modal]);

  return null;
}
