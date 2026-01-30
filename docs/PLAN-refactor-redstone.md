# PLAN-refactor-redstone

Refatoração profissional da Landing Page "Redstone Engenharia" para arquitetura escalável React + Vite + Tailwind CSS.

## 1. Visão Geral (Overview)

O projeto atual possui uma arquitetura "flat" (arquivos na raiz), utiliza Tailwind via CDN (performance ruim) e mistura conceitos de prototipagem rápida com produção.
O objetivo desta refatoração é migrar para uma arquitetura profissional, modular e performática, preparada para crescimento.

### Estado Atual vs. Alvo

| Característica   | Atual (Diagnóstico)                          | Alvo (Refatorado)                                            |
| :--------------- | :------------------------------------------- | :----------------------------------------------------------- |
| **Estrutura**    | Arquivos na raiz (`/components`, `/App.tsx`) | `src/` modular (`src/components`, `src/pages`, `src/styles`) |
| **Styling**      | Tailwind via CDN (Runtime injection)         | Tailwind via NPM (Build-time optimization)                   |
| **Assets**       | Imagens em `constants.ts`?                   | `src/assets` ou `public/` gerenciados pelo Vite              |
| **Dependências** | Mínimas (`react`, `vite`)                    | Setup completo (`postcss`, `autoprefixer`, `clsx`)           |

## 2. Conteúdo do Diagnóstico

- **Riscos (Trade-offs)**:
  - _Migration Risk_: A migração para `src/` quebrará todos os imports relativos. Correção sistemática necessária.
  - _Styling Change_: A remoção do CDN pode alterar levemente a renderização se a config do Tailwind (fontes, cores) não for portada exatamente igual para `tailwind.config.js`.

- **O que NÃO mexer agora**:
  - Design Visual: Manter a fidelidade visual é prioridade. Não redesenhar, apenas refatorar código.
  - Biblioteca de Ícones: Manter `Material Symbols` via Google Fonts por enquanto (migrar para `lucide-react` seria P3).

## 3. Arquitetura Alvo

```
/
├── public/              # Assets estáticos (favicon, robots.txt)
├── src/
│   ├── assets/          # Imagens importadas (vite optimize)
│   ├── components/
│   │   ├── ui/          # Componentes Atômicos (Button, Icon, Badge)
│   │   └── sections/    # Seções da Landing Page (Hero, About)
│   ├── styles/          # index.css (Tailwind directives)
│   ├── types/           # Definições TS
│   ├── utils/           # Helpers (cn, constants)
│   ├── App.tsx          # Main Layout
│   └── main.tsx         # Entry point (renomeado de index.tsx)
├── index.html           # Limpo (sem scripts de estilo inline)
├── tailwind.config.js   # Single Source of Truth para Design System
├── postcss.config.js
└── vite.config.ts
```

## 4. Backlog Priorizado

### P0: Foundation & Infrastructure (Crítico)

- [ ] **Setup Tailwind Native**: Instalar `tailwindcss`, `postcss`, `autoprefixer`.
- [ ] **Config Migration**: Portar tokens (cores, fontes, border-radius) do HTML para `tailwind.config.js`.
- [ ] **Structure Move**: Criar pasta `src` e mover arquivos. Renomear `index.tsx` para `main.tsx`.
- [ ] **Fix Entrypoint**: Atualizar `index.html` para apontar para `/src/main.tsx` e remover CDN links.
- [ ] **Verification**: App deve rodar (`npm run dev`) com visual idêntico ao atual.

### P1: Component & Code Cleanup

- [ ] **Component Audit**: Mover seções para `src/components/sections`.
- [ ] **Atomic UI**: Extrair botões repetidos para `src/components/ui/Button.tsx`.
- [ ] **Asset Config**: Configurar alias `@/` no `vite.config.ts` e `tsconfig.json` para imports limpos.

### P2: Performance & Content

- [ ] **Google Fonts**: Otimizar carregamento de fontes.
- [ ] **Content Extraction**: (Opcional) Mover textos hardcoded para `src/data/content.ts` se for solicitado.

## 5. Plano de Execução em Etapas (Backlog Detalhado)

### Etapa 1: Infraestrutura (P0)

#### 1. Instalação e Configuração

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Ação**: Configurar `tailwind.config.js` com os valores extraídos de `index.html`.

#### 2. Reestruturação de Pastas

- Criar `src/`
- Mover `App.tsx`, `*.tsx` (components) para dentro.
- Atualizar imports.

#### 3. Limpeza do HTML

- Remover script do CDN do Tailwind.
- Remover style inline do `index.html`.

### Etapa 2: Refatoração de Componentes (P1)

#### 4. UI Kit

- Criar `src/components/ui/Wrapper.tsx` (para container `max-w-7xl`).
- Padronizar uso de cores com variáveis do Tailwind.

## Phase X: Verification Checklist

### Automated

- [ ] Build processo: `npm run build` deve passar sem erros.
- [ ] Lint: `npx tsc --noEmit` deve passar sem erros de tipos.

### Manual

- [ ] **Visual Regression**: Comparar versão CDN vs versão NPM. Devem ser idênticas.
- [ ] **Responsividade**: Verificar `Hero` em Mobile (320px) e Desktop (1920px).
- [ ] **Console Logs**: Zero erros no console do navegador.
