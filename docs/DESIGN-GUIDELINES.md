# DESIGN-GUIDELINES.md — Redstone Engenharia

## Direção visual
- Clean, moderno, institucional premium (light mode)
- Muito espaço em branco, tipografia forte, componentes com bordas suaves
- Imagens: obras/infra/projetos com tratamento neutro (sem saturação excessiva)

## Paleta (base)
- Primária: **#881B1B** (vinho)
- Secundária: **#231F20** (grafite quase preto)
- Neutros (sugestão):
  - Background: #FFFFFF
  - Surface: #F7F7F8
  - Border: #E6E6E8
  - Text primary: #111113
  - Text secondary: #4B4B4F
- Semânticas:
  - Success: #16A34A
  - Warning: #F59E0B
  - Error: #DC2626
  - Info: #2563EB

## Tipografia
- Sugestão 1: **Inter** (UI limpa)
- Sugestão 2: **Plus Jakarta Sans** (mais “premium”)
- Escala:
  - H1: 40–52 / 700
  - H2: 28–36 / 700
  - H3: 20–24 / 600
  - Body: 16–18 / 400–500
  - Small: 13–14 / 400–500

## Grid e espaçamento
- Base 8px (8/16/24/32/48/64)
- Container: 1120–1200px, padding lateral 16–24px
- Seções: padding vertical 64–96px

## Raio e sombras
- Radius:
  - Botões/inputs: 10px
  - Cards: 14px
- Sombras:
  - Soft: 0 8px 24px rgba(0,0,0,0.08)
  - Hover: aumentar levemente (não exagerar)

## Componentes (shadcn/ui) — uso recomendado
- Button: CTAs (primário com #881B1B)
- Tabs: segmentação B2B/B2C
- Card: serviços, cases, depoimentos, métricas
- Dialog: modal “Iniciar conversa”
- Input / Textarea / Select: formulário
- Badge: tags (tipo de projeto/segmento)
- Separator: divisão de seções discretas
- Toast/Sonner: feedback de envio (sucesso/erro)
- Accordion: FAQ (opcional)

## Ícones e ilustrações
- Ícones lineares (Lucide) em 1.5px–2px
- Evitar ilustrações cartoon; preferir ícones técnicos

## Imagens
- Preferir fotos reais (obras, equipe, projetos) com boa luz
- Placeholder aceitável: 3 cases + vídeo (thumbnail neutra)

## Tokens (CSS variables) — sugestão
- --brand: #881B1B
- --brand-foreground: #FFFFFF
- --ink: #231F20
- --bg: #FFFFFF
- --surface: #F7F7F8
- --border: #E6E6E8
