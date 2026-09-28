# PUColab — versão Next.js

Migração do protótipo `../PUColab.html` para Next.js (App Router) + Tailwind CSS 4 + TypeScript.

## Rodando

Precisa de Node.js 20.9+.

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | sobe o build de produção |
| `npm run lint` | ESLint |

## Onde está cada coisa do protótipo

| Protótipo | Aqui |
|---|---|
| `#feed`, `#subjects`, `#subject/INF1010` | `src/app/page.tsx`, `src/app/materias/page.tsx`, `src/app/materias/[code]/page.tsx` |
| `#material/m1`, `#post/p1` | `src/app/material/[id]/page.tsx`, `src/app/post/[id]/page.tsx` |
| `SUBJECTS`, `SEED_ITEMS`, `DOC_TYPES`, `FORUM_TAGS` | `src/lib/data.ts` |
| `items`, `savedItems`, `myVotes`, `authorName` | `src/store/useStore.ts` (persistido no `localStorage`) |
| `searchQuery`, `feedFilter`, `feedSort`, modais, toast | `src/store/useUI.ts` |
| `renderItemCard()`, `renderMaterialDetail()`... | `src/components/` |
| variáveis CSS | `@theme` em `src/app/globals.css` (`bg-blue-mist`, `text-stone`, `font-mono`...) |
| objeto `ICONS` | `lucide-react` |

Os dados salvos no navegador são carregados depois que a página monta (`src/components/Providers.tsx`), e o conteúdo principal só aparece depois disso — assim o HTML do servidor não diverge do cliente (sem erro de hidratação).
