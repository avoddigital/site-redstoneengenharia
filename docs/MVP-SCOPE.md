# MVP-SCOPE.md — Redstone Engenharia (Landing)

## Objetivo do MVP
Converter visitantes em leads qualificados (B2B/B2C) com CTA principal “Iniciar conversa” via modal, garantindo credibilidade para uma empresa nova.

## Está no MVP

### MUST
- Landing 1 página (seções + âncoras)
- Hero + 2 CTAs (Iniciar conversa / Ver projetos)
- Tabs B2B/B2C (troca serviços e benefícios)
- Serviços (cards)
- Como trabalhamos (etapas)
- Cases (3 placeholders) + seção preparada
- Prova social: logos + depoimentos
- Vídeo (placeholder com lazy-load)
- Contato + redes (LinkedIn/Instagram/YouTube) + e-mail
- Botão fixo “Iniciar conversa” (desktop e mobile)
- Modal com formulário rápido + validações
- Captcha (hCaptcha/eCAPTCHA)
- Supabase (persistência) + Edge Function + Resend (notificação)

### SHOULD
- Eventos de analytics (abriu modal, enviou lead, trocou tab)
- SEO básico (OG, meta, headings consistentes)

### COULD
- Detalhe de case (modal/página)
- Agendamento (Calendly)
- Portfólio com filtros e mais projetos
- Blog/CMS

## Não está no MVP (future scope)
- Chat ao vivo
- Área do cliente
- Multi-idioma
- CMS completo para gerenciar conteúdo

## Justificativa de escopo
- Priorizar conversão e credibilidade com esforço baixo.
- Minimizar complexidade (sem chat/portal) e manter apenas 1 fluxo de lead.

## Hipóteses a validar
- Tabs B2B/B2C aumentam clareza e conversão
- Prova social (logos + depoimentos + cases) reduz barreira por empresa nova
- Modal curto + “retorno em breve” mantém conversão sem WhatsApp

## Métricas do MVP
- Envios do formulário / semana
- Taxa de conversão (visitas → envio)
- Cliques no CTA fixo vs. hero
- Taxa de spam/erros de envio
