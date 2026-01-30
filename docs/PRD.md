# PRD.md — Landing Page Redstone Engenharia

## 1. Visão geral
Criar uma landing page institucional premium, em light mode e visual clean, para:
1) Gerar leads e agendar reunião (sem WhatsApp)  
2) Expor soluções e trabalhos (com 3 cases placeholder)  
3) Aumentar confiança (CREA + prova social)

**Stack**
- React + TypeScript + HTML + CSS (preferencialmente Tailwind + shadcn/ui)
- Supabase (DB + Edge Functions)
- Resend (e-mail)
- hCaptcha/eCAPTCHA (anti-spam)

## 2. Personas

### Persona A — Comprador B2B (Construtora/Incorporadora)
- Objetivo: contratar engenharia com previsibilidade (prazo/escopo) e confiança.
- Dores: risco de atraso, retrabalho, falta de documentação, fornecedor “novo”.
- Sucesso: portfólio claro + processo + contato rápido.

### Persona B — Síndico / Administradora de Condomínio
- Objetivo: resolver manutenção/reforma/laudos com segurança e formalidade.
- Dores: necessidade de laudos e responsabilidade técnica.
- Sucesso: clareza do que será entregue + credenciais + prazos.

### Persona C — Cliente B2C (Residencial)
- Objetivo: reforma/projeto/regularização sem dor de cabeça.
- Dores: falta de clareza do orçamento e etapas.
- Sucesso: passo a passo + exemplos + contato fácil.

## 3. User Stories

### Aquisição e navegação
- Como visitante, quero entender em poucos segundos o que a Redstone faz para decidir continuar na página.
- Como visitante, quero navegar por seções (âncoras) para achar rapidamente serviços, portfólio e contato.

### Segmentação B2B/B2C
- Como visitante B2B, quero ver serviços e benefícios voltados a empresas para sentir que a Redstone atende meu cenário.
- Como visitante B2C, quero ver serviços e benefícios voltados a residencial para sentir adequação.

### Conversão (Iniciar conversa)
- Como visitante, quero clicar em **“Iniciar conversa”** e enviar meus dados rapidamente para receber retorno em breve.
- Como usuário, quero confirmação clara de envio e o que acontece depois.

### Prova social
- Como visitante, quero ver logos/depoimentos/cases para confiar mesmo sendo uma empresa nova.

## 4. Requisitos funcionais (por feature)

### F1 — Header + navegação por âncoras
**Descrição:** Header fixo (ou sticky) com logo, links para seções e CTA.
- Links âncora: Serviços, Como trabalhamos, Projetos, Depoimentos, Contato
- CTA: **“Iniciar conversa”** (abre modal)

**Aceitação**
- Clicar em links rola suave até seção correta
- CTA abre modal em ≤ 150ms (percepção)

---

### F2 — Hero (primeira dobra)
**Descrição:** Bloco de impacto com imagem/vídeo placeholder e 2 CTAs.
- CTA primário: **Iniciar conversa**
- CTA secundário: Ver projetos (scroll até cases)

**Aceitação**
- Hero com hierarquia visual clara (título > subtítulo > CTAs)
- Responsivo (imagem não quebra layout)

---

### F3 — Tabs de segmentação (B2B / B2C)
**Descrição:** Tabs alternam conteúdo de “serviços em destaque” e “benefícios”.
- Tab default: manter a mais provável (sugestão: B2B) — configurável
- Conteúdo muda sem recarregar a página

**Aceitação**
- Troca de tab atualiza cards e microcopy local
- Estado selecionado é visível (acessível por teclado)

---

### F4 — Serviços (cards)
**Descrição:** Grid de cards com categorias (obras, reformas, projetos, laudos, gerenciamento, etc.).
- Pode variar conteúdo por tab (B2B/B2C)

**Aceitação**
- Pelo menos 6–8 cards possíveis (mesmo que destaque só 4 na dobra)
- Cards com ícone + título + descrição curta

---

### F5 — Como trabalhamos (metodologia)
**Descrição:** Etapas do processo (3–5 passos) com foco em previsibilidade.
**Aceitação**
- Layout em steps/linha do tempo
- Texto curto, escaneável

---

### F6 — Cases/Projetos (3 placeholders)
**Descrição:** Lista de 3 projetos com imagem placeholder, tipo de obra e resumo.
- Botão opcional “ver detalhes” (pode ser disabled/“em breve” no MVP)

**Aceitação**
- Cards consistentes, imagem com fallback
- Se não houver conteúdo real, exibir “placeholder” sem quebrar credibilidade (evitar “lorem ipsum”)

