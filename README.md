# PUColab

**PUColab** é um protótipo de plataforma colaborativa para estudantes universitários compartilharem materiais de estudo e tirarem dúvidas por disciplina — uma espécie de "Reddit acadêmico", com upload de materiais, fóruns de discussão, votos e comentários, tudo organizado por matéria.

---

## ✨ Funcionalidades

- **Compartilhamento de materiais** — resumos, provas antigas, listas de exercícios, slides e anotações, associados a uma disciplina.
- **Fórum de discussão** — posts com tags (Dúvida, Discussão, Aviso, Recurso) por disciplina.
- **Sistema de votos** (upvote/downvote) para materiais e posts.
- **Comentários** em materiais e posts.
- **Favoritos** — salvar itens para acessar depois.
- **Busca** por título, código ou nome da disciplina.
- **Navegação por departamento e disciplina**, com listagem lateral.
- **Cadastro de novas disciplinas "on the fly"**, direto pelos formulários de envio.
- **Widgets** de destaque: matéria em destaque, top matérias e "sobre o projeto".
- **Feedback visual** com toasts e modais para as ações principais.
- **Layout responsivo** (menu lateral vira drawer no mobile).

## 🖼️ Estrutura da interface

Layout em três colunas, no estilo Reddit / Stack Overflow:

- **Sidebar esquerda** — navegação por departamento e disciplina, atalho para itens salvos.
- **Coluna central** — feed de materiais e posts, com abas, filtros e ordenação.
- **Sidebar direita** — matéria em destaque, ranking de disciplinas mais ativas e um bloco "sobre".


## 🛠️ Tecnologias

Atualmente conta com o uso de:

- **HTML5** 
- **CSS**
- **JavaScript**
- Fontes: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Work Sans](https://fonts.google.com/specimen/Work+Sans) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (Google Fonts)

## 🚀 Como rodar

Como é um único arquivo HTML autocontido, não há dependências nem processo de build:

```bash
# clone o repositório
git clone https://github.com/seu-usuario/puclab.git
cd puclab

# basta abrir o arquivo no navegador
open puclab.html   # macOS
# ou
xdg-open puclab.html   # Linux
# ou apenas dê duplo clique no arquivo no explorador de arquivos
```

Como alternativa, sirva com qualquer servidor estático (recomendado para evitar restrições de `localStorage`/CORS em alguns navegadores):

```bash
npx serve .
# ou
python3 -m http.server
```

## ⚠️ Limitações do protótipo

- Não há backend, autenticação ou banco de dados — tudo roda localmente no navegador de cada usuário.
- O envio de arquivos é simulado: **o conteúdo do arquivo não é armazenado**, apenas o nome/metadados do material.
- Os dados persistidos em `localStorage` são locais a cada navegador/dispositivo e não são compartilhados entre usuários.
- Voltado para validação de conceito e testes de usabilidade, não para uso em produção.

## 📌 Status

Protótipo funcional para fins de estudo/validação com usuários. Próximos passos possíveis: back-end real com persistência compartilhada, autenticação de usuários, upload de arquivos de fato, e moderação de conteúdo.

