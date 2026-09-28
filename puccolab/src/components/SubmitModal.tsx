"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAllSubjects, useStore } from "@/store/useStore";
import { useUI } from "@/store/useUI";
import { DOC_TYPES, FORUM_TAGS } from "@/lib/data";
import { groupByDept } from "@/lib/utils";

const OTHER = "__other__";

/** Modal de "Enviar material" e "Criar fórum". Fica montado sempre; aparece conforme useUI().modal. */
export default function SubmitModal() {
  const modal = useUI((s) => s.modal);
  const closeModal = useUI((s) => s.closeModal);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal, closeModal]);

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-300 flex items-start justify-center overflow-y-auto bg-[rgba(20,23,28,.5)] px-4 py-[5vh]"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div role="dialog" aria-modal="true" className="w-full max-w-[440px] rounded-[14px] bg-white px-[22px] pb-6 pt-[22px] shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[1.15rem] font-semibold">{modal === "upload" ? "Enviar material" : "Criar fórum"}</h2>
          <button type="button" onClick={closeModal} aria-label="Fechar" className="rounded-md p-1 text-stone hover:bg-paper">
            <X size={18} />
          </button>
        </div>
        {/* key: formulário novo (estado limpo) a cada troca de modal */}
        <SubmitForm key={modal} kind={modal} />
      </div>
    </div>
  );
}

function SubmitForm({ kind }: { kind: "upload" | "forum" }) {
  const router = useRouter();
  const subjects = useAllSubjects();
  const { authorName, addItem, ensureSubject, setAuthor } = useStore();
  const { closeModal, showToast, resetNav } = useUI();
  const isUpload = kind === "upload";

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [category, setCategory] = useState(isUpload ? DOC_TYPES[0] : FORUM_TAGS[0]);
  const [text, setText] = useState("");
  const [author, setAuthorInput] = useState(authorName);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => titleRef.current?.focus(), []);

  const { depts, order } = groupByDept(subjects);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    let code: string;
    let name: string;
    if (subject === OTHER) {
      code = newCode.trim().toUpperCase();
      name = newName.trim();
    } else {
      const s = subjects.find((x) => x.code === subject);
      code = s?.code ?? "";
      name = s?.name ?? "";
    }
    if (!title.trim() || !text.trim() || !code || !name) {
      setError("Preencha título, matéria e texto.");
      return;
    }
    if (subject === OTHER) ensureSubject(code, name);

    const authorFinal = author.trim() || "Anônimo";
    setAuthor(authorFinal);
    const base = {
      title: title.trim(),
      subjectCode: code,
      subjectName: name,
      author: authorFinal,
      date: new Date().toISOString(),
      score: 1,
      comments: [],
    };
    const id = (isUpload ? "m" : "p") + Date.now();
    if (isUpload) {
      const description = text.trim();
      addItem({ ...base, id, kind: "material", docType: category, description, pages: Math.max(1, Math.round(description.length / 500)), downloads: 0 });
    } else {
      addItem({ ...base, id, kind: "post", tag: category, body: text.trim() });
    }

    closeModal();
    resetNav();
    showToast(isUpload ? "Material enviado!" : "Fórum publicado!");
    router.push(isUpload ? `/material/${id}` : `/post/${id}`);
  }

  const label = "mb-[13px] flex flex-col gap-1.5 text-[.82rem] font-medium text-stone";

  return (
    <form onSubmit={submit} noValidate>
      <label className={label}>
        {isUpload ? "Título" : "Título da pergunta"}
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder={isUpload ? "Ex: Resumo — Listas Encadeadas" : "Ex: Como funciona a recursão nesse exercício?"}
          className="field"
        />
      </label>

      <label className={label}>
        Matéria
        <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="field">
          <option value="" disabled>
            Selecione a matéria
          </option>
          {order.map((d) => (
            <optgroup key={d} label={d}>
              {depts[d].map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} — {s.name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value={OTHER}>+ Outra matéria</option>
        </select>
      </label>

      {subject === OTHER && (
        <div className="-mt-1 mb-[13px] flex flex-col rounded-lg bg-paper p-3 [&>label]:mb-2.5 [&>label:last-child]:mb-0">
          <label className={label}>
            Código da matéria
            <input type="text" value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="Ex: INF1010" className="field" />
          </label>
          <label className={label}>
            Nome da matéria
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex: Estrutura de Dados" className="field" />
          </label>
        </div>
      )}

      <label className={label}>
        {isUpload ? "Tipo de material" : "Categoria"}
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="field">
          {(isUpload ? DOC_TYPES : FORUM_TAGS).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className={label}>
        {isUpload ? "Descrição" : "Sua pergunta ou aviso"}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
          placeholder={isUpload ? "O que tem nesse material e o que ele ajuda a entender" : "Dê detalhes pra turma conseguir ajudar"}
          className="field"
        />
      </label>

      {isUpload && (
        <label className={label}>
          Arquivo (opcional)
          <input type="file" className="field" />
          <span className="mt-0.5 text-[.74rem] font-normal text-stone-light">
            Neste protótipo o conteúdo do arquivo não é armazenado — apenas a descrição acima.
          </span>
        </label>
      )}

      <label className={label}>
        Seu nome
        <input type="text" value={author} onChange={(e) => setAuthorInput(e.target.value)} placeholder="Como quer aparecer" className="field" />
      </label>

      {error && <p className="mb-2 text-[.82rem] text-red-deep">{error}</p>}

      <button type="submit" className="btn btn-primary mt-1.5 w-full justify-center">
        {isUpload ? "Enviar" : "Publicar"}
      </button>
    </form>
  );
}
