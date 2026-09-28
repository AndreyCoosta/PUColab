"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_ITEMS, SUBJECTS } from "@/lib/data";
import type { Item, Subject } from "@/lib/types";

type State = {
  items: Item[];
  customSubjects: Subject[];
  savedIds: string[];
  myVotes: Record<string, number>;
  authorName: string;
  vote: (id: string, dir: 1 | -1) => void;
  toggleSave: (id: string) => void;
  addItem: (item: Item) => void;
  addComment: (id: string, c: { author: string; body: string }) => void;
  addDownload: (id: string) => void;
  ensureSubject: (code: string, name: string) => void;
  setAuthor: (name: string) => void;
};

/** Dados persistidos no localStorage (substitui o window.storage do protótipo). */
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      items: SEED_ITEMS,
      customSubjects: [],
      savedIds: [],
      myVotes: {},
      authorName: "",
      vote: (id, dir) =>
        set((s) => {
          const current = s.myVotes[id] ?? 0;
          const next = current === dir ? 0 : dir;
          return {
            myVotes: { ...s.myVotes, [id]: next },
            items: s.items.map((i) =>
              i.id === id ? { ...i, score: i.score + next - current } : i
            ),
          };
        }),
      toggleSave: (id) =>
        set((s) => ({
          savedIds: s.savedIds.includes(id)
            ? s.savedIds.filter((x) => x !== id)
            : [...s.savedIds, id],
        })),
      addItem: (item) => set((s) => ({ items: [item, ...s.items] })),
      addComment: (id, c) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id
              ? { ...i, comments: [...i.comments, { ...c, date: new Date().toISOString() }] }
              : i
          ),
        })),
      addDownload: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id && i.kind === "material" ? { ...i, downloads: i.downloads + 1 } : i
          ),
        })),
      ensureSubject: (code, name) => {
        const all = [...SUBJECTS, ...get().customSubjects];
        if (all.some((s) => s.code === code)) return;
        set((s) => ({ customSubjects: [...s.customSubjects, { code, name, dept: "Outras" }] }));
      },
      setAuthor: (authorName) => set({ authorName }),
    }),
    {
      name: "puccolab",
      // A reidratação é feita manualmente em <Providers /> depois da montagem,
      // para o HTML do servidor (dados seed) bater com o primeiro render do cliente.
      skipHydration: true,
      partialize: (s) => ({
        items: s.items,
        customSubjects: s.customSubjects,
        savedIds: s.savedIds,
        myVotes: s.myVotes,
        authorName: s.authorName,
      }),
    }
  )
);

export function useAllSubjects(): Subject[] {
  const custom = useStore((s) => s.customSubjects);
  return custom.length ? [...SUBJECTS, ...custom] : SUBJECTS;
}
