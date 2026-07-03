# BSeguros — Manual de Instruções do Projeto

> **Direitos Autorais © Gabriel Eduardo. Todos os direitos reservados.**  
> Reprodução, redistribuição ou uso comercial sem autorização expressa é proibido.

---

## Sumário

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Estrutura do Repositório](#2-estrutura-do-repositório)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Como Rodar Localmente](#4-como-rodar-localmente)
5. [Variáveis de Ambiente](#5-variáveis-de-ambiente)
6. [Banco de Dados](#6-banco-de-dados)
7. [Alterações Realizadas no Projeto](#7-alterações-realizadas-no-projeto)
8. [Deploy e Publicação](#8-deploy-e-publicação)
9. [Open Graph / Preview de Links](#9-open-graph--preview-de-links)
10. [Favicon](#10-favicon)
11. [Estrutura de Workflows](#11-estrutura-de-workflows)
12. [Manutenção e Boas Práticas](#12-manutenção-e-boas-práticas)

---

## 1. Visão Geral do Projeto

**BSeguros** é o site institucional e de captação de clientes do corretor de seguros **Bruno Saraiva**, especializado em proteção patrimonial, planejamento sucessório e mentoria para corretores.

O projeto é um **monorepo pnpm** com dois serviços principais:
- **Frontend** (`artifacts/moovon`): site React + Vite em português
- **API** (`artifacts/api-server`): servidor Express que alimenta o conteúdo dinâmico (soluções, álbuns, FAQ)

---

## 2. Estrutura do Repositório

```
/
├── artifacts/
│   ├── moovon/               → Frontend (React + Vite)
│   │   ├── public/           → Arquivos estáticos (favicon, imagens, OG image)
│   │   ├── src/
│   │   │   ├── components/   → Componentes da UI (Hero, Footer, FAQ, etc.)
│   │   │   └── pages/        → Páginas (Home, ServicePage, etc.)
│   │   └── index.html        → Entrada principal (meta tags, favicon)
│   │
│   └── api-server/           → Backend (Express)
│       └── src/
│           ├── db-init.ts    → Seed do banco de dados (soluções, álbuns)
│           └── index.ts      → Servidor principal
│
├── lib/
│   ├── db/                   → Schema Drizzle ORM + PostgreSQL
│   └── api-zod/              → Tipos e validações Zod gerados do OpenAPI
│
├── nixpacks.toml             → Configuração de build para deploy
├── scripts/
│   └── post-merge.sh         → Script pós-merge (push do schema do DB)
└── README.md                 → Este arquivo
```

---

## 3. Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Gerenciador de pacotes | pnpm (workspaces monorepo) |
| Runtime | Node.js 20+ |
| Linguagem | TypeScript 5.9 |
| Frontend | React + Vite |
| Backend | Express 5 |
| Banco de Dados | PostgreSQL + Drizzle ORM |
| Validação | Zod (v4) + drizzle-zod |
| Build (deploy) | nixpacks |
| Plataforma | Replit |

---

## 4. Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- pnpm instalado (`npm install -g pnpm`)
- PostgreSQL disponível com a variável `DATABASE_URL` configurada

### Instalar dependências

```bash
pnpm install
```

### Rodar o frontend

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/moovon dev
```

Acesse: `http://localhost:5173`

### Rodar a API

```bash
PORT=3000 pnpm --filter @workspace/api-server dev
```

Acesse: `http://localhost:3000`

### Typecheck completo

```bash
pnpm run typecheck
```

> ⚠️ **Importante:** sempre rode `pnpm run typecheck:libs` (raiz) antes do typecheck por pacote — caso contrário os pacotes `lib/db` e `lib/api-zod` mostram erros falsos de dist.

### Build para produção

```bash
BASE_PATH=/ PORT=3000 pnpm --filter @workspace/moovon build
pnpm --filter @workspace/api-server build
```

---

## 5. Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `DATABASE_URL` | String de conexão PostgreSQL | ✅ Sim |
| `SESSION_SECRET` | Segredo para sessões Express | ✅ Sim |
| `PORT` | Porta do servidor (padrão: 3000) | Opcional |

Configure via Replit Secrets (nunca commite em arquivos `.env`).

---

## 6. Banco de Dados

### Schema
Definido em `lib/db/` usando Drizzle ORM.

### Push do schema (desenvolvimento)

```bash
pnpm --filter db push
```

> ⚠️ Este comando **não** deve rodar no build de deploy (sem banco disponível na fase de build do nixpacks). Ele é executado automaticamente via `scripts/post-merge.sh` após merges.

### Seed automático
O arquivo `artifacts/api-server/src/db-init.ts` executa o seed ao iniciar a API.  
A lógica usa **UPSERT por slug** para soluções — ou seja, roda sempre sem duplicar dados.

Para álbuns, o insert só ocorre se o nome ainda não existir.

---

## 7. Alterações Realizadas no Projeto

### 7.1 Contato e Branding

- Removidos todos os links de WhatsApp (`wa.me/5511966088872`) de: **Hero, About, Contact, Footer, ServicePage**
- Removidos botões "Falar no WhatsApp" de Hero e ServicePage
- E-mail atualizado de `moovon.consulting@gmail.com` → **`atendimento@bseguros.com.br`** em todo o site

### 7.2 Conteúdo do Frontend

| Componente | O que foi alterado |
|---|---|
| `Differentials.tsx` | Removidos "Atendimento humanizado" e "Especialização em seguros de vida" |
| `Footer.tsx` | "E-book Gratuito" substituído por "Ebook para Clientes e/ou Corretores" e "Mentoria para Corretores"; adicionado endereço completo |
| `Contact.tsx` | Adicionado endereço no bloco de Localização: *Av. Antártica, 675 – Perdizes / São Paulo, SP / Atendimento em todo o Brasil* |
| `FAQ.tsx` | Removida pergunta sobre pagamento; atualizada resposta sobre filhos; adicionadas 7 seguradoras (MAG, Prudential, MetLife, Omint, Icatu, Azos, Allianz) |
| `Solutions.tsx` | Título da seção alterado para *"Protegemos patrimônios. Planejamos legados."* com novo subtexto |

### 7.3 Soluções (Banco de Dados)

Todos os 8 registros de soluções foram atualizados via UPSERT com novos textos de `desc` e `full_desc` conforme briefing. Títulos atualizados:

| Slug | Novo Título |
|---|---|
| `seguro-de-vida-individual` | Proteção Financeira Pessoal |
| `seguro-para-familias` | Proteção Financeira Familiar |
| `seguro-para-empresarios` | Continuidade Empresarial |
| `consultoria-financeira` | Planejamento Financeiro |
| `mentoria-personalizada` | Desenvolvimento Profissional |

### 7.4 Álbuns (Banco de Dados)

Adicionados 5 álbuns de fotos ao seed:

1. MDRT Miami 2025
2. MAG Seguros Curaçao 2025
3. Insurance Experience África do Sul 2024
4. Omint Awards Olimpíadas de Paris 2024
5. Troféus

### 7.5 Correção de Deploy

- Removidos `pnpm --filter db push` e `pnpm --filter db seed` da fase de build do `nixpacks.toml` (sem banco na fase de build = erro fatal)
- Push do schema movido exclusivamente para `scripts/post-merge.sh`
- Seed continua sendo executado pelo próprio servidor ao iniciar via `ensureTables()`

---

## 8. Deploy e Publicação

O deploy é feito pela plataforma **Replit**.

### Comando de build (`nixpacks.toml`)
```toml
[phases.build]
cmds = [
  "BASE_PATH=/ PORT=3000 pnpm --filter @workspace/moovon build",
  "pnpm --filter @workspace/api-server build"
]

[start]
cmd = "node --enable-source-maps artifacts/api-server/dist/index.mjs"
```

### Domínio de produção
```
https://www.bseguros.com.br
```

### Pós-deploy
Após cada deploy, verificar:
- Site acessível em `https://www.bseguros.com.br`
- API respondendo corretamente
- Preview de link funcionando no WhatsApp (ver seção 9)

---

## 9. Open Graph / Preview de Links

As meta tags de Open Graph controlam o preview quando o link é compartilhado (WhatsApp, Telegram, redes sociais, etc.).

### Configuração atual (`artifacts/moovon/index.html`)

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.bseguros.com.br/" />
<meta property="og:title" content="BSeguros | Bruno Saraiva — Proteção Patrimonial e Planejamento Financeiro" />
<meta property="og:description" content="Especialista em seguros de vida, proteção patrimonial e planejamento sucessório para empresários, executivos e famílias. Atendimento em todo o Brasil." />
<meta property="og:image" content="https://www.bseguros.com.br/opengraph.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Imagem de preview
- Arquivo: `artifacts/moovon/public/opengraph.jpg`
- Dimensões: **1200 × 630 px** (padrão recomendado)
- Conteúdo: foto de Bruno Saraiva (gerada a partir de `bruno-saraiva.jpg`)
- Tamanho: ~102KB

### Como atualizar o cache do WhatsApp após mudanças
1. Acesse: [https://developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/?q=https://www.bseguros.com.br)
2. Cole a URL do site
3. Clique em **"Raspar de Novo"**

> ⚠️ O WhatsApp exige URL **absoluta** no `og:image`. URL relativa (`/opengraph.jpg`) não funciona.

---

## 10. Favicon

O favicon completo foi instalado em `artifacts/moovon/public/` com suporte a todos os dispositivos e plataformas.

### Arquivos incluídos

| Arquivo | Uso |
|---|---|
| `favicon.ico` | Browsers desktop (padrão) |
| `favicon-16x16.png` | Aba do browser pequena |
| `favicon-32x32.png` | Aba do browser padrão |
| `favicon-96x96.png` | Atalho desktop |
| `apple-icon-*.png` | iPhone e iPad (iOS) |
| `android-icon-*.png` | Android (atalho na tela inicial) |
| `ms-icon-*.png` | Windows (Live Tiles) |
| `browserconfig.xml` | Configuração Windows/Edge |
| `apple-icon-precomposed.png` | iOS legado |

### Tags no `index.html`

```html
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
<!-- ... demais tamanhos Apple e Android ... -->
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
```

---

## 11. Estrutura de Workflows

Os workflows do Replit controlam quais serviços estão rodando:

| Workflow | Comando | Descrição |
|---|---|---|
| `moovon` | `PORT=5173 pnpm --filter @workspace/moovon dev` | Frontend em desenvolvimento |
| `api-server` | `PORT=3000 pnpm --filter @workspace/api-server dev` | API em desenvolvimento |
| `artifacts/moovon: web` | `pnpm --filter @workspace/moovon run dev` | Frontend do artifact |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | API do artifact |

---

## 12. Manutenção e Boas Práticas

### Adicionar ou editar soluções
1. Edite o array `SOLUTIONS_SEED` em `artifacts/api-server/src/db-init.ts`
2. O UPSERT garante que mudanças no seed atualizam o banco automaticamente ao reiniciar a API

### Adicionar álbuns de fotos
1. Adicione entradas em `ALBUMS_SEED` no mesmo arquivo `db-init.ts`
2. A inserção só ocorre se o álbum não existir (verificação por nome)

### Atualizar a foto de preview de link (OG image)
1. Substitua ou regere `artifacts/moovon/public/opengraph.jpg` (dimensões: 1200×630px)
2. Faça o deploy
3. Limpe o cache via [Facebook Debug Tool](https://developers.facebook.com/tools/debug)

### Atualizar o favicon
1. Substitua os arquivos em `artifacts/moovon/public/`
2. As tags no `index.html` já estão configuradas — não é necessário alterar o HTML

### Atualizar textos do site
- Componentes estão em `artifacts/moovon/src/components/`
- Cada componente corresponde a uma seção do site (Hero, FAQ, Footer, Solutions, etc.)

---

*Manual gerado em julho de 2026.*  
**© Gabriel Eduardo — Todos os direitos reservados.**