---

### F7 — Prova social (logos + números + depoimentos)
**Descrição:**
- Carrossel ou grid de logos (clientes/parceiros)
- “Números/resultados” (bloco pronto; pode iniciar com valores reais assim que aprovados)
- Depoimentos (2–4)

**Aceitação**
- Se algum bloco não tiver dado, mostrar versão neutra (ex.: esconder “números” até ter valores)
- Depoimentos com nome/cargo/empresa (ou “Cliente” se necessário)

---

### F8 — Vídeo (placeholder)
**Descrição:** Player embed (YouTube) OU thumbnail com botão play.
**Aceitação**
- Placeholder funciona sem link real (não dá erro visual)
- Lazy-load do embed para performance

---

### F9 — CTA fixo “Iniciar conversa”
**Descrição:** Botão flutuante fixo.
- Desktop: canto inferior direito
- Mobile: barra fixa inferior com CTA principal

**Aceitação**
- Não cobre elementos de formulário/rodapé
- Acessível (focus, aria-label)

---

### F10 — Modal “Iniciar conversa” (formulário rápido)
**Campos (mínimo)**
- Nome*  
- E-mail*  
- Telefone (opcional, mas recomendado)  
- Empresa (opcional, principalmente B2B)  
- Tipo: B2B/B2C (default baseado na tab selecionada)  
- Serviço (select)  
- Mensagem*  
- Consentimento (checkbox opcional: “Autorizo contato por e-mail/telefone”)

**Anti-spam**
- hCaptcha/eCAPTCHA obrigatório antes de enviar

**Fluxo**
1) Abrir modal  
2) Preencher  
3) Resolver captcha  
4) Enviar → loading  
5) Sucesso: mensagem “Retornaremos em breve.” + botão “Fechar”

**Aceitação**
- Validação client-side e mensagens de erro claras
- Submit desabilitado durante loading
- Sucesso limpa formulário e registra evento

---

## 5. Integrações

### Supabase (DB)
- Tabela `leads`:
  - `id` (uuid, pk)
  - `created_at` (timestamp)
  - `name` (text, required)
  - `email` (text, required)
  - `phone` (text, optional)
  - `company` (text, optional)
  - `segment` (text: "B2B"|"B2C")
  - `service` (text)
  - `message` (text)
  - `source` (text: "landing")
  - `utm_*` (optional: source/medium/campaign/content/term)
  - `page_path` (text)
  - `user_agent` (text, optional)
  - `status` (text default "new")

**Segurança (recomendado)**
- Inserção via **Edge Function** (não liberar insert direto no client).
- RLS: bloquear acesso público à tabela.

### Edge Function (lead intake)
Endpoint: `/functions/v1/lead`
- Verifica captcha (server-side)
- Rate limit básico por IP (ou fingerprint)
- Insere no Supabase com service role
- Dispara e-mail via Resend para `redstone@redstoneengenharia.com.br`

### Resend (e-mail)
- Template simples com dados do lead + timestamp + origem (B2B/B2C)

### Captcha
- Suportar **hCaptcha** (preferencial) ou eCAPTCHA conforme chave fornecida.
- Armazenar secrets em env da Edge Function.

## 6. Requisitos não-funcionais
- Performance: LCP < 2.5s (imagens otimizadas, lazy-load, embed adiado)
- Acessibilidade: navegação por teclado, foco visível, aria em modal/tabs
- SEO: title/description, OpenGraph, headings sem pular níveis, sitemap/robots (se aplicável)
- Compatibilidade: Chrome/Edge/Safari recentes + mobile
- Segurança: captcha + rate limit + validação server-side + sanitização

## 7. Edge cases
- Captcha falha/expira → mostrar erro e permitir tentar novamente
- Falha de rede ao enviar → manter dados e permitir retry
- Envios duplicados (double click) → bloquear no loading + idempotência na função
- Sem cases reais → usar placeholders “neutros” (sem texto genérico)
- Mobile com teclado aberto → modal deve rolar sem esconder botão enviar

## 8. Critérios de aceitação (checklist)
- [ ] CTA “Iniciar conversa” abre modal em todas as áreas (hero, header, fixo)
- [ ] Form valida e envia (com captcha) e salva no Supabase via Edge Function
- [ ] E-mail chega em `redstone@redstoneengenharia.com.br`
- [ ] Tabs B2B/B2C alteram conteúdo e pré-seleção do campo “Tipo”
- [ ] Layout responsivo (desktop/tablet/mobile)
- [ ] Acessibilidade básica (teclado/foco/labels)
