# QA — Velmont

Rodar antes de fechar cada fase. O que já é automatizado está marcado com o
comando; o resto é verificação manual.

---

## Automatizado

| Verificação                    | Comando                 | Status na fase 1                            |
| ------------------------------ | ----------------------- | ------------------------------------------- |
| Lint                           | `npm run lint`          | ✓ limpo                                     |
| Tipos (strict)                 | `npm run typecheck`     | ✓ limpo                                     |
| Build de produção              | `npm run build`         | ✓ 5 rotas estáticas                         |
| Formatação                     | `npm run format:check`  | ✓                                           |
| Dados institucionais pendentes | `npm run check:content` | 10 pendências listadas                      |
| Trava de publicação            | `npm run check:launch`  | ✗ bloqueia — esperado até os dados chegarem |

Tudo de uma vez: `npm run check`.

---

## Motion — a subida (fase 3)

- [x] Sincronia: em 41 pontos do percurso, o traço desenhado acompanha a
      fração de scroll 1:1 e cada beat ativa na sua altitude
- [x] Nunca mais de um beat acima de 50% de opacidade ao mesmo tempo
- [x] Nunca um instante sem beat legível (mínimo observado: 0,66)
- [x] Scroll rápido: saltos grandes assentam no estado correto
- [x] Redimensionamento: scrub correto em 1440, 1100 e volta, com
      `invalidateOnRefresh`
- [x] Sete trocas de breakpoint seguidas sem acúmulo de timeline
- [x] Refresh no meio da página: posição, traço e beat idênticos depois do
      reload
- [x] `prefers-reduced-motion: reduce`: fluxo vertical, quatro beats visíveis,
      montanha inteira desenhada, nenhum GSAP montado
- [x] Sem JavaScript: os quatro textos estão no HTML e a seção continua legível
- [x] Teclado: âncora "Comece pela ideia" leva à seção; a tabulação atravessa
      a seção e sai — o foco não fica preso no palco
- [x] Console sem erros
- [x] CLS 0 em desktop e mobile

## Responsividade

Medido com `document.documentElement.scrollWidth === clientWidth` na home
inteira, depois de rolar a página toda para carregar tudo:

- [x] 320px — sem scroll lateral
- [x] 375px — sem scroll lateral
- [x] 768px — sem scroll lateral
- [x] 1024px — sem scroll lateral
- [x] 1440px — sem scroll lateral
- [x] 834px e 1920px — sem scroll lateral (a montanha do palco sangra até a
      borda útil do contêiner, com margem negativa igual à goteira)
- [x] Strings longas sem espaço (e-mail) quebram em vez de esticar a coluna
- [x] As montanhas decorativas sangram além da viewport de propósito, sempre
      dentro de um contêiner com `overflow-hidden`
- [ ] Reconferir quando houver seções com pin (fase de motion)

Como verificar rápido, com o servidor rodando:

```js
// no console do navegador
document.documentElement.scrollWidth - document.documentElement.clientWidth; // deve ser 0
```

---

## Acessibilidade

- [x] `h1` único por página
- [x] Hierarquia de títulos sem pular nível
- [x] Link "pular para o conteúdo" como primeiro elemento focável
- [x] Foco visível em todas as superfícies (a cor vem de `--surface-ring`)
- [x] Alvo de toque mínimo de 44px nos botões e no toggle do menu
- [x] Menu mobile: `aria-expanded`, `aria-controls`, Escape fecha, foco volta
      ao botão, scroll de fundo travado
- [x] Menu mobile fora do DOM quando fechado — nada invisível recebe Tab
- [x] `prefers-reduced-motion` respeitado no CSS global
- [x] Cor nunca é o único indicador (links têm sublinhado real)
- [x] Contraste AA verificado, por cálculo, em todos os pares em uso:

| Par                                    |           Razão | Uso                                     |
| -------------------------------------- | --------------: | --------------------------------------- |
| areia `#E9D4B3` sobre vinho `#2D0414`  |         12.76:1 | texto principal em superfície vinho     |
| areia-600 `#C9B394` sobre vinho        |          9.09:1 | texto secundário em vinho               |
| areia sobre tinta `#1A0209`            |         13.76:1 | texto principal no rodapé               |
| areia-600 sobre tinta                  |          9.80:1 | texto secundário no rodapé              |
| tinta `#1E1116` sobre marfim `#F7F2E8` |         16.41:1 | texto principal em fundo claro          |
| tinta sobre papel `#FFFDF8`            |         18.01:1 | texto de leitura                        |
| argila-tinta `#6E524B` sobre marfim    |          6.33:1 | texto secundário em fundo claro         |
| `#1A0209` sobre areia                  |         13.76:1 | texto na superfície areia               |
| `#503935` sobre areia                  |          7.35:1 | texto secundário na superfície areia    |
| botão sólido, todas as superfícies     | 12.76 a 18.01:1 | `--surface-accent` sobre `--surface-bg` |
| argila `#8B6C63` sobre marfim          |          4.26:1 | **só borda e decoração — nunca texto**  |

