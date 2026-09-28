"use client";

import { create } from "zustand";
import type { FeedFilter, FeedSort } from "@/lib/utils";

type Modal = "upload" | "forum" | null;

type UIState = {
  hydrated: boolean;
  searchQuery: string;
  feedFilter: FeedFilter;
  feedSort: FeedSort;
  menuOpen: boolean;
  modal: Modal;
  toast: string | null;
  setHydrated: () => void;
  setSearch: (q: string) => void;
  setFilter: (f: FeedFilter) => void;
  setSort: (s: FeedSort) => void;
  setMenuOpen: (open: boolean) => void;
  openModal: (m: Exclude<Modal, null>) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
  /** Mesmo efeito do data-action="nav" do protótipo: limpa busca/filtro e fecha o menu. */
  resetNav: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | undefined;

/** Estado de interface, que não é persistido. */
export const useUI = create<UIState>()((set) => ({
  hydrated: false,
  searchQuery: "",
  feedFilter: "all",
  feedSort: "hot",
  menuOpen: false,
  modal: null,
  toast: null,
  setHydrated: () => set({ hydrated: true }),
  setSearch: (searchQuery) => set({ searchQuery }),
  setFilter: (feedFilter) => set({ feedFilter }),
  setSort: (feedSort) => set({ feedSort }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
  showToast: (toast) => {
    set({ toast });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ toast: null }), 2600);
  },
  resetNav: () => set({ feedFilter: "all", searchQuery: "", menuOpen: false }),
}));
