"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { timeAgo } from "@/lib/utils";
import type { Item } from "@/lib/types";

export default function CommentsSection({ item }: { item: Item }) {
  const { authorName, addComment, setAuthor } = useStore();
  const showToast = useUI((s) => s.showToast);
  const [body, setBody] = useState("");
  const [author, setAuthorInput] = useState(authorName);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    const name = author.trim() || "Anônimo";
    addComment(item.id, { author: name, body: text });
    setAuthor(name);
    setBody("");
    showToast("Comentário publicado!");
  }

  const n = item.comments.length;
  return (
    <div className="mt-2">
      <h2 className="mb-3 text-[1.02rem] font-semibold">
        {n} {n === 1 ? "comentário" : "comentários"}
      </h2>
      <form onSubmit={submit} className="mb-[18px] rounded-[10px] border border-rule bg-white p-3.5">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={2}
          placeholder="Escreva uma resposta..."
          aria-label="Comentário"
          className="field w-full resize-y"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="Seu nome"
            aria-label="Seu nome"
            className="field min-w-[140px] flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Comentar
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-3">
        {n ? (
          item.comments.map((c, i) => (
            <div key={i} className="rounded-[10px] border border-rule bg-white px-3.5 py-3">
              <div className="mb-[5px] text-[.78rem] text-stone">
                <strong className="text-ink">{c.author}</strong> · {timeAgo(c.date)}
              </div>
              <p className="whitespace-pre-wrap text-[.9rem]">{c.body}</p>
            </div>
          ))
        ) : (
          <p className="text-[.85rem] text-stone-light">Nenhum comentário ainda. Seja a primeira pessoa a responder.</p>
        )}
      </div>
    </div>
  );
}