- [x] Hero com fundo fotográfico: contraste verificado por medição de pixel,
      não por cálculo de par de cor — a foto tem relevo com pontos de brilho
      reais que uma cor plana não tem. Método: renderizar a página com o
      texto tornado transparente (`color: transparent` via injeção de CSS) e
      medir o pixel mais claro em **toda** a área de cada elemento de texto,
      não por amostragem em pontos. Amostrar só em pontos, ou filtrar "fundo"
      por distância de cor ao texto, deu falso-negativo: pixels da própria
      borda antisserrilhada do texto entravam na amostra e pareciam fundo
      muito claro. Pior caso real, nas duas imagens: 4,94:1 (desktop,
      indicação de scroll) — acima do mínimo de 4,5:1. Ver
      `docs/velmont-blueprint.md`, "Ajuste fora de fase — fundo fotográfico
      do hero"
- [x] Diagnóstico de entrada operável por teclado: Espaço marca, setas
      circulam entre as três trilhas, e exatamente um painel fica visível em
      cada estado. Sem depender de hover e sem JavaScript
- [x] Anel de foco visível no rótulo do diagnóstico, já que o radio é
      visualmente oculto
- [x] Todo campo do formulário tem `label` associada
- [x] Toda imagem tem `alt`
- [x] Ordem de tabulação segue a ordem de leitura
- [ ] Auditoria axe automatizada (entra junto com o Playwright, fase de QA)
- [ ] Navegação por leitor de tela nas seções com pin (fase de motion)

---

## Conteúdo

- [x] Nenhum número inventado no HTML
- [x] Nenhum depoimento sem autorização
- [x] Nenhum placeholder publicado — verificado por grep no HTML do build de
      produção: `pendente`, `não publicável`, `exemplo`, `[X]`, `[Y]`, `[Z]` e
      os títulos dos artigos de exemplo somam zero ocorrência
- [x] Seções sem nenhum dado confirmado (números, depoimentos) não são
      renderizadas em produção
- [x] Quadro de retrato vazio não vai ao ar: sem foto, o bloco sai
- [x] Aviso no rodapé: conteúdo informativo não substitui análise específica
- [x] Nenhuma promessa de deferimento ou prazo universal
- [ ] Revisão de copy pelas fundadoras

---

## SEO

- [x] `title` e `description` únicos por página
- [x] Canonical em todas as páginas indexáveis
- [x] `robots.txt` explícito, com `/style-guide` e `/studio` fora do índice
- [x] `sitemap.xml` gerado — só com rotas que existem
- [x] `/style-guide` com `noindex`
- [ ] JSON-LD de `Organization` — depende da razão social e do CNPJ
- [ ] Open Graph com imagem — depende do ativo social
- [ ] Search Console configurado no lançamento

---

## Performance

- [x] Fontes locais via `next/font`, sem requisição a terceiros
- [x] `adjustFontFallback` configurado — sem layout shift na troca de fonte
- [x] Imagens com dimensões declaradas
- [x] `next/image` servindo o tamanho certo (256px para o lockup de 132px)
- [ ] Lighthouse mobile e desktop (rodar quando a home estiver completa)
- [ ] Verificar timelines de scroll após carregamento de fontes e imagens
      (fase de motion)

---

## Sem JavaScript

- [x] A home inteira é legível sem JS: só o menu mobile e o cabeçalho sólido
      dependem de JavaScript
- [x] O diagnóstico de entrada funciona sem JS (radios + `peer-checked`)
- [ ] Formulário de análise precisa de alternativa sem JS (fase do formulário)

---

## Deploy

- [x] Build passa com `NEXT_PUBLIC_SITE_URL` vazia, só com espaços, sem
      esquema, com valor inválido e com barra final
- [x] `siteConfig.url` nunca é string vazia: `new URL()` em
      `lib/seo/metadata.ts` e em `app/sitemap.ts` não tem como estourar
- [ ] Definir o domínio final e apontar `NEXT_PUBLIC_SITE_URL` para ele

### Avisos conhecidos no build da Vercel, sem impacto

| Aviso                                                                     | Situação                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow-scripts`: `esbuild` e `unrs-resolver` com postinstall não aprovado | Ambos são dependências de desenvolvimento — `esbuild` vem do `tsx`, usado só em `check:content`, e `unrs-resolver` vem do resolvedor de imports do ESLint. Nenhum participa de `next build`. Aprovar com `npm approve-scripts` silencia o aviso      |
| `eslint@9.39.5 deprecated`                                                | O ESLint 10 quebra o `eslint-plugin-react` que vem dentro do `eslint-config-next` 16 (`getReactVersionFromContext`). Ficamos na 9 até o `eslint-config-next` suportar a 10. O Next 16 não roda ESLint durante o build, então isso não afeta o deploy |

---

## Bloqueios de lançamento em aberto

Além das 10 pendências de dados listadas em `docs/content-inventory.md`:

- [ ] **O formulário de análise não envia.** A marcação está pronta e
      `lib/whatsapp.ts` já monta o link, mas os dois só são ligados na fase do
      formulário, com React Hook Form + Zod. O botão é `type="button"` para não
      simular um envio.
- [ ] Páginas internas ainda não existem: os links da home apontam para rotas
      que retornam 404 (fase de páginas internas).
- [ ] `/conteudos` e as páginas de artigo dependem do CMS (fase 8).
