# PUColab

**PUColab** é uma plataforma colaborativa pensada para estudantes da PUC compartilharem materiais de estudo, tirarem dúvidas em fóruns por disciplina e acompanharem horários de monitoria — uma espécie de "Reddit acadêmico" restrito à comunidade da universidade.
 
Este repositório contém o **protótipo navegável em HTML/CSS/JS** (sem back-end).
 
> Projeto acadêmico / protótipo de front-end: todos os dados são mantidos localmente no navegador (`localStorage`), sem persistência real compartilhada entre usuários.
 
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

## 🧭 Visão completa do produto (conceito)
 
Além do que já está no protótipo, o design do produto prevê um conjunto mais amplo de funcionalidades, pensadas para uma versão com back-end e usuários reais:
 
**Acesso e identidade**
- Login restrito com **matrícula da PUC**, para garantir que só membros da instituição usem a plataforma e reduzir contas falsas.
- Senhas não são armazenadas, por segurança.
- Perfil de usuário com foto e bio.
- Contas de **professor** com permissões diferenciadas (podem solicitar remoção de material próprio publicado sem autorização).
**Calendário de monitorias**
- Monitores cadastram matéria, horário e sala de aula.
- Calendário mensal — ao clicar em um dia, mostra as monitorias daquele dia.
- Busca/seleção de disciplina específica (ex.: `CTC4002`) para filtrar o calendário só pelos horários daquela matéria.
**Fóruns e posts**
- Publicações podem ser feitas por qualquer membro da comunidade (aluno ou professor).
- Lista de **fóruns acessados recentemente**.
- Toda publicação tem área de comentários e pode ser votada (upvote/downvote) — posts com mais upvotes são mais recomendados.
- Botão de **denúncia** em posts e comentários, para sinalizar conteúdo inadequado.
- Possibilidade de **marcar/referenciar outros posts**, evitando reexplicar algo que já foi respondido.
**Moderação e segurança**
- Sistema de revisão antes da publicação: o post passa por um grupo de **moderadores escolhidos**, que avaliam o conteúdo.
  - 3 avaliações positivas → post aprovado e publicado automaticamente.
  - 3 avaliações negativas → post recusado.
  - Prazo de até 24h para a revisão.
- Comentários passam por verificação automática de uma IA (com botão de denúncia como reforço).
- Arquivos e PDFs enviados passam por antivírus antes da publicação.
- Conteúdo ofensivo (discurso de ódio, racismo, homofobia etc.) pode ser encaminhado à PUC para tratamento institucional.
**Reputação — "Medalha de Honra"**
- Usuários que contribuem constantemente com a comunidade ganham uma medalha, marcando-os como confiáveis.
- Quem tem a medalha **pula a etapa de revisão/moderação** ao publicar.
- A medalha aparece ao lado de postagens e comentários do usuário, para destaque.
**Organização por trajetória acadêmica**
- Seção de **"Matérias já cursadas"**, organizada por período, para o usuário revisitar conteúdo de disciplinas antigas.
- **Busca de disciplinas** que o usuário ainda não cursa/não tem, permitindo conhecer ou ajudar em outras matérias.
> As seções acima refletem o conceito de produto do FigJam e ainda **não estão implementadas** no protótipo HTML deste repositório — servem como roteiro para próximas iterações.

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

Protótipo funcional para fins de estudo/validação com usuários, cobrindo o fluxo central de materiais e fóruns. As funcionalidades de identidade (login PUC), calendário de monitorias, moderação/revisão de posts, verificação por IA/antivírus e sistema de medalha de honra fazem parte do conceito de produto e são os próximos passos de desenvolvimento.

