import { DEPT_ORDER } from "@/lib/data";
import type { Item, Subject } from "@/lib/types";

export type FeedFilter = "all" | "materials" | "posts" | "saved";
export type FeedSort = "hot" | "new" | "top";

export function slug(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function timeAgo(dateStr: string) {
  const diffMs = Math.max(0, Date.now() - new Date(dateStr).getTime());
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} ${min === 1 ? "minuto" : "minutos"}`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `há ${hr} ${hr === 1 ? "hora" : "horas"}`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `há ${day} ${day === 1 ? "dia" : "dias"}`;
  const mon = Math.floor(day / 30);
  return `há ${mon} ${mon === 1 ? "mês" : "meses"}`;
}

export function groupByDept(list: Subject[]) {
  const depts: Record<string, Subject[]> = {};
  list.forEach((s) => {
    (depts[s.dept] ??= []).push(s);
  });
  const order = [
    ...DEPT_ORDER.filter((d) => depts[d]),
    ...Object.keys(depts).filter((d) => !DEPT_ORDER.includes(d)),
  ];
  return { depts, order };
}

export function itemHref(item: Item) {
  return `/${item.kind}/${item.id}`;
}

export function filterAndSort(
  list: Item[],
  opts: { query: string; filter: FeedFilter; sort: FeedSort; savedIds: string[] }
) {
  let out = list;
  const q = opts.query.trim().toLowerCase();
  if (q) {
    out = out.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subjectCode.toLowerCase().includes(q) ||
        i.subjectName.toLowerCase().includes(q) ||
        i.author.toLowerCase().includes(q)
    );
  }
  if (opts.filter === "materials") out = out.filter((i) => i.kind === "material");
  else if (opts.filter === "posts") out = out.filter((i) => i.kind === "post");
  else if (opts.filter === "saved") out = out.filter((i) => opts.savedIds.includes(i.id));

  out = [...out];
  if (opts.sort === "new") {
    out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (opts.sort === "top") {
    out.sort((a, b) => b.score - a.score);
  } else {
    const now = Date.now();
    const hot = (it: Item) =>
      it.score / Math.pow((now - new Date(it.date).getTime()) / 3600000 + 2, 1.3);
    out.sort((a, b) => hot(b) - hot(a));
  }
  return out;
}

/** Classes de cor das etiquetas (tipo de material / categoria do fórum). */
const TAG_COLORS: Record<string, string> = {
  resumo: "bg-blue-mist text-blue-deep",
  "prova-antiga": "bg-red-mist text-red-deep",
  "lista-de-exercicios": "bg-green-mist text-green-deep",
  slides: "bg-purple-mist text-purple-deep",
  anotacoes: "bg-gold-mist text-gold-deep",
  duvida: "bg-gold-mist text-gold-deep",
  discussao: "bg-blue-mist text-blue-deep",
  aviso: "bg-red-mist text-red-deep",
  recurso: "bg-green-mist text-green-deep",
};

export function tagColor(label: string) {
  return TAG_COLORS[slug(label)] ?? "bg-paper text-stone";
}
